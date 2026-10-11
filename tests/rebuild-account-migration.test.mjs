import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
const read=name=>readFileSync(new URL('../migrations/'+name,import.meta.url),'utf8');
test('additive account migration retains identity and rejects invalid roles',()=>{
 const db=new DatabaseSync(':memory:');
 try{
  db.exec(read('0015_password_accounts.sql'));
  db.prepare('INSERT INTO password_accounts(username,verifier) VALUES(?,?)').run('owner','existing');
  db.exec(read('0016_account_administration.sql'));
  const row=db.prepare('SELECT username,verifier,role,must_change_password FROM password_accounts').get();
  assert.equal(row.username,'owner');assert.equal(row.verifier,'existing');
  assert.equal(row.role,'user');assert.equal(row.must_change_password,0);
  assert.throws(()=>db.exec("UPDATE password_accounts SET role='invalid'"),/constraint/i);
 }finally{db.close();}
});
