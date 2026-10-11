## 2026-10-11 — D1 quota guard and sign-in clarification

- Google sign-in code is already implemented and locally tested; Preview lacks OAuth configuration and the two approved stable account identifiers. No new Google accounts are required. User accepts database-backed username/password sign-in if Google setup proves too complicated; fallback is not yet implemented.
- Airport import preparation now defaults to the five built-in airports, rather than worldwide coverage. The verified source yields five airport rows, twelve runway records and seven SQL statements. Explicit custom/worldwide preparation stays local only; plans require remote quota review and distinguish coverage in their snapshot identity. Index writes must be counted when reviewing D1 budget; SQL statement counts are not billed write counts.
- Verification: 130 Node tests pass, including scoped preparation and incomplete-snapshot readiness against SQLite. Preview isolation, asset packaging and diff checks pass. Frontend source is unchanged, so the previous four-viewport browser acceptance remains applicable.
- This session’s one remote D1 schema query reported 90 rows read and zero written. No remote migration/import or deployment was performed. The earlier 41,214-airport verification was local SQLite only. Runway selection, unit changes and tab returns reuse loaded reference data.

# Release execution checkpoint — 2026-10-11

**Not a finished product or an accepted release candidate.** Full contract and current disposition: `DECISION_IMPLEMENTATION_MATRIX.json`. Work branch: `work/product-recovery-mobile-sky`; draft PR #48. Production/main are unchanged. No GitHub Actions runs were requested.

## Fifth execution batch — sourced runway reference workspace

- Published the prior Airport weather/navigation batch as `646118d`; the connected commit's tree exactly matched local `ffabe59`. Draft PR #48 now describes the full implemented scope and remaining release gates.
- Added geographically sourced runway diagram, physical-strip and reciprocal-end selection, dimensions/surface/lighting-reference flags, end-specific true heading/elevation/displaced threshold and shared units. Selection survives units and tab changes; unknown approaches, declared distances, historical changes, runway activity and current operational status remain explicit. North-up geometry uses published endpoints, including antimeridian handling; labels avoid the observed 04/14 overlap. Variable wind does not get an invented direction.
- Added additive `0013` reference-only schema and local preparation script. Runtime reads a small D1 record rather than fetching/scanning the worldwide dataset. Partial imports never replace a ready source; missing schema/snapshot stays unavailable, and a missing airport in the latest complete snapshot does not resurrect older data. No personal or DOAA observation records are modified.
- Actual public-domain OurAirports source was downloaded and normalized; **41,214 airport records / 48,336 runway records** were imported and verified in local SQLite, with immutable checksum and complete-snapshot readiness. This was local only: no remote migration/import or deployment. Contract/runbook: `docs/AIRFIELD_REFERENCE_CONTRACT.md`.
- **129 Node tests pass; all four final Chromium fixture workflows pass**, adding sourced runway/end selection, persistent selection through units/tabs and failed reference-refresh recovery. Exact frontend hashes: `docs/qa/airfield-reference-acceptance.json`. All four runway screenshots inspected. Preview isolation, allowlisted packaging, self-contained eight-module package and diff checks pass. Captured reference fixtures do not prove actual private Preview/provider/physical-device acceptance.
- Full 184-decision contract remains unfinished. Actual isolated schema/import, Google enrollment, authenticated Preview and remaining product/data content remain gates. Production/main remain unchanged; no paid provider activation or Actions run.

## Fourth execution batch — connected Airport Inspector and weather

- Published the prior verified units/catchments/account/bookmark snapshot as `d346bd2` on the approved branch through connected GitHub. Its tree exactly matches both original local commits. User permission resolved the public-repository disclosure hold; shell push had no credentials. Main, Production and repository visibility are unchanged.
- Map airport markers and relationship links now enter one shared four-tab Airport Inspector. Added sourced METAR decoding, UTC observation/retrieval times, freshness, zero/variable/calm wind, gusts, lower-bound visibility, cloud ceiling, temperature/dew point, altimeter and source category. Raw METAR remains unchanged. Successful no-data, failure/retry, wrong-station and late-response states stay distinct.
- Airport Movements now renders the same BOARD airport evidence and opens individual Flight with Back context. Reported route association and track inference remain explicit; neither is labelled a completed arrival/departure. State/Condition and absent runway geometry retain honest unavailable states.
- **121 Node tests passed; all four final Chromium fixture viewport workflows passed**, including actual airport map-marker selection, METAR/source/raw/explanations, stale/failure/retry, canonical movements/Flight/Back and late response isolation, plus all earlier account/bookmark/catchment/playback/comparison regression flows. Exact source hashes: `docs/qa/airport-inspector-acceptance.json`. Desktop/phone/landscape/tablet screenshots inspected. Asset packaging, Preview isolation and diff checks passed.
- Source contract: `docs/AIRPORT_WEATHER_CONTRACT.md`, verified against the primary AWC API/OpenAPI. Matrix retains all 184 rows and explicit partial scope. Full product is unfinished; live-provider, physical-device and signed-in Preview acceptance are unverified. No paid provider, remote migration, Preview/Production deployment or Actions run in this batch.

## Third execution batch — saved moments

- Replay can save the actual supported observation at the shared cursor with one action; unsupported gaps expose no save control. Saved references remain idempotent by observation ID and never create/delete observation or encounter evidence.
- Saved moments opens from Track History or Account. Newest-first cards preserve original registration/callsign/ICAO24, observation time, source and bookmark time. Optional recorded-address grouping retains every distinct moment and explicitly qualifies uncertain physical continuity. Missing eligible imagery uses the approved readable text fallback.
- Opening a card defaults to the original moment/provenance, with deliberate original-encounter replay at the actual saved timestamp and an explicit current-Airframe navigation action. No latest-state substitution, synthetic personal visual sighting or invented history.
- Removal is one action affecting only the personal reference; failed removals leave the card and disclose failure. Saved states reconcile after a complete account collection read.
- Executed: **114 Node tests passed** (including SQLite privacy/idempotence/non-mutation checks), Preview isolation and final asset packaging passed. **All four final Chromium fixture workflows passed**, including two distinct moments on one aircraft, original time/telemetry replay, current profile navigation, optional grouping and failed save/removal recovery. Source hashes and exact flows: `docs/qa/saved-moments-acceptance.json`. Desktop/phone collection screenshots inspected. Actual signed-in Preview and later identity-revision resolution remain unverified; imagery and live Contact capture are unfinished matrix requirements.

## Publication authorized and verified

The user explicitly authorized publication to the currently public `brenton-collab/doaa-calibration` repository after disclosure of its visibility. Shell push then failed for lack of GitHub credentials, rather than approval. Connected GitHub publication succeeded only on `work/product-recovery-mobile-sky` as `d346bd20ddb5e97cde1cf7d5974bafaec165c8cb`, based on `f0ad996`. Its tree `6a708bf0ec46d6767b6db1108a5cdae72d03603c` exactly matches the two verified local commits `246ed0e` and `cade4fc`; local tracking was reconciled only after that equality check. The earlier publication hold is resolved. Repository visibility was not changed; main and Production were not modified.

Google OAuth client and approved subject enrollment still block actual signed-in Preview. Application is not finished or release-ready. Continue Inspector/Airfield/BOARD and the remaining matrix requirements. No production merge/deployment is authorized.

## Second execution batch — units, catchments, Inspector and account preferences

- Saved Home/radius is independent of active exploration; SKY and BOARD share the active catchment. Setting Home preserves current investigation; Return Home and fresh launch restore saved Home/radius. Recent explored airports remain available.
- Shared display units cover current SKY/Rack/Inspector/history/LOOK/SLIDES/replay quantities, with canonical source values unchanged, truthful unknown/zero handling and converted chart axes/readouts. Remaining weather/runway/MET/NAV content must use the same presentation boundary.
- Inspector facts have separate labelled explanation, real navigation/detail and favourite controls. No nested buttons; keyboard favourites, contextual Back and obsolete-request guards are implemented. Inspector content remains incomplete beyond these interactions.
- Account bootstrap restores only allowlisted preferences, then acquires fresh aviation observations. Complete server snapshots are authoritative. Pending/cache state is scoped by authenticated subject; local updates apply immediately, retries are bounded, online/manual retry is available and failures are visible. Newer local edits during an in-flight save are retained. Account-owned API tests execute against SQLite.
- Executed: **114 Node tests passed**, Preview isolation guard and allowlisted packaging passed. **All four final Chromium fixture viewport workflows passed**, including playback/comparison regression, explanations/favourites/drill/Back, unit changes/reset with unchanged cursor, Home/Explore/BOARD propagation, Return Home/reload/recents and account save failure/retry/persistence. Exact hashes/flows: `docs/qa/units-catchment-account-acceptance.json`. Track screenshots at each viewport were inspected. These are offline fixture tests, not live-provider or physical-device acceptance. External basemap tiles remain unavailable in this environment.
- No deployment, remote schema change, production/main change, paid provider use or Actions request in this batch. Actual Google enrollment, signed-in Preview and remaining product content remain release gates.
- Next connected batch: saved-moment gallery/bookmark interaction, then complete Inspector/airport/BOARD evidence and the remaining matrix scope.

## Implemented and locally verified in the first execution batch

- Contact Track History now uses the actual encounter/ICAO24-restricted observation API, chronological keyset pages, an actual geographic projection, coordinate grid and external base tiles, altitude and groundspeed charts, one shared absolute-time scrubber, actual observation timestamps and provider labels.
- Playback uses monotonic elapsed time multiplied by the selected speed, pauses when context is disposed, stops at the final observation by default, and has an opt-in Loop. No historical position or telemetry interpolation. A sample is explicitly retained for up to 30 seconds; unsupported gaps have no aircraft or instantaneous telemetry. Geometry splits at observation gaps above 90 seconds. Connectors are observed-sample connectors, not reconstructed flight paths.
- Literal callsign/transponder/ground-report changes jump map and charts to the actual changed observation. No inferred takeoff, landing or emergency event is created.
- Compare with… selects another actually recorded encounter deliberately, ranks real time overlap and recorded geographic proximity, supports recorded callsign/registration search, and displays exactly two distinct tracks with one union time window and two compact telemetry readouts. Either track can be replaced/removed while retaining the other. Initial overview is fixed; explicit Follow names its target; pan/zoom stops Follow.
- Asynchronous Contact enrichment cannot overwrite a different selected Contact or reset active Track History on live refresh. Leaving the context disposes playback and pending requests.
- Additive migration 0011 stores source, reception time, explicit ground report, geometric altitude and reported heading for new observations. Older observations are honestly labelled when provider provenance was not recorded. Per-aircraft reported position age is distinguished from HTTP receipt time.
- Google OIDC code/PKCE/state/nonce authentication verifies an actual RSA signature and issuer/audience/expiry/nonce, checks stable allowlisted subject IDs, and gates app assets and all HTTP aviation/memory APIs. Sessions are hashed at rest. Sign-out uses a same-origin POST. Browser responses are private/no-store so cached data does not defeat sign-out. No email-based identity guess, public explorer, fixture bypass, or OAuth credential was deployed.
- Account-owned preference snapshots replace the entire last accepted snapshot. Account-owned moment bookmarks reference existing observations idempotently and cannot manufacture or delete DOAA evidence. Account-owned favourites are isolated. Account preference UI is now locally browser-tested; bookmark/gallery UI and provider sign-in acceptance remain outstanding.

## Verification and limitations

Run local regressions with:

```sh
node --test tests/*.test.cjs tests/*.test.mjs src/*.test.mjs airlabs-budget.test.cjs
node scripts/verify-preview-isolation.cjs
node scripts/build-assets.cjs
```

Run browser acceptance with an installed Playwright/Chromium or Chrome headless shell:

```sh
node scripts/browser-acceptance.cjs
```

`DOAA_CHROME_PATH` optionally selects an existing executable. The script starts its own local fixture server in the same process environment, exercises desktop 1440×900, portrait phone 393×851, short landscape 851×393 and tablet 820×1180, writes an evidence report, and closes the server/browser. Fixtures are explicitly labelled and excluded from the deployed asset package. The report identifies tested source file hashes. These are real browser interactions with deterministic observations, not live-provider/physical-Android acceptance.

The external OSM base tile provider is unavailable in this execution environment (the public endpoint returns a policy-denial tile). Geographic coordinates and truthful missing-tile state remain visible. Actual provider availability and a supported fallback require additional acceptance; do not describe the blank tile layer as a successful geographic basemap.

## Preview isolation and database safety

The old deployed Preview forwarded GET API reads to Production and served mutable assets from a different branch. The replacement config uses the actual app entrypoint, versioned allowlisted assets, and only Preview D1 `939eda3b-4894-497b-9f67-209771761b3f`; Production D1 is `434f90d3-397b-48d3-8249-4c48cf1e8936`. No service binding or automatic Preview cron is permitted.

Read the deployed bindings, not just config. Before fresh schema initialization, query `sqlite_master` on the exact Preview ID and stop unless there are no application tables. `scripts/preview-empty-schema.sql` contains only CREATE statements and matches migrations 0001–0013 applied to a local empty SQLite database. Do not run historical migrations 0002, 0005 or 0007 on existing remote data as a routine deployment: they include data repair/deletion. Fresh Preview initialization does not modify, migrate or copy Production data. Production schema changes require a reviewed backup and explicit approval.

`node scripts/build-preview-package.cjs` produces a self-contained `.preview-package.json` for connected Cloudflare multipart upload when Wrangler credentials are unavailable. It packages the same app/modules/allowlisted assets; it does not proxy Production or a mutable repository. The generated package is ignored and contains no credentials. Manual Preview workflow now verifies isolation and builds assets before deploying; no CI run is needed to use the connected API.

## Required secure configuration before signed-in Preview acceptance

The available Worker bindings have no Google OAuth client or approved Google subjects. Required private configuration: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, exact Preview-origin `GOOGLE_REDIRECT_URI` ending `/auth/callback`, and `DOAA_ALLOWED_SUBJECTS` containing David's and Brent's verified Google `sub` values. Obtain these through authorized Google project access/secure identity enrollment; never put secrets or authorization codes in chat, repository, screenshots or logs, and never guess subjects from names/emails. An unconfigured Preview deliberately shows a focused sign-in screen and returns 401 on aviation APIs.

Current session duration is bounded by the browser's 400-day cookie limit; it is not yet an indefinite/revocation-aware Google session. Server expiry, sign-out and allowlist removal are enforced. Provider security-event revocation and session renewal still need completion for Decision 106. This is an explicit remaining requirement.

## Release/rollback procedure

1. Finish every locked, non-deferred matrix row. Run regressions and connected browser acceptance, including authenticated Preview and failure/stale/privacy states.
2. Record the exact tested branch commit, source hashes, Preview version, deployed bindings and database schema. Deploy only that immutable build to Preview. No automatic migrations, paid provider activation or CI expansion.
3. Retain the immediately previous Worker version identifier and app/config artifact. To roll back an isolated Preview, deploy that version only if it preserves the private-app boundary and its own Preview D1. The old Production-forwarding proxy is not a safe acceptance environment and is not an approved rollback target.
4. Additive schema can remain through an app rollback; do not drop new columns/tables or remove original evidence. Never run a down migration that deletes user/aviation data.
5. Present the complete release evidence and exact Production deployment/schema/rollback action to the product owner. Merge/main/Production deployment and any destructive migration require explicit approval. No such approval has been requested or given in this execution.

## Remaining scope

Full Inspector facts/navigation and Airport ground/operational/airfield content; complete BIO/era/operation/media/sightings evidence; correct full Home/Explore distinction; one-hour altitude-coloured ground/airborne trails with restoration and source-quality reconciliation; private bookmark/gallery/preferences UI; universal units; MET/NAV/time exploration; complete BOARD chronology/evidence/date controls; source conflict and temporal identity revision invariants; LOOK/AMBIENT real-data acceptance. The matrix retains every lock; this list is not a replacement inventory.
