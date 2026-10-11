# Decision implementation matrix

This is the complete implementation contract and evidence register, not a completion claim. Machine-readable source: `DECISION_IMPLEMENTATION_MATRIX.json`.

Baseline: `3e6aa0ff98aaf02ac570c19a63625673bf4ad42a`; 85 Node tests passed. No Preview/browser/Production acceptance at audit.

## Contradictions and supersessions

- Numbering: the source explicitly labels Decisions 21–184. The first 20 entries are indexed by their first-appearance order in Locked design review decisions. Six additional unnumbered BOARD locks before Decision 21 are retained as amendments to Decision 19. This mapping is explicit editorial traceability, not a claim that absent original numbers were present.
- Decision 176 supersedes Decision 15 tab inventory; retain Decision 15 content obligations. Decision 177 supersedes Decision 18 tab inventory; retain Airport/runway obligations.
- Decision 128 supersedes Decision 125 full-flight map extent with rolling one-hour trails. Decision 152 narrowly supersedes Decision 133 for subpixel-only rendering jitter.
- Decisions 159/161 supersede Decision 83 routine marker conflict badge and normal expandable scoring breakdown; preserve conflict evidence and concise details. Decision 165 supersedes withholding all degraded positions in Decision 82.
- Decision 59 qualifies Decision 57 lightning as observed flash density, not strike points. No invented point feed.
- Decision 103/105 supersedes all anonymous application/favourites behavior. Decision 104 clarification requires two initially approved Google subjects, not guessed emails.
- Current assignment explicitly makes Decisions 25–32 release requirements despite Decision 179 deferring advanced general Replay. OPS and PATTERNS remain explicitly outside the release gate.
- Older SPEC dark theme, five permanent Inspector tabs, airborne-only BOARD, fixed historical status and preview-isolation assertions are superseded by latest locks and observed runtime facts.
- Preview audit: deployed doaa-calibration-preview is a PRODUCTION_API proxy with no D1; its nominal preview database exists but is not bound. Must replace with isolated application Preview before integration.

## Inventory

| Decision | Status | Release | Requirement | Evidence / code | Work / verification |
|---|---|---|---|---|---|
| 1 | partial | Required | Inspector viewport: HYBRID (locked). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 2 | partial | Required | Visual language: C — Hybrid editorial/modular (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 3 | partial | Required | Inspector tabs: shared core plus contextual tabs (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 4 | partial | Required | Data presentation and normalization (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs; scripts/browser-acceptance.cjs — 2026-10-11 continuation: Separated datum value, independent explanation and accessible favourite buttons; no nested buttons, contextual bounded back stack, async cross-object request guards and unknown vertical-rate label. Real airframe/airport/flight facts navigate explicitly. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md. | Finish Inspector datum/source content and all cross-surface navigation; verify failure/identity revisions and actual signed-in Preview. Interaction grammar remains partial beyond the tested existing surfaces. |
| 5 | partial | Required | Interaction grammar and accessibility (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs; scripts/browser-acceptance.cjs — 2026-10-11 continuation: Separated datum value, independent explanation and accessible favourite buttons; no nested buttons, contextual bounded back stack, async cross-object request guards and unknown vertical-rate label. Real airframe/airport/flight facts navigate explicitly. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md. | Finish Inspector datum/source content and all cross-surface navigation; verify failure/identity revisions and actual signed-in Preview. Interaction grammar remains partial beyond the tested existing surfaces. |
| 6 | partial | Required | Media, attribution and evidence pills (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 7 | partial | Required | Inspector universal navigation: Overview only (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs; scripts/browser-acceptance.cjs — 2026-10-11 continuation: Separated datum value, independent explanation and accessible favourite buttons; no nested buttons, contextual bounded back stack, async cross-object request guards and unknown vertical-rate label. Real airframe/airport/flight facts navigate explicitly. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md. | Finish Inspector datum/source content and all cross-surface navigation; verify failure/identity revisions and actual signed-in Preview. Interaction grammar remains partial beyond the tested existing surfaces. |
| 8 | partial | Required | Airframe contextual tabs and terminology (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 9 | partial | Required | Flight Inspector refinement (design direction, pending final tab lock; 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 10 | partial | Required | Flight Inspector additional requirements (design direction, pending Flight tab lock; 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 11 | partial | Required | Contact flight phase and interesting behaviours (design direction, 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 12 | partial | Required | SKY first-click Contact composition and Flight ownership (approved 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 13 | partial | Required | Journey presentation (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 14 | partial | Required | Flight identity richness and Explore consistency (design refinement, pending final Flight lock; 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 15 | partial | Required | Flight Inspector composition and tabs (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 16 | partial | Required | Airfield Overview operational status and METAR (design refinement, 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 17 | partial | Required | Airfield hero and runway interaction (approved 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 18 | partial | Required | Airfield tabs (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs; airport-weather.js; tests/airport-weather.test.cjs; tests/airport-api.test.cjs; scripts/browser-acceptance.cjs; airfield.js; src/airfield.mjs; migrations/0013_airfield_reference.sql; scripts/prepare-airfield-import.mjs; tests/airfield-source.test.mjs — 2026-10-11 Airfield continuation (partial): Airfield now has sourced endpoint diagram, physical-strip/end selection, unit conversion and visible reference failure/retry. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance. | Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state. |
| 19 | partial | Required | Movements and BOARD unified architecture (locked design direction 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs; airport-weather.js; tests/airport-weather.test.cjs; tests/airport-api.test.cjs; scripts/browser-acceptance.cjs; airfield.js; src/airfield.mjs; migrations/0013_airfield_reference.sql; scripts/prepare-airfield-import.mjs; tests/airfield-source.test.mjs — 2026-10-11 Airfield continuation (partial): Prepared public reference snapshot uses separate D1 tables and cannot manufacture movement, runway assignment or observation evidence. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance. | Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state. |
| 20 | partial | Required | Movements time navigation and evidence classes (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Unify canonical movement records and timelines; separate Home/Explore; add date/evidence/runway navigation and sourced Airport conditions/geometry. |
| 21 | partial | Required | Decision 21 — tiered operational-event emphasis (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Unify canonical movement records and timelines; separate Home/Explore; add date/evidence/runway navigation and sourced Airport conditions/geometry. |
| 22 | partial | Required | Decision 22 — Catchment Selector as shared airport context (approved design direction 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs; catchment-core.js; tests/units-catchment.test.cjs; scripts/browser-acceptance.cjs — 2026-10-11 continuation: Saved Home/radius and session exploration are separate; SKY and BOARD share active context; setting Home preserves exploration, Return Home restores default radius, fresh launches restore Home, recent exploration persists. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md. | Signed-in Preview acceptance and remote-account preference refresh acceptance; preserve MET/NAV resume as those layers are implemented. |
| 23 | partial | Required | Decision 23 — return Home on launch (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs; catchment-core.js; tests/units-catchment.test.cjs; scripts/browser-acceptance.cjs — 2026-10-11 continuation: Saved Home/radius and session exploration are separate; SKY and BOARD share active context; setting Home preserves exploration, Return Home restores default radius, fresh launches restore Home, recent exploration persists. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md. | Signed-in Preview acceptance and remote-account preference refresh acceptance; preserve MET/NAV resume as those layers are implemented. |
| 24 | partial | Required | Decision 24 — Contact Inspector tabs (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Add encounter-scoped observed samples, geographically grounded map and shared telemetry/time cursor; real interval playback; deliberate two-aircraft comparison, union clock, follow and loop. |
| 25 | partial | Required | Decision 25 — synchronized Track History map and charts (locked 2026-10-10). | track-core.js; track-history.js; track-history.css; src/track-history.mjs; flight-enrichment.js; tests/track-playback.test.cjs; tests/track-history-api.test.mjs; scripts/browser-acceptance.cjs; units.js — 2026-10-11 continuation: Unit changes preserve replay time/positions, update altitude/speed chart values and labels, and change readouts without altering stored samples. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md. | Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch. |
| 26 | partial | Required | Decision 26 — Track History playback (locked 2026-10-10). | track-core.js; track-history.js; track-history.css; src/track-history.mjs; flight-enrichment.js; tests/track-playback.test.cjs; tests/track-history-api.test.mjs; scripts/browser-acceptance.cjs; units.js — 2026-10-11 continuation: Unit changes preserve replay time/positions, update altitude/speed chart values and labels, and change readouts without altering stored samples. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md. | Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch. |
| 27 | partial | Required | Decision 27 — multi-aircraft Compare Tracks (locked 2026-10-10). | track-core.js; track-history.js; track-history.css; src/track-history.mjs; flight-enrichment.js; tests/track-playback.test.cjs; tests/track-history-api.test.mjs; scripts/browser-acceptance.cjs — Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised. | Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch. |
| 28 | partial | Required | Decision 28 — Compare Tracks exactly two aircraft (locked 2026-10-10). | track-core.js; track-history.js; track-history.css; src/track-history.mjs; flight-enrichment.js; tests/track-playback.test.cjs; tests/track-history-api.test.mjs; scripts/browser-acceptance.cjs — Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised. | Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch. |
| 29 | partial | Required | Decision 29 — Compare Tracks second-aircraft picker (locked 2026-10-10). | track-core.js; track-history.js; track-history.css; src/track-history.mjs; flight-enrichment.js; tests/track-playback.test.cjs; tests/track-history-api.test.mjs; scripts/browser-acceptance.cjs — Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised. | Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch. |
| 30 | partial | Required | Decision 30 — full combined Compare Tracks playback window (locked 2026-10-10). | track-core.js; track-history.js; track-history.css; src/track-history.mjs; flight-enrichment.js; tests/track-playback.test.cjs; tests/track-history-api.test.mjs; scripts/browser-acceptance.cjs — Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised. | Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch. |
| 31 | partial | Required | Decision 31 — hybrid Track History / Compare Tracks camera (locked 2026-10-10). | track-core.js; track-history.js; track-history.css; src/track-history.mjs; flight-enrichment.js; tests/track-playback.test.cjs; tests/track-history-api.test.mjs; scripts/browser-acceptance.cjs — Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised. | Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch. |
| 32 | partial | Required | Decision 32 — optional replay loop (locked 2026-10-10). | track-core.js; track-history.js; track-history.css; src/track-history.mjs; flight-enrichment.js; tests/track-playback.test.cjs; tests/track-history-api.test.mjs; scripts/browser-acceptance.cjs — Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised. | Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch. |
| 33 | partial | Required | Decision 33 — Airframe BIO hybrid dossier and life timeline (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 34 | partial | Required | Decision 34 — curated, era-based Airframe BIO timeline (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 35 | partial | Required | Decision 35 — full Airframe BIO technical specifications (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 36 | partial | Required | Decision 36 — Airframe Operations reuses shared chronological timeline (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 37 | partial | Required | Decision 37 — comprehensive Airframe Operations timeline (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 38 | partial | Required | Decision 38 — cross-source Airframe Operations portrait and timeline (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 39 | partial | Required | Decision 39 — shared provenance pills in Airframe Operations (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 40 | partial | Required | Decision 40 — Airframe Sightings uses encounter-focused shared timeline (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 41 | partial | Required | Decision 41 — coherent encounter grouping for Sightings (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 42 | missing | Required | Decision 42 — Airframe Sightings geographic footprint (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 43 | partial | Required | Decision 43 — Airframe Media exact and reference imagery, linked to BIO eras (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 44 | partial | Required | Decision 44 — Airframe Media gallery and By era views (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 45 | partial | Required | Decision 45 — Airframe Overview operational and sighting summaries (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 46 | partial | Required | Decision 46 — Airfield Overview hierarchy, Condition/State distinction and contextual status pills (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs; airfield.js; src/airfield.mjs; migrations/0013_airfield_reference.sql; scripts/prepare-airfield-import.mjs; tests/airfield-source.test.mjs — 2026-10-11 Airfield continuation (partial): Diagram includes reference-listed closure only with current status unverified; airport operational status remains unknown. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance. | Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state. |
| 47 | partial | Required | Decision 47 — two-level interactive runway investigation (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs; airfield.js; src/airfield.mjs; migrations/0013_airfield_reference.sql; scripts/prepare-airfield-import.mjs; tests/airfield-source.test.mjs — 2026-10-11 Airfield continuation (partial): North-up diagram uses actual OurAirports paired endpoint positions and sourced pavement widths, with missing geometry excluded and antimeridian wrapping. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance. | Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state. |
| 48 | partial | Required | Decision 48 — full Runways technical dossier with historical changes (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs; airfield.js; src/airfield.mjs; migrations/0013_airfield_reference.sql; scripts/prepare-airfield-import.mjs; tests/airfield-source.test.mjs — 2026-10-11 Airfield continuation (partial): Physical and selected-end reference fields retain dimensions/surface, true heading, elevation and displaced threshold; approach facilities, declared distances and historical changes remain unknown. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance. | Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state. |
| 49 | partial | Required | Decision 49 — whole-runway selection with distinct runway-end dossiers (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs; airfield.js; src/airfield.mjs; migrations/0013_airfield_reference.sql; scripts/prepare-airfield-import.mjs; tests/airfield-source.test.mjs — 2026-10-11 Airfield continuation (partial): One physical strip with reciprocal end selection; selected strip and end persist across tabs and units. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance. | Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state. |
| 50 | missing | Required | Decision 50 — runway-specific recent activity and Movements deep link (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Unify canonical movement records and timelines; separate Home/Explore; add date/evidence/runway navigation and sourced Airport conditions/geometry. |
| 51 | partial | Required | Decision 51 — Airfield weather dashboard and runway-relative wind indicator (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs; airport-weather.js; tests/airport-weather.test.cjs; tests/airport-api.test.cjs; scripts/browser-acceptance.cjs; airfield.js; src/airfield.mjs; migrations/0013_airfield_reference.sql; scripts/prepare-airfield-import.mjs; tests/airfield-source.test.mjs — 2026-10-11 Airfield continuation (partial): Diagram can plot a sourced true-direction wind indicator with freshness; variable wind is explicitly not plotted as a single direction. No active-runway inference. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance. | Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state. |
| 52 | missing | Required | Decision 52 — time-selectable Airfield Stats activity summary (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Unify canonical movement records and timelines; separate Home/Explore; add date/evidence/runway navigation and sourced Airport conditions/geometry. |
| 53 | partial | Required | Decision 53 — Airfield Condition is physical ground/runway condition (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs; airport-weather.js; tests/airport-weather.test.cjs; tests/airport-api.test.cjs; scripts/browser-acceptance.cjs — 2026-10-11 Airport continuation (partial): Overview and Operations explicitly state No current condition report available; never infer ground condition from METAR or missing reports. Local tests and browser fixture evidence: docs/qa/airport-inspector-acceptance.json. No live-provider or signed-in Preview acceptance. | Remaining full contract: sourced runway geometry/end dossiers, state/condition notices, weather/forecast/map relationship, historical canonical deduplicated movement model and actual private Preview acceptance. |
| 54 | partial | Required | Decision 54 — Airfield State operational availability and advisories (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; src/board-schedule.mjs; airport-weather.js; tests/airport-weather.test.cjs; tests/airport-api.test.cjs; scripts/browser-acceptance.cjs — 2026-10-11 Airport continuation (partial): Overview/Operations show Unknown operational status and explicitly distinguish absent notices from evidenced open operations. Authority notices/state hero remain unimplemented. Local tests and browser fixture evidence: docs/qa/airport-inspector-acceptance.json. No live-provider or signed-in Preview acceptance. | Remaining full contract: sourced runway geometry/end dossiers, state/condition notices, weather/forecast/map relationship, historical canonical deduplicated movement model and actual private Preview acceptance. |
| 55 | partial | Required | Decision 55 — universal units (locked 2026-10-10). | index.html; src/worker.js; vector-base.js; units.js; flight-enrichment.js; track-history.js; look.js; ambient.js; tests/units-catchment.test.cjs; airport-weather.js; tests/airport-weather.test.cjs; tests/airport-api.test.cjs; scripts/browser-acceptance.cjs; airfield.js; src/airfield.mjs; migrations/0013_airfield_reference.sql; scripts/prepare-airfield-import.mjs; tests/airfield-source.test.mjs — 2026-10-11 Airfield continuation (partial): Runway dimensions/elevation/threshold labels use independent feet/metres preference; geometry and selection remain unchanged. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance. | Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state. |
| 56 | missing | Required | Decision 56 — optional SKY NAV aeronautical overlay (locked 2026-10-10). | index.html; src/worker.js; vector-base.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection. |
| 57 | missing | Required | Decision 57 — SKY MET mode with historical playback, forecasts and lightning from initial release (locked 2026-10-10). | index.html; src/worker.js; vector-base.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection. |
| 58 | missing | Required | Decision 58 — unified MET time navigator (locked 2026-10-10). | index.html; src/worker.js; vector-base.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection. |
| 59 | missing | Required | Decision 59 — ECCC-first modular MET data-source strategy (locked 2026-10-10). | index.html; src/worker.js; vector-base.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection. |
| 60 | missing | Required | Decision 60 — synchronized historical aircraft and MET playback (locked 2026-10-10). | index.html; src/worker.js; vector-base.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection. |
| 61 | missing | Required | Decision 61 — time-aware historical aircraft Inspector in MET (locked 2026-10-10). | index.html; src/worker.js; vector-base.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection. |
| 62 | missing | Required | Decision 62 — contextual MET weather inspection (locked 2026-10-10). | index.html; src/worker.js; vector-base.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection. |
| 63 | missing | Required | Decision 63 — user-oriented grouped MET layer controls (locked 2026-10-10). | index.html; src/worker.js; vector-base.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection. |
| 64 | missing | Required | Decision 64 — SKY three-part map controls (locked 2026-10-10). | index.html; src/worker.js; vector-base.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection. |
| 65 | missing | Required | Decision 65 — context-preserving SKY TRAFFIC/MET mode switching (locked 2026-10-10). | index.html; src/worker.js; vector-base.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection. |
| 66 | partial | Required | Decision 66 — SKY fresh-launch versus in-session resume (locked 2026-10-10). | index.html; src/worker.js; vector-base.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection. |
| 67 | partial | Required | Decision 67 — unified, entity-centered, relationship-aware SKY search (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context. |
| 68 | partial | Required | Decision 68 — persistent structured search investigation workspace (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context. |
| 69 | partial | Required | Decision 69 — time-independent search with optional contextual filters (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context. |
| 70 | partial | Required | Decision 70 — evidence-backed search autocomplete and local recent searches (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context. |
| 71 | partial | Required | Decision 71 — progressive categorized search results with honest counts (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context. |
| 72 | partial | Required | Decision 72 — evidence-qualified identity matching in unified search (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context. |
| 73 | partial | Required | Decision 73 — identity-anchored, time-contextual search navigation (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context. |
| 74 | partial | Required | Decision 74 — adaptive chronological search exploration (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context. |
| 75 | partial | Required | Decision 75 — historical search preview before workspace transition (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context. |
| 76 | partial | Required | Decision 76 — preserved live workspace and explicit return (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context. |
| 77 | partial | Required | Decision 77 — preserve selected identity with qualified live availability (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context. |
| 78 | partial | Required | Decision 78 — explicit last-observed aircraft state on live map (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 79 | partial | Required | Decision 79 — evidence-aware observation freshness policy (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 80 | partial | Required | Decision 80 — qualified last-known map during live feed interruption (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 81 | partial | Required | Decision 81 — quiet, explicit recovery of live tracking (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 82 | partial | Required | Decision 82 — evidence-ranked live position with conflict disclosure (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 83 | partial | Required | Decision 83 — restrained map uncertainty with detailed Inspector evidence (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 84 | partial | Required | Decision 84 — confidence-gated live aircraft identity reconciliation (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 85 | missing | Required | Decision 85 — traceable identity corrections with proportionate notification (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 86 | missing | Required | Decision 86 — evidence-preserving identity split with selection continuity (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 87 | missing | Required | Decision 87 — traceable identity merge with stable references (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 88 | missing | Required | Decision 88 — persistent airframe with time-qualified identities (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 89 | missing | Required | Decision 89 — bounded uncertainty for undated historical identity transitions (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 90 | partial | Required | Decision 90 — evidence-ranked historical claims with explicit disagreement (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 91 | missing | Required | Decision 91 — versioned historical interpretation with preserved evidence (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 92 | partial | Required | Decision 92 — historical timeline first, knowledge timeline on demand (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 93 | partial | Required | Decision 93 — unified aircraft history with categorized events (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 94 | missing | Required | Decision 94 — evidence-based milestones distinct from personal significance (locked 2026-10-10). | flight-enrichment.js; doaa-memory.js; src/worker.js; migrations/0001_doaa_memory.sql — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links. |
| 95 | partial | Required | Decision 95 — simple one-tap aviation moment bookmark (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs; bookmarks.js; track-history.js; account.js; scripts/browser-acceptance.cjs — 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json. | Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity. |
| 96 | partial | Required | Decision 96 — bookmark opens original moment with path to current aircraft (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; bookmarks.js; track-history.js; account.js; src/personal.mjs; tests/account-privacy.test.mjs; scripts/browser-acceptance.cjs — 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json. | Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity. |
| 97 | partial | Required | Decision 97 — visual bookmark collection (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs; bookmarks.js; track-history.js; account.js; scripts/browser-acceptance.cjs — 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json. | Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity. |
| 98 | partial | Required | Decision 98 — context-sensitive hybrid bookmark cards (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs; bookmarks.js; track-history.js; account.js; scripts/browser-acceptance.cjs — 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json. | Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity. |
| 99 | partial | Required | Decision 99 — chronological bookmark gallery with optional aircraft grouping (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs; bookmarks.js; track-history.js; account.js; scripts/browser-acceptance.cjs — 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json. | Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity. |
| 100 | partial | Required | Decision 100 — one bookmark per distinct moment (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs; bookmarks.js; track-history.js; account.js; scripts/browser-acceptance.cjs — 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json. | Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity. |
| 101 | partial | Required | Decision 101 — immediate bookmark removal (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/auth.mjs; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs; bookmarks.js; track-history.js; account.js; scripts/browser-acceptance.cjs — 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json. | Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity. |
| 102 | partial | Required | Decision 102 — account-based bookmark synchronization (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; bookmarks.js; track-history.js; account.js; src/personal.mjs; tests/account-privacy.test.mjs; scripts/browser-acceptance.cjs — 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json. | Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity. |
| 103 | partial | Required | Decision 103 — Google sign-in for DOAA accounts (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/auth.mjs; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs — Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance. | Complete client account/preferences UI, secure David/Brent enrollment and OAuth configuration, signed-in Preview and persistent/provider-revocation-aware session acceptance. |
| 104 | blocked | Required | Decision 104 — approved Google accounts only (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/auth.mjs; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs — Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance. | Complete client account/preferences UI, secure David/Brent enrollment and OAuth configuration, signed-in Preview and persistent/provider-revocation-aware session acceptance. |
| 105 | partial | Required | Decision 105 — sign-in required for all DOAA functionality (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/auth.mjs; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs — Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance. | Complete client account/preferences UI, secure David/Brent enrollment and OAuth configuration, signed-in Preview and persistent/provider-revocation-aware session acceptance. |
| 106 | partial | Required | Decision 106 — persistent sign-in until explicit sign-out (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/auth.mjs; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs — Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance. | Complete client account/preferences UI, secure David/Brent enrollment and OAuth configuration, signed-in Preview and persistent/provider-revocation-aware session acceptance. |
| 107 | partial | Required | Decision 107 — completely separate personal bookmark collections (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; bookmarks.js; track-history.js; account.js; src/personal.mjs; tests/account-privacy.test.mjs; scripts/browser-acceptance.cjs — 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json. | Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity. |
| 108 | partial | Required | Decision 108 — restore personal preferences, refresh live context (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/auth.mjs; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs; preference-core.js; account.js; tests/preference-sync.test.cjs — 2026-10-11 continuation: Account UI and authenticated bootstrap; complete snapshots from account APIs; account-scoped pending/cached preferences, visible pending/save/failure states, bounded retry/online recovery; in-flight saves cannot discard newer local edits. No aviation observations are persisted as preferences. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md. | Authenticated Preview/provider acceptance; apply future map/filter/MET/NAV settings to the same snapshot allowlist as their product UI is implemented. Local fixture browser save/retry/reload acceptance passed; actual authenticated Preview acceptance remains pending. |
| 109 | partial | Required | Decision 109 — account-synchronized personal preferences (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/auth.mjs; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs; preference-core.js; account.js; tests/preference-sync.test.cjs — 2026-10-11 continuation: Account UI and authenticated bootstrap; complete snapshots from account APIs; account-scoped pending/cached preferences, visible pending/save/failure states, bounded retry/online recovery; in-flight saves cannot discard newer local edits. No aviation observations are persisted as preferences. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md. | Authenticated Preview/provider acceptance; apply future map/filter/MET/NAV settings to the same snapshot allowlist as their product UI is implemented. Local fixture browser save/retry/reload acceptance passed; actual authenticated Preview acceptance remains pending. |
| 110 | partial | Required | Decision 110 — last device wins for preference synchronization (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/auth.mjs; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs; preference-core.js; account.js; tests/preference-sync.test.cjs — 2026-10-11 continuation: Account UI and authenticated bootstrap; complete snapshots from account APIs; account-scoped pending/cached preferences, visible pending/save/failure states, bounded retry/online recovery; in-flight saves cannot discard newer local edits. No aviation observations are persisted as preferences. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md. | Authenticated Preview/provider acceptance; apply future map/filter/MET/NAV settings to the same snapshot allowlist as their product UI is implemented. Local fixture browser save/retry/reload acceptance passed; actual authenticated Preview acceptance remains pending. |
| 111 | partial | Required | Decision 111 — local preference changes with retry (locked 2026-10-10). | index.html; src/worker.js; migrations/0001_doaa_memory.sql; src/auth.mjs; src/personal.mjs; migrations/0012_private_accounts.sql; tests/account-privacy.test.mjs; preference-core.js; account.js; tests/preference-sync.test.cjs — 2026-10-11 continuation: Account UI and authenticated bootstrap; complete snapshots from account APIs; account-scoped pending/cached preferences, visible pending/save/failure states, bounded retry/online recovery; in-flight saves cannot discard newer local edits. No aviation observations are persisted as preferences. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md. | Authenticated Preview/provider acceptance; apply future map/filter/MET/NAV settings to the same snapshot allowlist as their product UI is implemented. Local fixture browser save/retry/reload acceptance passed; actual authenticated Preview acceptance remains pending. |
| 112 | partial | Required | Decision 112 — stale aircraft observations (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 113 | partial | Required | Decision 113 — source-aware stale observation retirement (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 114 | partial | Required | Decision 114 — distinctive stale aircraft marker (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 115 | partial | Required | Decision 115 — compact live-feed outage status indicator (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 116 | partial | Required | Decision 116 — reconcile and smoothly transition after feed recovery (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 117 | partial | Required | Decision 117 — retain selected aircraft details after live signal loss (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 118 | partial | Required | Decision 118 — evidence-gated automatic reconnection (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 119 | missing | Required | Decision 119 — automatically follow selected aircraft (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 120 | missing | Required | Decision 120 — manual map navigation pauses aircraft following (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 121 | missing | Required | Decision 121 — preserve zoom while following aircraft (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 122 | missing | Required | Decision 122 — north-up map during following (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 123 | missing | Required | Decision 123 — forward-looking offset while following (locked 2026-10-10). | index.html; src/worker.js; relay.js; tests/observation-contract.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow. |
| 124 | partial | Required | Decision 124 — smooth visual transitions between confirmed positions (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 125 | partial | Required | Decision 125 — full available flight trail (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 126 | partial | Required | Decision 126 — altitude-coloured flight trail (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 127 | partial | Required | Decision 127 — flight trail is visual only (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 128 | partial | Required | Decision 128 — all-aircraft one-hour fading trails (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 129 | partial | Required | Decision 129 — subtly emphasize selected aircraft trail (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 130 | partial | Required | Decision 130 — trails persist after aircraft disappear (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 131 | missing | Required | Decision 131 — restore recent trails across sessions (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 132 | partial | Required | Decision 132 — render every trail without crowding suppression (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 133 | partial | Required | Decision 133 — trails visible at every map zoom (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 134 | missing | Required | Decision 134 — simple trail visibility toggle (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 135 | missing | Required | Decision 135 — reset trails to visible each session (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 136 | partial | Required | Decision 136 — trails continue aging during outages (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 137 | partial | Required | Decision 137 — connect reported position jumps (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 138 | partial | Required | Decision 138 — uniform trail styling for position jumps (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 139 | missing | Required | Decision 139 — gradient between reported endpoint altitudes (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 140 | missing | Required | Decision 140 — monochromatic blue altitude palette (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 141 | missing | Required | Decision 141 — fixed altitude-to-blue colour scale (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 142 | missing | Required | Decision 142 — prefer barometric altitude for trail colour (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 143 | missing | Required | Decision 143 — neutral grey for unknown-altitude trails (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 144 | missing | Required | Decision 144 — blend known altitude to unknown grey (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 145 | partial | Required | Decision 145 — clamp out-of-range altitudes to endpoint colours (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 146 | missing | Required | Decision 146 — altitude legend in map settings only (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 147 | missing | Required | Decision 147 — stable altitude colours with adaptive trail outlines (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 148 | partial | Required | Decision 148 — aircraft markers above trails (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 149 | partial | Required | Decision 149 — subtle verified ground-status marker treatment (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 150 | partial | Required | Decision 150 — show ground and airborne trails equally (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 151 | missing | Required | Decision 151 — consolidate visually identical stationary positions (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 152 | missing | Required | Decision 152 — suppress sub-pixel stationary jitter (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 153 | partial | Required | Decision 153 — late-arriving observations (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 154 | missing | Required | Decision 154 — authoritative corrections update visible trails (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 155 | partial | Required | Decision 155 — resolve conflicting positions using documented source-priority policy (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 156 | missing | Required | Decision 156 — combine source reliability with observation quality (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 157 | partial | Required | Decision 157 — missing observation-quality indicators remain unknown (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 158 | missing | Required | Decision 158 — stable source ordering breaks equally credible ties (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 159 | partial | Required | Decision 159 — unresolved position conflicts flagged in aircraft details (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 160 | missing | Required | Decision 160 — clear resolved conflict warnings, preserve history (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 161 | missing | Required | Decision 161 — brief source-selection explanation in aircraft details (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 162 | partial | Required | Decision 162 — reflect source changes in aircraft details (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 163 | missing | Required | Decision 163 — avoid source flapping with meaningful-advantage switching (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 164 | missing | Required | Decision 164 — automatic position-source selection only (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 165 | partial | Required | Decision 165 — show least problematic available position when all sources fail reliability checks (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 166 | partial | Required | Decision 166 — subtle marker treatment for degraded position reliability (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 167 | partial | Required | Decision 167 — render degraded-reliability trail positions normally (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 168 | partial | Required | Decision 168 — snap marker on discontinuous source-switch position jumps (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 169 | partial | Required | Decision 169 — snap marker on substantial discontinuities regardless of source (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 170 | missing | Required | Decision 170 — time-aware movement plausibility for marker discontinuities (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 171 | partial | Required | Decision 171 — animate unless discontinuity is established (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 172 | missing | Required | Decision 172 — immediately retarget overlapping marker animations (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 173 | partial | Required | Decision 173 — respect device reduced-motion preference for aircraft markers (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 174 | missing | Required | Decision 174 — infer marker orientation from recent observed positions when heading unavailable (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 175 | missing | Required | Decision 175 — fall back to last reported heading when inferred motion ceases (locked 2026-10-10). | index.html; src/worker.js; relay.js; doaa-memory.js — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy. |
| 176 | partial | Required | Decision 176 — Flight Inspector navigation: Overview · Timing · Progress · Journey (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction. |
| 177 | partial | Required | Decision 177 — Airport Inspector navigation: Overview · Operations · Movements · Airfield (locked 2026-10-10). | index.html; flight-enrichment.js; src/worker.js; tests/inspector-contexts.test.cjs; airport-weather.js; tests/airport-weather.test.cjs; tests/airport-api.test.cjs; scripts/browser-acceptance.cjs; airfield.js; src/airfield.mjs; migrations/0013_airfield_reference.sql; scripts/prepare-airfield-import.mjs; tests/airfield-source.test.mjs — 2026-10-11 Airfield continuation (partial): Airport Airfield tab mounts the shared sourced reference workspace, with D1-ready snapshot and missing-initialization states. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance. | Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state. |
| 178 | partial | Required | Decision 178 — LOOK balances aviation significance across aircraft, operations, and local visibility (locked 2026-10-10). | look.js; index.html; tests/look-journey.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Finish evidence-backed behavior/visibility/identity attention and verify connected navigation without personalization. |
| 179 | partial | Required | Decision 179 — live Ottawa release boundary (locked 2026-10-10). | DOAA_SPEC.md; RELEASE_EXECUTION_SAFETY_PLAN.md — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Run integrated release gate; OPS/PATTERNS and advanced general SKY Replay are explicitly sequenced later; mandatory Track History/Compare is required by current assignment. |
| 180 | partial | Required | Decision 180 — AMBIENT SKY is essential to the next live Ottawa release (locked 2026-10-10). | ambient.js; ambient.css; ambient-media.js; index.html; tests/ambient-media-runtime.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Verify real image handoffs, event eligibility/pacing, observed freshness, entry/exit/idle, screen longevity, responsive and reduced-motion behavior. |
| 181 | partial | Required | Decision 181 — AMBIENT entry supports both automatic and manual activation (locked 2026-10-10). | ambient.js; ambient.css; ambient-media.js; index.html; tests/ambient-media-runtime.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Verify real image handoffs, event eligibility/pacing, observed freshness, entry/exit/idle, screen longevity, responsive and reduced-motion behavior. |
| 182 | partial | Required | Decision 182 — AMBIENT SLIDES live first, recent sightings second (locked 2026-10-10). | ambient.js; ambient.css; ambient-media.js; index.html; tests/ambient-media-runtime.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Verify real image handoffs, event eligibility/pacing, observed freshness, entry/exit/idle, screen longevity, responsive and reduced-motion behavior. |
| 183 | partial | Required | Decision 183 — AMBIENT SLIDES rotates on meaningful live aviation events (locked 2026-10-10). | ambient.js; ambient.css; ambient-media.js; index.html; tests/ambient-media-runtime.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Verify real image handoffs, event eligibility/pacing, observed freshness, entry/exit/idle, screen longevity, responsive and reduced-motion behavior. |
| 184 | partial | Required | Decision 184 — AMBIENT composition is manually selected (locked 2026-10-10). | ambient.js; ambient.css; ambient-media.js; index.html; tests/ambient-media-runtime.test.cjs — Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance. | Verify real image handoffs, event eligibility/pacing, observed freshness, entry/exit/idle, screen longevity, responsive and reduced-motion behavior. |

## Full requirements and acceptance criteria

### Decision 1 — Inspector viewport: HYBRID (locked).

On mobile, use a map-aware compact bottom sheet by default with deliberate expansion into a larger investigation workspace. Keep SKY visible in compact state; expansion must not happen automatically on selection. On wider screens use a docked panel that preserves a usable SKY viewport. Reserve independent header/close and navigation regions, scroll the content separately, and prevent BASE/STREET map controls from overlapping Inspector controls. Validate on actual phone portrait/landscape, tablet, and desktop. This is a design decision, **not an assertion that current UI implements it**.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 2 — Visual language: C — Hybrid editorial/modular (locked 2026-10-10).

Retain Field Notes Light: editorial headings, quiet dividers and readable unboxed datum rows for routine facts; soft rounded cards for meaningful groups such as telemetry, operational status, evidence conflicts and media. Standardize semantic surfaces, spacing, radii, pill treatment, typography and wrapping across SKY, BOARD and Inspector. Do not turn every field into a card. This is design intent, not a claim of implementation.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 3 — Inspector tabs: shared core plus contextual tabs (locked 2026-10-10).

Use a stable Inspector shell, persistent object identity/header and consistent core navigation, augmented by object-specific tabs for Contact, Flight, Airframe, Airfield and other supported objects. BIO, Journey, Media and Encounters are not automatically all top-level object types; place them according to their semantics and evidence. Cross-object links preserve navigation history/back behaviour. Exact core-tab names and per-object inventory remain to be decided; do not infer that the earlier illustrative tab matrix was approved wholesale. Design decision only, not yet implemented.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 4 — Data presentation and normalization (locked 2026-10-10).

Preserve raw source values and provenance in D1; separately normalize known identities/relationships only with evidence and format values at the presentation boundary. Human-readable names and descriptions use appropriate case; preserve ICAO codes, registrations, callsigns and acronyms. Break concatenated concepts into legible rows/lines only when the underlying relationships are supported; allow natural wrapping and paragraphs for biographies and provenance. Distinguish unknown, unavailable, conflicting and not applicable. Standardize units, dates, coordinates and numbers across SKY, BOARD and Inspector without changing canonical measurements. Important information must not be clipped or ellipsized. These are locked design requirements, not yet fully implemented.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- 2026-10-11 continuation: Separated datum value, independent explanation and accessible favourite buttons; no nested buttons, contextual bounded back stack, async cross-object request guards and unknown vertical-rate label. Real airframe/airport/flight facts navigate explicitly. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Finish Inspector datum/source content and all cross-surface navigation; verify failure/identity revisions and actual signed-in Preview. Interaction grammar remains partial beyond the tested existing surfaces.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 5 — Interaction grammar and accessibility (locked 2026-10-10).

A muted ↗ marks a real cross-object navigation target; the whole isolated datum row activates it and preserves Inspector back history. An independent ⓘ explains the field, provenance, confidence or interpretation in context, without navigating. Unmarked facts imply no interaction. Keep labels and their ⓘ together across wraps; never nest buttons or allow overlapping hit areas. Provide keyboard access, visible focus, subtle hover/pressed feedback, touch targets at least 44×44 CSS px where practical, and no hover-only/long-press-only affordances. Do not display ↗ without an actual destination. Implement and test consistently in SKY, BOARD, search and Inspector. Locked design requirements, not implementation verification.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- 2026-10-11 continuation: Separated datum value, independent explanation and accessible favourite buttons; no nested buttons, contextual bounded back stack, async cross-object request guards and unknown vertical-rate label. Real airframe/airport/flight facts navigate explicitly. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Finish Inspector datum/source content and all cross-surface navigation; verify failure/identity revisions and actual signed-in Preview. Interaction grammar remains partial beyond the tested existing surfaces.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 6 — Media, attribution and evidence pills (locked 2026-10-10).

Media hero image only when grounded; show EXACT only for evidenced same physical airframe (registration/ICAO24 with adequate matching evidence), MODEL for evidenced same confirmed model, TYPE for broader evidenced family/type. Omit specificity pill where not justified; never suggest unrelated imagery matches. Separate photographic specificity (EXACT/MODEL/TYPE) from evidence-state pills (HISTORICAL/CONFLICTING), which may coexist. Display photographer/source attribution immediately below image, capture date, livery and licensing where known, and provide expandable Media gallery for additional grounded imagery. Place small pills legibly without obscuring subject or controls. These are locked design requirements, not claims of completed ingestion, licensing or implementation.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 7 — Inspector universal navigation: Overview only (locked 2026-10-10).

Every inspectable object has Overview plus only its relevant contextual tabs; there is no universal Evidence or Relationships tab. Relationship links appear alongside relevant facts. Evidence stays attached to each datum through ⓘ provenance/explanation, with visible CONFLICT/HISTORICAL/INFERRED pills only where consequential; an optional discreet record-level source-summary pill opens an on-demand evidence ledger. A source count is not a confidence score, and repeated upstream evidence is not independent corroboration. Exact contextual tab names and field inventories remain open for review. Locked design intent; not yet verified in deployed UI.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- 2026-10-11 continuation: Separated datum value, independent explanation and accessible favourite buttons; no nested buttons, contextual bounded back stack, async cross-object request guards and unknown vertical-rate label. Real airframe/airport/flight facts navigate explicitly. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Finish Inspector datum/source content and all cross-surface navigation; verify failure/identity revisions and actual signed-in Preview. Interaction grammar remains partial beyond the tested existing surfaces.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 8 — Airframe contextual tabs and terminology (locked 2026-10-10).

Airframe tabs: Overview, BIO, Operations, Media, Sightings. Keep Operations (evidenced operational history) distinct from Sightings (events actually observed by DOAA). **Sightings** is the user-facing label; **Encounter** remains the internal canonical observation record type. Explain via ⓘ that a DOAA Sighting is an electronic observation, not necessarily a human visual sighting. External searches, inferred history or replay must not create Encounters. Exact field-to-tab mapping remains subject to source inventory.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 9 — Flight Inspector refinement (design direction, pending final tab lock; 2026-10-10).

Route header should show a thin progress track and aircraft-position dot/glyph when trustworthy endpoints and position exist; geographic progress must not masquerade as time elapsed, stale positions must be timestamped, and unknown progress must not be invented. Overview includes a prominent Timing section separating scheduled, estimated, actual (off-block/takeoff/landing/on-block where evidenced), elapsed/remaining and freshness. Progress includes a compact geographically grounded route/position map with aircraft glyph and a route to SKY, plus honest stale/missing states. Journey must be a *timestamped operational chronology*: each independently verified prior/current/next operation has its own departure/arrival time evidence and time basis, route, identifiers and airframe association, with gaps visible and no adjacency-based invented operations. This is agreed direction; exact Flight tab set still pending confirmation.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 10 — Flight Inspector additional requirements (design direction, pending Flight tab lock; 2026-10-10).

Timing means *punctuality*: show scheduled departure, actual departure, scheduled arrival, actual arrival in a stable four-field layout, and early/on-time/delayed difference when supported; distinguish estimated times from actual and specify departure versus arrival delay. Progress includes inferred/observed flight phase (ground, climbing, cruising, descending etc only at defensible precision), current altitude/flight level, groundspeed, vertical rate, track/heading, squawk, position, freshness and history-supported highest/lowest altitude and maximum speed; reuse coherent telemetry presentation with Contact rather than conflicting duplicate interpretations. Across Inspector, expected fields remain visible and clearly distinguish UNKNOWN, NOT AVAILABLE, PENDING, CONFLICTING and NOT APPLICABLE. Inspector opens promptly with cached/known facts while slower enrichment runs; show real loading activity, elapsed time and per-source/field pending states, incremental updates, explicit timeout/failure and stale data, without fake percentage progress; prevent stale responses overwriting newer object selection. Investigate the reported up-to-30-second Inspector enrichment latency during implementation. These are design requirements, not claims of implemented functionality.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 11 — Contact flight phase and interesting behaviours (design direction, 2026-10-10).

Distinguish baseline movement phase (ground/taxi, takeoff, climb, cruise, descent, approach/final, landing, unknown) from concurrently detected manoeuvres/events (holding pattern, circling, go-around, diversion, touch-and-go, loitering and other defensible special activity). Display phase and notable behaviour separately, e.g. Descending + Possible holding; do not force mutually exclusive classifications. Derive from actual time-ordered telemetry/track and airport/runway context where available, with explicit confidence, observation window and timestamp. Never infer ATC instructions, pilot intent, actual touchdown or destination change solely from an ambiguous ADS-B trace. Consider timestamped detected events in Contact Observations; no claim these detectors currently exist. Flight/Contact tab architecture still under review.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 12 — SKY first-click Contact composition and Flight ownership (approved 2026-10-10).

Clicking a SKY contact/track opens Contact Overview immediately in the shared Inspector shell. Present callsign/identity, current phase and freshness, a prominent compact origin→destination progress strip and punctuality summary only when evidenced by a linked Flight, immediate contextual access to Flight/Airframe/Airfield and shared Journey, a substantial stable telemetry grid (including altitude types, flight level where justified, groundspeed, vertical rate, track, squawk, on-ground, position age; unavailable values explicitly labelled), and recent notable activity. Flight owns detailed scheduled/estimated/actual departure and arrival timing, early/on-time/delay analysis, geographic route mini-map and operation details; Contact does not duplicate those full sections. Journey is a single shared evidence-based timestamped chronology reachable from Contact and Flight. Track History concerns within-session telemetry/events, distinct from Airframe Sightings (separate observed encounters). Keep route and progress absent/unknown rather than inferred when ungrounded. This locks first-click composition and responsibility boundaries; precise Contact tab naming and final navigation mechanics remain open.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 13 — Journey presentation (locked 2026-10-10).

One shared Journey view accessible from Contact and Flight: a prominent previous/current/next operation summary followed by a detailed timestamped chronology of additional evidenced operations for the same airframe. Each operation distinguishes scheduled, estimated, observed and actual times, route, identifier, evidence/provenance and verification status; show dates and timezone, including across midnight. Distinguish next *scheduled assignment* from next *observed operation*; do not conflate either with database adjacency. Unknown previous/next remains explicitly UNKNOWN, with gaps and uncertain airframe associations visible. No invented operations or continuity. Locked presentation; implementation and data coverage remain unverified.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 14 — Flight identity richness and Explore consistency (design refinement, pending final Flight lock; 2026-10-10).

Flight Overview should be worth investigating, not merely show route/times: full evidenced marketing and operating carrier names and IATA/ICAO identifiers, appropriately sourced/licensed operator logo, codeshare flight numbers, airline group/alliance affiliation when verified, and clear differentiation between marketing carrier, actual operator and alliance. Codeshares can expand without crowding header; unknown relationships remain explicit. Preserve substantial punctuality Timing, route progress and geographically grounded mini-map. Reuse the shared **Explore** label and contextual cross-object navigation cards/links established on Contact for Flight, Airframe, Journey, origin/destination Airfields and other real associations, with back history. Do not display unverified logos, codeshares or affiliations as fact. Design direction only; Flight tabs remain unfinalized.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 15 — Flight Inspector composition and tabs (locked 2026-10-10).

Flight has Overview and shared Journey. Overview is a substantial but restrained investigative page: route header with grounded progress line/dot; rich carrier identity including full marketing and operating names, identifiers and licensed logos where available; alliance/group affiliation and expandable codeshares directly on Overview (not a sparse extra tab); punctuality-oriented Timing with scheduled versus actual departure and arrival, clear early/on-time/late deltas and distinct estimates; geographically grounded route mini-map and aircraft glyph; and a consistently named **Explore** area linking to associated Contact, Airframe, Journey, origin/destination Airfields and other established records. Flight owns these operational/schedule details, while Contact owns detailed live telemetry and phase. Missing fields remain visible with accurate state labels; no fabricated affiliations, routes, times or logos. Journey is the same shared timestamped chronology from Contact. Locked design, not yet implemented/verified.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 16 — Airfield Overview operational status and METAR (design refinement, 2026-10-10).

Add a prominent clickable airport operational-status pill in the Airfield header when grounded (e.g. ground stop, ground-delay programme, arrival/departure restrictions, runway closure, diversion activity, significant disruption). Its contextual detail reveals actual source/authority, advisory text or interpretation, affected traffic, effective period and freshness; support multiple concurrent advisories. Do not equate lack of an alert with Normal; use No verified advisory/UNKNOWN as appropriate, and do not label airport-wide diversion activity from a single flight without evidence. Display raw METAR faithfully with observation timestamp and separate retrieval freshness; clicking METAR or adjacent ⓘ opens a plain-English breakdown (wind, visibility, clouds/ceiling, precipitation, temperature/dew point, altimeter, flight category when supported). Weather is not itself proof of an operational restriction. TAF, if later added, is clearly a forecast. Source coverage and live availability require implementation audit; no invented operational states.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 17 — Airfield hero and runway interaction (approved 2026-10-10).

Airfield Overview leads with a sourced, attributable airport photograph and a substantial airport profile: identity, codes, operator, geography, elevation, timezone, classification, and available operational facts. Preserve airport advisory status pill with source details, raw METAR with plain-English explanation, airport activity statistics, and consistent Explore links. Replace the generic mini-map with an interactive, geographically accurate runway layout based on verified runway endpoint coordinates. Selecting a runway shows an inline details panel for designation, length, width, surface, lighting, approach aids and evidenced restrictions/status; unknown fields remain visible. Include accessible labelled runway selectors for keyboard and touch. Do not treat a schematic as verified geometry or infer official runway use from sparse tracks. Overview, Runways and Movements remain proposed tabs; data coverage and implementation are unverified.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 18 — Airfield tabs (locked 2026-10-10).

Airfield Inspector uses Overview, Runways, and Movements. Overview retains the sourced photographic hero, comprehensive airport profile, clickable operational status, raw/decoded METAR, interactive geographically grounded runway layout with inline selected-runway details, activity summary, and consistent Explore navigation. Runways provides deeper specifications and evidenced operational restrictions; Movements separates scheduled/published movements from DOAA-observed traffic. Preserve UNKNOWN/NOT AVAILABLE and source freshness. Design lock only, not implementation verification.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- 2026-10-11 Airfield continuation (partial): Airfield now has sourced endpoint diagram, physical-strip/end selection, unit conversion and visible reference failure/retry. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance.
- 2026-10-11 Airport continuation (partial): Shared Airport Inspector with Overview/Operations/Movements/Airfield, sourced METAR dashboard and explicit absent runway/operational evidence. Local tests and browser fixture evidence: docs/qa/airport-inspector-acceptance.json. No live-provider or signed-in Preview acceptance.
- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 19 — Movements and BOARD unified architecture (locked design direction 2026-10-10).

Airfield > Movements is a time-navigable airport activity timeline: browse backward through recorded movements, inspect current activity, and browse forward through genuinely sourced scheduled operations. Direction and evidence-type filters; clear local airport dates/times, provenance, completeness/freshness and gaps. BOARD is a second, roomier presentation/entry point of the same canonical Movements model, not a duplicate movement engine or competing data product. Shared filtering, matching, punctuality, status and Flight/Contact navigation preserve Inspector back history. No synthetic historical movements or invented future schedules; source availability governs each temporal region. Exact time-navigation interaction and BOARD presentation remain to be refined.

Amendments:

- BOARD and Inspector Movements presentation (locked 2026-10-10). Both are presentations of the same canonical movement records, filters, evidence taxonomy, and bidirectional time navigation. BOARD retains a dense, glanceable airport departure-board aesthetic with prominent local times, flight identifiers, routes, direction and statuses; Airfield > Movements presents the same information in a more spacious editorial/investigative Inspector layout. Shared model, not duplicated engines or contradictory records. Both preserve access to evidence details and Flight/Contact Inspector navigation, with appropriate responsive and accessible behavior. Design lock; not yet implemented.
- BOARD default chronology (locked 2026-10-10). BOARD opens to a unified, chronological feed of arrivals and departures together, not split panels. Arrival/departure filters remain available, alongside Published/Recorded/Inferred evidence filters. Time is the primary scan anchor; flight/route and operational state follow. Preserve bidirectional time browsing, airport-local date controls, provenance, and row navigation to Inspector. Same underlying movements as Airfield > Movements, in a denser airport-board presentation. Design decision only; not yet implemented.
- BOARD row interaction (locked 2026-10-10). Selecting any movement row opens the existing Inspector directly, with no intermediary inline expansion or competing details surface. Resolve the best grounded target: Flight for a real flight record (including matched published+observed movements), Contact for an observation-only encounter, and an explicitly provisional evidence/explanation view for inferred-only movements that lack a verified Flight or Contact. Never fabricate an object solely to satisfy navigation. Preserve BOARD scroll/date/filter position and Inspector back history on close/back. Inspector Explore links expose related Flight, Contact, Airframe, Journey and Airfield where evidenced. Design lock; implementation pending.
- Movement ordering and lifecycle (locked 2026-10-10). BOARD and Airfield Movements use a stable scheduled-time anchor when a grounded published scheduled time exists. New estimates, observed phases and actual arrival/departure times update the same movement row in place without reordering it, while retaining evidence and timestamp history. For movements without published schedules, sort by the best supported observed event time, or explicitly labelled inferred time if no stronger anchor exists; later corrections remain explainable. Show estimated/actual times and major events (diversion, cancellation, go-around, relevant ground stop) prominently but without noisy row movement. Match and merge multi-source evidence into one movement only when defensible, preserving provenance. Design lock, implementation pending.
- BOARD live-edge return affordance (locked 2026-10-10). BOARD and Airfield Movements respect the user's current reading position while live movement data updates. When new or materially changed activity arrives at the live edge and the user is browsing elsewhere, show a compact floating directional arrow labelled Live / New activity, positioned without covering rows. Tapping jumps to the live edge and clears the pending-update indicator. Do not auto-scroll historical/date-selected browsing or close/change an Inspector selection; preserve scroll, date and filters when returning. When already following live, updates appear in place without forced jumps. Arrow direction follows actual timeline orientation. No indicator for mere polling with no meaningful new data. Design lock; implementation pending.
- Movement provenance pills (locked 2026-10-10). Published, Recorded and Inferred are consistently styled provenance labels on movement rows in BOARD and Airfield Movements; a movement can display multiple pills because evidence types can coexist. Inferred is not automatically a warning/error state and should not be sensationalized with special alarming treatment. Each pill opens contextual evidence detail: source, observed or published timestamps, and, for inferred evidence, supporting observations, derivation method and confidence/uncertainty. Keep row glanceable; row selection itself opens the appropriate Inspector object. Provenance controls and row navigation must be separate accessible targets, without nested interactive elements. Design lock; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- 2026-10-11 Airfield continuation (partial): Prepared public reference snapshot uses separate D1 tables and cannot manufacture movement, runway assignment or observation evidence. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance.
- 2026-10-11 Airport continuation (partial): Airport Movements uses the same /api/board adapter, distinguishes reported associations from track inference, and opens Flight with preserved Back context. Local tests and browser fixture evidence: docs/qa/airport-inspector-acceptance.json. No live-provider or signed-in Preview acceptance.
- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 20 — Movements time navigation and evidence classes (locked 2026-10-10).

Both Airfield Movements and BOARD use the same canonical, airport-local chronological movement timeline with three complementary navigation methods: previous/next calendar-day controls, direct date picker, and bidirectional continuous/infinite scrolling across midnight with clear date separators. Today jumps to the current airport-local day/live position. Fetch windows incrementally, maintain scroll position and indicate unavailable historical/future coverage; never imply infinite data availability. Filter by arrival/departure and evidence class Published, Recorded, Inferred or All. A single movement may hold multiple kinds of evidence, not duplicate entries for published and observed records. Clearly distinguish sourced schedules, actual DOAA observations, and model-derived inferences. Every inference carries confidence, supporting evidence, method/provenance and contextual explanation, never masquerades as a confirmed movement. Timezones, date boundaries, deduplication and uncertain timings must be handled explicitly. The same rules and data power both presentations; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Unify canonical movement records and timelines; separate Home/Explore; add date/evidence/runway navigation and sourced Airport conditions/geometry.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 21 — Decision 21 — tiered operational-event emphasis (locked 2026-10-10).

In BOARD and Airfield Movements, ordinary flight phases (taxiing, climbing, approaching, arrived) remain understated; significant delays use restrained caution emphasis; consequential confirmed disruptions such as cancellations or diversions receive stronger but non-alarmist prominence. Non-emergency aviation manoeuvres (holding, circling, go-arounds, touch-and-go) are interesting operational events, not inherently emergencies, and receive neutral treatment. Airport-wide ground stops belong in Airfield status and only affect individual movement rows where that linkage is evidenced. Operational state is separate from Published/Recorded/Inferred provenance and its confidence; event detail reveals timestamps, sources, supporting observations and uncertainty. Avoid over-colouring the board or overstating severity. Design lock, not implementation verification.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Unify canonical movement records and timelines; separate Home/Explore; add date/evidence/runway navigation and sourced Airport conditions/geometry.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 22 — Decision 22 — Catchment Selector as shared airport context (approved design direction 2026-10-10).

BOARD must follow the existing Catchment Selector, not maintain its own independent remembered airport. Distinguish persistent **Home airfield** from the **currently explored catchment/airfield**: exploring elsewhere changes the active context used by SKY and BOARD without overwriting Home; setting Home changes the persistent default independently without unexpectedly switching the current exploration. Offer a clear Return Home action. Preserve the Catchment Selector's geographic coverage/radius semantics rather than reducing catchments to airport codes. Airfield Inspector may inspect related airports without silently mutating Home. Exact cross-view propagation and persistence are to be confirmed against existing selector implementation before coding. Design direction recorded; implementation pending.

Amendments:

- Decision 22 refinement — inspection does not change catchment (locked 2026-10-10). Opening an Airfield Inspector for an airport other than the active catchment does not silently change the Catchment Selector, SKY geographic focus, BOARD airport, or Home airfield. Provide an explicit **Explore this catchment** action on the Airfield Inspector; only that deliberate action switches the active exploration context, preserving Home. The distinction between inspecting an object and navigating the application's geographic context is universal. Design lock; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- 2026-10-11 continuation: Saved Home/radius and session exploration are separate; SKY and BOARD share active context; setting Home preserves exploration, Return Home restores default radius, fresh launches restore Home, recent exploration persists. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Signed-in Preview acceptance and remote-account preference refresh acceptance; preserve MET/NAV resume as those layers are implemented.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 23 — Decision 23 — return Home on launch (locked 2026-10-10).

On a fresh DOAA session, initialize the active exploration catchment from the persistent user-selected Home airfield/catchment, not the last explored airport. Exploring elsewhere changes only the current session's active context; recent explored catchments remain available for convenient return. Inspecting another airport changes neither Home nor active catchment. BOARD and SKY follow the active Catchment Selector. Preserve existing coverage/radius semantics. Distinguish fresh launch from in-session view switching so navigating between SKY, BOARD and Inspector does not reset exploration. Design lock; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- 2026-10-11 continuation: Saved Home/radius and session exploration are separate; SKY and BOARD share active context; setting Home preserves exploration, Return Home restores default radius, fresh launches restore Home, recent exploration persists. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Signed-in Preview acceptance and remote-account preference refresh acceptance; preserve MET/NAV resume as those layers are implemented.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 24 — Decision 24 — Contact Inspector tabs (locked 2026-10-10).

Contact Inspector uses Overview, Journey, and Track History. Overview remains the immediate SKY first-click view with identity, current flight phase, observation freshness, rich live telemetry, grounded route progress and compact punctuality summary where a Flight is linked, plus consistent EXPLORE links. Journey is the shared timestamped previous/current/next operational chronology also available from Flight, with clear source/uncertainty distinctions. Track History is the time-navigable telemetry and observed path within this specific Contact/encounter, including altitude/speed changes, detected manoeuvres, gaps and provenance; it must not be confused with Airframe Sightings, which enumerates separate DOAA encounters with a physical aircraft. Design lock; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- renderSurface(track-history) currently renders unavailable placeholder; /memory/history returns aggregates, not track samples
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Add encounter-scoped observed samples, geographically grounded map and shared telemetry/time cursor; real interval playback; deliberate two-aircraft comparison, union clock, follow and loop.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 25 — Decision 25 — synchronized Track History map and charts (locked 2026-10-10).

Contact > Track History gives equal visual importance to the geographically grounded observed track map and synchronized altitude/speed telemetry charts. A shared time cursor/scrubber moves the aircraft position and chart cursors together; selecting a detected event navigates both to its observed timestamp/segment. Show heading, relevant telemetry, timestamps, observation freshness, source attribution and gaps without falsely interpolating missing tracks or presenting schematic curves as observed geometry. Responsive layout may place views side by side on wide screens and stacked on mobile, preserving synchronization and accessible keyboard/touch navigation. Detected phases/manoeuvres remain evidence-qualified, not claims about pilot intent. Design lock; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Actual observed-sample map/charts/shared absolute clock and two-aircraft union comparison implemented; local SQLite queries and four responsive Chromium fixture workflows passed. See docs/RELEASE_RC_CHECKPOINT.md and docs/qa/track-history-acceptance.json.
- Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised.
- 2026-10-11 continuation: Unit changes preserve replay time/positions, update altitude/speed chart values and labels, and change readouts without altering stored samples. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch.

Acceptance: Recorded coordinates and real telemetry share one absolute cursor; no future observation leaks or position interpolation; gap/unknown/provider state is explicit; literal detected changes jump both map and chart cursors.

Dependencies: Preview observation schema 0011; Approved Google subjects/OAuth configuration for signed-in Preview acceptance; Free geographic basemap availability

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 26 — Decision 26 — Track History playback (locked 2026-10-10).

Contact Track History includes real time-based Play/Pause, timeline scrubber and playback-speed controls, synchronized with observed track map and telemetry charts. Replay respects actual timestamp intervals, marks missing observation gaps, and never invents continuous positions. Controls remain accessible; playback is paused/stopped when leaving context as appropriate. **Multi-aircraft comparison (promising direction, not yet locked):** an optional expanded Compare Tracks workspace may allow multiple Contacts/airframes to be replayed on a shared absolute clock with separate observed tracks and gaps, while ordinary Contact Track History stays single-target by default. Do not align tracks by percentage of flight completion or fabricate simultaneous encounters. Design lock for playback only; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Actual observed-sample map/charts/shared absolute clock and two-aircraft union comparison implemented; local SQLite queries and four responsive Chromium fixture workflows passed. See docs/RELEASE_RC_CHECKPOINT.md and docs/qa/track-history-acceptance.json.
- Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised.
- 2026-10-11 continuation: Unit changes preserve replay time/positions, update altitude/speed chart values and labels, and change readouts without altering stored samples. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch.

Acceptance: Play/Pause and 1×/5×/15×/30×/60× use actual timestamp intervals; scrub synchronizes all representations; dispose pauses and aborts; no unsupported intermediate positions.

Dependencies: Preview observation schema 0011; Approved Google subjects/OAuth configuration for signed-in Preview acceptance; Free geographic basemap availability

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 27 — Decision 27 — multi-aircraft Compare Tracks (locked 2026-10-10).

Multi-aircraft replay is an optional expanded workspace launched from Contact Track History, with Add to comparison available from related Contact exploration where appropriate. Compare Tracks prioritizes a large geographically grounded map with individually distinguishable observed tracks, a single absolute-time playback clock, scrubbing, speed controls, and visible observation gaps. **No per-aircraft telemetry charts or statistics in multi mode**: comparison is for spatial/temporal relationships, not a crowded analytical dashboard. Selecting an aircraft may open its full Inspector for detailed stats. Single-contact Track History retains synchronized map, charts, telemetry and playback. Never align tracks by flight-completion percentage or interpolate missing encounters. Design locked; implementation pending.

Amendments:

- Decision 27 refinement — compact synchronized compare telemetry (user-directed 2026-10-10). In Compare Tracks, retain the large shared replay map and playback controls, but show simple horizontally aligned **Track 1 / Track 2** readouts directly beneath playback, each with speed, altitude and heading or ground track at the same absolute timestamp. This supersedes the earlier shorthand 'no stats' for multi mode: no full charts or dense per-aircraft analytical dashboard, but essential side-by-side instantaneous telemetry is desired, particularly for nearby aircraft. Label heading versus ground track correctly according to sourced telemetry, show missing/stale values honestly, and avoid implied separation precision without synchronized reliable observations. For additional tracks, maintain legible comparable alignment. Visual refinement captured; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Actual observed-sample map/charts/shared absolute clock and two-aircraft union comparison implemented; local SQLite queries and four responsive Chromium fixture workflows passed. See docs/RELEASE_RC_CHECKPOINT.md and docs/qa/track-history-acceptance.json.
- Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised.

Outstanding: Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch.

Acceptance: Expanded actual geographic map with distinguishable tracks, shared absolute clock, speed/scrub/gaps and compact telemetry; no per-aircraft charts/statistics in multi mode.

Dependencies: Preview observation schema 0011; Approved Google subjects/OAuth configuration for signed-in Preview acceptance; Free geographic basemap availability

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 28 — Decision 28 — Compare Tracks exactly two aircraft (locked 2026-10-10).

Compare Tracks supports a maximum of two simultaneously replayed aircraft, not expandable to three or four. Maintain a shared absolute-time map and playback controls with two horizontally aligned compact telemetry panels immediately beneath them (speed, altitude, sourced heading or ground track). The two-track limit preserves direct comparison and phone usability. Allow replacement/removal of either selected track without losing the other; unavailable observations are explicit. Design lock, implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Actual observed-sample map/charts/shared absolute clock and two-aircraft union comparison implemented; local SQLite queries and four responsive Chromium fixture workflows passed. See docs/RELEASE_RC_CHECKPOINT.md and docs/qa/track-history-acceptance.json.
- Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised.

Outstanding: Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch.

Acceptance: Exactly two tracks; two horizontal compact telemetry panels; either track can be replaced or removed without losing the other; unavailable support is explicit.

Dependencies: Preview observation schema 0011; Approved Google subjects/OAuth configuration for signed-in Preview acceptance; Free geographic basemap availability

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 29 — Decision 29 — Compare Tracks second-aircraft picker (locked 2026-10-10).

From Contact > Track History, **Compare with…** opens a deliberate Track 2 selector. Prioritize other actually observed Contacts with overlapping observation windows and geographic proximity, and provide callsign/registration search to find a specific recorded Contact. Never auto-select a comparison aircraft, infer an unobserved encounter, or imply missing history is available. After selection, open the two-aircraft Compare Tracks workspace with one absolute-time playback clock, grounded map tracks and aligned compact speed/altitude/heading-or-track telemetry. Allow replacement of Track 2. Design lock; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Actual observed-sample map/charts/shared absolute clock and two-aircraft union comparison implemented; local SQLite queries and four responsive Chromium fixture workflows passed. See docs/RELEASE_RC_CHECKPOINT.md and docs/qa/track-history-acceptance.json.
- Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised.

Outstanding: Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch.

Acceptance: Deliberate recorded Track 2 picker, observed overlap/proximity priority, callsign/registration search; no automatic or unobserved selection.

Dependencies: Preview observation schema 0011; Approved Google subjects/OAuth configuration for signed-in Preview acceptance; Free geographic basemap availability

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 30 — Decision 30 — full combined Compare Tracks playback window (locked 2026-10-10).

For two recorded aircraft, Compare Tracks uses the union of their observed time ranges rather than restricting playback to the overlap. The common absolute-time timeline distinguishes Track 1 coverage, Track 2 coverage, and overlapping periods; each aircraft marker and its instantaneous telemetry appear only where observation support is sufficient. Clearly show gaps, one-aircraft-only intervals and no-data periods, without manufacturing positions or proximity. Keep playback and scrubbing coherent across the whole combined range. Design lock; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Actual observed-sample map/charts/shared absolute clock and two-aircraft union comparison implemented; local SQLite queries and four responsive Chromium fixture workflows passed. See docs/RELEASE_RC_CHECKPOINT.md and docs/qa/track-history-acceptance.json.
- Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised.

Outstanding: Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch.

Acceptance: Union observed time range with both coverage bands; each marker/telemetry only within supported observation intervals; no fabricated proximity.

Dependencies: Preview observation schema 0011; Approved Google subjects/OAuth configuration for signed-in Preview acceptance; Free geographic basemap availability

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 31 — Decision 31 — hybrid Track History / Compare Tracks camera (locked 2026-10-10).

Both single-contact Track History and two-aircraft Compare Tracks initially fit the complete geographically grounded observed tracks in a fixed overview, preserving spatial context during playback. Offer an optional explicit **Follow** control to keep the replaying aircraft in view; in two-track comparison, Follow must clearly identify its target and not imply both aircraft can always be framed tightly. Any manual pan/zoom disengages Follow immediately, preserving user control. Camera changes must not alter the shared playback clock or telemetry. Design lock; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Actual observed-sample map/charts/shared absolute clock and two-aircraft union comparison implemented; local SQLite queries and four responsive Chromium fixture workflows passed. See docs/RELEASE_RC_CHECKPOINT.md and docs/qa/track-history-acceptance.json.
- Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised.

Outstanding: Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch.

Acceptance: Initially fixed full-track fit; explicit labelled Follow target; manual pan/zoom disengages Follow and does not change scrub time.

Dependencies: Preview observation schema 0011; Approved Google subjects/OAuth configuration for signed-in Preview acceptance; Free geographic basemap availability

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 32 — Decision 32 — optional replay loop (locked 2026-10-10).

In both Contact Track History and two-aircraft Compare Tracks, playback stops at the final observed timestamp by default, retaining the final map state and timestamp-specific telemetry. Offer an explicit **Loop** toggle; when enabled, reaching the end restarts playback from the beginning of the selected replay window. Loop is off by default. Do not reset map camera or alter observed data when looping. Design lock; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Actual observed-sample map/charts/shared absolute clock and two-aircraft union comparison implemented; local SQLite queries and four responsive Chromium fixture workflows passed. See docs/RELEASE_RC_CHECKPOINT.md and docs/qa/track-history-acceptance.json.
- Playback, no-future/no-interpolation support, gaps, optional loop/follow, deliberate recorded picker, replacement/removal of either track, service failure/retry and obsolete-selection guards exercised.

Outstanding: Authenticated Preview with real collected observations, accessible/provider geographic basemap acceptance, live/physical-device acceptance; global-unit conversion follows the shared units batch.

Acceptance: Default stops at final observed timestamp with final supported values; Loop off by default, opt-in restart preserves camera/data.

Dependencies: Preview observation schema 0011; Approved Google subjects/OAuth configuration for signed-in Preview acceptance; Free geographic basemap availability

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 33 — Decision 33 — Airframe BIO hybrid dossier and life timeline (locked 2026-10-10).

Airframe > BIO begins with an editorial reference dossier of the particular physical airframe (manufacturer, model/variant, manufacturer serial number where evidenced, construction/first-flight/delivery dates, registrations, operators and configuration as available), followed by a clear visual chronological life history of sourced milestones, ownership/registration/operator changes and significant documented modifications. BIO is enduring physical-airframe identity and history; Operations is verified operational activity, Sightings is DOAA-observed encounters. Registration is not a permanent airframe identity; preserve physical continuity through reliable serial/identity evidence, dates, source provenance and explicit uncertainty. Do not turn BIO into a generic model-spec sheet or invent missing milestones. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 34 — Decision 34 — curated, era-based Airframe BIO timeline (locked 2026-10-10).

BIO's chronological life history presents significant documented milestones (manufacture, first flight, delivery, registration/operator transitions, major modifications, retirement/preservation) rather than routine movements or DOAA encounters, which belong in Operations and Sightings. Group related events into meaningful dated eras (e.g. operator tenure), expandable to reveal individual evidenced milestones. Preserve source-level date precision (day/month/year/approximate range) and visibly qualify uncertainty or conflicting chronology; do not manufacture exact dates or implied continuity. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 35 — Decision 35 — full Airframe BIO technical specifications (locked 2026-10-10).

BIO includes a comprehensive, category-organized technical reference, not merely a compact model summary. Clearly distinguish **this physical airframe's evidenced configuration** (installed engines, cabin/seating, modifications, equipment and other individual attributes where known) from **model/variant reference specifications** (dimensions, weights, capacities, performance, range, powerplant options, etc.). Permit full available sourced detail via expandable sections while retaining the editorial identity dossier and curated life timeline. Label representative/typical/range/option values explicitly; never present model specifications as confirmed installed or measured characteristics of an individual aircraft. Preserve provenance, units, applicability, date/version and unavailable states. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 36 — Decision 36 — Airframe Operations reuses shared chronological timeline (locked 2026-10-10).

Airframe > Operations uses the same reusable bidirectional scrollable timeline mechanism and navigation grammar already specified for Airfield Movements / BOARD (date separators, airport-/context-appropriate date navigation, Today jump, stable ordering, explicit coverage gaps, filters and retained reading position), adapted to the identity of one physical airframe rather than one airport. Reuse actual component/state/navigation infrastructure where possible, with airframe-specific queries, provenance and row presentations; do not fork a visually similar but independently behaving implementation. An operational summary may precede the timeline (documented activity patterns, routes, notable events), but the timeline remains the main investigative surface. Preserve the distinction between independently documented operations and DOAA-recorded Sightings; do not imply an exhaustive flight history. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 37 — Decision 37 — comprehensive Airframe Operations timeline (locked 2026-10-10).

Airframe > Operations displays every documented flight/movement associated with the evidenced physical airframe, not only curated notable events. Ordinary operations appear with restrained visual treatment; sourced unusual events, delays, diversions and other material changes receive proportionate emphasis and filtering. Preserve chronological context and stable ordering, deduplicate multiple claims about the same underlying operation without discarding their provenance, and distinguish recorded/documented coverage from unknown historical periods. 'Comprehensive' means exhaustive presentation of available documented records, **not** a claim that every flight the aircraft ever made is known. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 38 — Decision 38 — cross-source Airframe Operations portrait and timeline (locked 2026-10-10).

Airframe > Operations draws from **every available, admissible source** associated with the evidenced physical airframe, not only DOAA-observed activity: external documented flight histories, published schedules (clearly prospective/intended, not proof of completion), historical datasets, DOAA ADS-B encounters, and other provenance-bearing records. Merge matching evidence into one underlying operation without double-counting; preserve source types, claims, uncertainty and historical coverage limits. **Sightings** remains the narrower DOAA-observed encounter history, so one operation can be represented in both views without becoming two flights. Above the shared comprehensive timeline, show a compact evidence-scoped operational portrait (count of documented operations, first/latest documented activity, frequent recorded routes and airfields, noteworthy events) with clickable route/airfield filters into the timeline. Counts and patterns describe the records available, never lifetime totals or complete operational history. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 39 — Decision 39 — shared provenance pills in Airframe Operations (locked 2026-10-10).

Reuse the established **Published / Recorded / Inferred** evidence pills on Airframe Operations timeline rows, allowing multiple nonexclusive pills when different source types support one deduplicated operation. Clicking a pill independently reveals source identity, timestamps, provenance, method/confidence and limitations as appropriate; clicking the operation row navigates to a verified linked Flight Inspector where available, otherwise uses the existing Contact or evidence-explanation fallback rather than fabricating a Flight. Keep evidence classification distinct from operational status or event severity, consistent with BOARD and Airfield Movements. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 40 — Decision 40 — Airframe Sightings uses encounter-focused shared timeline (locked 2026-10-10).

Airframe > Sightings reuses the canonical bidirectional scrollable timeline/navigation component, with each row representing a genuine DOAA-recorded encounter with the evidenced physical airframe, not an external historical flight or merely published schedule. Show observed date/time, location, encounter duration and actual track/telemetry coverage where available, including source provenance, freshness and gaps. Selecting a sighting navigates to its Contact and encounter-specific Track History for investigation and playback, preserving return context. Sightings is distinct from cross-source Operations and enduring BIO; the same observed flight may appear in Operations without being double-counted as a second operation. Never synthesize a sighting from external data. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 41 — Decision 41 — coherent encounter grouping for Sightings (locked 2026-10-10).

One Airframe Sighting represents one evidenced, coherent DOAA-observed encounter, which may contain multiple ADS-B track segments separated by brief reception gaps; it is not automatically split at every missing message. A genuinely separate encounter becomes a separate Sighting. Grouping relies on time, geography, identity continuity and observed context rather than an arbitrary gap alone; uncertain joins remain explicit and reviewable. Preserve every original observation and source timestamp, expose coverage gaps in Contact Track History and never imply uninterrupted surveillance. Design locked; encounter-boundary thresholds/heuristics to be validated during implementation.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 42 — Decision 42 — Airframe Sightings geographic footprint (locked 2026-10-10).

Above the encounter-focused shared timeline, Airframe > Sightings shows a geographically grounded Sighting Footprint map of DOAA-observed encounter locations and observed track extents. Selecting an encounter on the map highlights its timeline row, and selecting a timeline row highlights its mapped footprint, with navigation preserving scroll/filter context. The footprint is an index of recorded encounters, not a second playback engine; encounter replay remains in Contact > Track History. Show only grounded observation geometry and visible coverage gaps, never fabricated paths. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 43 — Decision 43 — Airframe Media exact and reference imagery, linked to BIO eras (locked 2026-10-10).

Airframe > Media includes evidenced photographs of the **exact physical aircraft** plus clearly separated **MODEL** and **TYPE** reference imagery, reusing established EXACT/MODEL/TYPE specificity pills and independent historical/conflicting evidence states. Prioritize exact-airframe images and preserve capture date (distinct from upload/publication date), attribution, rights/license, provenance and confidence. Where grounded, label identifiable liveries and connect images bidirectionally to relevant Airframe > BIO operator/livery eras or dated milestones; selecting a photo can navigate to its BIO period and BIO can reveal associated photographs. Livery labels are separate from identity-specificity pills. Do not infer exact livery start/end dates solely from a dated photograph, or portray model/type reference images as the individual airframe. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 44 — Decision 44 — Airframe Media gallery and By era views (locked 2026-10-10).

Airframe > Media offers two views over the same provenance-bearing image collection: **Gallery** is the default image-led browsing surface, with filters for EXACT/MODEL/TYPE identity specificity, operator, livery and date; **By era** organizes documented imagery chronologically by evidenced Airframe > BIO periods and milestones, with bidirectional links between images and relevant eras. Preserve EXACT/MODEL/TYPE pills, independent historical/conflicting states, rights/attribution and accurate capture-date precision in both views. Model/type reference imagery must remain visually distinct from exact-airframe photos and must not be assigned to a specific airframe's historical era without evidence. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 45 — Decision 45 — Airframe Overview operational and sighting summaries (locked 2026-10-10).

Airframe > Overview is a rich editorial introduction to the evidenced physical aircraft, with grounded hero imagery, registration and identity, operator/livery, sourced current or last-known status, concise technical profile, historical highlights and contextual EXPLORE links. Include two clearly distinct linked summaries: **Latest known operation** (most recent admissibly documented activity across all available sources, explicitly identifying whether scheduled/published versus observed/confirmed and its timestamp) and **Last DOAA sighting** (latest actual DOAA-recorded encounter, linked to its Contact and Track History). Render explicit unavailable/unknown states rather than silently omitting either concept or confusing absence of evidence with no activity. Avoid duplicating full BIO, Operations, Media or Sightings content. This completes initial tab-level Airframe design: Overview, BIO, Operations, Media, Sightings. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 46 — Decision 46 — Airfield Overview hierarchy, Condition/State distinction and contextual status pills (locked 2026-10-10).

Airfield Overview top-to-bottom order is **exterior airport photo/identity hero → Condition → State → Weather → interactive geographically accurate runway graphic → Stats**. **Condition** describes the physical/environmental situation, **State** operational availability, restrictions and advisories; Weather provides detailed meteorological data and decoded METAR/forecast. The hero can carry a restrained set of sourced, time-qualified airport-level status/advisory pills; the runway graphic carries runway-specific pills (e.g. CLOSED/RESTRICTED) attached to the correct runway, with corresponding non-colour-only visual state. Pills independently reveal meaning, issuing source, issuance/effective period, freshness and limitations. Never infer normal/open status from absence of advisories, confuse runway closure with airport closure, or present expired/unrefreshed restrictions as current. Runways tab remains a separate detailed technical dossier and may reuse the interactive graphic. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- 2026-10-11 Airfield continuation (partial): Diagram includes reference-listed closure only with current status unverified; airport operational status remains unknown. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance.
- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 47 — Decision 47 — two-level interactive runway investigation (locked 2026-10-10).

On Airfield > Overview, selecting a runway in the geographically accurate interactive runway graphic highlights its geometry and opens a compact in-place detail panel with runway designation/directions, dimensions, surface and sourced operational state. A clear **Explore runway ↗** action opens Airfield > Runways with the same runway preselected, exposing its full technical dossier. Preserve selection and back navigation between views; accessible keyboard/touch selection and non-colour-only closed/restricted indication. Keep runway-specific status pills attached to their runway without obscuring geometry; all claims and status freshness retain provenance. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- 2026-10-11 Airfield continuation (partial): North-up diagram uses actual OurAirports paired endpoint positions and sourced pavement widths, with missing geometry excluded and antimeridian wrapping. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance.
- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 48 — Decision 48 — full Runways technical dossier with historical changes (locked 2026-10-10).

Airfield > Runways retains the interactive geographically grounded runway diagram as the selector, with a comprehensive dossier for the selected runway: **physical characteristics** (designation, true/magnetic bearing, length/width, surface, elevations/slope and declared distances where evidenced); **navigation and approach** (verified instrument approach facilities, ILS/localizer, lighting and other aids explicitly differentiated by runway end); **operational information** (sourced closures, restrictions, limitations and advisories with effective periods); and **history and changes** (documented renumbering, extensions, resurfacing, lighting/approach upgrades and other significant alterations). Preserve temporal context, date precision, provenance and unavailable states; never present historical designations/restrictions as current or conflate facilities serving opposite runway ends. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- 2026-10-11 Airfield continuation (partial): Physical and selected-end reference fields retain dimensions/surface, true heading, elevation and displaced threshold; approach facilities, declared distances and historical changes remain unknown. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance.
- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 49 — Decision 49 — whole-runway selection with distinct runway-end dossiers (locked 2026-10-10).

Selecting a runway in the interactive diagram initially selects the single physical runway and shows its shared pavement/geometry/physical characteristics. Within its Runways dossier, allow explicit selection of either reciprocal runway end (e.g. 07 versus 25) for direction-specific approach procedures and aids, lighting, declared distances, navigational facilities and operational restrictions. The diagram continues highlighting the physical runway and clearly indicates the selected direction. Never model reciprocal runway ends as unrelated strips or merge their directional capabilities. Preserve evidence provenance, effective dates, accessibility and selection context. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- 2026-10-11 Airfield continuation (partial): One physical strip with reciprocal end selection; selected strip and end persist across tabs and units. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance.
- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 50 — Decision 50 — runway-specific recent activity and Movements deep link (locked 2026-10-10).

Airfield > Runways dossier includes **Recent activity** for documented takeoffs, landings and relevant events tied by evidence to the selected physical runway or runway end as appropriate. Rows navigate to an evidenced Flight or Contact Inspector using the shared navigation grammar; **View all runway activity ↗** opens the existing Airfield > Movements timeline with the runway filter applied, preserving navigation context. Use the canonical cross-source movement model rather than a duplicate runway-activity store. Never assign a runway solely from an airport arrival/departure or unsupported geographic assumption; expose provenance, temporal applicability and uncertainty. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Unify canonical movement records and timelines; separate Home/Explore; add date/evidence/runway navigation and sourced Airport conditions/geometry.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 51 — Decision 51 — Airfield weather dashboard and runway-relative wind indicator (locked 2026-10-10).

Airfield > Overview Weather section presents a compact dashboard of latest sourced observation time, wind direction/speed (including gusts where available), visibility, cloud ceiling, temperature, pressure and aviation flight category. Retain raw METAR directly accessible alongside plain-language decoding, individual measurement explanations and source/provenance; clearly distinguish observed METAR conditions from TAF forecasts. On the geographically accurate runway diagram, show a wind-direction indicator aligned to the same geographic reference so reported wind can be understood relative to runway orientation; never infer the active runway or runway assignment from wind alone. Show stale, unavailable, variable or conflicting weather explicitly, with correct units and timestamps. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- 2026-10-11 Airfield continuation (partial): Diagram can plot a sourced true-direction wind indicator with freshness; variable wind is explicitly not plotted as a single direction. No active-runway inference. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance.
- 2026-10-11 Airport continuation (partial): Sourced METAR observation dashboard: true/variable/calm wind, gust, lower-bound visibility, ceiling, temperature/dew point, altimeter, source category, observation/retrieval times, raw report, freshness and request recovery. Runway-relative diagram and forecast remain unimplemented. Local tests and browser fixture evidence: docs/qa/airport-inspector-acceptance.json. No live-provider or signed-in Preview acceptance.
- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 52 — Decision 52 — time-selectable Airfield Stats activity summary (locked 2026-10-10).

Airfield > Overview concludes with a compact evidence-scoped Stats section offering **Today / 7 days / 30 days** periods (airport-local time), arrivals, departures, published versus recorded movement evidence, delays and noteworthy operational events. Metrics derive from the shared deduplicated cross-source movement model: published and recorded evidence for the same operation are not summed as two flights, and published scheduled activity must not be represented as confirmed completed movement. Surface coverage, provenance and unavailable/incomplete data; selecting metrics opens Airfield > Movements with relevant time period and filters preserved. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Unify canonical movement records and timelines; separate Home/Explore; add date/evidence/runway navigation and sourced Airport conditions/geometry.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 53 — Decision 53 — Airfield Condition is physical ground/runway condition (locked 2026-10-10).

In Airfield > Overview, **Condition** is a concise evidence-based snapshot of physical airfield/runway/ground-surface conditions (reported contamination, snow/ice, braking-action assessments, surface condition reports and related observations), distinct from **State** (operational availability, closures, restrictions, advisories) and **Weather** (meteorological observations/forecasts). Show each report's applicable runway/area, source, observation/validity time, precision and freshness; never extrapolate a report for one runway to the entire airport. When no current report is available, explicitly state **No current condition report available**, not 'Clear', 'Good' or safe. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- 2026-10-11 Airport continuation (partial): Overview and Operations explicitly state No current condition report available; never infer ground condition from METAR or missing reports. Local tests and browser fixture evidence: docs/qa/airport-inspector-acceptance.json. No live-provider or signed-in Preview acceptance.
- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Remaining full contract: sourced runway geometry/end dossiers, state/condition notices, weather/forecast/map relationship, historical canonical deduplicated movement model and actual private Preview acceptance.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 54 — Decision 54 — Airfield State operational availability and advisories (locked 2026-10-10).

In Airfield > Overview, **State** reports evidenced airport operational availability and restrictions: confirmed open/closed status where available, ground stops, significant advisories, restrictions and disruptions, with affected area/runway, issuing authority, source, issue/effective/expiry times and freshness. A concise airport-level pill on the exterior-photo hero summarizes the most consequential supported current state, while the State section provides full contextual details and provenance. A runway closure is not equivalent to airport closure; do not infer normal/open operations from absence of notices, or treat expired/unrefreshed advisories as current. Use **Unknown** when airport-wide operational status cannot be established. Distinct from physical-surface **Condition** and meteorological **Weather**. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- 2026-10-11 Airport continuation (partial): Overview/Operations show Unknown operational status and explicitly distinguish absent notices from evidenced open operations. Authority notices/state hero remain unimplemented. Local tests and browser fixture evidence: docs/qa/airport-inspector-acceptance.json. No live-provider or signed-in Preview acceptance.
- hydrateBoard / boardApi / airportMovementEvidence / airport lookup
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Remaining full contract: sourced runway geometry/end dossiers, state/condition notices, weather/forecast/map relationship, historical canonical deduplicated movement model and actual private Preview acceptance.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 55 — Decision 55 — universal units (locked 2026-10-10).

DOAA uses one app-wide measurement preference system with independent selectable display units (distance NM/km/mi, speed kt/km/h/mph, altitude/elevation ft/m, temperature °C/°F, pressure hPa/inHg, and context-appropriate visibility and other quantities), rather than only a Metric/Imperial toggle. Provide an **Aviation standard** preset as default. Apply consistently across SKY, BOARD, Inspector, charts, tooltips and replay while preserving canonical source values/units, converting at display boundaries and retaining explicit unit labels where needed. Do not alter or ambiguously convert flight levels, raw METAR, runway identifiers or other fixed aviation notation. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- 2026-10-11 Airfield continuation (partial): Runway dimensions/elevation/threshold labels use independent feet/metres preference; geometry and selection remain unchanged. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance.
- 2026-10-11 Airport continuation (partial): METAR quantities use shared independent units; original raw METAR is preserved. Includes visibility lower-bound semantics and true-direction convention. Local tests and browser fixture evidence: docs/qa/airport-inspector-acceptance.json. No live-provider or signed-in Preview acceptance.
- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- 2026-10-11 continuation: Independent distance/speed/altitude/temperature/pressure/visibility/vertical-speed selectors and Aviation standard reset; display conversions across currently present SKY/Rack/Inspector/LOOK/SLIDES/replay paths. Canonical inputs unchanged, unknown and zero distinguished, chart labels convert together with values. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 56 — Decision 56 — optional SKY NAV aeronautical overlay (locked 2026-10-10).

SKY offers **NAV** as a selectable aviation-chart-convention overlay independent of the existing **BASE / STREET** underlying map styles, not as a third base map. Where authoritative, lawfully usable and current data is available, render control zones, controlled airspace, restricted/prohibited/danger areas, published vertical limits, identifiers and classifications using recognizable navigation-chart conventions, with appropriate Canadian charting practices and geographic applicability. Selecting a feature reveals its published description, vertical/time applicability, source/effective date and controlling authority where supported. Provide independent visibility controls for airspace boundaries, labels and restrictions to manage clutter; retain consistent symbology over either base style. Clearly mark coverage and freshness limitations and never imply DOAA is a certified operational navigation chart. Design locked; source licensing/data feasibility and implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 57 — Decision 57 — SKY MET mode with historical playback, forecasts and lightning from initial release (locked 2026-10-10).

MET is a selectable weather-focused SKY map mode, independent of the BASE/STREET underlying map styles and interoperable with optional NAV overlays. Its essential launch scope includes **timestamped historical weather playback**, **forecast weather** and a selectable **lightning-strike detection layer**, alongside observed precipitation/radar, wind, clouds and aviation weather observations where legally usable data supports them. The time control distinguishes **past observations**, **latest available observations** and **future forecasts**; label actual observation, detection and forecast-valid times, issue times, update freshness and missing coverage. Visually distinguish forecast products from observed radar, and never depict present aircraft positions as historical co-temporal observations. Lightning locations/times are evidence-based with coverage and accuracy limitations; never fabricate strikes or forecast data. Zero-incremental-cost licensing, Canadian coverage, historical retention, forecast horizons and data-source reliability remain feasibility gates, not claims of implementation. Design locked; implementation and data verification pending.

Amendments:

- Decision 57 scope clarification (user-directed, 2026-10-10). **Lightning is additive, not a substitute for other MET data.** Preserve the full proposed MET layer catalogue: precipitation radar/intensity/movement/history; cloud cover, ceilings and satellite imagery where available; wind direction/speed/gusts and forecast fields; aviation METAR/SPECI observations (visibility, temperature, dew point, pressure, flight category); TAF and mapped forecast products; broader temperature, pressure, fronts and meteorological fields; **plus** timestamped lightning strike detections and history. Provide independent layer controls, legends, observed-vs-forecast differentiation, timestamps and provenance; historical playback and forecasts remain first-release design requirements. Availability, licensing, temporal granularity and geographical coverage require source verification. This clarification is part of locked Decision 57, not a reduction in scope.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 58 — Decision 58 — unified MET time navigator (locked 2026-10-10).

SKY MET provides one shared **History / Now / Forecast** time navigator across all enabled weather layers (radar/precipitation, clouds/satellite/ceilings, wind/gusts, aviation METAR/SPECI/TAF and mapped forecast products, broader meteorological fields, lightning detections). History includes Play/Pause, time scrubbing, and adjustable playback speed; Now shows latest available observations; Forecast selects published forecast-valid times. Each layer retains its actual observation/detection/issue/valid timestamps, independent update cadence, geographical coverage and gaps; display staleness and availability, do not fabricate missing frames or imply measurements at different times are simultaneous. Aircraft observations must not be incorrectly portrayed as co-temporal with historical weather. Design locked; implementation and free-data feasibility pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 59 — Decision 59 — ECCC-first modular MET data-source strategy (locked 2026-10-10).

Use Environment and Climate Change Canada **MSC GeoMet** as primary Canadian map weather provider for available radar/precipitation, meteorological products and Canadian Lightning Detection Network **flash-density** coverage; use **NOAA Aviation Weather Center** for worldwide aviation METAR/SPECI and TAF feeds. Permit additional historical/model forecast/satellite sources only when geographic coverage, rights, attribution, rate limits, temporal resolution, and zero-incremental-cost operation are confirmed. Build modular source adapters with source-specific timestamps, freshness, gaps, coverage and resolution surfaced in MET; provider selection should be automatic, not user overhead. **Initial lightning layer represents observed flash activity density, NOT individual strike locations**; point markers require an independently verified point-level feed. ECCC radar's documented rolling ~3-hour history does not establish long-term radar archives; distinguish modelled historical fields from direct observations. Live feed behavior, lightning retention, licenses/caching and hosting constraints remain explicit verification gates. This decision locks source architecture, not implementation or verified feed integration.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 60 — Decision 60 — synchronized historical aircraft and MET playback (locked 2026-10-10).

In SKY MET History, provide an optional historical aircraft layer driven by DOAA's actual recorded ADS-B observations and synchronized to the same time cursor as weather radar, lightning density, clouds, wind and other time-enabled MET layers. Render observed tracks/positions only where evidence exists; show coverage gaps and stale intervals explicitly, never invent interpolated flight paths or imply DOAA has complete historical surveillance. Keep observation times, weather product times, spatial resolution and temporal accuracy distinct; shared clock does not imply identical sampling times. Clearly distinguish historical aircraft from current live traffic, and make unavailable historical aircraft coverage an explicit state. Supports investigation of approaches, holds, diversions and weather evolution without asserting causal explanations from correlation alone. Design locked; implementation and source/data availability pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 61 — Decision 61 — time-aware historical aircraft Inspector in MET (locked 2026-10-10).

Selecting an aircraft during SKY MET historical playback opens Contact Inspector **in the selected historical time context**, not automatically at latest live state. Show the aircraft's actually recorded position, altitude, speed, ground track and other available telemetry with its precise observation time, source, associated encounter and freshness/time offset relative to the shared MET cursor. If there is no observation at the exact cursor time, clearly label the nearest eligible recorded observation and its actual timestamp; do not portray it as simultaneous or fabricate intermediate telemetry. **Explore Track History ↗** opens the full encounter's recorded history with a route back to the paused MET investigation. Opening/closing Inspector must preserve MET layers, camera, selected time and paused playback state. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 62 — Decision 62 — contextual MET weather inspection (locked 2026-10-10).

Selecting a MET map feature opens a lightweight, contextual weather detail panel rather than forcing the full aircraft/Flight Inspector. Radar features expose supported precipitation intensity/type and observation timestamp; lightning density cells expose reported flash density, geographic cell/area and aggregation interval, never fictitious individual strike points; METAR/SPECI stations expose decoded values and accessible raw reports; wind/cloud/other meteorological fields expose supported quantities, units and applicable height/pressure level; forecasts expose predicted conditions, forecast valid time and issuing model/authority. All panels carry source, observation/issue/valid time, units, coverage/uncertainty and unavailable states. Opening/closing the panel preserves map camera, layer selection and History/Now/Forecast playback cursor/state. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 63 — Decision 63 — user-oriented grouped MET layer controls (locked 2026-10-10).

Organize SKY MET layer controls by investigation purpose, not provider: **Precipitation** (radar, precipitation type, accumulation); **Atmosphere** (clouds, satellite, wind, temperature, pressure); **Aviation** (METAR/SPECI, TAF, ceilings, visibility); **Convective** (lightning flash-density activity, storms, available advisories); **Context** (historical/live aircraft where temporally appropriate, NAV airspace). Each expandable group offers individual layer visibility, legends, applicable altitude/pressure-level selectors, source and coverage/freshness context. Handle visual conflicts and incompatible overlays transparently rather than silently replacing or disabling layers. Display no-data states for selected time/location and retain chosen layer settings across time navigation and contextual inspection. Design locked; implementation and data-source validation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 64 — Decision 64 — SKY three-part map controls (locked 2026-10-10).

SKY exposes three orthogonal control dimensions: **Style** (BASE / STREET underlying geographic map), **Mode** (TRAFFIC / MET investigation workspace), and **Layers** (NAV chart-convention airspace overlay and other optional overlays, with MET's grouped meteorological layers when MET is active). Combinations such as MET + STREET + NAV are supported; BASE/STREET/NAV/MET are not four mutually exclusive map choices. Desktop uses a compact floating toolbar; mobile opens a tidy layer sheet to protect map and Inspector space. Changing Style preserves active Mode, layer selections, camera and playback cursor; changing Mode should preserve sensible investigation context while honoring each mode's temporal semantics. Controls must be accessible and indicate unavailable data without implying it is active. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 65 — Decision 65 — context-preserving SKY TRAFFIC/MET mode switching (locked 2026-10-10).

Switching between TRAFFIC and MET retains the current map geographic center and zoom, allowing investigation of the same area. Each mode remembers its own relevant layer selections and settings; MET's History/Now/Forecast cursor and paused playback state persist across mode switches and remain independent of TRAFFIC's live-state clock. Entering MET while following an aircraft disengages camera Follow but leaves the camera at its last position. Returning to TRAFFIC does not unexpectedly re-engage Follow or move the map; user may deliberately re-enable Follow. Changing mode must not reset unrelated map style, NAV overlay, selected geographic context or Inspector navigation without a clear user action. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 66 — Decision 66 — SKY fresh-launch versus in-session resume (locked 2026-10-10).

On a fresh app launch, SKY defaults to **TRAFFIC** mode and the user's **Home catchment**, with their saved BASE/STREET map-style preference and NAV/other optional layer visibility preferences. In an active session, returning to SKY from BOARD, Inspector or other views restores the exact prior SKY investigation context: geographic center, zoom, TRAFFIC/MET mode, relevant layer selections and a paused MET playback time/state where applicable. Fresh launch deliberately resets active exploration to Home rather than unexpectedly reopening a prior temporary catchment or historical MET session, but does not discard durable user preferences. Preserve existing Home-versus-Explore catchment semantics. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 67 — Decision 67 — unified, entity-centered, relationship-aware SKY search (locked 2026-10-10).

Replace/refactor the currently implemented fragmented search into a single search facility shared across TRAFFIC and MET that recognizes airport IATA/ICAO identifiers and names (e.g. **YHZ ↔ CYHZ**), flight designators (e.g. **AC234**), callsigns, registrations, airframes, airspace identifiers and other canonical aviation entities. Search must return **everything meaningfully related** that DOAA can substantiate, not merely the first matching object: organize a clearly prioritized **direct/primary match** and navigable related categories such as flights/movements, aircraft/Contacts/recorded encounters, airfield information, weather/MET, airspace/NAV and historical records, where supported by evidence. Match identifiers/aliases and canonical relationships; distinguish exact matches from inferred/associated results, deduplicate records and show provenance, coverage and empty states rather than manufacturing connections. Results navigate to relevant Inspector/object, map location, timeline or filtered views while preserving active TRAFFIC/MET mode unless explicitly changed. User specifically requests improvement of **existing implemented search**, not an independent duplicate. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- searchRack / universalSearch / openObject / memory search
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 68 — Decision 68 — persistent structured search investigation workspace (locked 2026-10-10).

Unified search results open in a structured investigation workspace rather than a large ephemeral dropdown. Prioritize the strongest exact/direct entity match, followed by expandable, evidence-backed groups of related records. Preserve the original query, result grouping, expanded/collapsed sections, filters and scroll position when navigating into an Airfield, Flight, Airframe, Contact, NAV airspace or MET result; Back returns to the same search investigation context. For flight designators such as **AC234**, distinguish the recurring flight/service identity from individual **dated operations** and link dated operations to their supported airframes, Contacts, movements and provenance; never conflate same-number operations on different dates. Extend/refactor DOAA's existing search rather than create a competing parallel facility. Show coverage limitations and empty related sections appropriately. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- searchRack / universalSearch / openObject / memory search
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 69 — Decision 69 — time-independent search with optional contextual filters (locked 2026-10-10).

Unified search searches **all available records by default**, independent of active SKY TRAFFIC/MET mode, MET playback time, current map bounds, Home/Explore catchment or current date. Offer explicit **All / Live / Historical** controls, date/date-range and geography filters. Context from the current map viewport or MET time may prioritize/highlight relevant matches, but must not silently exclude unrelated results. A flight-number query such as **AC234** retains recurring service identity and all available dated operations, highlighting those relevant to the selected investigation moment without hiding other dates. Make active filters visible and reversible, preserve search state across navigation, and communicate coverage/retention limits rather than imply exhaustive historical data. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- searchRack / universalSearch / openObject / memory search
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 70 — Decision 70 — evidence-backed search autocomplete and local recent searches (locked 2026-10-10).

Extend DOAA's existing unified search with typeahead suggestions from genuinely indexed entities and grounded aliases (airfield IATA/ICAO codes and names, recurring flight identifiers and dated operations, callsigns, registrations, airframes, airspace identifiers and other supported records). Offer contextual, navigable shortcuts such as **Movements at YHZ** or **Weather at YHZ** only when a real linked destination exists; never fabricate matches or relationships. Keep the full structured, relationship-aware results workspace available independently of suggestions. Make suggestions keyboard- and screen-reader-accessible, clearly distinguish direct matches from related actions, and handle empty/loading/error states. Store recent searches locally with appropriate privacy controls, not as an unnecessary cloud profile. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- searchRack / universalSearch / openObject / memory search
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 71 — Decision 71 — progressive categorized search results with honest counts (locked 2026-10-10).

Unified relationship-aware search presents category summaries (e.g. Flights, Movements, Airframes/Contacts, Weather/MET, Airspace/NAV and other evidence-backed related records) before progressively fetching potentially large result collections on expansion. Use paginated/incremental loading, visible loading/error/empty states and retained category expansion/scroll context. Show per-category totals only with explicit count semantics (**exact indexed count**, **estimate**, or **unknown**); never conflate the number of indexed observations/records with complete real-world airport activity or historical coverage. Deduplicate canonical entities and operations before counting, surface time/geographic coverage limitations, and keep full discoverability without an overwhelming or slow initial results screen. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- searchRack / universalSearch / openObject / memory search
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 72 — Decision 72 — evidence-qualified identity matching in unified search (locked 2026-10-10).

Search all known canonical identifiers and historically applicable aliases for aircraft/airframes, Contacts, flights and operations, including registrations, ICAO 24-bit hex identifiers, callsigns, airline flight designators and source-specific aliases. Clearly separate **confirmed identity matches** (relationships supported by sufficient evidence) from **possible associations** (plausible but unverified links), each with source/provenance and applicable dates. Never silently merge records based only on reused callsigns, temporal/geographic proximity or ambiguous identifiers; distinguish enduring airframe identity from registration/operator changes and recurring flight designators from individual dated operations. Preserve conflicts and uncertainty, expose evidence in search and Inspector, and permit investigation of tentative links without promoting them to canonical fact. Design locked; implementation pending.

Search across all recorded identifiers, historical aliases, registrations, ICAO hex identifiers, callsigns, flight designators and source-specific names, preserving identity provenance and temporal applicability. Separate **confirmed identity matches** (evidence supports the same airframe, flight or operation) from **possible associations** (suggestive but insufficient evidence). Never silently merge distinct entities based solely on shared/recurring callsigns, identifiers, proximity or timing; surface possible associations separately with explicit uncertainty and supporting evidence. Respect identifier reuse and changes over time. This extends canonical normalization and provenance principles rather than bypassing them. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- searchRack / universalSearch / openObject / memory search
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 73 — Decision 73 — identity-anchored, time-contextual search navigation (locked 2026-10-10).

Search navigation preserves both the canonical entity identity and the selected result's applicable time context. An undated entity selection opens its current or latest known state by default; selecting a dated operation, historical alias, or other time-specific result opens that evidenced historical context. Inspector visibly identifies the active time context, shows attributes and relationships applicable to that period where supported, and offers an explicit route to the latest known state without losing the underlying identity or navigation history. Do not backfill historical registration, operator, flight association, configuration or other attributes from present-day records without temporal evidence. Unknown or conflicting historical states remain explicit. Reuse established time-aware Inspector and playback/navigation architecture where sensible; do not imply that the design is implemented. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- searchRack / universalSearch / openObject / memory search
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 74 — Decision 74 — adaptive chronological search exploration (locked 2026-10-10).

Dated search results use an adaptive chronological presentation: recent or small result sets appear as a simple reverse-chronological list; larger histories offer date-grouped navigation and a compact timeline or date-range navigator where useful. These are presentations of the same underlying progressively loaded, paginated and evidence-qualified result set, not separate search semantics. Preserve explicit date filters, provenance, known coverage limitations, selected time context, query, scroll position and navigation history when switching or expanding views. Counts remain honest about known, estimated and unknown totals. Never suggest that gaps in documented operations prove inactivity; distinguish absence of records from evidence of absence. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- searchRack / universalSearch / openObject / memory search
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 75 — Decision 75 — historical search preview before workspace transition (locked 2026-10-10).

Selecting a dated historical search result opens a time-correct Inspector preview without silently changing the active map, timeline, live monitoring or other workspace context. Inspector visibly and unambiguously identifies the historical time context and its distinction from the active workspace time. Provide an explicit **View in historical context** action that deliberately transitions the relevant map and timeline into the selected historical period, maintaining entity identity, provenance and navigation continuity. Historical preview must not present present-day state as historical fact; unavailable historical map or playback coverage must be indicated rather than fabricated. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- searchRack / universalSearch / openObject / memory search
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 76 — Decision 76 — preserved live workspace and explicit return (locked 2026-10-10).

Before a deliberate transition from live monitoring into historical context, preserve a restorable snapshot of the live *interface* workspace, including map position and zoom, filters, selected entity and relevant panel state. Provide a visible **Return to Live Workspace** action that restores this context, while ordinary Back navigation supports stepwise movement through historical exploration. The snapshot is not a freeze-frame of aircraft positions or live telemetry: on return, current live data must refresh and any unavailable or stale selection must be handled transparently. Do not silently overwrite the saved live workspace through historical interactions; avoid inventing historical or current state. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- searchRack / universalSearch / openObject / memory search
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 77 — Decision 77 — preserve selected identity with qualified live availability (locked 2026-10-10).

On returning from historical exploration to a preserved live workspace, restore the selected aircraft's canonical identity and Inspector context, then refresh live observations. If the aircraft is no longer present in current live coverage, label it **Not currently observed** and, where evidenced, show its last verified observation time and position with provenance and age. Distinguish the historical/last-observed record from active live traffic; never render a stale position as a live aircraft or infer that loss of observation means landing, departure or inactivity. If identity or the last observation cannot be substantiated, indicate that uncertainty instead of fabricating continuity. Preserve map, filters and relevant interface state from Decision 76. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- searchRack / universalSearch / openObject / memory search
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 78 — Decision 78 — explicit last-observed aircraft state on live map (locked 2026-10-10).

When live aircraft observations exceed the applicable freshness threshold, stop depicting the aircraft as actively observed. Temporarily show its last verified position using an unmistakably distinct **Last observed** marker, with the observation timestamp, elapsed age and available provenance; apply a documented, source-aware expiry policy, after which the marker leaves the live map layer. If the aircraft remains selected, Inspector preserves canonical identity and the last evidenced observation even after marker expiry, clearly marked as no longer current. Do not extrapolate current position, imply continued flight or infer a landing from stale or missing observations. Handle unavailable timestamps or conflicting source freshness explicitly rather than presenting unsupported precision. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 79 — Decision 79 — evidence-aware observation freshness policy (locked 2026-10-10).

Determine aircraft observation freshness from the actual observation timestamp, known source latency and feed characteristics, using documented source-specific thresholds as defaults rather than a universal timeout. Explicitly handle missing, unreliable or conflicting timestamps and distinguish **stale observation**, **source unavailable**, and **aircraft no longer observed** as different evidentiary conditions. Do not confuse ingestion time with observation time or treat feed failure as proof an individual aircraft disappeared. Apply the resulting status consistently to live markers, Inspector and the last-observed expiry behaviour in Decisions 77–78, with transparent age and provenance where supported. Specific threshold values require evidence and validation during implementation; do not invent them at design lock. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 80 — Decision 80 — qualified last-known map during live feed interruption (locked 2026-10-10).

If the live tracking feed is interrupted or unavailable, temporarily preserve the last verified aircraft picture as explicitly non-live, with visibly distinct marker treatment and a persistent **Live data interrupted** status showing the last successful update time where verified. Feed-level unavailability takes precedence over interpreting individual aircraft as having disappeared; do not imply that all aircraft stopped flying or left coverage. Continue showing observation ages and provenance as available, apply a documented retention/expiry policy, and make unavailable or unreliable update times explicit. Restore normal live treatment only as fresh verified observations resume, not merely when a network request succeeds. Keep Inspector selection and other workspace context intact where feasible. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 81 — Decision 81 — quiet, explicit recovery of live tracking (locked 2026-10-10).

When a previously interrupted live tracking feed resumes delivering fresh, verified observations, replace the persistent interruption indicator with a brief, unobtrusive **Live data restored** confirmation. Restore normal live marker treatment only for aircraft with newly verified fresh observations; retain clearly qualified last-known or unavailable status for aircraft not yet re-observed. Avoid repeated distracting recovery notifications during intermittent or flapping connectivity, while keeping actual feed status and observation ages honest and visible. A successful request without fresh usable observations does not constitute recovery. Preserve current selection and workspace context through the transition. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 82 — Decision 82 — evidence-ranked live position with conflict disclosure (locked 2026-10-10).

When multiple tracking sources provide differing live positions for an aircraft, choose a map display position only when source quality, actual observation time, identity confidence and cross-source consistency support that choice. Preserve the underlying observations and provenance, and disclose material credible disagreement in Inspector with relevant timestamps, sources and uncertainty. Never average contradictory positions into an invented location or silently hide consequential disagreement behind an apparently precise marker. If no position is sufficiently supported, qualify or withhold the live map position rather than asserting false certainty. Conflict detection thresholds and ranking criteria must be documented and validated against real feed characteristics during implementation. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 83 — Decision 83 — restrained map uncertainty with detailed Inspector evidence (locked 2026-10-10).

When a displayed aircraft position has a material, credible cross-source conflict, qualify its map marker with a subtle but perceivable uncertainty indicator that does not rely on colour alone. Keep the primary map legible rather than plotting every competing observation by default. Inspector explains the disagreement and exposes the individual evidenced source positions, observation timestamps, provenance and relevant quality qualifications. If no precise position is defensible, do not place a deceptively precise aircraft marker; retain an accessible entity/Inspector path and communicate the uncertainty without inventing a location. Coordinate this visual language with stale and interrupted-feed states without conflating their meanings. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 84 — Decision 84 — confidence-gated live aircraft identity reconciliation (locked 2026-10-10).

Reconcile observations from different tracking sources into one aircraft identity only when reliable identifiers, temporal applicability and corroborating evidence establish sufficient confidence. Similar location, heading, timing or apparent trajectory alone must not silently merge potentially distinct aircraft. Keep unresolved observations or identities separate or explicitly qualified, and make conflicting registration, flight designator, transponder or other identifiers visible in Inspector with sources, observation times and the basis for any confirmed or tentative association. Respect identifier reuse, reassignment and changes over time; preserve raw observations and provenance, and allow identity associations to be revised as new evidence arrives without silently rewriting history. Align with Decision 72's evidence-qualified identity matching and Decision 82's position-conflict handling. Confidence criteria require validation during implementation. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 85 — Decision 85 — traceable identity corrections with proportionate notification (locked 2026-10-10).

When new reliable evidence changes an aircraft's current interpreted identity, update the current identity only to the extent supported while preserving immutable source observations, their originally reported identifiers, timestamps and provenance. Inspector exposes a traceable correction history, the evidence supporting the revised association, the time of correction and any remaining uncertainty; do not silently rewrite past source reports or imply earlier interpretations were established facts. Notify David unobtrusively when a meaningful correction affects an aircraft he is actively following, but avoid distracting alerts for routine background reconciliation. Maintain stable navigation and selection across corrected identity associations where justified, and explicitly handle splits or unresolved identities. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 86 — Decision 86 — evidence-preserving identity split with selection continuity (locked 2026-10-10).

If new evidence establishes that observations previously reconciled as one aircraft belong to two or more distinct aircraft, split their interpreted identity and track associations according to the best-supported evidence without deleting, rewriting or fabricating original source observations. Preserve a traceable reconciliation history with the prior association, correction rationale, provenance, applicable times and any still-unresolved observations. Do not arbitrarily attach ambiguous history to either resulting identity. If David was following the previously merged track, retain context, explain the split unobtrusively and offer an explicit choice of which resulting aircraft to follow rather than silently switching his selection. Maintain navigability from prior search, Inspector and historical references, with appropriately qualified redirects or split notices. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 87 — Decision 87 — traceable identity merge with stable references (locked 2026-10-10).

When reliable evidence establishes that two or more separately represented tracks or identity records refer to the same aircraft, consolidate them into one current aircraft presentation only to the extent supported by the evidence. Preserve each original observation, reported identifier, source, timestamp and provenance, together with a traceable record of the reconciliation and its rationale. Existing search results, Inspector links, selections and historical references must resolve to the reconciled identity without silently erasing prior identities or fabricating continuity where observations are incomplete. If David is actively following an affected record, explain the merge quietly and preserve his selection context. Reconciliation must remain revisable if subsequent evidence warrants a split, consistent with Decision 86. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 88 — Decision 88 — persistent airframe with time-qualified identities (locked 2026-10-10).

Where reliable evidence supports continuity of a physical airframe, maintain a persistent canonical airframe identity independent of registrations, operators, flight identifiers and other attributes that may legitimately change over time. Represent those identifiers and relationships with evidenced applicable periods and provenance, preserving gaps, disputed boundaries and unknowns rather than inventing exact change dates. Historical search must recognize former identifiers; Inspector in a selected historical context must present the attributes supported for that time, with a clear path to the latest known state. Distinguish legitimate temporal identity changes from mistaken associations and their corrections (Decisions 84–87), and do not infer airframe continuity solely from a reused registration or callsign. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 89 — Decision 89 — bounded uncertainty for undated historical identity transitions (locked 2026-10-10).

When a legitimate change of registration, operator or another time-qualified aircraft attribute is evidenced but its effective date is unknown, represent the transition within an evidence-supported interval, bounded where possible by the last confirmed observation of the former attribute and the first confirmed observation of the successor. Do not assign an invented midpoint or treat those observation times as the actual effective date. Historical timeline and Inspector must distinguish confirmed observations, the interval of uncertainty and any unknown or open-ended bounds, with source provenance and relevant qualification. If observations conflict or overlap, disclose that disagreement rather than forcing a tidy sequential narrative. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 90 — Decision 90 — evidence-ranked historical claims with explicit disagreement (locked 2026-10-10).

When credible sources conflict about a historical aircraft attribute or relationship, assess claims using source authority, specificity, temporal relevance, directness and corroboration rather than either silently choosing a preferred provider or giving all claims equal weight. Present a best-supported account as provisional where warranted, with a visible conflict qualification; if evidence does not support a defensible preference, leave the attribute unresolved. Inspector must retain the competing claims, exact asserted facts, applicable or claimed periods, source provenance, evidence and reasons for the confidence assessment. Preserve original records, permit reassessment when new evidence appears and never collapse genuine historical disagreement into an invented single narrative. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 91 — Decision 91 — versioned historical interpretation with preserved evidence (locked 2026-10-10).

When stronger new evidence overturns a previously accepted historical interpretation, update the current best-supported conclusion while retaining the earlier interpretation as explicitly superseded, not as an equally credible alternative. Preserve original source observations and claims unchanged, separate from DOAA's derived conclusions. Record the interpretation revision, supporting and contrary evidence, rationale, effective scope and time of reassessment. Inspector must make the current interpretation and its revision history accessible without conflating the date of a historical event with the date DOAA learned or revised its understanding. Maintain stable historical references and provenance, and permit further evidence-driven revisions. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 92 — Decision 92 — historical timeline first, knowledge timeline on demand (locked 2026-10-10).

Present aircraft history primarily according to the supported time of real-world events or their evidence-bounded intervals, not when DOAA acquired or revised information. In Inspector's evidence and revision details, distinguish where known the asserted event/effective time, source observation time, source publication time, DOAA ingestion/acquisition time and interpretation/reassessment time; do not conflate them or invent unavailable timestamps. Keep these knowledge-history details accessible without cluttering ordinary map and timeline browsing. Preserve provenance and versioned interpretations consistent with Decisions 89–91. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 93 — Decision 93 — unified aircraft history with categorized events (locked 2026-10-10).

Present an aircraft's supported history as a single chronological timeline, distinguishing categories such as identity and operator changes, operational observations and independently evidenced notable events. Provide category filtering while preserving chronological context and cross-category relationships. Use restrained visual emphasis for genuinely significant milestones based on documented criteria and source evidence, not simply for routine flights or speculative significance. Preserve provenance, uncertainty, temporal bounds and differences between observations and interpreted events; do not invent events or imply that the absence of records means inactivity. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 94 — Decision 94 — evidence-based milestones distinct from personal significance (locked 2026-10-10).

DOAA may emphasize historically notable aircraft events only under explicit, defensible editorial criteria supported by attributable evidence, with source provenance and uncertainty available in Inspector. David may separately mark events as personally significant without those personal marks being represented as objective historical importance or source-established fact. Preserve both classifications distinctly in the data model and interface; allow filtering and restrained visual treatment without making routine observations inherently notable. Do not infer first-ever, last-ever, rarity, significance or absence of activity from incomplete tracking coverage. Criteria and any personalized markers must remain inspectable and revisable. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 95 — Decision 95 — simple one-tap aviation moment bookmark (locked 2026-10-10).

David can save an interesting aircraft encounter with a single deliberate bookmark action, without a required journal form, notes, photos or location entry. Capture the referenced aircraft or track identity, the bookmark creation time, and the relevant observation or historical context and source provenance available at capture, preserving uncertainty and the distinction between a feed observation and David personally seeing the aircraft. Bookmarks must remain navigable despite later identity corrections, merges or splits, with explicit qualification when a reference becomes ambiguous. Do not silently infer that David witnessed the aircraft merely because he bookmarked it. Keep the saved-items experience simple; richer journaling is not part of this decision. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Private idempotent bookmark API references existing observations; account isolation and prohibition on fabricated DOAA evidence passed real SQLite regression. Full bookmark/gallery interaction remains unimplemented.
- 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json.

Outstanding: Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 96 — Decision 96 — bookmark opens original moment with path to current aircraft (locked 2026-10-10).

Opening an aircraft bookmark restores the saved observation or historical context, including the time, available source evidence, identity qualification and provenance captured or referenced at bookmarking, rather than silently substituting the aircraft's latest state. Provide a direct, deliberate path from that moment to the aircraft's current best-supported profile. Preserve the bookmark's original reference through subsequent identity corrections, merges or splits, and disclose unresolved associations rather than inventing continuity. Distinguish the moment David bookmarked from a confirmed personal sighting. Keep the experience focused rather than presenting two full views side by side by default. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json.

Outstanding: Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 97 — Decision 97 — visual bookmark collection (locked 2026-10-10).

Present David's saved aircraft moments as a visually engaging collection of cards, using attributable aircraft photographs or evidence-grounded map previews where available. Each card must remain recognizable and useful without imagery, showing the aircraft's supported identity, the saved moment's time and a concise context cue; do not fabricate images, aircraft matches or map positions to fill gaps. Distinguish a historical saved observation from the aircraft's current state, and preserve the moment-first opening behavior of Decision 96. Use responsive, accessible card layouts, sensible loading and missing-media states, and lightweight media handling consistent with zero incremental cost. Do not require folders, tags or manual curation to browse bookmarks. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Private idempotent bookmark API references existing observations; account isolation and prohibition on fabricated DOAA evidence passed real SQLite regression. Full bookmark/gallery interaction remains unimplemented.
- 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json.

Outstanding: Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 98 — Decision 98 — context-sensitive hybrid bookmark cards (locked 2026-10-10).

Prefer a reliably identified aircraft photograph, accompanied by a concise cue for the saved moment. Clearly label representative aircraft-type images as such, never as photographs of the actual encounter. Fall back to an evidence-supported map preview when available, then a polished text-only card. Preserve source attribution, image usage rights, temporal context and uncertainty. Do not invent images, positions or tracks. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Private idempotent bookmark API references existing observations; account isolation and prohibition on fabricated DOAA evidence passed real SQLite regression. Full bookmark/gallery interaction remains unimplemented.
- 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json.

Outstanding: Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 99 — Decision 99 — chronological bookmark gallery with optional aircraft grouping (locked 2026-10-10).

Open David's visual bookmark collection as a newest-first chronological gallery of saved moments. Offer a simple optional view switch to group bookmarks by the best-supported aircraft identity so repeated encounters can be explored together, without folders, tags or manual organization. Preserve each bookmark's own moment, original observation context and timestamp; grouping must not collapse distinct moments or imply an uncertain identity match is certain. Handle later identity corrections, splits and merges transparently, with ambiguous bookmarks clearly qualified or left ungrouped as appropriate. Retain accessible navigation and useful cards when images are unavailable. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Private idempotent bookmark API references existing observations; account isolation and prohibition on fabricated DOAA evidence passed real SQLite regression. Full bookmark/gallery interaction remains unimplemented.
- 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json.

Outstanding: Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 100 — Decision 100 — one bookmark per distinct moment (locked 2026-10-10).

Saving the same identifiable observation or historical moment repeatedly is idempotent: it must not create duplicate bookmarks, and the interface visibly indicates that the moment is already saved. The same aircraft may be bookmarked again for a genuinely different flight, observation or date. Determine sameness from a stable moment or observation reference where available, not aircraft identity alone or an arbitrary time-window guess; qualify uncertain associations rather than merging distinct moments. Preserve the moment-first navigation, original evidence context and identity-correction continuity established in Decisions 95–99. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Private idempotent bookmark API references existing observations; account isolation and prohibition on fabricated DOAA evidence passed real SQLite regression. Full bookmark/gallery interaction remains unimplemented.
- 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json.

Outstanding: Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 101 — Decision 101 — immediate bookmark removal (locked 2026-10-10).

Removing a bookmark is a direct one-action operation, without a confirmation dialog or required Undo affordance. Update the saved state and visual collection promptly and accurately, handling persistence failures transparently rather than claiming a removal that did not succeed. Removal affects only David's saved reference, never the underlying aircraft, observation or historical evidence. Provide accessible control labeling and avoid accidental activation through clear interaction design. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance.
- 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json.

Outstanding: Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 102 — Decision 102 — account-based bookmark synchronization (locked 2026-10-10).

David's bookmarks are associated with his authenticated account and stored centrally so his saved collection follows him across phone, desktop and other signed-in devices. Saving, removing and opening bookmarks must respect account ownership and access controls; never expose private collections across users. Reflect real synchronization and persistence state, including network failures and concurrent edits, without claiming success prematurely. Maintain the original bookmarked moment, provenance and identity continuity from Decisions 95–101. Choose an implementation compatible with the project's zero-incremental-cost constraint, and verify service quotas and security before provisioning or deployment. This decision supersedes local-only and optional-sync defaults for bookmarks; offline behavior remains a separate design question. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json.

Outstanding: Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 103 — Decision 103 — Google sign-in for DOAA accounts (locked 2026-10-10).

Use Google sign-in as the user-facing authentication method for David's DOAA account and synchronized bookmarks, rather than email/password or passwordless email codes. Rely on standards-based Google OAuth/OpenID Connect through a suitable verified authentication integration; do not collect or store Google passwords. Bind bookmark ownership to a stable authenticated subject identifier, not a mutable email address, and enforce authorization server-side. Provide clear signed-out, sign-in failure and session-expiry states, with appropriate token/session security and privacy. Verify compatibility, quotas, configuration and zero-incremental-cost feasibility before implementation; no provider setup or application changes are authorized by this design decision alone. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance.

Outstanding: Complete client account/preferences UI, secure David/Brent enrollment and OAuth configuration, signed-in Preview and persistent/provider-revocation-aware session acceptance.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 104 — Decision 104 — approved Google accounts only (locked 2026-10-10).

DOAA's personal features are accessible only to explicitly approved Google-authenticated accounts, with David as the initial intended user. Google authentication proves identity but does not itself grant application authorization. Enforce the approved-account allowlist server-side using stable provider subject identifiers rather than email alone; deny unapproved or revoked accounts without exposing private user data. Permit additional accounts to be approved deliberately in future without changing the basic access model, while keeping bookmarks and other personal records isolated per user. Provide a clear, non-leaking access-denied experience. Verify zero-incremental-cost feasibility and deployment configuration before implementation. Design locked; implementation pending.

Amendments:

- Initial approved users are David and Brent; actual Google subject identifiers require secure configuration.

Status: blocked; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance.

Outstanding: Complete client account/preferences UI, secure David/Brent enrollment and OAuth configuration, signed-in Preview and persistent/provider-revocation-aware session acceptance.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 105 — Decision 105 — sign-in required for all DOAA functionality (locked 2026-10-10).

Require successful Google authentication and server-side approval under Decisions 103–104 before granting access to the aviation explorer, map, aircraft details, bookmarks or any other application data and functionality. Unauthenticated visitors see a focused sign-in experience rather than a public read-only explorer; unapproved authenticated users see a clear access-denied state. Enforce this boundary at data and API endpoints as well as in the interface, without relying on client-side hiding alone. Allow only the minimal authentication callback and static assets necessary for sign-in before authorization. Preserve clear session-expiry and failure handling. No public explorer or anonymous access is implied by this decision. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance.

Outstanding: Complete client account/preferences UI, secure David/Brent enrollment and OAuth configuration, signed-in Preview and persistent/provider-revocation-aware session acceptance.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 106 — Decision 106 — persistent sign-in until explicit sign-out (locked 2026-10-10).

Keep approved users signed in across normal visits and devices until they explicitly sign out, rather than requiring authentication every visit or imposing a routine short session expiry. Maintain secure session storage and server-side authorization checks. An explicit sign-out must terminate the relevant session; account revocation, compromised credentials, invalidated tokens or provider-enforced expiry must still be honoured and may require reauthentication. Do not promise technically indefinite credentials or bypass identity-provider security controls. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance.

Outstanding: Complete client account/preferences UI, secure David/Brent enrollment and OAuth configuration, signed-in Preview and persistent/provider-revocation-aware session acceptance.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 107 — Decision 107 — completely separate personal bookmark collections (locked 2026-10-10).

David and Brent each maintain a private bookmark collection bound to their own approved Google-authenticated identity. Neither user can view, add, remove or modify the other's bookmarks through the interface or API. No shared household collection or in-app bookmark-sharing capability is included. Enforce ownership on every read and write server-side; preserve each user's synchronized bookmarks across their own devices. Common public-source aviation records remain distinct from private saved references, subject to the application-wide sign-in gate. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- 2026-10-11 saved-moment batch: one-action save of real observation IDs, idempotent account-owned references, chronological cards and recorded-ICAO24 grouping, original timestamp/provenance detail and encounter playback, deliberate current-Airframe path, direct removal with truthful save/removal failures. 114 Node tests passed, including real SQLite account ownership/idempotence/non-mutation checks. All four Chromium fixture viewport workflows passed, including two distinct moments for one aircraft, exact original playback time, gap without save control, current profile and save/removal failure/retry. Hash-qualified report: docs/qa/saved-moments-acceptance.json.

Outstanding: Actual approved-account Preview acceptance; identity correction/merge/split resolution for stable original references; sourced/licensed imagery or eligible evidence-grounded card map previews where available; live Contact bookmark capture at a genuine stored observation. Cards currently use the approved honest text-only fallback and grouping explicitly qualifies recorded ICAO24 continuity.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 108 — Decision 108 — restore personal preferences, refresh live context (locked 2026-10-10).

For each approved user, persist their own preferred map area, filters and display settings across visits, without sharing those preferences with the other account. On return, obtain fresh live aviation observations rather than presenting a previous position as current. Any restored aircraft selection must retain identity continuity and visibly distinguish last-observed context from current evidence, including feed outages and stale or unavailable observations. Do not automatically restore an entire potentially stale live workspace as if it were live. Handle first use and missing preferences with sensible defaults. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance.
- 2026-10-11 continuation: Account UI and authenticated bootstrap; complete snapshots from account APIs; account-scoped pending/cached preferences, visible pending/save/failure states, bounded retry/online recovery; in-flight saves cannot discard newer local edits. No aviation observations are persisted as preferences. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Authenticated Preview/provider acceptance; apply future map/filter/MET/NAV settings to the same snapshot allowlist as their product UI is implemented. Local fixture browser save/retry/reload acceptance passed; actual authenticated Preview acceptance remains pending.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 109 — Decision 109 — account-synchronized personal preferences (locked 2026-10-10).

Store each approved user's preferred map area, filters and display settings centrally under their authenticated account so the same preferences follow them between signed-in devices. Enforce user-specific ownership and authorization server-side; David's and Brent's preferences remain independent. Apply changes reliably across devices, with clear handling for synchronization failures and conflicting updates rather than silently misrepresenting saved state. Use sensible first-use defaults and preserve the fresh-live-data requirement of Decision 108; synchronized preferences must not make stale aircraft observations appear current. No device-specific override layer is required. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance.
- 2026-10-11 continuation: Account UI and authenticated bootstrap; complete snapshots from account APIs; account-scoped pending/cached preferences, visible pending/save/failure states, bounded retry/online recovery; in-flight saves cannot discard newer local edits. No aviation observations are persisted as preferences. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Authenticated Preview/provider acceptance; apply future map/filter/MET/NAV settings to the same snapshot allowlist as their product UI is implemented. Local fixture browser save/retry/reload acceptance passed; actual authenticated Preview acceptance remains pending.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 110 — Decision 110 — last device wins for preference synchronization (locked 2026-10-10).

Treat each user's account-synchronized preference set as one replaceable snapshot. When multiple signed-in devices save different snapshots, the most recently accepted server-side save becomes authoritative and replaces the full prior snapshot, including unrelated settings. Do not present conflict-resolution prompts or perform per-field merges. Use server-controlled ordering and atomic writes so arrival order is deterministic; propagate the accepted snapshot to other devices on refresh or synchronization. Keep each user's preferences isolated, and distinguish failed or unsaved updates from successfully persisted settings. This rule applies to preferences, not bookmarks or aviation observations. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance.
- 2026-10-11 continuation: Account UI and authenticated bootstrap; complete snapshots from account APIs; account-scoped pending/cached preferences, visible pending/save/failure states, bounded retry/online recovery; in-flight saves cannot discard newer local edits. No aviation observations are persisted as preferences. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Authenticated Preview/provider acceptance; apply future map/filter/MET/NAV settings to the same snapshot allowlist as their product UI is implemented. Local fixture browser save/retry/reload acceptance passed; actual authenticated Preview acceptance remains pending.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 111 — Decision 111 — local preference changes with retry (locked 2026-10-10).

Apply preference changes immediately even when saving fails. Clearly indicate pending or failed synchronization and retry automatically when connectivity returns. Persist pending changes locally where feasible, with safe retry limits and a visible failure state. Under Decision 110, the latest server-accepted complete preference snapshot wins, including a delayed retry; do not imply independent edits were merged. Keep pending preferences scoped to the correct account. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.
- Full-app/asset/API gate, verified RSA OIDC token contract, stable-subject allowlist, account ownership and atomic preference snapshots passed executed tests. Provider credentials/verified subjects are unavailable; no live Google sign-in acceptance.
- 2026-10-11 continuation: Account UI and authenticated bootstrap; complete snapshots from account APIs; account-scoped pending/cached preferences, visible pending/save/failure states, bounded retry/online recovery; in-flight saves cannot discard newer local edits. No aviation observations are persisted as preferences. Latest complete Node suite: 114 pass. Final Chromium fixture acceptance passed desktop, phone portrait, short landscape and tablet; independent explanation/favourite/drill/back, replay unit changes/cursor preservation, Home/Explore/BOARD propagation, account failed-save/retry/reload and recent catchments. Hash-qualified report: docs/qa/units-catchment-account-acceptance.json. See RELEASE_RC_CHECKPOINT.md.

Outstanding: Authenticated Preview/provider acceptance; apply future map/filter/MET/NAV settings to the same snapshot allowlist as their product UI is implemented. Local fixture browser save/retry/reload acceptance passed; actual authenticated Preview acceptance remains pending.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 112 — Decision 112 — stale aircraft observations (locked 2026-10-10).

When the live feed is unavailable, retain recent aircraft observations in a clearly non-live visual state, with last-observed timestamps and a feed outage indicator. Do not show stale positions or movement as current. Remove observations from the live map after a defined usefulness threshold, and restore live status only on fresh evidence. Preserve provenance and historical records separately. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 113 — Decision 113 — source-aware stale observation retirement (locked 2026-10-10).

Retain stale aircraft map markers only while their positions remain useful given the observation source, age and reliability, with an explicit maximum lifetime to prevent indefinite display. Apply source-aware thresholds consistently and visibly label retained observations as non-live. Do not invent source precision or imply a stale position is current. Retiring a marker from the live map does not delete separately supported historical observations. Exact thresholds will be calibrated against available feeds during implementation. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 114 — Decision 114 — distinctive stale aircraft marker (locked 2026-10-10).

Render retained stale aircraft with reduced visual emphasis and a dashed amber outline, distinct from live aircraft. Selecting a stale marker reveals the actual last-observed timestamp and source, with no implication of current position or movement. Keep the treatment recognizable without relying solely on colour, and maintain adequate contrast and accessible status text. Respect source-aware retirement under Decision 113. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 115 — Decision 115 — compact live-feed outage status indicator (locked 2026-10-10).

When live aircraft updates are unavailable, show a small, clearly recognizable disconnected/status indicator near the map controls rather than a persistent banner or full-screen interruption. The indicator must expose an accessible status label and allow users to inspect the outage and last successful update time. Retained stale aircraft remain individually marked under Decision 114. Clear or update the indicator only when fresh observations establish feed recovery; do not imply live coverage during an outage. Keep historical exploration usable. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 116 — Decision 116 — reconcile and smoothly transition after feed recovery (locked 2026-10-10).

When fresh live observations resume, reconcile returning aircraft with prior identities only where supported by evidence and the established identity-continuity rules. Update positions from actual new observations, retire stale markers without useful current evidence, and transition visual states smoothly without fabricating intermediate movement or implying uninterrupted tracking. Clear the outage indication once genuine feed recovery is established. Preserve source timestamps, provenance and uncertainty throughout. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 117 — Decision 117 — retain selected aircraft details after live signal loss (locked 2026-10-10).

If the selected aircraft disappears from the live feed or its observation retires from the live map, keep its detail panel open rather than closing it or automatically switching views. Clearly state that its live position is unavailable and show the actual last-observed time where known. Continue displaying supported identity, history and provenance information without treating an expired observation as current. If a fresh observation is reliably reconciled to the same aircraft, update the panel in place. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 118 — Decision 118 — evidence-gated automatic reconnection (locked 2026-10-10).

If a selected aircraft reappears after losing live coverage, reconnect its open detail panel to fresh live observations automatically only when existing identity-reconciliation rules establish sufficient continuity. Do not infer identity from a reused or ambiguous identifier alone. If continuity remains uncertain, preserve the prior selected aircraft context and represent the new observation separately, with its own evidence and status. Maintain accurate observation timestamps and provenance. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 119 — Decision 119 — automatically follow selected aircraft (locked 2026-10-10).

Selecting an aircraft activates map follow mode by default: as fresh, identity-confirmed position observations arrive, keep the selected aircraft centered in the map viewport. Do not manufacture interpolated positions or continue apparent movement after live observations become stale or unavailable; retain the selection and clearly show its non-live status under Decisions 112–118. Keep aircraft detail information accessible during following. User-driven map interaction should remain possible, with its effect on following to be specified separately. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 120 — Decision 120 — manual map navigation pauses aircraft following (locked 2026-10-10).

Deliberately panning or otherwise navigating the map suspends automatic recentering of the selected aircraft. Keep the aircraft selected and its detail panel open, with a clear control to resume following. Do not automatically resume after a timeout or force recentering on the next aircraft update. Selecting another aircraft activates following for that new selection under Decision 119. Distinguish deliberate user gestures from programmatic map movement. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 121 — Decision 121 — preserve zoom while following aircraft (locked 2026-10-10).

Automatic following recenters the selected aircraft on fresh, identity-confirmed position updates without changing the map's zoom level. Do not automatically zoom based on aircraft speed, movement or surrounding geography, or switch to a fixed tracking scale. User-controlled zoom remains authoritative; intentional zoom gestures should not cause surprise recentering, consistent with the manual-navigation pause rule of Decision 120. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 122 — Decision 122 — north-up map during following (locked 2026-10-10).

Keep north at the top while following an aircraft. Do not rotate the map to its heading. Rotate the aircraft symbol only when trustworthy direction information is available; never suggest stale or unknown direction is current. Preserve zoom and manual-navigation behavior under Decisions 120–121. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 123 — Decision 123 — forward-looking offset while following (locked 2026-10-10).

During automatic aircraft following, place the selected aircraft behind the center of the usable map viewport to show more geography ahead along its reliably observed direction of travel. Respect occlusion by panels and controls. Do not infer direction from an unreliable or stale report; when reliable direction is unavailable, fall back to centered placement. Maintain north-up orientation, unchanged zoom, and manual-navigation pause behavior under Decisions 120–122. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 124 — Decision 124 — smooth visual transitions between confirmed positions (locked 2026-10-10).

When a fresh, identity-confirmed aircraft position arrives, briefly animate its marker from the preceding confirmed position to the newly observed position. This is display interpolation only, not an asserted observed flight path or continuously predicted aircraft location. Keep timestamps, provenance and uncertainty tied to actual reports. Do not animate through stale coverage, ambiguous identity, or implausible discontinuities; show discrete updates instead. Respect reduced-motion preferences. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 125 — Decision 125 — full available flight trail (locked 2026-10-10).

For the selected aircraft, show the full available observed track for its current flight rather than only a recent tail. Distinguish actual reported positions from visual connectors, preserve gaps and discontinuities without implying continuous observation, and never bridge identity ambiguity or separate flights. Keep the trail legible and subordinate to the active aircraft, with performance-aware rendering for long tracks. Display only what source coverage supports and do not claim a complete flight when observations are partial. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 126 — Decision 126 — altitude-coloured flight trail (locked 2026-10-10).

Colour the selected aircraft's full available observed flight trail by reliably reported altitude, with a restrained, interpretable legend. Clearly distinguish missing, stale, or unreliable altitude from known values; do not invent altitude between reports or encode speed in line weight. Preserve observation gaps, provenance, and accessibility, including a non-colour means of interpreting altitude. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 127 — Decision 127 — flight trail is visual only (locked 2026-10-10).

Display the selected aircraft's full available altitude-coloured flight trail as non-interactive map context. Do not expose per-point hover/tap inspection or a flight-replay scrubber through the trail. Keep observation timestamps, altitude, speed, and provenance available through the aircraft's existing history/details interfaces where supported. Preserve clear gaps and uncertainty under Decisions 125–126. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 128 — Decision 128 — all-aircraft one-hour fading trails (locked 2026-10-10).

Display available observed trails for all aircraft on the map at all times, not only the selected aircraft. Limit each displayed trail to observations from the preceding hour; progressively fade older portions so the oldest visible segments are faintest and segments age out after one hour. Preserve source gaps, aircraft identity boundaries, and altitude-colour information where reliable, without inventing missing movement. This revises Decision 125's full-available-flight display extent: the one-hour visible trail window is authoritative for the map. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 129 — Decision 129 — subtly emphasize selected aircraft trail (locked 2026-10-10).

Keep all aircraft's rolling one-hour fading trails visible under Decision 128. Give the selected aircraft's trail a modest increase in visual prominence, such as slightly greater opacity or line weight, without substantially dimming other trails. Retain altitude colours, age-based fading, source gaps, and uncertainty distinctions. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 130 — Decision 130 — trails persist after aircraft disappear (locked 2026-10-10).

When an aircraft leaves the map or loses live coverage, retain its previously observed trail and let its segments fade and expire normally within the rolling 60-minute window established in Decision 128. Do not erase the trail merely because its live marker retires, and do not extend it with inferred movement. Preserve observation gaps, altitude colouring where supported, and provenance. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 131 — Decision 131 — restore recent trails across sessions (locked 2026-10-10).

On opening or refreshing DOAA, load available observed aircraft trail history for the preceding rolling hour so the map can show recent traffic immediately, independent of which signed-in device is used. Restore only genuinely available observations, respecting source coverage, gaps, identity continuity, age fading, and altitude provenance. If historical coverage is unavailable, show only the portion actually known rather than fabricate missing trail segments. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 132 — Decision 132 — render every trail without crowding suppression (locked 2026-10-10).

Draw all available aircraft trails at their normal intended visibility even in dense or overlapping traffic areas. Do not merge, hide, thin, or further dim trails merely because they overlap. Continue to apply the existing one-hour age fade, altitude colouring, and modest selected-aircraft emphasis from Decisions 126 and 128–131. Preserve distinct observed tracks and gaps. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 133 — Decision 133 — trails visible at every map zoom (locked 2026-10-10).

Show every available rolling one-hour aircraft trail at all map zoom levels. Do not hide trails when zoomed out or apply zoom-triggered geometric simplification that removes observed manoeuvres. Preserve altitude colouring, age fading, observation gaps, and selected-trail emphasis under Decisions 126–132. Rendering optimizations may improve performance but must not alter the represented track or selectively suppress trails. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 134 — Decision 134 — simple trail visibility toggle (locked 2026-10-10).

Aircraft trails are visible by default, across all aircraft and zoom levels under Decisions 128–133. Provide a discreet, accessible map control to temporarily hide or show all aircraft trails together, without removing stored observations or altering live aircraft markers. Do not add separate per-aircraft or altitude-colour visibility controls at this stage. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 135 — Decision 135 — reset trails to visible each session (locked 2026-10-10).

The trail show/hide control from Decision 134 is session-only. On every fresh DOAA opening or reload, restore the default of showing all available aircraft trails, regardless of the prior toggle state. Do not save or synchronize trail visibility as an account or device preference. Other account preferences remain governed by Decisions 108–111. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 136 — Decision 136 — trails continue aging during outages (locked 2026-10-10).

During live-data interruptions, keep previously observed aircraft trails visible while their age-based fading continues against real elapsed time. Expire segments normally once they fall outside the rolling 60-minute window; never freeze their age, fabricate new trail segments, or hide all history solely because the feed is unavailable. Use the established unobtrusive outage indicator to explain missing updates. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 137 — Decision 137 — connect reported position jumps (locked 2026-10-10).

Connect consecutive reported positions in an established aircraft track even when their displacement appears implausible. Retain the observations and their timestamps. Trail connectors show the reported sequence, not a verified path of travel. Do not connect observations across unresolved identity boundaries. This overrides jump-based trail breaks but not cautious marker animation. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 138 — Decision 138 — uniform trail styling for position jumps (locked 2026-10-10).

Render connectors between consecutive reported positions with the normal trail appearance even when the displacement appears implausible. Do not introduce dashed segments or special warning colours solely for such jumps. Preserve the altitude colouring, age fade, provenance, and identity boundaries established in earlier decisions. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 139 — Decision 139 — gradient between reported endpoint altitudes (locked 2026-10-10).

Colour each trail segment with a smooth gradient between the altitude colours of its two observed endpoints when both altitudes are reliable. This is a visual transition only, not evidence of measured intermediate altitudes or positions. Preserve the established one-hour age fade, uniform connector styling, and source/identity boundaries. If either endpoint altitude is unavailable or unreliable, use the established unknown-altitude treatment instead of inventing a gradient. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 140 — Decision 140 — monochromatic blue altitude palette (locked 2026-10-10).

Use a blue-only altitude colour scale for aircraft trails, progressing from pale blue at lower reported altitudes through medium blue to deep navy at higher reported altitudes. Preserve smooth endpoint gradients, the one-hour age fade, and unknown-altitude distinctions. Provide a readable legend and non-colour altitude cues where applicable. Exact colour stops and altitude thresholds remain implementation details to validate for contrast. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 141 — Decision 141 — fixed altitude-to-blue colour scale (locked 2026-10-10).

Map each reliably reported altitude to the same shade of the monochromatic blue palette across aircraft, sessions, and map views. Do not rescale colours relative to an individual flight or the currently visible traffic. Maintain a stable legend; exact altitude endpoints and colour stops are implementation calibration details. Preserve unknown-altitude handling and age-based trail fading. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 142 — Decision 142 — prefer barometric altitude for trail colour (locked 2026-10-10).

Use reliable reported barometric altitude as the primary input to the fixed blue altitude-colour scale. When unavailable, use reliable reported geometric altitude as a fallback, preserving which measurement type supplied the colour and its provenance. Do not treat the two measurements as identical or invent missing values. If neither is reliable, use the established unknown-altitude treatment. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 143 — Decision 143 — neutral grey for unknown-altitude trails (locked 2026-10-10).

Draw trail portions lacking reliable altitude in a restrained neutral grey, subject to the same rolling one-hour age fade as other trails. Do not use pale blue or inherit a previous altitude colour as though altitude were known. Preserve the observations and trail continuity under existing rules. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 144 — Decision 144 — blend known altitude to unknown grey (locked 2026-10-10).

When exactly one endpoint of a trail segment has reliable altitude, blend smoothly between that endpoint's fixed-scale blue altitude colour and neutral grey at the unknown-altitude endpoint, in the correct direction. This conveys the boundary of known and unknown altitude without inventing an intermediate measurement. When both endpoints are unknown, use grey; when both are known, follow Decision 139. Preserve age fading and source provenance. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 145 — Decision 145 — clamp out-of-range altitudes to endpoint colours (locked 2026-10-10).

For reliable reported altitudes below or above the fixed colour scale's calibrated bounds, use the nearest endpoint blue rather than rescaling the palette or showing grey. Preserve the actual reported altitude and measurement provenance in aircraft details; endpoint colours do not imply the measurement equals the scale boundary. Exact bounds remain implementation calibration details. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 146 — Decision 146 — altitude legend in map settings only (locked 2026-10-10).

Keep the map free of an always-visible or collapsible altitude legend. Place the fixed monochromatic-blue altitude scale, labelled bounds, and unknown-altitude explanation in map settings, where users can consult it. Preserve non-colour altitude information in relevant aircraft details. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 147 — Decision 147 — stable altitude colours with adaptive trail outlines (locked 2026-10-10).

Keep the fixed monochromatic-blue altitude palette identical across map styles. Where needed for legibility, add a subtle contrasting trail outline or halo appropriate to the map background rather than changing altitude colours. Apply this principle to grey unknown-altitude portions too. Avoid outlines that obscure overlapping trails or overpower the map. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 148 — Decision 148 — aircraft markers above trails (locked 2026-10-10).

Render aircraft markers above all aircraft trail lines, including selected-aircraft trails, so current or last-reported aircraft positions remain legible and selectable where paths intersect. Trails remain visible underneath without intercepting marker selection. Preserve prior selected-trail emphasis without raising it above markers. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 149 — Decision 149 — subtle verified ground-status marker treatment (locked 2026-10-10).

When a trustworthy source explicitly reports an aircraft as on the ground, show a restrained ground-status indicator or marker-outline treatment rather than a wholly different aircraft symbol. Do not infer ground status solely from low speed, altitude, or proximity to an airport. Preserve ordinary marker appearance where status is unknown and retain status provenance and timestamps in details. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 150 — Decision 150 — show ground and airborne trails equally (locked 2026-10-10).

Include supported on-ground aircraft position observations in the same visible trail as airborne observations, with no ground-specific omission, thinning, dotted line, or alternate trail style. Apply the existing one-hour rolling window, altitude colour/unknown treatment, fading, and identity/provenance rules consistently. Ground status may affect the aircraft marker under Decision 149, not the trail styling. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 151 — Decision 151 — consolidate visually identical stationary positions (locked 2026-10-10).

Preserve every supported position observation and timestamp in underlying history, but avoid redundant map overdraw when consecutive observations occupy visually identical coordinates. Represent such a stationary run with equivalent consolidated trail geometry; retain its time span for correct rolling one-hour expiry and fading. Resume ordinary segments when movement becomes visible. Do not merge distinct aircraft tracks or suppress real spatial differences. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 152 — Decision 152 — suppress sub-pixel stationary jitter (locked 2026-10-10).

Preserve every reported position observation in underlying history, but omit visually indistinguishable sub-pixel movement from rendered trail geometry at the current zoom. Recompute from original observations when zoom changes, so finer movement can reappear. Do not impose a fixed physical-distance threshold or permanently discard points. This is a narrow rendering exception to Decision 133's no zoom-triggered simplification, limited to sub-pixel jitter; preserve meaningful trail geometry and one-hour expiry. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 153 — Decision 153 — late-arriving observations (locked 2026-10-10).

Insert delayed positions by observation time, redraw affected trail segments, and retain observation and receipt timestamps and provenance. Respect identity boundaries and the rolling one-hour window. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 154 — Decision 154 — authoritative corrections update visible trails (locked 2026-10-10).

When a source explicitly identifies a newer report as a correction to an earlier position observation, use the corrected position in visible trail geometry and redraw affected segments. Retain the original report, correction relationship, timestamps, and provenance in underlying history. Do not treat mere disagreement between independent sources as an authoritative correction. Respect identity boundaries and the one-hour trail window. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 155 — Decision 155 — resolve conflicting positions using documented source-priority policy (locked 2026-10-10).

When independent sources disagree about the same aircraft's position at nearly the same observation time and neither explicitly corrects the other, select one displayed position using an explicit, testable policy based on source reliability and observation quality, not receipt order or recency alone. Preserve both reports, timestamps, provenance, and the conflict in aircraft details. Do not merge positions or imply agreement; exact policy parameters to be specified. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 156 — Decision 156 — combine source reliability with observation quality (locked 2026-10-10).

Resolve competing aircraft position reports using both documented provider reliability and observation-specific quality indicators, with deterministic tie-breaking and retained decision rationale. Do not assume provider ranking alone or self-reported precision alone establishes truth. Preserve conflicting source reports and provenance. Exact scoring and fallback criteria remain to be specified. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 157 — Decision 157 — missing observation-quality indicators remain unknown (locked 2026-10-10).

In source conflict resolution, absent accuracy or other quality metadata must not automatically count as evidence of poor quality, nor be treated as evidence of high quality. Evaluate available trustworthy indicators, including source reliability, retain uncertainty and provenance, and do not exclude a report solely for lacking explicit quality metrics. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 158 — Decision 158 — stable source ordering breaks equally credible ties (locked 2026-10-10).

If conflicting aircraft positions remain equally credible after documented source-reliability and observation-quality assessment, choose the displayed position using a fixed, documented source order, not network receipt order. Preserve both reports and identify the disagreement as unresolved; tie-breaking does not establish that the chosen position is more accurate. Exact source order remains to be specified. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 159 — Decision 159 — unresolved position conflicts flagged in aircraft details (locked 2026-10-10).

Keep aircraft markers free of routine conflict-warning badges. When credible sources disagree on an aircraft's position, show a clear notice, source comparison, and the documented selection rationale in the aircraft detail panel. Preserve full conflicting evidence and provenance in history; do not conceal uncertainty or imply the chosen map position is certain. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 160 — Decision 160 — clear resolved conflict warnings, preserve history (locked 2026-10-10).

Once reliable subsequent evidence establishes that a position conflict has resolved, remove its active warning from aircraft details while retaining the original conflicting observations, provenance, selection rationale, and resolution in historical records. Do not erase the dispute or assume that mere passage of time constitutes resolution. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 161 — Decision 161 — brief source-selection explanation in aircraft details (locked 2026-10-10).

When a position conflict exists, show a concise human-readable reason for the displayed source selection in aircraft details, without an expandable scoring/evidence breakdown in the normal interface. Preserve competing observations, timestamps, quality indicators, rationale, and provenance in underlying history for auditability. Do not imply certainty or fabricate confidence metrics. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 162 — Decision 162 — reflect source changes in aircraft details (locked 2026-10-10).

When the provider supplying an aircraft's selected displayed position changes, update the current source label in aircraft details without a map animation or notification solely for the change. Preserve source transitions, timestamps, and provenance in underlying history. Source changes do not themselves establish a new aircraft identity or a position correction. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 163 — Decision 163 — avoid source flapping with meaningful-advantage switching (locked 2026-10-10).

When a previously preferred position source resumes while the current source remains credible, retain the current source unless the alternative offers a meaningful, defensible advantage under the documented reliability-and-observation-quality policy. Switch when the current source becomes unusable or another source provides materially stronger evidence. Define and test the hysteresis criterion during implementation; preserve source transitions and selection rationale. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 164 — Decision 164 — automatic position-source selection only (locked 2026-10-10).

DOAA chooses the source supplying each aircraft's displayed position using its documented evidence, quality, tie-breaking, and stability policy. Users may inspect the current source and concise rationale in aircraft details but cannot manually override providers per aircraft or set persistent provider rankings. Preserve provenance and conflicting reports in history. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 165 — Decision 165 — show least problematic available position when all sources fail reliability checks (locked 2026-10-10).

If every available position report for an aircraft falls below normal reliability or integrity thresholds, select and display the least problematic available report rather than withholding the position or immediately removing the aircraft. Clearly communicate its degraded reliability in aircraft details, retain timestamps and provenance, and never represent the chosen position as verified or more precise than the evidence warrants. Maintain existing stale/outage handling when reports cease. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 166 — Decision 166 — subtle marker treatment for degraded position reliability (locked 2026-10-10).

When all available position sources fall below normal reliability standards but DOAA continues displaying the least problematic report under Decision 165, retain the aircraft marker's recognizable shape and supported orientation while applying a restrained visual distinction (for example, reduced opacity or a fine outline). Explain degraded reliability in aircraft details. Avoid prominent warning icons and avoid conflating degraded reliability with stale observations or explicitly reported ground status. Ensure marker visibility and accessibility across map styles; exact visual treatment to be determined in implementation. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 167 — Decision 167 — render degraded-reliability trail positions normally (locked 2026-10-10).

Include selected aircraft position observations even when all available sources have degraded reliability, drawing their trail segments with the ordinary altitude-based palette and age fading rather than a special warning style or omission. Preserve reliability flags, timestamps, and provenance in underlying history and aircraft details; ordinary trail styling does not assert position accuracy. Respect established identity boundaries and the rolling one-hour window. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 168 — Decision 168 — snap marker on discontinuous source-switch position jumps (locked 2026-10-10).

When a change in selected position source coincides with a substantial discontinuity in the reported aircraft position, place the aircraft marker directly at the newly selected observed position rather than animating it along an unobserved path or fading it out and in. Retain the connecting trail segment under Decisions 137–138 and preserve source transition, observation timestamps, and provenance. Ordinary supported short marker transitions remain governed by Decision 124. Exact discontinuity detection to be specified and tested. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 169 — Decision 169 — snap marker on substantial discontinuities regardless of source (locked 2026-10-10).

When consecutive selected aircraft observations exhibit a substantial positional discontinuity, update the aircraft marker directly to the newly reported position rather than animating across an unsupported route, whether the reports came from the same provider or different providers. Continue drawing connecting trail geometry under Decisions 137–138; retain timestamps and provenance. Ordinary short supported marker transitions remain governed by Decision 124. Define and test the discontinuity criterion during implementation. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 170 — Decision 170 — time-aware movement plausibility for marker discontinuities (locked 2026-10-10).

Determine whether consecutive selected aircraft positions represent a substantial discontinuity by evaluating distance, elapsed observation time, available credible speed information, and observation quality together, rather than using distance alone or a single implied-speed cutoff. Snap markers rather than animate when the reported movement cannot be credibly explained by available evidence, regardless of source. Retain reported positions and connecting trails under established rules; define conservative, testable criteria without inventing missing telemetry. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 171 — Decision 171 — animate unless discontinuity is established (locked 2026-10-10).

When essential movement-plausibility evidence is missing or unreliable, retain ordinary brief smooth marker transitions rather than snapping solely because plausibility cannot be established. Snap when the available evidence establishes a substantial discontinuity under Decisions 169–170. Animation is presentation interpolation, not a claim of observed intermediate positions; preserve observation timestamps, source, and quality in details/history. Do not invent telemetry or fill unresolved identity boundaries. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 172 — Decision 172 — immediately retarget overlapping marker animations (locked 2026-10-10).

When a newer selected position observation arrives while the aircraft marker is still animating toward an earlier report, smoothly redirect the marker from its current rendered position toward the newer selected position, rather than queueing animations or snapping every update. Avoid animation backlog and stale visual destinations; preserve observed positions and timestamps independently of rendered interpolation. Substantial discontinuities still snap under Decisions 169–170, with Decision 171's uncertainty handling unchanged. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 173 — Decision 173 — respect device reduced-motion preference for aircraft markers (locked 2026-10-10).

Use brief smooth aircraft marker position transitions by default, but when the user's device/browser requests reduced motion, update marker positions without movement animation. Apply this preference to retargeted updates under Decision 172 as well as ordinary transitions; discontinuity snapping remains unchanged. Do not add a separate DOAA animation preference at this stage. Preserve observation accuracy, selection, and accessibility. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 174 — Decision 174 — infer marker orientation from recent observed positions when heading unavailable (locked 2026-10-10).

When no trustworthy reported heading or track is available, derive an approximate movement direction from recent consecutive, identity-consistent observed aircraft positions and use it to orient the aircraft marker when the displacement is meaningful and the observations support an inference. Identify this direction as inferred rather than reported in aircraft details; never fabricate a reported heading, infer across unresolved identity boundaries, or imply direction from stationary GPS jitter or implausible position jumps. If the evidence is insufficient to infer direction, use a neutral marker orientation. Trustworthy reported directional information takes precedence. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 175 — Decision 175 — fall back to last reported heading when inferred motion ceases (locked 2026-10-10).

When recent position observations no longer support an inferred movement direction, orient the aircraft marker using its most recent trustworthy previously reported heading or track if one exists, even if that value is no longer current; otherwise use neutral north-facing orientation. Identify retained heading as historical rather than current in aircraft details, and do not present it as proof of present movement or heading. Fresh trustworthy reported direction and supported movement-based inference retain their established precedence. Design locked; implementation pending.

Status: missing; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- drawTrack / draw / mergeResponses / norm / checkpointObservation
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 176 — Decision 176 — Flight Inspector navigation: Overview · Timing · Progress · Journey (locked 2026-10-10).

Give Flight Inspector four contextual tabs: Overview for flight identity, route and concise status; Timing for scheduled, estimated and actual departure/arrival evidence and punctuality; Progress for observed position, movement and flight phase with honest freshness and inference; Journey for evidence-backed operational chronology and airframe assignment continuity, never fabricated adjacency. Preserve the agreed stable Inspector shell, navigable relationships, provenance, and missing-data states. This supersedes the previously pending Flight tab inventory. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 177 — Decision 177 — Airport Inspector navigation: Overview · Operations · Movements · Airfield (locked 2026-10-10).

Airport Inspector uses four contextual tabs: Overview summarizes the current airport picture; Operations presents supported runway use, weather effects and operational constraints with explicit observed/inferred distinctions; Movements provides airport arrivals/departures with links to individual flights and consistency with BOARD's canonical airport-centric data; Airfield covers runways, layout, and airport characteristics. Avoid fabricating missing live operations or duplicating independent contradictory movement lists. Maintain stable Inspector shell and honest missing-data states. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- 2026-10-11 Airfield continuation (partial): Airport Airfield tab mounts the shared sourced reference workspace, with D1-ready snapshot and missing-initialization states. 129 Node tests pass; source preparation and full import verified locally only. Exact browser fixtures/hashes: docs/qa/airfield-reference-acceptance.json. No deployed/reference-import/live-account acceptance.
- 2026-10-11 Airport continuation (partial): Map airport markers and relationship links enter the same four-tab Airport Inspector; Movements connects the canonical BOARD evidence to individual Flight/back, without claiming confirmed completion. Local tests and browser fixture evidence: docs/qa/airport-inspector-acceptance.json. No live-provider or signed-in Preview acceptance.
- Inspector shell, cells, renderSurface, openObject, contextual tab dispatch
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Remaining full contract: isolated Preview schema/source import and authenticated provider/runtime acceptance; current authority notices and conditions; full runway-end approach/lighting/declared-distance and history dossiers; evidence-linked runway activity and broader shared movement history. Do not equate reference flags with live operational state.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 178 — Decision 178 — LOOK balances aviation significance across aircraft, operations, and local visibility (locked 2026-10-10).

LOOK's explainable attention layer evaluates noteworthy aircraft identities, unusual operations/behaviour, and meaningful local/balcony visibility together, prioritizing whichever is genuinely significant in the current Ottawa aviation context rather than assigning aircraft-first or operations-first editorial precedence. Explain why each signal warrants attention, allow combined reasons, preserve objective significance independent of dismissals or browsing habits, and never invent unsupported rarity or operational causality. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- shared snapshot LOOK cues, emergency and ordinary-traffic regressions
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Finish evidence-backed behavior/visibility/identity attention and verify connected navigation without personalization.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 179 — Decision 179 — live Ottawa release boundary (locked 2026-10-10).

Release-quality scope: SKY, BOARD, LOOK, aircraft/flight/airport Inspectors, and essential evidence-backed observational memory. OPS, PATTERNS and advanced Replay remain planned but are not blockers for this release. Require polished, reliable, accessible end-to-end use, honest data provenance, realistic testing and verified deployment before calling it complete. This is sequencing, not feature removal. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- release boundary documented; source/code are not accepted application
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Run integrated release gate; OPS/PATTERNS and advanced general SKY Replay are explicitly sequenced later; mandatory Track History/Compare is required by current assignment.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 180 — Decision 180 — AMBIENT SKY is essential to the next live Ottawa release (locked 2026-10-10).

Include one polished, genuinely usable always-on AMBIENT SKY experience in the Decision 179 release gate: continuous evidence-driven Ottawa aviation composition, subdued geography and trajectories, minimal interface, and a seamless way to enter interactive SKY. Respect existing ambient design constraints, reduced motion and device/burn-in considerations. Additional ambient compositions/modes may follow and require separate product-level review; this decision does not assert that AMBIENT has been implemented or runtime-verified. Decision 179's release boundary is amended accordingly.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- AMBIENT shared snapshot, bounded media cache/discovery, image preload and explicit composition; automated mocked lifecycle tests
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Verify real image handoffs, event eligibility/pacing, observed freshness, entry/exit/idle, screen longevity, responsive and reduced-motion behavior.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 181 — Decision 181 — AMBIENT entry supports both automatic and manual activation (locked 2026-10-10).

Interactive SKY may transition into AMBIENT after inactivity, and David can explicitly enter AMBIENT at any time. Touch/interaction restores interactive SKY. Avoid disrupting active reading/investigation; establish idle timing and interaction safeguards as implementation defaults, respecting reduced motion and always-on device considerations. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- AMBIENT shared snapshot, bounded media cache/discovery, image preload and explicit composition; automated mocked lifecycle tests
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Verify real image handoffs, event eligibility/pacing, observed freshness, entry/exit/idle, screen longevity, responsive and reduced-motion behavior.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 182 — Decision 182 — AMBIENT SLIDES live first, recent sightings second (locked 2026-10-10).

Prioritize airframes currently observed in the Home Airfield or selected catchment that have suitable cached, evidence-grounded photographs; fill the rotation with recently genuinely observed airframes when live coverage is sparse. Clearly distinguish LIVE from LAST SEEN with accurate observation timestamps. Do not fabricate sightings or use unrelated photos. Exact recent-window duration and slide ordering are implementation defaults unless user experience demands review. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- AMBIENT shared snapshot, bounded media cache/discovery, image preload and explicit composition; automated mocked lifecycle tests
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Verify real image handoffs, event eligibility/pacing, observed freshness, entry/exit/idle, screen longevity, responsive and reduced-motion behavior.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 183 — Decision 183 — AMBIENT SLIDES rotates on meaningful live aviation events (locked 2026-10-10).

Prefer slide changes when an eligible airframe appears, departs, or becomes meaningfully noteworthy rather than cycling on a fixed chronological or curated timer. During quiet periods an image may remain. Gently pace transitions and coalesce/queue busy bursts to avoid visual chatter. Use genuine observed event data, not invented triggers. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- AMBIENT shared snapshot, bounded media cache/discovery, image preload and explicit composition; automated mocked lifecycle tests
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Verify real image handoffs, event eligibility/pacing, observed freshness, entry/exit/idle, screen longevity, responsive and reduced-motion behavior.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

### Decision 184 — Decision 184 — AMBIENT composition is manually selected (locked 2026-10-10).

David chooses AMBIENT SKY or AMBIENT SLIDES when entering AMBIENT; the selected composition remains active until he explicitly changes it. Do not automatically alternate the compositions or switch from SKY to SLIDES because of aircraft events. Event-driven rotation under Decision 183 applies only within SLIDES. This is compatible with Decision 181: AMBIENT itself can still be entered automatically after inactivity or manually, with interaction restoring interactive SKY. Persist/restore a sensible last-used composition where practical; avoid surprising changes. Design locked; implementation pending.

Status: partial; release completion is not implied.

Evidence history (later implementation entries supersede earlier baseline gaps):

- AMBIENT shared snapshot, bounded media cache/discovery, image preload and explicit composition; automated mocked lifecycle tests
- Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.

Outstanding: Verify real image handoffs, event eligibility/pacing, observed freshness, entry/exit/idle, screen longevity, responsive and reduced-motion behavior.

Acceptance: Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.

Dependencies: Shared timestamp/provenance/identity contracts; Isolated Preview D1 and non-production release gate

Verification: Targeted executed regression fixtures; Actual browser workflow, failure and missing-data states; Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion

