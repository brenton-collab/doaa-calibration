import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeScheduleFlight,normalizeScheduleSnapshot} from './board-schedule.mjs';
const base={direction:'departure',flight_number:'AC 456',other_airport:'YYZ',scheduled_at:'2026-10-10T14:45:00-04:00',status:'Boarding',gate:'18',codeshares:['UA 9001','UA9001']};
test('flight has stable schedule identity, normalized UTC and no invented airframe',()=>{
 const f=normalizeScheduleFlight(base,'YOW');assert.equal(f.flight_number,'AC456');assert.equal(f.scheduled_at,'2026-10-10T18:45:00.000Z');assert.equal(f.status,'boarding');assert.equal(f.aircraft_match,null);assert.deepEqual(f.codeshares,['UA9001']);
});
test('arrival/departure are distinct and midnight offset preserved',()=>{
 const a=normalizeScheduleFlight({...base,direction:'arrival',scheduled_at:'2026-10-11T00:15:00-04:00'},'YOW');
 const b=normalizeScheduleFlight(base,'YOW');assert.notEqual(a.id,b.id);assert.equal(a.scheduled_at,'2026-10-11T04:15:00.000Z');
});
test('invalid timezone and missing schedule fail closed',()=>{
 assert.throws(()=>normalizeScheduleFlight({...base,scheduled_at:'2026-10-10 14:45'},'YOW'),/timezone/);
 assert.throws(()=>normalizeScheduleFlight({...base,flight_number:''},'YOW'),/flight number/);
});
test('duplicate and malformed rows reported without losing valid flights',()=>{
 const s=normalizeScheduleSnapshot([base,base,{...base,other_airport:'bad airport'}],{source:'YOW',observed_at:'2026-10-10T14:00:00-04:00'});
 assert.equal(s.flights.length,1);assert.equal(s.invalid_count,2);assert.equal(s.errors[0].reason,'duplicate');
});
test('unknown statuses preserve source text',()=>{
 const f=normalizeScheduleFlight({...base,status:'Gate changed'},'YOW');assert.equal(f.status,'unknown');assert.equal(f.raw_status,'Gate changed');
});
