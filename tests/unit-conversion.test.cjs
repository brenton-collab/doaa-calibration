'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'..','display-preferences.js'),'utf8');
function setup(){
 const controls={};
 const store={};
 const doc={documentElement:{setAttribute(){},getAttribute(){return 'dark'}},getElementById(id){return controls[id]||null}};
 const handlers={};
 for(const id of ['doaa-theme','doaa-units','doaa-altitude-units'])controls[id]={value:'',addEventListener:(type,fn)=>handlers[id]=fn};
 const win={matchMedia:()=>({matches:true,addEventListener(){}}),dispatchEvent(){}};
 vm.runInNewContext(source,{document:doc,window:win,localStorage:{getItem:k=>store[k],setItem:(k,v)=>store[k]=v},Event:class{}});
 return {win,controls,handlers,store};
}
test('converts measurements without mutating source',()=>{
 const x=setup();
 x.controls['doaa-units'].value='km';x.handlers['doaa-units']();
 x.controls['doaa-altitude-units'].value='m';x.handlers['doaa-altitude-units']();
 assert.equal(x.win.DOAADisplayPreferences.measure(10,'distance').value,18.52);
 assert.equal(x.win.DOAADisplayPreferences.measure(1000,'altitude').value,304.8);
 assert.equal(x.win.DOAADisplayPreferences.measure(null,'distance'),null);
 assert.equal(x.store['doaa.units'],'km');
});
