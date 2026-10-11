'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const read=p=>fs.readFileSync(require('node:path').join(__dirname,'..',p),'utf8');
const worker=read('src/worker.js'),client=read('ambient-media.js'),html=read('index.html');
test('bounded read-only media cache endpoint',()=>{
 const start=worker.indexOf('async function ambientMediaApi('),end=worker.indexOf('const application=',start);
 assert.ok(start>=0&&end>start);
 const route=worker.slice(start,end);
 assert.match(route,/\.slice\(0,12\)/);
 assert.match(route,/photo_specificity/);
 assert.match(route,/JOIN identifiers r/);
 assert.doesNotMatch(route,/\brelay\(|\bfetch\(|INSERT INTO|UPDATE claims/);
});
test('media adapter only runs for active SLIDES and throttles cache reads',()=>{
 assert.match(html,/src="\/ambient-media\.js"/);
 assert.match(client,/const INTERVAL=120000/);
 assert.match(client,/window\.DOAAAmbient\?\.active/);
 assert.match(client,/doaa:airframe-media/);
});

test('media adapter discards obsolete aircraft and retries failed lookups',()=>{
 assert.match(client,/const latest=window\.DOAALiveSnapshot\?\.\(\)/);
 assert.match(client,/current\.get\(String\(media\.id\)\.toLowerCase\(\)\)/);
 assert.match(client,/if\(!response\.ok\)\{lastQuery='';return;\}/);
 assert.match(client,/catch\{lastQuery='';\}/);
});
