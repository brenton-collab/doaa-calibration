'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const geometry=require('../sky-viewport-geometry.js');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');

test('inherited viewport delegates to extracted geometry',()=>{
 assert.match(html,/<script src="\/sky-viewport-geometry\.js"><\/script>/);
 assert.match(html,/DOAASkyViewportGeometry\.drawGraticule\(/);
 assert.match(html,/DOAASkyViewportGeometry\.drawRangeRings\(/);
});

test('extracted geometry draws graticule, nautical-mile rings and compass graduations',()=>{
 const events=[];
 const ctx=new Proxy({}, {get(o,k){return o[k]},set(o,k,v){o[k]=v;return true}});
 for(const name of ['save','restore','beginPath','rect','clip','arc','stroke','fillText','moveTo','lineTo']){
  ctx[name]=(...args)=>events.push({name,args});
 }
 const env={
  ctx,area:()=>({top:90,bottom:20,w:1000,cx:460,cy:430}),innerHeight:800,
  view:{cx:-75.67,cy:45.32,zoom:1},ACTIVE:{lat:45.32,lon:-75.67},
  baseScale:()=>5,rad:x=>x*Math.PI/180,DOAAUnits:{format:n=>n+' NM'},
  project:(lat,lon)=>({x:460+(lon+75.67)*200,y:430-(lat-45.32)*300}),
  unproject:(x,y)=>({lon:-75.67+(x-460)/200,lat:45.32-(y-430)/300})
 };
 geometry.drawGraticule(env);
 geometry.drawRangeRings(env);
 assert.ok(events.some(e=>e.name==='arc'),'range rings drawn');
 assert.ok(events.some(e=>e.name==='fillText'&&String(e.args[0]).includes('NM')),'NM labels drawn');
 assert.ok(events.some(e=>e.name==='fillText'&&/^\\d{3}$/.test(String(e.args[0]))),'compass degree labels drawn');
});
