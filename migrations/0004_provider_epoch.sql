-- Relay harvest cursors are scoped to a relay process epoch.
ALTER TABLE provider_state ADD COLUMN harvest_epoch TEXT;
