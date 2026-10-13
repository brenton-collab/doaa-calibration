# SKY viewport — atomic component contract

**Status:** architectural decision accepted 2026-10-12; extraction not yet implemented or browser-verified.
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
