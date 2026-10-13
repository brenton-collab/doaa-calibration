# Aviation evidence source landscape — exploration brief

Status: **candidate architecture, not approved providers or implemented ingestion**. 2026-10-12.

## Objective
DOAA-RR should discover, preserve, reconcile and present aviation evidence beyond live position feeds. Acquisition, evidence interpretation and presentation must be independently evolvable. SKY, BOARD and Inspector consume shared, provenance-aware evidence, not independent truth stores.

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
