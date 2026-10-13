'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const traffic=require('../sky-viewport-traffic.js');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
test('actual SKY routes traffic through viewport',()=>{
 assert.match(html,/src="\/sky-viewport-traffic\.js"/);
 assert.match(html,/skyViewport\.drawTraffic\(/);
 assert.match(html,/traffic:window\.DOAASkyViewportTraffic/);
 assert.doesNotMatch(html,/function drawTrack\(/);
});
test('inherited aircraft and airport symbology draws on supplied canvas',()=>{
 const ops=[];
 const ctx=new Proxy({}, {get(o,k){return o[k]||((...args)=>ops.push(k))},set(o,k,v){o[k]=v;return true}});
 traffic.drawTraffic({ctx,project:(lat,lon)=>({x:200+(lon+75.6692)*100,y:200-(lat-45.3225)*100}),area:()=>({top:50,bottom:10,w:800}),innerHeight:600,aircraft:[{id:'abc123',lat:45.33,lon:-75.66,ground:false,trk:45,observed_at:1000}],AIRPORTS:[{icao:'CYOW',lat:45.3225,lon:-75.6692}],selected:'abc123',tracks:new Map(),trailsVisible:true,DOAASkyMapCore:{fresh:()=>true},rackSearchResults:null,searchMatchIds:new Set(),rad:n=>n*Math.PI/180,inView:()=>true,now:1000});
 assert.ok(ops.includes('translate'),'aircraft positioned');
 assert.ok(ops.includes('arc'),'selection and airport markers drawn');
 assert.ok(ops.includes('fillText'),'airport code drawn');
});
