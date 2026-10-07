ALTER TABLE observations ADD COLUMN entity_id INTEGER REFERENCES entities(id) ON DELETE CASCADE;
UPDATE observations SET entity_id=(SELECT entity_id FROM encounters WHERE encounters.id=observations.encounter_id) WHERE entity_id IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_observations_entity_observed_at ON observations(entity_id, observed_at);
CREATE INDEX IF NOT EXISTS idx_observations_entity_time ON observations(entity_id, observed_at);
