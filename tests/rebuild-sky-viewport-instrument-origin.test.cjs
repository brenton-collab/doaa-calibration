'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const code=fs.readFileSync(path.join(__dirname,'../sky-viewport.js'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'../sky-viewport-standalone.html'),'utf8');
test('instrument origin can follow camera without moving airport location',()=>{
 assert.match(code,/getInstrumentOrigin\?getInstrumentOrigin\(\):getActive\(\)/);
 assert.match(html,/getInstrumentOrigin:\(\)=>\(\{lat:view\.cy,lon:view\.cx\}\)/);
 assert.match(html,/airports=\[home\]/);
});
