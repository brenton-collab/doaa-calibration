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

test('Flight lookup then Back restores Contact and ignores the late response', async () => {
  const h = harness();
  const original = h.a;
  h.d.innerHTML = '<section>Contact</section>';
  h.d.scrollTop = 42;
  h.d._doaaRenderedState = { a: original, f: null, af: null, live: false, ago: null, dossier: null, history: null, obv: [] };
  h.d.querySelector = () => null;
  const context = {
    window: { DOAATrackHistory: { dispose() {} }, DOAAInspector: { tray: { querySelector() { return null; } } } },
    activeSurface: node => node.dataset.activeSurface,
    dossierCache: new Map(),
    dossierKey: a => a.id,
    wire() {},
    renderSurface(surface, node) { node.dataset.activeSurface = surface; },
  };
  const startHistory = source.indexOf('function rememberInspector(');
  const endHistory = source.indexOf('\nasync function openObject(', startHistory);
  const historyFns = vm.runInNewContext(source.slice(startHistory, endHistory) + '\n({rememberInspector,backInspector})', context);
  historyFns.rememberInspector(h.d);
  assert.equal(h.d._doaaBack.length, 1);
  const task = h.openObject(h.d, { kind: 'flight', key: 'TEST99' }, original, null, null, false, null, null, null, [], false);
  assert.equal(h.d.dataset.activeSurface, 'flight');
  historyFns.backInspector(h.d);
  assert.equal(h.d.dataset.activeSurface, 'contact');
  assert.equal(h.d._doaaSubject, original.id);
  assert.equal(h.d.innerHTML, '<section>Contact</section>');
  assert.equal(h.d.scrollTop, 42);
  h.pending.resolve({ flight: { flight_icao: 'TEST99' } });
  await task;
  assert.equal(h.renders.length, 1);
  assert.equal(h.d.dataset.activeSurface, 'contact');
});

test('Contact to Airframe to Back preserves the original context', async () => {
  const h = harness();
  h.d.innerHTML = '<section>Observed Contact</section>';
  h.d.scrollTop = 19;
  h.d._doaaRenderedState = { a: h.a, f: null, af: { reg_number: 'C-TEST' }, live: true, ago: 0, dossier: null, history: null, obv: [] };
  h.d.querySelector = () => null;
  const ctx = {
    window: { DOAATrackHistory: { dispose() {} }, DOAAInspector: { tray: { querySelector() { return null; } } } },
    activeSurface: node => node.dataset.activeSurface,
    dossierCache: new Map(),
    dossierKey: a => a.id,
    wire() {},
    renderSurface(surface, node) { node.dataset.activeSurface = surface; },
  };
  const from = source.indexOf('function rememberInspector(');
  const to = source.indexOf('\nasync function openObject(', from);
  const navigation = vm.runInNewContext(source.slice(from, to) + '\n({rememberInspector,backInspector})', ctx);
  navigation.rememberInspector(h.d);
  await h.openObject(h.d, { kind: 'airframe', key: 'ABC123' }, h.a, null, { reg_number: 'C-TEST' }, true, 0, null, null, [], false);
  assert.equal(h.d.dataset.activeSurface, 'aircraft');
  assert.equal(h.renders.length, 1);
  navigation.backInspector(h.d);
  assert.equal(h.d.dataset.activeSurface, 'contact');
  assert.equal(h.d._doaaSubject, h.a.id);
  assert.equal(h.d.innerHTML, '<section>Observed Contact</section>');
  assert.equal(h.d.scrollTop, 19);
  assert.equal(h.d._doaaBack.length, 0);
});

test('SKY encounter selection does not disturb selection for a missing encounter', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const start = html.indexOf('function selectEncounter(id){');
  const end = html.indexOf('\nfunction segDist(', start);
  assert.ok(start >= 0 && end > start);
  const selected = { id: 'prior', follow: false };
  const context = {
    detail: { dataset: {} },
    detailclose: { setAttribute() {} },
    encounterSnapshot() { return null; },
    tracks: new Map(),
    openDetail() { throw Error('should not open'); },
    set selected(value) { selected.id = value; },
    get selected() { return selected.id; },
    set followSelected(value) { selected.follow = value; },
    get followSelected() { return selected.follow; },
  };
  const selectEncounter = vm.runInNewContext(html.slice(start, end) + '\nselectEncounter', context);
  selectEncounter('missing');
  assert.equal(selected.id, 'prior');
  assert.equal(selected.follow, false);
});
