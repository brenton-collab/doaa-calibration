# DOAA — Integrated Release Execution and Safety Plan
Status: PLANNING BASELINE, not implementation approval or release acceptance.
Date: 2026-10-10. Owner: Sage (technical execution); product direction: user.
Read with DOAA_SPEC.md, FIELD_NOTES_DECISIONS_2026-10-08.md (Decisions 1–184), and DEV_LOG.md. Those documents are canonical; this file coordinates their execution, not a substitute for them.

## 1. Non-negotiable release definition
One cohesive Ottawa aviation instrument. The next release gate includes SKY, BOARD, LOOK, Aircraft/Flight/Airport Inspectors, evidence-backed observational memory, AMBIENT SKY, and AMBIENT SLIDES. OPS, PATTERNS and advanced Replay are retained in the specification but are not release blockers. A feature is not complete because its design is documented, code compiles, or deployment exists.

## 2. Evidence and change-control rules
Before changing code: inspect actual main-branch code, tests, configuration, recent commits, deployment version, available provider contracts, production quota/usage and current UI. Build a decision-to-implementation traceability inventory with explicit states: designed, implemented, automated-tested, manually-tested, deployed, production-verified. Record discrepancies and dependencies in DEV_LOG.md. Do not treat user-reported bugs as reproduced until verified. Preserve all 184 design decisions; if decisions conflict in combination, document conflict and seek product direction only for consequential changes.
No production data, schema, provider, infrastructure, domain, billing or deployment changes during audit. Before any later write: document intended effect, backup/rollback path, quota/cost exposure and validation gate. No surprise spending, unnecessary GitHub Actions runs, unrelated resource modifications or secret exposure.

## 3. Shared backend truth contracts (must be established before surface-specific polish)
Trace provider -> acquisition relay -> normalization -> source/confidence/observation timestamps -> cache/API -> durable D1 observation/encounter -> client view. Validate provenance, timestamp semantics, freshness, uncertainty, identity reassignment, airframe-vs-flight distinctions, airport-specific BOARD acquisition, spatial SKY catchment, and deduplication. External research must not create encounters. Every displayed field must be sourced or explicitly labelled as inference/unknown; stale live data must never be silently presented as current. Preserve historical corrections and avoid invented trajectory/flight chronology. Handle provider unavailability, partial failures, rate limits, zero traffic vs zero data, duplicate events, replays, and client disconnection with bounded retries and honest UX.
Confirm D1 read/write usage after recent efficiency work and collector behaviour; do not assume a successful index migration proves sustainable quota consumption. Prefer reuse of existing cached Media, with valid specificity, licences, attribution and photo-date separation; no per-slide paid or redundant acquisition.

## 4. Cohesive UX and cross-feature invariants
Treat SKY, BOARD, LOOK, Inspectors, observational memory and AMBIENT as one product with common typography, semantic tokens, information hierarchy, datum grammar, navigation, status/freshness indicators, transitions, accessibility and failure states. SKY uses directional half-arrow charting markers, not silhouettes. Validate navigation across all entry points and return paths, touch targets, keyboard and screen-reader semantics, portrait/landscape layouts, old-tablet performance and reduced motion.
AMBIENT may be entered explicitly or after inactivity, without interrupting active reading; touch returns to interactive SKY. David explicitly selects SKY or SLIDES composition; no automatic switching between compositions. AMBIENT SKY remains evidence-driven and quiet. SLIDES uses cached, properly attributable photos of actually observed eligible airframes; photo upper ~2/3 softly gradients into lower ~1/3 airframe/flight information. Prefer live eligible aircraft, then recent sightings; distinguish LIVE/LAST SEEN. Within SLIDES, meaningful aviation events may change slides, gently rate-limited to prevent visual chatter. Do not fabricate activity, identity or images. Ensure static-screen/burn-in safeguards.

## 5. Dependency-aware implementation gates
G0 — Baseline and inventory: inspect repository and live deployments read-only; enumerate 184 decision mappings and current defects; capture reproducible fixtures and browser/device baseline. Exit: evidence-backed implementation matrix and prioritized dependency map.
G1 — Data truth and stability: fix shared acquisition, normalization, identity, timestamps, BOARD flight classifications, persistence, usage and error semantics first. Exit: deterministic regression fixtures, no known critical false aviation claims, bounded resource usage, proven fallback states.
G2 — Shared interaction and visual foundation: tokens, responsive shells, Inspector grammar, navigation and status states. Exit: desktop/mobile/landscape flows checked as one journey, not isolated screenshots.
G3 — Complete interactive release journey: SKY -> selection -> Inspectors; BOARD -> flight -> investigation; LOOK -> evidence; observations -> memory. Exit: realistic end-to-end flows, accessible loading/empty/error paths, no fake controls.
G4 — AMBIENT integration: SKY and SLIDES reuse G1 contracts and cached media; test entry/exit, mode persistence, event-trigger pacing, idle behaviour, photo licensing/attribution, device constraints. Exit: old-device-oriented sustained-session checks and no new uncontrolled provider calls.
G5 — Release verification: targeted automated suite, manual regression across viewport/device classes, production HTTP/data inspection, cost/quota trends, deployment and rollback validation. Only then describe release as complete.

## 6. Test and safety matrix
Backend: fixture-based provider payloads, source conflict, stale/unknown states, ARR/DEP classification, identity corrections, duplicate write suppression, data-less vs traffic-less response, D1 query plans and consumption trend, memory collection without browser, error/retry boundaries.
Frontend: SKY half-arrow heading and stale treatment, map hit targets, Inspector header/close/readability, BOARD links, LOOK explanations, data provenance, mobile/tablet/desktop and landscape, dark/light themes, keyboard/reduced motion.
Ambient: manual/idle activation, no idle switch during active use, explicit SKY/SLIDES selection, returning to SKY, event-driven slide changes, quiet periods, stale observation labels, photo relevance/licence/attribution, image failures, network loss, screen longevity and memory/performance.
Release: compare deployed asset/version to commit, exercise realistic live routes, monitor errors and D1/relay/provider quotas. Successful CI or Worker version alone is insufficient.

## 7. Risk register and stop conditions
Known open risks as of planning: post-2026-10-10 Cloudflare UI interaction verification incomplete; D1 aggregate usage after index/write-efficiency work unmeasured; BOARD/Journey/Inspector regressions previously reported; possible source-confidence and media mapping leaks; historical repository exposure of near-home coordinates requires a deliberate privacy/history strategy. Verify before marking resolved.
Stop changes if a source contract cannot be defended, a regression risks false live aviation claims, costs/quotas are unknown or exceeded, migration lacks recovery path, or an external deployment cannot be verified. Roll back the specific change where feasible, preserve evidence, and update DEV_LOG.md.

## 8. Execution record
At every gate, append to DEV_LOG.md: baseline SHA and deployed version, evidence inspected, changes/commits, tests and real interactions actually run, unresolved risks, quota impact, rollback reference, and next step. Distinguish planned, code written, merged, deployed, and verified. Protect secrets and private coordinates in documentation and history.

## 9. Immediate next action
Read-only G0 inventory of code, configuration, tests, actual connected deployment and decision coverage. Produce a traceability matrix and risk-ranked work order before making application or infrastructure changes. This planning commit uses [skip ci] and does not modify application code or production resources.
