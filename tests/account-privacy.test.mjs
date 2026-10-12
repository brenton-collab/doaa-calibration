import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { gate, hash, verifyIdToken } from '../src/auth.mjs';
import { personalApi } from '../src/personal.mjs';
import worker from '../src/worker.js';

function database() {
  const sql = new DatabaseSync(':memory:');
  sql.exec(readFileSync(new URL('../migrations/0012_private_accounts.sql',import.meta.url),'utf8'));
  sql.exec(`CREATE TABLE entities(id INTEGER PRIMARY KEY,kind TEXT,canonical_key TEXT);
    CREATE TABLE encounters(id INTEGER PRIMARY KEY,entity_id INTEGER);
    CREATE TABLE observations(id INTEGER PRIMARY KEY,encounter_id INTEGER,observed_at TEXT,latitude REAL,longitude REAL,source_provider TEXT);
    INSERT INTO entities VALUES(1,'airframe','C00001'); INSERT INTO encounters VALUES(1,1);
    INSERT INTO observations VALUES(1,1,'2026-10-11T12:00:00.000Z',45.3,-75.6,'fixture');`);
  return {sql,prepare(query){let args=[];return{bind(...v){args=v;return this;},async first(){return sql.prepare(query).get(...args)||null;},async all(){return{results:sql.prepare(query).all(...args)};},async run(){return sql.prepare(query).run(...args);}};}};
}
const allowed='["david-subject","brent-subject"]';
const request=(path,options={})=>new Request('https://doaa.test'+path,options);
const session=async(DB,subject='david-subject',expires=Date.now()+86400000)=>{const token='a'.repeat(43);await DB.prepare('INSERT INTO auth_sessions VALUES(?,?,?,?)').bind(await hash(token),subject,new Date().toISOString(),new Date(expires).toISOString()).run();return '__Host_doaa_session='+token;};

test('anonymous visitors cannot read app, static aviation assets, live APIs or memory',async()=>{
  const DB=database(),env={DB,DOAA_ALLOWED_SUBJECTS:allowed};
  for(const path of ['/','/index.html','/track-history.js','/api/airfield','/airfield.js','/api/traffic','/api/health','/memory/encounters']){
    const r=await worker.fetch(request(path),env,{});
    if(path.startsWith('/api/')||path.startsWith('/memory/')){assert.equal(r.status,401,path);assert.equal((await r.json()).error,'Sign-in required');}
    else {assert.equal(r.status,200,path);const html=await r.text();assert.match(html,/action="\/auth\/password"/);assert.doesNotMatch(html,/id="detailbody"/,'anonymous visitor receives only sign-in');}
  }
  assert.equal((await worker.fetch(request('/auth/start'),env,{})).status,503,'missing provider configuration fails closed');
});

test('only approved stable subjects with unexpired server sessions pass; mutations require same origin',async()=>{
  for(const [subject,expiry,accepted] of [['david-subject',Date.now()+10000,true],['brent-subject',Date.now()+10000,true],['outsider',Date.now()+10000,false],['david-subject',Date.now()-1,false]]){
    const DB=database(),cookie=await session(DB,subject,expiry),env={DB,DOAA_ALLOWED_SUBJECTS:allowed};
    const result=await gate(request('/api/account',{headers:{cookie}}),env);
    assert.equal(!!result.user,accepted);
    if(accepted){assert.equal((await gate(request('/api/preferences',{method:'PUT',headers:{cookie,origin:'https://attacker.test'}}),env)).response.status,403);}
  }
});

test('revoking an allowlist subject immediately invalidates its session; sign-out deletes only this session',async()=>{
  const DB=database(),cookie=await session(DB),env={DB,DOAA_ALLOWED_SUBJECTS:allowed};
  assert.equal((await gate(request('/api/account',{headers:{cookie}}),{...env,DOAA_ALLOWED_SUBJECTS:'["brent-subject"]'})).response.status,401);
  const out=await gate(request('/auth/sign-out',{method:'POST',headers:{cookie,origin:'https://doaa.test'}}),env);
  assert.equal(out.response.status,303);assert.match(out.response.headers.get('set-cookie'),/Max-Age=0/);
  assert.equal((await gate(request('/api/account',{headers:{cookie}}),env)).response.status,401);
  assert.equal(DB.sql.prepare('SELECT COUNT(*) n FROM observations').get().n,1);
});

test('auth infrastructure failure returns an honest unavailable state, not a public fallback',async()=>{
  const cookie='__Host_doaa_session='+'a'.repeat(43),env={DB:{prepare(){throw Error('database offline');}},DOAA_ALLOWED_SUBJECTS:allowed};
  const r=(await gate(request('/api/traffic',{headers:{cookie}}),env)).response;
  assert.equal(r.status,503);assert.match((await r.json()).error,/unavailable/);
});

const b64=b=>Buffer.from(b).toString('base64url');
test('OIDC verifies real RSA signatures, nonce, audience, issuer, expiry and algorithm',async()=>{
  const pair=await crypto.subtle.generateKey({name:'RSASSA-PKCS1-v1_5',modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:'SHA-256'},true,['sign','verify']);
  const jwk={...await crypto.subtle.exportKey('jwk',pair.publicKey),kid:'fixture-key'};
  const payload={iss:'https://accounts.google.com',aud:'client-id',sub:'david-subject',exp:Date.now()/1000+3600,iat:Date.now()/1000,nonce:'nonce'};
  const sign=async(p,h={alg:'RS256',kid:jwk.kid})=>{const input=b64(JSON.stringify(h))+'.'+b64(JSON.stringify(p)),signature=await crypto.subtle.sign('RSASSA-PKCS1-v1_5',pair.privateKey,new TextEncoder().encode(input));return input+'.'+b64(signature);};
  const keys=async()=>[jwk];assert.equal((await verifyIdToken(await sign(payload),'client-id','nonce',keys)).sub,'david-subject');
  for(const patch of [{iss:'attacker'},{aud:'other-app'},{exp:1},{nonce:'wrong'},{sub:''},{iat:Date.now()/1000+3600},{azp:'other-app'}])await assert.rejects(verifyIdToken(await sign({...payload,...patch}),'client-id','nonce',keys));
  await assert.rejects(verifyIdToken(await sign(payload,{alg:'none',kid:jwk.kid}),'client-id','nonce',keys));
  const token=await sign(payload),parts=token.split('.');parts[1]=b64(JSON.stringify({...payload,sub:'outsider'}));await assert.rejects(verifyIdToken(parts.join('.'),'client-id','nonce',keys));
});

test('sign-in uses one-time random state, nonce and PKCE and rejects state/callback replay before token exchange',async()=>{
  const DB=database(),env={DB,DOAA_ALLOWED_SUBJECTS:allowed,GOOGLE_CLIENT_ID:'client',GOOGLE_CLIENT_SECRET:'fixture-not-real',GOOGLE_REDIRECT_URI:'https://doaa.test/auth/callback'};
  const r=(await gate(request('/auth/start'),env)).response;assert.equal(r.status,302);
  const location=new URL(r.headers.get('location'));assert.equal(location.origin,'https://accounts.google.com');assert.equal(location.searchParams.get('scope'),'openid');assert.equal(location.searchParams.get('code_challenge_method'),'S256');
  assert.equal(location.searchParams.get('state').length,43);assert.equal(location.searchParams.get('nonce').length,43);
  const state=location.searchParams.get('state');assert.equal((await gate(request('/auth/callback?code=x&state='+state),env)).response.status,400);
  DB.sql.exec('DELETE FROM auth_attempts');
  assert.equal((await gate(request('/auth/callback?code=x&state='+state,{headers:{cookie:'__Host_doaa_state='+state}}),env)).response.status,400);
});

test('private preference snapshots replace whole values and never cross accounts',async()=>{
  const DB=database(),env={DB},david={subject:'david-subject'},brent={subject:'brent-subject'};
  for(const snapshot of [{units:'aviation',home:'CYOW'},{units:'metric'}]){
    const r=await personalApi(request('/api/preferences',{method:'PUT',body:JSON.stringify(snapshot)}),env,david);assert.equal(r.status,200);
  }
  assert.deepEqual((await(await personalApi(request('/api/preferences'),env,david)).json()).snapshot,{units:'metric'});
  assert.equal((await(await personalApi(request('/api/preferences'),env,david)).json()).revision,2);
  assert.equal((await(await personalApi(request('/api/preferences'),env,brent)).json()).snapshot,null);
});

test('bookmark is an idempotent account-owned observation reference, never a fabricated sighting',async()=>{
  const DB=database(),env={DB},david={subject:'david-subject'},brent={subject:'brent-subject'};
  for(let i=0;i<2;i++)assert.equal((await personalApi(request('/api/bookmarks',{method:'POST',body:'{"observation_id":1}'}),env,david)).status,200);
  assert.equal(DB.sql.prepare('SELECT COUNT(*) n FROM personal_bookmarks').get().n,1);
  const saved=await(await personalApi(request('/api/bookmarks'),env,david)).json();assert.equal(saved.items[0].reference.kind,'DOAA observation');assert.equal(saved.items[0].reference.personal_visual_sighting,false);
  assert.equal((await(await personalApi(request('/api/bookmarks'),env,brent)).json()).items.length,0);
  await personalApi(request('/api/bookmarks?moment=observation%3A1',{method:'DELETE'}),env,brent);assert.equal(DB.sql.prepare('SELECT COUNT(*) n FROM personal_bookmarks').get().n,1);
  assert.equal((await personalApi(request('/api/bookmarks',{method:'POST',body:'{"observation_id":999}'}),env,david)).status,404);
  assert.equal(DB.sql.prepare('SELECT COUNT(*) n FROM observations').get().n,1);
});

test('bookmark pagination retains ties and account-owned favorites do not bleed between people',async()=>{
  const DB=database(),env={DB},a={subject:'david-subject'},b={subject:'brent-subject'};
  const insert=DB.sql.prepare('INSERT INTO personal_bookmarks VALUES(?,?,?,?)');for(let i=0;i<61;i++)insert.run(a.subject,'moment:'+String(i).padStart(2,'0'),'{}','2026-10-11T12:00:00.000Z');
  const first=await(await personalApi(request('/api/bookmarks'),env,a)).json(),next=new URLSearchParams(first.next);
  const second=await(await personalApi(request('/api/bookmarks?'+next),env,a)).json();assert.equal(new Set([...first.items,...second.items].map(x=>x.moment_key)).size,61);
  await personalApi(request('/api/favorite?kind=airframe&key=C00001',{method:'POST'}),env,a);
  assert.equal((await(await personalApi(request('/api/favorite?kind=airframe&key=C00001'),env,b)).json()).favorite,false);
});
