import {passwordAuth,passwordLoginPage,verifyPassword} from './password-auth.mjs';
const encoder=new TextEncoder(),SESSION_SECONDS=34560000;
const encode=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
const decode=s=>Uint8Array.from(atob(s.replaceAll('-','+').replaceAll('_','/')+'='.repeat((4-s.length%4)%4)),c=>c.charCodeAt(0));
const random=()=>encode(crypto.getRandomValues(new Uint8Array(32)));
export const hash=async value=>encode(await crypto.subtle.digest('SHA-256',encoder.encode(value)));
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json','cache-control':'no-store'}});
const cookie=(key,value,age)=>`${key}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;
const cookies=request=>Object.fromEntries((request.headers.get('cookie')||'').split(';').map(v=>v.trim().split(/=(.*)/s)).filter(v=>v.length>1).map(([k,v])=>[k,v]));
export function approved(env,sub){try{const list=JSON.parse(env.DOAA_ALLOWED_SUBJECTS||'[]');return (typeof sub==='string'&&sub.startsWith('password:')&&sub.slice(9)===env.DOAA_PASSWORD_USERNAME&&!!env.DOAA_PASSWORD_VERIFIER)||(Array.isArray(list)&&typeof sub==='string'&&list.includes(sub));}catch{return false;}}
export function configured(env){try{const list=JSON.parse(env.DOAA_ALLOWED_SUBJECTS||'[]');return !!(env.DB&&env.GOOGLE_CLIENT_ID&&env.GOOGLE_CLIENT_SECRET&&env.GOOGLE_REDIRECT_URI&&Array.isArray(list)&&list.length&&list.every(x=>typeof x==='string'&&x.length>0));}catch{return false;}}
let keyCache=null,keyExpiry=0;
async function googleKeys(force=false){if(!force&&keyCache&&Date.now()<keyExpiry)return keyCache;const r=await fetch('https://www.googleapis.com/oauth2/v3/certs',{signal:AbortSignal.timeout(7000)});if(!r.ok)throw Error('Identity verification unavailable');const j=await r.json();if(!Array.isArray(j.keys))throw Error('Identity verification unavailable');keyCache=j.keys;const age=Number(r.headers.get('cache-control')?.match(/max-age=(\d+)/)?.[1]||600);keyExpiry=Date.now()+Math.min(age,86400)*1000;return keyCache;}
export async function verifyIdToken(token,audience,nonce,keys=googleKeys){
 if(typeof token!=='string'||token.length>16000)throw Error('Invalid identity token');const parts=token.split('.');if(parts.length!==3)throw Error('Invalid identity token');
 let header,payload;try{header=JSON.parse(new TextDecoder().decode(decode(parts[0])));payload=JSON.parse(new TextDecoder().decode(decode(parts[1])));}catch{throw Error('Invalid identity token');}
 if(header.alg!=='RS256'||typeof header.kid!=='string')throw Error('Invalid identity signature');
 let jwk=(await keys()).find(k=>k.kid===header.kid&&k.kty==='RSA');if(!jwk)jwk=(await keys(true)).find(k=>k.kid===header.kid&&k.kty==='RSA');if(!jwk)throw Error('Unknown identity signing key');
 const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
 if(!await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,decode(parts[2]),encoder.encode(parts[0]+'.'+parts[1])))throw Error('Invalid identity signature');
 const now=Date.now()/1000;
 if(!['accounts.google.com','https://accounts.google.com'].includes(payload.iss)||payload.aud!==audience||typeof payload.exp!=='number'||payload.exp<=now||typeof payload.iat!=='number'||payload.iat>now+60||payload.nonce!==nonce||typeof payload.sub!=='string'||!payload.sub||payload.sub.length>255||(payload.azp&&payload.azp!==audience))throw Error('Identity token does not match this sign-in');
 return payload;
}
function loginPage(message='',status=200){return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sign in · DOAA</title><style>body{margin:0;background:#f3f5f5;color:#203d55;font:16px/1.6 system-ui;display:grid;place-items:center;min-height:100dvh}main{max-width:420px;margin:24px}h1{font-size:38px;letter-spacing:.12em;margin:0}p{margin:14px 0}a{display:inline-block;border:1px solid #aabdc8;padding:12px 18px;border-radius:10px;color:inherit;text-decoration:none;background:white}a:focus-visible{outline:3px solid #2367a2}</style><main><h1>DOAA</h1><p>David's Ottawa Aviation App</p><p>${message||'Sign in to explore the sky and your saved aviation moments.'}</p><a href="/auth/start">Sign in with Google</a></main></html>`,{status,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','content-security-policy':"default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"}});}
const sameOrigin=request=>request.headers.get('origin')===new URL(request.url).origin;
export async function authorize(request,env){
 const token=cookies(request).__Host_doaa_session;if(!token||!/^[\w-]{43}$/.test(token)||!env.DB)return null;
 const session=await env.DB.prepare('SELECT subject,expires_at FROM auth_sessions WHERE token_hash=?').bind(await hash(token)).first();
 if(!session||Date.parse(session.expires_at)<=Date.now())return null;
 if(session.subject.startsWith('password:')){const name=session.subject.slice(9);const account=await env.DB.prepare('SELECT username,disabled_at,must_change_password FROM password_accounts WHERE username=?').bind(name).first();return account&&!account.disabled_at?{subject:session.subject,must_change_password:!!account.must_change_password}:null;}
 return approved(env,session.subject)?{subject:session.subject}:null;
}
export async function authentication(request,env){
 const u=new URL(request.url);
 const local=await passwordAuth(request,env);if(local)return local;
 if(u.pathname==='/auth/change-password'&&request.method==='POST'){
  if(!sameOrigin(request))return json({ok:false,error:'Same-origin request required'},403);
  const user=await authorize(request,env);
  if(!user?.subject.startsWith('password:'))return json({ok:false,error:'Sign-in required'},401);
  const raw=await request.text();if(raw.length>2048)return json({ok:false,error:'Invalid request'},400);
  const fields=new URLSearchParams(raw),current=fields.get('current')||'',next=fields.get('next')||'';
  if(next.length<12||next.length>128||current.length>256)return json({ok:false,error:'New password must be 12–128 characters'},400);
  const name=user.subject.slice(9),account=await env.DB.prepare('SELECT verifier FROM password_accounts WHERE username=?').bind(name).first();
  if(!account||!await verifyPassword(current,account.verifier))return json({ok:false,error:'Current password is incorrect'},403);
  const salt=crypto.getRandomValues(new Uint8Array(16)),key=await crypto.subtle.importKey('raw',encoder.encode(next),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:100000,hash:'SHA-256'},key,256);
  const verifier='100000.'+encode(salt)+'.'+encode(bits);
  await env.DB.prepare('UPDATE password_accounts SET verifier=?,changed_at=CURRENT_TIMESTAMP,must_change_password=0 WHERE username=?').bind(verifier,name).run();
  await env.DB.prepare('DELETE FROM auth_sessions WHERE subject=?').bind(user.subject).run();
  return new Response(null,{status:303,headers:{location:'/', 'set-cookie':cookie('__Host_doaa_session','',0),'cache-control':'no-store'}});
 }
 if(u.pathname==='/auth/change-password'&&request.method==='GET'){
  const user=await authorize(request,env);if(!user?.subject.startsWith('password:'))return passwordLoginPage();
  return new Response(`<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><meta charset="utf-8"><title>Change password · DOAA</title><style>body{font:16px system-ui;max-width:420px;margin:10vh auto;padding:24px;background:#f3f5f5;color:#203d55}input,button{display:block;box-sizing:border-box;width:100%;padding:12px;margin:8px 0 20px}button{background:#214b67;color:white;border:0;border-radius:5px}a{color:#214b67}</style><h1>Change password</h1><form method="post" action="/auth/change-password"><label>Current password<input name="current" type="password" autocomplete="current-password" required></label><label>New password (at least 12 characters)<input name="next" type="password" autocomplete="new-password" minlength="12" required></label><button>Change password and sign out</button></form><a href="/">Return to DOAA</a></html>`,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','content-security-policy':"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'"}});
 }
 if(u.pathname==='/auth/start'&&request.method==='GET'){
  let ready=false;try{ready=configured(env);}catch{}if(!ready)return loginPage('Sign-in is currently unavailable. DOAA data remains private.',503);
  const redirect=new URL(env.GOOGLE_REDIRECT_URI);if(redirect.origin!==u.origin||redirect.pathname!=='/auth/callback'||redirect.search||redirect.protocol!=='https:')return loginPage('Sign-in is currently unavailable.',503);
  const state=random(),nonce=random(),verifier=random(),at=new Date(Date.now()+600000).toISOString();
  // Bound unauthenticated state storage, including abandoned login attempts.
  await env.DB.prepare('DELETE FROM auth_attempts WHERE expires_at<=?').bind(new Date().toISOString()).run();
  const pending=await env.DB.prepare('SELECT COUNT(*) count FROM auth_attempts').first();
  if(Number(pending?.count)>=100)return loginPage('Sign-in is busy. Please try again shortly.',429);
  await env.DB.prepare('INSERT INTO auth_attempts(state_hash,nonce,verifier,expires_at) VALUES(?,?,?,?)').bind(await hash(state),nonce,verifier,at).run();
  const location=new URL('https://accounts.google.com/o/oauth2/v2/auth');location.search=new URLSearchParams({client_id:env.GOOGLE_CLIENT_ID,redirect_uri:env.GOOGLE_REDIRECT_URI,response_type:'code',scope:'openid',state,nonce,code_challenge:await hash(verifier),code_challenge_method:'S256'});
  return new Response(null,{status:302,headers:{location:location.toString(),'set-cookie':cookie('__Host_doaa_state',state,600),'cache-control':'no-store'}});
 }
 if(u.pathname==='/auth/callback'&&request.method==='GET'){
  const state=u.searchParams.get('state'),expected=cookies(request).__Host_doaa_state;
  const fail=(message,status)=>{const r=loginPage(message,status);r.headers.append('set-cookie',cookie('__Host_doaa_state','',0));r.headers.append('set-cookie',cookie('__Host_doaa_session','',0));return r;};
  if(!state||state!==expected||!/^[\w-]{43}$/.test(state)||!u.searchParams.get('code')||!env.DB)return fail('Sign-in could not be verified. Please try again.',400);
  const attempt=await env.DB.prepare('DELETE FROM auth_attempts WHERE state_hash=? RETURNING nonce,verifier,expires_at').bind(await hash(state)).first();
  if(!attempt||Date.parse(attempt.expires_at)<=Date.now())return fail('This sign-in has expired. Please try again.',400);
  try{
   const r=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({code:u.searchParams.get('code'),client_id:env.GOOGLE_CLIENT_ID,client_secret:env.GOOGLE_CLIENT_SECRET,redirect_uri:env.GOOGLE_REDIRECT_URI,grant_type:'authorization_code',code_verifier:attempt.verifier}),signal:AbortSignal.timeout(9000)});
   if(!r.ok)return fail('Google sign-in could not be completed. Please try again.',502);const j=await r.json(),identity=await verifyIdToken(j.id_token,env.GOOGLE_CLIENT_ID,attempt.nonce);
   if(!approved(env,identity.sub))return fail('This Google account has not been approved for DOAA.',403);
   const token=random(),created=new Date().toISOString(),expires=new Date(Date.now()+SESSION_SECONDS*1000).toISOString();
   await env.DB.prepare('INSERT INTO auth_sessions(token_hash,subject,created_at,expires_at) VALUES(?,?,?,?)').bind(await hash(token),identity.sub,created,expires).run();
   const headers=new Headers({location:'/', 'cache-control':'no-store'});headers.append('set-cookie',cookie('__Host_doaa_state','',0));headers.append('set-cookie',cookie('__Host_doaa_session',token,SESSION_SECONDS));return new Response(null,{status:303,headers});
  }catch{return fail('Sign-in is temporarily unavailable. Please try again.',503);}
 }
 if(u.pathname==='/auth/sign-out'){
  if(request.method!=='POST'||!sameOrigin(request))return json({ok:false,error:'Same-origin POST required'},403);
  const token=cookies(request).__Host_doaa_session;if(token&&env.DB)await env.DB.prepare('DELETE FROM auth_sessions WHERE token_hash=?').bind(await hash(token)).run();
  return new Response(null,{status:303,headers:{location:'/', 'set-cookie':cookie('__Host_doaa_session','',0),'cache-control':'no-store'}});
 }
 if(u.pathname.startsWith('/auth/'))return json({ok:false,error:'Not found'},404);
 return null;
}
export async function gate(request,env){
 const path=new URL(request.url).pathname,isApi=path.startsWith('/api/')||path.startsWith('/memory/');
 let user;try{const handled=await authentication(request,env);if(handled)return{response:handled};user=await authorize(request,env);}catch(error){console.error('DOAA_AUTH_GATE',error?.stack||String(error));return{response:isApi?json({ok:false,error:'Authentication temporarily unavailable'},503):passwordLoginPage('Sign-in is temporarily unavailable.',503)};}
 if(!user)return{response:isApi?json({ok:false,error:'Sign-in required'},401):passwordLoginPage()};
 if(user.must_change_password)return{response:isApi?json({ok:false,error:'Password change required'},403):new Response(null,{status:303,headers:{location:'/auth/change-password','cache-control':'no-store'}})};
 if(!['GET','HEAD','OPTIONS'].includes(request.method)&&!sameOrigin(request))return{response:json({ok:false,error:'Same-origin request required'},403)};
 return{user};
}
