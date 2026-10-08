'use strict';

// Pure BOARD transformations. No network calls, API keys, or runtime side effects.
const norm = value => String(value ?? '').trim().toUpperCase();
function airportMatches(flight, side, airport) {
  const codes = [flight?.[side + '_iata'], flight?.[side + '_icao']].map(norm).filter(Boolean);
  const home = norm(airport);
  const aliases = home === 'YOW' || home === 'CYOW' ? ['YOW', 'CYOW'] : [home];
  return codes.some(code => aliases.includes(code));
}
function direction(flight, airport) {
  const arrival = airportMatches(flight, 'arr', airport);
  const departure = airportMatches(flight, 'dep', airport);
  if (arrival && departure) return 'BOTH';
  return arrival ? 'ARR' : departure ? 'DEP' : 'UNKNOWN';
}
function boardCoverage(settled) {
  const failures = settled.map((s, i) => (s.status === 'rejected' || !Array.isArray(s.value))
    ? { direction: i === 0 ? 'departures' : 'arrivals', error: s.status === 'rejected' ? String(s.reason?.message || s.reason) : 'malformed provider response' }
    : null).filter(Boolean);
  return { coverage: failures.length ? 'partial' : 'complete', failures, unavailable: failures.length === settled.length };
}
function isAirborne(raw) {
  const status = norm(raw?.status);
  if (['LANDED', 'CANCELLED', 'CANCELED', 'SCHEDULED'].includes(status)) return false;
  const altitude = raw?.alt;
  if (altitude != null && altitude !== '' && Number.isFinite(Number(altitude)) && Number(altitude) <= 0) return false;
  return true;
}
function boardKey(f) {
  const hex = norm(f.hex);
  const call = norm(f.flight_icao || f.flight_iata);
  const stamp = norm(f.dep_time || f.dep_actual || f.arr_time || f.arr_estimated);
  return [hex || call || norm(f.reg_number), stamp, norm(f.dep_icao || f.dep_iata), norm(f.arr_icao || f.arr_iata)].join('|');
}
module.exports = { airportMatches, direction, boardCoverage, isAirborne, boardKey };
