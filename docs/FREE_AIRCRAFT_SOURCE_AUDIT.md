# Free aircraft identity replacement audit (2026-10-10)

Status: **comparison methodology tested; production match rates not yet measured**.

## Production baseline (read-only)
- 8,530 claims; 5,051 have AirLabs evidence; 4,660 ADS-B observations.
- AirLabs-supported: registration 704; ICAO type 712; manufacturer 356; model 356; operator 464; operator code 706; callsign 756; ICAO24 734; engines/count 150; build year/serial 113.
- Only **2** AirLabs-supported claims have additional non-AirLabs evidence in the D1 evidence ledger. This is a *provenance overlap* measurement, **not** a free-source recoverability percentage.
- 78 route claims have non-AirLabs evidence; no AirLabs-supported route claims in the audited evidence table.

## Test method
Compare aircraft by six-digit ICAO hex against Mictronics-derived tar1090-db `aircraft.csv.gz` (semicolon-separated columns begin hex, registration, ICAO type). Evaluate **match**, **conflict**, **missing reference field**, **no aircraft**, and **ambiguous reference** separately. Reject malformed hexes and empty claims rather than scoring them as conflicts. Report coverage and exact-match percentages with denominators. Investigate conflicts before modifying D1; hexes may be reassigned.

The offline audit comparator and tests are distributed as a conversation artifact (`doaa-free-source-audit.zip`); three deterministic tests passed on 2026-10-10. The comparator is **not yet integrated with production**.

## Source and rights
- https://github.com/Mictronics/aircraft-database
- https://github.com/wiedehopf/tar1090-db (CSV branch)
- Verify source license and attribution before importing or redistributing; do not silently merge provider-derived facts.

## Blockers and next action
Production D1 aggregates were accessible, but aircraft-level export attempts were blocked by connector safety checks. The local runtime cannot resolve external network DNS, so no current reference download was possible. **Do not invent a recovery percentage.** Next: obtain an authorized read-only aircraft sample and current reference dataset, run the comparison, review mismatches, and only then design a sourced local importer. No AirLabs calls or production writes are needed for this gate.

See `docs/DATA_SOURCES_AND_QUOTAS.md` for mandatory metered-request admission and provider circuit policy.

## Follow-up: successful bounded D1 aircraft extraction
A simple read-only query of `entities` joined to `claims`, selecting only `canonical_key,predicate,value_text` with `LIMIT 40`, **succeeded** after earlier more complex queries were intermittently blocked. Aircraft examples: `C06DE5` → `C-GPQA` / `DH8D`; `C00E9D` → `C-FFNW` / `B38M`. This removes the claimed hard D1 access blocker.

A real conflict was found: `C06183` / `C-GKYC` has two stored `icao_type` claims, `DH8D` and `E295`. Do not resolve by arbitrary row order. Check each claim's evidence timestamps and source before selecting current identity. Some stored registration strings (e.g. `CA-GZQR`) also merit validation.

**Reference blocker remains:** the execution container cannot resolve external DNS. GitHub's UTF-8 file fetch returned zero content for tar1090-db's binary `aircraft.csv.gz`, even when requesting base64; a content SHA was returned but no usable bytes. No real Mictronics cross-source match percentage has been measured. Next: retrieve the binary reference via an appropriate download-capable channel, then compare the extracted sample. Never claim D1 itself is inaccessible.
