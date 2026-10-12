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


## Clarification: confident synthesis and open spatial form (2026-10-12)

DOAA should assert evidence-warranted conclusions confidently, including conclusions reached through reasoned multi-source synthesis. Qualification is warranted when it materially changes interpretation, not automatically because a conclusion is derived or inferred. Reasoning, provenance, freshness and competing claims remain internally preserved and optionally inspectable. Avoid turning the interface into a disclaimer or confidence-badge system. See `RELATIONAL_EPISTEMOLOGY_CONTRACT.md` for safeguards.

The relational Inspector specifies continuity of investigation, **not** a dock, panel, tray, overlay or permanent arrangement. Model investigation origin, focused entity and visible workspace separately. Evaluate tangible responsive compositions in the Design Lab before deciding physical form; inherited SKY, BOARD and LOOK navigation is evidence, not design authority.


## UX Design Lab 01: investigation continuity (2026-10-12)

A standalone, zero-dependency HTML interactive experiment was produced as a conversation artifact (`doaa-design-lab-01.zip`, `index.html`). It compares A: continuous SKY with a 350px investigation panel and B: investigation-first workspace with SKY retained as geographic context. Working interactions: switch hypotheses, select among three **illustrative** aircraft, change Understanding/Relationships tabs, reveal reasoning on demand, follow an illustrative related-airport affordance into Relationships, and return focus to the origin aircraft. The design deliberately separates investigation origin, current focus and workspace hypothesis; no Inspector geometry is approved.

Local headless Chromium Playwright checks used `page.set_content` (direct `file://` navigation was blocked by browser policy), testing selection, mode switching, relationship view and origin restoration at 1440×900, 393×851 and 844×390. All three passed with no JavaScript errors or horizontal overflow; screenshots were captured. This is **Design Lab fixture verification only**, not deployed app verification, production-ready mapping, usability acceptance or previous-Rebuild preview inspection. All aircraft details and schematic geography are illustrative. The historical preview URL is recorded in `SKY_AUDIT.md`; visual inspection of it remains pending. Next: assess the two compositions as experience hypotheses, improve genuine relational navigation, then evaluate against the historical preview when interactive access permits. No infrastructure or production change was made.


## Endorsed starting visual direction: Quiet Precision (2026-10-12)

Creative direction: **Quiet Precision**. The owner enthusiastically endorsed the visual *family* illustrated in six supplied Aircraft, Airfield, BOARD, SKY and interaction-detail screenshots: contemporary aviation intelligence; confident typography; elegant hierarchy; restrained colour; purposeful whitespace; sophisticated cartography; instrument-grade clarity without cockpit pastiche or generic dashboard styling. Rich information should be composed and intelligible. SKY may remain quiet by default and reveal information where attention is directed.

**Status: endorsed starting direction, not a locked design system, approved layout, implementation contract or feature-removal decision.** Exact geometry, type, palette, density, containers, Inspector presentation, SKY/BOARD/Inspector composition and navigation remain open. The SKY illustration is intentionally incomplete: omitted features remain in the SKY Audit for deliberate retain/relocate/combine/rethink/remove evaluation. Historical code does not acquire design authority from these references.

Specific interaction hypothesis to explore: unlabelled default aircraft symbols → selection reveals positioned ATC-inspired data block and compact contact summary → optional full relational Contact Inspector. Avoid imposing three clicks for every investigation; selection and deeper investigation may use direct, keyboard and touch affordances. Distinguish investigation origin, focus and workspace. These are experiments, not prescribed click counts or finalized geometry.

Next creative task: **tangible visual alternatives within Quiet Precision**, differentiated by meaningful information-density and compositional decisions rather than superficial skins. Do not mechanically reproduce reference screenshots or restart aesthetic search. Preserve epistemological principle: assert what evidence warrants, qualify material uncertainty only, reasoning on demand. Illustrative concept content must not be mistaken for actual aviation evidence.


## SKY visual baseline clarified by owner (2026-10-12)

The owner supplied a screenshot of the **current implemented SKY map** and explicitly likes its existing visual/cartographic language and viewport. Preserve as the preferred SKY baseline rather than treating SKY as requiring visual reinvention: quiet pale basemap, dark directional aircraft glyphs, azimuth perimeter/ticks, range rings, graticule, airport crosshairs/labels, and restrained aviation colour. This is an endorsement of the **map's overall aesthetic**, not a declaration that every behaviour or feature is final.

Desired additive explorations: ATC-inspired aircraft contact labels; quiet default with a selected aircraft revealing a positioned data block and concise contact summary, with a direct route to full Contact Inspector (avoid mandatory three-click sequence); additional aeronautical chart elements including control areas/zones using legitimate NAV-chart conventions and **sourced, effective-dated boundaries/classifications/vertical limits**, not invented geometry. SKY Audit remains authoritative inventory for functional dispositions; no omitted capability is silently removed. The Inspector itself remains an independent, open visual-design problem.

Communication correction: present concrete visual/interaction choices in ordinary language and inspectable examples, not subjective labels such as 'operational elegance' without observable design consequences. Avoid proposing wholesale SKY redesign or assuming the Inspector's current structure is approved.


## Mobile home-screen diagnosis from actual preview screenshots (2026-10-12)

The owner supplied two screenshots of the previous-Rebuild **mobile SKY landing experience**, one with the nearby-aircraft rack collapsed and one expanded. These are **owner-captured runtime visual evidence**, not a browser interaction test performed by Sage. Crucial distinction: the owner likes the existing cartographic viewport, but finds the overall default/home experience unsuccessful.

Observed in screenshots: tall app/title/status header (including provider, cell counts, timestamps and refresh), dominant SKY/BOARD/LOOK/AMBIENT segmented navigation, large Preferences and MAP controls, map with compass/rings/trails/airport markers, persistent attribution/Return Home, and an expandable Nearby Aircraft list with large repeated rows and prominent ROUTE UNRESOLVED. When expanded, the rack substantially reduces the visible map. The UI chrome and rack feel visually and spatially separate from the restrained map language.

Design diagnosis **to test, not settled implementation instructions**: preserve the map aesthetic; redesign landing-screen hierarchy and use of viewport; relocate/de-emphasize utility controls without deleting capabilities; make map and nearby-aircraft discovery feel integrated; reduce repeated low-value unknown states while retaining honest uncertainty and access to provenance; design clear, accessible navigation and tray interactions on mobile. Do not equate 'quiet' with hiding essential affordances. Future visual variations should show whole mobile home-screen compositions, both rack states, not isolated map or Inspector samples. The Inspector remains a separate design challenge.


## Clarification: compositional intention, not uniform lightness (2026-10-12)

The owner clarified that the contrast between delicate SKY cartography and a visually heavier nearby-aircraft RACK is **not itself a problem**. The problem is that the current mobile home composition does not feel carefully constructed or intentional. Do not prescribe making the RACK uniformly lighter, smaller or less substantial. Evaluate proportions, rhythm, hierarchy, alignment, transitions, density, typography and integration on their merits. A strong RACK may productively contrast with the map.

The previously supplied Aircraft, Airfield, BOARD and SKY concept screenshots **remain the endorsed visual family**, alongside the current SKY map aesthetic. Do not substitute a generic minimalism or dark cockpit theme for Quiet Precision. Different instruments may have distinct information densities while remaining visually coherent. This clarification refines, rather than overturns, the prior mobile home-screen diagnosis.


## Owner direction: one reusable, free-roaming relational Inspector (2026-10-12)

The owner proposes **one Inspector as the reusable investigative surface** across Aircraft, Flight, Airport, Observation and other subjects, rather than separately designed application sections. Its subject-specific focus, information composition, object relationships and available actions change with what is being inspected, while the visual language and exploration behaviour remain coherent. Open-world/free-roam exploration follows curiosity through tappable real aviation objects and relationships. Objects, not a proliferation of navigation chrome, should carry most movement through the experience.

The principal explicit navigation affordance should be a natural **Close** control returning to the underlying Home/SKY experience. Treat this as a strong design direction, not proof that browser/system back, accessibility navigation or investigation-history recovery can be discarded. Distinguish **origin** (where investigation began), **focus** (currently inspected entity), and **workspace** (where investigation is displayed); changing focus must not automatically erase origin or reset workspace. Investigate unobtrusive backtracking without imposing mandatory tabs/breadcrumbs. Avoid rigid identical layouts for all entity types: reusable Inspector grammar and interaction, subject-sensitive composition. Physical geometry and final navigation details remain open pending tangible visual exploration.


## Inspector familiarity without rigid templates (2026-10-12)

Owner clarification: **one Inspector should establish recognizable layout and interaction expectations across Airframes, Airports, Flights, BOARD subjects and other investigations**, without forcing identical data sections. Recurrent compositional rhythm: a hero image or meaningful subject visualization; large, legible identity and overview; progressive disclosure into increasingly granular data and evidence; a meaningful subject-appropriate interactive graphic/element; and consistently identifiable drillable relationships. This is a shared visual and behavioural grammar, **not** a mandatory four-step wizard, uniform card grid or rigid template. A missing genuine image or graphic must not be fabricated just to fill a slot.

Drillable aviation entities should look and behave consistently across contexts. Preserve origin/focus/workspace distinctions and a natural Close-to-Home/SKY affordance, with unobtrusive history recovery to evaluate. The degree of graphic prominence, exact hierarchy, responsive layout, and presentation for each entity remain design questions to explore visually. A shared structure should make the user feel oriented even when the investigated object changes radically.


## Rebuild feature continuity: place capabilities where they belong (2026-10-12)

The owner values the previous Rebuild's **Track** experience, including playback, statistics, flight characteristics and moments, and wants to preserve valuable capabilities rather than abandon them in the redesign. Rebuild also has flight-phase pills, a separately broken-out History view, and Movements. Their **functions are candidates for retention**, while inherited view/tab boundaries and visual treatments are not approved design constraints. Audit each capability and deliberately retain, rethink, integrate, relocate or remove only with explicit rationale. No silent functional deletion because an illustration omits it.

Design hypotheses to test visually: treat track/playback as a substantial interactive subject-specific instrument in aircraft/flight investigation; coordinate time/position with altitude, speed, vertical-rate profiles and meaningful moments; use phase indicators contextually rather than as obligatory chrome; let past flights, observed tracks and historical observations be explored from the subjects they concern rather than requiring a standalone History view; keep Movements prominent in airport/BOARD exploration and link movements to relevant flights and airframes. These are **placement hypotheses, not decisions**. The relational Inspector must retain a familiar hero → overview → interactive instrument → granular evidence rhythm, adapted to subject.

Epistemic safeguards: observed track coverage is not automatically a complete flight; distinguish actual sightings/observations, inferred operation, scheduled movement, and historical replay; synchronize timestamps and preserve provenance internally, surface material gaps when they change interpretation. The next visual design study should demonstrate where Track, playback, moments, history and Movements actually live rather than merely naming them in a feature inventory.


## Owner endorsement: Rebuild's existing graphical flight instruments (2026-10-12)

Owner clarification: Rebuild already implemented Track/playback, altitude/speed/vertical-rate profiles and flight-characteristics **graphically**, and the owner liked those presentations. Treat them as positive design evidence and candidate components to inspect, preserve and thoughtfully adapt, **not** merely data requirements awaiting replacement by text summaries, metric tiles or newly invented charts. Their final location within the shared Inspector remains open; graphical capability and interactive coordination should survive redesign unless deliberately improved or superseded after comparison. Investigate actual inherited visuals/interactions before proposing replacements. This refines the previous placement-hypothesis section.


## Shared temporal navigation hypothesis: continuous past/present/future (2026-10-12)

Owner recalls and endorses a previous Rebuild idea: a bidirectionally/infinite scrolling chronological list, backward and forward in time, with a visually shaded/highlighted **Now** zone and easy **snap-to-now** action. Candidate uses: airport movements, BOARD, airframe biographical history, and other timelines. Treat as a promising reusable interaction grammar rather than one prescribed global component or a committed UI layout. Investigate existing Rebuild implementation/intent before replacing it.

Design exploration should show the Now treatment, intuitive temporal direction, meaningful event density, changing time scales (minutes/hours for operations; years/decades for airframes), and a reliably discoverable return to present. Temporal truth is essential: past observed events, scheduled future movements, projections and inferred events must remain distinguishable when that changes interpretation. 'Infinite' should mean seamless navigability with bounded data fetching and honest coverage boundaries, not fabricated history/future or unbounded resource use. Coordinate with Track playback when relevant without conflating the playback cursor with real-world Now. The final interaction and placement remain open.


## Continuity beyond SKY visibility (2026-10-12)

Owner clarification: **BOARD and Movements must expose aviation objects and events that are no longer visible in SKY**, as well as appropriate scheduled/upcoming activity not yet visible there. SKY contact visibility is a time-sensitive spatial presentation state, **not an object lifecycle or record existence boundary**. Aircraft, dated flights and airport movements remain investigable after positional contact ages out, and can be discovered through BOARD, airport Movements, history and related-object navigation. Likewise, scheduled operations may be discoverable before any SKY observation. A contact's disappearance from SKY must not delete, fragment, or de-identify the associated subject or evidence.

Preserve continuity of identities, links, timelines and Inspector navigation across SKY, BOARD and Movements; do not require an object to have a current SKY position to appear in operational or historical views. BOARD and Movements are complementary temporal/operational entry points into the same evidence graph, not alternative live-contact lists. Distinguish scheduled, observed, inferred and completed operations as materially needed. Specific UI placement and data contracts require audit and Design Lab validation.


## RACK is the list projection of SKY (2026-10-12)

Owner clarification: **RACK is simply a list view of SKY, governed by the same rules and the same contact set.** It is not a separate event source, historical archive, movement ledger or reduced BOARD. SKY and RACK share positional evidence eligibility, freshness/coasting/expiry semantics, contact identity, relevant filters and Inspector destinations. RACK may offer list-specific ordering, density and comparison affordances without changing membership or epistemic status. Contacts aging out of SKY also age out of RACK; completed/past and scheduled/future operations belong in BOARD/Movements or Inspector even when absent from both. Test parity of SKY and RACK membership and lifecycle; the exact visual arrangement remains open.


## Design Lab 02 feedback and evidence (2026-10-12)

User-supplied Android screenshots of Study 01 show four issues: mobile RACK scrolls horizontally rather than vertically; the endorsed compass rose is missing; dashed versus solid trail semantics are unexplained; and CONTACT Inspector places telemetry before the more important flight route. User explicitly liked the unknown-airframe silhouette illustration and described the overall direction as in the right neighbourhood. The screenshots and annotated arrows are first-hand user review evidence, not independently browser-verified results.

A revised local standalone HTML study, `doaa-lab/study-02.html`, was created and linked in the conversation. It sets mobile RACK to a vertically scrolling list, restores a north-up compass graphic, removes the ambiguous dashed trail, moves route above telemetry, retains the silhouette, and varies illustrative route fixtures. These edits were checked by static HTML inspection. Browser rendering was attempted using Chromium/Playwright but both local file and local HTTP navigation were blocked with `ERR_BLOCKED_BY_ADMINISTRATOR`. Hence no claim of mobile visual, scroll, accessibility or interaction verification. The standalone HTML is a conversation artifact, not yet repository source or deployed preview. Do not treat any sample aircraft, route or position as real evidence.

Next: obtain actual rendered feedback on Study 02; retain user-endorsed Rebuild cartography as the baseline rather than approving the schematic placeholder map; assess CONTACT hierarchy and integrated RACK at real phone and desktop sizes. Preserve the distinction between user observation, static code checks and runtime verification.


## Design Lab 02 owner verdict and compass reference (2026-10-12)

Owner reviewed Study 02 and said: **'Completely wrong implementation of the compass, but much better overall.'** Owner supplied a screenshot of the preferred existing SKY compass/cartography. This is **positive comparative feedback on the overall second composition**, not approval of its compass or final visual system.

The preferred compass is **not** a small floating north-arrow widget. It is a large map-integrated azimuth/range instrument: perimeter graduated bearing ticks and numeric headings (000, 030, 060, etc.), geographically anchored concentric nautical-mile range rings, map graticule, understated terrain/road labels, directional aircraft symbols, and airport crosshair labels. Its visual/geographic integration and scale are essential. Preserve the existing SKY implementation as positive reference evidence, inspect actual source geometry and responsive behaviour, and reject Study 02's replacement corner compass. The attached user screenshot is primary design evidence in the conversation; no claim that this new study was browser-tested independently. Next visual revision should restore the existing instrument, not invent a new compass design.


## Compass geometry correction (2026-10-12)

Owner specifies that the preferred SKY compass is **zoom-relative and drawn at the second-most-distant range ring**. It is not a viewport-fixed or fixed-pixel-size compass overlay. Its graduated azimuth perimeter and bearing numerals must follow the same geographic projection, map centre, scale/zoom and range-ring calculation as the rest of SKY. When range-ring spacing/selection changes with zoom, the compass follows the second-outermost ring. Inspect the existing drawing algorithm and validate its exact ring-selection semantics before adapting it; the screenshot is a visual reference, not a source of precise geometric dimensions. This supersedes Study 02's floating north-indicator treatment.
