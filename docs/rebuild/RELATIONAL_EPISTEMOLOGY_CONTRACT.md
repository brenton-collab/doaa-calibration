# Relational evidence, enrichment and derivation contract

Updated 2026-10-12. Status: **product/engineering contract; source capabilities and algorithms require audit and tests**. Companion to `EXPERIENCE_V2.md`.

## Core model

DOAA observes, investigates and composes an interconnected aviation graph. **Entities** (airframes, dated flight operations, airports, runways, carriers, movements, observations, weather reports), **identifiers** (ICAO24, registration, IATA/ICAO flight number, callsign, airport codes), **claims** (values with source, time, scope, evidence and uncertainty) and **relationships** (operated-by, associated-with, departs-from, observed-at, located-near, assigned-to, etc.) are separate. A focus determines which neighbourhood of this graph the Inspector presents; it does not isolate one record.

CONTACT is the observation-centred, wide-aperture entry point; flight identity and airframe identity may be unresolved or multiple. A standing callsign route is a relationship, not a verified dated operation. A flight number may recur by date and may have codeshares. Relationships must retain direction, validity interval, evidence and resolution status where relevant.

## Three complementary ways to obtain useful facts

1. **Retrieve:** look up directly published/reported/observed facts from permitted sources, including ADS-B telemetry, ADSBdb, standing-route data, local history, airport movement feeds, published timetables/status and airline information when accessible.
2. **Derive:** calculate from established inputs using explicit, testable methods (distance, elapsed time, projected great-circle route progress, distance remaining, relative bearing, local time conversion).
3. **Infer:** reason probabilistically from multiple observations (likely phase, likely approach, plausible route or aircraft assignment) with calibrated, non-absolute language.

The absence of a direct field from one source is not a final missing result. A **failed lookup**, **not searched**, **temporarily unavailable**, **not applicable**, **conflicting**, **not yet established** and **genuinely unknown** are distinct internal states. Do not collapse them into user-facing UNKNOWN.

## Investigation policy

- Treat each useful identifier, location and timestamp as a lead. Query relevant source families and use the results to discover further identifiers, with bounded fan-out, caching, timeouts, quotas and legal access constraints.
- More independent complementary sources can increase coverage, resolution and cross-validation. **More sources do not automatically mean higher certainty**: distinguish independently observed evidence from copied/aggregated reports; resolve conflicts explicitly.
- Prefer high-quality sources for particular claims, not one globally preferred provider. AirLabs is optional, budgeted and presently unavailable; its absence must not stop basic dossier construction.
- For a BOARD flight such as AC234, combine flight number with airport, local service date, direction, movement time and operator context; normalize airline IATA/ICAO identifiers (e.g. AC/ACA) and seek a dated operation. Search permitted published airline and airport sources if the existing sources lack schedule/status. Do not assert that a flight number by itself yields a unique departure or arrival time.
- Separate **scheduled**, **estimated**, **actual**, **first/last observed**, and **derived** time. Preserve date, timezone, provider time and as-of time. Do not invent a schedule from an ADS-B observation.
- For SKY, use callsign, ICAO24, registration, position, observation time, route association and cached memory to seek the best-supported identity/route; do not let an aircraft-only endpoint block a flight-number-led BOARD dossier.
- If route endpoints and an appropriately associated, fresh position exist, calculate **geographic** progress locally: project position onto the airport-to-airport great-circle path and clamp/qualify the result, subject to deviation and phase checks. Do not confuse straight-line projected progress with actual flown distance or elapsed-time progress; guard against wrong aircraft, ground state, stale coordinates, dateline/polar cases and unreasonable path divergence.
- Present immediately available facts first; enrich asynchronously without stale responses overwriting a changed focus. Cache facts with provenance and expiry appropriate to volatility; avoid unnecessary repeated provider calls.

## User-facing assertion standard

**Confident about known facts, useful with reasonable inferences, quiet about absent facts.** Source machinery is not the default UI. The Inspector should not become an audit log.

- Observed/reliably reported: state plainly with appropriate time context.
- Derived: present as useful value; use a compact qualifier only where the distinction changes interpretation (e.g. “Position-based”).
- Inferred: natural concise qualifier (“Likely descending”).
- Standing/historical association: distinguish “Typical route” from a confirmed current itinerary.
- Essential genuinely missing fact: one readable status, not repeated UNKNOWN rows.
- Conflict/material uncertainty: signal locally and allow deeper evidence inspection on demand.

Do not add caveats to every element. Do not falsely promote associations, stale positions, or predictions to observed truth. Full provenance and competing claims remain accessible for deeper inspection, without consuming the primary editorial composition.

## Source-capability audit and verification backlog

**Known source-code facts from current V2 parent (not live runtime proof):** `src/worker.js` has `adsbdbDossier(hex,call)`, `vrsRoute(call)`, `resolveRouteFree(call)`, `adsbdbRoute(call)`, and `dossierApi`. `dossierApi` requires a six-digit ICAO24 hex and consults memory and free route/aircraft sources. This makes it insufficient by itself for BOARD records identified only by flight number. The presence of functions is not proof of successful current provider responses.

Audit, in order:
1. Trace a real BOARD record: raw movement → normalized flight identifier/date/airport/time fields → current dossier request → time rendering. Record whether missing times result from absent source coverage, lost fields, unattempted lookup, date mismatch, or UI mapping.
2. Trace a SKY Contact with route+position: endpoint coordinates, position freshness, identity/flight association, geometry calculation and progress UI. Reproduce with fixture and live examples, and distinguish missing calculation from suppressed rendering.
3. Inventory every configured free provider and local D1 evidence store: lookup keys, coverage, provenance, freshness, quotas, permissions, failure behaviour, output fields and gaps. Assess airline-published schedules/status for legal/reliable access; do not assume consumer pages are stable APIs.
4. Test source failure, conflicting claims, callsign reuse, codeshare, flight-number date ambiguity, unknown actual times, stale ADS-B, airport deviations, and progressive enrichment cancellation.
5. Verify visual result with meaningful populated and sparse fixtures. Better synthesis must produce a better Inspector, not more debugging metadata.

## Acceptance examples

- BOARD has flight number but no schedule from preferred provider: attempt dated-operation enrichment using all appropriate permitted sources; show sourced schedule when obtained, otherwise a precise human status, not premature UNKNOWN.
- Route endpoints and valid aircraft position: show calculated geographic progress with appropriate meaning and freshness; omit/qualify when geometry or association is unsound.
- AirLabs outage: core identity, route association, aircraft photo, weather, telemetry and available times remain independently enrichable.
- Two sources disagree: retain both claims and choose a defensible presentation or indicate local conflict; never silently overwrite.
- Every primary composition remains beautiful and understandable without opening an evidence drawer.

No algorithm, source capability, real flight time, provider access or deployment is claimed verified by this document.


## Governing synthesis principle (2026-10-12 clarification)

**Assert what the evidence warrants. Qualify only what materially changes the interpretation. Make the reasoning available without making it compulsory.**

Epistemological integrity must not become epistemological timidity. DOAA develops a defensible understanding of aviation activity through observation, retrieval, published records, derivation and reasoned inference. A conclusion synthesized from several sources is not categorically inferior to direct observation; assess the quality, independence, relevance, temporal fit and coherence of its supporting evidence. When these warrant a confident conclusion, state it confidently, even when inference contributed.

The distinction between observed, retrieved, derived and inferred is essential to internal evidence processing, but it is **not** a mandatory set of visible labels. A qualifier belongs in the primary experience only when omitting it would materially mislead about identity, location, time, operation, source reliability or interpretation. A strong inference need not be introduced with “likely”; a weak association must not be promoted into certainty. Keep the reasoning and competing evidence inspectable on demand, without imposing an evidence audit on ordinary use.

Presentation should absorb epistemic complexity, not export it. Do not confuse repeated disclaimers, confidence chips, provenance badges or generic hedges with trustworthiness. Preserve all safeguards: provenance, freshness, explicit source scope, dated-identity resolution, conflicts, independent corroboration, auditable derivations, and honest failure states. Avoid fabricating facts or concealing material uncertainty.

This clarification **supersedes any blanket reading** of the earlier “Inferred: natural concise qualifier” prescription. Qualify *materially uncertain* inferences, not every inferentially supported conclusion. Likewise, “Position-based” is necessary only where a user could otherwise mistake geographic progress for elapsed-time, flown-distance or operational progress. Earlier illustrative labels are examples, not compulsory UI furniture.


## Storage neutrality and evidence authority (2026-10-12)

**D1 is persistence infrastructure, not a privileged class of aviation evidence.** DOAA's locally retained observation is not intrinsically truer, more important or more complete than a competent independent source's record. Conversely, a robust conclusion synthesized from independent external sources may be better supported than a single local sighting. Evaluate claims by source quality, measurement method, temporal/spatial relevance, independence, corroboration and conflict, **never by whether they happen to reside in D1**. An external datum copied into D1 does not become a 'DOAA fact'; a DOAA observation exposed externally does not lose its provenance.

Keep separate conceptual roles: **evidence** (claims, observations, publications and their provenance), **understanding** (resolved identities, derived results and defensible inferences), and **persistence** (local records, caches, bookmarks, user annotations and continuity). A 'DOAA record' describes custody or product origin, not epistemic rank. A saved/bookmarked subject expresses user interest, not proof of a flight or event. Storage, ownership, provenance, confidence and user interest must not be conflated.

D1 may serve several useful purposes: persist local observations and history; retain fetched external records with source, retrieval time, source-valid time and license/retention constraints; cache costly/repeated enrichments with freshness/expiry and invalidation rules; store reproducible derivations and evidence links when useful; and save user bookmarks, notes or investigated subjects with appropriate privacy controls. These are **candidate responsibilities**, not authorization to retain every external dataset or expand the schema without examining existing contracts, licensing, quotas, privacy and retention requirements. Avoid unnecessary re-fetching while preventing stale cached information from masquerading as current. Cache entries must not overwrite contradictory evidence or sever provenance.

The product should present the **best defensible understanding available** regardless of whether it came from D1, live retrieval, published records or synthesis. Preserve material uncertainty and auditability internally; do not introduce a default 'DOAA versus outside records' hierarchy or user-facing provenance clutter. Audit any inherited code or UX that ranks local records categorically above external evidence, and revise deliberately with tests before changing data storage or production behaviour.


## Accumulative learning and nonlocal completeness (2026-10-12)

Owner requirement: **If DOAA learns something, it should not have to learn it from scratch every time; records must not be artificially incomplete merely because DOAA did not witness an event locally.** Treat knowledge as cumulative and source-neutral. Retain reusable, attributable findings, identity resolutions and relationships; retrieve them on subsequent encounters; enrich them with competent external evidence about activity anywhere, not just inside DOAA's Ottawa observation footprint. Local sightings are one valuable source of evidence, not the boundary of an airframe's biography, flight history or airport activity.

Different facts need different persistence/revalidation policies: stable manufacturer/type/serial data can be reused with infrequent verification; registration/operator associations need effective dates and refresh when challenged; schedules and movement statuses need temporal scope; live telemetry must expire rapidly. Cache reusable enrichment and record how it was established, with freshness and license/retention constraints. Re-evaluate conflicts and newly available evidence rather than treating stored values as immutable truth. 'No local observation' must not be rendered as 'no event'; 'no record found' must not be rendered as 'no event occurred'. Historical coverage gaps should be honest, not padded with speculation.

This is a **product/evidence contract**, not a claim that current D1 schemas, enrichment flows, cross-source identity reconciliation or historical coverage already implement it. Audit and design those mechanisms before making schema or production changes.
