-- Fresh, empty Preview database only. Generated from locally applied migrations 0001–0016.
-- CREATE only; no existing aviation data is rewritten or removed.
CREATE TABLE auth_attempts (state_hash TEXT PRIMARY KEY,nonce TEXT NOT NULL,verifier TEXT NOT NULL,expires_at TEXT NOT NULL);

CREATE TABLE auth_sessions (token_hash TEXT PRIMARY KEY,subject TEXT NOT NULL,created_at TEXT NOT NULL,expires_at TEXT NOT NULL);

CREATE TABLE claims (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_id INTEGER NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  predicate TEXT NOT NULL,
  value_text TEXT NOT NULL,
  value_normalized TEXT,
  status TEXT NOT NULL DEFAULT 'supported' CHECK(status IN ('supported','conflicting','superseded','inferred')),
  first_supported_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_supported_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(entity_id, predicate, value_text)
);

CREATE TABLE encounters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_id INTEGER REFERENCES entities(id) ON DELETE SET NULL,
  contact_key TEXT NOT NULL,
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  callsign TEXT,
  type_code TEXT,
  min_altitude_ft INTEGER,
  max_altitude_ft INTEGER,
  observation_count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE entities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  canonical_key TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(kind, canonical_key)
);

CREATE TABLE evidence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  claim_id INTEGER NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  source_id INTEGER NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  evidence_locator TEXT,
  evidence_excerpt TEXT,
  observed_at TEXT,
  retrieved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(claim_id, source_id, evidence_locator)
);

CREATE TABLE identifiers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_id INTEGER NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  scheme TEXT NOT NULL,
  value TEXT NOT NULL,
  normalized_value TEXT NOT NULL,
  first_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(scheme, normalized_value)
);

CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_id INTEGER REFERENCES entities(id) ON DELETE CASCADE,
  lead_type TEXT NOT NULL,
  lead_value TEXT NOT NULL,
  normalized_value TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','resolved','exhausted','retry')),
  discovered_from_claim_id INTEGER REFERENCES claims(id) ON DELETE SET NULL,
  discovered_from_source_id INTEGER REFERENCES sources(id) ON DELETE SET NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  last_attempt_at TEXT,
  retry_after TEXT,
  resolved_at TEXT,
  UNIQUE(lead_type, normalized_value)
);

CREATE TABLE observations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  encounter_id INTEGER NOT NULL REFERENCES encounters(id) ON DELETE CASCADE,
  observed_at TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  altitude_ft INTEGER,
  groundspeed_kt REAL,
  track_deg REAL,
  vertical_rate_fpm REAL,
  squawk TEXT
, callsign TEXT, type_code TEXT, registration TEXT, entity_id INTEGER REFERENCES entities(id) ON DELETE CASCADE, source_provider TEXT, received_at TEXT, on_ground INTEGER CHECK(on_ground IN (0,1) OR on_ground IS NULL), geometric_altitude_ft REAL, heading_deg REAL);

CREATE TABLE personal_bookmarks (subject TEXT NOT NULL,moment_key TEXT NOT NULL,reference_json TEXT NOT NULL,created_at TEXT NOT NULL,PRIMARY KEY(subject,moment_key));

CREATE TABLE personal_favorites (subject TEXT NOT NULL,kind TEXT NOT NULL,subject_key TEXT NOT NULL,label TEXT,PRIMARY KEY(subject,kind,subject_key));

CREATE TABLE personal_preferences (subject TEXT PRIMARY KEY,snapshot_json TEXT NOT NULL,revision INTEGER NOT NULL DEFAULT 1,accepted_at TEXT NOT NULL);

CREATE TABLE provider_requests (
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

CREATE TABLE provider_state (
  provider TEXT PRIMARY KEY,
  harvest_cursor INTEGER NOT NULL DEFAULT 0,
  local_calls INTEGER NOT NULL DEFAULT 0,
  metered_since TEXT,
  provider_used INTEGER,
  provider_remaining INTEGER,
  quota_units INTEGER,
  reset_at TEXT,
  authority TEXT NOT NULL DEFAULT 'local',
  observed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata_json TEXT
, harvest_epoch TEXT, request_cursor INTEGER NOT NULL DEFAULT 0, request_epoch TEXT);

CREATE TABLE quota_admissions (
  provider TEXT NOT NULL,
  account TEXT NOT NULL,
  period TEXT NOT NULL,
  total_used INTEGER NOT NULL DEFAULT 0 CHECK(total_used >= 0),
  class_used_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(class_used_json)),
  PRIMARY KEY(provider, account, period)
);

CREATE TABLE sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_key TEXT NOT NULL UNIQUE,
  source_name TEXT NOT NULL,
  source_url TEXT,
  source_kind TEXT NOT NULL,
  retrieved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_auth_sessions_subject ON auth_sessions(subject);

CREATE INDEX idx_claims_entity_predicate ON claims(entity_id,predicate);

CREATE INDEX idx_encounters_entity_time ON encounters(entity_id,last_seen_at);

CREATE INDEX idx_identifiers_entity ON identifiers(entity_id);

CREATE INDEX idx_leads_entity_status_type
ON leads(entity_id, status, lead_type);

CREATE INDEX idx_leads_status_retry ON leads(status,retry_after);

CREATE UNIQUE INDEX idx_observations_encounter_observed_at
  ON observations(encounter_id, observed_at);

CREATE INDEX idx_observations_encounter_time ON observations(encounter_id,observed_at);

CREATE UNIQUE INDEX idx_observations_entity_observed_at ON observations(entity_id, observed_at);

CREATE INDEX idx_observations_entity_time ON observations(entity_id, observed_at);

CREATE INDEX idx_observations_time
  ON observations(observed_at);

CREATE INDEX idx_personal_bookmarks_date ON personal_bookmarks(subject,created_at DESC);

CREATE UNIQUE INDEX idx_provider_requests_event ON provider_requests(provider, request_fingerprint);

CREATE INDEX idx_provider_requests_provider_time ON provider_requests(provider, occurred_at);

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

-- Password authentication schema from migrations 0014 and 0015.
-- Password sign-in rate limit; no account credentials are stored in D1.
CREATE TABLE IF NOT EXISTS password_login_limits (
  bucket TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL DEFAULT 0,
  window_started TEXT NOT NULL
);

-- Password credentials are salted PBKDF2 verifiers, never plaintext passwords.
CREATE TABLE IF NOT EXISTS password_accounts (
 username TEXT PRIMARY KEY,
 verifier TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 changed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Additive account administration fields from migration 0016.
ALTER TABLE password_accounts ADD COLUMN role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('admin','user'));
ALTER TABLE password_accounts ADD COLUMN disabled_at TEXT;
ALTER TABLE password_accounts ADD COLUMN must_change_password INTEGER NOT NULL DEFAULT 0 CHECK(must_change_password IN (0,1));
