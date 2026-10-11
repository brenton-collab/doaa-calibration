-- Additive. Unknown historical source/receipt/ground values remain NULL.
ALTER TABLE observations ADD COLUMN source_provider TEXT;
ALTER TABLE observations ADD COLUMN received_at TEXT;
ALTER TABLE observations ADD COLUMN on_ground INTEGER CHECK(on_ground IN (0,1) OR on_ground IS NULL);
ALTER TABLE observations ADD COLUMN geometric_altitude_ft REAL;
ALTER TABLE observations ADD COLUMN heading_deg REAL;
