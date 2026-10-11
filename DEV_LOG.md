## 2026-10-11 — D1 quota guard and sign-in clarification

- Google sign-in code is already implemented and locally tested; Preview lacks OAuth configuration and the two approved stable account identifiers. No new Google accounts are required. User accepts database-backed username/password sign-in if Google setup proves too complicated; fallback is not yet implemented.
- Airport import preparation now defaults to the five built-in airports, rather than worldwide coverage. The verified source yields five airport rows, twelve runway records and seven SQL statements. Explicit custom/worldwide preparation stays local only; plans require remote quota review and distinguish coverage in their snapshot identity. Index writes must be counted when reviewing D1 budget; SQL statement counts are not billed write counts.
- Verification: 130 Node tests pass, including scoped preparation and incomplete-snapshot readiness against SQLite. Preview isolation, asset packaging and diff checks pass. Frontend source is unchanged, so the previous four-viewport browser acceptance remains applicable.
- This session’s one remote D1 schema query reported 90 rows read and zero written. No remote migration/import or deployment was performed. The earlier 41,214-airport verification was local SQLite only. Runway selection, unit changes and tab returns reuse loaded reference data.

## 2026-10-11 — sourced runway reference workspace

- Published the prior Airport weather/navigation batch as `646118d`; the connected commit's tree exactly matched local `ffabe59`. Draft PR #48 now describes the full implemented scope and remaining release gates.
- Added geographically sourced runway diagram, physical-strip and reciprocal-end selection, dimensions/surface/lighting-reference flags, end-specific true heading/elevation/displaced threshold and shared units. Selection survives units and tab changes; unknown approaches, declared distances, historical changes, runway activity and current operational status remain explicit. North-up geometry uses published endpoints, including antimeridian handling; labels avoid the observed 04/14 overlap. Variable wind does not get an invented direction.
- Added additive `0013` reference-only schema and local preparation script. Runtime reads a small D1 record rather than fetching/scanning the worldwide dataset. Partial imports never replace a ready source; missing schema/snapshot stays unavailable, and a missing airport in the latest complete snapshot does not resurrect older data. No personal or DOAA observation records are modified.
- Actual public-domain OurAirports source was downloaded and normalized; **41,214 airport records / 48,336 runway records** were imported and verified in local SQLite, with immutable checksum and complete-snapshot readiness. This was local only: no remote migration/import or deployment. Contract/runbook: `docs/AIRFIELD_REFERENCE_CONTRACT.md`.
- **129 Node tests pass; all four final Chromium fixture workflows pass**, adding sourced runway/end selection, persistent selection through units/tabs and failed reference-refresh recovery. Exact frontend hashes: `docs/qa/airfield-reference-acceptance.json`. All four runway screenshots inspected. Preview isolation, allowlisted packaging, self-contained eight-module package and diff checks pass. Captured reference fixtures do not prove actual private Preview/provider/physical-device acceptance.
- Full 184-decision contract remains unfinished. Actual isolated schema/import, Google enrollment, authenticated Preview and remaining product/data content remain gates. Production/main remain unchanged; no paid provider activation or Actions run.

## 2026-10-11 — connected Airport Inspector and weather

- Published the prior verified units/catchments/account/bookmark snapshot as `d346bd2` on the approved branch through connected GitHub. Its tree exactly matches both original local commits. User permission resolved the public-repository disclosure hold; shell push had no credentials. Main, Production and repository visibility are unchanged.
- Map airport markers and relationship links now enter one shared four-tab Airport Inspector. Added sourced METAR decoding, UTC observation/retrieval times, freshness, zero/variable/calm wind, gusts, lower-bound visibility, cloud ceiling, temperature/dew point, altimeter and source category. Raw METAR remains unchanged. Successful no-data, failure/retry, wrong-station and late-response states stay distinct.
- Airport Movements now renders the same BOARD airport evidence and opens individual Flight with Back context. Reported route association and track inference remain explicit; neither is labelled a completed arrival/departure. State/Condition and absent runway geometry retain honest unavailable states.
- **121 Node tests passed; all four final Chromium fixture viewport workflows passed**, including actual airport map-marker selection, METAR/source/raw/explanations, stale/failure/retry, canonical movements/Flight/Back and late response isolation, plus all earlier account/bookmark/catchment/playback/comparison regression flows. Exact source hashes: `docs/qa/airport-inspector-acceptance.json`. Desktop/phone/landscape/tablet screenshots inspected. Asset packaging, Preview isolation and diff checks passed.
- Source contract: `docs/AIRPORT_WEATHER_CONTRACT.md`, verified against the primary AWC API/OpenAPI. Matrix retains all 184 rows and explicit partial scope. Full product is unfinished; live-provider, physical-device and signed-in Preview acceptance are unverified. No paid provider, remote migration, Preview/Production deployment or Actions run in this batch.

## 2026-10-11 — saved moments and publication hold

- Added `bookmarks.js` and connected replay/account UI: actual observation-ID save, original moment/provenance and exact-encounter timestamp restore, current-Airframe route, chronological/grouped cards, direct removal and truthful network failure recovery. No new aviation evidence, provider cost or remote schema changes.
- **114 Node tests pass; all four final Chromium fixture workflows pass**, including two distinct moments, exact saved-time replay, current profile, grouping, failed save/removal and retry, plus prior units/catchment/account/Inspector/playback regressions. Hash report: `docs/qa/saved-moments-acceptance.json`; desktop/phone gallery screenshots inspected. Packaging, isolation and diff checks passed. Matrix rows 95–102/107 retain explicit remaining identity-revision/media/live-Contact/actual-account gates.
- Second batch local commit `246ed0e` is not pushed. Auto-review rejected its push for unverified public disclosure. Connected GitHub confirms correct repository ID/origin/branch/draft PR #48 but reports repository **public**, contradicting the mandate's private description. Publication held pending explicit owner authorization; no alternate upload/ref-update bypass. No production/main/Preview deployment or D1 migration.
- Next: obtain publication authorization for the verified commits, then push only the work branch and continue complete Inspector/Airfield/BOARD evidence and remaining scope. Full release and authenticated Preview remain incomplete.

## 2026-10-11 — recovered continuation: units/catchments/Inspector/account preferences

- Branch `work/product-recovery-mobile-sky`, draft PR #48; continuation from `f0ad996`. Recovered the usage-limit interruption without discarding local changes.
- Added shared units, saved-Home/active-exploration separation, semantic Inspector datum controls and contextual Back, account-scoped preference UI/bootstrap/retry/snapshot synchronization. Updated Worker/build allowlists and local fixtures; no new provider or remote migration.
- Executed **114 Node tests passed**, isolation/build/check-diff passed. **Four final responsive Chromium fixture workflows passed** (desktop/phone/short landscape/tablet); report/source hashes in `docs/qa/units-catchment-account-acceptance.json`. Inspected track screenshots at all four sizes. Browser testing found and repaired chart unit-label mismatch, settings dismissal on radius change, Return Home visibility, Inspector/header overlap, account-button pointer handling, and native browser timer receiver binding. Reload acceptance now waits for authenticated preference bootstrap.
- Full 184-row JSON/Markdown matrix preserved with qualified evidence. Production/main and Preview deployment are unchanged in this continuation; authenticated Preview remains blocked by Google configuration. Basemap external-provider acceptance and remaining product content remain open. This is a verified implementation batch, not a finished product.
- Next: saved-moment/bookmark UI, then connected Inspector/airport/BOARD evidence and remaining locked requirements. See `docs/RELEASE_RC_CHECKPOINT.md` for current execution state. The earlier interrupted checkpoint is retained as history and is superseded by this entry after this batch is committed.

## 2026-10-11 — observed replay, comparison and private release boundary

- Implemented encounter-restricted observed Track History, actual geographic projection/grid, altitude/groundspeed charts and one absolute-time scrubber. Real interval playback, Play/Pause, five speeds, gap handling, stop-at-end and opt-in Loop; literal observed changes navigate to their exact sample. No historical position interpolation or invented operation.
- Added deliberate recorded two-aircraft selector, overlap/proximity ranking/search, union clock and coverage, explicit camera Follow/overview. Either track can be replaced/removed while preserving the other. Cancelled obsolete Inspector enrichment and context requests/playback.
- Added observation provenance migration 0011 and source position-time/receipt separation. Added private Google OIDC/PKCE/state/nonce/verified-RSA gate for all app assets and HTTP aviation APIs; account-owned bookmark/preferences/favourite API and additive migration 0012. Actual Google client and David/Brent subject enrollment remain unavailable. Session renewal/provider revocation and account product UI remain outstanding; this is not a completed sign-in experience.
- **Executed: 107 Node tests passed, 0 failed**, including real SQLite track ownership/pagination, account isolation and cryptographic verification. **Four actual Chromium responsive fixture workflows passed**: desktop 1440×900, phone 393×851, short landscape 851×393, tablet 820×1180. Exercised scrubbing/map+chart cursor, unknown support, literal event navigation, deliberate Compare, union bounds, playback/pause, replacement/removal of either track, close/context return, outage/retry. Durable report with tested source hashes: `docs/qa/track-history-acceptance.json`.
- Geographic external tiles were unavailable in this environment; the UI exposes a labelled coordinate-grid fallback. No live provider or physical Android acceptance claim. Single-track layouts now respond to the actual narrow Inspector width so chart typography remains readable.
- Replaced legacy Preview config with own-D1/no-Production-service/no-cron configuration. Added reproducible allowlisted multipart package, isolation guard, and CREATE-only fresh Preview schema. Historical destructive repair migrations are not run remotely. Actual Preview deployment/binding verification follows this commit.
- Updated all 184 dispositions: 127 partial, 56 missing, 1 blocked; none falsely certified complete. Full scope remains mandatory. See `docs/RELEASE_RC_CHECKPOINT.md` for implementation evidence, precise limitations, secure configuration, release and rollback procedure.
- Committed on the work branch only; not merged or deployed to Production. No Actions runs or paid provider/service activation. Next execution: isolated Preview deploy/verify, then shared units/Home/Explore/Inspector and rolling observed trails.

## 2026-10-11 — full product execution audit (PR #48)

- Branch `work/product-recovery-mobile-sky`, baseline `3e6aa0ff98aaf02ac570c19a63625673bf4ad42a`; only this branch is writable. Production and main remain unchanged.
- Read canonical Field Notes, SPEC, log, release safety plan, workflows and actual source. Added the full 184-entry matrix (JSON plus complete Markdown contract); retained six unnumbered BOARD refinements and recorded explicit numbering/supersession ambiguities.
- Executed `node --test tests/*.test.cjs tests/*.test.mjs src/*.test.mjs airlabs-budget.test.cjs`: **85 passed, 0 failed**. These baseline tests include source contracts/mocks, not real browser acceptance.
- Connected Cloudflare GET confirms Production DB `434f90d3-397b-48d3-8249-4c48cf1e8936`; deployed Preview only binds `PRODUCTION_API`, not a D1. Separate Preview DB `939eda3b-4894-497b-9f67-209771761b3f` exists. Configuration's claimed Preview isolation does not hold in deployed runtime. No migrations or infrastructure writes yet.
- Verified gaps: Track History is a placeholder; Home and Explore are conflated; no approved Google authentication/account gate, private moment bookmark model or account preferences; MET/NAV/universal units incomplete. Current release is **not ready**.
- Next executable work: implement safe observed-track read API + synchronized map/charts/interval playback and deliberate two-track comparison; repair obsolete async Inspector updates; configure genuine isolated Preview and verify migration chain there.

## Airport movement lifecycle verification

- [x] Added request sequencing and a distinct loading label.
- [x] Executed five isolated asynchronous checks: success, network failure, tab switch, airport switch, and out-of-order responses. All five passed; module parses.
- [ ] Live endpoint and actual browser/device interactions remain unverified. Node regression suite outstanding.
- Production unchanged; no paid CI.

## Airport evidence integration checkpoint

- [x] Airport sections retain the looked-up airport identity; Overview retains known coordinates.
- [x] Airport Movements calls the existing free observed `/api/board` endpoint with airport coordinates, showing source and evidence counts without claiming verified movements.
- [x] Isolated successful-response exercise passed; complete JavaScript parsed.
- [ ] Live network response, DOM lifecycle, mobile acceptance and full suite remain unverified. Operations and Airfield remain coverage-limited.
- No production change or paid CI.

## Airport lookup and navigation checkpoint

- [x] Successful and unresolved Airport lookups retain Airport context and wire the Inspector tray.
- [x] Airport Overview renders retained airport identity when returning from other tabs.
- [x] Four Airport section dispatches executed successfully with a representative CYOW/YOW record; full JavaScript parses.
- [ ] Real DOM click-through, operational data integration, Node suite, and mobile acceptance remain pending.
- Production unchanged; no paid CI.

## Airport Inspector checkpoint

- [x] Airport four-tab navigation committed and executed in isolated JavaScript checks.
- [x] Specialist sections expose unavailable-data states rather than invented activity.
- [x] Unresolved airport lookup resets object context; complete source parses.
- [ ] Successful airport lookup context, tab event wiring, real operational data, and browser acceptance remain outstanding.
- Production unchanged.

## Inspector related-object navigation fix

- [x] Corrected active Flight context for resolved and unresolved related-flight drilldowns.
- [x] Corrected active Airframe context for related-airframe drilldowns.
- [x] Checked three affected branches in current source and parsed the complete JavaScript module successfully.
- [ ] Browser click-through and airport contextual tabs remain unverified/unimplemented.
- Production unchanged; no CI spending.

## 2026-10-11 — Inspector rendering exercise

- [x] Executed 12 isolated Inspector render-dispatch cases against branch source with representative and missing flight/airframe fields: all 12 returned without errors.
- [ ] Browser DOM, navigation events, live network and visual acceptance remain unverified.
- [ ] Complete feature content and Node suite still pending; production unchanged.

## 2026-10-11 — Inspector execution checkpoint

- [x] Executed nine isolated JavaScript checks against the current branch source: nine passed. Checks covered syntax, contextual navigation, render routing, Journey provenance, and telemetry freshness gates.
- [ ] The committed Node tests, browser interactions, and device acceptance remain unexecuted.
- [ ] Release remains gated; production unchanged. No paid CI used.

## Inspector checkpoint — 2026-10-11

- [x] Fifth Inspector regression test committed (`fe295db`).
- [x] Progress provenance clarification committed (`40cab89`).
- [ ] Run Node tests: local runtime lacks checkout and GitHub DNS access.
- [ ] Browser acceptance, complete Inspector functionality, preview and release gates.
- No production deployment or paid CI.

## 2026-10-11 — Inspector regression checklist (PR #48)

- [x] Added `tests/inspector-contexts.test.cjs` (commit e8dbce4): four Node tests for locked object tab sets, render routing, observed-vs-unknown progress/timing, and shared evidence-qualified Journey.
- [x] Connector-side static inspection confirms all six new render branches exist, two shared Journey calls, and correct contextual tab declarations.
- [ ] **Execute** `node --test tests/inspector-contexts.test.cjs` and the existing regression suite in a runnable repository checkout. No claim that these tests passed: repository source was inspected through GitHub, not executed by Node.
- [ ] Browser/device acceptance and non-production deployment remain pending. Production unchanged; no paid CI, migration, or provider call.
- Next: obtain a runnable repository artifact without billable CI, run tests, fix failures, and continue full Inspector content.

## 2026-10-11 — Inspector implementation checklist (PR #48; not released)

- [x] Read DEV_LOG.md, DOAA_SPEC.md, and all Field Notes decisions. Decision 176 supersedes the earlier Flight two-tab lock; Decision 177 governs Airport. Decision 179/180 defines release scope.
- [x] Commit contextual Flight tabs Overview / Timing / Progress / Journey and Contact tabs Overview / Journey / Track History; Airframe tabs Overview / BIO / Operations / Media / Sightings in flight-enrichment.js.
- [x] Add separate Flight Timing scheduled/estimated/actual fields and observation-qualified Progress; reuse existing Journey chronology on Flight and Contact.
- [x] Make unavailable Track History synchronized replay and Airframe cross-source Operations explicit rather than inventing data.
- [ ] Build full Track History map/charts, cross-source Operations, Airport tabs, and Flight route progress/map to locked specification.
- [ ] Execute Node regression suite, syntax checks, and real browser/mobile Inspector interactions. Changes currently committed but not runtime verified.
- [ ] Verify preview and release gates; production unchanged, no migrations or paid provider calls.
- **Risk:** Current Inspector content and navigation remain transitional. New tab labels alone do not satisfy locked feature completeness. Avoid treating this branch as release-ready.
- **Next:** targeted Inspector regression tests and complete actual data-backed content before preview deployment.


## 2026-10-11 — Product recovery branch (PR #48, not released)

- Branch: `work/product-recovery-mobile-sky`; production unchanged.
- SKY: provider quota warning reduced to a compact, accessible status control; mobile navigation spacing adjusted.
- Inspector: compact mobile bottom sheet with explicit expand/collapse and independent content scrolling. Navigation now uses contact/airframe context and Sightings terminology. Browser acceptance still pending; complete locked object-tab model is not implemented.
- SLIDES: cache loader and actual renderer now permit verified exact-airframe photographs for live ICAO24 contacts without a registration, while rejecting conflicting/stale registrations. Added identity regression tests.
- SLIDES discovery: cache-first, viewport-scoped fallback to the existing `/api/investigate` endpoint for registration-bearing contacts lacking verified cached media. Initial cap: one investigation per five minutes, six per page session, 12-second timeout; delayed at least 30 seconds after a cache lookup. The existing server investigator performs provider access and D1 claim reconciliation. Results are never displayed directly; only subsequent licensed, attributed, exact-airframe D1 media qualifies. No new provider or paid service introduced.
- Added tests `ambient-media-hex-only.test.cjs`, `ambient-slide-identity.test.cjs`, and `ambient-media-discovery.test.cjs`.
- **Unverified:** test suite has not run against this branch; no Android/browser interaction checks; no preview or production deployment. The independent discovery path is bounded but does not yet offer model/type representative fallback, shared durable rate accounting, or provider-wide quota enforcement.
- Next: execute tests and real mobile acceptance, fix defects, then implement lawful representative fallback and Inspector contextual content before a controlled release.

# DOAA development log and restart handoff

Updated: 2026-10-08. Evidence-qualified checkpoint; not a live runtime acceptance test.

## Permanent rules
Free-only architecture and operation. The human partner owns product vision; the assistant owns execution, tooling, GitHub, testing, documentation and deliberate deployment wherever connected capabilities permit. Update this file at every meaningful checkpoint and before ending a work session; update DOAA_SPEC.md for design, architecture and invariant changes. External research must never create DOAA Encounters.

## Work capacity, execution and status
- ChatGPT Plus includes limited Work access. Conserve it; use direct connected tooling when suitable, with no paid upgrades.
- Execute large, coherent end-to-end tranches rather than asking for repeated 'continue' prompts. Do not imply background progress outside actual tool or scheduled runs.
- Report each state distinctly: implemented, committed, PR open, merged, Preview deployed, Production deployed, runtime/device verified. Record tests and unknowns explicitly.

## Verified repo state
- Canonical specification: DOAA_SPEC.md sections 24B and 24C; product decisions: FIELD_NOTES_DECISIONS_2026-10-08.md.
- Prior reconciliation: PR #11 squash-merged to main at d507d2224a2cad8f810951bca345f74e49a9ef84.
- This change is documentation-only. No application deploy or D1 migration was performed.
- Wrangler configuration specifies Cloudflare Worker entry src/worker.js, static assets, five-minute cron, and separate production/preview D1 bindings. Configuration does not establish deployed state.
- The precise assistant-led deployment route demonstrated in prior work is not yet reverified in this checkpoint. Recover it from GitHub history and connected deployment tools; do not claim deployment impossible.
- No package.json or .github/workflows/deploy.yml or .github/workflows/ci.yml was found at the specifically probed paths; other mechanisms may exist.

## 2026-10-08 engine tranche checkpoint
- Branch: board-classification-truth-20261008. BOARD UI correction in index.html: reuse existing yowLeg classifier and show UNK rather than falsely labelling an unrecognized route DEP. A missing/non-array `flights` response is now treated as feed failure, not a truthful zero-aircraft result.
- Evidence: direct source inspection and targeted code edit. Syntax/browser regression tests: not run. Live provider payload: not checked. Production/Preview: not deployed or verified. D1: unchanged/not checked.
- Remaining: verify whether relay /board returns complete airport-centric airborne movements; check provider coverage and both IATA/ICAO matching; test Journey and Encounter boundaries with real fixtures. Recover established deployment procedure before release.
## 2026-10-08 Journey evidence-boundary checkpoint
- Branch: journey-evidence-boundary-20261008. In src/worker.js, removed the unsupported assumption that the first record matching a callsign is the current flight and that all earlier/later records are immediately previous/next operations. Chronology remains sorted and sourced, but `position` stays null and `adjacency_established` / `current_assignment_established` are false until a real operation-identity and adjacency resolver exists.
- This is a conservative correctness guard, not a complete Journey implementation. Historical claims, observations and route lookup remain distinct; no Encounter creation path was added.
- Tests: source edit verified by GitHub commit; automated runtime/fixture tests not run. Production and Preview not deployed; D1 migration not checked. Next: introduce deterministic operation-identity/adjacency fixtures, verify live flight payload and UI rendering, then deploy only after release gate.

## 2026-10-08 deployment reconnaissance
- Connected Render workspace verified: `doaa-adsb-relay` is a **free-plan** web service, repository `brenton-collab/doaa-calibration`, branch `main`, autoDeploy configured `yes` / trigger `commit`, start command `node relay.js`, build command `echo DOAA relay`. This is the relay service, **not** the Cloudflare Worker or its D1 database.
- Render deployment API currently reports its live relay deployment `dep-db2qqj59fdbs738uguc0` at commit `beff09f598ab92cd81d5aa875af59bfc1e1c9290` (2026-10-07). More recent GitHub merges are **not evidenced as live on Render**. Do not conflate Render's configured autoDeploy with actual successful deployment or with Cloudflare production.
- The assistant can inspect Render deployments and service configuration via connected tools. Cloudflare Worker deployment and D1 migration write access have **not** been verified. The full end-to-end deploy route is still open.
- Cost watch: Render plan was returned as `free`; continue to monitor free-tier limitations, and do not upgrade.

## 2026-10-08 BOARD feed coverage correction
- Branch board-feed-evidence-20261008. Relay now marks complete versus partial arrivals/departures provider coverage; if both provider queries fail it returns an error instead of a false empty success. Frontend displays an explicit incomplete-coverage warning for partial or legacy unknown responses.
- Root defect: `Promise.allSettled` silently dropped failed arrival/departure queries and returned `ok:true` with an empty array. Empty results therefore did not prove no traffic. Both successful queries still do not prove provider inventory completeness.
- This branch changes relay.js and index.html. Tests: source-level review only; no automated fixtures or live provider validation. Render and Cloudflare deployments not performed. D1 unchanged.
- Connected Render relay is free-plan and autoDeploy configured, but prior deployment history showed older live commit. Verify actual deployment state after merge; Cloudflare Worker deployment still unverified.

## 2026-10-08 BOARD deterministic test tranche
- Branch: board-core-regression-20261008. Added pure `board-core.cjs`, wired it into `relay.js`, and added `tests/board.test.cjs` using Node's built-in test runner (no npm dependencies, no GitHub Actions minutes).
- Regression coverage: YOW/CYOW matching, unrelated routes, circular routes, provider partial/double failure, landed/cancelled/scheduled filtering, and flight-key differentiation by operation date/route.
- Validation: nine direct helper assertions executed against the fetched branch source, 9/9 passed. The committed Node test file has not been executed in a Node runtime; integration/provider/browser tests not run.
- Free-tier: no API requests or deployments were initiated for tests. Relay is Render free plan; Cloudflare production status and D1 not checked.
- Risk: AirLabs `flights` inventory and its `status` semantics remain provider-dependent. Passing helper tests does not establish completeness or genuinely airborne state for records lacking altitude/status evidence.
- Next: run `node --test tests/board.test.cjs` locally or in an authorized zero-cost environment, verify real relay payload and release procedure, then deploy with explicit gates.

## 2026-10-08 BOARD malformed-payload regression
- Branch board-payload-integrity-20261008. A fulfilled provider call returning a non-array is now marked failed for coverage purposes; both malformed responses yield unavailable, not a false zero-flight success.
- Executed the exact committed `tests/board.test.cjs` content against `board-core.cjs` in an isolated V8 test shim: 5/5 test cases passed, including malformed payload assertions. This is not an actual Node `--test` run or end-to-end provider test.
- No deployment, D1 changes or paid Actions usage. Release status remains merged-source only pending PR and subsequent live validation.

## Current frontier: T0 truth and deployment recovery
1. Recover the previously successful assistant-led deployment path, connected permissions, preview/production workflow, migration procedure and rollback. Verify without pushing a needless deploy.
2. Check live/preview D1 migration and scheduled collector status without unnecessary writes.
3. Reproduce BOARD ARR/DEP and Journey BEFORE/NOW/NEXT versus Flight from real provider payloads; add deterministic regression fixtures and no-data versus no-traffic tests.
4. Validate Inspector explainer, close, typography and touch behavior; enforce the genuine-observation-only Encounter invariant.
5. Implement bounded correctness repairs, test, update spec and log, then deploy only at an appropriate verified release gate.

## Required checkpoint format
Date; branch/commit/PR; changed files; tests and outcomes; preview/production deploy status and versions; D1 migration state; verified defects and risks; next executable step. Write 'not checked' instead of guessing.

## 2026-10-08 actual Node regression execution
- Ran the exact current `board-core.cjs` and `tests/board.test.cjs` content with Node.js v22.16.0, using a temporary local workspace and `node --test`. Result: 5 passed, 0 failed. No network/provider calls or GitHub Actions minutes.
- GitHub main remains the release source. Render relay last observed live at October 7 commit `beff09f`; Cloudflare Workers Builds deployment success and D1 schema still not directly verified.
- Release gate: do not equate merge with deploy. Inspect Render deployment state and Cloudflare deployment/build, then test health and BOARD/Journey on the served Worker. Avoid triggering redundant Render deployment while its autoDeploy integration is enabled; investigate missing auto-build first.


## 2026-10-09 — D1 quota repair staged (not yet deployed)

Cloudflare GraphQL query-level analytics for October 9 identified the primary read load: the dossier's `SELECT ... FROM leads WHERE entity_id=? ORDER BY status,lead_type` consumed **3,329,913 rows read**; the pending-leads queue consumed **1,376,955**; encounter reconciliation **222,210**. A live read-only `EXPLAIN QUERY PLAN` showed the dossier query scanning `idx_leads_status_retry`, not seeking by entity. The new migration `0008_lead_lookup_indexes.sql` adds `idx_leads_entity_status_type` to address that exact problem.

On branch `fix/doaa-d1-amplification`, `doaa-memory.js` also avoids unnecessary `entities` upsert updates, avoids updating unchanged identifier values, and skips encounter reconciliation for duplicate observation inserts. Added `tests/d1-observation-efficiency.test.mjs` and `tests/test_d1_indexes.py`. The synthetic SQLite index test passed locally (one test). The Node mock regression has been authored but has **not yet been executed**. Full integration tests and production validation remain outstanding.

Attempt to apply the production index was rejected by Cloudflare error 7500 because the account exceeded its Free D1 row-read quota. No production schema or Worker was changed. A scheduled task is set for **2026-10-10 00:10 UTC** to validate, apply and verify when quota resets. Confirm current quotas before writes. No paid plan upgrades or unrelated resource changes.

## 2026-10-10 — D1 efficiency production release and Field Notes surfaces

- Production D1 `doaa-memory` (434f90d3-397b-48d3-8249-4c48cf1e8936): created `idx_leads_entity_status_type` successfully, and live `EXPLAIN QUERY PLAN` confirms `SEARCH leads USING INDEX idx_leads_entity_status_type (entity_id=?)`. This fixes the proven lead-dossier full scan, but aggregate D1 consumption has not yet been measured after rollout.
- PR #35 merged to main at commit `7076e446`, containing duplicate observation and unnecessary entity/identifier write avoidance plus tests. Cloudflare Worker deployment version `28df1596-6c2c-4dd6-8e19-1b7105796877` appeared at 2026-10-10 01:29:07 UTC following the merge. Production HTTP behavior and usage delta not yet verified.
- Field Notes warm light reading surfaces for rail, Investigator, BOARD and usage overlays committed at `9b3cbb6`. Live deployment and visual interaction checks pending. The dark sky/map remains the contrast backdrop. No new external providers or paid resources.
- Next: confirm the post-aesthetic Cloudflare deployment, inspect served UI on mobile and desktop, verify BOARD/Investigator navigation and D1 usage trend; repair any visual regressions before calling release complete.

- Cloudflare confirms subsequent deployment `b32eacfb-5856-4b20-afe3-3ee1147dde37` at 2026-10-10 01:30:04 UTC, following the Field Notes commit. This confirms a newer Worker release, not a manual visual inspection of served static assets. Live browser UX and post-change D1 metrics remain open verification gates.

## 2026-10-10 — G0 inventory checkpoint

Read-only repository and Cloudflare inspection. Current production deployment reported at 17:27 UTC, newer than this log's previous checkpoint. Five-minute Worker cron is configured. Production and preview D1 databases exist. Current D1 usage and live UX remain unverified.

The repository contains BOARD, quota and D1 efficiency tests. Published airport schedule acquisition remains unresolved under docs/DATA_SOURCES_AND_QUOTAS.md. The frontend contains SKY and BOARD but not AMBIENT compositions. Next: reconcile deployed version, test actual code and document cross-feature release traceability. No production changes made.

## 2026-10-10 — G0 integrated traceability recorded

Detailed source and deployment audit: docs/G0_RELEASE_TRACEABILITY_2026-10-10.md. Critical release-coupling risk: Worker dynamically fetches current main-branch frontend assets, so Worker version alone cannot verify or roll back served UI. Cloudflare reported a newer 17:27 UTC deployment and configured five-minute cron. D1 databases confirmed, usage unmeasured. Render workspace requires user selection and was not accessed. AMBIENT compositions absent from inspected frontend; published BOARD schedule source remains unresolved. No production changes or tests executed. Next: establish immutable frontend release/rollback boundary, reconcile deployed assets and run offline tests before app edits.

### 2026-10-10 — Observation integrity and navigation integration
SKY, BOARD, LOOK, Inspector and AMBIENT now preserve missing telemetry as unknown, distinguish observation freshness, and avoid presenting pinned contacts as current observations. Recent work includes commits 92c1d03, 26ee557, 441e9f9, 617860f, 233e19d, 4a195a0, e3ff2ff, cd05802, d1ffccf, 89b8d20 and 67ee9b4. LOOK and BOARD Inspector return navigation is implemented. The last tranche corrected a stale-photo regression and missing-data display in Rack and Slides. Source parse checks passed. Full browser and live relay acceptance remain unverified. No production deployment, database write, paid provider call or CI run.

### 2026-10-10 — Acquisition hardening and offline acceptance
Backend relay observations must carry a plausible, recent timestamp before Worker encounter persistence or track cache mutation (8690a96). BOARD inference requires observations under 90 seconds old (b6fd31a). Frontend cell reuse now checks observation age rather than receipt time (daf3bb0), prevents superseded responses overwriting newer cells (a85e46b), and excludes aged cells from the merged live aircraft list even when other cells are fresh (0495e68). Unknown heading is rendered as a neutral dot in SKY and AMBIENT (5d37f28, ea603ed); AMBIENT clears trails on pause. BOARD acquisition and outage labels were clarified (d193bda). Added offline observation-contract tests (18090e6, 098013e, 4bf8a30). Five checks passed in isolated execution, including mixed fresh/stale cells. Live provider-to-browser acceptance and release gate remain outstanding. No production changes, D1 writes, paid provider usage, or CI runs.

### 2026-10-10 — LOOK accessibility and acceptance harness
LOOK preserves keyboard focus by aircraft identity across automatic cue reordering (3ede404, a0e94af, 63c733f). Added an offline simulated focus-regression case and repaired its DOM simulation (e22fc8f, f30cd83, 5646614). All six observation-contract tests passed in isolated execution, including script parsing, unknown telemetry, stale LOOK suppression, focus retention, mixed-age cells and freshness safeguards. The large index.html Inspector-live patch was blocked by connector safety checks and is not committed; the remaining concern is that the Inspector's live flag can still be inferred from presence in aircraft rather than provenance. Browser-backed integration and production verification are outstanding. No deployment, D1 write, provider spend or CI run.

### 2026-10-10 — Inspector provenance and BOARD race closure
Inspector now requires a recent observation and a non-pinned aircraft before labeling a contact live (e202bd3). BOARD no longer advertises an unqualified LIVE heading (f3ed40b). BOARD feed responses now carry request sequence guards to prevent a superseded response overwriting the latest result even when the home airport has not changed (1871131). SKY visually dims pinned historical contacts and does not draw them as active flight traces (18e0082). The offline evidence suite adds Inspector provenance, BOARD race, and historical rendering assertions (aea62c3, 5f80576). All eight checks passed in isolated execution. Full browser-to-relay integration and release acceptance remain pending. No production deployment, paid provider use, D1 mutation or CI run.

### 2026-10-10 — BOARD error-path race closure and release gate audit
BOARD request sequence now guards both successful responses and failure rendering: a late failure from an obsolete request cannot replace the newer airport view (6be1828). The offline observation-contract suite checks both sides of this condition (16b697f). Eight tests passed in isolated execution, including parsing, provenance, focus, stale cell merge, Inspector classification, and BOARD sequence guards. Audit note: the suite is source-level and simulated logic, not a browser or provider integration test. Browser execution is not available through the current connected GitHub tooling, and production acceptance remains pending. Next: run a real browser journey against a non-production deployment or locally served artifact with controlled API fixtures, then review and document release gates before promoting main. No provider spend, CI, D1 mutation, or deployment performed.

### 2026-10-10 — Relay observation-age integrity
Inspected relay.js and found that successful provider requests previously stamped every returned aircraft with the HTTP receipt time, regardless of each aircraft's reported position age. That could make a stale aircraft look freshly observed and create a misleading encounter trail. Relay now filters aircraft whose provider seen_pos (preferred) or seen age exceeds 90 seconds and rejects invalid ages. Missing latitude/longitude can no longer become an encounter at zero coordinates through Number(null). Aircraft without either age field are retained with unknown per-aircraft age; this remains an explicit provenance limitation to assess before release. Commit 1a1d661. Added relay contract regression (9daf3ea); nine offline checks pass. BOARD obsolete-request error rendering was guarded in 6be1828 and tested in 16b697f. Real browser/provider acceptance remains unverified. No production deployment, D1 mutation, paid provider call, or CI run.

### 2026-10-10 — Unknown-age provenance gate closed
The stricter relay rule is now committed: missing per-aircraft seen_pos/seen age is rejected rather than treated as recent. Git object commit e88d86b was inspected before safely moving only the integration branch. Regression 39b45ea exercises known, stale, invalid and missing ages; all 10 offline checks passed in isolated execution. This closes the unknown-age policy implementation gate, not the live browser/provider acceptance gate. No production deployment, D1 mutation, paid provider call or CI run.

### 2026-10-10 — Product-first SKY and AMBIENT truthfulness
SKY now excludes pinned historical contacts and aircraft from aging snapshots from its current airborne count and rack, while keeping deliberately pinned aircraft visually distinguishable in the map (7ca1ea6). AMBIENT SLIDES now displays ALT UNKNOWN and SPEED UNKNOWN rather than invented zero telemetry (8a1947d, corrected syntax in aee0f51). Two regression contracts were added (17b5000). An initial test run caught a real syntax error in the slide markup; fixed immediately and reran all checks: 12/12 pass. This is still isolated offline source-level execution, not browser acceptance. Product usability and full user journeys are the next priority; avoid expanding test apparatus further. No production deployment, CI, D1 mutation, or paid API call.

### 2026-10-10 — AMBIENT keyboard usability
Fixed AMBIENT's keyboard handling: Enter on the focused composition switch no longer bubbles into a blanket close action; Escape remains the deliberate dismissal key. Commit e59e29e, inspected one-line diff and updated the integration branch with a checked branch-head lease. Verified the updated ambient.js parses as JavaScript; no browser keyboard journey was available, so runtime focus behavior remains an acceptance item. No production deployment, CI, D1 mutation, or paid provider calls.

### 2026-10-10 — BOARD keyboard-first navigation
BOARD flight rows are now native buttons rather than clickable divs, so Tab/Enter/Space are available without custom keyboard handlers. Restyled buttons to preserve the restrained board appearance with a visible focus ring. When returning from a BOARD-origin Inspector, the board remembers the row index and focuses that flight after the asynchronous BOARD refresh renders. Source parsed successfully before commit. Commits 865e5b5 and 8e01222. Remaining browser acceptance: test keyboard, changed flight ordering across refresh, and focus in loading/error states; not yet verified in a browser. No production deployment or paid services.

### 2026-10-10 — Identity-based BOARD return
Changed BOARD Inspector return focus from the old row index to a composite flight/aircraft identity (hex, flight ICAO/IATA, registration, movement direction). When a refreshed BOARD reorders flights, the returning flight is found at its new index; if missing and other rows remain, the first available flight receives focus. Commit 1691eb3, inline JavaScript parsed. A further proposed focusable-region fallback for an entirely empty or unavailable board was blocked by repository safety checks and is NOT implemented. Browser-level keyboard acceptance remains pending. No deployment, paid provider, D1 mutation or CI.

### 2026-10-10 — BOARD return focus complete for empty/error states
The BOARD region is programmatically focusable and labelled. Returning from an Inspector now restores focus to the same flight by identity, another available flight if missing, or the board region when no rows remain (4bdb868). Unavailable and failed refresh paths now focus the board region and clear pending restoration (9e89110). A subsequent navigation cleanup (158a766) incorrectly cleared the return identity on the SKY transition; corrected immediately (d8314c6), preserving the key after setPrimaryView('SKY'). Source-level syntax verified for modified scripts. Browser acceptance remains pending; no production deployment or provider spend.

### 2026-10-10 — AMBIENT sustained-session behavior
AMBIENT idle entry now treats scroll, wheel and touchmove gestures as user activity, protecting active reading from unwanted interruption (725b8ce). Backgrounded pages skip AMBIENT heartbeat rendering (10d9dd5), and an active composition updates immediately when the page becomes visible again (ecc2dfe). JavaScript syntax verified, changes inspected at commit level for the initial gesture patch. Real long-duration tablet/browser session remains unverified; do not label this production acceptance. No paid API, D1 writes, CI or deployment.

### 2026-10-10 — AMBIENT SLIDES photo lifecycle
Added image preloading and failed-photo exclusion for exact-airframe verified media; image load callbacks are gated by active composition and slide identity (1ded3f7). Distinguished loading state from displayed media (3641b54), guarded periodic refresh against premature PHOTO VERIFIED (e2b71aa), and attached RECENT OBSERVATION provenance immediately on successful image load (1fab006). JavaScript syntax and committed diffs inspected. The image is still an externally hosted cached-media URL, so browser network/error and tablet endurance checks remain outstanding. No production release, CI or provider spending.

### 2026-10-10 — AMBIENT SLIDES uninterrupted handoff
Product direction: no loading text between slides; preload the next verified exact-airframe photo while current photo and matching details remain visible, then commit both together. Implemented pendingSlideId preload state and atomic image/details swap on successful load (f99f109). Failed next image leaves current photo intact and excludes failed URL; stale/no-eligible observations still clear the display rather than imply live presence. Verification moved to a restrained upper-left corner pill, away from upper-right DOAA identity (ad284cd). JavaScript parsed; browser network timing, responsive appearance and extended-session acceptance remain unverified. No deployment/provider expenditure.

### 2026-10-10 — SLIDES asynchronous handoff validation
Added a final live-snapshot freshness and aircraft registration/identity check at image.onload, preventing a slow image from replacing the slide after its observed airframe disappears or the snapshot expires (560bea7). The intended UX remains uninterrupted current slide until verified next image is ready. Source parsed, but live browser timing and visual acceptance not performed. A proposed removal of redundant footer status text in SLIDES was blocked by connector safety checks and remains uncommitted. No deployment or paid services.

### 2026-10-10 — AMBIENT SLIDES quiet handoff check
Removed redundant slideshow footer observation captions (f918ed9). Executed an isolated JavaScript DOM/Image mock against the current ambient.js source: first photo is not shown before onload, next photo begins preloading after the 45-second hold, previous photo remains visible while next loads, failed replacement retains previous photo, verification pill remains PHOTO VERIFIED, and slideshow footer status remains empty. Initial mock attempt expected rotation before 45 seconds and correctly failed; revised test advanced the clock and passed. This is an executable mocked lifecycle check, not a real browser, real network, or device acceptance. Production remains unchanged.


## 2026-10-10 — main-line checkpoint reconciliation

The following main-branch documentation checkpoints were preserved while reconciling release history; these describe prior state and do not supersede newer branch implementation evidence.

## 2026-10-10 — Frontend release isolation branch

Branch `work/immutable-frontend-release` contains the Worker asset-bundle change, static regression tests, deploy syntax-gate integration, and docs/FRONTEND_RELEASE_BOUNDARY_GATE.md. Connector-side checks passed eight source/configuration assertions. Cloudflare read-only settings confirm production ASSETS and DB bindings. Node tests, preview/browser flows and production verification remain outstanding. No merge or deployment was performed. Next: run tests in a safe environment, verify static route behavior, and prepare controlled rollout with bundle-aware rollback.


## 2026-10-10 evening — integrated AMBIENT and LOOK branch

On `work/immutable-frontend-release`: ambient.js/css, shared live snapshot bridge, minimal art-directed AMBIENT SKY with observed-position trails and sparse upper-right branding/mode switch, AMBIENT SLIDES guarded shell, and LOOK view with explainable cues and SKY Inspector tap-through. Integration contract tests expanded and deployment syntax gate references them. GitHub source checks confirm module inclusion, shared snapshot and no new provider fetch in AMBIENT/LOOK. Detailed status: docs/AMBIENT_IMPLEMENTATION_STATE.md on branch. **Not executed in browser/Node, not merged or deployed.** Next: runtime validation, photo evidence adapter, event-driven SLIDES, and coherent integrated release acceptance.
## 2026-10-11 — units, Home/Explore and Inspector continuation interrupted

Published baseline `f0ad996`, branch `work/product-recovery-mobile-sky`, draft PR #48. Added shared units/catchment modules and connected display/preferences changes; separated Inspector datum controls, accessible favourites and contextual back navigation. Latest Node run: 110 passed, zero failed. Expanded browser acceptance found three genuine defects which were repaired, but the final run is uncollected and requires a clean rerun against final source. This batch is **uncommitted, unpushed and undeployed**. Automatic approval review could not complete the browser polling call because the usage limit was reached; this was not an unsafe-action determination. Full state, limitations and exact recovery actions: `docs/RECOVERY_CHECKPOINT_2026-10-11_UNCOMMITTED.md`. Production/main and remote databases unchanged in this continuation. Next: complete browser/visual acceptance, update matrix rows, commit/push this batch, then implement account-owned preference synchronization and remaining connected product scope.

## 2026-10-11 — Flight/Airframe Inspector verified checkpoint and CHAT handoff

Implemented shared source-qualified Flight timing/progress, immediate Contact telemetry, Airframe unknown/conflict handling and BIO milestone separation, recorded Sighting to encounter-specific Track History, context-preserving navigation, and bounded account-scoped dossier/favourite caches. Rack summaries no longer acquire dossiers; the Worker dossier read performs no automatic research/claim/media writes and makes at most one bounded free lookup. These runtime protections are not deployed.

Verification: 141 Node tests passed. Final Chromium offline fixture acceptance passed desktop, phone, landscape and tablet at 2026-10-11T17:33:34.671Z; all report source hashes match final source. Timing/Progress screenshots were visually inspected for all four sizes. Short landscape uses content scrolling and scrollable tab navigation. Isolation, asset/package construction and diff checks passed. See docs/qa/flight-airframe-acceptance.json and docs/FLIGHT_INSPECTOR_CONTRACT.md. No signed-in Preview/live-provider/physical-device acceptance is implied.

Brent requested conservation of WORK credit. This session stops at the verified checkpoint and hands requirements/source/configuration review to CHAT through docs/CHAT_HANDOFF_2026-10-11.md. BOARD/Airport Movements implementation is deferred to the next engineering session. Matrix remains 0 complete, 134 partial, 49 missing and 1 blocked; full release is not complete. Google private configuration and lawful schedule sources remain unresolved; username/password fallback is accepted but unimplemented.

No remote D1 writes, migrations/imports, deployment, main merge, paid activation or Actions run. Earlier Preview schema query was 90 rows read/zero written; current read-budget tests were local SQLite. Existing Preview binding is its own DB, but this branch is not deployed. Publish only work/product-recovery-mobile-sky and retain draft PR #48.

## 2026-10-11 — UX push: shared BOARD / Airfield Movements

Continued from published Inspector checkpoint 0395487. Implemented shared chronological movement model and responsive renderer; date/Today/Live navigation, direction/evidence filters, independent provenance disclosures, Flight/recorded Contact/provisional navigation, cache reuse and preserved reading state. Phone/short-landscape controls start compact. Airport-local reference zones are explicit; unknown zones remain UTC. Header overlap, off-screen Return Home, independent BOARD scroll and broken map tile failure were repaired through real browser work.

Verification: 149 Node tests passed. Final full browser regression and focused dense BOARD suites each passed desktop, phone, short landscape and tablet; source hashes matched final source. Reports: docs/qa/movement-ux-acceptance.json and docs/qa/movement-dense-acceptance.json. Screenshots visually inspected; board-ux-desktop.png and board-ux-phone.png preserve explicitly labelled offline fixtures. Isolation, asset/package construction and diff checks passed. These are browser fixture results, not live schedule/provider, authenticated Preview or physical-device acceptance.

Decisions 19–23 and shared UX Decisions 1–3 have additional implementation evidence. No whole row is marked complete: matrix remains 0 complete, 134 partial, 49 missing, 1 blocked. Historical/future archive windows, full matching/revisions, sourced schedules, runway activity/Stats and continuous budgeted live updates remain open. Exact scope: MOVEMENTS_UX_CONTRACT.md and UX_PUSH_2026-10-11.md. CHAT_HANDOFF_2026-10-11.md supersedes its earlier wholesale BOARD deferral and identifies source/configuration review for CHAT; retained universal search (67–77) is the next strong WORK UX tranche.

No remote D1 writes, imports/migrations, deployment, main merge, paid activation or Actions run. This batch adds no Worker BOARD D1 query/write and no automatic polling. Existing authentication/upstream costs remain; no live quota claim is made. Code protections and UX changes are not deployed. Authorized publication is only work/product-recovery-mobile-sky, with PR #48 retained as draft. Rollback reference is the preceding Inspector checkpoint; no data deletion is needed.

## 2026-10-11 — header and preferences UX refinements

Fixed AMBIENT overflowing its view-switcher surface on narrow screens. Moved Account to the bottom of catchment/preferences, after the settings and recent areas. Source Coverage is now an expandable pill. Removed routine successful-save text; pending/failure feedback and Retry save remain available. Simplified account prose without changing preference synchronization.

Validation: 149 Node tests passed; full browser regression and dense movement acceptance each passed desktop, phone, landscape and tablet against the final source. Updated reports and labelled offline-fixture screenshots are in docs/qa. This is local fixture acceptance, not signed-in Preview or live-provider acceptance. No new D1 acquisition, remote database writes, migration, deployment, main merge or Actions run. PR #48 stays draft. CHAT handoff scope is unchanged.
