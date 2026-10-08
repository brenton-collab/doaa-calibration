CREATE TABLE IF NOT EXISTS provider_circuit (
  provider TEXT PRIMARY KEY,
  blocked_until TEXT NOT NULL,
  reason TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
