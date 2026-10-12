# DOAA Experience V2 · Product and HMI contract

Status: new isolated experience branch, implementation pending. Parent: `rebuild/field-notes-foundation`. Do not deploy to production or replace the existing preview until the first experience slice works.

## Decision
Retain and verify the existing aviation backend, ADS-B observation engine, history, weather, route and airport enrichment, and validated flight/geometry calculations. Replace the current Inspector-led presentation and navigation with an experience-led interface. Do not rewrite proven services for aesthetic reasons. The nine user-supplied visual examples are **specification and acceptance reference**, not vague inspiration. No illustrative flight/airport facts may leak into real data.

## User experience contract
- SKY = spatial discovery; BOARD = flight/movement discovery. They are peer entry points into one exploration experience.
- Tap an aircraft or movement → open a context-aware **Aircraft Overview**. The user should instantly see identity, photo/graphic hero, state, freshness, route if established, key telemetry, and obvious links to related entities. If the entry is a BOARD movement with a real flight record, prioritize Flight in the overview.
- A selected aircraft is a coherent **subject**. Contact (observed state), Flight (dated operation when established), Airframe (physical identity), Journey (chronology), and History (observations) are perspectives/related destinations, not unrelated top-level applications.
- Navigation: persistent SKY / BOARD global switch; contextual subject navigation, explicit back stack preserving map position, selection, filters, scroll and return destination; Explore cards for related airport, flight, airframe and journey. No surprise view changes during asynchronous enrichment.
- A route with unknown endpoints must not render as an empty progress bar. Callsign standing route != confirmed dated operation. Timings show scheduled, estimated and actual with clear labels, timezone and date where known; do not synthesize times or delays.
- Prioritize populated data; omit inapplicable empty sections. Missing critical fields get one human-readable state, not repeated UNKNOWN rows. Additional evidence and source details live in progressive disclosure, not the opening view.

## Visual acceptance criteria
- Photo-led hero whenever licensed/credited aircraft or airport image exists. Otherwise a polished aviation illustration with real vector aircraft iconography, not a fake photo.
- Distinctive blue aviation accent, warm delay/warning accent, quiet gray surfaces, tonal backgrounds, fine dividers, generous yet disciplined spacing; responsive mobile-first composition.
- Large editorial identity heading, compact subtitle, meaningful state pill and observed age.
- Airport-to-airport route composition with prominent codes, place names when available, properly qualified geographic progress and direct SKY focus action.
- Readable 2-column timing metrics, clear scheduled/estimated/actual distinctions and actual timezone.
- Icon-bearing Explore cards with coherent aviation glyph family, usable touch targets, focus/hover/pressed states, and no dead controls.
- Airfield screen: real image hero, location identity, runway cards and meaningful mini-map where coordinates exist; weather and activity as useful subordinate modules.
- Accessibility: semantic headings, contrast, accessible icon labels, keyboard focus, reduced motion, small-screen layouts, loading and error states.

## Architecture boundaries
- Introduce a new experience shell and composable overview cards consuming normalized existing API data. Do not continue adding global CSS overrides to the legacy Inspector.
- Explicit view model adapters for Contact, Flight, Airframe, Airfield and movement; typed field status (known, loading, not reported, not applicable, error), without exposing debugging metadata by default.
- Prefer zero-cost existing providers; cache/rate-limit lookups, distinguish current operation from standing route, avoid invented enrichment.
- Preserve old Inspector as fallback until V2 flows are tested. Reuse backend endpoints rather than duplicating network calls.

## First delivery gate
Implement and deploy an isolated V2 **SKY → selected aircraft → Overview → Flight/Airframe → back to SKY** slice, including real photo/fallback hero, real icons, route, telemetry, timing and Explore. Verify browser interactions, empty states, navigation restoration and realistic live examples. Only then expand to BOARD and Airfield. Never call the experience complete on source syntax or successful deployment alone.

## Current status
2026-10-12: branch created, spec committed. No V2 code, preview deployment or user interaction test yet. Existing legacy preview remains separate. Next: inspect actual selection and shell event flow, build the first independent V2 experience component, then deploy to a new isolated preview when operationally safe.
