'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../vector-base.js'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
test('real SKY mounts vector layer rather than synchronizing globally',()=>{
 assert.match(html,/vector:window\.DOAASkyViewportVector/);
 assert.match(html,/skyViewport\.syncVector\(/);
 assert.doesNotMatch(html,/window\.doaaVectorSync\(\{/);
});
test('vector layer accepts a container and cleans up MapLibre instance',()=>{
 let created,removed=0;
 class MapMock{constructor(options){created=options}on(){}resize(){}jumpTo(){}remove(){removed++}}
 const root={dataset:{}},window={maplibregl:{Map:MapMock},dispatchEvent(){}};
 vm.runInNewContext(source,{window,document:{documentElement:root},maplibregl:window.maplibregl,setTimeout:()=>1,clearTimeout(){},console:{warn(){}}});
 const element={id:'independent-sky-map'};
 const layer=window.DOAASkyViewportVector.mount(element);
 layer.sync({lon:-75.67,lat:45.32,zoom:8,mode:'base',width:900,height:600});
 assert.equal(created.container,element);
 layer.destroy();assert.equal(removed,1);assert.equal(root.dataset.vectorReady,'no');
});
