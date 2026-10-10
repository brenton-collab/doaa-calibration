# DOAA D1 pressure audit — 2026-10-10

## Status
Production untouched by this optimization branch. First safe optimization implemented and tested in `work/d1-write-amplification`.

## Production baseline (read-only snapshot)
D1 database `doaa-memory` (~4.95 MB at inspection):
- 4,375 observations; 523 encounters
- 7,931 claims; 8,007 evidence rows
- 2,362 leads; 1,152 provider requests; 1,028 entities

These are **row counts, not billing metrics**. The diagnostic aggregate query itself read 25,378 rows; do not poll such scans. Establish actual D1 query/rows-read/rows-written time series through Cloudflare Analytics before claiming a measured reduction.

## Verified code paths
1. `/api/traffic`: fresh-cache miss invokes `checkpointObservation` for each aircraft in a fixed 80-NM Ottawa circle. Checkpoints occur after 60 seconds OR changes to callsign, registration, type, squawk, altitude >=500 ft, speed crossing 50 kt, or displacement >2 NM. Every qualifying checkpoint invokes `/memory/observe`, which can read and write multiple tables and reconcile encounters. Cache entries expire after 180 seconds. This is likely the main amplification path, but frequency has not yet been measured.
2. `/api/board`: reads quota state; on successful relay response schedules `drainProviderEvents` and `drainRelayHarvest`. Each provider event writes a request row and potentially provider state. Prior code **also wrote a cursor after every event**.
3. `drainRelayHarvest`: saves the harvest cursor after each item and persists enrichment through `/memory/ingest`. Changing checkpoint frequency here requires verifying replay/idempotency of claim/evidence writes.
4. Scheduled every five minutes: `processHistoryLeads` queries leads and may run expensive history resolution.
5. User-triggered dossier, search, journey, investigation, and favorite actions also access D1; these should not be disabled blindly.

## Implemented safe optimization
`drainProviderEvents` now saves its request cursor **once per processed page** (up to 100 items), rather than once per event. Each event is still durably inserted first; request fingerprints are unique and use `INSERT OR IGNORE`, so a crash before the page checkpoint causes safe replay rather than silent omission.

Synthetic test against the actual extracted function: 100 events -> 100 persistence calls, **one cursor write instead of 100**. Injected failure on item 50 -> no cursor advancement, permitting replay. This is a **98–99% reduction in cursor writes for full pages**, not a claim of equivalent overall D1 savings.

## Measured production usage (Cloudflare D1 Analytics)
For October 9–10 UTC, the production database reported **94,907 read queries**, **58,359 write queries**, **7,480,985 rows read**, and **159,701 rows written**. These metrics span a period with unusually high activity and are not a steady-state daily projection.

At 02:00 UTC on October 9, D1 reported 2,266 read queries and 282,065 rows read, but only six write queries. In subsequent idle hours it repeatedly reported 12 read queries and 61,740 rows read per hour, consistent with a five-minute cron scanning leads. Correlation is not full query attribution.

**Direct query comparison on the same live database (read-only):**
- Existing `/memory/leads?limit=2` SQL: **7,068 rows read**, returned two registration leads, neither actionable by `processHistoryLeads`.
- New targeted `/memory/leads?limit=2&type=airframe-day-history` SQL: **9 rows read**, returned zero actionable leads.
- This is a **99.87% reduction in rows read per idle cron lookup** under the measured dataset, while preserving the five-minute schedule and history-lead throughput.
- There are **no pending history leads** at inspection; seven history leads are resolved. Thousands of other pending leads remain intentionally untouched by the history-only processor.

## Second safe optimization
`processHistoryLeads` now requests `type=airframe-day-history`; `/memory/leads` uses a selective SQL query for that type. Its original unfiltered behavior remains available to other consumers. No schema migration and no cron cadence change.

## Next gate: quantify before changing observation semantics
- Obtain D1 Analytics usage trend and correlate with traffic requests, board requests, and cron frequency.
- Introduce a separate short-lived working-state layer or bounded per-aircraft write budget. Preserve meaningful encounter first/last sightings and turning points; avoid unconditional 60-second writes.
- Audit provider-harvest replay semantics before batching its cursor.
- Consider Home as a *retention relevance* preference, not the primary database throttling mechanism.
- Exercise full aircraft map, board, flight dossier, and history paths on isolated preview before production deployment.

## Rollback
Revert the single `src/worker.js` cursor-batching change; no schema migration or persistent state changes are required.
