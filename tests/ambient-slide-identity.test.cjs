'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

test('SLIDES renderer permits verified hex-only aircraft while guarding registration mismatches',()=>{
 const source=fs.readFileSync(path.join(__dirname,'..','ambient.js'),'utf8');
 assert.match(source,/a\.reg\s*&&\s*String\(media\.registration\)\.toUpperCase\(\)!==String\(a\.reg\)\.toUpperCase\(\)/);
 assert.doesNotMatch(source,/!a\.reg\s*\|\|\s*String\(media\.registration\)/);
 assert.match(source,/verifiedMedia\.get\(String\(a\.id\)\.toLowerCase\(\)\)/);
});

test('SLIDES loader retains stale registration protection',()=>{
 const source=fs.readFileSync(path.join(__dirname,'..','ambient-media.js'),'utf8');
 assert.match(source,/a\.reg\s*&&\s*!liveReg/);
 assert.match(source,/liveReg\s*&&\s*liveReg!==String\(media\.registration\)\.toUpperCase\(\)/);
});
