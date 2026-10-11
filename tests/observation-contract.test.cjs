/* Offline regression checks for DOAA's evidence-to-UI contract.
 * Run with node --test tests/observation-contract.test.cjs.
 * No network, providers, database, or deployment required.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html');
const look=read('look.js');
const ambient=read('ambient.js');
const worker=read('src/worker.js');
function functionSource(text,name,next){
 const begin=text.indexOf('function '+name+'(');
 const end=text.indexOf(next,begin);
 assert.ok(begin>=0&&end>begin,'extract '+name);
 return text.slice(begin,end);
}
test('all frontend inline scripts parse',()=>{
 let count=0;
 for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){
  if(match[1].trim()){new Function(match[1]);count++}
 }
 assert.ok(count>=2);
 new Function(look);
 new Function(ambient);
 new Function(worker.replace(/^import .*$/gm,'').replace(/export default\{/,'const defaultExport={'));
});
test('SKY normalization rejects missing coordinates and preserves unknown telemetry',()=>{
 const src=functionSource(html,'norm','function resize');
 const norm=new Function('const HOME={lat:45.3,lon:-75.7};const hav=()=>1,bearing=()=>1;'+src+';return norm')();
 assert.equal(norm({hex:'abc123',lat:null,lon:-75}),null);
 assert.equal(norm({hex:'abc123',lat:45,lon:''}),null);
 assert.equal(norm({hex:'abc123',lat:95,lon:-75}),null);
 const a=norm({hex:'abc123',lat:45,lon:-75});
 assert.equal(a.alt,null);assert.equal(a.gs,null);assert.equal(a.trk,null);assert.equal(a.vr,null);
 assert.equal(norm({hex:'abc123',lat:45,lon:-75,gs:0,track:0}).gs,0);
});
test('LOOK only offers actionable cues with recent evidence',()=>{
 const window={};new Function('window',look)(window);
 const board={innerHTML:'',querySelectorAll:()=>[]};
 const aircraft=[{id:'abc123',lat:45,lon:-75,squawk:'7700'}];
 window.DOAALook.render(board,{observedAt:Date.now()-180000,aircraft},()=>{});
 assert.doesNotMatch(board.innerHTML,/Emergency transponder code/);
 assert.match(board.innerHTML,/Observations are aging/);
 window.DOAALook.render(board,{observedAt:Date.now(),aircraft},()=>{});
 assert.match(board.innerHTML,/Emergency transponder code/);
});
test('acquisition and presentation reject false freshness',()=>{
 assert.match(html,/Number\(e\.data\.now\)>0/);
 assert.match(html,/aircraft:aircraft\.filter\(a=>!a\._pinned\)/);
 assert.match(html,/if\(seq!==refreshSeq\)return false;cellCache\.set/);
 assert.match(ambient,/const a = recent\?slideCandidate\(snapshot\):null/);
 assert.match(ambient,/if\(!recent\)trails\.clear\(\)/);
 assert.match(worker,/RELAY OBSERVATION TIME UNAVAILABLE OR TOO OLD/);
 assert.match(worker,/ADS-B observations not recent enough/);
});
