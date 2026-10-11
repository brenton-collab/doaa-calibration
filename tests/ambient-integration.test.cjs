'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const html=read('index.html'),ambient=read('ambient.js'),css=read('ambient.css'),look=read('look.js'),enrichment=read('flight-enrichment.js'),worker=read('src/worker.js');

test('ambient is loaded from versioned frontend assets and exposes a shared observation snapshot',()=>{
 assert.match(html,/href="\/ambient\.css"/);
 assert.match(html,/src="\/ambient\.js"/);
 assert.match(html,/window\.DOAALiveSnapshot=\(\)=>/);
 assert.match(html,/id="ambient-open"/);
 assert.match(ambient,/window\.DOAALiveSnapshot\?\.\(\)/);
});
test('ambient never creates a second provider acquisition or memory writer',()=>{
 assert.doesNotMatch(ambient,/\bfetch\s*\(/);
 assert.doesNotMatch(ambient,/XMLHttpRequest|sendBeacon|WebSocket/);
 assert.doesNotMatch(ambient,/\/api\/traffic|\/api\/board|\/memory\/observe/);
});
test('mode is explicit, persisted and does not auto-switch',()=>{
 assert.match(ambient,/doaa\.ambient\.mode/);
 assert.match(ambient,/mode = next/);
 assert.match(ambient,/if \(next !== 'SKY' && next !== 'SLIDES'\) return/);
 assert.match(ambient,/data-ambient-idle/);
 assert.match(ambient,/const idleMs = 5 \* 60 \* 1000/);
});
test('slides require an exact registered airframe, license and attribution',()=>{
 assert.match(ambient,/verifiedMedia/);
 assert.match(ambient,/license/);
 assert.match(ambient,/registration/);
 assert.match(ambient,/will not substitute an unrelated aircraft image/);
});
test('ambient preserves a way out and respects reduced motion',()=>{
 assert.match(ambient,/ambient-return/);
 assert.match(ambient,/root\.querySelector\('\.ambient-return'\)\.addEventListener\('click',leave\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});
test('Worker no longer loads frontend code from mutable GitHub main',()=>{
 assert.doesNotMatch(worker,/raw\.githubusercontent\.com/);
 assert.match(worker,/env\.ASSETS\.fetch\(/);
});

test('ambient SKY is visual-first with only sparse chrome and no aircraft labels',()=>{
 assert.doesNotMatch(ambient,/fillText\(/);
 assert.doesNotMatch(ambient,/AIRCRAFT IN CURRENT SNAPSHOT/);
 assert.match(ambient,/const trails = new Map\(\)/);
 assert.match(ambient,/\.ambient-switch/);
 assert.match(css,/\.ambient-head\{top:0;display:flex;flex-direction:row/);
});
test('LOOK uses shared SKY snapshot and provides explicit evidence, not a separate provider feed',()=>{
 assert.match(html,/data-primary="LOOK"/);
 assert.match(html,/src="\/look\.js"/);
 assert.match(html,/DOAALook\?\.render\(board,window\.DOAALiveSnapshot\(\)/);
 assert.match(look,/Emergency transponder code 7700/);
 assert.match(look,/not confirmed incidents or complete airspace coverage/);
 assert.doesNotMatch(look,/\bfetch\s*\(/);
});

test('slides receive only already-reconciled exact-airframe Inspector media',()=>{
 assert.match(enrichment,/af\.photo_specificity==='exact-airframe'/);
 assert.match(enrichment,/doaa:airframe-media/);
 assert.match(ambient,/addEventListener\('doaa:airframe-media'/);
 assert.match(ambient,/verifiedMedia\.get\(String\(a\.id\)\.toLowerCase\(\)\)/);
 assert.match(ambient,/String\(media\.registration\)\.toUpperCase\(\)!==String\(a\.reg\)\.toUpperCase\(\)/);
 assert.doesNotMatch(ambient,/\bfetch\s*\(/);
});

test('slides never invent absent altitude or groundspeed and reject non-HTTPS photo URLs',()=>{
 assert.match(ambient,/ALT UNKNOWN/);
 assert.match(ambient,/SPEED UNKNOWN/);
 assert.match(ambient,/\^https:/);
 assert.doesNotMatch(ambient,/Math\.round\(Number\(a\.alt\)\|\|0\)/);
});

test('ambient excludes absent and invalid coordinates from aircraft and home projection',()=>{
 assert.match(ambient,/a\.lat != null && a\.lat !== ''/);
 assert.match(ambient,/a\.lon != null && a\.lon !== ''/);
 assert.match(ambient,/Math\.abs\(Number\(a\.lat\)\) <= 90/);
 assert.match(ambient,/Math\.abs\(Number\(a\.lon\)\) <= 180/);
 assert.match(ambient,/home\.lat != null && home\.lat !== ''/);
 assert.match(ambient,/home\.lon != null && home\.lon !== ''/);
});


test('AMBIENT SKY resets screen-space trails when the viewport changes, not on stable redraw',()=>{
 const begin=ambient.indexOf('function dimensions() {');
 const end=ambient.indexOf('  // Persistent strokes accumulate',begin);
 assert.ok(begin>=0&&end>begin,'actual dimensions implementation available');
 const dimensionsSource=ambient.slice(begin,end);
 const canvas={width:0,height:0,style:{}};
 const ctx={setTransform(){}};
 const trails=new Map([['a',[{x:50,y:60,t:1}]]]);
 const run=new Function('canvas','ctx','trails','devicePixelRatio','innerWidth','innerHeight',dimensionsSource+';return dimensions();');
 assert.deepEqual(run(canvas,ctx,trails,1,800,600),{w:800,h:600});
 assert.equal(trails.size,0,'initial projection clears incompatible trails');
 trails.set('a',[{x:50,y:60,t:2}]);
 run(canvas,ctx,trails,1,800,600);
 assert.equal(trails.size,1,'same geometry preserves real movement');
 run(canvas,ctx,trails,1,600,800);
 assert.equal(trails.size,0,'orientation change discards stale screen coordinates');
});
