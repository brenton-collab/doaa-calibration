'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const start=html.indexOf('/* Adapter delegates to the inherited');
const end=html.indexOf('</script>',start);
assert.ok(start>=0&&end>start,'SKY launcher adapter exists');
const script=html.slice(start,end);
function harness(){
 const handlers=new Map(),clicks=[],focuses=[];
 function el(name){return{name,hidden:name==='panel',disabled:false,dataset:{skyAction:name},setAttribute(k,v){this[k]=v},removeAttribute(k){delete this[k]},getAttribute(k){return this[k]},addEventListener(k,fn){handlers.set(name+':'+k,fn)},focus(){focuses.push(name)},click(){clicks.push(name)}}}
 const launcher=el('launcher'),panel=el('panel');
 const names=['SKY','BOARD','LOOK','AMBIENT','MAP','FOLLOW','HOME','PREFERENCES'];
 const actions=Object.fromEntries(names.map(name=>[name,el(name)]));
 actions.SKY['aria-pressed']='true';
 panel.querySelector=q=>actions[q.split('=')[1]?.replace(']','')]||actions.SKY;
 panel.contains=()=>false;
 const selectors={'#sky-launcher':launcher,'#sky-launcher-panel':panel,'[data-primary=SKY]':actions.SKY,'[data-primary=BOARD]':actions.BOARD,'[data-primary=LOOK]':actions.LOOK,'#ambient-open':actions.AMBIENT,'#sky-map-settings':actions.MAP,'#sky-follow':actions.FOLLOW,'#recenter':actions.HOME,'#global-preferences':actions.PREFERENCES};
 const document={activeElement:launcher,getElementById(id){return selectors['#'+id]},querySelector(q){return selectors[q]},addEventListener(k,fn){handlers.set('document:'+k,fn)}};
 vm.runInNewContext(script,{document});
 const open=()=>handlers.get('launcher:click')();
 const act=name=>handlers.get('panel:click')({target:{closest(){return actions[name]}}});
 const escape=()=>handlers.get('document:keydown')({key:'Escape',preventDefault(){},stopPropagation(){}});
 return{launcher,panel,actions,clicks,focuses,open,act,escape};
}
test('gear opens and Escape closes, restoring keyboard focus',()=>{
 const h=harness();h.open();assert.equal(h.panel.hidden,false);assert.equal(h.launcher['aria-expanded'],'true');h.escape();assert.equal(h.panel.hidden,true);assert.equal(h.launcher['aria-expanded'],'false');assert.equal(h.focuses.at(-1),'launcher');
});
test('map, follow and home return to SKY before using inherited handlers',()=>{
 for(const name of ['MAP','FOLLOW','HOME']){const h=harness();h.open();h.act(name);assert.deepEqual(h.clicks,['SKY',name]);assert.equal(h.panel.hidden,true)}
});
test('BOARD and LOOK navigate directly without resetting SKY first',()=>{
 for(const name of ['BOARD','LOOK']){const h=harness();h.open();h.act(name);assert.deepEqual(h.clicks,[name])}
});
test('unavailable follow control does not trigger a fake action',()=>{
 const h=harness();h.actions.FOLLOW.hidden=true;h.open();assert.equal(h.actions.FOLLOW.disabled,true);assert.equal(h.actions.FOLLOW.textContent,'Follow · select an aircraft');assert.deepEqual(h.clicks,[]);
});

test('preferences and ambient delegate without changing workspace',()=>{
 for(const name of ['PREFERENCES','AMBIENT']){const h=harness();h.open();h.act(name);assert.deepEqual(h.clicks,[name]);assert.equal(h.panel.hidden,true)}
});
test('clicking gear twice closes panel',()=>{
 const h=harness();h.open();h.open();assert.equal(h.panel.hidden,true);assert.equal(h.launcher['aria-expanded'],'false');
});

test('gear shows current workspace and disables follow when no aircraft selected',()=>{
 const h=harness();h.actions.FOLLOW.hidden=true;h.open();assert.equal(h.actions.SKY['aria-current'],'page');assert.equal(h.actions.FOLLOW.disabled,true);assert.equal(h.actions.FOLLOW.textContent,'Follow · select an aircraft');
});
