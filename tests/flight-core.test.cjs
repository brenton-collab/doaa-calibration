const test=require('node:test'),assert=require('node:assert/strict'),C=require('../flight-core.js');
const now=Date.parse('2026-10-11T15:00:00Z');
test('source time retains date and offset, rejects invalid dates and leaves ambiguous timezone unresolved',()=>{
 assert.equal(C.time('2026-10-10T23:45:00-04:00').label,'2026-10-11 03:45:00 UTC');
 assert.equal(C.time('00:15').at,null);assert.equal(C.time('2026-10-11T12:00:00').state,'unresolved');
 assert.equal(C.time('2026-02-30T12:00:00Z').state,'invalid');assert.equal(C.time(null).label,'NOT AVAILABLE');
});
test('departure and arrival punctuality preserve early, late, zero and midnight boundaries',()=>{
 const t=C.timing({dep_time:'2026-10-10T23:55:00Z',dep_actual:'2026-10-11T00:05:00Z',arr_time:'2026-10-11T02:00:00Z',arr_actual:'2026-10-11T01:50:00Z'},now);
 assert.equal(t.dep.punctuality.minutes,10);assert.equal(t.arr.punctuality.minutes,-10);assert.equal(t.dep.punctuality.state,'actual');
 assert.match(t.arr.punctuality.label,/EARLY/);assert.equal(C.timing({dep_time:'2026-10-11T12:00:00Z',dep_actual:'2026-10-11T12:00:00Z'},now).dep.punctuality.label,'ACTUAL · ON TIME');
});
test('forecasts, event basis mismatch and future actual times cannot masquerade as actual punctuality',()=>{
 const t=C.timing({dep_time:'2026-10-11T12:00:00Z',dep_estimated:'2026-10-11T12:05:00Z'},now);
 assert.equal(t.dep.punctuality.state,'estimated');assert.match(t.dep.punctuality.label,/ESTIMATED/);
 assert.equal(C.timing({dep_time:'2026-10-11T12:00:00Z',dep_actual:'2026-10-11T12:05:00Z',dep_scheduled_basis:'off-block',dep_actual_basis:'takeoff'},now).dep.punctuality.state,'incomparable');
 assert.equal(C.timing({arr_time:'2026-10-11T16:00:00Z',arr_actual:'2026-10-11T16:05:00Z'},now).arr.punctuality.minutes,null);
});
test('generic departure and schedule do not imply airborne duration or remaining time',()=>{
 const t=C.timing({dep_actual:'2026-10-11T12:00:00Z',arr_time:'2026-10-11T16:00:00Z'},now);
 assert.equal(t.airborneMinutes,null);assert.equal(t.remainingMinutes,null);
 assert.equal(C.timing({dep_takeoff:'2026-10-11T12:00:00Z',arr_landing:'2026-10-11T14:00:00Z'},now).airborneMinutes,120);
 assert.equal(C.timing({arr_estimated:'2026-10-11T15:00:00Z'},now).remainingMinutes,0);
});
test('observation freshness uses the observed timestamp, preserves zero telemetry and qualifies phase',()=>{
 assert.equal(C.observation({observed_at:now-1000,lat:0,lon:0,vr:0},true,now).current,true);
 assert.deepEqual(C.position({lat:0,lon:0}),{lat:0,lon:0});assert.equal(C.position({lat:null,lon:0}),null);
 assert.equal(C.observation({observed_at:now-120000},true,now).current,false);
 assert.equal(C.observation({observed_at:now+120000},true,now).current,false);
 assert.equal(C.observation({vr:null},true,now).phase,'UNKNOWN');
 assert.match(C.observation({on_ground:true},true,now).phase,/REPORTED ON GROUND/);
});
test('geographic progress requires verified assignment and recent corridor-supported position',()=>{
 const f={dep_lat:0,dep_lon:0,arr_lat:0,arr_lon:10},a={lat:0,lon:5,observed_at:now};
 assert.equal(C.route(f,a,true,now).fraction,null);
 const assigned={...f,current_assignment_established:true};assert.ok(Math.abs(C.route(assigned,a,true,now).fraction-.5)<1e-8);
 assert.equal(C.route(assigned,{...a,lat:20},true,now).fraction,null);
 assert.equal(C.route(assigned,{...a,observed_at:now-120000},true,now).fraction,null);
 assert.equal(C.route(assigned,{...a,lon:-1},true,now).fraction,null);
});
test('route map wraps antimeridian and includes only sourced coordinates',()=>{
 const r=C.route({dep_lat:10,dep_lon:170,arr_lat:10,arr_lon:-170},{lat:11,lon:180,observed_at:now},true,now),p=C.layout(r);
 assert.ok(p.destination.x>p.origin.x);assert.ok(p.aircraft.y<p.origin.y);assert.equal(C.layout(C.route({},{})),null);
});
test('conflicting and historical identity claims cannot silently become one current airframe fact',()=>{
 assert.equal(C.field({claims:[{predicate:'registration',value_text:'OLD',status:'superseded'}]},'registration').state,'unknown');
 const conflict=C.field({claims:[{predicate:'model',value_text:'A',status:'supported'},{predicate:'model',value_text:'B',status:'supported'}]},'model','A');
 assert.equal(conflict.value,'CONFLICTING');assert.equal(conflict.claims.length,2);
 assert.equal(C.field({claims:[{predicate:'operator',value_text:'Possible',status:'inferred'}]},'operator').state,'inferred');
 assert.equal(C.field({claims:[{predicate:'msn',value_text:'0',status:'supported'}]},'msn').value,'0');
});
