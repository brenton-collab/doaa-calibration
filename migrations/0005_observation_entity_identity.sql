ALTER TABLE observations ADD COLUMN entity_id INTEGER REFERENCES entities(id) ON DELETE CASCADE;
UPDATE observations SET entity_id=(SELECT entity_id FROM encounters WHERE encounters.id=observations.encounter_id) WHERE entity_id IS NULL;
DELETE FROM observations
WHERE entity_id IS NOT NULL AND id NOT IN (
  SELECT MIN(id) FROM observations WHERE entity_id IS NOT NULL GROUP BY entity_id, observed_at
);
DELETE FROM encounters
WHERE observation_count=0 AND NOT EXISTS (SELECT 1 FROM observations WHERE observations.encounter_id=encounters.id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_observations_entity_observed_at ON observations(entity_id, observed_at);
CREATE INDEX IF NOT EXISTS idx_observations_entity_time ON observations(entity_id, observed_at);
