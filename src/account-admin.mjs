// Account administration. All routes require gate() authentication before dispatch.
// The configured original password user is the bootstrap administrator until role migration.
import { hash } from './auth.mjs';
const enc=new TextEncoder();
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
const nameOK=s=>typeof s==='string'&&/^[A-Za-z0-9][A-Za-z0-9._-]{2,63}$/.test(s);
const validPassword=s=>typeof s==='string'&&s.length>=12&&s.length<=128;
const randomPassword=()=>{const bytes=crypto.getRandomValues(new Uint8Array(24));return Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');};
const base64=b=>btoa(String.fromCharCode(...new Uint8Array(b))).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
async function verifier(password){
 const salt=crypto.getRandomValues(new Uint8Array(16));
 const key=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveBits']);
 const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:100000,hash:'SHA-256'},key,256);
 return '100000.'+base64(salt)+'.'+base64(bits);
}
async function accountRole(env,subject){
 if(!subject?.startsWith('password:'))return null;
 const username=subject.slice(9);
 const account=await env.DB.prepare('SELECT username,role,disabled_at,must_change_password FROM password_accounts WHERE username=?').bind(username).first();
 if(!account||account.disabled_at)return null;
 const bootstrap=username===env.DOAA_PASSWORD_USERNAME;
 return {...account,role:bootstrap?'admin':account.role};
}
async function readJson(request){
 const n=Number(request.headers.get('content-length')||0);
 if(n>4096)throw Error('bad request');
 const raw=await request.text();
 if(raw.length>4096)throw Error('bad request');
 const data=JSON.parse(raw);
 if(!data||typeof data!=='object'||Array.isArray(data))throw Error('bad request');
 return data;
}
export async function accountAdminApi(request,env,user){
 const url=new URL(request.url),path=url.pathname;
 if(path!=='/api/admin/users'&&!path.startsWith('/api/admin/users/'))return null;
 if(!env.DB)return reply({ok:false,error:'Account storage unavailable'},503);
 const actor=await accountRole(env,user?.subject);
 if(actor?.role!=='admin')return reply({ok:false,error:'Administrator permission required'},403);
 if(path==='/api/admin/users'&&request.method==='GET'){
  const rows=await env.DB.prepare('SELECT username,role,created_at,changed_at,disabled_at,must_change_password FROM password_accounts ORDER BY username LIMIT 200').all();
  return reply({ok:true,users:(rows.results||[]).map(row=>({...row,role:row.username===env.DOAA_PASSWORD_USERNAME?'admin':row.role}))});
 }
 if(path==='/api/admin/users'&&request.method==='POST'){
  let data;try{data=await readJson(request);}catch{return reply({ok:false,error:'Invalid account request'},400);}
  if(!nameOK(data.username)||!['user','admin'].includes(data.role||'user'))return reply({ok:false,error:'Invalid username or role'},400);
  const password=randomPassword(),secret=await verifier(password);
  try{
   await env.DB.prepare('INSERT INTO password_accounts(username,verifier,role,must_change_password) VALUES(?,?,?,1)').bind(data.username,secret,data.role||'user').run();
  }catch(e){if(/UNIQUE|constraint/i.test(String(e)))return reply({ok:false,error:'Username unavailable'},409);throw e;}
  // Display the temporary credential exactly once, to the authenticated admin over TLS.
  return reply({ok:true,username:data.username,temporary_password:password,must_change_password:true},201);
 }
 const match=path.match(/^\/api\/admin\/users\/([A-Za-z0-9][A-Za-z0-9._-]{2,63})\/(disable|enable|reset-password)$/);
 if(!match||request.method!=='POST')return reply({ok:false,error:'Not found'},404);
 const [,username,action]=match;
 if(username===env.DOAA_PASSWORD_USERNAME&&action==='disable')return reply({ok:false,error:'Bootstrap administrator cannot be disabled'},409);
 if(username===actor.username&&action==='disable')return reply({ok:false,error:'Cannot disable your own account'},409);
 const exists=await env.DB.prepare('SELECT username FROM password_accounts WHERE username=?').bind(username).first();
 if(!exists)return reply({ok:false,error:'Account not found'},404);
 if(action==='reset-password'){
  const password=randomPassword(),secret=await verifier(password);
  await env.DB.prepare('UPDATE password_accounts SET verifier=?,changed_at=CURRENT_TIMESTAMP,must_change_password=1 WHERE username=?').bind(secret,username).run();
  await env.DB.prepare('DELETE FROM auth_sessions WHERE subject=?').bind('password:'+username).run();
  return reply({ok:true,username,temporary_password:password,must_change_password:true});
 }
 await env.DB.prepare('UPDATE password_accounts SET disabled_at=? WHERE username=?').bind(action==='disable'?new Date().toISOString():null,username).run();
 if(action==='disable')await env.DB.prepare('DELETE FROM auth_sessions WHERE subject=?').bind('password:'+username).run();
 return reply({ok:true,username,disabled:action==='disable'});
}
