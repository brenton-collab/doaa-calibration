'use strict';
/* Build a bounded, reproducible CYOW runway snapshot SQL file; no database writes. */
const fs=require('node:fs');
const crypto=require('node:crypto');
const {ReadableStream}=require('node:stream/web');
const SOURCE='https://davidmegginson.github.io/ourairports-data/runways.csv';
const MAX=8*1024*1024;
const quote=x=>"'"+String(x).replace(/'/g,"''")+"'";
async function main(){
 const {readRunways}=await import('../src/airfield.mjs');
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
 let response;
 try{response=await fetch(SOURCE,{signal:controller.signal,headers:{accept:'text/csv'}});}
 finally{clearTimeout(timer);}
 if(!response.ok)throw Error('OurAirports download returned '+response.status);
 const bytes=new Uint8Array(await response.arrayBuffer());
 if(bytes.byteLength>MAX)throw Error('Runway dataset exceeds limit');
 const digest=crypto.createHash('sha256').update(bytes).digest('hex');
 const runways=await readRunways(new ReadableStream({start(c){c.enqueue(bytes);c.close();}}),'CYOW');
 if(!runways.length)throw Error('CYOW has no runway records; refusing empty snapshot');
 const id='ourairports-'+digest.slice(0,24),at=new Date().toISOString();
 const sql=[
 'BEGIN TRANSACTION;',
 'INSERT OR IGNORE INTO airport_reference_snapshots (snapshot_id,source_sha256,source_url,retrieved_at,ready) VALUES ('+[id,digest,SOURCE,at].map(quote).join(',')+',0);',
 'INSERT OR REPLACE INTO airport_reference_rows (snapshot_id,airport,payload) VALUES ('+[id,'CYOW',JSON.stringify(runways)].map(quote).join(',')+');',
 'UPDATE airport_reference_snapshots SET ready=1 WHERE snapshot_id='+quote(id)+';',
 'COMMIT;'
 ].join('\n')+'\n';
 fs.writeFileSync(process.argv[2]||'airport-reference-cyow.sql',sql,{flag:'w',mode:0o600});
 process.stdout.write('Prepared CYOW runway snapshot '+id+' ('+runways.length+' records; '+bytes.byteLength+' source bytes)\n');
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
