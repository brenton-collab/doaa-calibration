# DOAA · Rebuild Rebuild · Experience and HMI contract

Status: **active design contract; interaction and visual specifics require Design Lab validation before implementation**.
Branch: `rebuild/experience-v2`; parent: `rebuild/field-notes-foundation`. Updated 2026-10-12.
This contract supersedes conflicting inherited UX/navigation prescriptions for the V2 experience, but does not discard inherited domain, safety, security, evidence or other nonconflicting product requirements. Read `REBUILD_REBUILD_RECONCILIATION.md` and `RELATIONAL_EPISTEMOLOGY_CONTRACT.md` alongside it.

## Intent and experience

DOAA is an Ottawa-centred aviation observation and investigation instrument, not a database front end or a stack of independent screens. SKY offers spatial discovery; BOARD offers movement/time discovery. They lead into the same interconnected aviation world. The user's supplied aviation editorial UI references, including the photo-led Contact composition, are **visual specification and acceptance references**, not loose inspiration. Fidelity must be evaluated on real viewports.

The experience should be elegant, information-rich, fast, discoverable, and confident without misrepresenting evidence. Control scope, not polish. **Visual language, UX and HMI have equal priority with evidence acquisition, synthesis and epistemology.** A backend-first pass is not a substitute for designing the actual human experience.

## Relational Inspector: confirmed direction

- **One Inspector surface**, not multiple Inspectors or an application composed of focus tabs. The Inspector is a persistent window onto an interconnected graph of aviation entities, observations, relationships and derived facts.
- **One centre of attention / focus at a time does not mean one object at a time.** Each focus composes a meaningful neighbourhood of related entities and properties. The focused entity controls editorial hierarchy, not an exclusion boundary.
- **CONTACT** is the wide-aperture, observation-centred entry composition: a coherent overview of the encountered aircraft, flight association, airframe, origin/destination, state, timing and telemetry as available. Its focus is the encounter/contact context, not necessarily a single fully resolved flight or airframe.
- Flight, Airframe, Airport/Airfield, Runway, Weather, Movement, History and other meaningful entities may become the centre of attention through direct exploration. Each composition continues exposing its own related entities, not only CONTACT.
- **Content is navigation.** Tap a flight number to focus the Flight; tap YOW/YYZ to focus that Airport; tap an aircraft hero image or registration to focus the Airframe. Further relationships can be followed indefinitely. Do not impose dedicated focus tabs, a row of navigation buttons, or obligatory Explore cards.
- **Open-world exploration:** no required Back button, breadcrumb stack or prescribed return hierarchy. A discreet, natural Close control returns to the underlying SKY context when entered from SKY. BOARD-origin return behaviour and other workspace nuances require Design Lab testing, not an invented rule.
- The absence of Back is a **deliberate design hypothesis**, not a fully tested immutable decision. Do not silently reinstate Back as a conventional default. Test accidental navigation and recovery in the Design Lab without cluttering the Inspector.
- **Link affordances are semantic.** Self-evident linked objects (airport codes, flight identifiers, aircraft hero, registrations) need no arrow. Use a restrained arrow/chevron when depth would otherwise be non-obvious, meaning “there is more here,” not “everything clickable gets an arrow.” Properties without a meaningful linked object remain inert.
- Object transitions should preserve the sense of a single continuous Inspector. Instant vs subtle animated transition, transition direction, and detailed dismissal gesture remain open design questions. Respect reduced motion and provide visible pressed/focus feedback.
- No dead click targets or nested conflicting controls. All linked content must have usable touch targets, keyboard interaction, screen-reader labels and a visible focus indicator.

## Visual/HMI acceptance contract

Design **compositions**, not a collection of generic field rows, pill badges or uniform cards.

- Photo-led aircraft/airport hero when a sufficiently specific, permitted and attributed image is available; otherwise a deliberate, high-quality aviation illustration/vector treatment, never a misleading fake photograph.
- Large editorial identity (e.g. flight number), restrained descriptive subtitle, clear state, meaningful iconography, aviation-blue accents, quiet grey/tonal surfaces, fine dividers, confident typographic scale, deliberate whitespace and hierarchy.
- Airport-code route composition with names, visual direction and derived geographic progress when computable; do not leave a progress bar empty merely because a provider did not supply a progress percentage.
- Scheduled, estimated and actual times differentiated by meaning and date/timezone, displayed as legible graphic timing elements rather than repetitive UNKNOWN fields.
- Distinguish linked objects, actions (Follow, Show on SKY, Refresh) and ordinary properties through consistent interaction grammar.
- Dense when information is useful; quiet when it is not. Prefer progressive enrichment and graceful placeholders to repetitive caveats or entire sparse sections.
- Mobile sheet / wide docked presentation remains a reuse candidate from the inherited contract, subject to real composition testing. Independently scrollable content must not obscure close or conflict with map controls.
- Semantic accessible markup, contrast, 44px-class practical touch targets, keyboard focus, reduced motion, responsive phone/landscape/tablet/desktop, genuine loading/stale/error/empty states.
- A rendered chat reference is **not portable application code**. Recreate and validate faithful real HTML/CSS/SVG components in a **separate Design Lab** with representative, explicitly illustrative data. Approved lab components should be reused directly in the app, avoiding screenshot reinterpretation and legacy CSS override accretion.

## Epistemic presentation and investigation

DOAA must not equate “provider X failed” with “unknown.” A flight number, callsign, registration, ICAO24, airport code, movement direction, observation time, or aircraft position is a **lead** that should drive bounded cross-source investigation.

Use retrieval, calculation/derivation and evidence-calibrated inference together. More complementary, independent sources improve potential coverage and cross-checking; **source count alone does not equal confidence**, and copied/derivative sources must not be counted as independent corroboration. Preserve detailed evidence, provenance, timestamps and contradictions below the surface; present a confident useful synthesis above it. Avoid disclaimers everywhere.

Present directly observed/reliably sourced values plainly; use compact contextual qualifiers such as “Typical route,” “Likely,” or “Position-based” where they matter. Do not turn a standing callsign route into a verified dated operation, or a stale observation into a current position. Omit nonessential missing fields; provide one useful explanation where a critical value is genuinely unavailable. “Unknown” is a **last defensible state after appropriate lookup and derivation**, not a default response to an absent provider field.

BOARD flight numbers plus airport/date/direction/time should initiate dated-flight resolution and schedule/actual-time enrichment across permitted sources, including airline-published information where reliable lawful access is feasible. Do not promise that a flight number alone uniquely identifies times. If route endpoints and current aircraft position are available and properly associated, derive geographic route progress locally (great-circle projection initially; track-based alternatives as evidence permits), label its meaning, and handle deviations, stale positions and ground state. Geographic percentage is not elapsed-time percentage.

Open immediately using known/cached information and progressively enrich without stale asynchronous results overwriting the current focus. Bound provider timeouts, cost, quotas and fan-out; no unapproved paid API or scraping assumptions.

## Engineering boundaries and sequencing

Preserve verified aviation acquisition, D1 evidence/history, provider fallback, airport/weather enrichment, geometry and account/security contracts as candidates to reuse/adapt. Do not reuse the coupled legacy Inspector UI or blindly inherit navigation prescriptions. Normalize entities, relationships and claims in a domain layer; separate acquisition/investigation, evidence/derivation, presentation view models and UI. A typed evidence state must not become a badge on every datum.

**First gate: Design Lab, not another premature app rebuild.** Co-design and test one excellent CONTACT composition and the linked Flight, Airframe and Airport neighbourhoods on the *same Inspector surface*. Test navigation without Back, Close/return, keyboard/touch, visual hierarchy, transition feel and mixed known/derived/unavailable fixture data. Lock concrete visual tokens, component behaviour and screenshot references before migrating to DOAA.

**Parallel research gate:** inventory BOARD and Inspector lookup paths, time provenance, route resolution, geometry and progress computation; identify where useful data is dropped, never sought, or never derived. Verify providers' capabilities and access constraints. Document measured findings rather than guessing. Do not demote design work to a later polish phase.

**Implementation gate:** reuse the approved Design Lab components, connect normalized real data, verify representative BOARD and SKY flows, outage and stale-response paths, realistic viewport interaction, and only then deploy an isolated preview after quota/safety checks. No production changes or new costs without approval.

## Status

2026-10-12: documented product direction and inherited-contract reconciliation; **no V2 Design Lab, new UI implementation, interactive verification or deployment completed**. Earlier V2 spec's explicit Back stack, focus tabs, Explore cards and immediate implementation gate are superseded here. Open questions remain design hypotheses until tested.
