CREATE TABLE IF NOT EXISTS airport_reference_snapshots (snapshot_id TEXT PRIMARY KEY, source_sha256 TEXT NOT NULL, source_url TEXT NOT NULL, retrieved_at TEXT NOT NULL, ready INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS airport_reference_rows (snapshot_id TEXT NOT NULL, airport TEXT NOT NULL, payload TEXT NOT NULL, PRIMARY KEY(snapshot_id,airport));
