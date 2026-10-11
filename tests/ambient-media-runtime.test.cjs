'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../ambient-media.js'),'utf8');
async function runScenario(kind){
 const handlers={},intervals=[],requests=[],emitted=[];
 let active=true,registration='C-TEST',resolveFetch;
 const win={
  DOAAAmbient:{get active(){return active},mode:'SLIDES'},
  DOAALiveSnapshot:()=>({aircraft:[{id:'a1b2c3',reg:registration}]}),
  addEventListener:(name,fn)=>{handlers[name]=fn;},
  dispatchEvent:event=>emitted.push(event.detail)
 };
 const ctx={
  window:win,document:{hidden:false},
  fetch:url=>{requests.push(url);return new Promise(resolve=>{resolveFetch=resolve;});},
  setInterval:fn=>{intervals.push(fn);},setTimeout:()=>1,clearTimeout:()=>{},
  Date:class{static now(){return 1000000;}},
  AbortController:class{constructor(){this.signal={};}abort(){}},
  CustomEvent:class{constructor(name,options){this.detail=options.detail;}}
 };
 vm.runInNewContext(source,ctx);
 handlers['doaa:ambient-enter']();
 for(let i=0;i<8;i++)await Promise.resolve();
 assert.equal(requests.length,1);
 assert.equal(typeof resolveFetch,'function');
 if(kind==='failure'){
  resolveFetch({ok:false});
  for(let i=0;i<8;i++)await Promise.resolve();
  intervals[0]();
  for(let i=0;i<8;i++)await Promise.resolve();
  assert.equal(requests.length,2,'failed requests must be retried');
  return;
 }
 if(kind==='stale')registration='C-OTHER';
 if(kind==='missing')registration='';
 if(kind==='closed')active=false;
 resolveFetch({ok:true,json:async()=>({media:[{
  id:'a1b2c3',registration:'C-TEST',url:kind==='insecure'?'http://example.test/plane.jpg':'https://example.test/plane.jpg',
  license:'CC BY',attribution:'Photographer'
 }]})});
 for(let i=0;i<8;i++)await Promise.resolve();
 assert.equal(emitted.length,(kind==='good'||kind==='missing')?1:0);
}
test('SLIDES emits matching current exact-airframe media',()=>runScenario('good'));
test('SLIDES discards media when aircraft registration changed',()=>runScenario('stale'));
test('SLIDES discards response after exit',()=>runScenario('closed'));
test('SLIDES accepts exact media for a contact whose registration disappears',()=>runScenario('missing'));
test('SLIDES retries failed cache reads',()=>runScenario('failure'));

test('SLIDES rejects insecure cached photo URLs',()=>runScenario('insecure'));
