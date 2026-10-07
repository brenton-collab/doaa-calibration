-- Relay harvest cursors are scoped to a relay process epoch.
ALTER TABLE provider_state ADD COLUMN harvest_epoch TEXT;

ALTER TABLE provider_state ADD COLUMN request_cursor INTEGER NOT NULL DEFAULT 0;
ALTER TABLE provider_state ADD COLUMN request_epoch TEXT;
