'use strict';
const assert=require('node:assert/strict');
const {test}=require('node:test');
const {createAirlabsBudget}=require('./airlabs-budget.cjs');
test('enrichment disabled by default and BOARD remains available',()=>{
 const b=createAirlabsBudget({monthlyCap:3,boardReserve:1});
 assert.equal(b.take('flight').ok,false);assert.equal(b.take('fleets').ok,false);
 assert.equal(b.take('flights').ok,true);assert.equal(b.take('flights').ok,true);
 assert.equal(b.take('flights').ok,true);assert.equal(b.take('flights').ok,false);
});
test('daily enrichment limit and reserved board capacity',()=>{
 const b=createAirlabsBudget({monthlyCap:4,boardReserve:2,enrichmentDailyCap:10});
 assert.equal(b.take('flight').ok,true);assert.equal(b.take('fleets').ok,true);
 assert.equal(b.take('flight').reason,'BOARD reserve');
 assert.equal(b.take('flights').ok,true);assert.equal(b.take('flights').ok,true);
});
test('UTC day rollover resets daily cap, not monthly cap',()=>{
 let t=Date.parse('2026-10-10T23:59:00Z');
 const b=createAirlabsBudget({monthlyCap:4,boardReserve:0,enrichmentDailyCap:1,now:()=>t});
 assert.equal(b.take('flight').ok,true);assert.equal(b.take('flight').ok,false);
 t+=120000;assert.equal(b.take('flight').ok,true);assert.equal(b.snapshot().total,2);
});
test('UTC month rollover resets local accounting',()=>{
 let t=Date.parse('2026-10-31T23:59:00Z');
 const b=createAirlabsBudget({monthlyCap:1,boardReserve:0,enrichmentDailyCap:1,now:()=>t});
 assert.equal(b.take('flight').ok,true);assert.equal(b.take('flights').ok,false);
 t+=120000;assert.equal(b.take('flights').ok,true);
});
