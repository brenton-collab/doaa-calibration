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
  const allowed=new Set(['supported','conflicting','superseded','inferred']),status=allowed.has(c.status)?c.status:'supported';
  await db.prepare(`INSERT INTO claims(entity_id,predicate,value_text,value_normalized,status) VALUES(?,?,?,?,?) ON CONFLICT(entity_id,predicate,value_text) DO UPDATE SET last_supported_at=CURRENT_TIMESTAMP,status=excluded.status`).bind(entityId,c.predicate,String(c.value),norm(c.value),status).run();
  const claim=await db.prepare(`SELECT id FROM claims WHERE entity_id=? AND predicate=? AND value_text=?`).bind(entityId,c.predicate,String(c.value)).first();
  if(sourceId&&status!=='inferred') await db.prepare(`INSERT INTO evidence(claim_id,source_id,evidence_locator,evidence_excerpt,observed_at) VALUES(?,?,?,?,?) ON CONFLICT(claim_id,source_id,evidence_locator) DO UPDATE SET retrieved_at=CURRENT_TIMESTAMP,evidence_excerpt=COALESCE(excluded.evidence_excerpt,evidence.evidence_excerpt)`).bind(claim.id,sourceId,c.locator||'',c.excerpt||null,c.observed_at||null).run();
  const lt=LEAD_PREDICATES[c.predicate];
  if(lt) await db.prepare(`INSERT INTO leads(entity_id,lead_type,lead_value,normalized_value,status,discovered_from_claim_id,discovered_from_source_id) VALUES(?,?,?,?,?,?,?) ON CONFLICT(lead_type,normalized_value) DO NOTHING`).bind(entityId,lt,String(c.value),norm(c.value),'pending',claim.id,sourceId||null).run();
  return claim.id;
}
async function markLead(db,id,status,error=null,retryHours=24){const retry=status==='retry'?new Date(Date.now()+retryHours*3600000).toISOString():null,resolved=status==='resolved'?new Date().toISOString():null;await db.prepare(`UPDATE leads SET status=?,attempts=attempts+1,last_attempt_at=CURRENT_TIMESTAMP,retry_after=?,resolved_at=COALESCE(?,resolved_at) WHERE id=?`).bind(status,retry,resolved,id).run()}
async function dossier(db,entityId){
  const claims=await db.prepare(`SELECT c.id,c.predicate,c.value_text,c.status,c.first_supported_at,c.last_supported_at,s.source_name,s.source_url,s.source_kind,e.retrieved_at FROM claims c LEFT JOIN evidence e ON e.claim_id=c.id LEFT JOIN sources s ON s.id=e.source_id WHERE c.entity_id=? AND c.status!='superseded' ORDER BY c.predicate,c.last_supported_at DESC`).bind(entityId).all();
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
  if(u.pathname==='/memory/observe'&&request.method==='POST'){
    const p=await request.json();if(p.observation_source!=='acquisition')return json({ok:false,error:'observation writes are acquisition-only'},403);const hex=norm(p.icao24||p.contact_key);if(!hex)return json({ok:false,error:'icao24 required'},400);
    const entity=await ensureEntity(env.DB,'airframe',hex);await rememberIdentifier(env.DB,entity.id,'icao24',hex);if(p.registration)await rememberIdentifier(env.DB,entity.id,'registration',p.registration);if(p.type_code)await rememberIdentifier(env.DB,entity.id,'icao_type',p.type_code);
    const at=p.observed_at||new Date().toISOString(),call=norm(p.callsign||''),type=norm(p.type_code||'');
    let enc=await env.DB.prepare(`SELECT id,first_seen_at,last_seen_at FROM encounters WHERE entity_id=? AND last_seen_at>=datetime(?,'-15 minutes') ORDER BY last_seen_at DESC LIMIT 1`).bind(entity.id,at).first();
    if(!enc){const q=await env.DB.prepare(`INSERT INTO encounters(entity_id,contact_key,first_seen_at,last_seen_at,callsign,type_code,min_altitude_ft,max_altitude_ft,observation_count) VALUES(?,?,?,?,?,?,?,?,0) RETURNING id,first_seen_at,last_seen_at`).bind(entity.id,hex,at,at,call||null,type||null,p.altitude_ft??null,p.altitude_ft??null).first();enc=q}
    const registration=norm(p.registration||'');
    const inserted=await env.DB.prepare(`INSERT OR IGNORE INTO observations(encounter_id,entity_id,observed_at,latitude,longitude,altitude_ft,groundspeed_kt,track_deg,vertical_rate_fpm,squawk,callsign,type_code,registration) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(enc.id,entity.id,at,p.latitude??null,p.longitude??null,p.altitude_ft??null,p.groundspeed_kt??null,p.track_deg??null,p.vertical_rate_fpm??null,p.squawk??null,call||null,type||null,registration||null).run();
    const wrote=(inserted?.meta?.changes??0)>0;
    if(!wrote){const owner=await env.DB.prepare(`SELECT encounter_id FROM observations WHERE entity_id=? AND observed_at=? LIMIT 1`).bind(entity.id,at).first();if(owner?.encounter_id&&owner.encounter_id!==enc.id){await env.DB.prepare(`DELETE FROM encounters WHERE id=? AND observation_count=0 AND NOT EXISTS(SELECT 1 FROM observations WHERE encounter_id=?)`).bind(enc.id,enc.id).run();enc={...enc,id:owner.encounter_id}}}
    if(wrote) await env.DB.prepare(`UPDATE encounters SET last_seen_at=?,callsign=COALESCE(NULLIF(?,''),callsign),type_code=COALESCE(NULLIF(?,''),type_code),min_altitude_ft=CASE WHEN ? IS NULL THEN min_altitude_ft WHEN min_altitude_ft IS NULL OR ?<min_altitude_ft THEN ? ELSE min_altitude_ft END,max_altitude_ft=CASE WHEN ? IS NULL THEN max_altitude_ft WHEN max_altitude_ft IS NULL OR ?>max_altitude_ft THEN ? ELSE max_altitude_ft END,observation_count=observation_count+1 WHERE id=?`).bind(at,call,type,p.altitude_ft??null,p.altitude_ft??null,p.altitude_ft??null,p.altitude_ft??null,p.altitude_ft??null,p.altitude_ft??null,enc.id).run();
    return json({ok:true,encounter_id:enc.id,duplicate:!wrote});
  }
  if(u.pathname==='/memory/history'&&request.method==='GET'){
    const scheme=u.searchParams.get('scheme')||'icao24',value=u.searchParams.get('value');if(!value)return json({ok:false,error:'value required'},400);
    const hit=await env.DB.prepare(`SELECT e.id FROM identifiers i JOIN entities e ON e.id=i.entity_id WHERE i.scheme=? AND i.normalized_value=?`).bind(scheme,norm(value)).first();if(!hit)return json({ok:true,found:false});
    const s=await env.DB.prepare(`SELECT COUNT(*) encounter_count,MIN(first_seen_at) first_seen_at,MAX(last_seen_at) last_seen_at,SUM(observation_count) observation_count FROM encounters WHERE entity_id=?`).bind(hit.id).first();
    const recent=await env.DB.prepare(`SELECT id,first_seen_at,last_seen_at,callsign,type_code,min_altitude_ft,max_altitude_ft,observation_count FROM encounters WHERE entity_id=? ORDER BY last_seen_at DESC LIMIT 12`).bind(hit.id).all();
    return json({ok:true,entity_id:hit.id,...s,recent:recent.results||[]});
  }
  if(u.pathname==='/memory/search'&&request.method==='GET'){
    const q=norm(u.searchParams.get('q')||'');if(!q)return json({ok:true,results:[]});
    const like='%'+q+'%';
    const rows=await env.DB.prepare(`SELECT e.id,e.kind,e.canonical_key,
      MAX(CASE WHEN i.scheme='icao24' THEN i.value END) icao24,
      MAX(CASE WHEN i.scheme='registration' THEN i.value END) registration,
      MAX(CASE WHEN i.scheme='icao_type' THEN i.value END) icao_type,
      MAX(CASE WHEN c.predicate='callsign' THEN c.value_text END) callsign,
      MAX(CASE WHEN c.predicate='manufacturer' THEN c.value_text END) manufacturer,
      MAX(CASE WHEN c.predicate='model' THEN c.value_text END) model,
      MAX(CASE WHEN c.predicate='operator' THEN c.value_text END) operator,
      MAX(CASE WHEN c.predicate='photo_specificity' THEN c.value_text END) photo_specificity,
      (SELECT COUNT(*) FROM encounters x WHERE x.entity_id=e.id) encounter_count
      FROM entities e LEFT JOIN identifiers i ON i.entity_id=e.id LEFT JOIN claims c ON c.entity_id=e.id
      WHERE UPPER(e.canonical_key) LIKE ? OR EXISTS(SELECT 1 FROM identifiers si WHERE si.entity_id=e.id AND UPPER(si.value) LIKE ?)
         OR EXISTS(SELECT 1 FROM claims sc WHERE sc.entity_id=e.id AND UPPER(sc.value_text) LIKE ?)
      GROUP BY e.id ORDER BY e.updated_at DESC LIMIT 30`).bind(like,like,like).all();
    return json({ok:true,results:rows.results||[]});
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
  if(u.pathname==='/memory/history-request'&&request.method==='POST'){const p=await request.json(),hex=norm(p.icao24||''),day=String(p.day||'').slice(0,10);if(!hex||!/^\d{4}-\d{2}-\d{2}$/.test(day))return json({ok:false,error:'icao24 and day required'},400);const entity=await ensureEntity(env.DB,'airframe',hex);await rememberIdentifier(env.DB,entity.id,'icao24',hex);const key=hex+':'+day;await env.DB.prepare(`INSERT INTO leads(entity_id,lead_type,lead_value,normalized_value,status) VALUES(?,'airframe-day-history',?,?,'pending') ON CONFLICT(lead_type,normalized_value) DO NOTHING`).bind(entity.id,day,key).run();const lead=await env.DB.prepare(`SELECT id,status,attempts,last_attempt_at,retry_after FROM leads WHERE lead_type='airframe-day-history' AND normalized_value=?`).bind(key).first();return json({ok:true,icao24:hex,day,lead})}\n  if(u.pathname==='/memory/history-result'&&request.method==='POST'){const p=await request.json(),hex=norm(p.icao24||''),day=String(p.day||'').slice(0,10),legs=Array.isArray(p.legs)?p.legs:[];if(!hex||!/^\d{4}-\d{2}-\d{2}$/.test(day))return json({ok:false,error:'icao24 and day required'},400);const entity=await ensureEntity(env.DB,'airframe',hex);await rememberIdentifier(env.DB,entity.id,'icao24',hex);let sourceId=null;if(p.source)sourceId=(await ensureSource(env.DB,p.source)).id;const activePredicates=[];for(const leg0 of legs){const leg=leg0||{},value={day,callsign:leg.callsign||null,dep_iata:leg.dep_iata||null,dep_icao:leg.dep_icao||null,arr_iata:leg.arr_iata||null,arr_icao:leg.arr_icao||null,started_at:leg.started_at||null,ended_at:leg.ended_at||null,dep_name:leg.dep_name||null,arr_name:leg.arr_name||null,endpoint_confidence:leg.endpoint_confidence||null,route_evidence:leg.route_evidence||null,basis:leg.basis||null},sig=norm([value.started_at||'na',value.ended_at||'na',value.callsign||'na',value.dep_icao||value.dep_iata||'na',value.arr_icao||value.arr_iata||'na'].join('|')).replace(/[^A-Z0-9]+/g,'-').slice(0,96),predicate='journey-leg:'+day+':'+sig;activePredicates.push(predicate);await rememberClaim(env.DB,entity.id,{predicate,value:JSON.stringify(value),status:leg.status||'supported',observed_at:leg.observed_at||null},sourceId)}const prefix='journey-leg:'+day+':',oldClaims=await env.DB.prepare(`SELECT id,predicate FROM claims WHERE entity_id=? AND predicate LIKE ? AND status!='superseded'`).bind(entity.id,prefix+'%').all();for(const row of oldClaims.results||[])if(!activePredicates.includes(row.predicate))await env.DB.prepare(`UPDATE claims SET status='superseded',last_supported_at=CURRENT_TIMESTAMP WHERE id=?`).bind(row.id).run();const legacyPrefix='journey-leg:'+day+':';const legacy=await env.DB.prepare(`SELECT id,predicate FROM claims WHERE entity_id=? AND predicate LIKE ?`).bind(entity.id,legacyPrefix+'%').all();for(const row of legacy.results||[]){const tail=String(row.predicate||'').slice(legacyPrefix.length);if(/^\d+$/.test(tail))await env.DB.prepare(`UPDATE claims SET status='superseded',last_supported_at=CURRENT_TIMESTAMP WHERE id=?`).bind(row.id).run();}const key=hex+':'+day;await env.DB.prepare(`UPDATE leads SET status='resolved',attempts=attempts+1,last_attempt_at=CURRENT_TIMESTAMP,retry_after=NULL,resolved_at=COALESCE(resolved_at,CURRENT_TIMESTAMP) WHERE lead_type='airframe-day-history' AND normalized_value=?`).bind(key).run();return json({ok:true,icao24:hex,day,legs_ingested:legs.length})}\n  if(u.pathname==='/memory/lead'&&request.method==='POST'){
    const p=await request.json();if(!p.id||!['resolved','retry','exhausted'].includes(p.status))return json({ok:false,error:'id and valid status required'},400);
    await markLead(env.DB,p.id,p.status,p.error||null,Math.max(1,Math.min(Number(p.retry_hours)||24,720)));return json({ok:true});
  }
  if(u.pathname==='/memory/leads'&&request.method==='GET'){
    const rows=await env.DB.prepare(`SELECT l.*,e.kind,e.canonical_key FROM leads l LEFT JOIN entities e ON e.id=l.entity_id WHERE l.status IN ('pending','retry') AND (l.retry_after IS NULL OR l.retry_after<=CURRENT_TIMESTAMP) ORDER BY CASE l.lead_type WHEN 'airframe-day-history' THEN 1 WHEN 'registration' THEN 2 WHEN 'icao24' THEN 3 WHEN 'msn' THEN 4 ELSE 5 END,l.attempts ASC LIMIT ?`).bind(Math.min(Number(u.searchParams.get('limit'))||20,100)).all();
    return json({ok:true,leads:rows.results||[]});
  }
  return null;
}
