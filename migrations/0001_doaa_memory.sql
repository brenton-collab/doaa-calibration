PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS entities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  canonical_key TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(kind, canonical_key)
);

CREATE TABLE IF NOT EXISTS identifiers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_id INTEGER NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  scheme TEXT NOT NULL,
  value TEXT NOT NULL,
  normalized_value TEXT NOT NULL,
  first_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(scheme, normalized_value)
);
CREATE INDEX IF NOT EXISTS idx_identifiers_entity ON identifiers(entity_id);

CREATE TABLE IF NOT EXISTS sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_key TEXT NOT NULL UNIQUE,
  source_name TEXT NOT NULL,
  source_url TEXT,
  source_kind TEXT NOT NULL,
  retrieved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS claims (
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
CREATE INDEX IF NOT EXISTS idx_claims_entity_predicate ON claims(entity_id,predicate);

CREATE TABLE IF NOT EXISTS evidence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  claim_id INTEGER NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  source_id INTEGER NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  evidence_locator TEXT,
  evidence_excerpt TEXT,
  observed_at TEXT,
  retrieved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(claim_id, source_id, evidence_locator)
);

CREATE TABLE IF NOT EXISTS leads (
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
CREATE INDEX IF NOT EXISTS idx_leads_status_retry ON leads(status,retry_after);

CREATE TABLE IF NOT EXISTS encounters (
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
CREATE INDEX IF NOT EXISTS idx_encounters_entity_time ON encounters(entity_id,last_seen_at);

CREATE TABLE IF NOT EXISTS observations (
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
);
CREATE INDEX IF NOT EXISTS idx_observations_encounter_time ON observations(encounter_id,observed_at);
