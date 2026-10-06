// DOAA durable knowledge layer. Bind a Cloudflare D1 database as env.DB.
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json;charset=utf-8','cache-control':'no-store'}});
const norm=v=>String(v??'').trim().toUpperCase().replace(/\s+/g,' ');
const LEAD_PREDICATES={registration:'registration',icao24:'icao24',msn:'msn',serial_number:'msn',previous_registration:'registration',operator_code:'operator_code',callsign:'callsign',icao_type:'icao_type'};

async function ensureEntity(db,kind,key){
  await db.prepare(`INSERT INTO entities(kind,canonical_key) VALUES(?,?) ON CONFLICT(kind,canonical_key) DO UPDATE SET updated_at=CURRENT_TIMESTAMP`).bind(kind,key).run();
  return db.prepare(`SELECT id,kind,canonical_key FROM entities WHERE kind=? AND canonical_key=?`).bind(kind,key).first();
}
async function rememberIdentifier(db,entityId,scheme,value){
  if(!value)return;
  await db.prepare(`INSERT INTO identifiers(entity_id,scheme,value,normalized_value) VALUES(?,?,?,?) ON CONFLICT(scheme,normalized_value) DO UPDATE SET entity_id=excluded.entity_id,value=excluded.value,last_seen_at=CURRENT_TIMESTAMP`).bind(entityId,scheme,String(value),norm(value)).run();
}
async function ensureSource(db,s){
  const key=s.key||s.url||`${s.kind||'source'}:${s.name}`;
  await db.prepare(`INSERT INTO sources(source_key,source_name,source_url,source_kind) VALUES(?,?,?,?) ON CONFLICT(source_key) DO UPDATE SET source_name=excluded.source_name,source_url=COALESCE(excluded.source_url,sources.source_url),retrieved_at=CURRENT_TIMESTAMP`).bind(key,s.name||key,s.url||null,s.kind||'web').run();
  return db.prepare(`SELECT id FROM sources WHERE source_key=?`).bind(key).first();
}
async function rememberClaim(db,entityId,c,sourceId){
  const status=c.status||'supported';
  await db.prepare(`INSERT INTO claims(entity_id,predicate,value_text,value_normalized,status) VALUES(?,?,?,?,?) ON CONFLICT(entity_id,predicate,value_text) DO UPDATE SET last_supported_at=CURRENT_TIMESTAMP,status=excluded.status`).bind(entityId,c.predicate,String(c.value),norm(c.value),status).run();
  const claim=await db.prepare(`SELECT id FROM claims WHERE entity_id=? AND predicate=? AND value_text=?`).bind(entityId,c.predicate,String(c.value)).first();
  if(sourceId&&status!=='inferred') await db.prepare(`INSERT INTO evidence(claim_id,source_id,evidence_locator,evidence_excerpt,observed_at) VALUES(?,?,?,?,?) ON CONFLICT(claim_id,source_id,evidence_locator) DO UPDATE SET retrieved_at=CURRENT_TIMESTAMP,evidence_excerpt=COALESCE(excluded.evidence_excerpt,evidence.evidence_excerpt)`).bind(claim.id,sourceId,c.locator||'',c.excerpt||null,c.observed_at||null).run();
  const lt=LEAD_PREDICATES[c.predicate];
  if(lt) await db.prepare(`INSERT INTO leads(entity_id,lead_type,lead_value,normalized_value,status,discovered_from_claim_id,discovered_from_source_id) VALUES(?,?,?,?,?,?,?) ON CONFLICT(lead_type,normalized_value) DO NOTHING`).bind(entityId,lt,String(c.value),norm(c.value),'pending',claim.id,sourceId||null).run();
  return claim.id;
}
async function markLead(db,id,status,error=null,retryHours=24){const retry=status==='retry'?new Date(Date.now()+retryHours*3600000).toISOString():null;await db.prepare(`UPDATE leads SET status=?,attempts=attempts+1,last_attempt_at=CURRENT_TIMESTAMP,retry_after=?,last_error=? WHERE id=?`).bind(status,retry,error,id).run()}
async function dossier(db,entityId){
  const claims=await db.prepare(`SELECT c.id,c.predicate,c.value_text,c.status,c.first_supported_at,c.last_supported_at,s.source_name,s.source_url,s.source_kind,e.retrieved_at FROM claims c LEFT JOIN evidence e ON e.claim_id=c.id LEFT JOIN sources s ON s.id=e.source_id WHERE c.entity_id=? ORDER BY c.predicate,c.last_supported_at DESC`).bind(entityId).all();
  const ids=await db.prepare(`SELECT scheme,value,first_seen_at,last_seen_at FROM identifiers WHERE entity_id=? ORDER BY scheme`).bind(entityId).all();
  const leads=await db.prepare(`SELECT lead_type,lead_value,status,attempts,last_attempt_at,retry_after FROM leads WHERE entity_id=? ORDER BY status,lead_type`).bind(entityId).all();
  return {identifiers:ids.results||[],claims:claims.results||[],leads:leads.results||[]};
}
export async function handleMemory(request,env){
  if(!env.DB)return json({ok:false,error:'D1 binding DB is not configured'},503);
  const u=new URL(request.url);
  if(u.pathname==='/memory/health') return json({ok:true,d1:true});
  if(u.pathname==='/memory/dossier'&&request.method==='GET'){
    const scheme=u.searchParams.get('scheme'),value=u.searchParams.get('value');
    if(!scheme||!value)return json({ok:false,error:'scheme and value required'},400);
    const hit=await env.DB.prepare(`SELECT e.id,e.kind,e.canonical_key FROM identifiers i JOIN entities e ON e.id=i.entity_id WHERE i.scheme=? AND i.normalized_value=?`).bind(scheme,norm(value)).first();
    return hit?json({ok:true,entity:hit,...await dossier(env.DB,hit.id)}):json({ok:true,found:false});
  }
  if(u.pathname==='/memory/ingest'&&request.method==='POST'){
    const p=await request.json(),kind=p.entity?.kind||'airframe',key=p.entity?.key||p.identifiers?.icao24||p.identifiers?.registration;
    if(!key)return json({ok:false,error:'entity key required'},400);
    const entity=await ensureEntity(env.DB,kind,norm(key));
    for(const [scheme,value] of Object.entries(p.identifiers||{})) await rememberIdentifier(env.DB,entity.id,scheme,value);
    let sourceId=null;if(p.source)sourceId=(await ensureSource(env.DB,p.source)).id;
    for(const c of p.claims||[]) if(c?.predicate&&c?.value!=null) await rememberClaim(env.DB,entity.id,c,sourceId);
    return json({ok:true,entity,...await dossier(env.DB,entity.id)});
  }
  if(u.pathname==='/memory/lead'&&request.method==='POST'){
    const p=await request.json();if(!p.id||!['resolved','retry','dead'].includes(p.status))return json({ok:false,error:'id and valid status required'},400);
    await markLead(env.DB,p.id,p.status,p.error||null,Math.max(1,Math.min(Number(p.retry_hours)||24,720)));return json({ok:true});
  }
  if(u.pathname==='/memory/leads'&&request.method==='GET'){
    const rows=await env.DB.prepare(`SELECT l.*,e.kind,e.canonical_key FROM leads l LEFT JOIN entities e ON e.id=l.entity_id WHERE l.status IN ('pending','retry') AND (l.retry_after IS NULL OR l.retry_after<=CURRENT_TIMESTAMP) ORDER BY CASE l.lead_type WHEN 'registration' THEN 1 WHEN 'icao24' THEN 2 WHEN 'msn' THEN 3 ELSE 4 END,l.attempts ASC LIMIT ?`).bind(Math.min(Number(u.searchParams.get('limit'))||20,100)).all();
    return json({ok:true,leads:rows.results||[]});
  }
  return null;
}
