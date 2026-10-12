import test from 'node:test';import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';import {readFileSync} from 'node:fs';
import worker from '../src/worker.js';import {hash} from '../src/auth.mjs';
function database(){const sql=new DatabaseSync(':memory:');sql.exec(readFileSync('scripts/preview-empty-schema.sql','utf8'));const queries=[];return{sql,queries,prepare(query){let params=[];queries.push(query);return{bind(...v){params=v;return this;},async first(){return sql.prepare(query).get(...params)||null;},async all(){return{results:sql.prepare(query).all(...params)};},async run(){return sql.prepare(query).run(...params);}};}};}
async function environment(){const DB=database(),token='a'.repeat(43);await DB.prepare('INSERT INTO auth_sessions VALUES(?,?,?,?)').bind(await hash(token),'approved-subject',new Date().toISOString(),new Date(Date.now()+86400000).toISOString()).run();return{DB,DOAA_ALLOWED_SUBJECTS:'["approved-subject"]',cookie:'__Host_doaa_session='+token};}
const request=(env,call='TEST234')=>new Request('https://doaa.test/api/dossier?hex=C00001&call='+call,{headers:{cookie:env.cookie}});
test('a dossier identity lookup is read only, bounds provider fanout, and preserves provenance/conflicts',async()=>{
 const env=await environment();env.DB.sql.exec(`INSERT INTO entities(id,kind,canonical_key) VALUES(1,'airframe','C00001');INSERT INTO identifiers(entity_id,scheme,value,normalized_value) VALUES(1,'icao24','C00001','C00001');INSERT INTO claims(entity_id,predicate,value_text,status) VALUES(1,'registration','C-OLD','supported');`);
 const previous=globalThis.fetch,calls=[],changes=env.DB.sql.prepare('SELECT total_changes() n').get().n;
 globalThis.fetch=async(url,options)=>{calls.push({url,options});return new Response(JSON.stringify({response:{aircraft:{registration:'C-NEW',icao_type:'E295',manufacturer:'Embraer',type:'E195-E2',registered_owner:'Fixture owner'},flightroute:{callsign_icao:'TEST234',callsign_iata:'T234',airline:{name:'Fixture carrier',icao:'TES'},origin:{icao_code:'CYOW',latitude:45.32,longitude:-75.67},destination:{icao_code:'CYYZ',latitude:43.67,longitude:-79.63}}}}));};
 try{env.DB.queries.length=0;const r=await worker.fetch(request(env),env,{}),j=await r.json();assert.equal(r.status,200);assert.equal(j.enrichment.read_only,true);assert.equal(calls.length,1);assert.ok(calls[0].options.signal);assert.equal(j.flight.dep_lat,45.32);assert.equal(j.flight.current_assignment_established,false);assert.equal(j.identity.registration,null);assert.deepEqual(j.identity_conflicts.registration,['C-OLD','C-NEW']);assert.ok(j.memory.claims.some(c=>c.source_name==='ADSBdb aircraft identity'));assert.equal(j.media.image,null);assert.equal(env.DB.sql.prepare('SELECT total_changes() n').get().n,changes);assert.ok(env.DB.queries.every(q=>/^\s*SELECT\b/i.test(q)));assert.equal(env.DB.queries.filter(q=>/SELECT c\.\*|FROM encounters/i.test(q)).length,2,'one history summary and its recent rows, no duplicate history reread');}
 finally{globalThis.fetch=previous;env.DB.sql.close();}
});
test('a complete remembered dossier requires no provider requests and cannot research media on read',async()=>{
 const env=await environment();env.DB.sql.exec(`INSERT INTO entities(id,kind,canonical_key) VALUES(1,'airframe','C00001');INSERT INTO identifiers(entity_id,scheme,value,normalized_value) VALUES(1,'icao24','C00001','C00001');`);
 for(const [predicate,value] of Object.entries({registration:'C-TEST',icao_type:'E295',manufacturer:'Embraer',model:'E195-E2','route:TEST234':JSON.stringify({dep_icao:'CYOW',arr_icao:'CYYZ',flight_icao:'TEST234'})}))env.DB.sql.prepare('INSERT INTO claims(entity_id,predicate,value_text,status) VALUES(1,?,?,?)').run(predicate,value,'supported');
 const previous=globalThis.fetch;let calls=0;globalThis.fetch=async()=>{calls++;throw Error('Network forbidden in remembered dossier fixture');};
 try{const changes=env.DB.sql.prepare('SELECT total_changes() n').get().n,j=await(await worker.fetch(request(env),env,{})).json();assert.equal(j.identity.registration,'C-TEST');assert.equal(j.enrichment.free_lookup,false);assert.equal(calls,0);assert.equal(env.DB.sql.prepare('SELECT total_changes() n').get().n,changes);}
 finally{globalThis.fetch=previous;env.DB.sql.close();}
});
test('identity provider failures remain distinct with a bounded free route fallback and no writes',async()=>{
 let scenario=0;
 for(const [response,status] of [[()=>new Response('{}',{status:503}),'unavailable'],[()=>new Response('{}',{status:404}),'not-found'],[()=>new Response('x'.repeat(262145)),'unavailable']]){
  const env=await environment(),previous=globalThis.fetch;let calls=0;globalThis.fetch=async()=>{calls++;return response();};
  try{const changes=env.DB.sql.prepare('SELECT total_changes() n').get().n,j=await(await worker.fetch(request(env,'TEST'+(240+scenario++)),env,{})).json();assert.equal(j.enrichment.free_lookup_status,status);assert.equal(j.enrichment.free_lookup,false);assert.equal(calls,3,'one identity lookup plus two distinct standing-route prefixes');assert.equal(j.identity.registration,null);assert.equal(env.DB.sql.prepare('SELECT total_changes() n').get().n,changes);}
  finally{globalThis.fetch=previous;env.DB.sql.close();}
 }
});
