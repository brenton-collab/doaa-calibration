'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const worker=fs.readFileSync(path.join(__dirname,'../src/worker.js'),'utf8');
const start=worker.indexOf('async function ambientMediaApi('),end=worker.indexOf('export default{',start);
assert.ok(start>=0&&end>start,'media API function must exist');
const api=new Function('json',worker.slice(start,end)+';return ambientMediaApi')((body,status=200)=>({body,status}));
const base=[['photo_specificity','exact-airframe'],['photo_image','https://example.org/img.jpg'],['photo_license','CC BY'],['photo_credit','Artist']].map(([predicate,value_text])=>({hex:'A1B2C3',predicate,value_text}));
async function run(rows,registration='C-TEST'){
 const sql=[];
 const DB={prepare:q=>{sql.push(q);return{bind:()=>({all:async()=>({results:q.includes('SELECT h.value')?[{hex:'A1B2C3',registration}]:rows})})}}};
 const response=await api({searchParams:{get:()=> 'A1B2C3'}},{DB});
 assert.ok(sql.every(q=>q.startsWith('SELECT')),'ambient cache must be read-only');
 return response.body.media;
}
test('returns exact airframe with attribution and canonical registration',async()=>{
 const media=await run(base);
 assert.equal(media.length,1);
 assert.equal(media[0].registration,'C-TEST');
});
test('rejects conflicting photo evidence',async()=>{
 assert.equal((await run([...base,{hex:'A1B2C3',predicate:'photo_image',value_text:'https://example.org/other.jpg'}])).length,0);
});
test('rejects representative media and missing attribution',async()=>{
 assert.equal((await run(base.map(x=>x.predicate==='photo_specificity'?{...x,value_text:'representative-type'}:x))).length,0);
 assert.equal((await run(base.filter(x=>x.predicate!=='photo_credit'))).length,0);
});
