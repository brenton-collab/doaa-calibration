'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../sky-viewport-standalone.html'),'utf8');
test('standalone harness mounts real renderer and no synthetic observations',()=>{
 for(const name of ['geometry','camera','canvas','input','traffic','hit','tiles'])assert.match(html,new RegExp('/sky-viewport-'+name+'\\.js'));
 assert.match(html,/DOAASkyViewport\.mount\(/);
 assert.match(html,/drawInstruments\(height\)/);
 assert.match(html,/drawTraffic\(/);
 assert.match(html,/syncVector\(/);
 assert.match(html,/new ResizeObserver\(resize\)/);
 assert.match(html,/viewport\.destroy\(\)/);
 assert.match(html,/observations=\[\]/);
 assert.match(html,/OBSERVATIONS NOT CONNECTED/);
});
test('vector visibility switches between genuine map and fallback',()=>{
 assert.match(html,/data-vector-ready='yes'\] #vector-base\{visibility:visible\}/);
 assert.match(html,/data-vector-ready='yes'\] #tiles\{visibility:hidden\}/);
});
