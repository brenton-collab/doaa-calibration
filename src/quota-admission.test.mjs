import test from 'node:test';
import assert from 'node:assert/strict';
import { periodUTC, allocation, admit } from './quota-admission.mjs';
test('UTC period boundaries',()=>{assert.equal(periodUTC('2026-11-01T00:00:00+02:00'),'2026-10');assert.equal(periodUTC('2026-11-01T00:00:00Z'),'2026-11')});
test('protected reserve',()=>{assert.equal(allocation(100,{board:60,inspector:20}).ceiling,80);assert.throws(()=>allocation(100,{board:81}),RangeError)});
test('unknown purpose fails closed',async()=>{const db={prepare(){throw Error('unexpected database access')}};assert.equal(await admit(db,{provider:'AIRLABS',purpose:'inspector',policy:allocation(100,{board:60})}),false)});
test('atomic update consumes only one conditional unit',async()=>{const calls=[];const db={prepare(sql){calls.push(sql);return{bind(...args){calls.push(args);return{run:async()=>({meta:{changes:1}})}}}}};assert.equal(await admit(db,{provider:'AIRLABS',purpose:'board',policy:allocation(100,{board:60})}),true);assert.match(calls[2],/UPDATE quota_admissions/);assert.match(calls[2],/NOT EXISTS/);assert.equal(calls[3][5],80)});
test('denied conditional update fails closed',async()=>{const db={prepare(){return{bind(){return{run:async()=>({meta:{changes:0}})}}}}};assert.equal(await admit(db,{provider:'AIRLABS',purpose:'board',policy:allocation(100,{board:60})}),false)});
