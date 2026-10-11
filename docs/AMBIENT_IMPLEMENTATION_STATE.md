# DOAA AMBIENT implementation checkpoint
2026-10-10. Branch: work/immutable-frontend-release. Not merged, deployed or runtime-accepted.

## Implemented on branch
- Ambient SKY: separate full-screen quiet dark display with a radar-like 80-NM observation reference, current observed aircraft positions, heading markers, freshness and counts. Reads the existing frontend observation snapshot; no extra API calls.
- Manual AMBIENT SKY / AMBIENT SLIDES choice, persisted locally; no automatic mode switching.
- Optional five-minute idle entry, persistent preference, touch/keyboard return to interactive SKY, reduced-motion stylesheet and mobile layout.
- AMBIENT SLIDES: layout, exact-registration/licensing/attribution media guard, and an honest no-verified-photo state. No per-slide provider calls. The current snapshot does not yet carry licensed photo metadata, so real-photo rotation is not yet implemented or accepted.
- Bundled frontend release-boundary fix and automated static contract test files; deployment syntax gate references both.
- Source/configuration checks verified by reading the branch through GitHub; no Node execution or browser validation performed.

## Known gaps
- The AMBIENT SKY display is an independent minimal cartographic projection, not yet the same map geometry and layer styling as interactive SKY. It uses aircraft coordinates from the shared snapshot.
- Stale/fresh observation age depends on the existing SKY 'now' timestamp; validate semantics under failed refresh and cached data.
- AMBIENT SLIDES needs a properly licensed, cached, exact-airframe photo adapter and event-driven selection across current and recently observed flights.
- Old tablet idle, touch return, focus management and burn-in tests remain.
- LOOK implementation is not included in this tranche. An attempted LOOK edit was blocked by a safety check; no claim of completion.
- Full repository test suite and local preview have not been run; do not merge or deploy on the basis of source checks alone.

## Next integrated work
Validate runtime syntax and UI flows; add reusable media evidence contract and event-driven slides; integrate LOOK and Inspector navigation; ensure BOARD coverage and freshness labels. Preserve production isolation and avoid metered provider requests.

## 2026-10-10 evening — product-direction correction and LOOK
User art direction: AMBIENT SKY must be almost textless. DOAA identity badging top right, small explicit composition toggle, very faint map detail, and a feeling of aviation traces emerging as art rather than a softer SKY interface.

Implemented in branch:
- Replaced radar rings, compass, labels and counters with faint field lines, small aircraft glyphs and accumulated tracks from real successive observations. No synthetic movement, no additional acquisition.
- Minimal upper-right DOAA identity and SKY/SLIDES switch, quiet bottom-right return affordance, staleness indication only when needed. Mode selection persists; there is no automatic SKY/SLIDES switch.
- Added LOOK as an observation-first view with explicit explanations and tap-through to SKY Inspector, using only existing aircraft snapshot.
- Extended ambient integration contract tests to cover text restraint, trace rendering, LOOK navigation and no additional network requests.
- Verified via GitHub source inspection that new assets are loaded, LOOK is wired, and neither new module calls fetch. These are source checks, not executed runtime tests.

Important remaining issues: track drawing is observation-history only while the ambient view is active; it does not yet draw older D1 historical tracks. SLIDES still has no real cached licensed-photo bridge or event-driven rotation. Browser/Node execution remains unverified; production unchanged.

## 2026-10-10 — SLIDES evidence handoff
- Existing flight-enrichment Inspector reconciliation emits a local doaa:airframe-media event only for exact-airframe media with matching observed registration, image, license and attribution. No new external request is introduced by the event.
- ambient.js maintains a session-only cache of these verified media records, keyed by aircraft ID. Slides selects eligible media only for an aircraft in the current SKY snapshot with the same registration. It changes composition for newly eligible aircraft, with a 45-second minimum hold; quiet periods hold the existing composition.
- No speculative model photos, no on-slide provider fetch, no timed random rotation. An honest waiting state is displayed if no exact media has been encountered.
- The source checks passed for HTML/style balance, loaded modules, Inspector-to-AMBIENT media event, matching registration, LOOK Inspector navigation, and no independent fetch in AMBIENT or LOOK.
- **Limitations:** the user must first open an Inspector that reconciles exact media; the existing app does not yet proactively populate media from a bounded D1 cache. Browser acceptance, test execution and production deployment remain undone. A source check does not establish runtime correctness.

## 2026-10-10 — bounded D1 photo cache integration
- New GET /api/ambient-media?hex=... endpoint reads existing D1 identifiers and supported photo claims for at most 12 ICAO hex identifiers; no D1 writes, provider calls, premium enrichment or new photo searches. Conflicting claims and anything without exact-airframe specificity, registration, license, credit and HTTPS image are rejected.
- ambient-media.js polls only while AMBIENT SLIDES is open, for at most 12 currently observed registered aircraft, throttled to two minutes for the same set. Results pass through the same registration-matching local media event as Inspector reconciliation. No background network activity in AMBIENT SKY.
- Added cache-contract test and included it in the deployment gate. Refreshed older assertions to match the verified-media adapter.
- Connector-side source checks passed eight invariants. Runtime tests and browser validation remain outstanding.
- Known trade-off: this is a read-only reuse of existing media, not a media ingestion pipeline. It will only show images that were previously verified and saved by existing D1 workflows. No production merge/deployment.

## 2026-10-10 — integration execution tranche
- Executed 17 existing/new test callbacks in an isolated JavaScript compatibility harness against GitHub branch source: all passed. This is **not** a native Node test run and does not replace browser acceptance.
- Parsed both inline HTML scripts, ambient.js, ambient-media.js, look.js and flight-enrichment.js as JavaScript functions; parsed Worker after removing its ESM import/export wrapper.
- Executed the ambient-media.js event handler with controlled simulated observations, network response and clock: matching licensed media was emitted exactly once; repeated identical lookup was throttled.
- Executed Worker ambientMediaApi with simulated read-only D1 responses: returned an exact-airframe photo with canonical registration, rejected invalid ICAO IDs and issued only SELECT statements.
- Fixed registration-aware media cache signature so changes in observed registration invalidate the throttle.
- Fixed LOOK refreshing as shared SKY observations change, rather than only on initial navigation.
- Added executable LOOK user-journey test and included it in the production release test gate.
- Production remains unchanged. Browser layout, Cloudflare static asset packaging, native Node suite and production release verification remain open.

## 2026-10-10 — curated release packaging and executable evidence gates
- Added scripts/build-assets.cjs with a seven-file explicit browser asset allowlist. Wrangler production assets.directory is now ./dist, never repository root. Build rejects missing assets and unbundled local HTML references. Generated dist is ignored by Git.
- Updated production workflow to include all new AMBIENT/LOOK file triggers, run the curated packaging step before deployment, and execute new release-assets and media-evidence behavioral tests.
- Added tests/release-assets.test.cjs, tests/ambient-media-behavior.test.cjs and tests/look-journey.test.cjs to release gate.
- Source-level compatibility harness executed 20 assertions successfully (17 prior plus three release-assets checks). Separate isolated API simulations accepted a verified exact-airframe photo and rejected conflicting image claims, representative specificity and missing attribution. This is not a native Node test run or browser smoke test.
- Main and integration branch are diverged (two main commits beyond branch base at inspection). Do not merge without reconciling. No production deployment or external-provider quota consumed.
- Next: native CI/browser acceptance, correct discovered runtime failures, then reconcile and merge/deploy with explicit verification.

## 2026-10-10 — integration continuation
- Inspected canonical checkpoint, frontend modules, Worker and Wrangler configuration via connected GitHub.
- Fixed LOOK treating null/empty distance or altitude as numeric zero in both cue classification and displayed values. Committed as dde72d4b187f833e3d63cc70a45d02d55bf12992 on integration branch.
- Execution environment has Node 22/npm 10, but cannot resolve github.com for cloning the private repository. Connected GitHub fetch can read individual files; complete native suite and browser acceptance were **not** run in this tranche.
- Production remains untouched; no provider calls, D1 writes, merges or deployments.
- Next release gate: transport complete branch into executable workspace, run packaging and native tests, inspect browser flows, then reconcile branch divergence before deployment.

## 2026-10-10 — packaging validation continuation
- Commit ef2d2ee stages and validates curated frontend assets before replacing dist; an invalid/missing source no longer destroys the previous local dist.
- Node 22 local isolated checks of the exact updated builder logic: syntax passed, missing-source failure preserved prior dist sentinel, and complete seven-file synthetic fixture successfully replaced dist. These are **builder-specific tests using synthetic assets**, not full repository tests or browser acceptance.
- Direct GitHub clone still fails DNS resolution in execution container. Connected GitHub API can enumerate and fetch files but does not directly mount a checkout. Full native suite, real browser and Cloudflare acceptance remain open. Production untouched.

## 2026-10-10 — SLIDES truthfulness hardening
- Commit 9454861 prevents absent altitude and groundspeed from rendering as zero in AMBIENT SLIDES, and rejects non-HTTPS incoming media URLs.
- Commit 4c8a442 adds source-contract regression assertions for these conditions.
- GitHub connector inspection confirmed test and source edits were committed; new assertions have not been executed in native Node, and browser acceptance remains open. No provider requests, D1 writes, merge or deploy.

## Media adapter checkpoint
- dd165e9: revalidates latest aircraft registration after cache response and permits retries after failed reads.
- e0c05f3: adds regression contracts. Native tests and browser acceptance not yet executed.
- No CI, production deployment, D1 writes, or premium provider calls in this tranche.

## 2026-10-10 — executable media-adapter acceptance
- Executed four isolated V8 behavioral scenarios against GitHub-fetched ambient-media.js: successful exact-airframe event, stale registration rejection, exit-before-response rejection, and HTTP-failure retry. All passed. Also parsed ambient.js, ambient-media.js, look.js and build-assets.cjs successfully.
- f58e0e5 adds permanent Node vm-based runtime tests covering those four scenarios. 76ef781 adds the test file to the production deployment gate. The committed Node tests themselves remain unexecuted until a native checkout is available; V8 isolated equivalents passed.
- No GitHub Actions run, Cloudflare deploy, premium provider calls or D1 mutations. Full regression/browser release acceptance still pending.

## 2026-10-10 — coordinate integrity and media races
- d7b60ec validates present, finite, in-range aircraft/home coordinates; null no longer projects to 0 degrees. e95dce1 adds regression source contracts. Seven isolated predicate cases executed against the fetched implementation and passed; ambient.js parsed.
- 6e56c9b extends the committed asynchronous media runtime tests for disappearing registration.
- Full repository-native tests, integrated browser flows and deployment remain pending. No CI, D1 mutations, provider calls or production changes.

## 2026-10-10 — release test gate expansion
- eb7b515 changes the production workflow from a hand-selected test subset to all tests/*.test.cjs, tests/*.test.mjs, and airlabs-budget.test.cjs.
- f445135 commits executable asset-builder tests for missing sources, unknown local HTML references, and successful allowlisted packaging. All three equivalent tests were run under Node 22 in an isolated local fixture and passed.
- Complete checkout tests and browser acceptance remain pending. No CI was triggered and no production deployment occurred.

## 2026-10-10 — user-facing SLIDES rotation
- 15ece00 adds a 45-second quiet hold followed by cycling among currently eligible exact-airframe images. If an aircraft becomes ineligible, the composition changes without retaining an obsolete current aircraft.
- 83b1743 refreshes flight text on each update without forcing photo transitions. 84a9279 preserves unknown telemetry text in that refreshed copy. e6f39a2 labels recent versus last-observed evidence honestly.
- JavaScript parse checked after the rotation change. This is feature implementation on the integration branch, not browser acceptance. No provider calls, D1 changes, CI or production deploy.

## 2026-10-10 — LOOK navigation journey
- 0d8c563 rejects missing/out-of-range LOOK coordinates and future-dated observations as fresh.
- d911885 makes Inspector close return to LOOK when investigation originated from LOOK. 1d2a294 clears that return intent on explicit primary-view changes.
- Implemented on integration branch; browser journey not yet executed. No production or infrastructure changes.

## 2026-10-10 — BOARD backend/frontend contract
- 8fb5b63: BOARD API rejects blank latitude/longitude rather than silently coercing them to zero before free ADS-B relay acquisition.
- e3c5dea: BOARD-to-Inspector preserves absent altitude, groundspeed, heading and vertical rate as unknown instead of manufacturing zeros, and checks coordinate bounds.
- 6a0e276: closing an Inspector opened from BOARD returns to BOARD; other navigation remains unchanged.
- Both inline HTML scripts parsed successfully after the changes; API and navigation contract source checks passed. Full browser and backend integration not yet verified. No production deploy, premium requests, D1 writes or CI.
