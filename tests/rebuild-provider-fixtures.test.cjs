'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../src/worker.js'),'utf8');
function extract(start,end,context){
 const a=source.indexOf(start),b=source.indexOf(end,a+start.length);
 assert.ok(a>=0&&b>a,'provider function boundaries');
 return vm.runInNewContext(source.slice(a,b)+'\n'+start.match(/function (\w+)/)[1],context);
}
const timeout={timeout:ms=>({ms})};
test('VRS route is a standing association, never a live assignment',async()=>{
 const requests=[];
 const route=extract('async function vrsRoute(','async function resolveRouteFree(',{
  AbortSignal:timeout,encodeURIComponent,
  fetch:async(url,options)=>{requests.push({url,options});return{ok:true,json:async()=>({From:'YOW',To:'YYZ',Operator:'Fixture'})}}
 });
 const result=await route('ACA123');
 assert.equal(result.dep_iata,'YOW');
 assert.equal(result.arr_iata,'YYZ');
 assert.equal(result.current_assignment_established,false);
 assert.equal(result.route_evidence_kind,'callsign-route-association');
 assert.equal(requests[0].options.signal.ms,3500);
 assert.equal(await route('1234'),null);
 assert.equal(requests.length,1);
});
test('VRS provider failure degrades to unresolved route',async()=>{
 const route=extract('async function vrsRoute(','async function resolveRouteFree(',{
  AbortSignal:timeout,encodeURIComponent,
  fetch:async()=>{throw Error('offline')}
 });
 assert.equal(await route('ACA123'),null);
});
test('Commons registration photo requires identifiable licensed metadata',async()=>{
 const calls=[];
 const commons=extract('async function commonsPhoto(','async function investigate(',{
  AbortSignal:timeout,URLSearchParams,
  fetch:async(url,options)=>{
   calls.push(options);
   const params=new URL(url).searchParams;
   if(params.get('list')==='categorymembers')return{ok:true,json:async()=>({query:{categorymembers:[]}})};
   return{ok:true,json:async()=>({query:{pages:{1:{title:'File:C-GABC at airport.jpg',imageinfo:[{thumburl:'https://commons.wikimedia.org/example.jpg',descriptionurl:'https://commons.wikimedia.org/wiki/File',extmetadata:{LicenseShortName:{value:'CC BY-SA 4.0'},Credit:{value:'Fixture Photographer'}}}]}}}})};
  }
 });
 const result=await commons('C-GABC',true);
 assert.equal(result.license,'CC BY-SA 4.0');
 assert.equal(result.credit,'Fixture Photographer');
 assert.match(result.title,/C-GABC/);
 assert.ok(calls.every(x=>x.signal.ms===3500));
});
test('Commons excludes nonmatching registration titles',async()=>{
 const commons=extract('async function commonsPhoto(','async function investigate(',{
  AbortSignal:timeout,URLSearchParams,
  fetch:async url=>{
   if(new URL(url).searchParams.get('list')==='categorymembers')return{ok:true,json:async()=>({query:{categorymembers:[]}})};
   return{ok:true,json:async()=>({query:{pages:{1:{title:'File:C-GXYZ at airport.jpg',imageinfo:[{url:'https://commons.wikimedia.org/example.jpg'}]}}}})};
  }
 });
 assert.equal(await commons('C-GABC',true),null);
});
test('Commons errors surface for dossier-level graceful handling',async()=>{
 const commons=extract('async function commonsPhoto(','async function investigate(',{
  AbortSignal:timeout,URLSearchParams,
  fetch:async()=>{throw Error('offline')}
 });
 await assert.rejects(commons('C-GABC',true),/offline/);
});
