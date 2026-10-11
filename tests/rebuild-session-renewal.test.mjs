import test from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {authentication,hash} from '../src/auth.mjs';
if(!globalThis.crypto)globalThis.crypto=webcrypto;
const token='A'.repeat(43),origin='https://doaa.example';
async function fixture(daysLeft,{disabled=false}={}){
 const expiry=new Date(Date.now()+daysLeft*86400000).toISOString();
 const tokenHash=await hash(token);
 const account={username:'reader',disabled_at:disabled?new Date().toISOString():null,must_change_password:0};
 const changes=[];
 const db={prepare(sql){return {args:[],bind(...args){this.args=args;return this;},async first(){
  if(sql.startsWith('SELECT subject,expires_at FROM auth_sessions'))return this.args[0]===tokenHash?{subject:'password:reader',expires_at:expiry}:null;
  if(sql.startsWith('SELECT username,disabled_at,must_change_password FROM password_accounts'))return account;
  throw Error('Unexpected query '+sql);
 },async run(){changes.push({sql,args:this.args});return {success:true}}}}};
 return {env:{DB:db},changes};
}
const request=(method='POST',originHeader=origin)=>new Request(origin+'/auth/renew',{method,headers:{origin:originHeader,cookie:'__Host_doaa_session='+token}});
test('active session not near expiry is not rewritten',async()=>{
 const f=await fixture(120),r=await authentication(request(),f.env);
 assert.equal(r.status,204);assert.equal(r.headers.get('set-cookie'),null);assert.equal(f.changes.length,0);
});
test('active session approaching expiry renews database and secure cookie',async()=>{
 const f=await fixture(20),r=await authentication(request(),f.env);
 assert.equal(r.status,204);assert.equal(f.changes.length,1);
 assert.match(f.changes[0].sql,/UPDATE auth_sessions SET expires_at/);
 assert.match(r.headers.get('set-cookie'),/HttpOnly; Secure; SameSite=Lax; Max-Age=15552000/);
});
test('expired or disabled sessions cannot renew',async()=>{
 for(const options of [[-1,{}],[20,{disabled:true}]]){
  const f=await fixture(...options),r=await authentication(request(),f.env);
  assert.equal(r.status,401);assert.equal(f.changes.length,0);
 }
});
test('renewal requires same-origin POST',async()=>{
 const f=await fixture(20);
 assert.equal((await authentication(request('GET'),f.env)).status,405);
 assert.equal((await authentication(request('POST','https://attacker.example'),f.env)).status,403);
 assert.equal(f.changes.length,0);
});
