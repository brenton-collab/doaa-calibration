'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {fromTraffic}=require('../sky-observations.js');
const t=1800000000000;
test('accepts valid fresh observed positions with evidence timestamps',()=>{
 const r=fromTraffic({now:t-12000,provider:'ADS-B',aircraft:[{id:'ABC123',lat:45.3,lon:-75.7,trk:92,seen_pos:2},{id:'bad',lat:999,lon:0}]},t);
 assert.equal(r.state,'fresh');assert.equal(r.aircraft.length,1);
 assert.equal(r.aircraft[0].id,'abc123');assert.equal(r.aircraft[0].observedAt,t-14000);
 assert.equal(r.aircraft[0].receivedAt,t);
});
test('never presents stale, undated or invalid evidence as live traffic',()=>{
 for(const now of [null,0,t-120000,t+120000]){
  const r=fromTraffic({now,aircraft:[{id:'x',lat:45,lon:-75}]},t);
  assert.equal(r.aircraft.length,0);assert.notEqual(r.state,'fresh');
 }
});
test('empty valid response is not a fabricated aircraft',()=>{
 const r=fromTraffic({now:t-1000,aircraft:[]},t);
 assert.equal(r.state,'fresh');assert.deepEqual(r.aircraft,[]);
});

test('rejects positions with missing, old or future individual timestamps even in a fresh batch',()=>{
 const r=fromTraffic({now:t-1000,aircraft:[
  {id:'undated',lat:45,lon:-75},
  {id:'old',lat:45,lon:-75,seen_pos:180},
  {id:'future',lat:45,lon:-75,_doaa_observed_at:t+120000},
  {id:'zero',lat:null,lon:0,seen_pos:1},
  {id:'good',lat:45,lon:-75,_doaa_observed_at:t-5000}
 ]},t);
 assert.deepEqual(r.aircraft.map(a=>a.id),['good']);
});
