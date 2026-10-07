-- Durable operational state for finite upstream resources and harvest cursors.
CREATE TABLE IF NOT EXISTS provider_state (
  provider TEXT PRIMARY KEY,
  harvest_cursor INTEGER NOT NULL DEFAULT 0,
  request_cursor INTEGER NOT NULL DEFAULT 0,
  request_epoch TEXT,
  local_calls INTEGER NOT NULL DEFAULT 0,
  metered_since TEXT,
  provider_used INTEGER,
  provider_remaining INTEGER,
  quota_units INTEGER,
  reset_at TEXT,
  authority TEXT NOT NULL DEFAULT 'local',
  observed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata_json TEXT
);

CREATE TABLE IF NOT EXISTS provider_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  occurred_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  units INTEGER NOT NULL DEFAULT 1,
  status TEXT,
  purpose TEXT,
  records_returned INTEGER,
  records_new INTEGER,
  request_fingerprint TEXT,
  metadata_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_provider_requests_provider_time ON provider_requests(provider, occurred_at);
