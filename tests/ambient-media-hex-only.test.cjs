'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');

test('SLIDES requests eligible hex-only aircraft and accepts attributed exact media',async()=>{
 const source=fs.readFileSync(path.join(__dirname,'..','ambient-media.js'),'utf8');
 const handlers=new Map(),events=[],requests=[];
 const aircraft=[{id:'a1b2c3',reg:''}];
 const window={
  DOAAAmbient:{mode:'SLIDES',active:true},
  DOAALiveSnapshot:()=>({aircraft}),
  addEventListener:(name,fn)=>handlers.set(name,fn),
  dispatchEvent:e=>events.push(e)
 };
 const context={
  window,document:{hidden:false},Date,
  AbortController,URL,encodeURIComponent,
  CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail}},
  setTimeout:()=>1,clearTimeout:()=>{},setInterval:()=>1,
  fetch:async url=>{requests.push(url);return {ok:true,json:async()=>({media:[{
   id:'a1b2c3',registration:'C-ABCD',url:'https://upload.wikimedia.org/photo.jpg',
   license:'CC BY-SA 4.0',attribution:'Photographer',specificity:'exact-airframe'
  }]})}}
 };
 vm.runInNewContext(source,context);
 await handlers.get('doaa:ambient-enter')();
 assert.equal(requests.length,1);
 assert.match(requests[0],/hex=A1B2C3/);
 assert.equal(events.length,1);
 assert.equal(events[0].type,'doaa:airframe-media');
});

test('SLIDES rejects media when current registration conflicts with cached identity',async()=>{
 const source=fs.readFileSync(path.join(__dirname,'..','ambient-media.js'),'utf8');
 const handlers=new Map(),events=[];
 const window={
  DOAAAmbient:{mode:'SLIDES',active:true},
  DOAALiveSnapshot:()=>({aircraft:[{id:'a1b2c3',reg:'C-OTHER'}]}),
  addEventListener:(name,fn)=>handlers.set(name,fn),
  dispatchEvent:e=>events.push(e)
 };
 const context={
  window,document:{hidden:false},Date,AbortController,URL,encodeURIComponent,
  CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail}},
  setTimeout:()=>1,clearTimeout:()=>{},setInterval:()=>1,
  fetch:async()=>({ok:true,json:async()=>({media:[{
   id:'a1b2c3',registration:'C-ABCD',url:'https://upload.wikimedia.org/photo.jpg',
   license:'CC BY-SA 4.0',attribution:'Photographer'
  }]})})
 };
 vm.runInNewContext(source,context);
 await handlers.get('doaa:ambient-enter')();
 assert.equal(events.length,0);
});
