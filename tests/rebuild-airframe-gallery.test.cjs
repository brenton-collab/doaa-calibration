'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const worker=fs.readFileSync(require('node:path').join(__dirname,'../src/worker.js'),'utf8'),client=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
const a=worker.indexOf('async function airframeGallery('),b=worker.indexOf('async function airportPhoto(',a);
assert.ok(a>=0&&b>a);
function fixture(pages){let calls=0;const fn=vm.runInNewContext(worker.slice(a,b)+'\nairframeGallery',{fetch:async()=>{calls++;return{ok:true,json:async()=>({query:{pages}})}},AbortSignal:{timeout:ms=>({ms})},URLSearchParams,json:(value,status)=>({value,status})});return{fn,count:()=>calls};}
const photo=(title,licensed=true)=>({title,imageinfo:[{thumburl:'https://upload.wikimedia.org/fixture.jpg',descriptionurl:'https://commons.wikimedia.org/wiki/File:Fixture',extmetadata:licensed?{LicenseShortName:{value:'CC BY-SA 4.0'},Artist:{value:'Fixture photographer'}}:{}}]});
test('returns registration-matched licensed gallery images',async()=>{const h=fixture({1:photo('File:C-GABC at CYOW.jpg'),2:photo('File:C-GXYZ at CYOW.jpg')});const r=await h.fn('C-GABC');assert.equal(r.value.images.length,1);assert.equal(r.value.images[0].credit,'Fixture photographer');assert.equal(r.value.registration,'C-GABC');});
test('rejects missing license and credit',async()=>{const h=fixture({1:photo('File:C-GABC on apron.jpg',false)});const r=await h.fn('C-GABC');assert.deepEqual(Array.from(r.value.images),[]);});
test('invalid registration avoids provider calls',async()=>{const h=fixture({});const r=await h.fn('../');assert.equal(r.status,400);assert.equal(h.count(),0);});
test('Media Inspector wires gallery and photo navigation',()=>{assert.match(client,/data-airframe-gallery/);assert.match(client,/data-gallery-step/);assert.match(client,/loadAirframeGallery\(d,a,af\)/);});
