'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
const start=source.indexOf('async function airportWeatherEvidence('),end=source.indexOf('\n function airportMovementEvidence(',start);
assert.ok(start>=0&&end>start);
function harness(){
 const requests=[],airport={icao:'CYOW'},d={_doaaAirport:airport,_doaaNavigation:1,dataset:{activeSurface:'airport'},scrollTop:0,querySelector:()=>null};
 const context={
  AbortController,encodeURIComponent,
  setTimeout:()=>1,clearTimeout:()=>{},
  fetch:()=>new Promise((resolve,reject)=>requests.push({resolve,reject})),
  activeSurface:()=>d.dataset.activeSurface,
  airportOverview:()=>'<div>weather</div>',
  mountAirportHero:()=>{},
  wire:()=>{}
 };
 return{d,requests,run:vm.runInNewContext(source.slice(start,end)+'\nairportWeatherEvidence',context)};
}
test('returning to Airport Overview replaces abandoned weather request',async()=>{
 const h=harness();
 const first=h.run(h.d);
 assert.equal(h.requests.length,1);
 h.d._doaaNavigation=2;
 h.d.dataset.activeSurface='airport-movements';
 h.d._doaaNavigation=3;
 h.d.dataset.activeSurface='airport';
 const second=h.run(h.d);
 assert.equal(h.requests.length,2,'a new request is started for the new navigation');
 h.requests[0].resolve({ok:true,json:async()=>({ok:true,metar:'OLD'})});
 await first;
 assert.equal(h.d._doaaAirportWeather.status,'loading','stale response must not replace new state');
 h.requests[1].resolve({ok:true,json:async()=>({ok:true,metar:'NEW'})});
 await second;
 assert.equal(h.d._doaaAirportWeather.status,'ready');
 assert.equal(h.d._doaaAirportWeather.data.metar,'NEW');
});
test('repeat render within same navigation does not duplicate request',async()=>{
 const h=harness();
 const first=h.run(h.d);
 await h.run(h.d);
 assert.equal(h.requests.length,1);
 h.requests[0].resolve({ok:true,json:async()=>({ok:true,metar:'CURRENT'})});
 await first;
 assert.equal(h.d._doaaAirportWeather.status,'ready');
});
test('weather failure becomes retryable failed state',async()=>{
 const h=harness(),task=h.run(h.d);
 h.requests[0].reject(Error('offline'));
 await task;
 assert.equal(h.d._doaaAirportWeather.status,'failed');
});
