const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json','cache-control':'no-store'}});
async function body(request){const reader=request.body?.getReader();if(!reader)throw Error('JSON body required');const chunks=[];let size=0;while(true){const r=await reader.read();if(r.done)break;size+=r.value.byteLength;if(size>16384){await reader.cancel();throw Error('Body too large');}chunks.push(r.value);}const bytes=new Uint8Array(size);let i=0;for(const c of chunks){bytes.set(c,i);i+=c.length;}return JSON.parse(new TextDecoder().decode(bytes));}
export async function personalApi(request,env,user){
 const u=new URL(request.url),sub=user.subject,db=env.DB;
 if(u.pathname==='/api/account'&&request.method==='GET'){const name=sub.startsWith('password:')?sub.slice(9):null;const row=name?await db.prepare('SELECT role,disabled_at FROM password_accounts WHERE username=?').bind(name).first():null;return json({ok:true,subject:sub,can_manage_users:!!row&&!row.disabled_at&&(row.role==='admin'||name===env.DOAA_PASSWORD_USERNAME)});}
 if(u.pathname==='/api/preferences'){
  if(request.method==='GET'){const row=await db.prepare('SELECT snapshot_json,revision,accepted_at FROM personal_preferences WHERE subject=?').bind(sub).first();return json({ok:true,snapshot:row?JSON.parse(row.snapshot_json):null,revision:row?.revision||0,accepted_at:row?.accepted_at||null});}
  if(request.method==='PUT'){let p;try{p=await body(request);}catch{return json({ok:false,error:'Valid bounded JSON required'},400);}if(!p||typeof p!=='object'||Array.isArray(p)||JSON.stringify(p).length>12000)return json({ok:false,error:'Preference snapshot required'},400);
   const row=await db.prepare(`INSERT INTO personal_preferences(subject,snapshot_json,revision,accepted_at) VALUES(?,?,1,?) ON CONFLICT(subject) DO UPDATE SET snapshot_json=excluded.snapshot_json,revision=personal_preferences.revision+1,accepted_at=excluded.accepted_at RETURNING revision,accepted_at`).bind(sub,JSON.stringify(p),new Date().toISOString()).first();return json({ok:true,snapshot:p,...row});}
  return json({ok:false,error:'Method not allowed'},405);
 }
 if(u.pathname==='/api/bookmarks'){
  if(request.method==='GET'){const before=u.searchParams.get('before')||'9999',key=u.searchParams.get('after_key')||'',rows=await db.prepare('SELECT moment_key,reference_json,created_at FROM personal_bookmarks WHERE subject=? AND (created_at<? OR (created_at=? AND moment_key>?)) ORDER BY created_at DESC,moment_key LIMIT 51').bind(sub,before,before,key).all(),all=rows.results||[],items=all.slice(0,50).map(x=>({moment_key:x.moment_key,created_at:x.created_at,reference:JSON.parse(x.reference_json)}));return json({ok:true,items,next:all.length>50?{before:items.at(-1).created_at,after_key:items.at(-1).moment_key}:null});}
  if(request.method==='POST'){let p;try{p=await body(request);}catch{return json({ok:false,error:'Valid JSON required'},400);}const id=p?.observation_id;if(!Number.isSafeInteger(id)||id<=0)return json({ok:false,error:'Recorded observation required'},400);
   const observation=await db.prepare(`SELECT o.*,e.canonical_key hex FROM observations o JOIN encounters c ON c.id=o.encounter_id JOIN entities e ON e.id=c.entity_id WHERE o.id=? AND e.kind='airframe'`).bind(id).first();if(!observation)return json({ok:false,error:'Recorded moment unavailable'},404);
   const key='observation:'+id,created=new Date().toISOString(),reference={kind:'DOAA observation',...observation,personal_visual_sighting:false};await db.prepare('INSERT OR IGNORE INTO personal_bookmarks(subject,moment_key,reference_json,created_at) VALUES(?,?,?,?)').bind(sub,key,JSON.stringify(reference),created).run();
   const saved=await db.prepare('SELECT created_at FROM personal_bookmarks WHERE subject=? AND moment_key=?').bind(sub,key).first();return json({ok:true,saved:true,moment_key:key,created_at:saved.created_at,reference});}
  if(request.method==='DELETE'){const key=u.searchParams.get('moment');if(!key||key.length>100)return json({ok:false,error:'Moment reference required'},400);await db.prepare('DELETE FROM personal_bookmarks WHERE subject=? AND moment_key=?').bind(sub,key).run();return json({ok:true,saved:false,moment_key:key});}
  return json({ok:false,error:'Method not allowed'},405);
 }
 if(u.pathname==='/api/favorite'){
  const kind=String(u.searchParams.get('kind')||'').slice(0,64),key=String(u.searchParams.get('key')||'').slice(0,255);if(!kind||!key)return json({ok:false,error:'Subject required'},400);
  if(request.method==='GET'){const row=await db.prepare('SELECT label FROM personal_favorites WHERE subject=? AND kind=? AND subject_key=?').bind(sub,kind,key).first();return json({ok:true,favorite:!!row});}
  if(request.method==='POST'){await db.prepare('INSERT OR IGNORE INTO personal_favorites(subject,kind,subject_key) VALUES(?,?,?)').bind(sub,kind,key).run();return json({ok:true,favorite:true});}
  if(request.method==='DELETE'){await db.prepare('DELETE FROM personal_favorites WHERE subject=? AND kind=? AND subject_key=?').bind(sub,kind,key).run();return json({ok:true,favorite:false});}
 }
 return null;
}
