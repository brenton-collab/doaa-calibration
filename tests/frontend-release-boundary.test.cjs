'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const worker = fs.readFileSync(path.join(__dirname, '../src/worker.js'), 'utf8');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../wrangler.jsonc'), 'utf8'));

test('frontend content never follows mutable GitHub main at request time', () => {
  assert.doesNotMatch(worker, /raw\.githubusercontent\.com/);
  assert.doesNotMatch(worker, /fetch\(RAW\s*\+/);
});
test('frontend fallback reads the versioned Cloudflare asset bundle', () => {
  assert.match(worker, /async function frontend\(env,request\)/);
  assert.match(worker, /env\.ASSETS\.fetch\(/);
  assert.match(worker, /return frontend\(env,request\)/);
});
test('flight enrichment fallback reads bundled asset, not external origin', () => {
  assert.match(worker, /async function raw\(name,type,env,request\)/);
  assert.match(worker, /return raw\('flight-enrichment\.js'[^\n]+env,request\)/);
});
test('Cloudflare assets are bundled with Worker deployment', () => {
  assert.equal(config.assets.binding, 'ASSETS');
  assert.equal(config.assets.directory, '.');
  assert.ok(config.assets.run_worker_first.includes('/api/*'));
});
