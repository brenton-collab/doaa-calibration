'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const input=require('../sky-viewport-input.js');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
test('real SKY delegates input to reusable controller',()=>{
 assert.match(html,/src="\/sky-viewport-input\.js"/);
 assert.match(html,/DOAASkyViewportInput\.mount\(/);
 assert.doesNotMatch(html,/sky\.onpointerdown=/);
});
test('pan wheel and teardown preserve input semantics',()=>{
 const handlers=new Map();
 const el={addEventListener(k,fn){handlers.set(k,fn)},removeEventListener(k,fn){if(handlers.get(k)===fn)handlers.delete(k)},setPointerCapture(){}};
 const v={cx:-75.67,cy:45.32,zoom:1};let nav=0,settles=0,taps=0;
 const c=input.mount({element:el,getView:()=>v,scale:()=>5,nmlon:()=>42,onNavigate:()=>nav++,onSettle:()=>settles++,onTap:()=>taps++});
 handlers.get('pointerdown')({pointerId:1,clientX:100,clientY:100});
 handlers.get('pointermove')({pointerId:1,clientX:130,clientY:100});
 handlers.get('pointerup')({pointerId:1,clientX:130,clientY:100});
 assert.ok(v.cx<-75.67);assert.equal(taps,0);
 handlers.get('wheel')({deltaY:-100,preventDefault(){}});
 assert.ok(v.zoom>1);assert.equal(nav,2);assert.equal(settles,2);
 c.destroy();c.destroy();assert.equal(handlers.size,0);
});
