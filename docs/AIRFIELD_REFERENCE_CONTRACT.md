# Airfield reference contract

Source: [OurAirports public-domain data](https://ourairports.com/data/) and [runway field definitions](https://ourairports.com/help/data-dictionary.html). The downloaded `runways.csv` was tested directly on 2026-10-11. Its SHA-256 is `bcc84c682d36c38e585f116855ae7f72bb590647efba354a6ae05caa2c66d533`.

The reference supplies physical-strip dimensions and surface, paired end coordinates/elevations/true headings, displaced thresholds, and dataset lighting/closure flags. It supplies no authoritative present operational status, runway-end approach facilities, declared distances, per-runway effective date, condition reports or historical changes. Those remain unknown. A listed closed strip does not establish an airport closure; a zero closure flag does not establish current open operations. Dataset length includes the full surface and is not a declared landing/takeoff distance.

The diagram uses actual paired endpoint positions in a local north-up geographic projection, with true north and scaled pavement width where supplied. Missing or degenerate endpoints do not get invented geometry. Antimeridian coordinates wrap correctly. Whole-strip selection is distinct from reciprocal end selection. Unit changes alter labels and preserve source measurements, geographic geometry and selected runway/end.

## Preparation and runtime

The full worldwide CSV is **not fetched or scanned during app requests**. A preliminary local prototype took roughly 27–38 ms to scan the downloaded source. It was replaced before publication with small D1 reference reads; no paid Worker allowance is required by the source-processing architecture. Actual Worker runtime and provider acceptance still require isolated Preview verification.

`node scripts/prepare-airfield-import.mjs source.csv output.json` performs local preparation only. It never connects to or writes a remote database. It emits structured SQL statements, source checksum, a versioned snapshot identity, record counts and the sole permitted Preview database ID. The actual source produced **41,214 airport reference records containing 48,336 runway records**. The full prepared import was applied and verified in local SQLite, including the three CYOW physical strips. No remote import was executed.

Migration `0013_airfield_reference.sql` is additive and modifies no personal, observation or encounter data. Apply it only to the verified isolated Preview database `939eda3b-4894-497b-9f67-209771761b3f` under the existing release authority. Do not apply it or import source data into Production as part of this work. The fresh-empty Preview initializer now includes the same schema.

Reference rows are staged under their snapshot ID. The final statement marks a snapshot ready only when the expected count of airport records exists. Runtime ignores pending imports and selects the latest complete snapshot. An airport absent from that snapshot does not resurrect an older reference. Missing schema or an uninitialized snapshot returns unavailable, distinct from a successfully queried snapshot containing no reference for that airport. Previous complete snapshots remain available for reviewed reference rollback; none are deleted automatically.

The frontend has failure/retry, retains selection across unit/tab changes, aborts obsolete requests and retains the last displayed reference on refresh failure with visible failure text. Browser acceptance uses a captured CYOW reference fixture and is explicitly not live-provider or authenticated Preview acceptance.

## Remaining gates

- Apply the additive schema and prepared source import only to the isolated Preview, then record the actual active snapshot and verify private authenticated reads.
- Configure Google OAuth and the two approved stable subjects without credentials in source/chat.
- Verify actual Worker runtime, source freshness/refresh procedure, visual interaction and wind direction on the deployed isolated build.
- Complete authority operational/condition reports, approaches/lighting/declared distances, runway history and evidence-linked runway activity. These are not supplied by this source and are not marked complete.
