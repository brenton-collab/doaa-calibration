'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { direction, airportMatches, boardCoverage, isAirborne, boardKey } = require('../board-core.cjs');

test('YOW and CYOW both match IATA/ICAO provider fields', () => {
  assert.equal(direction({ dep_icao: 'CYOW', arr_iata: 'YYZ' }, 'YOW'), 'DEP');
  assert.equal(direction({ dep_iata: 'YUL', arr_icao: 'CYOW' }, 'YOW'), 'ARR');
  assert.equal(direction({ dep_iata: 'YOW', arr_iata: 'YYZ' }, 'CYOW'), 'DEP');
  assert.equal(airportMatches({ arr_iata: 'YOW' }, 'arr', 'CYOW'), true);
});
test('Unrelated, missing, and circular routes are not falsely labelled departures', () => {
  assert.equal(direction({ dep_iata: 'YUL', arr_iata: 'YYZ' }, 'YOW'), 'UNKNOWN');
  assert.equal(direction({}, 'YOW'), 'UNKNOWN');
  assert.equal(direction({ dep_iata: 'YOW', arr_iata: 'YOW' }, 'YOW'), 'BOTH');
});
test('Coverage distinguishes zero traffic from failed queries', () => {
  const success = { status: 'fulfilled', value: [] };
  const failure = { status: 'rejected', reason: new Error('quota') };
  assert.deepEqual(boardCoverage([success, success]), { coverage: 'complete', failures: [], unavailable: false });
  assert.equal(boardCoverage([success, failure]).coverage, 'partial');
  assert.deepEqual(boardCoverage([failure, failure]).failures.map(x => x.direction), ['departures', 'arrivals']);
  assert.equal(boardCoverage([failure, failure]).unavailable, true);
});
test('Known grounded or cancelled records are excluded; unknown status remains evidence-limited', () => {
  assert.equal(isAirborne({ status: 'landed' }), false);
  assert.equal(isAirborne({ status: 'cancelled' }), false);
  assert.equal(isAirborne({ status: 'scheduled' }), false);
  assert.equal(isAirborne({ alt: 0 }), false);
  assert.equal(isAirborne({ status: 'en-route', alt: 8000 }), true);
  assert.equal(isAirborne({ status: 'active' }), true);
});
test('Flight dedup key retains operation date and route', () => {
  const a = { flight_icao: 'ACA123', dep_time: '2026-10-08T12:00:00', dep_iata: 'YOW', arr_iata: 'YYZ' };
  assert.equal(boardKey(a), boardKey({ ...a }));
  assert.notEqual(boardKey(a), boardKey({ ...a, dep_time: '2026-10-09T12:00:00' }));
  assert.notEqual(boardKey(a), boardKey({ ...a, arr_iata: 'YUL' }));
});
