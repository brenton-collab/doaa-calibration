# DOAA WORK to CHAT handoff — 2026-10-11

Brent asked to conserve WORK credit for implementation, execution and browser verification, and return work that does not benefit from those capabilities to CHAT. This is a bounded checkpoint, not completion of the 184 decisions.

## Ownership and recovery

Repository: brenton-collab/doaa-calibration. Only writable branch: `work/product-recovery-mobile-sky`; draft PR #48. Parent before this batch: `3d4193a50750f2396661de2fd52c80db176175f7`. The commit containing this document is the Inspector checkpoint. Read the canonical FIELD_NOTES_DECISIONS_2026-10-08.md, DOAA_SPEC.md, RELEASE_EXECUTION_SAFETY_PLAN.md and decision matrix before changing product scope. Preserve all existing changes; do not reset to an older branch or assume main has this implementation.

## WORK implementation preserved in this checkpoint

- Shared Flight timing/progress model and UI: full UTC dates, separate departure/arrival actual and estimated punctuality, explicit event bases, takeoff-based airborne duration, source freshness, independent telemetry and sourced north-up airport/aircraft geometry. Route association alone does not establish a current assignment or justify a progress marker.
- Contact opens with immediate facts and telemetry. Tabs reuse the loaded dossier; loading, failure and retry states are explicit. Airframe identity/BIO retain unknowns and conflicts, separate source-qualified milestones from undated claims, and distinguish latest known operation from the last DOAA sighting.
- Recorded Sightings open their actual encounter Contact and Track History; live refresh must not replace that historical context. Late asynchronous enrichment must not overwrite a subsequently opened Airport.
- Rack summaries no longer acquire dossiers. Account-scoped bounded caches coalesce dossier and favourite reads. Inspector dossier GET performs no automatic claim/media/history research writes and uses at most one bounded free lookup. This protection applies to this code path, not every existing research endpoint.
- Worker source normalization retains documented airport coordinates, source/retrieval metadata and unresolved current-assignment status. Free lookup responses are bounded to 256 KiB with a four-second timeout.

## Verification and evidence

141 Node tests passed against the final Inspector source, including real local SQLite read-budget tests that assert no writes and bounded provider calls. Final four-viewport browser fixture verification passed at 2026-10-11T17:33:34.671Z and is preserved in `docs/qa/flight-airframe-acceptance.json`; all source hashes matched final source. Timing/Progress screenshots were visually inspected at all four sizes. Short landscape requires content scrolling and scrollable tabs. Earlier browser runs passed before the final historical-navigation changes and must not be substituted for final acceptance. Fixtures are deterministic offline evidence, not signed-in Preview or live-provider acceptance. See release checkpoint for final browser disposition.

## CHAT work that can proceed without WORK

1. Review the canonical requirements and evidence register; reconcile remaining product priorities without inventing completion. Draft a coherent BOARD/Airport Movements contract: shared timeline, date navigation, arrival/departure filters, and explicit Published/Recorded/Inferred evidence. Observed encounter windows are not completed flights.
2. Resolve the sign-in choice with available authorized configuration. Google code exists; Preview lacks OAuth secrets/client configuration and Brent/David's approved stable Google subject IDs. No new Google accounts are required. Brent accepts database-backed username/password as a fallback; it is not implemented. Do not put secrets, passwords or authorization codes in the public repository or chat.
3. Review lawful free schedule and airframe-history sources, their limits and attribution. No zero-cost published schedule feed has been verified. AirLabs remains disabled; do not assume a quota reset or activate a paid provider.
4. Refine acceptance scenarios and reconcile documentation. Return actual code/runtime/browser/deployment work to WORK where available. CHAT with suitable tools may implement under the same boundaries, but cannot treat a written proposal as verified execution.

## Remaining engineering and release gates

Full BOARD chronology, comprehensive operation history, BIO eras, technical reference content and licensed media, MET/NAV/time exploration, source conflict/identity revision invariants, full trail reconciliation and real provider/device acceptance remain open. The matrix is authoritative; no row is made complete merely by this batch. Finish private authenticated Preview acceptance before release. Username/password fallback requires implementation and security verification if selected.

## D1 and publication constraints

No remote D1 writes, imports, migrations or deployment occurred in this Inspector batch. The earlier read-only Preview schema query reported 90 rows read, zero written, unchanged database. All import/schema/read-budget verification described here used local SQLite. New runtime query protections are branch code and have not been deployed.

Preview D1: `939eda3b-4894-497b-9f67-209771761b3f`. Production D1: `434f90d3-397b-48d3-8249-4c48cf1e8936`. Latest binding inspection confirmed Preview's own DB, with no Google configuration. Its existing schema includes 0001–0012; 0013 reference is not applied. Do not run the empty-schema initializer or destructive historical migrations against it. Default airport preparation is five airports/twelve runway records, local only; SQL statement count is not billed row/index write count. Review exact remote quota effects before any import or schema action. Do not poll D1 to refresh documentation.

No main merge, Production deployment, paid activation, destructive migration or automatic Actions run is authorized. Publish only this authorized work branch, retain the draft PR, and verify the connected tree equals the tested local tree. Production remains unchanged.
