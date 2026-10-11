# Shared BOARD / Airfield Movements UX contract

Implements the UX foundation of Decisions 19–23 and the six unnumbered BOARD locks. It is not the complete movement archive or a verified schedule provider.

## One model, two presentations

`movement-core.js` normalizes source evidence; `movement-workspace.js` owns bounded session state, controls and navigation; `movement-workspace.css` provides the roomier BOARD and compact editorial Inspector presentations. BOARD and Airfield Movements for the same airport/account share the same rows, date, direction/evidence filters and cache. Inspecting an airport does not change Home or the active catchment.

BOARD defaults to a unified ascending time feed. Published schedule evidence anchors a sourced operation to scheduled time; subsequent estimates/actuals do not reorder it. Unscheduled Contact associations use their first loaded observed timestamp. Date/filter controls form an accessible expandable section, initially compact on phone/short landscape and expanded on larger displays. Expansion state is retained. Date controls provide previous/next, direct date entry, Today and Live; earlier/later actions expose missing coverage explicitly. Local dates use a configured IANA airport timezone. Unknown zones use explicitly labelled UTC. Built-in airport zones are reference configuration, not inferred from longitude.

A Published label requires explicit schedule provenance. A route lookup with timetable-like fields does not establish a published schedule. Recorded requires an identified hex and timestamp. Inferred is a neutral provenance label, can coexist with Recorded, and exposes source, UTC timestamp, method, supplied support and confidence. Unknown confidence remains unknown. Operational disruption emphasis is separate from provenance. Each evidence disclosure is a separate target beside the row button, never nested inside it.

Published/explicitly established operations open Flight. Observation-only associations open a recorded Contact. Unsupported inferred-only associations open provisional evidence detail, without creating an aircraft or Flight. Published fixture field names are mapped into the existing Flight timing model. Close/Back restores the source date, filters, focus and scroll position. A historical Contact is not replaced by live telemetry.

## Bounded reads and honest coverage

State is in memory only, scoped by account and airport: at most 16 stores and 512 rows each. Returning to a loaded airport within 60 seconds reuses its snapshot. Tabs, date browsing and filters do not acquire data. Explicit refresh makes one client BOARD request; failed refresh retains loaded evidence with Retry. Disposed workspaces abort their request and ignore late responses. No automatic polling was added.

The existing Worker BOARD path still acquires current relay observations and bounded free route associations. This batch adds their explicit observation timestamp; it adds no D1 query, write, schema or import. Authentication and existing upstream acquisition retain their own costs. No live D1 quota measurements or remote deployment were performed.

New/materially changed rows during a refresh while browsing another date or away from the top mark pending activity. The directional Live action returns to today's loaded edge. Mere snapshot timestamp changes do not trigger it. Refresh never changes a chosen date or an open Inspector. The independent BOARD viewport clears the measured header and scrolls internally; SKY map controls are hidden outside SKY.

## Remaining locked scope

The API presently supplies current evidence only. Historical/future browsing displays unavailable coverage rather than querying an imaginary archive. Infinite cross-midnight window fetching, complete published schedules, full cross-source matching, authoritative airport/runway events, airport-local Stats, continuous budgeted live updates, and durable revision history remain unimplemented. Session association keys are not a universal operation identity or flight-count basis. Do not derive completed-operation counts from these rows. Source IDs are required for reliable published operation correction; fallback identity cannot reconcile arbitrary schedule revisions.

These limits keep Decisions 19–21 partial. This renderer can receive properly sourced published rows, as verified with labelled offline fixtures; no live published schedule provider has been enabled.

## Verification

Run `node --test tests/*.test.cjs tests/*.test.mjs src/*.test.mjs airlabs-budget.test.cjs`, then `scripts/browser-acceptance.cjs` and `scripts/movement-browser-acceptance.cjs` with `DOAA_CHROME_PATH` selecting Chromium. Each browser script owns local port 4173, so run them sequentially. Reports preserve source hashes and four viewport results. Dense published fixture checks test actual independent scroll and its restoration, filter keyboard interaction, timing navigation, pending updates, shared Inspector filters and restrained status styling. Their fixtures are excluded from bundled assets.
