import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';

const migration=n=>readFileSync(new URL('../migrations/'+n,import.meta.url),'utf8');
const columns=db=>db.prepare("PRAGMA table_info('airport_reference_snapshots')").all().map(r=>r.name);
function upgradeLegacy(db){
 if(!columns(db).includes('expected_airports'))
  db.exec('ALTER TABLE airport_reference_snapshots ADD COLUMN expected_airports INTEGER NOT NULL DEFAULT 1 CHECK(expected_airports>=0)');
}
for(const legacy of [false,true]){
 test((legacy?'legacy':'fresh')+' airport reference schema supports six-column inserts',()=>{
  const db=new DatabaseSync(':memory:');
  try{
   if(legacy)db.exec('CREATE TABLE airport_reference_snapshots (snapshot_id TEXT PRIMARY KEY,source_sha256 TEXT NOT NULL,source_url TEXT NOT NULL,retrieved_at TEXT NOT NULL,ready INTEGER NOT NULL DEFAULT 0)');
   else db.exec(migration('0010_airport_reference.sql'));
   db.exec(migration('0013_airfield_reference.sql'));
   upgradeLegacy(db);
   upgradeLegacy(db);
   assert.ok(columns(db).includes('expected_airports'));
   db.prepare('INSERT INTO airport_reference_snapshots(snapshot_id,source_sha256,source_url,retrieved_at,expected_airports,ready) VALUES(?,?,?,?,?,?)').run('test','a'.repeat(64),'source','2026-10-11',1,1);
   assert.equal(db.prepare('SELECT expected_airports FROM airport_reference_snapshots').get().expected_airports,1);
  }finally{db.close();}
 });
}
