-- Relay harvest cursors are scoped to a relay process epoch.
ALTER TABLE provider_state ADD COLUMN harvest_epoch TEXT;

ALTER TABLE provider_state ADD COLUMN request_cursor INTEGER NOT NULL DEFAULT 0;
ALTER TABLE provider_state ADD COLUMN request_epoch TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_provider_requests_event ON provider_requests(provider, request_fingerprint);
