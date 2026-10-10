-- The dossier query previously scanned all leads via idx_leads_status_retry.
-- This covering prefix allows a direct entity lookup and satisfies its ordering.
CREATE INDEX IF NOT EXISTS idx_leads_entity_status_type
ON leads(entity_id, status, lead_type);
