import test from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {accountAdminApi} from '../src/account-admin.mjs';
if(!globalThis.crypto)globalThis.crypto=webcrypto;
function fakeDb(){
 const accounts=new Map([['owner',{username:'owner',role:'user',disabled_at:null,must_change_password:0,verifier:'existing',created_at:'2026-10-11',changed_at:'2026-10-11'}]]);
 const sessions=new Map([['password:owner',1]]);
 return {accounts,sessions,prepare(sql){const state={args:[],bind(...args){this.args=args;return this;},async first(){
  const name=this.args[0];
  if(sql.startsWith('SELECT username,role'))return accounts.get(name)||null;
  if(sql.startsWith('SELECT username FROM'))return accounts.get(name)?{username:name}:null;
  throw Error('Unexpected first query '+sql);
 },async all(){
  if(sql.startsWith('SELECT username,role,created_at'))return {results:[...accounts.values()]};
  throw Error('Unexpected all query '+sql);
 },async run(){
  if(sql.startsWith('INSERT INTO password_accounts')){
   const [username,verifier,role]=this.args;
   if(accounts.has(username))throw Error('UNIQUE constraint failed');
   accounts.set(username,{username,verifier,role,disabled_at:null,must_change_password:1,created_at:'now',changed_at:'now'});
   return {success:true};
  }
  if(sql.startsWith('UPDATE password_accounts SET verifier=')){
   const [verifier,username]=this.args;Object.assign(accounts.get(username),{verifier,must_change_password:1});return {success:true};
  }
  if(sql.startsWith('UPDATE password_accounts SET disabled_at=')){
   const [disabled_at,username]=this.args;accounts.get(username).disabled_at=disabled_at;return {success:true};
  }
  if(sql.startsWith('DELETE FROM auth_sessions')){sessions.delete(this.args[0]);return {success:true};}
  throw Error('Unexpected run query '+sql);
 }};return state;}};
}
const env=db=>({DB:db,DOAA_PASSWORD_USERNAME:'owner'});
const url='https://doaa.example/api/admin/users';
const req=(path=url,method='GET',body)=>new Request(path,{method,headers:body?{'content-type':'application/json','origin':'https://doaa.example'}:undefined,body:body?JSON.stringify(body):undefined});
test('standard user cannot list or create accounts',async()=>{
 const db=fakeDb();db.accounts.set('reader',{username:'reader',role:'user',disabled_at:null,must_change_password:0});
 const denied=await accountAdminApi(req(),env(db),{subject:'password:reader'});
 assert.equal(denied.status,403);
 const post=await accountAdminApi(req(url,'POST',{username:'newuser'}),env(db),{subject:'password:reader'});
 assert.equal(post.status,403);assert.equal(db.accounts.has('newuser'),false);
});
test('bootstrap admin can create account and credential is returned only once',async()=>{
 const db=fakeDb(),response=await accountAdminApi(req(url,'POST',{username:'newuser',role:'user'}),env(db),{subject:'password:owner'});
 assert.equal(response.status,201);
 const data=await response.json();assert.equal(data.must_change_password,true);
 assert.ok(data.temporary_password.length>=32);
 assert.equal(db.accounts.get('newuser').must_change_password,1);
 const listing=await (await accountAdminApi(req(),env(db),{subject:'password:owner'})).json();
 assert.ok(listing.users.find(x=>x.username==='newuser'));
 assert.ok(!JSON.stringify(listing).includes(data.temporary_password));
});
test('disabled user loses admin access and bootstrap cannot be disabled',async()=>{
 const db=fakeDb();
 db.accounts.set('manager',{username:'manager',role:'admin',disabled_at:'2026-10-11',must_change_password:0});
 assert.equal((await accountAdminApi(req(),env(db),{subject:'password:manager'})).status,403);
 const deny=await accountAdminApi(req(url+'/owner/disable','POST'),env(db),{subject:'password:owner'});
 assert.equal(deny.status,409);
});
test('reset revokes user sessions and requires password change',async()=>{
 const db=fakeDb();db.accounts.set('reader',{username:'reader',role:'user',disabled_at:null,must_change_password:0});
 db.sessions.set('password:reader',1);
 const r=await accountAdminApi(req(url+'/reader/reset-password','POST'),env(db),{subject:'password:owner'});
 assert.equal(r.status,200);assert.equal(db.sessions.has('password:reader'),false);
 assert.equal(db.accounts.get('reader').must_change_password,1);
});
