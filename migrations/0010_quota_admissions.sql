-- Durable, shared, monthly quota ledger. No provider requests are initiated.
CREATE TABLE IF NOT EXISTS quota_admissions (
  provider TEXT NOT NULL,
  account TEXT NOT NULL,
  period TEXT NOT NULL,
  total_used INTEGER NOT NULL DEFAULT 0 CHECK(total_used >= 0),
  class_used_json TEXT NOT NULL DEFAULT '{}' CHECK(json_valid(class_used_json)),
  PRIMARY KEY(provider, account, period)
);
