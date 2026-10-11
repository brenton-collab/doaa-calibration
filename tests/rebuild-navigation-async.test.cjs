'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../flight-enrichment.js'), 'utf8');
const start = source.indexOf('async function openObject(');
const end = source.indexOf('\nfunction grid(', start);
assert.ok(start >= 0 && end > start, 'openObject source is available');
const implementation = source.slice(start, end);

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function harness() {
  const pending = deferred();
  const renders = [];
  const wires = [];
  const d = {
    _doaaNavigation: 0,
    _doaaSubject: 'contact:ABC123',
    dataset: { activeSurface: 'contact' },
  };
  const ctx = {
    rememberInspector() {},
    renderSurface(surface, ...args) {
      d.dataset.activeSurface = surface;
      renders.push({ surface, args });
    },
    wire(...args) { wires.push(args); },
    activeSurface(node) { return node.dataset.activeSurface; },
    getEvidence() { return pending.promise; },
    fetch() { return pending.promise; },
    encodeURIComponent,
  };
  const openObject = vm.runInNewContext(implementation + '\nopenObject', ctx);
  const a = { id: d._doaaSubject, call: 'TEST01' };
  return { d, a, pending, renders, wires, openObject };
}

test('delayed flight lookup cannot overwrite another Inspector surface', async () => {
  const h = harness();
  const task = h.openObject(h.d, { kind: 'flight', key: 'TEST99' }, h.a, null, null, false, null, null, null, [], false);
  assert.equal(h.d.dataset.activeSurface, 'flight');
  assert.equal(h.renders.length, 1);
  h.d._doaaNavigation += 1;
  h.d.dataset.activeSurface = 'aircraft';
  h.pending.resolve({ flight: { flight_icao: 'TEST99' } });
  await task;
  assert.equal(h.renders.length, 1);
  assert.equal(h.wires.length, 1);
});

test('successful flight lookup updates the current Inspector', async () => {
  const h = harness();
  const task = h.openObject(h.d, { kind: 'flight', key: 'TEST99' }, h.a, null, null, false, null, null, null, [], false);
  h.pending.resolve({ flight: { flight_icao: 'TEST99' } });
  await task;
  assert.equal(h.d._doaaFlightLookup.status, 'ready');
  assert.equal(h.renders.length, 2);
  assert.equal(h.wires.length, 2);
});

test('failed flight lookup remains explicitly unavailable', async () => {
  const h = harness();
  const task = h.openObject(h.d, { kind: 'flight', key: 'TEST99' }, h.a, null, null, false, null, null, null, [], false);
  h.pending.reject(new Error('offline'));
  await task;
  assert.equal(h.d._doaaFlightLookup.status, 'unavailable');
  assert.equal(h.renders.length, 2);
});

test('delayed airport lookup cannot overwrite a new subject', async () => {
  const h = harness();
  const task = h.openObject(h.d, { kind: 'airport', key: 'CYOW' }, h.a, null, null, false, null, null, null, [], false);
  h.d._doaaSubject = 'contact:NEW';
  h.pending.resolve({ ok: true, json: async () => ({ airport: { icao: 'CYOW' } }) });
  await task;
  assert.equal(h.renders.length, 1);
  assert.equal(h.wires.length, 1);
});
