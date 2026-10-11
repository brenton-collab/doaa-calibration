-- Account data is separate from aviation evidence. No existing records are reassigned.
CREATE TABLE auth_attempts (state_hash TEXT PRIMARY KEY,nonce TEXT NOT NULL,verifier TEXT NOT NULL,expires_at TEXT NOT NULL);
CREATE TABLE auth_sessions (token_hash TEXT PRIMARY KEY,subject TEXT NOT NULL,created_at TEXT NOT NULL,expires_at TEXT NOT NULL);
CREATE INDEX idx_auth_sessions_subject ON auth_sessions(subject);
CREATE TABLE personal_bookmarks (subject TEXT NOT NULL,moment_key TEXT NOT NULL,reference_json TEXT NOT NULL,created_at TEXT NOT NULL,PRIMARY KEY(subject,moment_key));
CREATE INDEX idx_personal_bookmarks_date ON personal_bookmarks(subject,created_at DESC);
CREATE TABLE personal_preferences (subject TEXT PRIMARY KEY,snapshot_json TEXT NOT NULL,revision INTEGER NOT NULL DEFAULT 1,accepted_at TEXT NOT NULL);
CREATE TABLE personal_favorites (subject TEXT NOT NULL,kind TEXT NOT NULL,subject_key TEXT NOT NULL,label TEXT,PRIMARY KEY(subject,kind,subject_key));
