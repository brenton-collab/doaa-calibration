-- Additive multi-user account controls. Existing password subjects and personal data are unchanged.
ALTER TABLE password_accounts ADD COLUMN role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('admin','user'));
ALTER TABLE password_accounts ADD COLUMN disabled_at TEXT;
ALTER TABLE password_accounts ADD COLUMN must_change_password INTEGER NOT NULL DEFAULT 0 CHECK(must_change_password IN (0,1));
