-- Additive reference-only schema. No observation, encounter or personal data changes.
CREATE TABLE IF NOT EXISTS airport_reference_snapshots (
 snapshot_id TEXT PRIMARY KEY,
 source_sha256 TEXT NOT NULL,
 source_url TEXT NOT NULL,
 retrieved_at TEXT NOT NULL,
 expected_airports INTEGER NOT NULL CHECK(expected_airports>=0),
 ready INTEGER NOT NULL DEFAULT 0 CHECK(ready IN (0,1))
);
CREATE TABLE IF NOT EXISTS airport_reference_rows (
 snapshot_id TEXT NOT NULL REFERENCES airport_reference_snapshots(snapshot_id),
 airport TEXT NOT NULL,
 payload TEXT NOT NULL,
 PRIMARY KEY(snapshot_id,airport)
);
CREATE INDEX IF NOT EXISTS idx_airport_reference_ready ON airport_reference_snapshots(ready,retrieved_at DESC);
