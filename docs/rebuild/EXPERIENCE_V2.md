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


## UX sandbox delivery decision and cold-start execution contract (2026-10-12)

**Owner-approved direction:** Sage delivers **standalone, purpose-built interactive toys** for Brent to interrogate before consequential experience choices enter product development. Do **not** build a persistent Lab application, component catalogue, shared prototype framework, or infrastructure just to host these studies. A toy may be disposable; **validated design principles and decisions must be cumulative** in this canonical record. Do not interpret the decision to use toys as permission for decorative or fake interactions. The fidelity must match the question being tested.

**Why:** Reversible, tactile experiments allow direct reactions (liked / disliked / revise) to interaction and presentation primitives before coupling them to production architecture. Cohesion among SKY, RACK, BOARD and the unified relational Inspector matters more than polishing any surface in isolation. Test shared primitives in representative cross-surface contexts. Do not assume every surface should look alike.

**Three primitive families to explore:** (1) domain/evidence: airframe, aircraft/contact, flight, airport, movement, observation, source, freshness, inference, temporal context; (2) interaction: selection, subject focus, follow a relationship, dismissal/return to context, temporal navigation, gestures and synchronized SKY/RACK membership; (3) presentation: identity, route, telemetry, symbols, charts, provenance, typography, layout and responsive composition. Distinguish proposed from validated primitives; do not freeze speculative abstractions into application code.

**First next experiment:** A standalone, polished **relational Inspector interaction toy** with CONTACT, Flight, Airframe and Airport compositions, reached from representative SKY and BOARD entry points. Include real, working subject transitions, relational links, dismissal and recovery, and responsive mobile/desktop layout. Put route/identity before telemetry for CONTACT, retain the liked unknown-airframe silhouette treatment, and reuse the emerging Quiet Precision visual direction without treating it as final. Use a coherent, explicitly illustrative aviation dataset, never fabricated live claims. Test what remains invariant as users move between surfaces. SKY in this toy can be a representative entry context **if map gestures are not being evaluated**; do not call it a verified interactive SKY map.

**Map-specific toys require actual map interaction:** The first two SKY studies were useful composition references but **static/unpanable/unzoomable**, so they did not validate cartographic behaviour. Any future toy purporting to test SKY map behaviour must genuinely pan/zoom, preserve inherited geographic rings and the second-outermost *visible* ring graduated compass, and exercise map/contact synchronization. Inspect/reuse Rebuild's real projection and map code before substituting an illustration. BASE/STREET and trail capabilities are inheritance candidates; MET/NAV are provisioned but disabled in the inspected entrypoint, and must not be abandoned or falsely presented as operational. See SKY_AUDIT.md.

**Tools and delivery method (Sage owns execution):**
- Use **GitHub connector** to inspect the canonical repository `brenton-collab/doaa-calibration`, branch `rebuild/experience-v2`; read this contract, `README.md`, `SKY_AUDIT.md`, epistemology and relevant inherited modules. Preserve branch/source state and log accepted/rejected decisions with rationale. Do not use conversation history as sole project truth.
- Build standalone **HTML/CSS/JavaScript** artifacts, using the local **container/Python file tools** to create the actual file and test scripts. Prefer plain web platform code; reuse inherited JS/map modules when appropriate; avoid adding a framework or hosted service without a demonstrated need.
- Validate in a real **browser/viewport interaction test** when browser tooling is available, especially Android-sized portrait and desktop. If unavailable or blocked, say so precisely; source inspection is not runtime verification. Provide a working file link only after verifying the exact local artifact path. Do not claim phone behaviour was tested if it was not.
- Use the **GitHub connector** for durable decisions and, where warranted, versioned toy source. Local `sandbox:/mnt/data/...` links are session artifacts, **not canonical continuity**. A new thread should recreate or retrieve them rather than assume a previous path exists. No need to commit every throwaway experiment; preserve the decisions and the best reference implementation when useful.
- No production deploy, D1 mutation, provider spending, billable services or unnecessary GitHub Actions. A local standalone artifact is the default delivery. Do not spend limited ChatGPT Work quota simply to host toys.

**Working rhythm:** deliver a testable toy; Brent interrogates it; Sage records retained/rejected/revised primitives; next toy inherits validated decisions without mechanically inheriting code. The owner is creative director, not the test operator or project historian. Sage maintains scope and may challenge tangents: DOAA-RR reconstructs the experience, not every existing component; inherited features are judged retain/refine/relocate/replace/retire. Avoid swinging back and forth between 'implement now' and 'build an entire lab platform'. Product implementation follows sufficient cross-surface validation and uses reversible module boundaries.

**Current verification/status:** Studies 01 and 02 were composition exercises, not reliable map-interaction tests. Source inspection has confirmed Rebuild's existing compass, pan/zoom handlers and map-mode provisions; these have not been browser-verified in this workstream. The standalone Inspector toy described above is **planned, not built or tested**. Next action: create and deliver that toy, not another proposal, with an explicit fidelity/test report.


## Inspector Study 01 owner evaluation (2026-10-12)

Owner tested the standalone relational Inspector toy and **affirmed the exploration mechanism as the intended direction**: content-led traversal among aviation subjects within one continuous Inspector, reached from SKY or BOARD. This is **directional validation of interaction grammar**, not acceptance of a final interaction specification or of the prototype's cards.

**Explicit deficiencies:** Airport compositions have no hero treatments; the cards across subjects are substantially too sparse. The actual content, hierarchy, imagery and compositions must evolve. Do **not** treat Study 01 as an approved content model, information architecture, or visual acceptance reference. Airports need airport-specific editorial hero and substantive geography/runway/weather/movement context; Flight and Airframe likewise require subject-specific information-rich compositions, analytical graphics and evidence-aware relationships. These are design targets, not claims of already available data.

**Next UX objective:** Explore rich, differentiated subject compositions using the now-directionally-accepted relational traversal, beginning with Airport and Flight (while preserving CONTACT as wide-aperture entry). Demonstrate hero treatment, layered information, genuine relational links, responsive layout and evidence/provenance semantics. Avoid investing another iteration merely re-proving the same basic click-through navigation. Test remaining navigation edge cases (return/recovery and close from BOARD) in context. All study data must remain clearly illustrative and never imply live verification.


## Study 02 follow-up evaluation: continuity, mobile Back, density (2026-10-12)

Owner confirms the relational Inspector **does feel like one continuous investigation**, not disconnected pages; stronger topmost HERO treatments should reinforce this. This is validation of the exploration direction, **not** of the sparse content model. On mobile, the platform **Back gesture must work**. Reconcile this with the earlier no-*visible*-Back-control hypothesis: avoid adding obligatory on-screen Back chrome, but maintain meaningful in-Inspector navigation history so browser/Android Back returns to the preceding subject, and only then to the underlying SKY/BOARD context. Test history semantics, deep links and Close separately; do not claim exact behavior approved before testing.

Discovery/hierarchy remains **unassessed** because the owner was auditing what content existed rather than browsing naturally. Do not interpret that as a negative or positive test.

Visual density is generally moving in the right direction: enough information to signal depth, with clear grouping and scannability. The Airport Inspector became **too wordy**, especially headings and typography. Prefer precise aviation-native labels such as **MOVEMENTS** rather than explanatory prose like “Through this Airport”. Reduce unnecessary text and clarify section hierarchy; do not respond to the richness requirement by adding indiscriminate copy.

Carry forward Study 02 corrections: BOARD rows themselves are clickable and contain operator logo/fallback graphic; HERO is topmost on every subject (airport photos need not be aerial); each subject needs a genuinely interactive graphic/instrument; inspect Rebuild's richer Airport Inspector before another toy. Next study should test richness, clarity, instrument utility and Android Back behavior, not simply re-prove navigation.


## Inspector Study 03 feedback: shared frame grammar and readable density (2026-10-12)

Owner says Airport and Flight compositions/instruments feel somewhat better but **both remain too light on data**. This is not acceptance of content richness. The immediate cross-object design requirement is a **consistent Inspector framing grammar**: the identity/information block directly beneath the topmost HERO must use the same type scale, spacing and visual hierarchy across inspected object types. Subsequent frames should likewise feel recognizably part of one system even when subject-specific content and interactive instruments differ. Specifically, **OVERVIEW body/information text in both Airport and Flight Study 03 is too small and must be larger**. Increase the legibility of values and substantive information, not only section labels.

Candidate pattern for testing: subject-specific topmost HERO; shared identity frame; legible overview frame; subject-specific interactive instrument(s); further evidence and relationships. This is a **visual grammar hypothesis**, not an approved rigid five-frame template. Preserve variation in subject composition and avoid imposing identical sections or ordering without reason.

Next toy should test cross-object consistency and scannability **under substantially richer, realistically structured illustrative aviation information**, while keeping epistemic qualifiers honest. Do not solve 'too light' with paragraphs or verbose labels; prefer useful compact values, diagrams, timelines, evidence and relationships. Prior owner feedback on BOARD row interaction, logos/fallback, mobile Back, and Rebuild Airport instrument reuse remains active.


## Study 04 critique: glance-first subject hierarchy (2026-10-12)

Owner challenges the ordering of Inspector frames: **start with “What do I want to see quickly, at a glance?” for the particular inspected subject**, rather than applying an invariant OVERVIEW-first list of attributes. For Flight, **route/progress and departure/arrival times belong together in the leading information frame**, not separated into a later graphic. Airport and Airframe require their own subject-specific glance priorities. Shared framing/typography must remain recognizable across objects, but **content hierarchy and frame order are not necessarily identical**.

Owner again finds OVERVIEW insufficiently visually prominent despite larger text in Study 04. Do not solve solely by enlarging fonts or adding heavy containers: rethink composition and the anchor information/instrument of the first substantive frame. The HERO remains topmost. The goal is **shared visual grammar with subject-specific information architecture and strong at-a-glance utility**.

Next experiment should demonstrate Flight's integrated route + interactive progress + meaningful times in its primary frame, alongside an equally intentional Airport glance frame. Continue increasing useful evidence-aware information density without wordy explanatory copy. This is owner critique, not validation of a finalized layout.


## Airframe Inspector: owner-defined progressive information hierarchy (2026-10-12)

The Airframe Inspector should answer **identity at a glance** immediately after the topmost HERO: individual registration/identity, operator, manufacturer/make, model/variant, type/category and age where supported. The owner then wants **technical depth** for enthusiasts: plant/manufacture information, wingspan, weights, runway requirements/performance, range, speed, maximum altitude/service ceiling and other relevant specifications. Later sections should include **notices, bulletins and advisories**, then a **scrollable airframe biography with inline photographs**. The sequence follows progressive curiosity, not a generic OVERVIEW attribute grid.

**Epistemic/relational guardrail:** distinguish facts about the individual airframe (serial, registration, operator, manufacturing date and biography) from aircraft type/variant specifications; distinguish bulletin applicability at manufacturer/type/serial/individual level. Do not infer a precise aircraft age from unsupported production dates; do not present generic performance or runway requirements as universal operational limits without conditions. Historical photographs, notices and events require provenance and dates; external sightings must not be mislabelled DOAA observations. Biography should be a meaningful chronological exploration, with source-qualified events, not invented filler.

Maintain a consistent Inspector-wide identity frame typographic grammar while tailoring its leading facts and later section ordering to the subject. Future Airframe toy should demonstrate the sequence and an interactive biographical timeline/gallery, not merely another sparse grid.


## Airframe: current location and movements (2026-10-12)

Owner adds a **small, explorable status dot/pill near Airframe identity** when DOAA has sufficiently fresh, attributable positional evidence to say where the individual airframe is *right now*. It should lead to its current SKY/contact position or relevant spatial inspection. Do not claim current location merely because a historical observation, last-known location, flight schedule or aircraft registration is available. Preserve timestamp, source and freshness; represent stale/last-seen or unavailable distinctly, and avoid a misleading always-on live indicator.

Add an **Airframe MOVEMENTS frame before BIOGRAPHY**: chronological past/current/future movements as supported by evidence, with explorable flight/airport relationships and temporal navigation. Distinguish recorded observations, actual operations, scheduled or predicted movements, and unknown gaps. MOVEMENTS is a focused operational list/timeline; BIOGRAPHY is the richer narrative, chronological life history with inline photos. Shared movement/time primitives should be reusable with BOARD and Airport Movements without conflating their scopes.

Updated candidate Airframe progression: HERO → identity + operator/make/model/type/age + conditional current-location indicator → technical specifications → applicable notices/bulletins → MOVEMENTS → scrollable illustrated BIOGRAPHY. Exact placement of notices versus movements remains a design question, but MOVEMENTS precedes BIOGRAPHY.


## Manufacturer → family → model/variant → airframe relational exploration (2026-10-12)

Owner proposes that **manufacturer, aircraft type/family, model and variant labels inside an Airframe Inspector be directly explorable**, each opening a subject-appropriate composition within the **same relational Inspector**. Example illustrative path: Airbus → A320 family → A321neo variant → individual registration/serial. Manufacturer Inspector should offer identity/overview, meaningful sections, history/biography, and a catalogue of aircraft families/models **for which DOAA has knowledge records**, not merely aircraft DOAA D1 has observed. Family/model/variant Inspectors similarly expose sourced specifications, histories, applicable bulletins and related models/airframes. Do not impose a single rigid section list across levels; reuse framing grammar and navigation primitives while selecting subject-appropriate content.

**Crucial epistemic separation:** existence of a knowledge record ≠ an observed airframe or D1 contact ≠ current position. Manufacturer/type catalogues must not be filtered solely by observational membership. Records and relationships must have stable identities and sourced provenance; aliases, designation hierarchies and variant relationships must not be invented or inferred merely from string matching. Direct tapping on labels is the navigation affordance, with browser/Android Back restoring prior subject and scroll state where feasible. The user's A329 example is hypothetical; do not treat A329 as a confirmed Airbus designation.

This expands the Inspector from flight/airport/airframe into a **relational aviation knowledge system**, without requiring an undifferentiated monolithic record or implying every named thing has a rich profile.


## Relational traversal: model → observed airframe → occurrence → operator/airport/service (2026-10-12)

Owner endorses traversing relationships freely: a model/variant Inspector should show relevant **airframes DOAA has observed** (alongside separately labeled known-record airframes); an airframe leads to its flights/movements; these lead to operators, airports, other flights, and other airframes that have operated the same flight. Navigation should feel like following evidence-backed connections rather than switching between unrelated apps or using explicit Explore buttons.

**Entity modeling:** separate manufacturer, family, model/variant, individual airframe, operator, airport, **flight service/flight-number identity**, and **dated flight occurrence**. A service can have multiple dated operations and different assigned airframes over time; a particular occurrence may have a specific aircraft only when evidence supports attribution. Record time-bounded relationships (registration, operator, assignment) and preserve sources, freshness and uncertainty. Distinguish knowledge-record coverage from DOAA observations and from current contact. Relations should be traversable in both directions when supported. Avoid presenting a relationship as factual solely because labels or flight numbers match.

Experience implication: related collections should be relevant and readable, not exhaustive walls of links. Directly tap meaningful names/codes; preserve Inspector Back trail and prior context. Use one continuous Inspector with subject-appropriate hero, glance-first framing, operational evidence and deeper histories.


## Study 05 owner validation: relational exploration and exit to SKY (2026-10-12)

Owner explicitly validates Study 05's **multi-hop relational investigation concept**: “Yes! This is the idea!!” and characterizes it as “choose your own adventure.” This validates the discovery/navigation model, **not** the prototype's illustrative aviation facts, completeness, visual polish or browser/mobile reliability.

**New essential navigation affordance:** users must have an obvious, restrained way to return directly to **HOME/SKY** from anywhere in a deep Inspector traversal. Preserve distinction between (1) Back: retrace Inspector subject history one hop, (2) Return to SKY/HOME: exit exploration to the prior SKY context, and (3) Show in SKY: intentionally locate/center a specific aircraft or other geospatial subject. Return should preserve SKY camera/zoom/selection/layers where feasible; Show in SKY should be explicitly distinct and evidence/freshness aware. Don't force multiple Back actions to leave a long exploration. Browser/Android Back should remain supported; evaluate a persistent SKY action in Inspector header.

Next study/implementation should preserve the validated multi-hop structure while adding the direct SKY exit and deepening genuine content and visual hierarchy. Avoid re-proving the basic concept with another skeletal toy.


## Study 05 scope clarification and portable architecture (2026-10-12)

Owner confirms Study 05 is **illustrative only**: actual Inspectors should be substantially richer, with additional evidence, instruments, sections, and directly explorable elements inside those sections. Do not treat Study 05's object set, field count, relationship count, frame composition or dataset as a product specification or ceiling. The validated aspect is the relational, multi-hop exploration behavior.

Owner observes that replacing the database and terminology could make this architecture useful for other domains. Preserve a **clean conceptual separation** between reusable Inspector mechanics (entity identity and resolution, navigation/back/exit, subject history, relational links, evidence/provenance presentation, shared visual grammar) and aviation-specific subject compositions, instruments, priorities and data contracts. This is a desirable architectural property, **not authorization to build a generalized cross-domain platform or framework now**. Keep DOAA-RR the proving ground; abstract only where implementation demonstrates genuine reuse without undermining aviation-specific quality.


## Beyond aviation feeds: knowledge enrichment for engine/plant/manufacturer exploration (2026-10-12)

Owner asks how an explorable engine/powerplant manufacturer such as Pratt & Whitney obtains knowledge outside DOAA's direct aviation observations. Proposed approach: a **provenance-preserving, source-specific knowledge enrichment layer** independent of D1 observation membership. Separate company/manufacturer, engine family/model, physical manufacturing plant, and aircraft/airframe identities; link only documented relationships. Candidate public sources include manufacturer product/history/facility pages, aviation authority type certificates and airworthiness directives, Wikidata for entity resolution and broad contextual relationships, and archival/historical/photo sources subject to licenses. Authority is claim-specific: manufacturer marketing claims are not equivalent to regulatory approvals; generic engine type fitment does not establish an individual airframe's actual installed engine or its production plant.

Prototype enrichment with one Pratt & Whitney engine-family case and its manufacturer/aircraft relationships, without ingesting the web wholesale. Store source URL, retrieval and source publication dates where available, licensing/attribution, claim scope, evidence strength, and staleness. Resolve identifiers and aliases before joining records. Use lazy/on-demand or targeted precomputation with caching, bounded requests and failure fallbacks; never fabricate a profile or imply live verification. Wikidata's public SPARQL endpoint is documented, but its usage limits, API etiquette and changing backend must be assessed; verify all source licensing and cost/quota before integrating services. Zero incremental cost remains mandatory.


## Inquiry depth: selective exploration rather than unlimited graph expansion (2026-10-12)

Owner questions whether a manufacturing facility warrants a full Inspector merely because an engine's production location is known. This exposes a necessary **scope/attention boundary**: DOAA may store or cite relevant contextual facts without making every connected entity a rich navigable destination. Prioritize **aviation understanding and curiosity**, not graph completeness or an indiscriminate encyclopedia.

Proposed three-tier treatment, to validate in UX: (1) core aviation subjects (airframes, flights, airports, aircraft/engine types, manufacturers) merit rich purpose-built Inspectors; (2) supporting context (plants, designers, regulators, historical events) can be compact evidence-backed context or Inspectors when the particular relationship is aviation-significant; (3) peripheral facts (unrelated corporate/local/facility detail) generally remain citations or external references. Categories alone should not enforce absolute ceilings: relevance depends on the path and user's question. Presence in knowledge storage ≠ a prominent link ≠ a rich Inspector.

Guiding question: **Does following this relationship materially deepen understanding of the aviation subject or question that brought the user here?** Selectively promote meaningful branches, preserve source links for others, and resist automatic creation of deep generic pages. Avoid speculative algorithmic 'interestingness' scores until actual content and use cases are evaluated.


## Decision: no AI dependency or integration (2026-10-12)

Owner explicitly prefers **not to involve AI in DOAA-RR**. No AI in runtime, Inspector composition, ingestion, entity resolution, relevance ranking, enrichment or source interpretation. Use deterministic software, validated schemas, source-specific adapters and explicit evidence rules. Do not wire in an AI service, build AI abstractions prematurely, create AI-related configuration, or incur inference costs. Clean modular boundaries may permit an optional AI adapter *later*, but this is not a present feature or commitment; adding it requires a separate consequential design/authorization decision. The validated relational Inspector and on-demand record composition must function entirely without AI.


## Study 06: full Inspector destinations and datum-as-link (2026-10-12)

Study 06 relationship destinations are prototype stubs only. In the product, selecting a resolved entity opens its full subject-appropriate Inspector within the same continuous relational navigation context. Stub depth is not approved product depth.

The datum itself (manufacturer, engine designation, operator, registration, airport code, flight identity) is the navigation target. Avoid repeated 'Explore X' CTAs and unnecessary arrow glyphs. Preserve subtle discoverability, accessible semantic interactions, keyboard focus, mobile touch targets and clear non-linked states. Test visual affordance rather than automatically underlining everything. Direct SKY exit remains distinct from contextual Show in SKY.


## Explorable datum visual treatment (2026-10-12)

Owner explicitly rejects underlines on navigable data. Do not use repeated arrow glyphs or 'Explore' CTAs. Preferred direction is a **soft, context-sensitive text distinction**: e.g. cool charcoal versus near-black on light surfaces, or muted/light blue versus other text on darker surfaces, chosen to fit the local composition. Avoid a bright global hyperlink blue or visually noisy link chrome. Interactive names, registrations, codes and other data remain the actual tap targets. Colour alone must not carry all discoverability: use consistent placement/type treatment, generous touch areas, keyboard focus, hover/press feedback and accessible semantics. This is a design direction to test visually, not an approved exact palette or contrast ratio. Ensure non-explorable values do not falsely signal navigation.


## Study 07 feedback: quiet links validated except Movements (2026-10-12)

Owner finds the understated, non-underlined, arrow-free datum-link treatment effective overall. **MOVEMENTS is the one frame where navigability is less obvious.** Preserve the quiet treatment elsewhere; refine the movement-row information hierarchy and hit targets rather than restoring global Explore labels, arrows or underlines. Candidate for testing: main movement/flight identity or row body opens the dated flight occurrence, while individually tappable origin/destination airport codes open their Airport Inspectors. Dates, timestamps, evidence state and operational status should remain visually subordinate and not falsely appear navigable. Carefully manage nested targets and accessible keyboard semantics. This is a hypothesis to test, not yet an approved movement interaction rule.


## Study 08: Movements validated; chronology scrolling correction (2026-10-12)

Owner confirms Study 08 MOVEMENTS link and row interaction is working. Critical clarification: **infinite chronological scrolling should happen inside a bounded-height chronology frame, NOT by endlessly extending the entire Inspector page.** The Inspector remains a coherent vertically scrollable document with subsequent sections (e.g. BIOGRAPHY) at stable positions. MOVEMENTS and potentially other long histories have independently scrolling internal viewports that progressively load earlier/later records. Design nested wheel/touch gesture handoff, mobile affordance, keyboard/focus accessibility, loading/end/error states, source/evidence distinctions and bounded memory/DOM (virtualization or pagination) deliberately. Infinite scroll must not imply infinite known history; show reached-end and evidence gaps honestly. Preserve filter state and scroll position when navigating out and back where feasible. Study 08 row navigation is directionally validated; nested chronology scrolling itself is not yet tested.


## Bounded chronology: NOW focus gradient (2026-10-12)

Owner proposes distinguishing the present within the internally scrollable chronology using a graded row tint: strongest at the NOW period, half-strength in immediately adjacent rows, half again for next neighbours, fading into normal chronology. Interpret as **temporal focus gradient**, not a hard past/future divider. A NOW anchor must be grounded in actual current time and chronology semantics; do not falsely suggest an observed movement is happening now. Consider a dedicated time marker/period row when no movement coincides with the present. Gradient should support readability, accessibility, varying row heights, filtering, and moving scroll position; exact tint, strength, and whether emphasis follows NOW versus viewport focus remain to be tested in an interactive study. Preserve bounded internal scroll rather than page-length expansion.
