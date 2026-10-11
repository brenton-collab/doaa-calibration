-- Password sign-in rate limit; no account credentials are stored in D1.
CREATE TABLE IF NOT EXISTS password_login_limits (
  bucket TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL DEFAULT 0,
  window_started TEXT NOT NULL
);
