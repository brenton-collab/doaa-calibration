const test = require('node:test');
const assert = require('node:assert/strict');
const C = require('../track-core.js');
const samples = C.normalize([
  { observed_at: '2026-10-11T14:00:00Z', latitude: 45.3, longitude: -75.7, altitude_ft: null, groundspeed_kt: 0, track_deg: null },
  { observed_at: '2026-10-11T14:00:10Z', latitude: 45.31, longitude: -75.69, altitude_ft: 1000, groundspeed_kt: 110 },
  { observed_at: '2026-10-11T14:05:00Z', latitude: 45.5, longitude: -75.4, altitude_ft: 5000, groundspeed_kt: 220 }
]);
test('history preserves zero telemetry, absent telemetry and actual sample times', () => {
  assert.equal(samples[0].gs, 0); assert.equal(samples[0].alt, null); assert.equal(samples[0].track, null);
  assert.equal(C.normalize([{ observed_at: 100, latitude: null, longitude: -75 }]).length, 0);
});
test('shared cursor chooses a prior supported observation and never interpolates or leaks a future position', () => {
  const p = C.sampleAt(samples, samples[0].t + 5000); assert.equal(p.point.lat, 45.3); assert.equal(p.ageMs, 5000);
  assert.equal(C.sampleAt(samples, samples[0].t - 1), null);
  assert.equal(C.sampleAt(samples, samples[1].t + 31000), null);
  assert.equal(C.sampleAt(samples, samples[2].t + 1), null);
});
test('reception gaps split geometry and combined compare clock spans the union', () => {
  assert.deepEqual(C.segments(samples).map(s=>s.length), [2, 1]);
  const other = C.normalize([{ t: samples[0].t - 10000, lat: 45, lon: -75 }, { t: samples[2].t + 10000, lat: 46, lon: -76 }]);
  assert.deepEqual(C.windowFor([samples,other]), {start:other[0].t,end:other[1].t});
  assert.equal(C.sampleAt(samples,other[0].t),null);
});
test('playback advances in actual timestamp intervals, preserves cursor on pause, and stops at the last sample', () => {
  const clock = new C.Clock(100000, 120000); clock.play(); clock.advance(1000); clock.advance(1500);
  assert.equal(clock.cursor,100500);clock.speed=5;clock.advance(2500);assert.equal(clock.cursor,105500);
  clock.pause();clock.advance(3500);assert.equal(clock.cursor,105500);clock.seek(119999);clock.play();clock.advance(4000);clock.advance(4001);
  assert.equal(clock.cursor,120000);assert.equal(clock.playing,false);
});
test('loop is opt-in and keeps the absolute clock within the selected window', () => {
  const clock = new C.Clock(1000,2000);assert.equal(clock.loop,false);clock.loop=true;clock.speed=5;clock.play();clock.advance(0);clock.advance(250);
  assert.equal(clock.cursor,1250);assert.equal(clock.playing,true);clock.seek(1500);assert.equal(clock.cursor,1500);
});
test('comparison candidates prioritize actual overlap and nearby evidence without auto-selection', () => {
  const candidates = C.rankCandidates([{first_seen_at:0,last_seen_at:5000,latitude:10,longitude:10},{first_seen_at:2000,last_seen_at:4000,latitude:45.3,longitude:-75.7}],{start:1000,end:3000},{lat:45.3,lon:-75.7});
  assert.equal(candidates[0].distance_nm,0);assert.equal(candidates[0].overlap,true);
});

test('observed event navigation uses literal timestamped changes and does not infer across gaps',()=>{
 const p=C.normalize([{id:1,t:0,lat:45,lon:-75,callsign:'TEST1',squawk:'1200',on_ground:1},{id:2,t:30000,lat:45.1,lon:-75,callsign:'TEST2',squawk:'7700',on_ground:0},{id:3,t:300000,lat:45.2,lon:-75,callsign:'TEST3',squawk:'1200',on_ground:1}]);
 const events=C.events(p);assert.equal(events.length,3);assert.ok(events.every(e=>e.t===30000&&e.observation_id===2));assert.match(events[1].label,/1200 → 7700/);assert.doesNotMatch(events.map(e=>e.label).join(' '),/takeoff|landed|emergency/i);
});
