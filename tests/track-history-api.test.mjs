import test from 'node:test';
import assert from 'node:assert/strict';
import { trackHistory } from '../src/track-history.mjs';
function db(encounter,rows=[]){const calls=[];return{calls,prepare(sql){const call={sql,params:[]};calls.push(call);return{bind(...params){call.params=params;return this;},async first(){return encounter;},async all(){return{results:rows};}};}};}
test('track read fails clearly without a database, rejects malformed identity and never writes',async()=>{
  assert.equal((await trackHistory(new Request('https://doaa.test/api/track-history?hex=C00001'),{})).status,503);
  const DB=db({id:1});assert.equal((await trackHistory(new Request('https://doaa.test/api/track-history?hex=unknown'),{DB})).status,400);
  assert.equal(DB.calls.length,0);
});
test('an explicit encounter is restricted to the requested physical identity, never latest external data',async()=>{
  const DB=db(null);const j=await(await trackHistory(new Request('https://doaa.test/api/track-history?hex=c00001&encounter=17'),{DB})).json();
  assert.equal(j.found,false);assert.deepEqual(DB.calls[0].params,['C00001',17]);assert.match(DB.calls[0].sql,/e.canonical_key=\? AND c.id=\?/);
});
test('bounded chronological keyset pages preserve every original sample and disclose partial coverage',async()=>{
  const rows=[1,2,3].map(id=>({id,observed_at:'2026-10-11T14:00:00.000Z'})),DB=db({id:7,observation_count:3},rows);
  const j=await(await trackHistory(new Request('https://doaa.test/api/track-history?hex=C00001&limit=2'),{DB})).json();
  assert.equal(j.observations.length,2);assert.deepEqual(j.next,{after:'2026-10-11T14:00:00.000Z',after_id:2});assert.equal(j.coverage.complete_surveillance,false);
  assert.deepEqual(DB.calls[1].params,[7,3]);assert.doesNotMatch(DB.calls.map(c=>c.sql).join(' '),/INSERT|UPDATE|DELETE/);
});
test('candidates come only from recorded encounters, exclude track 1, and search is parameterized',async()=>{
  const DB=db({id:7,first_seen_at:'2026-10-11T14:00:00.000Z',last_seen_at:'2026-10-11T15:00:00.000Z'},[]);
  const j=await(await trackHistory(new Request('https://doaa.test/api/track-history?hex=C00001&candidates=1&q=%25'),{DB})).json();
  assert.deepEqual(j.candidates,[]);assert.match(DB.calls[1].sql,/c.observation_count>0/);assert.equal(DB.calls[1].params[0],'C00001');assert.equal(DB.calls[1].params[1],'%\\%%');
});

test('observation database failure is an explicit unavailable response',async()=>{
 const DB={prepare(){throw Error('offline');}};
 const r=await trackHistory(new Request('https://doaa.test/api/track-history?hex=C00001'),{DB});assert.equal(r.status,503);assert.match((await r.json()).error,/temporarily unavailable/);
});

test('real SQLite queries isolate encounters, page all samples and preserve original evidence',async()=>{
 const {DatabaseSync}=await import('node:sqlite'),{readFileSync}=await import('node:fs');
 const sql=new DatabaseSync(':memory:');sql.exec(readFileSync(new URL('../scripts/preview-empty-schema.sql',import.meta.url),'utf8'));
 sql.exec(`INSERT INTO entities(id,kind,canonical_key) VALUES(1,'airframe','C00001'),(2,'airframe','C00002');
 INSERT INTO encounters(id,entity_id,contact_key,first_seen_at,last_seen_at,observation_count) VALUES(17,1,'first','2026-10-11T12:00:00.000Z','2026-10-11T12:02:00.000Z',3),(18,2,'second','2026-10-11T12:01:00.000Z','2026-10-11T12:03:00.000Z',1);
 INSERT INTO observations(id,entity_id,encounter_id,observed_at,latitude,longitude,altitude_ft) VALUES(1,1,17,'2026-10-11T12:00:00.000Z',45,-75,0),(2,1,17,'2026-10-11T12:01:00.000Z',45.01,-75,1000),(3,1,17,'2026-10-11T12:02:00.000Z',45.02,-75,NULL),(4,2,18,'2026-10-11T12:01:00.000Z',45.03,-75,2000);`);
 const DB={prepare(query){let params=[];return{bind(...v){params=v;return this;},async first(){return sql.prepare(query).get(...params)||null;},async all(){return{results:sql.prepare(query).all(...params)};}};}};
 const read=async q=>(await(await trackHistory(new Request('https://doaa.test/api/track-history?hex=C00001&'+q),{DB})).json());
 assert.equal((await read('encounter=18')).found,false,'another identity encounter is not borrowed');
 let q='encounter=17&limit=1',all=[];do{const j=await read(q);all.push(...j.observations);if(!j.next)break;q='encounter=17&limit=1&'+new URLSearchParams(j.next);}while(true);
 assert.deepEqual(all.map(x=>x.id),[1,2,3]);assert.equal(all[0].altitude_ft,0);assert.equal(all[2].altitude_ft,null);
 assert.equal((await read('encounter=17&candidates=1')).candidates[0].encounter_id,18);
 assert.equal(sql.prepare('SELECT COUNT(*) n FROM observations').get().n,4);
});
