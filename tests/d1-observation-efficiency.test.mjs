import test from 'node:test';
import assert from 'node:assert/strict';
import { handleMemory } from '../doaa-memory.js';

function fakeDb() {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      const entry = { sql, args: [] };
      calls.push(entry);
      return {
        bind(...args) { entry.args = args; return this; },
        async run() { return { meta: { changes: /INSERT OR IGNORE INTO observations/.test(sql) ? 0 : 1 } }; },
        async first() {
          if (/SELECT id,kind,canonical_key FROM entities/.test(sql)) return { id: 7, kind: 'airframe', canonical_key: 'ABC123' };
          if (/SELECT entity_id FROM identifiers/.test(sql)) return { entity_id: 7 };
          if (/SELECT e.id,e.first_seen_at,e.last_seen_at FROM encounters/.test(sql)) return { id: 11 };
          if (/SELECT encounter_id FROM observations/.test(sql)) return { encounter_id: 11 };
          return null;
        },
        async all() { return { results: [] }; }
      };
    }
  };
}

test('replayed observation skips expensive reconciliation and entity touch', async () => {
  const DB = fakeDb();
  const request = new Request('https://example.test/memory/observe', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ observation_source: 'acquisition', icao24: 'ABC123', latitude: 45.3, longitude: -75.6, observed_at: '2026-10-09T12:00:00Z' })
  });
  const response = await handleMemory(request, { DB });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.duplicate, true);
  assert.ok(DB.calls.some(c => c.sql.includes('ON CONFLICT(kind,canonical_key) DO NOTHING')));
  assert.ok(DB.calls.some(c => c.sql.includes('ON CONFLICT(scheme,normalized_value) DO UPDATE') && c.sql.includes('WHERE identifiers.value<>excluded.value')));
  assert.ok(!DB.calls.some(c => c.sql.includes('SELECT DISTINCT e.id FROM encounters e JOIN observations')));
  assert.ok(!DB.calls.some(c => c.sql.includes('SELECT MIN(observed_at) first_seen')));
});
