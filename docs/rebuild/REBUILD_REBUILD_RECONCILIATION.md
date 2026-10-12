# Rebuild Rebuild · Inherited contracts and decision reconciliation

Updated 2026-10-12. Applies to `rebuild/experience-v2` (“Rebuild Rebuild”). The branch inherits the Field Notes rebuild files and source history. **Preserve original historical decisions and documents as evidence; use this document to resolve conflicts.** This is a contract reconciliation, not a claim that the inherited implementation works.

## Reading order / authority
1. `EXPERIENCE_V2.md`: current V2 product, Inspector interaction and visual/HMI direction.
2. `RELATIONAL_EPISTEMOLOGY_CONTRACT.md`: investigation, derivation, provenance and epistemic presentation.
3. This reconciliation: what carries forward and what is superseded.
4. `DATA_AND_SECURITY_CONTRACT.md`: inherited canonical security, identity, historical truth and source boundaries except where expressly extended.
5. `ENGINEERING_RELEASE_CONTRACT.md`: inherited infrastructure, test, cost and release protections; replace conflicting navigation/first-slice prescriptions.
6. `PRODUCT_UX_CONTRACT.md`, `UNDERSTANDING_AND_REUSE_REGISTER.md`, `FIELD_NOTES_DECISIONS_2026-10-08.md`, `DOAA_SPEC.md`, `DEV_LOG.md` and other historic decisions: retained as design/history/reuse evidence, **not automatically controlling where newer V2 direction differs**.

## Inherited requirements that still apply

**Purpose and quality:** Ottawa aviation observation/investigation instrument, primarily for David; coherent information-rich, sophisticated, restrained, accessible, mobile and desktop. Real loading, error, empty and stale states; no fabricated data or decorative dead controls.

**SKY:** actual observed aircraft, directional half-arrow symbology rather than silhouettes on the map, true map orientation, range/bearing, sourced freshness/degradation, identity-consistent 60-minute fading trails, no invented motion, sensible follow/pan/zoom and reduced-motion handling. SKY map symbology and photo-led Inspector hero are different contexts and do not conflict.

**BOARD / Airport Movements:** one canonical movement model, chronological airport-local presentation, published vs observed vs inferred distinction, timezone/date precision, consistent shared evidence and honest coverage gaps. A BOARD flight number is a lead for investigation, not proof of a dated operation.

**Evidence:** D1 claims, identifiers, entities, evidence, observations, encounters, history, timestamps and source provenance preserved. DOAA Sighting/Encounter means a recorded electronic observation, not a flight or an inferred archive movement. Avoid identity drift, false adjacency, invented journey or retrospective registration assignment. Preserve source and observation time, conflicting evidence, null/zero distinctions and time validity. AirLabs optional and budgeted, not required for usefulness.

**Accounts/privacy:** explicit username/password, no public self-registration, persistent revocable sessions, explicit logout, administrator-managed accounts, private user-specific collections, server-side authorization, secure cookies and credential storage, isolation tests. Google OAuth is superseded by the newer password decision. Production data/migrations protected.

**Other surfaces:** LOOK, AMBIENT SKY and SLIDES, search/history, runway/weather, media rights and attribution remain scoped requirements for subsequent implementation; not silently discarded because the first lab focuses on Contact.

**Engineering:** modular separation of acquisition, evidence/domain, persistence, state, map, movements, Inspector and accounts; zero incremental cost, quota/rate-limit discipline, no unnecessary GitHub Actions; isolated D1/preview, migration and asset verification, real authenticated viewport/keyboard/mobile tests, deployment truthfulness and explicit release gates. Inherited static asset routing and authentication/migration concerns remain unresolved until measured.

**Visual assets and interaction basics:** deliberate Field Notes-inspired light/graphite/blue palette, semantic tokens, accessible focus, practical touch targets, source-specific media, no generic cards everywhere. The newer editorial/photo-led examples are now acceptance references and may require updating inherited Field Notes details.

## Superseded or reopened for V2

| Inherited rule or assumption | V2 disposition |
| --- | --- |
| Flight / Airframe / Airport mandatory tab inventories (historic Decisions 176/177) | **Superseded as mandatory Inspector navigation** by single relational focus and content-linked exploration. Preserve their useful *content domains*; compose without imposed tabs. |
| Persistent Back stack, breadcrumb/return history, “Back to SKY” | **Superseded as visible/default interaction.** Explore without Back; discreet Close. Preserve workspace state on dismissal. BOARD-origin return remains to be tested. |
| Dedicated Explore links/cards and contextual subject-navigation buttons | **Not required; do not force.** Objects embedded in content navigate naturally. Discreet depth chevrons only where otherwise non-obvious. |
| One subject with fixed Contact/Flight/Airframe perspectives | **Reframed.** One Inspector focus at a time, but many related objects in each composition; CONTACT is wide-aperture observation context. |
| Unmarked facts inert / ↗ on every cross-object navigation | **Refined.** Self-evident linked objects may be visually unmarked; arrows convey non-obvious depth. Non-linked properties remain inert. |
| Unknown route/times/progress when preferred provider lacks a value | **Superseded as stopping condition.** Bounded multi-source retrieval, derivation and calibrated inference before genuinely unavailable. No invented facts. |
| Immediate implementation of SKY → Contact → Back slice | **Superseded in sequencing.** First design/interaction lab with reusable real components; separate source-capability audit; then integrate/verify. |
| Prior V2 spec's explicit back stack, Explore cards, first deployment gate | **Superseded by revised `EXPERIENCE_V2.md`.** |
| Exact animation, optional recovery mechanism, BOARD dismissal destination | **Open design questions.** No premature commitment. |

## What remains to inspect rather than assume

- Whether inherited provider/source lists and contracts fully describe current implementation and legal/rate-limit access.
- Why BOARD times are absent despite flight identifiers and what fields BOARD actually receives.
- Why route+position fail to produce a geographic progress estimate; whether it is missing geometry, association, derivation or rendering.
- Which pure calculations, source adapters, media pipelines and tests are trustworthy enough to reuse unchanged.
- Whether prior “locked” layout or typography rules still serve the approved new reference compositions; visual tests will decide.

## Definition of the next gate

Create a tangible shared Design Lab with the actual reusable Inspector components and realistic *explicitly fictional* fixtures. Validate Contact → Flight → Airport → related object and Contact → Airframe, without a mandatory Back UI; ensure a discreet Close, accessibility, beautiful responsive presentation and intelligible known/inferred/unavailable states. In parallel, trace real enrichment and derivation paths. Record decisions and measured outcomes here before implementation.

Status: **documentation reconciled, not implementation or visual design approved**. No production or infrastructure changes authorized.
