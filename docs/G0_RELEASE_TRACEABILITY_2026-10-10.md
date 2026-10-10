# DOAA G0 release traceability and dependency audit
Date: 2026-10-10. Status: SOURCE AND CONFIGURATION AUDIT, NOT LIVE UX ACCEPTANCE.
Baseline: GitHub main at 5d935ee6 when inspected; Cloudflare latest observed deployment 2026-10-10 17:27:52 UTC, version 2f2df960-3956-437e-818c-912079f1aa29. Production Worker and fetched frontend source are not yet proven to be the same immutable build.

## Evidence inspected
GitHub recursive tree, index.html, src/worker.js, doaa-memory.js, wrangler.jsonc, deployment and syntax workflows, BOARD and schedule tests, source/quota and D1 pressure reports, DOAA_SPEC.md, decision record 1–184, DEV_LOG.md; read-only Cloudflare D1 inventory, deployment list and cron schedules. Render workspace not selected, so its deployment state was not inspected. No production write, schema change, provider polling or billable workflow was initiated.

## Traceability by integrated release journey
| Requirement | Evidence in source | Verified state | Release dependency |
|---|---|---|---|
| SKY interactive aviation map | index.html drawing, acquisition and SKY view | Code present, UX not verified | Provider freshness, catchment, heading/half-arrow semantics, accessible navigation |
| BOARD airborne home-airport movement | index.html BOARD and Worker /api/board, board-core and tests | Code/tests present; source truth limited | ARR/DEP classification, coverage and inference labels, independent airport acquisition |
| LOOK attention | Decision 178 and specification; no dedicated LOOK view confirmed in index.html | Not established | Explainable aviation significance grounded in shared observations |
| Aircraft/Flight Inspector | index.html details, flight-enrichment.js, Worker investigation | Code present, completeness unverified | Identity, photo specificity, datum grammar, navigation |
| Airport Inspector | index.html airport detail, Worker /api/airport | Code present, completeness unverified | Overview/Operations/Movements/Airfield tabs and links |
| Observation memory | doaa-memory.js, D1 migrations, scheduled Worker | Code and configured D1 present; consumption/coverage unverified | Deduplication, encounters, source timestamps, recovery and D1 quotas |
| AMBIENT SKY | Decisions 180–181, 184; no ambient frontend references | Not implemented in inspected frontend | Shared SKY truth, idle/explicit entry, screen longevity |
| AMBIENT SLIDES | Decisions 182–184 and user refinements; no slides frontend references | Not implemented in inspected frontend | Existing licensed media and actual flight/airframe data, event pacing |
| OPS/PATTERNS/advanced Replay | Specified future work | Outside next release gate | Do not block or falsely advertise as finished |

## High-risk cross-feature findings
1. Worker frontend() and raw() retrieve current index.html and flight-enrichment.js from GitHub main using cache-busting query strings. Thus a new main-branch frontend change can reach production without a corresponding immutable Worker deployment. The production build/version endpoint does not by itself prove which HTML and JS bytes users receive. Before UI changes, establish a safe asset version/pinning and rollback strategy that respects limited Actions and avoids surprise releases.
2. wrangler.jsonc schedules a five-minute cron; Cloudflare confirmed it is configured. Verify actual scheduled handler and D1 impact, not just trigger presence.
3. Published YOW ARR/DEP schedule source is explicitly unresolved in docs/DATA_SOURCES_AND_QUOTAS.md. The current BOARD cannot silently claim published-timetable completeness. Observed/inferred movements need conspicuous epistemic labels and no-data vs no-traffic distinction.
4. Wikimedia media lookup exists in Worker investigation. SLIDES must reuse verified resolved media, not trigger a new external search per slide.
5. Fixed observation-centre coordinate appears in Worker source; privacy and operational purpose require review without spreading the coordinate into further records.
6. Source-level tests exist for BOARD, schedule normalization, quota admission, observation write efficiency, D1 indexes and other helpers, but automated execution was not performed in this connector-only audit.
7. Existing D1 pressure report explicitly warns that row counts are not usage metrics. Production database exists; aggregate consumption after recent optimizations is not measured by this audit.
8. Render connector requires explicit workspace selection. No workspace was selected and no Render operations were performed.

## Release implementation order
G0a: identify current deployed Worker code, served HTML/JS and Render relay version; validate non-mutating health endpoints; obtain safe quota metrics. Identify an immutable UI release/rollback boundary before frontend edits.
G0b: run local/offline tests against actual repository checkout, capture failure fixtures, map all decision groups to surfaces/contracts; classify privacy/history exposure.
G1: reconcile provider and memory truth, BOARD classifications, identity, D1 pressure and degraded states.
G2: unify visual tokens, responsive shells, Inspector navigation and source/freshness grammar across views.
G3: finish and validate SKY, BOARD, LOOK, Inspectors and observation-memory end-to-end journeys.
G4: integrate AMBIENT SKY and SLIDES with existing data and cached media; validate event pacing and old-tablet behaviour.
G5: verify deployed bytes, realistic user flows, cost/usage and rollback; document release acceptance.

## Change safety
No application changes until the main-to-production frontend coupling is addressed or explicitly contained by a verified release strategy. No additional provider acquisition or migrations until quota and source contracts are checked. No release-complete claim until deployed UI, backend and devices are actually exercised. Update DEV_LOG.md with each gate and test evidence.
