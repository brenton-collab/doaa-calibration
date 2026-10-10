# DOAA Field Notes: canonical product decisions (2026-10-08)

Status: design decisions and reported defects, not implemented features. Read alongside DOAA_SPEC.md and current code.

## Identity and map
Field Notes Light is the intended default. Offer matching Dark for nighttime, optionally System. Shared semantic design tokens, browser-local preference. Restrained macOS-clean aviation field-journal feel: warm off-white, graphite, greys, muted blue, readable typography, subtle dividers. No faux paper or nostalgia. Sky is a plotting chart; Rack an observation index; Investigator a dossier; BOARD a movement register.

Aeronautical chart conventions are inspiration, not a request to reproduce VNC charts. Preserve the carefully tuned existing map character, geographic detail, depth and composition. Recalibrate map colours, contrast, opacity and perceived weight for light theme as needed; compare identical zoom and location before/after. Keep existing aircraft directional half-arrow markers and track geometry/behaviour, rendered dark rather than white in light mode; do not use airplane silhouettes.

Explore graduated blue distance rings integrated with a bearing compass on the outermost visible ring, rather than a floating compass. Example spacing at appropriate scale: 25/50/75/100 NM, adapted to catchment and zoom. Mark true north and true bearings. Consider sourced, authentic controlled-airspace boundaries in muted red/magenta, with meaningful labels and limits, not invented shapes. Aircraft remain dominant; overlay visibility may be selectable.

## Units
Provide a global display preference accessible from catchment/settings: NM with knots, km with km/h, mi with mph; altitude feet or metres independently. Keep GS label with selected speed unit. Apply across Sky, Rack, BOARD, search, Investigator, history and ring labels. Canonical stored measurements and physical catchment/ring geometry must not change on unit selection; convert at render time. Preserve flight levels, runway designations and other aviation conventions where necessary.

## Investigator and interaction
Navigable datum uses a muted ↗ arrow; explanation uses ⓘ; plain data has neither. Whole navigable row is clickable, but hit areas must be isolated from adjacent rows and independent ⓘ controls. Do not nest buttons. Support keyboard focus, clear pressed feedback, touch-friendly targets and no accidental navigation during scrolling. Keep label and ⓘ together on wrapping. Increase overly tiny typography across Rack, BOARD, search and Investigator; roughly 13–14px primary data and 12px secondary as starting points.

Close button must never obscure data: reserved persistent header area, independently scrollable body and persistent bottom navigation tray; validate phone portrait, short landscape, tablet and desktop.

Contact answers what is here now; Flight describes the current operation; Aircraft gives a full sourced physical-airframe biography; Journey gives verified operational sequence; Media covers visual identity; Encounters lists only actual DOAA observations. Relationship rows should name the relationship and offer ↗ drilldown where available. Normalize raw strings, dates and repeated records into legible rows/timelines. Hero photograph shows grounded EXACT, MODEL or TYPE specificity pill (or none if unknown). Expand Media beyond a single photo where licensing and evidence permit, with attribution, dates, livery and specificity. Inventory available live, D1 and external data before deciding surface ownership and density.

## Correctness defects and future work
Journey BEFORE/NOW/NEXT means immediately previous/current/immediately next actual airframe operation, not consecutive D1 records or callsign matches. NOW must agree with Flight. If adjacency is not evidenced, say previous flight not established or next assignment unknown. Keep observation chronology separate from operational assignment sequence.

BOARD reportedly shows no arrivals/departures or incorrect ARR/DEP. Diagnose source coverage, airport-centred airborne YOW movement acquisition, statuses and classification. Differentiate no data from no traffic. BOARD must remain independent of Sky's spatial catchment.

Develop rich airframe biography with manufacturer, model, age, MSN/serial, engines, registration and operator history, liveries, sourced photos and genuine DOAA Encounters, with epistemic qualifications. Aviation-facing answer first.

Replay must distinguish DOAA Observed Replay from timestamped D1 Samples, with no future knowledge leakage, from External Historical Reconstruction for missed flights. Search and external history must never manufacture DOAA Encounters.

Validate the merged explainer-wiring change and any late PR review feedback in the actual browser. CI green alone is not UX validation.

## Implementation guardrails
Separate data correctness repairs from visual treatment where practical. Prefer shared tokens and reusable datum interaction components, reversible map treatment and real-device comparison. Preserve the existing Encounter invariant and update the main handoff to point here when repository writes permit.

## Locked design review decisions (2026-10-10)
- **Inspector viewport: HYBRID (locked).** On mobile, use a map-aware compact bottom sheet by default with deliberate expansion into a larger investigation workspace. Keep SKY visible in compact state; expansion must not happen automatically on selection. On wider screens use a docked panel that preserves a usable SKY viewport. Reserve independent header/close and navigation regions, scroll the content separately, and prevent BASE/STREET map controls from overlapping Inspector controls. Validate on actual phone portrait/landscape, tablet, and desktop. This is a design decision, **not an assertion that current UI implements it**.
