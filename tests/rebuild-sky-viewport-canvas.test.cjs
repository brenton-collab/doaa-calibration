'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const canvas=require('../sky-viewport-canvas.js');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
test('application uses extracted canvas owner',()=>{
 assert.match(html,/src="\/sky-viewport-canvas\.js"/);
 assert.match(html,/DOAASkyViewportCanvas\.create\(/);
 assert.match(html,/skyCanvas\.resize\(innerWidth,innerHeight/);
});
test('both canvases resize at device pixel ratio',()=>{
 const transforms=[];
 const make=name=>({style:{},getContext(){return{setTransform(...args){transforms.push([name,...args])}}}});
 const overlay=make('overlay'),base=make('base');
 const v=canvas.create({overlay,base});
 v.resize(480,320,2);
 for(const c of [overlay,base]){
  assert.equal(c.width,960);assert.equal(c.height,640);
  assert.equal(c.style.width,'480px');assert.equal(c.style.height,'320px');
 }
 assert.deepEqual(transforms,[['overlay',2,0,0,2,0,0],['base',2,0,0,2,0,0]]);
 assert.throws(()=>v.resize(0,320,1),RangeError);
});
