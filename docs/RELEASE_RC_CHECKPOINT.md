# Release execution checkpoint — 2026-10-11

**Not a finished product or an accepted release candidate.** Full contract and current disposition: `DECISION_IMPLEMENTATION_MATRIX.json`. Work branch: `work/product-recovery-mobile-sky`; draft PR #48. Production/main are unchanged. No GitHub Actions runs were requested.

## Implemented and locally verified in the first execution batch

- Contact Track History now uses the actual encounter/ICAO24-restricted observation API, chronological keyset pages, an actual geographic projection, coordinate grid and external base tiles, altitude and groundspeed charts, one shared absolute-time scrubber, actual observation timestamps and provider labels.
- Playback uses monotonic elapsed time multiplied by the selected speed, pauses when context is disposed, stops at the final observation by default, and has an opt-in Loop. No historical position or telemetry interpolation. A sample is explicitly retained for up to 30 seconds; unsupported gaps have no aircraft or instantaneous telemetry. Geometry splits at observation gaps above 90 seconds. Connectors are observed-sample connectors, not reconstructed flight paths.
- Literal callsign/transponder/ground-report changes jump map and charts to the actual changed observation. No inferred takeoff, landing or emergency event is created.
- Compare with… selects another actually recorded encounter deliberately, ranks real time overlap and recorded geographic proximity, supports recorded callsign/registration search, and displays exactly two distinct tracks with one union time window and two compact telemetry readouts. Either track can be replaced/removed while retaining the other. Initial overview is fixed; explicit Follow names its target; pan/zoom stops Follow.
- Asynchronous Contact enrichment cannot overwrite a different selected Contact or reset active Track History on live refresh. Leaving the context disposes playback and pending requests.
- Additive migration 0011 stores source, reception time, explicit ground report, geometric altitude and reported heading for new observations. Older observations are honestly labelled when provider provenance was not recorded. Per-aircraft reported position age is distinguished from HTTP receipt time.
- Google OIDC code/PKCE/state/nonce authentication verifies an actual RSA signature and issuer/audience/expiry/nonce, checks stable allowlisted subject IDs, and gates app assets and all HTTP aviation/memory APIs. Sessions are hashed at rest. Sign-out uses a same-origin POST. Browser responses are private/no-store so cached data does not defeat sign-out. No email-based identity guess, public explorer, fixture bypass, or OAuth credential was deployed.
- Account-owned preference snapshots replace the entire last accepted snapshot. Account-owned moment bookmarks reference existing observations idempotently and cannot manufacture or delete DOAA evidence. Account-owned favourites are isolated. These APIs still require their full product UI and provider sign-in acceptance.

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

Read the deployed bindings, not just config. Before fresh schema initialization, query `sqlite_master` on the exact Preview ID and stop unless there are no application tables. `scripts/preview-empty-schema.sql` contains only CREATE statements and matches migrations 0001–0012 applied to a local empty SQLite database. Do not run historical migrations 0002, 0005 or 0007 on existing remote data as a routine deployment: they include data repair/deletion. Fresh Preview initialization does not modify, migrate or copy Production data. Production schema changes require a reviewed backup and explicit approval.

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
