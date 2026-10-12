# SKY audit — source baseline (2026-10-12)

Status: **partial source audit; browser inspection pending**. Branch: `rebuild/experience-v2`. This is an assessment of inherited implementation, not approval of its design. No product code, deployment, provider settings, or data changed.

## Authority and method
Read `docs/rebuild/README.md`, `EXPERIENCE_V2.md`, `PRODUCT_UX_CONTRACT.md`, `UNDERSTANDING_AND_REUSE_REGISTER.md`; inspected `index.html`, `field-notes.css`, `sky-map-core.js`, `map-overlay.js`. Source blobs at inspection: index `1968a46a0b0c3e517a6838df901504edac883b96`; CSS `15927010d18e70151d9a9a3c57f6a67b698c961c`; core `c3625e8e444879214975ad5a2f5840c335db66e1`; overlay `0f948ee0b2019cbeafa5c82fb0ead43c418a81af`. Do not conflate source intent with live verified behaviour.

## Findings and provisional dispositions
1. **Multiple cartographic paths — RETHINK.** `index.html` includes raster OSM tile loading and a vector-base/MapLibre integration; `map-overlay.js` separately constructs a canvas and fetches Overpass roads/waterways, uses globals `view`/`project`, and redraws on a 120 ms interval. Determine actual script loading, precedence, fallback and camera alignment before retaining any one path. A failure of Overpass is not proof the map fails.
2. **SKY geometry — RETAIN CAPABILITY, TEST.** `index.html` implements geographic graticule, nautical-mile range rings, map projection, aircraft canvas and track drawing. Preserve the functional distinction between geographic bearing/range and ornamental rings. Test real accuracy at zoom/pan/resize.
3. **Trails — RETAIN EPISTEMIC RULES, EVALUATE VISUALS.** `sky-map-core.js` defines a 60-minute window, altitude interpolation, age-dependent alpha, freshness and target offset. `index.html` renders trails and selection emphasis. Test discontinuity safeguards, identity gaps, density and altitude legibility; do not infer historical continuity from canvas paths.
4. **Follow — RETAIN BEHAVIOUR, RETHINK AFFORDANCE.** Source follows only fresh selected aircraft, accounts for Inspector occlusion, and exposes a follow/resume control. Verify deliberate pan pause and actual interaction across devices.
5. **Rack — RETHINK ROLE/PLACEMENT.** `renderRack` sorts visible aircraft by distance and limits normal view to ten; rows support keyboard activation. `hydrateRack` enriches first three more deeply and asynchronously refreshes. Assess whether the Rack competes with SKY and whether changing enrichment produces distracting reflow. Search results include non-aircraft types represented through synthetic row data; inspect navigation semantics.
6. **Inspector — REPLACE PRESENTATION, PRESERVE VALID BEHAVIOUR.** Source uses a global detail surface and CSS rules for dock/sheet, scroll, close/expand and contextual content. Active V2 contract supersedes inherited focus tabs, Back stack and generic Explore navigation. Verify actual map occlusion, touch targets, loading/error, focus management and return behaviour before specifying replacement.
7. **Visual cascade — RATIONALIZE.** `index.html` embeds a large stylesheet with successive map and Inspector overrides; `field-notes.css` adds further responsive and editorial overrides. This creates maintenance and cascade risk, not proof of a specific rendered defect. Avoid layering a new visual system atop this cascade.
8. **Map controls — CONSOLIDATE CONDITIONALLY.** Source includes a map-settings dialog, base/street choice, trail checkbox, follow and altitude legend, plus other header controls. Functional options need not remain permanently visible. Inventory all controls and actual frequency/criticality before designing a reduced instrument surface.
9. **Freshness — PRESERVE.** `DOAASkyMapCore.fresh` requires valid identity, position and observation age under 90 seconds, excluding pinned/ground entries. `observation` distinguishes recent/last-known/unavailable. Inspect whether all map, Rack and Inspector surfaces communicate this consistently.
10. **Responsive — TEST, DO NOT DECLARE SUCCESS.** CSS has portrait, short-landscape and desktop rules, mobile sheet height and multiple later overrides; source alone cannot prove usable safe areas, stacking, 44px targets, scrolling or legibility.

## Evidence still required
- Full `index.html` and linked module audit: load order, exact MapLibre integration, controls/overlays, gesture handlers, selection lifecycle, Inspector and BOARD return.
- Browser capture and interaction at 393×851, 851×393, 820×1180, 1440×900, keyboard and reduced motion; test real data, empty/degraded, stale, failed map requests and Inspector enrichment.
- Layer/overlay inventory with visible-by-default versus on-demand and epistemic trust classification.
- Trace map/Rack/Inspector selection and source freshness consistency; test click targets, scroll, follow/pan/zoom, close and focus.
- Compare screenshots against active V2 design references without treating historic presentation as authority.

## Design Lab handoff hypothesis
Protect aircraft salience, genuine geographic cues, trustworthy trails and immediate contact access. Experiment with a quieter SKY canvas, contextual rather than persistent controls, and one continuous relational Inspector. These are hypotheses, not design approvals.

## Verification
Read-only repository inspection; no browser runtime, screenshots, local test execution, hosted CI, preview or production verification. No spending incurred. Next action: finish source interaction/layer inventory, then browser-verify before committing visual redesign decisions.


## Source inventory extension — 2026-10-12

### Audit boundaries
This is an inventory of inherited behaviour, not a design specification. The Inspector is a relational interaction model; its future physical presentation is unconstrained. Classifications below distinguish **S** (source confirmed), **I** (inferred risk), and **R** (runtime/browser verification required). Capability preservation never mandates preserving an existing control.

### Active render stack and dependencies
- **S:** `index.html` loads MapLibre GL 4.7.1 from unpkg and `vector-base.js`. The latter creates an `interactive:false` vector map with OpenFreeMap tiles and external glyphs, plus a failure fallback. `draw()` synchronizes camera through `doaaVectorSync`. **R:** camera parity, tile availability, labels and licensing/attribution appearance.
- **S:** `#tiles` canvas renders OpenStreetMap raster tile fallback/street layer; `#sky` canvas renders aircraft, trails, graticule, range rings and airport crosshair markers. MapLibre's base layer is independent of the SKY hit testing and gestures. **I:** multiple projections and zoom conventions may diverge; **R:** measure rather than assume.
- **S:** `map-overlay.js` contains a separate Overpass-derived canvas but is **not loaded by the inspected main `index.html` script list**. Prior audit wording describing it as active was overbroad. It remains resident legacy code unless another entrypoint proves usage.
- **S:** `track-history.js` implements a distinct recorded-observation playback/compare canvas, playback, fit, follow, zoom, pan, event seek and candidate picker. Its empty state explicitly distinguishes external history from DOAA Sightings.
- **S:** `ambient.js` implements independent SKY and SLIDES compositions, media eligibility checks, exit on interaction, manual mode choice and optional idle entry. Its SKY trail store is distinct from interactive SKY trails. **R:** equivalence of live/stale semantics across them.

### Actual map symbols and overlays
- **S:** current aircraft with valid heading use a directional half-arrow polygon rotated by track; without heading a dot; selected contact gets a circular halo. Pinned/last-known markers have reduced alpha. Search match filtering dims nonmatches. Aircraft rendering excludes ground aircraft and generally requires recent positions.
- **S:** static `AIRPORTS` markers use crosshair geometry; hit testing checks aircraft before airports within a 20 px radius. **I:** overlap and touch competition; **R:** test dense clusters.
- **S:** altitude-coloured age-faded tracks; true-bearing range rings with tick marks, adaptive geographic graticule, home/catchment map framing. **R:** whether they visually compete with aircraft, clutter at different zooms and preserve true geographic semantics.
- **S:** base/street map mode, trail visibility, follow/resume, altitude legend and map-settings dialog. SKY preferences separately manage home aerodrome, exploratory aerodrome, catchment radius and units. Header contains SKY/BOARD/LOOK, feed/status, preferences, usage/provider health, AMBIENT entry; Rack provides collapse/search and aircraft rows; recenter/return home appears contextually. **R:** exact default visibility, stacking and accessible hit areas.

### Interaction and acquisition lifecycle
- **S:** pointer drag pans and suspends following; two pointers pinch zoom; wheel zoom suspends following; tap selects aircraft or airport, or clears selection; Rack row Enter/Space activates selection; Rack pull toggles collapse; Inspector has close and deliberate mobile expansion, with touch gesture on its handle. Selection starts following; follow requires a fresh position and compensates for occupied Inspector area.
- **S:** `refresh(false)` starts on load and a 30-second interval; acquisition uses viewport cells, bounded concurrent requests, 12-second fetch timeout, cache and source freshness logic. A separate 10-second redraw refreshes visual age while visible. **R:** actual provider degradation, cell gaps and stale semantics.
- **S:** `renderRack` normal view is ten nearest aircraft; asynchronous hydration differs for first three. Search returns airframe/flight/airport records, some represented as synthetic aircraft-shaped rows. A flight search result can open a text-only external result, rather than necessarily invoking the full relational Inspector. **I:** conceptual conflation of live encounter, retrieved flight, and historical identity.
- **S:** selecting a contact immediately paints a telemetry fallback while asynchronous Inspector enrichment runs. On enrichment rejection it can return to fallback. **R:** stale asynchronous completion after focus change and actual continuity under errors.
- **S:** BOARD movement opening calls `setPrimaryView('SKY')` then opens detail and sets `returnView='BOARD'`; LOOK selection follows similar return bookkeeping. **I:** origin, focus and underlying workspace are coupled in the shell. This is inherited behaviour, not an RR design constraint.
- **S:** mobile portrait collapses Rack when Inspector opens; CSS defines compact/expanded sheet and desktop dock/short-landscape positioning. **R:** viewport usability, scroll/focus restoration, overlap, safe-area and keyboard/reduced-motion behaviour.

### Epistemic seams for adjacent workstream
- **S:** map uses fresh (<90-second) observed positions; pinned/last-known are rendered differently. Tracks retain up to 60 minutes. Rack search creates placeholders with `lat:0,lon:0` for retrieved flight/airframe records, relying on branch-specific display logic. Keep these synthetic values out of domain position claims.
- **S:** current Rack status combines route endpoints, phase inferred from catchment endpoint matching, estimated arrival strings and current telemetry. **I:** without provenance attached to each displayed value, users may interpret inferred phase or retrieved route as confirmed dated movement. Verify source association and time semantics before adopting.
- **S:** `DOAALiveSnapshot` exposes current aircraft, observation timestamp, home and provider for LOOK/AMBIENT. **R:** whether these consumers apply equivalent stale/degraded and identity rules.

### Dispositions without design foreclosure
**Protect as capabilities:** observed contact positioning, direction, geographic orientation, selection, evidence-backed trails, contextual follow, airport exploration, search, historical replay, status/provenance, degraded operation, accessible navigation. **Re-evaluate, not inherit:** Rack form and ten-item limit, inspector dock/sheet, fixed home rings, persistent header controls, map layer choices, static airport markers, map rendering stack, SKY as obligatory host of BOARD-origin inspection. **No removal decision yet:** all require runtime evidence, task relevance and Design Lab alternatives.

### Verification state and next gate
Repository source inspection extended; no browser session, live authenticated traffic, screenshots or hosted tests. Full dependency inventory still needs `src/`, Worker routes, runtime response contracts and browser inspection. Audit findings may inform Design Lab and epistemology without prescribing their outcomes.
