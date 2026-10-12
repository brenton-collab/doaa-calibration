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
