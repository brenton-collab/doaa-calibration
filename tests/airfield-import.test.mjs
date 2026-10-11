import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {DatabaseSync} from 'node:sqlite';

test('local import defaults limit quota exposure; explicit scopes have distinct snapshot identities and atomic readiness',()=>{
 const dir=mkdtempSync(join(tmpdir(),'doaa-airfield-'));
 try{
  const input=join(dir,'source.csv'),output=join(dir,'plan.json');
  const header='id,airport_ref,airport_ident,length_ft,width_ft,surface,lighted,closed,le_ident,le_latitude_deg,le_longitude_deg,le_elevation_ft,le_heading_degT,le_displaced_threshold_ft,he_ident,he_latitude_deg,he_longitude_deg,he_elevation_ft,he_heading_degT,he_displaced_threshold_ft';
  const row=code=>`1,2,${code},8000,200,ASP,1,0,07,45.31,-75.67,373,57.2,,25,45.32,-75.64,362,237.2,0`;
  writeFileSync(input,header+'\n'+['CYOW','CYUL','EGLL'].map(row).join('\n')+'\n');
  const prepare=(...options)=>{execFileSync(process.execPath,['scripts/prepare-airfield-import.mjs',input,output,...options]);return JSON.parse(readFileSync(output,'utf8'));};
  const limited=prepare(),all=prepare('--all-airports'),custom=prepare('--airports','EGLL');
  assert.deepEqual(limited.prepared_airports,['CYOW','CYUL']);assert.equal(limited.statements.length,4);
  assert.equal(limited.remote_execution_requires_quota_review,true);assert.equal(limited.production_forbidden,true);
  assert.deepEqual(limited.missing_requested_airports,['CYHU','CYMX','KPBG']);
  assert.equal(all.airports,3);assert.deepEqual(custom.prepared_airports,['EGLL']);
  assert.equal(new Set([limited.snapshot_id,all.snapshot_id,custom.snapshot_id]).size,3);
  assert.equal(limited.source_sha256,all.source_sha256);
  assert.throws(()=>prepare('--airports','CYOW;DROP'));assert.throws(()=>prepare('--all-airports','--airports','CYOW'));
  const db=new DatabaseSync(':memory:');db.exec(readFileSync('migrations/0013_airfield_reference.sql','utf8'));
  db.exec(limited.statements[0]);db.exec(limited.statements.at(-1));assert.equal(db.prepare('SELECT ready FROM airport_reference_snapshots').get().ready,0);
  for(const sql of limited.statements.slice(1))db.exec(sql);
  assert.equal(db.prepare('SELECT ready FROM airport_reference_snapshots').get().ready,1);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM airport_reference_rows').get().n,2);db.close();
 }finally{rmSync(dir,{recursive:true,force:true});}
});
