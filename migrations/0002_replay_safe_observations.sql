-- Foundation pass: make observation writes idempotent and preserve per-sample identity
-- needed for multi-client safety and future Replay/AS_OF rendering.
--
-- Existing duplicate samples can occur when more than one acquisition cell writes the
-- same upstream snapshot. Keep the earliest row for each encounter/timestamp before
-- enforcing uniqueness.

DELETE FROM observations
WHERE id NOT IN (
  SELECT MIN(id)
  FROM observations
  GROUP BY encounter_id, observed_at
);

ALTER TABLE observations ADD COLUMN callsign TEXT;
ALTER TABLE observations ADD COLUMN type_code TEXT;
ALTER TABLE observations ADD COLUMN registration TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_observations_encounter_observed_at
  ON observations(encounter_id, observed_at);

CREATE INDEX IF NOT EXISTS idx_observations_time
  ON observations(observed_at);
