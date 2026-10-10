# DOAA — Canonical acceptance and execution gates

Updated: 2026-10-10. **Decision reconciliation, not a claim of implementation or runtime verification.**

Authority: read with [DOAA_SPEC.md](../DOAA_SPEC.md), [Field Notes decisions](../FIELD_NOTES_DECISIONS_2026-10-08.md), and [DEV_LOG.md](../DEV_LOG.md). This checklist reconciles agreed experience with actual release gates; source code, tests, deployments and real device checks establish delivery. Historical "implemented" labels in the spec may be stale.

## Experience contract

DOAA answers aviation curiosity without forcing David to choose a depth of investigation first. Quiet, legible surfaces lead to rich, sourced detail. SKY starts from observed spatial activity; BOARD starts from airport-published flight operations, **independent of SKY home/catchment**. They share Flight, physical Airframe, Airport, observation, operational-event and provenance relationships.

**BOARD** is a conventional, excellent airport arrivals/departures timetable: planned flights before airborne, active movements, and completed operations; scheduled/estimated/actual times; status, carrier, flight number, origin/destination, equipment and gate when sourced. Airport selection is independent of SKY. An airport may offer an **Airborne** filter, but that filter is not the definition of BOARD. Selecting a flight opens Flight investigation and, where legitimately resolved, its physical airframe, actual movement and operational sequence. A selected live airframe can link to SKY.

The October 6 spec subsection defining BOARD as *currently airborne YOW movements only* is **superseded** by this contract and the original spec's airport/FIDS definition. Existing airborne movement acquisition remains a useful enrichment/filter, **not** a substitute for scheduled flight coverage. Do not fabricate flights, equipment assignments, gates, diversion causes or historical changes from ADS-B. Preserve original/revised/actual values as sourced time-stamped operational events when available, rather than overwriting evidence. Distinguish published, estimated, actual, observed and inferred information; expose source freshness and incomplete coverage. Flight identity is not airframe identity.

Curiosity scenarios (product tests, not mandates for new tabs): find and follow a relative's flight and lateness; investigate a reported aircraft substitution/diversion using sourced changes and actual arrival; explore route/connection choices and airline preferences (requires separate legitimate timetable/itinerary coverage); identify an aircraft overhead via SKY and navigate to its flight. Route search and historical operational reconstruction are **not** falsely claimed as delivered by BOARD or ADS-B alone.

## Acceptance matrix

Status vocabulary: **Accepted** = decided experience; **Code evidence** = source exists or prior log records an implementation, not proof of usability; **Verified** = tested against actual served runtime/device; **Blocked** = external prerequisite. Treat all rows as accepted; status columns describe evidence, not priority.

| Capability / acceptance test | Code evidence as of this checkpoint | Runtime / device verification | Gate |
| --- | --- | --- | --- |
| SKY live map, tracks, directional half-arrow glyphs and selected-home catchment | Existing foundation reported | Not rechecked here | T0 |
| BOARD shows complete sourced scheduled ARR/DEP including future, landed and delayed flights; airport selection independent of SKY | Existing BOARD is airborne/movement-oriented; schedule normalizer staged in PR #42 | **Not verified; published schedule source unresolved** | BOARD source gate |
| BOARD distinguishes no feed, partial coverage, genuinely zero results; no false ARR/DEP or flight identity | Relay/UI fixes and tests recorded | Live provider and browser not rechecked here | T0 |
| BOARD row → Flight → supported Airframe/Journey → SKY | Partial dossier and navigation foundation | Not rechecked; assignment/adjacency unresolved | BOARD integration gate |
| Investigator persistent close/header, independently scrolling body, bottom tray; no overlaps | Existing chrome and repairs reported | Phone portrait, short landscape, tablet, desktop not rechecked | T0/T1 |
| Navigable whole datum row ↗, separate functioning contextual ⓘ, focus/pressed/touch behavior; no nested buttons | Partial interaction implementation and explainer fixes reported | Dynamic content and scroll/tap behavior not rechecked | T0/T1 |
| Readable typography across Rack, BOARD, Search, Investigator (approx. 13–14px primary, 12px secondary as starting point) | Field Notes treatment partly released | Device legibility not rechecked | T1 |
| Field Notes Light default, optional Dark, persistent tokens; preserve map geography/tracks/markers | Light treatment release recorded 2026-10-10 | Served visual comparison not rechecked | T2 |
| Global NM/knots, km/km-h, mi/mph; feet/metres; render-time conversion only | Accepted design | Not verified | T2 |
| Journey BEFORE/NOW/NEXT means evidenced adjacent *airframe operations*; NOW agrees with Flight | Conservative unknown guard recorded | Live operation matching not verified | T0/T3 |
| Flight/Aircraft/Contact/Media/Encounters semantics; provenance, uncertainty, normalized biography and relationship navigation | Partial dossier implementation | Live data consistency not verified | T1/T3 |
| Hero EXACT/MODEL/TYPE specificity and attributed licensed media gallery | Partial single-photo presentation | Gallery not verified | T3 |
| Authentic DOAA Encounters only from actual timestamped local observations; external schedules/research cannot create them | Guardrails and memory tests recorded | Full production regression not rechecked | T0 |
| Observed SKY Replay without future knowledge leakage; external reconstruction separately labelled | Accepted design and stored samples | Not delivered/verified here | T4 |
| Integrated bearing compass/range rings; authentic licensed airspace only | Accepted/conditional design | Not verified | T5 |
| OPS, Patterns, LOOK, ambient/ATC extras | Conditional/deferred | Not part of current release gate | Later |

## Execution order and release discipline

1. **T0 truth and stability**: inspect deployed versions and quotas; test real BOARD movement payloads, Journey adjacency, Encounter boundaries, Inspector navigation/ⓘ/close and device states. Distinguish source failure from empty traffic. Fix defects with targeted tests; avoid unnecessary Actions and deploys.
2. **BOARD source gate (parallel investigation, isolated from T0 release)**: identify a lawful, durable, sufficiently fresh, zero-incremental-cost *published schedule and operational-status* feed, initially YOW but extensible to other airports. Validate actual rows, date/time zones, completeness, refresh feasibility and permitted reuse. Do not treat a free trial, tiny quota, application-only provider, 45-minute polling, historical ADS-B reconstruction or unauthorized scraping as satisfying the agreed requirement. If unavailable, document the precise blocker instead of disguising airborne movements as a complete board.
3. **T1 interaction/legibility** and **T2 Field Notes system**: finish already-agreed accessibility, navigation, responsive composition, theme and unit preferences; verify on served devices. Do not let BOARD source uncertainty indefinitely stall independent UX corrections.
4. **BOARD integration gate**: normalize authoritative schedule rows, reconcile live status and observed aircraft with evidence and timestamps, render actual timetable and flight drilldown. Test planned/not-yet-airborne, arrived, delayed, cancelled, diverted, unknown assignment, codeshare, partial provider failure and time-zone boundaries.
5. **T3 knowledge/media**, **T4 time**, **T5 optional depth** follow existing spec ordering, unless a proven shared dependency warrants a narrow adjustment.

**Release definition:** code implemented, targeted tests executed, PR reviewed/merged, Preview and Production deployment versions verified, realistic served UI flows exercised on desktop and phone (plus short landscape/tablet for Inspector), data provenance/coverage validated, D1 free-tier usage and Encounter integrity checked. Each is a separate recorded state. No paid upgrades, production data writes, CI runs or deployment merely for documentation.

## Immediate next actions

- Audit current main and PR #42 against this matrix; resolve overlapping/stale BOARD statements in the spec without erasing historical rationale.
- Confirm which Field Notes interaction changes are in served production versus only committed; create narrow test-backed fixes.
- Continue lawful schedule-feed research separately from UI corrections. Update this matrix and DEV_LOG.md with evidence at each meaningful checkpoint.

## BOARD source reconnaissance — 2026-10-10

**No source approved for production yet.** Public web research verified the following leads; it did not establish authorization to redistribute, endpoint durability, actual JSON payload quality, or refresh capacity. No paid requests, credentials, deployments or production data writes.

1. **Official YOW flight pages**: https://www.yow.ca/flights/arrivals and /departures present a dynamic auto-refresh airport board with earlier/tomorrow navigation; the public HTML accessible to search tools is only a loading shell. Priority: inspect client network activity in a browser-capable environment, identify provider, schema, time zones, pagination, caching and terms. Ask airport for written permission or an authorized feed if necessary. Do not silently scrape or deploy undocumented endpoints.
2. **FlightStats public web interface**: third-party reverse-engineering documentation at https://github.com/evilsaloon/flightstats-web-api describes `/v2/api-next/flight-tracker/{arr|dep}/{airport}/{year}/{month}/{day}/{startHour}` with 12-hour chunks. This is a **technical feasibility lead only**. Verify current behavior, terms and redistribution authorization before using.
3. **Airport-specific third-party HTML boards**: https://www.ottawa-airport.com/yow-arrivals and /yow-departures expose current flight numbers, times and statuses in accessible HTML, but explicitly source third-party data and are **not** the official YOW authority. Not approved for republishing; quality, licensing and refresh remain unverified.
4. **FlightStats licensed FIDS product**: https://developer.flightstats.com/api-docs/fids/v1 explicitly offers airport-board JSON; commercial access and pricing need verification, likely incompatible with free-only constraint.
5. **Open-source route/history datasets**: OpenFlights explicitly does **not** offer timetables (https://openflights.org/data.php); MrAirspace's quarterly ADS-B-derived flights are historical observations, not published schedules. Useful for PATTERNS/validation, not BOARD timetable.
6. **SkyLink** advertises 1,000 free requests/month (https://github.com/SkyLink-API/flight-schedules-api), far below a 30–60-second refresh of two directions; already rejected as primary. FlightNerve's public route listing with obscured schedule times is not a free live board.

**Novel avenues worth testing**: a direct permission request to the Ottawa Airport Authority for its public FIDS data; airline-operated flight-status feeds as independent confirmation of flight changes (not assumed to cover all carriers); regional airport open-data portals and airport-operated JSON/ICS feeds; a locally cached, event-diffed publication layer **only after** a licensed upstream source is secured. Combining multiple incomplete feeds must expose coverage gaps, not imply completeness.

**Feasibility gate**: capture actual scheduled future + landed YOW flights, both directions, estimated/actual/status, provenance, local-time conversion and codeshares; measure coverage and freshness; establish lawful automated reuse and realistic free quota. Until then label the current UI as observed/reported airport movements, never a complete published timetable.

## New evidence and alternate delivery path — 2026-10-10

- **Avionio authorized embeddable widget candidate:** https://www.avionio.com/en/widgets/yow/arrivals/en publicly advertises a free, unrestricted iframe for YOW, example `https://www.avionio.com/widget/en/yow/arrivals?style=3`; advertises 5,500 airports. This is a genuinely different licensing/product option from reverse-engineering JSON: evaluate embedding within DOAA as a clearly attributed, externally operated *interim airport timetable*, not native DOAA data. Verify live rendering, accuracy, accessibility, mobile iframe dimensions, cookie/privacy policy, CSP, terms and refresh. **Do not imply iframe rows can power native flight dossier links.** If acceptable, offer it as a fallback while researching native authorized feeds.
- **Airportia** https://www.airportia.com/canada/ottawa-macdonald-cartier-international-airport/arrivals/ explicitly credits Aviation Edge real-time flight schedules API. Useful provenance discovery, but neither Airportia's displayed HTML nor Aviation Edge data is licensed to DOAA by that fact.
- **AeroPattern** https://aeropattern.com/airports/CYOW shows filed, en-route and arrived flight-plan-style records, including non-airline traffic. Distinct operational enrichment lead, **not** a verified published commercial schedule or reuse license.
- The official YOW arrivals/departures pages expose only a `Loading...` shell to static HTML retrieval; a browser network capture is still required to identify its data endpoint. Current execution environment's direct HTTP client failed DNS resolution, so no actual client script or network payload was inspected. Do not claim underlying provider identified.

## Primary-source license findings — 2026-10-10

- OpenSky's official REST documentation explicitly says it **does not provide commercial schedules/delays**; airport flight endpoints are historical/batch and cannot satisfy future published timetables. Its current terms require **prior written agreement for operational REST API use in a live application**, including non-commercial use. Sources: https://github.com/openskynetwork/opensky-api/blob/master/docs/free/index.rst and https://opensky-network.org/about/terms-of-use . Do not add it as a free production fallback.
- Aviationstack's published free plan allows **100 requests/month**; future flight and schedules access appear in paid tiers. https://aviationstack.com/pricing . Not viable for continuous BOARD.
- FlightAware's current AeroAPI Personal tier is usage-based with **up to $5/month in free query credit** (or $10 for ADS-B feeders); not unlimited free access, and excess requests may be billable. https://www.flightaware.com/commercial/aeroapi/ . Do not provision or enable.
- YOW's official homepage exposes expected ARR/DEP columns, status, gate/carousel and auto-refresh, but HTML retrieval shows **Loading...** rather than actual flight records. https://www.yow.ca/ . No network-captured feed, license, or schema has been verified.
- Airline NDC distribution interfaces must not be confused with public flight-status feeds; an Air Canada API inventory reports no published consumer flight-status API and gated NDC access. https://github.com/api-evangelist/air-canada . Secondary source only.

**Next technical gate:** browser network inspection of YOW's actual page; confirm source operator and access terms. In parallel investigate official airline/airport permission, public open-data feeds, and permitted flight status source partnerships. Prototype only a **source-neutral adapter with real provider fixtures**, never mock records passed off as operational data. Record source timestamp, terms, coverage, per-field provenance and change history.
