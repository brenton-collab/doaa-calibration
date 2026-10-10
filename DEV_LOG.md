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
