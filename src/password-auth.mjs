// Password login is an alternative to Google OAuth, not a replacement.
// Password verifier is provisioned as a Worker secret, never stored in D1 or git.
const te=new TextEncoder();
const base64=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
const from64=s=>Uint8Array.from(atob(s.replaceAll('-','+').replaceAll('_','/')+'='.repeat((4-s.length%4)%4)),c=>c.charCodeAt(0));
const secureRandom=()=>base64(crypto.getRandomValues(new Uint8Array(32)));
const digest=async s=>base64(await crypto.subtle.digest('SHA-256',te.encode(s)));
const cookie=(value,age)=>`__Host_doaa_session=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;
const formPage=(message='',status=200)=>new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sign in · DOAA</title><style>body{margin:0;min-height:100dvh;display:grid;place-items:center;background:#f1f3f2;color:#263f50;font:16px/1.5 system-ui}main{width:min(390px,calc(100vw - 48px));padding:30px;background:white;border:1px solid #cbd6db;border-radius:12px}h1{margin:0;font-size:30px;letter-spacing:.12em}label{display:block;margin-top:18px;font-weight:600;font-size:13px}input{box-sizing:border-box;width:100%;padding:13px;border:1px solid #98aeb9;border-radius:6px;font:inherit}button{margin-top:24px;width:100%;padding:13px;background:#214b67;color:white;border:0;border-radius:6px;font:600 15px system-ui;cursor:pointer}a{color:#214b67}p{font-size:13px} .error{color:#a12c26}</style><main><h1>DOAA</h1><p>David's Ottawa Aviation App</p>${message?'<p class="error" role="alert">'+message+'</p>':''}<form method="post" action="/auth/password"><label for="username">Username</label><input id="username" name="username" autocomplete="username" required maxlength="80"><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required maxlength="256"><button>Sign in</button></form><p>Google sign-in is planned but not configured.</p></main></html>`,{status,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','content-security-policy':"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"}});
async function verify(password,secret){
 // Secret format: iterations.saltBase64url.derivedKeyBase64url
 const [iterations,salt,expected,...extra]=String(secret||'').split('.');
 if(extra.length||!/^\d+$/.test(iterations)||Number(iterations)<100000||Number(iterations)>100000||!salt||!expected)return false;
 const key=await crypto.subtle.importKey('raw',te.encode(password),'PBKDF2',false,['deriveBits']);
 const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:from64(salt),iterations:Number(iterations),hash:'SHA-256'},key,256);
 const actual=new Uint8Array(bits),want=from64(expected);let diff=actual.length^want.length;for(let i=0;i<Math.max(actual.length,want.length);i++)diff|=(actual[i]||0)^(want[i]||0);return diff===0;
}
export {formPage as passwordLoginPage};
export async function passwordAuth(request,env){
 const u=new URL(request.url);
 if(u.pathname!=='/auth/password')return null;
 if(request.method!=='POST')return new Response('Method not allowed',{status:405,headers:{allow:'POST'}});
 if(request.headers.get('origin')!==u.origin)return formPage('Please retry sign-in from this page.',403);
 if(!env.DB||!env.DOAA_PASSWORD_VERIFIER||!env.DOAA_PASSWORD_USERNAME)return formPage('Password sign-in is not configured.',503);
 const size=Number(request.headers.get('content-length')||0);if(size>2048)return formPage('Invalid sign-in request.',400);
 let raw;try{raw=await request.text();if(raw.length>2048)throw Error('too large');}catch{return formPage('Invalid sign-in request.',400);}
 const params=new URLSearchParams(raw),username=params.get('username')||'',password=params.get('password')||'';
 if(username.length>80||password.length>256||!password)return formPage('Invalid credentials.',401);
 // Durable rate limit per username and client IP. Do not disclose whether the username exists.
 const ip=request.headers.get('CF-Connecting-IP')||'unknown';
 const bucket=await digest(username.toLowerCase()+'|'+ip);
 const now=Date.now(),windowStart=new Date(now-15*60000).toISOString();
 const row=await env.DB.prepare('SELECT attempts,window_started FROM password_login_limits WHERE bucket=?').bind(bucket).first();
 if(row&&Date.parse(row.window_started)>Date.parse(windowStart)&&row.attempts>=8)return formPage('Too many attempts. Try again later.',429);
 const validUser=username===env.DOAA_PASSWORD_USERNAME;
 const validPassword=await verify(password,env.DOAA_PASSWORD_VERIFIER);
 if(!validUser||!validPassword){
  await env.DB.prepare("INSERT INTO password_login_limits(bucket,attempts,window_started) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET attempts=CASE WHEN window_started<? THEN 1 ELSE attempts+1 END,window_started=CASE WHEN window_started<? THEN excluded.window_started ELSE window_started END").bind(bucket,new Date(now).toISOString(),windowStart,windowStart).run();
  return formPage('Invalid credentials.',401);
 }
 await env.DB.prepare('DELETE FROM password_login_limits WHERE bucket=?').bind(bucket).run();
 const token=secureRandom(),created=new Date(now).toISOString(),age=7*24*3600,expires=new Date(now+age*1000).toISOString();
 const subject='password:'+username;
 await env.DB.prepare('INSERT INTO auth_sessions(token_hash,subject,created_at,expires_at) VALUES(?,?,?,?)').bind(await digest(token),subject,created,expires).run();
 return new Response(null,{status:303,headers:{location:'/', 'set-cookie':cookie(token,age),'cache-control':'no-store'}});
}
