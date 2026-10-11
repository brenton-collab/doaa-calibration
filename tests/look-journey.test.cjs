'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../look.js'),'utf8');
test('LOOK opens observed emergency aircraft in Inspector',()=>{
 const handlers={};
 const board={innerHTML:'',querySelectorAll:()=>[{dataset:{lookIndex:'0'},addEventListener:(event,fn)=>{handlers[event]=fn}}]};
 const context={window:{}};
 vm.runInNewContext(source,context);
 let selected=null;
 context.window.DOAALook.render(board,{observedAt:Date.now(),aircraft:[{id:'a1b2c3',call:'TEST123',lat:45.3,lon:-75.6,d:4,alt:1800,squawk:'7700'}]},id=>{selected=id});
 assert.match(board.innerHTML,/Emergency transponder code 7700/);
 handlers.click();
 assert.equal(selected,'a1b2c3');
});
test('LOOK ordinary traffic is not an incident',()=>{
 const board={innerHTML:'',querySelectorAll:()=>[]},context={window:{}};
 vm.runInNewContext(source,context);
 context.window.DOAALook.render(board,{observedAt:Date.now(),aircraft:[{id:'a1b2c3',lat:45.3,lon:-75.6,d:45,alt:30000,vr:0}]},()=>{});
 assert.match(board.innerHTML,/No noteworthy cues/);
});
