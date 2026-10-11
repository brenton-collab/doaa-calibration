# Understanding and reuse register

Reviewed 2026-10-11. Classification: **Design** (locked intended behavior), **Source** (observed repository code), **Fixture** (historical deterministic test), **Runtime** (verified deployed configuration), **Unknown** (not yet live-proven). These categories must not be conflated.

## Sources consulted
`FIELD_NOTES_DECISIONS_2026-10-08.md` (184 indexed decisions and amendments); `DOAA_SPEC.md`; `DEV_LOG.md`; `RELEASE_EXECUTION_SAFETY_PLAN.md`; `docs/DECISION_IMPLEMENTATION_MATRIX.{md,json}`; `docs/RELEASE_RC_CHECKPOINT.md`; `docs/CHAT_HANDOFF_2026-10-11.md`; `docs/UX_PUSH_2026-10-11.md`; Inspector, SKY, Movements, Airfield and Weather contracts; main application and Worker modules; Render relay; migration and preview schema; QA fixture evidence; GitHub PR #48; Cloudflare Worker settings and Render deployment metadata. Prior historical summaries were cross-checked against current code/configuration where possible.

## Reuse/adapt/replace
| Area | Disposition | Evidence and caution |
| --- | --- | --- |
| 184 decisions, amendments and supersessions | PRESERVE | Historical canonical product intent; password auth explicitly superseded |
| D1 entities/identifiers/claims/evidence/encounters/observations | PRESERVE | Source schema supports epistemic provenance; protect production data |
| ADS-B relay/provider fallback and 30s cache | ADAPT | Source; Render live commit differs from latest main |
| D1 checkpointing and track history | ADAPT | Sampled observation record, not continuous verified flight |
| Archive research and Journey | ADAPT | Source-backed reconstruction; do not invent operational adjacency |
| Unit conversion, track/movement calculations | REUSE CANDIDATE | Pure domain tests and fixture evidence; verify semantics |
| MapLibre vector base and custom aircraft canvas | EVALUATE | Dual camera synchronization complexity; preserve cartographic quality |
| Inspector presentation and orchestration | REPLACE | Coupled global state and fallback to sparse telemetry |
| BOARD and Airport Movements shared model | ADAPT | Historical fixture tests, no guaranteed published timetable source |
| LOOK attention logic | ADAPT | Derives from current evidence, not independent acquisition |
| AMBIENT SKY/SLIDES | ADAPT | Must meet both locked compositions and evidence constraints |
| Global index.html shell/navigation | REPLACE | DOM/global state, return-context coupling |
| Password auth, sessions, personal storage | ADAPT | Source implementation; outdated generated preview schema (0013) despite password migrations 0014–0015; seven-day login |
| Google OAuth | RETIRE from new product | Superseded by user 2026-10-11 |
| Release validation | REPLACE | Fixture tests insufficient for real authenticated deployed application |

## Runtime inventory (read-only)
Cloudflare production Worker `doaa-calibration` with ASSETS, D1 `434f90d3-397b-48d3-8249-4c48cf1e8936`, password-auth secrets configured; preview Worker and isolated D1 `939eda3b-4894-497b-9f67-209771761b3f`. Worker cron every five minutes. Render free Node relay `srv-db2gjhjtqb8s73db5oh0`, auto-deploy main, observed deployment commit `2551b3e622ac0d80cd913ef67d7a517862556f59` dated 2026-10-09. PR #48 merged to main on 2026-10-11, despite stale draft-only handoff text. Historical matrix checkpoint: 0 complete, 149 partial, 34 missing, 1 blocked, **not** a fresh independent audit of every live decision.

## Unresolved checks — must be tested, not assumed
1. Authenticated live fetch of all assets; `run_worker_first=true` and missing explicit routes for flight-core/inspector-flight indicate a source-level defect. Do not call a live 404 proven until measured.
2. Exact production D1 schema, password account provisioning and safe additive migration path; generated empty-preview schema stops at 0013; migration 0015 defines `password_accounts`.
3. Full inventory of historical migrations and obsolete/legacy routes; avoid destructive cleanup before usage tests.
4. Real Google OAuth state is no longer product-relevant; verify old records only for safe transition.
5. Authenticated Inspector data availability, enrichment timing and error handling; production evidence not established.
6. Render relay deployed-versus-main code, restart/cold-start behavior, quota persistence and provider degradation.
7. MapLibre and custom canvas sync, asset licensing, airport/weather coverage, published schedule availability.
8. Account administration, persistent sessions, explicit logout UI, user isolation and revocation not yet built/verified.
9. Pixel-level visual fidelity and touch interaction against actual old/new screen captures; source decisions understood, live visual comparison outstanding.

## Rebuild principles
Preserve knowledge, source evidence and earned domain algorithms; rebuild interaction boundaries and experience deliberately. Do not confuse a live aircraft contact with a dated flight, a Sighting with a route inference, or a source count with corroboration. The user's newly locked password-auth/admin requirements are authoritative. No cost, data migration or production modification is authorized by this register.

## Next action
Implement and verify an isolated authenticated SKY → Contact Inspector slice on this branch, beginning with reproducible schema and asset delivery tests; then expand through Flight, Airframe, Airport, BOARD, LOOK and AMBIENT under the same visual and evidence contracts.
