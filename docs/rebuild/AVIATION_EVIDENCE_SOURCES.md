# Aviation evidence source landscape — exploration brief

Status: **candidate architecture, not approved providers or implemented ingestion**. 2026-10-12.

## Objective
DOAA-RR should discover, preserve, reconcile and present aviation evidence beyond live position feeds. Acquisition, evidence interpretation and presentation must be independently evolvable. SKY, BOARD and Inspector consume shared, provenance-aware evidence, not independent truth stores.

## Open-ended source discovery (not an exhaustive taxonomy)
The families below are illustrative starting points, **never a closed integration catalogue or ceiling on inquiry**. Source discovery must expand according to the evidence needed to build comprehensive, temporally accurate pictures of aircraft, flights, airports, operators, routes, infrastructure, people, organizations, events and observations. Consider manufacturers, lessors, maintenance organizations, airport authorities, corporate disclosures, scholarly literature, technical manuals, satellite observations, enthusiast records, specialist archives, photographic collections and newly emerging datasets whenever relevant. Distinguish discoverability from permission to ingest, redistribute or rely upon material.

## Candidate source families (evaluate licensing, availability, quotas and trust before integration)
| Family | Candidate examples | Evidence and limitations |
| --- | --- | --- |
| Surveillance | Existing ADS-B/Mode S/MLAT providers, provider relay | Observed positions and timestamps; coverage, accuracy and provenance vary. |
| Airlines and operators | Official timetables, route maps, fleet publications, press releases | Planned service, published fleet and claims; not proof a flight operated or a particular aircraft flew it. |
| Collaborative knowledge | Wikidata, Wikipedia, Wikimedia Commons | Context, identities, historical and visual references; verify assertions and attribution/licensing. |
| Open geographic data | OpenStreetMap/Overpass, OpenAIP and eligible aeronautical open datasets | Airports, runways, geography and airspace; verify update cycle, coverage, licensing and suitability for navigation. |
| Government/institutional | Transport Canada aircraft registry, NAV CANADA publications where permitted, FAA and other state registries, aviation statistics | Jurisdiction-specific regulatory records and operational publications; temporal validity and reuse restrictions differ. |
| Weather/operational | METAR/TAF, NOTAMs, official airport notices | Time-bounded weather and advisories, not aircraft movement evidence. |
| Historical/reference | Aircraft type and production records, accident/incident investigations, archival collections | Historical context; do not silently attach contemporary identities to old observations. |
| Community datasets | Open aviation datasets, research repositories, volunteer-maintained airport/type tables | Useful complementary coverage; variable quality, rights and update cadence. |

## Question-led source expansion
Begin with a subject and the questions that remain unanswered; identify missing evidence, then search beyond known providers and source categories. Maintain a continuously extensible source registry with coverage, jurisdiction, subject, temporal scope, access method, provenance, rights, freshness, reliability, cost and limitations. Preserve dissenting and negative evidence, and identify gaps rather than silently filling them. Source breadth must not collapse distinct identities or imply unwarranted certainty. Separate research-time discovery from automated recurring ingestion; the latter requires explicit operational and cost assessment.

## Evidence model requirements
Each acquired claim should retain source/provider, source URL or dataset identifier, retrieval time, asserted/observed time, validity interval where applicable, license/attribution, raw payload or durable reference, transformation version, confidence/quality flags and conflicts. Keep source claims distinct from resolved entity identity. UNKNOWN is not zero; scheduled is not observed; inferred is not verified. Avoid retroactive identity assignments.

## Acquisition policy questions
- Inventory existing providers and pipeline contracts before proposing replacements.
- Separate navigation from network acquisition: panning SKY should not imply unbounded provider requests.
- Prefer shared caches, selective refresh and durable reference datasets to repeated retrieval.
- Compare official, collaborative, geographic and historical evidence before settling on UNKNOWN.
- Audit free-tier quotas, rate limits, terms, licensing, attribution and storage costs before any hosted integration.
- Never bypass access controls, scrape prohibited material, or incur incremental cost without explicit authorization.

## Next investigation
1. Inventory the current Worker/Render relay provider sequence, normalization, caching, quota protection and persistence.
2. Build a source register with rights, freshness, entity coverage, access method, marginal cost and known reliability for each candidate.
3. Prototype one low-cost complementary enrichment path against real existing observations, preserving provenance, without modifying production.
4. Review identity reconciliation and source-conflict UI in Inspector before allowing enrichment claims to appear as fact.

## Existing acquisition boundary audit (2026-10-12)
Inspected `src/worker.js`, `relay.js`, `index.html` and standalone SKY harness on `rebuild/experience-v2`.
- Worker `/api/traffic` passes through `gate(request, env)` before dispatch. Its `access-control-allow-origin: *` response header **does not remove authentication**. The Render-hosted static SKY harness cannot assume cross-origin anonymous access. Do not weaken production auth, expose tokens or create a new proxy merely for the preview.
- Worker requests the existing Render relay, which has ordered free-source fallbacks ADSB.FI, ADSB.ONE and ADSB.LOL. Worker has geographic cell caching (fresh 25s, stale 300s), inflight coordination, source observation timestamp validation and optional historical checkpointing. The legacy frontend polls approximately every 30 seconds and uses scout + viewport cells; this behavior is **not** a DOAA-RR acquisition policy.
- Worker supplies `_doaa_observed_at` derived from per-aircraft `seen_pos`/`seen` where present. A batch timestamp alone is insufficient to claim a current aircraft position. The standalone `sky-observations.js` adapter now requires individual timestamps and rejects stale/missing evidence. Focused regression tests are committed but execution remains unverified.
- The standalone review page is static on the existing Render review service. It currently has no live acquisition or authenticated session integration; do not label the absence of a feed as zero aircraft.

### Preferred next integration decision
Reuse the authenticated Worker as the acquisition boundary when DOAA-RR has a proper authenticated host; evaluate a *read-only, explicit opt-in* development fixture or secure same-origin preview route only if genuinely necessary for visual acceptance. Assess rate/quota effects before live requests. In parallel, develop provider-independent evidence enrichment against safely captured, real observations. No production changes, new hosted services or paid consumption authorized by this audit.
