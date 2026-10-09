-- Cover the high-volume dossier lookup by entity without scanning all leads.
CREATE INDEX IF NOT EXISTS idx_leads_entity_status_type
ON leads(entity_id, status, lead_type);

-- Prioritize the scheduled pending/retry lead lookup; the existing
-- (status,retry_after) index remains for status-specific access.
CREATE INDEX IF NOT EXISTS idx_leads_type_attempts
ON leads(lead_type, attempts);
