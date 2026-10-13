'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const viewport=require('../sky-viewport.js');
const camera=require('../sky-viewport-camera.js');
const canvas=require('../sky-viewport-canvas.js');
const input=require('../sky-viewport-input.js');
const geometry=require('../sky-viewport-geometry.js');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
test('real SKY mounts assembled viewport',()=>{
 assert.match(html,/src="\/sky-viewport\.js"/);
 assert.match(html,/skyViewport=window\.DOAASkyViewport\.mount\(/);
 assert.match(html,/skyViewport\.drawInstruments\(innerHeight\)/);
});
test('mounted viewport renders instruments, round trips and tears down',()=>{
 const make=()=>({style:{},handlers:new Map(),getContext(){return new Proxy({setTransform(){}},{get(o,k){return o[k]||(()=>{})},set(o,k,v){o[k]=v;return true}})},addEventListener(k,fn){this.handlers.set(k,fn)},removeEventListener(k){this.handlers.delete(k)}});
 const overlay=make(),base=make(),view={cx:-75.6692,cy:45.3225,zoom:1};
 const v=viewport.mount({overlay,base,getView:()=>view,getArea:()=>({top:92,bottom:18,w:1000,h:690,cx:460,cy:395}),getRange:()=>50,getActive:()=>({lat:45.3225,lon:-75.6692}),units:{format:n=>n+' NM'},onNavigate(){},onTap(){},onSettle(){},geometry,camera,canvas,input});
 v.resize(1000,800,2);v.drawInstruments(800);
 const p=v.project(45.4,-75.5),q=v.unproject(p.x,p.y);
 assert.ok(Math.abs(q.lat-45.4)<1e-9&&Math.abs(q.lon+75.5)<1e-9);
 assert.equal(overlay.width,2000);assert.equal(base.width,2000);
 assert.equal(overlay.handlers.size,5);
 v.destroy();v.destroy();assert.equal(overlay.handlers.size,0);
 assert.throws(()=>v.resize(1000,800),/destroyed/);
});
