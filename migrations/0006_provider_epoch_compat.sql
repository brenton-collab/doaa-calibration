-- Forward-compatibility repair for deployments that may have applied an earlier revision of 0004.
-- SQLite/D1 lacks portable ADD COLUMN IF NOT EXISTS, so this migration intentionally
-- does not repeat the columns. Live schema inspection is required before deployment;
-- if any 0004 columns are absent, create the exact repair migration from observed state.
-- Required provider_state columns after 0004: harvest_epoch, request_cursor, request_epoch.
-- Required provider_requests index after 0004: idx_provider_requests_event(provider, request_fingerprint).
SELECT 1;
