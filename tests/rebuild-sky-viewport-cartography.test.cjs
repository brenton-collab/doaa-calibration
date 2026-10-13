'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const hit=require('../sky-viewport-hit.js');
const tiles=require('../sky-viewport-tiles.js');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
test('real SKY delegates fallback tiles and selection hit testing',()=>{
 assert.match(html,/skyViewport\.drawTiles\(/);
 assert.match(html,/skyViewport\.hitTest\(/);
 assert.match(html,/tiles:window\.DOAASkyViewportTiles/);
});
test('aircraft selection precedes airport and ignores ground aircraft',()=>{
 const project=(lat,lon)=>({x:lon,y:lat}),airports=[{icao:'CYOW',lat:100,lon:100}];
 const common={x:100,y:100,airports,project,inView:()=>true};
 assert.deepEqual(hit.hit({...common,aircraft:[{id:'air',lat:100,lon:100,ground:false}]}),{type:'aircraft',id:'air'});
 assert.equal(hit.hit({...common,aircraft:[{id:'ground',lat:100,lon:100,ground:true}]}).type,'airport');
});
test('tile cache invalidates and cleans up image callbacks',()=>{
 const calls=[],images=[];
 const ctx={clearRect(){calls.push('clear')},fillRect(){calls.push('fill')}};
 const tile=tiles.create({ctx,project:(lat,lon)=>({x:lon,y:lat}),unproject:()=>({lat:45.32,lon:-75.67}),extent:()=>50,area:()=>({top:0,bottom:0,w:500}),imageFactory:()=>{const im={};images.push(im);return im},onInvalidate:()=>calls.push('invalidate')});
 const attribution=tile.draw({width:500,height:500,mode:'base'});
 assert.match(attribution,/BASE FALLBACK/);
 assert.ok(images.length>0);
 images[0].onload();assert.ok(calls.includes('invalidate'));
 tile.destroy();assert.equal(images[0].onload,null);
 assert.throws(()=>tile.draw({width:500,height:500}),/destroyed/);
});
