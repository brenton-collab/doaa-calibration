# SKY viewport — atomic component contract

**Status:** partial extraction implemented and assembled behind a mount interface; complete atomic viewport and browser parity not yet verified.
**Authority:** DOAA-RR SKY experience direction; preserve inherited renderer fidelity.

## Boundary

SKY is one reusable **viewport instrument**, not a page, navigation system, or Inspector. It must be mountable within the main SKY workspace, beside or behind the relational Inspector, and in an isolated verification harness without reimplementing its cartography.

The viewport owns its own map rendering and interaction geometry: inherited BASE/STREET cartography with graceful fallback; graticule; zoom-dependent nautical-mile range rings; **visible graduated compass ring**; blue airport crosshairs; aircraft heading symbols; selection highlight; trails; pan, zoom, follow and recenter. The graduated ring is a required invariant, not a conditional flourish. Preserve the inherited visual hierarchy rather than substituting schematic maps.

The surrounding application owns workspace navigation, gear/preferences surfaces, Inspector presentation, BOARD, LOOK, AMBIENT, and business-level data retrieval. No page-specific DOM selectors or hidden button clicks may be required by the extracted viewport.

## Proposed host interface (design contract, not implemented API)

- `mount(element, {onSelectAircraft, onSelectAirport, onViewChange, onStatusChange})`: initialize inside an explicit container.
- `setObservations({aircraft, observedAt, provenance})`: display supplied observations; do not acquire or invent traffic internally.
- `setTrails(trails)`, `setAirports(airports)`: supplied, evidence-bearing display data.
- `setSelection(subject | null)`: highlight without automatically enabling follow or moving the camera.
- `setFollow(enabled)`: explicit camera-follow intent, only when a position is usable.
- `setLayer(layer)`: supported BASE/STREET and honest unavailable MET/NAV states.
- `getViewState()` / `setViewState(state)`: serializable camera, zoom, layer, selection, follow and overlay state for continuity.
- `resize()` and `destroy()`: correct embedding and teardown without leaked global handlers.

The concrete API must be reconciled with inherited code before implementation. Avoid freezing method names if a simpler adapter preserves the same guarantees.

## Invariants / acceptance

1. A standalone mount and embedded mount render the **same** viewport, not lookalikes.
2. Compass graduations and NM range labels remain intelligible at mobile and desktop dimensions, across zoom levels; tests include the viewport edge cases that previously hid ticks.
3. Pan/zoom state persists while opening, navigating within and closing the Inspector; selection never silently enables follow.
4. Inspector subject navigation cannot replace or reset the viewport.
5. Data freshness and provenance remain visible; UNKNOWN and unavailable layers are not fabricated.
6. Map providers, failures and attribution are handled within the existing zero-incremental-cost envelope.
7. Focus, touch/pointer interactions, resize and cleanup work without reliance on surrounding page markup.

## Extraction sequence

First isolate the inherited projection, graticule, ring and compass drawing and verify parity with existing SKY at representative zoom/viewport sizes. Then move input/camera, aircraft/trails/airports, and map layer integration behind the same mount boundary. Finally integrate the approved Inspector as a host-level overlay and test round-trip state. Preserve existing renderer behavior until parity is demonstrated; do not replace it with Study 04/05 drawings.

**Current implementation debt:** root `index.html` still couples drawing to global `ctx`, `view`, `ACTIVE`, `area()`, DOM size and Inspector controls; `vector-base.js` assumes a fixed `#vector-base` container. This contract does not imply the extraction is already complete.

## Implementation increment — inherited geometry extracted (2026-10-12)

Commits `820f21e` and `184786d` extracted the **existing** `drawGraticule` and `drawRangeRings` implementations into `sky-viewport-geometry.js` and delegated the real root `index.html` viewport to that module. The geometry module takes a canvas context and explicit host geometry functions/values, has no DOM or network dependency, and exports CommonJS for local tests. No visual redesign was introduced. Commit `b426041` adds a focused Node regression test for graticule/rings/compass degree labels and the script integration. The committed module was executed separately with a canvas spy: ring arcs and degree labels were produced; the full Node suite and browser visual parity have **not** been run. This is the **first extracted rendering slice**, not yet the complete atomic mountable SKY component. Camera, canvas ownership, map tiles, aircraft and interactions remain coupled to root `index.html`. No production deployment or paid CI.

## Implementation increment — camera/projection extracted (2026-10-12)

Commits `5c9c729` and `6bf858d` add `sky-viewport-camera.js` and delegate inherited `nmlon`, `baseScale`, `project`, `unproject`, `extent`, and `centered` from the actual application. Camera calculations accept host getters for view, available area, and configured range; the existing host layout remains authoritative. Commit `2927a66` adds focused Node tests for projection round-trip, zoom, and layout changes. The committed camera module was executed in isolation and passed a geographic round-trip check. Full Node-suite and browser visual parity are **not verified**. The camera and geometry modules are reusable mathematical/drawing slices, but canvas ownership, map layers, interactions, aircraft and teardown are not yet extracted. No production deployment or paid CI.

## Implementation increment — canvas ownership extracted (2026-10-12)

Commits `95fae32` and `f131587` add `sky-viewport-canvas.js`, a host-independent two-layer canvas owner, and route the real application's context acquisition and DPR-aware resize through it. Commit `76d4309` adds Node tests for both layers and invalid dimensions. The committed module was executed with fake canvas contexts: at 480×320 and DPR 2, both backing stores became 960×640 and received matching transforms. Browser visual parity and full Node tests remain outstanding. **Atomic mount lifecycle not yet implemented**: input handling, map tiles, aircraft/trails, provider sync, teardown, and viewport-host geometry still live in root `index.html`. No production deployment or paid CI.

## Implementation increment — input lifecycle extracted (2026-10-12)

Commits `709816f` and `a8c9185` move real SKY pointer pan, pinch, wheel and tap dispatch into `sky-viewport-input.js` with explicit host callbacks and listener cleanup (`destroy`). The existing application still supplies camera state, hit-testing, Inspector actions and acquisition scheduling. Commit `0f19b3c` adds focused Node tests. An isolated runtime exercise confirmed pan, wheel zoom and zero listeners remaining after destroy. Browser interaction parity is **not verified**; pointer-cancel and multitouch edge cases require further testing. A full drop-in mount still needs integration of canvas, camera, rendering, map layers, aircraft and host-independent sizing. No production deployment or paid CI.

## Implementation increment — assembled mount (2026-10-12)

Commits `c5ad884` and `fbd2bec` introduce `sky-viewport.js` and replace separate root-page module wiring with one `DOAASkyViewport.mount` call. This composition owns canvas context acquisition/resizing, camera/projection, inherited graticule and graduated range-ring drawing, pointer input, and listener teardown. It accepts host-supplied geometry and callbacks, and exposes `drawInstruments`, `getViewState`, `resize`, and `destroy`. Commit `1322db2` adds a focused Node regression test. Isolated execution of the committed modules verified mount, projection round-trip, canvas sizing, listener removal and post-destroy guard. **Not a complete drop-in SKY:** tile rendering/vector sync, aircraft/trails, hit-testing, acquisition and layout remain in root `index.html`; the root app has not been browser-verified. No production deployment or paid CI.

## Implementation increment — traffic symbology extracted (2026-10-12)

Commits `a199011`, `807c2ce`, `5f04d73`, and `4c93884` extract the inherited aircraft, trails and airport rendering into `sky-viewport-traffic.js` and delegate from the real application's draw loop through `skyViewport.drawTraffic`. The module receives observed aircraft, trails, airports, selection, search state, freshness policy and projection explicitly. Aircraft heading glyphs, selection halos, trail gradients and blue airport crosshairs are retained. Commit `98238f5` adds a focused Node regression test. Isolated execution checked aircraft and airport canvas calls; no browser parity check or full suite run. **Still not a complete atomic viewport:** tile/vector cartography, host-dependent sizing and hit testing remain outside the mount boundary. No production deployment or paid CI.

## Implementation increment — cartography fallback and hit-testing (2026-10-12)

Commits `7281fe6`, `eb60734`, `2b89142` extract aircraft/airport hit-testing into `sky-viewport-hit.js` and dispatch through `skyViewport.hitTest`. Commits `7a1dbec`, `bfff136`, `1df71ab` extract inherited OSM fallback tile painting, cache and asynchronous image cleanup into `sky-viewport-tiles.js`, exposed as `skyViewport.drawTiles`. Existing vector-base MapLibre/OpenFreeMap synchronization remains host-owned. Tests added in `8f03bc7`, and mount fixture updated in `493f298`. Isolated execution confirmed aircraft-first hit priority, fallback attribution, tile allocation and image handler cleanup; no full Node run or browser visual parity check. **Remaining componentization:** vector map lifecycle, host-independent sizing, observation ownership and independently mounted real-viewport visual comparison. No production deployment or paid CI.
