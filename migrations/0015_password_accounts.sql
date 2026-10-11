-- Password credentials are salted PBKDF2 verifiers, never plaintext passwords.
CREATE TABLE IF NOT EXISTS password_accounts (
 username TEXT PRIMARY KEY,
 verifier TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 changed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
