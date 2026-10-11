'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'..','ambient-media.js'),'utf8');

test('SLIDES discovery is delayed, bounded, and uses the existing investigator',async()=>{
 const handlers=new Map(),timers=[],calls=[],events=[];
 const aircraft=[{id:'a1b2c3',reg:'C-TEST',type:'B738'}];
 const win={DOAAAmbient:{mode:'SLIDES',active:true},DOAALiveSnapshot:()=>({aircraft}),addEventListener:(name,fn)=>handlers.set(name,fn),dispatchEvent:e=>events.push(e.detail)};
 const context={window:win,document:{hidden:false},Date,AbortController,URLSearchParams,encodeURIComponent,
  CustomEvent:class{constructor(name,opts){this.detail=opts.detail}},
  setInterval:()=>1,setTimeout:(fn,ms)=>{timers.push({fn,ms});return timers.length},clearTimeout:()=>{},
  fetch:async url=>{calls.push(String(url));if(String(url).startsWith('/api/ambient-media'))return{ok:true,json:async()=>({media:[]})};return{ok:true,json:async()=>({ok:true})}}
 };
 vm.runInNewContext(source,context);
 await handlers.get('doaa:ambient-enter')();
 assert.equal(calls.length,1,'initial lookup must only read cache');
 const discovery=timers.find(t=>t.ms>=30000);
 assert.ok(discovery,'discovery must be scheduled after grace period');
 await discovery.fn();
 assert.equal(calls.filter(x=>x.startsWith('/api/investigate')).length,1);
 assert.match(calls.find(x=>x.startsWith('/api/investigate')),/registration=C-TEST/);
 assert.equal(events.length,0,'investigation response is not directly displayed without verification');
});

test('SLIDES never investigates aircraft without a registration',async()=>{
 const handlers=new Map(),timers=[],calls=[];
 const win={DOAAAmbient:{mode:'SLIDES',active:true},DOAALiveSnapshot:()=>({aircraft:[{id:'a1b2c3',reg:''}]}),addEventListener:(name,fn)=>handlers.set(name,fn),dispatchEvent:()=>{}};
 vm.runInNewContext(source,{window:win,document:{hidden:false},Date,AbortController,URLSearchParams,encodeURIComponent,
  CustomEvent:class{},setInterval:()=>1,setTimeout:(fn,ms)=>{timers.push(ms);return 1},clearTimeout:()=>{},
  fetch:async url=>{calls.push(String(url));return{ok:true,json:async()=>({media:[]})}}});
 await handlers.get('doaa:ambient-enter')();
 assert.equal(calls.length,1);
 assert.equal(timers.filter(x=>x>=30000).length,0);
});
