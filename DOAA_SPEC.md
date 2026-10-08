> **October 8 Field Notes design and UX decisions:** See [`FIELD_NOTES_DECISIONS_2026-10-08.md`](FIELD_NOTES_DECISIONS_2026-10-08.md). This is canonical agreed direction and defect inventory, not implemented/shipped status. Read alongside this specification and current code.

# DOAA — Canonical Product Specification & Development State

**Status:** Canonical working specification  
**Product:** David's Ottawa Aviation App (DOAA)  
**Design target:** David, an aviation nerd  
**Build constraint:** Conceived, written, and deployed in one day. At the end of the build it should be considered complete; later additions should arise from actual use, not a speculative roadmap.

This document is the ground truth for DOAA product intent, architecture, interaction rules, accepted decisions, current implementation state, and outstanding work. Update it when decisions change. Do not let implementation convenience silently redefine the product.

---

## 1. North Star

> **Open it and understand Ottawa's sky. Notice what's interesting. Understand what's affecting it.**

DOAA is not a flight tracker, weather app, NOTAM reader, aircraft database, and analytics package placed beside one another. Its unit of design is **the Ottawa aviation picture**.

"David's" describes the design target, not a recommendation algorithm. **The app learns the sky, not David.** Ignoring something repeatedly must not train DOAA to stop showing objectively noteworthy aviation.

Surface presentation should remain quiet. Drilldown can become extremely deep.

> **Quiet at the surface, gloriously nerdy underneath.**

---

## 2. Product Grammar

DOAA borrows established interaction grammar and aviation semantics rather than inventing replacements.

- **Semantics:** aviation.
- **Interaction grammar:** established HCI and aviation-display conventions.
- **Expression:** DOAA.

> **Grammar is inherited. Voice is ours.**

Do not dumb down standard aviation terminology when it can be taught in place. Tap an object to learn about that specific object. Use **ⓘ** to explain what that kind of thing or notation means.

No separate tutorial or "Learn Aviation" section is required. Education is contextual.

Every visible behavior should be traceable to aviation state, elapsed time, or human interaction. Avoid decorative randomness.

---

## 3. Primary Information Modes

### SKY

**Question:** Where is everything?

Sky is spatial truth and the primary/default DOAA surface. It shows live aircraft, trajectories, airports, operationally meaningful geographic context, and attention/visibility signals.

Sky also has temporal modes:

- **LIVE:** the current aviation picture.
- **REPLAY:** Sky with its clock detached from NOW.

### BOARD — Flight Board

**Question:** What's coming and going?

Board is the airport-centric inverse of Sky. It presents arrivals and departures for the selected/displayed airport using familiar airport/FIDS grammar, enriched with aviation-nerd information when resolved.

Candidate fields include:

- scheduled / estimated / actual time
- arrival or departure state
- origin / destination
- carrier
- flight number
- callsign
- registration/tail
- equipment/type
- runway when known or defensibly inferred
- gate where available
- live-acquired state

Board and Sky are bidirectionally linked. Tapping a live/resolved flight on Board should take David to that aircraft in Sky. An airport in Sky can open its Board.

### OPS

**Question:** What is the airport doing?

OPS synthesizes airport operation rather than merely listing raw data. Potential contents include runway/configuration, arrival/departure streams, holds, weather effects, traffic density, relevant NOTAM constraints, ground stops, and other operational conditions.

Inferences must be labeled honestly. Co-present evidence rather than inventing causality.

### PATTERNS

**Question:** What normally happens here?

Patterns is historical/local intelligence derived from accumulated observations and encounters. It may show traffic corridors, runway utilization, recurrent flights, aircraft/type/operator frequency, time-of-day behavior, local rarity, typical altitude bands, and historical traffic-density geometry.

Patterns becomes useful because DOAA remembers Ottawa, not because it profiles David.

### RACK

Rack is **not currently considered a separate primary view**. It is a persistent/collapsible Sky instrument: a textual/flight-strip representation of the contacts represented spatially on Sky.

In LIVE it summarizes current contacts. In REPLAY it also becomes the primary multi-selection surface for encounters.

### WINDOW / visibility

Window should not be a separate primary view. Balcony visibility, `VISIBLE`, `LOOK · BALCONY`, bearing/elevation and sightline geometry belong naturally to Sky.

---

## 4. Canonical Domain Model

The interface views are ways of looking at the aviation picture. The underlying objects are what DOAA actually knows.

### Physical Airframe

Persistent physical aircraft identity. It may contain:

- ICAO hex
- current registration/tail
- registration country
- manufacturer
- exact model/variant
- ICAO type
- serial/MSN / line number where available
- manufacture date
- first-flight date
- delivery date
- engine variant
- configuration where available
- fleet number
- current active/stored/retired state where reliable

Airframe biography must be able to go substantially deeper than ordinary flight-tracker identification.

### Identity and commercial relationships

Do **not** flatten these into a single "airline" field. They are distinct relationships and may disagree:

- registered owner
- beneficial owner where known
- lessor
- operator
- AOC/operator relationship
- marketing carrier
- operating carrier
- flight
- wet lease / ACMI relationship
- fleet assignment

Where obtainable, retain acquisition/delivery dates, previous owners/operators/lessors, previous registrations, and transfer history.

### Contact

The current observed state of an aircraft:

- position
- altitude
- track/heading as supplied
- groundspeed
- vertical rate
- callsign
- squawk
- timestamp
- current derived state such as climbing/descending/level, approaching/receding, likely flight phase

### Encounter

A particular appearance of an airframe in DOAA's observed aviation picture. An encounter belongs to the aircraft, not to the browser session or app process.

An encounter may contain:

- first/last observation time
- timestamped observations
- trajectory
- first observed position/range
- closest approach
- dwell time
- arrival/departure/overflight classification
- likely airports
- callsign/flight identity during encounter
- runway inference where defensible
- holding/orbit behavior
- notable events

Browser reload, device restart, frontend restart, and backend redeploy must not conceptually create a new encounter.

### Observation

Timestamped factual sample underpinning an encounter. Preserve enough source data to reconstruct trajectories and Replay without inventing positions.

### Flight

Scheduled/operated flight identity used by Board and reconciled against observed contacts/encounters. Scheduled flight and physical airframe are separate objects because tail assignment can change and operating/marketing relationships can differ.

### Airport

Persistent airport object with identity, geometry, runway data, current conditions and operational state/inferences.

### Provenance

Identity, biography, flight reconciliation and inference fields should retain provenance and confidence where applicable. DOAA must distinguish:

- **observed**
- **externally resolved**
- **remembered by DOAA**
- **inferred by DOAA**

Deep drilldown should make source/provenance inspectable. `Unknown` is preferable to unsupported certainty.

---

## 5. Investigator — Canonical Drilldown

The Investigator is one stable physical instrument with invariant primary navigation:

`CONTACT · FLIGHT · AIRCRAFT · MEDIA · ENCOUNTERS`

The current surface is highlighted in purple; the other surfaces remain cyan and in the same positions. Biography and provenance are not permanent primary tabs. Their information is retained and surfaced contextually under Aircraft/Encounters and where individual facts require provenance.

Semantic values inside Investigator are interactive. **Tap a value to follow/drill/search that object. Touch-and-hold a durable subject to favourite/unfavourite it.** This cell-level interaction belongs to Investigator only, never Rack.

### Contact level

DOAA needs progressive disclosure rather than one overloaded popup.

**Question:** What am I looking at right now?

First tap should prioritize:

- callsign / flight
- operator/carrier where resolved
- type and tail
- altitude / vertical state / groundspeed
- likely current phase / arrival / departure
- route/destination where resolved
- current encounter
- concise remembered signal such as `SEEN HERE 17×`

### Flight

**Question:** What journey/service is this contact operating?

Prioritize route, operating/marketing flight identity, operator/carrier, schedule, actual/estimated times, delay/status, codeshare and operational context. Do not use ambiguous “flight time” wording where scheduled/actual/elapsed is meant.

### Aircraft

**Question:** What is this machine?

Deeper drilldown exposes physical identity, manufacture, registration, owner/operator/lessor relationships, fleet identity, and provenance.

### Contextual biography / provenance

David should be able to pursue:

- ownership history
- operator history
- registration history
- lessor/lease status
- wet lease / ACMI relationships
- acquisition/delivery dates
- previous owner/operator and transfer history
- manufacture/first-flight/delivery dates
- MSN/line number
- engines
- configuration changes where obtainable
- notable service history where supported

### Encounters

Separate external aircraft biography from DOAA's own relationship with the airframe:

- first Ottawa sighting
- last sighting
- encounter count
- arrivals / departures / overflights
- recurring routes/callsigns
- typical local behavior
- previous encounter trajectories
- locally unusual appearances
- Replay entry points

### Airport drilldown

Current raw METAR-only-style airport card is insufficient as the final information hierarchy. Airport drilldown should eventually answer the operational picture first, while retaining raw aviation data beneath it. Candidate hierarchy:

- flight category
- wind
- likely runway/configuration, clearly labeled as inferred when appropriate
- arrival/departure traffic picture
- visibility/ceiling when operationally meaningful
- relevant operational constraints / NOTAMs when available
- raw METAR
- contextual ⓘ education

Exact final airport-card content remains to be decided before implementation.

---

## 6. LOOK — Explainable Attention

LOOK is not a separate view and not a personalization/recommendation engine. It is DOAA's explainable attention layer: **this is worth noticing now.**

Possible signals include:

- locally rare airframe/type/operator
- unusual military/government visitor
- exceptionally large/unusual aircraft
- unusual route or traffic pattern
- holding/orbit behavior
- exceptional squawk/state
- operationally interesting Ornge/medical movement
- unusually low/close contact
- visible from the balcony now
- familiar airframe behaving unusually
- unusual ownership/operator/lease identity, such as an ACMI aircraft operating a familiar flight
- first appearance under a new registration
- broader operational event affecting the Ottawa picture

Signals can combine. Interestingness is not synonymous with global rarity.

DOAA should be able to answer **why** something earned attention.

Example grammar:

`LOOK · BALCONY`

then aircraft identity and useful bearing/elevation/time-to-view information.

A noteworthy contact may use restrained amber attention. Emergency/exceptional states reserve red.

Ignoring/dismissing a LOOK event does not train DOAA to suppress similar future events.

---

## 7. Home Visibility / Balcony

The primary day-one observation position is **Balcony**. Living-room visibility is opportunistic and should not be treated as a common traffic view without evidence.

The balcony is modeled as an angular viewing sector minus a significant tower occlusion. Trees/distant buildings matter mainly at low elevation.

Exact home coordinates are private local configuration. They must not be hard-coded into public source or unnecessarily sent to external services.

DOAA can derive:

- distance/bearing from observation point
- approximate elevation
- geometric visibility
- balcony sector inclusion
- tower occlusion
- useful visible duration

`VISIBLE` means geometrically viewable. `LOOK` requires stronger interestingness/usefulness.

Human-place-first grammar is preferred, e.g. `LOOK · BALCONY`, followed by bearing/elevation/time.

Sightline calibration work established that the earlier phone elevation formula was unreliable; do not treat those erroneous elevation traces as canonical geometry.

---

## 8. Replay

> **Replay is SKY with its clock detached from NOW.**

Replay is a mode of Sky, not a separate primary view.

### Single encounter

Entry points include current contact card and DOAA History. Replay uses actual timestamped observations. The trail grows from recorded data. Do not fabricate intermediate/future route geometry.

Candidate playback speeds: `1× / 5× / 15× / 30× / 60×`.

### Multi-contact Replay

Multi-Replay belongs to Sky because Sky is where multiple encounters coexist.

When Sky enters Replay mode, Rack becomes an additive encounter-selection surface. Normal tap can retain drilldown semantics; established multi-select grammar such as long-press/selection mode may be used where appropriate.

Two related states:

- **Selected Replay:** emphasize a chosen set of encounters.
- **Replay Sky:** reconstruct all recorded traffic available for the selected interval.

Conceptually, `Replay Sky = selection: ALL`.

An encounter replay may offer `+ SURROUNDING TRAFFIC` to expand into the contemporaneous recorded aviation picture.

Persistent timestamped observations are required for meaningful Replay.

---

## 9. Data Extraction and Derived Knowledge

> **Acquire sparingly. Extract completely.**

### Lead-following and claim acceptance

> **Follow every lead. Preserve every supported claim. Forget neither knowledge nor uncertainty.**

Every stable identifier is a potential discovery key, including registration, ICAO24, callsign, ICAO type, operator code, MSN/serial and any previous registration subsequently discovered. A newly supported identifier should be eligible to generate further leads.

A factual claim may become canonical DOAA knowledge when one identifiable independent source directly supports that claim. Evidence attaches to the individual claim, not merely to the aircraft record. Search results, snippets and AI summaries are discovery mechanisms rather than sources of record: DOAA follows them to an underlying source before accepting a claim. Inference remains explicitly inferred and must not be promoted to sourced fact.

Conflicting supported claims are retained with provenance rather than silently overwritten. Failed leads are also durable state, with retry timing where appropriate, so DOAA does not repeatedly hammer a dead source.

Source acquisition must respect source terms. A useful page whose licence permits viewing only may be used as a human research lead but must not be automated, mirrored or treated as an application data feed. Prefer public APIs, government/open datasets, explicitly reusable sources and appropriately licensed media.

D1 is durable knowledge, not merely a response cache. The intended knowledge loop is:

`observation → identifiers → leads → claims → evidence → new identifiers/leads → durable dossier`


Once data crosses into DOAA, derive as much durable meaning from it as is defensible.

From ADS-B observations derive, where possible:

- distance/bearing from relevant reference
- approaching/receding
- climbing/descending/level
- rough flight phase
- trajectory
- holding/orbit-like behavior
- emergency squawk
- first/last observed
- dwell time
- behavior changes

Across encounters derive:

- first/last DOAA sighting
- sighting count
- typicality by airframe/type/operator
- recurring callsigns/flights
- usual corridors
- normal altitude bands
- local rarity

Relationships can derive:

- likely arrival/departure from track + airport geometry + altitude trend
- holding from repeated trajectory geometry
- runway-in-use confidence from actual traffic geometry + wind
- operational context from traffic + weather + NOTAM/state

Do not overclaim causal relationships.

---

## 10. Weather, NOTAMs and Aviation Language

Weather and NOTAMs are explanatory context, not standalone mini-apps.

Use real aviation language and notation. Raw METAR remains available. Explain terminology behind ⓘ rather than replacing standard notation with generic prose.

NOTAMs should be ruthlessly filtered to operational relevance when implemented.

Weather should emphasize aviation-significant information.

---

## 11. Visual System

The concept render is treated as a visual specification, not loose inspiration.

Core visual rules:

- near-black navy ground, not pure black
- recognizable Ottawa geography at low contrast
- cyan primarily belongs to map/instrument substrate
- hydrography can carry restrained cyan prominence
- ordinary live aircraft soft white / ice-grey
- selected aircraft crisp luminous white
- tracks white near the aircraft and receding toward blue-grey/cyan substrate with age
- amber means operational attention/interesting, not automatically danger
- red reserved for genuine exceptional/emergency/data-failure states
- restrained functional glow
- sparse intentional geographic labels
- major transport geometry only where useful
- small radii/hard geometry/thin rules/alignment rather than generic rounded-card UI
- clean grotesk/sans UI face plus mono/semi-mono technical face

> **The map is not the interface background. The map is the darkness from which the aviation picture emerges.**

Time has visual depth: now is brightest, recent recedes, known/history is dimmer.

> **Colour tells you what kind of information something is; luminance tells you how much attention it deserves.**

Selection should be expressed as attention: selected aircraft/track comes forward while unrelated traffic recedes.

The current OSM raster is a functional fallback, not the final cartographic target.

---

## 12. Ambient Sky

DOAA is intended to run on old tablets/phones as an ambient always-on instrument.

When dormant, Sky should take over almost the entire display. UI/text disappears unless worth saying. Aircraft simplify, trajectories recede, and actual aviation state creates the composition.

This is not a dashboard plus screensaver. LIVE and ambient are two states of the same instrument.

Rules:

- no ornamental animation
- sparse sky remains sparse
- current traffic gently influences viewport composition
- YOW is gravitational centre, not necessarily geometric centre
- movement is very slow and bounded
- if the user notices "the map is moving," it is overdone
- OLED protection should arise naturally from dark background, moving content, decaying trails and disappearing UI
- do not add clock/date/weather merely because ambient displays often do

---

## 13. Acquisition / Hosting Architecture

Current intended path:

`ADS-B provider → Render acquisition relay → Cloudflare Worker/cache → frontend`

GitHub is source control. Render exists because ADS-B providers blocked Cloudflare-origin acquisition. Cloudflare Worker hosts/serves API/UI behavior. Tablet is the ambient physical display.

ADS-B provider behavior observed during development:

- ADSB.lol: Cloudflare-origin requests rate-limited
- ADSB.fi: Cloudflare-origin requests forbidden; v3 works through Render relay
- ADSB One: Cloudflare-origin requests forbidden

The Render relay is therefore current acquisition plumbing rather than product surface.

### Live acquisition invariant

**The acquisition envelope follows the visible Sky, not YOW.**

Live View is a special YOW-centered configured catchment. Manual pan/zoom acquires the actual visible viewport, tiled into provider-compatible point/radius requests as needed. Overlapping cells are deduplicated.

If Sky shows Montréal, it should be capable of showing Montréal traffic rather than silently retaining an Ottawa-only worldview.

### Status truthfulness

In Live View:

`N AIRBORNE / YOW <configured catchment>` in cyan.

After manual pan/zoom:

`N AIRBORNE / VIEW <extent>` in purple.

`N AIRBORNE` should represent aircraft actually visible in the current viewport.

Acquisition catchment and viewport are distinct concepts.

---

## 14. Persistence / D1

**D1 is implemented as DOAA's durable knowledge and encounter layer.**

D1 currently persists entities, identifiers, claims/evidence, leads, encounters and timestamped observations. Render/Worker process memory remains ephemeral and must not be mistaken for canonical history.

D1 should become DOAA's canonical memory for the domain spine:

`Airframe → Encounter → Observations`

with associated Flight, Airport, identity/provenance and derived-local-knowledge records as appropriate.

Do not store every high-frequency raw packet forever merely because it exists. Preserve enough timestamped observation fidelity for truthful trajectories/Replay, while extracting durable encounter/local knowledge. High-resolution raw detail can age/compact where appropriate without destroying the historical facts Replay and Patterns need.

A small scheduled collector is desirable for **always-on memory** even when no tablet/browser is open:

`periodically acquire Ottawa picture → derive observations/encounters → persist → sleep`

Two tempos:

- **LIVE:** frequent updates while UI is active.
- **MEMORY:** scheduled snapshots when nobody is watching.

---


### Reconciled dossier rule

The target information path is:

`observe → acquire → investigate → reconcile → dossier → Rack + Investigator`

D1 is consulted before external acquisition. External sources should be queried for missing, stale or lead-driven knowledge, and supported results must be written back to D1. The browser should progressively become a renderer of reconciled dossiers rather than the long-term orchestration layer.

Physical airframe identity is ICAO24-first when available. Registration is a time-varying identifier and must not be allowed to silently redefine a physical airframe.

### OBV

**OBV** is DOAA's interpreted observation layer: a relationship or state DOAA has noticed from observations, encounters, flights or supported external knowledge. Raw timestamped ADS-B rows remain observations/track evidence and are not themselves OBVs.

OBV may express deterministic relationships (same airframe/new flight, turnaround, first/repeat encounter) or explicitly uncertain interpretations (possible positioning, medical, government or other mission context). Inference can create an investigation lead but may not silently become fact.

Rack epistemic shorthand: amber means a surfaced possibility; green means the claim has crossed DOAA's acceptance threshold. This shorthand belongs to Rack, not Sky. Sky remains spatially disciplined.

## 15. Tracks / Encounter Invariants

> **The track belongs to the aircraft, not the app.**

The past does not disappear; it recedes.

Track rendering principles:

- preserve encounter history rather than resetting on browser/app state
- no interpolation that invents positions
- current/recent trajectory strongest
- older tail recedes in luminance
- selected encounter can bring its full retained trajectory forward
- holding should remain visually legible as a racetrack/orbit
- scale-aware rendering should prevent distant/zoomed views from becoming spaghetti

Current target retention from the prototype has been approximately 90 minutes for current encounters and 30 minutes for recently absent contacts, but durable D1 history should supersede ephemeral retention as the source of truth.

---

## 16. Current Implemented / Committed State

### Durable memory and encounters

D1 is live in the codebase with entities, identifiers, sources, atomic claims, evidence, leads, encounters and timestamped observations. Live traffic is written to D1, and selecting a live contact explicitly persists the current observation before Encounters is rendered. `/memory/history` returns first/last seen, encounter/observation counts and recent encounters.

### Investigation and dossier refactor

The October refactor introduced the backend dossier boundary:

`observation → D1 → acquisition/investigation → reconciliation → dossier → Rack + Investigator`

Worker **encounter-tracks-9.0** adds `/api/dossier`. It starts from ICAO24, consults D1, resolves current flight/airframe data, persists supported results, invokes investigation, rereads memory, and returns identity, live state, flight, airframe, memory, history, media and initial OBVs as one reconciled package.

Investigation now resolves physical identity **ICAO24 first, registration second**. This is an important correction, but registration history is not yet fully temporalized and the identifier uniqueness behavior still needs repair so historical airframe/registration associations cannot be erased.

Frontend enrichment **5.1** consumes the dossier endpoint for Rack enrichment and Investigator instead of independently orchestrating the entire memory → flight → airframe → ingest → investigate → reread sequence.

### Investigator

The visible primary surfaces are now `CONTACT · FLIGHT · AIRCRAFT · MEDIA · ENCOUNTERS`, with stable navigation intended across every surface. The presentation is moving from boxed spreadsheet cells toward a technical-data-plate grammar: strong grouping, aligned facts, subtle rules and progressive hierarchy without deleting known information.

Deterministic E295 → Embraer E195-E2 enrichment has been added. Other type mappings and presentation normalization remain incomplete.

### Rack

UI **sky-8.1** introduces the denser two-line Rack strip architecture, fixed operator-logo slot with neutral aircraft fallback, a quiet metadata rail, dossier-backed enrichment and a universal search control. Rack remains read-only except for strip selection: tapping a strip opens the represented object in Investigator.

D1 `/memory/search` searches entities, identifiers and claims rather than only currently visible traffic. Search mode replaces Nearby Aircraft rows and clearing it returns to the live Rack.

The metadata rail has structural support for exact-airframe media, prior history, favourite match, unusual state and `◇ OBV`. Do not treat every structural hook as fully implemented data logic.

### Initial OBV implementation

The dossier currently emits deliberately conservative OBVs derived from DOAA's own memory, including repeat visitor and same-airframe/new-callsign relationships. These are first implementation steps, not the final OBV engine. Mission labels such as ferry, positioning, medical, government or military must not be inferred as fact without adequate support.

### Media

Media remains **unresolved and unverified**. Wikimedia Commons discovery, persistence and dossier fields exist, but repeated live tests have failed to show aircraft media. Do not call Media fixed until an actual live aircraft image is observed through the deployed application. The dossier boundary should now be used to determine whether failure occurs at discovery, D1 persistence, reconciliation or rendering rather than adding speculative Commons heuristics.

### Deployment truth

These versions describe repository state, not automatically verified Cloudflare deployment state. GitHub commits must not be described as live until the deployed Worker/UI is observed.

Recent refactor commits:

- `2c41de2` — dense Rack/dossier surface and universal search UI
- `ad081fd4` — Investigator 5.0 navigation/data-plate refactor
- `dfb35b9` — universal D1 search
- `439f653` — canonical dossier/OBV/Rack/favourite specification
- `4e15c25` — Worker 9.0 reconciled dossier and ICAO24-first investigation
- `f203dac` — enrichment 5.1 consumes reconciled dossier
- `96c12cd` — initial OBV signal in Rack metadata rail

Do not assume GitHub commits automatically deploy Cloudflare/Render. Verify the live build before debugging UI behavior against repository-only changes.

---

## 17. Outstanding Repair Batch

These are accepted defects/regressions, not speculative features.

### Restore catchment selection

The native 7.4 rewrite dropped the prior tappable catchment selector. Restore selectable steps:

`10 / 20 / 30 / 40 / 45 / 50 / 60 / 70 / 80 NM`

Selecting a catchment should set the configured Live View radius and return/reset to Live View. Live View should restore the selected catchment.

### Progressive, partial-failure-tolerant viewport acquisition

Current multi-cell acquisition can treat one failed/slow cell as failure of the whole view. Repair so that:

- existing useful picture is not immediately blanked while a new viewport acquires
- acquisition state is explicit (`ACQUIRING VIEW…` or equivalent)
- successful cells populate even if another cell fails
- partial success is represented honestly
- `DATA LINK UNAVAILABLE` appears only when the required acquisition genuinely provides no useful data
- stale/previous data is not presented as if it were authoritative current coverage
- late responses from an older viewport cannot overwrite a newer viewport
- pan/zoom acquisition is debounced
- concurrency is bounded if necessary to protect provider/relay stability

`Promise.allSettled` or equivalent per-cell handling is preferable to all-or-nothing `Promise.all` behavior.

### Track temporal fade

Tracks currently need stronger fading toward the older tail. Preserve history; change luminance/alpha, not historical truth. Recent path near aircraft remains crisp; older trajectory should recede faster.

### LIVE VIEW positioning

When Rack collapses, **LIVE VIEW** currently remains stuck at the expanded-Rack vertical position. Its bottom offset (and related attribution/control positioning where applicable) should follow the Rack's actual current top edge and drop toward the bottom with the collapsed Rack.

### Airport card hierarchy

Current airport card proves drilldown mechanics but is not yet considered product-complete. Discuss/finalize David-useful operational hierarchy before adding more fields.

### Track hit-testing for absent encounters

Visible recent encounter tracks should eventually remain tappable even after the current contact disappears. Current implementation may require a live aircraft record to resolve the track selection. Preserve enough last-known encounter/airframe metadata to open meaningful drilldown from historical/recent tracks.

---

## 18. Rack — Canonical Content and Interaction

Rack is the high-density operational index to Sky and a read-only navigation surface. A strip is one touch target: tapping it opens the represented object in Investigator. There is no cell tapping or touch-and-hold interaction in Rack.

Rack strips should progressively project the reconciled dossier: operator logo (or a neutral aircraft icon occupying the same fixed slot), flight/callsign, operator, route, model/type and registration, altitude/vertical state/groundspeed, operational timing/state and compact DOAA signals. The target grammar is approximately two dense lines rather than raw telemetry-only rows.

A quiet lower-right metadata rail may indicate: exact-airframe photo, prior DOAA encounter history, favourite match and unusual current state. OBV is distinct from unusual state: OBV means DOAA noticed an interesting relationship/fact; unusual state means current operation is anomalous/noteworthy.

Favourites are explicit watched subjects, not behavioral personalization. A favourite may target a physical airframe, model, manufacturer, carrier/operator, route or other stable subject. Creation/removal occurs by touch-and-hold on a semantic value in Investigator, not in Rack. Rack only reflects a favourite match.

Rack header includes a right-aligned universal search control. Search replaces nearby rows with results from everything DOAA knows, including ICAO24, registration, callsign/flight, model/type, manufacturer, operator/carrier and other stored claims. Clearing search restores Nearby Aircraft. Search is D1-backed, not limited to currently visible traffic.

In Replay, Rack remains the multi-encounter selection instrument.

## 19. Flight Board — Accepted, Not Yet Implemented

Board is an accepted primary view.

It should support selecting/displaying an airport's arrivals and departures, with conventional board grammar plus resolved aviation detail. A Board flight that is currently acquired should connect directly to the physical contact in Sky.

This requires a Flight data source and reconciliation layer that has not yet been selected/implemented. Do not fabricate schedule/assignment information from ADS-B alone.

---

## 20. OPS / PATTERNS — Accepted Concepts, Not Yet Implemented

OPS and Patterns currently earn conceptual existence but exact screen design/content remains open.

Do not implement them merely to fill navigation. Each should exist only insofar as it answers its distinct question better than Sky/Board/drilldown can.

---

## 21. Comms

Ordinary civil aviation around Ottawa primarily uses VHF AM aviation band. A phone/laptop cannot become a general aviation-band SDR without suitable RF hardware.

Live ATC transcription is not a day-one dependency. No reliable clean Ottawa text transcript source has been established. Published frequencies can be useful contextual data. Live audio/transcription should only be added if a legitimate, technically clean source is available and Canadian legal/rebroadcast constraints are respected.

DOAA should not become a scanner app.

---

## 22. Privacy / Repository History

Current frontend should not expose a HOME marker or hard-code exact home coordinates. Acquisition can be centered on public aviation geometry such as YOW or the visible viewport.

**Known unresolved issue:** older Git history contains exact/near-exact home coordinates from earlier prototypes. Cleaning the current file does not clean Git history. This remains a repository/privacy task. Options include making source private, rewriting history, or moving to a fresh clean repository. Do not claim historical exposure has been removed until it actually has.

Never repeat exact home coordinates in documentation or UI.

---

## 23. One-Day Discipline

DOAA is not a roadmap product. Build the coherent instrument David can use today.

Accepted principles:

- technical debt is acceptable when bounded and understood
- architectural mistakes that destroy product truth are not
- avoid speculative feature accumulation
- later additions should arise from actual David usage (`I wish it did X`)
- do not sacrifice coherent data capture now if doing so would make accepted core functions such as history, local knowledge, or Replay impossible

When choosing between polish and preserving the correct domain model, preserve the model.

---

## 24. Next Work / Outstanding Product Work

The broad refactor pass is complete enough to stop redesigning in abstraction. Next work should be driven by the deployed build and concrete defects while preserving these already accepted items.

### Immediate validation and repair

1. **Verify deployment/builds.** Confirm Worker 9.0, enrichment 5.1 and UI sky-8.1 are actually live before interpreting screenshots or runtime failures.
2. **Exercise the dossier boundary with real Ottawa contacts.** Confirm Rack and Investigator agree on flight, airframe, registration/type/operator and history, and that known data does not disappear during asynchronous enrichment.
3. **Diagnose Media end-to-end.** Inspect the returned dossier and each boundary: Commons discovery → investigation result → D1 `photo_*` claims/evidence → reconciled `media` object → renderer. Do not add another search heuristic until the failing boundary is known.
4. **Repair temporal identity semantics.** ICAO24-first lookup is implemented, but registration remains time-varying. Replace identifier reassignment behavior with a model that preserves historical registration-to-airframe associations and supported conflicts.
5. **Normalize presentation data.** Expand deterministic ICAO type mappings beyond the current small dictionary; normalize country/state values such as `CA → CANADA`; remove raw source suffixes such as `pax`; prevent manufacturer/model duplication; calculate approximate age from year rather than trusting stale age fields.
6. **Complete stable Investigator navigation.** Verify every surface displays the same five primary tabs with the active surface purple. Remove any remaining legacy Bio/Evidence navigation paths from visible UI without deleting their information.
7. **Propagate semantic status colour.** Flight status already uses green/amber/red; Contact and later Board must use the same semantic state rather than rendering delay text as ordinary white.

### Dossier / Investigator evolution

8. Continue moving acquisition/investigation decisions behind the dossier boundary. The browser should eventually ask for a dossier and render it, not decide which source to query or which fact wins.
9. Follow D1 leads systematically rather than treating `/api/investigate` as a Media-only routine. Query the world only for missing, stale or unresolved lead-driven knowledge, then persist the result or durable retry/dead state.
10. Preserve claim-level provenance and conflicts in reconciliation. One identifiable independent source is sufficient to accept a factual claim; inference remains inference.
11. Implement semantic Investigator values: tap follows/drills/searches the represented object; touch-and-hold favourites/unfavourites durable subjects.
12. Implement generic favourites as watched subjects rather than an airframe-only table. Initial subject types: physical airframe, model, manufacturer, carrier/operator and route. Favourite state must never suppress or behaviorally personalize unrelated aviation information.

### OBV / classification

13. Give OBV a durable first-class representation distinct from raw ADS-B observations. Initial deterministic families should include first/repeat encounter, same airframe/new flight or callsign, and defensible turnaround relationships.
14. Let OBVs create investigation leads. If later independent evidence supports an explanation such as positioning/ferry/charter, enrich the OBV rather than retroactively pretending the original inference was fact.
15. Add mission/operation classification carefully: `COM`, `GA`, `CGO`, `GOV`, `MIL`, `MED`, `CHTR`, `POS`, `UNK` as useful vocabulary, allowing combinations where appropriate. Distinguish aircraft/operator classification from the current mission.
16. Rack epistemic grammar remains simple: nothing = insufficient basis; amber/question mark = surfaced possibility; green/no question mark = accepted knowledge. Do not put these badges on Sky.
17. Distinguish `◇ OBV` from `ϟ`: OBV is an interesting relationship/fact; lightning is an unusual current operational state.

### Rack

18. Refine the new two-line strip against real traffic rather than adding more boxes. Adaptive emphasis: inbound prioritizes ETA/delay; outbound departure/elapsed; overflight route; GA registration/type; unresolved special traffic only what is actually known.
19. Exact-airframe photo icon appears only for exact-airframe media. History icon should ideally mean history predating the current encounter, not merely that the current encounter has already produced observations. Heart means at least one explicit favourite match.
20. Universal search should expand from raw D1 value matching into relationship-aware retrieval: route, operator/carrier relationships, classification, favourites and historical encounters. Search results use the same Rack grammar and open the same Investigator.
21. Keep Rack a single-target navigation surface. No cell taps, long-press actions or hidden micro-controls inside strips.

### Existing accepted product work

22. **Board:** implement the accepted airport/FIDS view with flight reconciliation and direct Sky linkage.
23. **OPS:** settle and implement the airport operational synthesis only when it answers its distinct question better than raw airport data.
24. **Patterns:** derive local/historical intelligence from D1 once sufficient observation history exists.
25. **LOOK:** build explainable attention from OBV, rarity, visibility and operational state without behavioral suppression or opaque recommendation logic.
26. **Airport cards:** replace raw-METAR-first hierarchy with the agreed operational picture while retaining raw aviation data beneath it.
27. **Replay:** wire actual D1 timestamped observations into single- and multi-contact Sky Replay. Never interpolate invented historical positions.
28. **Always-on memory:** add the small scheduled collector so D1 continues learning Ottawa when no browser/tablet is open.
29. **Repair batch from Section 17 remains active:** catchment selection, partial-failure-tolerant viewport acquisition, stronger temporal track fade, Live View positioning with collapsed Rack, and hit-testing/retrieval for absent recent encounters.
30. **Privacy/repository history:** historical source still contains exact/near-exact home coordinates. Resolve by appropriate repository/history strategy; current-file cleanup alone is not sufficient.

### Stop condition

After the deployed dossier/Rack/Investigator refactor is validated and concrete defects above are repaired, stop broad refactoring. Let David use DOAA. Subsequent additions should come from actual use unless required to complete an already accepted core function.

---

## 24A. Canonical implementation handoff

For a new implementation thread, recover state in this order: read this specification; inspect recent commits on the active branch; treat code/Git history as authoritative for what is actually implemented; then continue the current path in a meaningful autonomous tranche. Do not make Brent act as a next-commit button.

**Active branch:** `explainer-wiring`.

**Current execution path:** Foundation (data/concurrency + Replay-safe observations; responsive composition; Investigator semantics/ⓘ) → World/Knowledge Plumbing (object graph; federated Search; Airframe Journey) → larger synthetic QA/deployment gate → Time (Replay engine; Replay presentation; Aviation Nerd pass; Why/Curiosity).

**Current frontier:** Investigator interaction repair after device feedback. Persistent card chrome is merged, and the next regression is contextual ⓘ controls that rendered without functional click wiring. Branch `explainer-wiring` converts enriched fact glyphs from decorative spans into semantic buttons carrying their explanation payload, uses delegated click handling so async/dynamic Investigator renders work without per-render rewiring, and retains the existing contextual explainer system for native DOAA fields. Builds are sky-12.0 / enrichment-8.8. CI guards both native and dynamic explainer interaction contracts. Immediate gate is CI/Preview/review then merge/deploy for device validation.

Before the QA gate: complete the whole-codebase invariant sweep, including acquisition/cache/UI contracts; execute real syntax/runtime validation rather than source inspection alone; verify historical trace/route/airport adapters against real payloads; resolve live D1 migration compatibility/state hazards (especially the evolved 0004 migration); then make one coherent deployment and run the larger synthetic browser QA. Do not begin Replay until this baseline is trustworthy.

**Encounter invariant:** an Encounter exists only because DOAA independently observed that physical aircraft in the configured observation area. Search, Investigator, historical research, route/media lookup and external knowledge must never create or increment one.

**Deployment:** the feature branch may intentionally be ahead of production. Do not deploy merely to make branch changes visible. At the larger gate, make the branch deployable coherently, verify migrations/live build, then synthetic-test desktop, phone portrait, short landscape, tablet/split-screen, state/reload, Search/Home/catchment, Sky/Rack/Investigator, navigation, runtime/network failures and Encounter integrity.

Cloudflare Preview builds now require explicit preview resource bindings when production D1 is configured. Production build failures observed on the Foundation PR were preview-configuration failures, not DOAA runtime failures. `wrangler.jsonc` now binds Preview `DB` to the isolated `doaa-memory-preview` D1 database (`939eda3b-4894-497b-9f67-209771761b3f`); production remains bound to `doaa-memory` (`434f90d3-397b-48d3-8249-4c48cf1e8936`). Never point Preview at production D1. The preview database still needs the migration chain applied before D1-dependent preview runtime tests can be considered valid. Production Foundation deployment/schema verification remains the release frontier.

Update this handoff at every meaningful implementation checkpoint and whenever the frontier, invariant set, deployment state or release stage changes. This repository document is canonical project/development truth and must not lag the implementation. Keep it concise rather than turning it into a commit diary.

---

## 25. Build Test

For every addition, ask:

1. Does it help David understand the aviation picture?
2. Is this aviation truth, DOAA inference, or decoration?
3. Are we solving expression, or unnecessarily reinventing interaction grammar?
4. Does the information belong on the surface, in Rack, or deeper in drilldown?
5. Are we preserving provenance and uncertainty?
6. Are we learning the sky rather than profiling David?
7. Does this preserve the one-day product's coherence?

If the answer is unclear, do not add another widget merely because the data exists.

## Board — canonical live definition (2026-10-06)

BOARD is not a filtered version of the Sky catchment. It is an airport-centric live movement view. It shows flights currently airborne where **YOW is either the departure airport or the arrival airport**, regardless of whether the aircraft is inside Sky's geographic ADS-B catchment. BOARD therefore acquires its own YOW flight set from the flight-data source and must not depend on Rack hydration or the current Sky aircraft array. Completed/landed, cancelled, and merely scheduled/not-yet-airborne flights are excluded when source status supports that distinction. SKY remains spatial truth; BOARD is airport/FIDS grammar for the currently airborne YOW movement picture.
