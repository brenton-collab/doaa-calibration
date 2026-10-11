# DOAA code-to-spec reconciliation — 2026-10-11

**Basis:** Read current branch source `index.html`, `flight-enrichment.js`, `look.js`, `ambient.js`, `src/worker.js`, `DOAA_SPEC.md`, `FIELD_NOTES_DECISIONS_2026-10-08.md`, Work's browser harness and evidence ledger. This is a source-backed gap inventory, not a claim of production verification.

## Status legend
- **Implemented / synthetic-tested**: code exists; Work reports isolated Chromium/fixture checks.
- **Partial**: a useful portion exists, but canonical experience is not delivered.
- **Missing**: no corresponding application mode or substantial implementation identified in reviewed frontend/Worker.
- **Unverified**: requires live providers, real D1, physical devices or deployed runtime.

## Feature-to-code matrix

| Canonical feature | Evidence in branch | Assessment | Next acceptance gate |
|---|---|---|---|
| SKY map, contact markers, freshness and tracks | `index.html` traffic/normalization/merge, presentation tick, rack, map | Implemented / synthetic-tested | Real provider variants, live maps, prolonged outage |
| BOARD movement register | `index.html` board fetch/classification, Inspector navigation | Implemented / synthetic-tested | Live feed classification and provider outages |
| LOOK attention cues | `look.js`, shared `DOAALiveSnapshot` | Implemented / synthetic-tested | Real observation diversity and cue calibration |
| Contact/flight/airframe/airport Investigator | `flight-enrichment.js`, `index.html` Inspector | Partial to implemented / synthetic-tested | Dossier reconciliation against live provider and D1 |
| AMBIENT SKY | `ambient.js`, `ambient.css` | Implemented / synthetic-tested | Physical tablet, resize, burn-in and observation cadence |
| AMBIENT SLIDES | `ambient.js`, `ambient-media.js`, Worker media endpoint | Implemented / synthetic-tested | Licensed real exact-airframe photos, cache/attribution and prolonged rotation |
| Encounter / observation memory | `src/worker.js` and enrichment endpoints | Partial / unverified end-to-end | Production-safe D1 read-only verification, then explicitly approved writes if needed |
| RACK | `index.html`, cached enrichment and freshness | Implemented / synthetic-tested | Mobile ergonomics and real mixed-source identities |
| Field Notes Light/Dark/System | Current `index.html` CSS is dark-only; no theme preference UI identified | **Missing** | Design tokens, persist preference, contrast, equivalent map comparison |
| Global distance/speed/altitude units | No preference or cross-surface conversion identified in reviewed UI | **Missing** | Canonical units stored; conversion only at render; all modes and labels |
| OPS operational context mode | No OPS primary view or dedicated module in frontend | **Missing** | Define trustworthy source coverage before UI |
| PATTERNS derived knowledge mode | No PATTERNS primary view or dedicated module | **Missing** | D1 schema/derivation truth, privacy, meaningful empty state |
| Replay single and multi-contact | No replay mode in reviewed frontend | **Missing** | Read-only historical observation geometry and explicit temporal provenance |
| Home visibility / balcony | Canonical spec includes; no complete independently verified presentation identified | **Unverified / likely partial** | Trace current UI and data shape before implementation |
| Aviation weather / NOTAM interpretation | Some airport conditions in Inspector browser evidence; no dedicated full OPS weather/NOTAM surface identified | **Partial** | Source feasibility, attribution, recency, permission and quota |
| Geographic range rings / true bearings / airspace | Field Notes proposes/qualifies these; not verified as implemented | **Open design/implementation** | Only real geometry; avoid invented controlled airspace |

## Execution priorities

1. **Release gate for existing core:** independently reproduce browser/offline suite against exact HEAD, inspect responsive screens and compare with current app. Work's latest ledger reports **30/30 Chromium and 74/74 offline**, using synthetic responses and controlled time. Those numbers are Work-reported, not independently rerun in this audit.
2. **Finish foundational display preferences:** Field Notes Light/Dark/System plus distance/speed and independent altitude units. Do not add a superficial selector without cross-surface conversion or coherent theme tokens.
3. **Replay:** a bounded, read-only, clearly historical single-encounter experience can become the first excellent new feature. No synthetic trajectory between sparse points.
4. **OPS and PATTERNS:** build only after data contracts, provenance, empty/error states and zero-cost acquisition are demonstrated. Neither should be presented as available until real.
5. **Real-world acceptance and deployment:** explicitly separate verified browser fixtures, production-safe read-only probes, physical-device checks, merge and deploy. No provider spending, D1 mutation or production deployment without approval.

## Safety and continuity
- Work branch: `work/doaa-acceptance-2026-10-10`; integration branch and `main` untouched.
- Immutable recovery baseline: `checkpoint/doaa-pre-work-2026-10-10` at `7784868d5052318cba0dbfdc5501f0c60174f514`.
- Treat Field Notes decisions as intended product behavior, not implementation status.
- This inventory intentionally avoids counting occurrences of a feature word as proof of behavior; the named source paths are the starting points for deeper verification.
