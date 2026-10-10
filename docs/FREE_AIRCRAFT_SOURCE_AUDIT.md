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

## Inspector implementation gate (2026-10-10)
Worker source commits `631b4a8`, `31e66e3`, `44f66dc` implement a memory-first Inspector:
- Read D1 dossier and history before any external identity request.
- Consult free ADSBdb aircraft identity only if registration, type, manufacturer or model is missing, or the requested callsign lacks a fresh route.
- Use cached route evidence first, then free route resolvers; retain fallback callsign inference as inference rather than a published schedule.
- **No `relay('/flight')` or `relay('/airframe')` in `dossierApi`**; premium remains disabled, not merely guarded by an unreliable process-local quota.
- Persist ADSBdb aircraft, ADSBdb route and ADS-B observations under distinct evidence sources; treat registered owner separately from operator.
- Expose `identity_conflicts` in dossier JSON and reject malformed hex inputs.

Verification: Worker source parsed successfully as JavaScript, and a static inspection confirmed there are no `relay()` calls within `dossierApi`. **Not deployed, not exercised against a live Worker/D1, and not a complete local Mictronics importer.** Other API routes may still invoke the relay and require independent quota hardening. The original AirLabs-supported claims remain intact.

Next: run behavioral tests with a mocked D1 and fetch, inspect the Inspector UI's consumption of `identity_conflicts`, then deploy only after checking the target Cloudflare environment and authorization. The unresolved reference-database coverage measurement is a separate validation task.

## Inspector hardening follow-up
Commit `e210664` removes dead AirLabs ingestion branches from Inspector and avoids writing browser-provided live values as verified observations. Conflicting registration/type claims now yield `null` for the corresponding resolved identity field, with candidate values in `identity_conflicts`, rather than arbitrarily choosing one. Seven source-level checks passed (syntax, absence of metered relay within Inspector, ICAO validation, explicit conflicts, ambiguity handling, ADSBdb attribution, no fabricated observation batch). These are **static checks, not full behavioral integration tests**.

**Release gate still open:** verify runtime behavior against mocked D1 and free API responses; inspect remaining `/api/flight` and other routes for automatic metered calls; inspect frontend display for null/conflicted identity; verify Cloudflare deployment configuration before release. The Worker source has not been deployed.

## Premium-call surface audit (2026-10-10)
Source inspection found that `/api/flight` and `/api/board` still attempted automatic premium relay calls. Commits `a42c542` and `b0db5e2` replace those paths with free route resolution and observed-movement BOARD behavior, respectively. BOARD explicitly reports `coverage: observed`, `movement_verified: false` and a published-schedule-unavailable reason. The relay traffic path is preserved for ADS-B.

A syntax failure in the first BOARD rewrite was corrected immediately; the subsequent Worker source parsed successfully. Static inspection shows the remaining relay calls are ADS-B traffic and administrative provider-event/harvest functions; none are direct flight/airframe/board premium acquisition. **This does not prove the Render relay cannot spend quota autonomously**; relay service configuration and its own code still require verification.

Attempted in-process behavioral execution with a mocked D1 failed because the available code-execution isolate lacks a `URL` global. This is a test-environment limitation, not a passing integration test. Deployment remains withheld pending real runtime tests and relay inspection.
