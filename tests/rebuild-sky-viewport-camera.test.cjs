'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const camera=require('../sky-viewport-camera.js');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
test('SKY application loads and delegates camera mathematics',()=>{
 assert.match(html,/src="\/sky-viewport-camera\.js"/);
 assert.match(html,/DOAASkyViewportCamera\.create\(/);
});
test('camera projection round trips and responds to host layout changes',()=>{
 const v={cx:-75.67,cy:45.32,zoom:1};
 const a={w:1000,h:690,cx:460,cy:393};
 const c=camera.create({getView:()=>v,getArea:()=>a,getRange:()=>50});
 const p=c.project(45.42,-75.47),back=c.unproject(p.x,p.y);
 assert.ok(Math.abs(back.lat-45.42)<1e-9);
 assert.ok(Math.abs(back.lon+75.47)<1e-9);
 const before=c.baseScale();a.w=500;a.h=350;
 assert.ok(c.baseScale()<before,'scale follows the host viewport');
 v.zoom=2;assert.ok(c.project(45.42,-75.47).x!==p.x,'projection follows zoom');
});
