'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const code=fs.readFileSync(path.join(__dirname,'..','look.js'),'utf8');
function makeLook(){
 const window={};
 vm.runInNewContext(code,{window,Date});
 const board={innerHTML:'',contains:()=>false,querySelectorAll:()=>[]};
 return {board,render(snapshot){window.DOAALook.render(board,snapshot,()=>{});return board.innerHTML;}};
}
test('LOOK gracefully treats malformed aircraft collection as unavailable cues',()=>{
 const x=makeLook();
 assert.match(x.render({observedAt:Date.now(),aircraft:null}),/No noteworthy cues/);
 assert.match(x.render({observedAt:Date.now(),aircraft:{bad:true}}),/No noteworthy cues/);
});
test('LOOK reports emergency squawk only with fresh valid geographic evidence',()=>{
 const x=makeLook(),contact={id:'abc123',lat:45,lon:-75,squawk:'7700'};
 assert.match(x.render({observedAt:Date.now(),aircraft:[contact]}),/Emergency transponder code 7700/);
 assert.doesNotMatch(x.render({observedAt:Date.now()-100000,aircraft:[contact]}),/class="look-item"/);
 assert.doesNotMatch(x.render({observedAt:Date.now(),aircraft:[{...contact,lat:999}]}),/class="look-item"/);
});
