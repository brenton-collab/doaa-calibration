# Architecture, verification and release contract

## Architecture
Prefer a small modular web application deployed to free Cloudflare Worker/Assets/D1 with existing free Render relay when validated. Preserve robust domain algorithms where tests support them; replace inherited monolithic application shell and tightly coupled Inspector orchestration. No new paid service, surprise provider activation or unnecessary CI minutes.

Module responsibilities:
- **Acquisition:** provider requests, timeout/fallback, quotas, freshness and source evidence; no UI side effects.
- **Domain/evidence:** canonical airframes, observations, flights, movements, identity reconciliation, history, unit conversions and epistemic states; pure functions where possible.
- **Persistence:** D1 repositories, versioned migrations, account-scoped personal storage and historical research queues; no browser rendering.
- **Application state/navigation:** workspace, selected canonical identity, Inspector object/tab, return history, live/historical context, search context and saved live snapshot; explicit transitions.
- **SKY:** MapLibre/base geometry and aircraft/trail rendering, camera and follow state; does not own global navigation or provider polling.
- **Inspector:** typed object dossier views, independently scrollable hybrid shell, async enrichment cancellation and stale-response protection.
- **Movements:** single canonical model consumed by BOARD and Airport Movements.
- **LOOK/AMBIENT:** derived presentation of already-acquired evidence; no unbudgeted extra provider calls.
- **Accounts:** authentication, role checks, admin user management, sync status and private preferences.

## Integration defects to guard against
Current `wrangler.jsonc` uses `assets.run_worker_first=true`. The build copies `flight-core.js` and `inspector-flight.js` into `dist`, and HTML references them, but `src/worker.js` does not explicitly route those paths to `env.ASSETS.fetch`. **Source-level delivery defect; confirm live response before assigning final runtime causality.** Add a generated manifest test and deployed authenticated fetch test for every HTML asset, including dynamic imports and CSS.

Current `src/worker.js` contains acquisition, routing, authentication, history, research and asset delivery. Current `index.html` mixes navigation, map selection, Inspector and DOM state. Current `flight-enrichment.js` mixes fetching, interpretation, cache, navigation and rendering. Isolate these responsibilities before migrating interactions.

## Environments and safety
Production: Cloudflare Worker `doaa-calibration`, D1 `434f90d3-397b-48d3-8249-4c48cf1e8936`. Preview: `doaa-calibration-preview`, D1 `939eda3b-4894-497b-9f67-209771761b3f`. Render relay `doaa-adsb-relay` free service `srv-db2gjhjtqb8s73db5oh0`, auto-deploy from `main`; observed deployed relay commit `2551b3e...` may differ from newer repository main. No modifications to existing production or unrelated services without authorization. Inspect current quotas and deployment hooks before any deploy. Avoid using main for experimental relay changes. No production D1 migration until isolated validation and data-preservation plan.

## Acceptance gates
1. Reproducible local build and migration from clean DB; deterministic tests for evidence and account isolation.
2. Authentic interactive vertical slice: signed-in SKY → selected Contact → rich Inspector → cross-object navigation → Back → selection preserved. Include missing/slow enrichment and stale updates.
3. BOARD ↔ Airport Movements consistency; same canonical record, date/timezone and evidence taxonomy.
4. Source-aware stale/feed outage/recovery, one-hour trails, follow/pan/zoom, no fabricated movement.
5. Actual authenticated browser tests at phone portrait, short landscape, tablet, desktop; keyboard, touch, reduced motion, screen-reader labels, visual style review.
6. Real deployed static assets and APIs, genuine provider outage/failure paths, session persistence/logout/admin account creation and cross-user denial.
7. Preview verified with isolated D1 and zero unapproved spend; production release only after user acceptance and verified safety.

Distinguish **implemented**, **unit-tested**, **fixture browser-tested**, **preview verified**, **production verified**. Historical Work reports show 152 Node tests and four fixture viewports, but do not prove authenticated live functionality. A successful build alone is never a release gate.

## First implementation tranche
Create clean application shell and explicit navigation/state, with semantic Field Notes tokens; preserve existing acquisition and memory interfaces behind adapters. Deliver one polished signed-in SKY/Contact Inspector slice and test the actual deployed asset chain. Document real results and known limitations in this branch before broadening scope. No generic stripped-down MVP or redesign-by-accumulating-cards.
