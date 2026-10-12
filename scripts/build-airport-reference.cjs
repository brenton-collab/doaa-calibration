'use strict';
/* Offline SQL preparation only. Never writes to any D1 database. */
const fs=require('node:fs');
const crypto=require('node:crypto');
const {ReadableStream}=require('node:stream/web');
const SOURCE='https://davidmegginson.github.io/ourairports-data/runways.csv';
const MAX=8*1024*1024;
const quote=x=>"'"+String(x).replace(/'/g,"''")+"'";
async function download(url,{fetchImpl=fetch,maxBytes=MAX,timeoutMs=20000}={}){
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),timeoutMs);
 let reader;
 try{
  const response=await fetchImpl(url,{signal:controller.signal,headers:{accept:'text/csv'}});
  if(!response.ok)throw Error('OurAirports download returned '+response.status);
  if(!response.body)throw Error('Runway dataset response body unavailable');
  const length=Number(response.headers?.get('content-length'));
  if(Number.isFinite(length)&&length>maxBytes)throw Error('Runway dataset exceeds limit');
  reader=response.body.getReader();
  const chunks=[];let total=0;
  while(true){
   const {done,value}=await reader.read();if(done)break;
   total+=value.byteLength;
   if(total>maxBytes)throw Error('Runway dataset exceeds limit');
   chunks.push(value);
  }
  const bytes=new Uint8Array(total);let offset=0;
  for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
  return bytes;
 }finally{
  controller.abort();clearTimeout(timer);
  if(reader){try{await reader.cancel();}catch{}reader.releaseLock();}
 }
}
async function prepare(bytes,{source=SOURCE,retrievedAt=new Date().toISOString()}={}){
 const {readRunways}=await import('../src/airfield.mjs');
 if(!bytes.length||bytes.length>MAX)throw Error('Invalid runway dataset size');
 const digest=crypto.createHash('sha256').update(bytes).digest('hex');
 const runways=await readRunways(new ReadableStream({start(c){c.enqueue(bytes);c.close();}}),'CYOW');
 if(!runways.length)throw Error('CYOW has no runway records; refusing empty snapshot');
 for(const r of runways){
  if(r.airport!=='CYOW'||!Array.isArray(r.ends)||r.ends.length!==2||!r.ends.some(e=>e.ident))
   throw Error('Invalid CYOW runway record');
 }
 const id='ourairports-'+digest.slice(0,24);
 const sql=[
  'BEGIN TRANSACTION;',
  'INSERT OR IGNORE INTO airport_reference_snapshots (snapshot_id,source_sha256,source_url,retrieved_at,ready) VALUES ('+[id,digest,source,retrievedAt].map(quote).join(',')+',0);',
  'INSERT OR REPLACE INTO airport_reference_rows (snapshot_id,airport,payload) VALUES ('+[id,'CYOW',JSON.stringify(runways)].map(quote).join(',')+');',
  'UPDATE airport_reference_snapshots SET ready=1 WHERE snapshot_id='+quote(id)+';',
  'COMMIT;'
 ].join('\n')+'\n';
 return {id,sql,runways,digest};
}
async function main(){
 const bytes=await download(SOURCE);
 const {id,sql,runways}=await prepare(bytes);
 fs.writeFileSync(process.argv[2]||'airport-reference-cyow.sql',sql,{mode:0o600});
 process.stdout.write('Prepared CYOW runway snapshot '+id+' ('+runways.length+' records; '+bytes.byteLength+' source bytes)\n');
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={download,prepare,MAX,SOURCE};
