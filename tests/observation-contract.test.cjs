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
const relay=read('relay.js');
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


test('LOOK restores keyboard focus by aircraft ID after rank changes',()=>{
 const window={};
 const fakeDocument={get activeElement(){return active}};
 new Function('window','document',look)(window,fakeDocument);
 let focusCount=0,active=null,buttons=[];
 const board={
  innerHTML:'',
  contains:el=>Boolean(el),
  querySelectorAll:()=>buttons
 };
 const render=(aircraft)=>{
  buttons=aircraft.map(a=>({
   dataset:{lookId:a.id,lookIndex:String(aircraft.indexOf(a))},
   addEventListener(){},
   focus(){focusCount++;active=this}
  }));
  window.DOAALook.render(board,{observedAt:Date.now(),aircraft},()=>{});
 };
 {
  const a={id:'abc123',lat:45,lon:-75,squawk:'7700'};
  const b={id:'def456',lat:45,lon:-75,squawk:'7600'};
  render([a,b]);active=buttons[1];
  render([b,a]);
  assert.equal(active.dataset.lookId,'def456');
  assert.equal(focusCount,1);
 }
});

test('multi-cell merge never treats old aircraft as recent',()=>{
 const src=functionSource(html,'mergeResponses','function compose');
 const norm=x=>({id:x.hex,lat:x.lat,lon:x.lon});
 const lastAircraft=new Map();
 const merge=new Function('norm','lastAircraft','GHOST_LIFE',src+';return mergeResponses')(norm,lastAircraft,300000);
 const fresh={now:Date.now(),aircraft:[{hex:'fresh',lat:45,lon:-75}],tracks:{}};
 const old={now:Date.now()-200000,aircraft:[{hex:'old',lat:45,lon:-75}],tracks:{}};
 const result=merge([old,fresh]);
 assert.deepEqual(result.aircraft.map(x=>x.id),['fresh']);
 assert.equal(lastAircraft.has('old'),false);
});

test('Inspector live classification excludes pinned and aging aircraft',()=>{
 const src=html.slice(html.indexOf('function selectEncounter('),html.indexOf('function segDist('));
 assert.match(src,/Date\.now\(\)-now<90000/);
 assert.match(src,/!x\._pinned/);
 assert.match(src,/Date\.now\(\)>=now/);
 assert.match(html,/const a=\{_pinned:true,id:id\|\|\('board:/);
 assert.match(html,/if\(!a\._pinned\)drawTrack/);
 assert.match(html,/if\(a\._pinned\)ctx\.globalAlpha\*=\.42/);
});

test('BOARD ignores superseded responses for the same airport',()=>{
 assert.match(html,/let boardRequestSeq=0/);
 assert.match(html,/requestSeq=\+\+boardRequestSeq/);
 assert.match(html,/requestSeq!==boardRequestSeq/);
 assert.match(html,/HOME\.icao===requestedHome&&requestSeq===boardRequestSeq/);
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

test('relay rejects stale positions and missing coordinate evidence',()=>{
 assert.match(relay,/seconds<=90/);
 assert.match(relay,/raw\.filter\(recentAircraft\)/);
 assert.match(relay,/a\?\.lat==null\|\|a\.lat===''/);
 assert.match(relay,/!recentAircraft\(a\)/);
});

test('relay requires known per-aircraft position age',()=>{
 const start=relay.indexOf('const recentAircraft=');
 const end=relay.indexOf('function observe(',start);
 assert.ok(start>=0&&end>start);
 const predicate=new Function(relay.slice(start,end)+';return recentAircraft')();
 assert.equal(predicate({seen_pos:5}),true);
 assert.equal(predicate({seen:0}),true);
 assert.equal(predicate({seen_pos:91}),false);
 assert.equal(predicate({seen_pos:120,seen:2}),false);
 assert.equal(predicate({seen:4}),true);
 assert.equal(predicate({seen:null}),false);
 assert.equal(predicate({}),false);
 assert.equal(predicate({seen:'invalid'}),false);
});

test('SKY rack and count exclude historical and aging aircraft',()=>{
 assert.match(html,/const vis=aircraft\.filter\(a=>!a\._pinned&&!a\.ground&&inView\(a\)&&now>0/);
 assert.match(html,/a\._pinned\|\|\(now>0&&Date\.now\(\)>=now/);
});
test('AMBIENT slides preserve unknown telemetry',()=>{
 assert.match(ambient,/ALT UNKNOWN/);
 assert.match(ambient,/SPEED UNKNOWN/);
 assert.doesNotMatch(ambient,/Math\.round\(Number\(a\.alt\)\|\|0\)/);
});
