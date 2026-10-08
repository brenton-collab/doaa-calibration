-- QA repair: remove viewport-only observations outside the Ottawa observation area
-- and collapse fragmented same-airframe samples into 15-minute encounter chains.
-- 80 NM is the server-authoritative maximum YOW observation envelope; panning farther
-- remains valid Sky exploration but must not create DOAA Encounters.

DELETE FROM observations
WHERE entity_id IS NOT NULL
  AND (
    ((latitude - 45.3225) * (latitude - 45.3225))
    + (((longitude + 75.6692) * 0.704) * ((longitude + 75.6692) * 0.704))
  ) > ((80.0 / 60.0) * (80.0 / 60.0));

DROP TABLE IF EXISTS _doaa_encounter_groups;
CREATE TEMP TABLE _doaa_encounter_groups AS
WITH ordered AS (
  SELECT
    id,
    entity_id,
    encounter_id,
    observed_at,
    CASE
      WHEN LAG(julianday(observed_at)) OVER (
        PARTITION BY entity_id ORDER BY julianday(observed_at), id
      ) IS NULL THEN 1
      WHEN (julianday(observed_at) - LAG(julianday(observed_at)) OVER (
        PARTITION BY entity_id ORDER BY julianday(observed_at), id
      )) * 1440.0 > 15.0 THEN 1
      ELSE 0
    END AS starts_group
  FROM observations
  WHERE entity_id IS NOT NULL
),
grouped AS (
  SELECT
    id,
    entity_id,
    encounter_id,
    observed_at,
    SUM(starts_group) OVER (
      PARTITION BY entity_id ORDER BY julianday(observed_at), id
      ROWS UNBOUNDED PRECEDING
    ) AS encounter_group
  FROM ordered
)
SELECT
  id AS observation_id,
  MIN(encounter_id) OVER (PARTITION BY entity_id, encounter_group) AS canonical_encounter_id
FROM grouped;

UPDATE observations
SET encounter_id = (
  SELECT canonical_encounter_id
  FROM _doaa_encounter_groups g
  WHERE g.observation_id = observations.id
)
WHERE id IN (SELECT observation_id FROM _doaa_encounter_groups);

DELETE FROM encounters
WHERE NOT EXISTS (
  SELECT 1 FROM observations WHERE observations.encounter_id = encounters.id
);

UPDATE encounters
SET
  observation_count = (
    SELECT COUNT(*) FROM observations WHERE observations.encounter_id = encounters.id
  ),
  first_seen_at = (
    SELECT MIN(observed_at) FROM observations WHERE observations.encounter_id = encounters.id
  ),
  last_seen_at = (
    SELECT MAX(observed_at) FROM observations WHERE observations.encounter_id = encounters.id
  ),
  min_altitude_ft = (
    SELECT MIN(altitude_ft) FROM observations WHERE observations.encounter_id = encounters.id
  ),
  max_altitude_ft = (
    SELECT MAX(altitude_ft) FROM observations WHERE observations.encounter_id = encounters.id
  ),
  callsign = COALESCE((
    SELECT callsign FROM observations
    WHERE observations.encounter_id = encounters.id AND callsign IS NOT NULL AND callsign <> ''
    ORDER BY julianday(observed_at) DESC, id DESC LIMIT 1
  ), callsign),
  type_code = COALESCE((
    SELECT type_code FROM observations
    WHERE observations.encounter_id = encounters.id AND type_code IS NOT NULL AND type_code <> ''
    ORDER BY julianday(observed_at) DESC, id DESC LIMIT 1
  ), type_code);

DROP TABLE _doaa_encounter_groups;
