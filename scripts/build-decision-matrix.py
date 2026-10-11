"""Preserve the complete agreed contract; generate auditable, machine-readable release state."""
import re,json,subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=(root/'FIELD_NOTES_DECISIONS_2026-10-08.md').read_text()
blocks=re.findall(r'^- \*\*(.*?)\*\*(.*?)(?=^[-#>]|\Z)',source,re.M|re.S)
implicit=[]; requirements={}; titles={}; refinements={}
for title,body in blocks:
    if title.startswith('Decision '):
        m=re.match(r'Decision (\d+)\s*[—–]',title)
        if m:
            n=int(m[1]);requirements.setdefault(n,[]).append(body.strip());titles[n]=title
        else:
            m=re.match(r'Decision (\d+) refinement|Decision (\d+) scope clarification',title)
            if m: refinements.setdefault(int(m[1] or m[2]),[]).append(title+' '+body.strip())
    elif not requirements and 'Locked design review decisions' in source[:source.find('- **'+title)]: implicit.append((title,body.strip()))
for n,(title,body) in enumerate(implicit[:20],1): titles[n]=title;requirements[n]=[body]
assert set(requirements)==set(range(1,185)), sorted(set(range(1,185))-set(requirements))
# Six unnumbered BOARD locks occur between the implicit inventory and Decision 21.
refinements.setdefault(19,[]).extend(t+' '+b for t,b in implicit[20:])
refinements.setdefault(104,[]).append('Initial approved users are David and Brent; actual Google subject identifiers require secure configuration.')
existing=root/'docs/DECISION_IMPLEMENTATION_MATRIX.json'
old={r['decision']:r for r in json.loads(existing.read_text())['decisions']} if existing.exists() else {}
def group(n):
    if n<=18 or 176<=n<=177: return ['index.html','flight-enrichment.js','src/worker.js','tests/inspector-contexts.test.cjs'],'Inspector shell, cells, renderSurface, openObject, contextual tab dispatch','Complete grounded contextual content, independent datum controls, history/back, source-level missing states and responsive interaction.'
    if 19<=n<=23 or 46<=n<=54: return ['index.html','flight-enrichment.js','src/worker.js','src/board-schedule.mjs'],'hydrateBoard / boardApi / airportMovementEvidence / airport lookup','Unify canonical movement records and timelines; separate Home/Explore; add date/evidence/runway navigation and sourced Airport conditions/geometry.'
    if 24<=n<=32: return ['flight-enrichment.js','doaa-memory.js','src/worker.js'],'renderSurface(track-history) currently renders unavailable placeholder; /memory/history returns aggregates, not track samples','Add encounter-scoped observed samples, geographically grounded map and shared telemetry/time cursor; real interval playback; deliberate two-aircraft comparison, union clock, follow and loop.'
    if 33<=n<=45 or 84<=n<=94: return ['flight-enrichment.js','doaa-memory.js','src/worker.js','migrations/0001_doaa_memory.sql'],'dossier / rememberIdentifier / claims+evidence / biography / doaaHistory / mediaView / mergeJourneyChronology','Temporalize identity and interpretation revisions; grounded BIO eras, comprehensive cross-source Operations, Sightings footprints, licensed media gallery/era links.'
    if 55<=n<=66: return ['index.html','src/worker.js','vector-base.js'],'BASE/STREET exists; no MET workspace, temporal weather adapters, NAV dataset or global quantity preferences','Implement independent units, map modes/layers, verified free weather/NAV sources, timestamped History/Now/Forecast and contextual feature inspection.'
    if 67<=n<=77: return ['index.html','flight-enrichment.js','src/worker.js','doaa-memory.js'],'searchRack / universalSearch / openObject / memory search','Extend existing search into retained grouped workspace, pagination, dated operations/aliases and explicit historical/live transition with restored context.'
    if 95<=n<=111: return ['index.html','src/worker.js','migrations/0001_doaa_memory.sql'],'favoriteApi is anonymous generic favourites, not private moment bookmarks; no authentication/session/preferences API','Implement approved Google subject authorization and full-app gate, private idempotent moment bookmarks/gallery, persistent sessions and atomic last-save-wins preferences with retry.'
    if 124<=n<=175: return ['index.html','src/worker.js','relay.js','doaa-memory.js'],'drawTrack / draw / mergeResponses / norm / checkpointObservation','Implement one-hour altitude gradients/trail restoration and aging, source/quality reconciliation and immutable conflict/correction evidence, animation plausibility/orientation policy.'
    if n>=180: return ['ambient.js','ambient.css','ambient-media.js','index.html','tests/ambient-media-runtime.test.cjs'],'AMBIENT shared snapshot, bounded media cache/discovery, image preload and explicit composition; automated mocked lifecycle tests','Verify real image handoffs, event eligibility/pacing, observed freshness, entry/exit/idle, screen longevity, responsive and reduced-motion behavior.'
    if n==178: return ['look.js','index.html','tests/look-journey.test.cjs'],'shared snapshot LOOK cues, emergency and ordinary-traffic regressions','Finish evidence-backed behavior/visibility/identity attention and verify connected navigation without personalization.'
    if n==179: return ['DOAA_SPEC.md','RELEASE_EXECUTION_SAFETY_PLAN.md'],'release boundary documented; source/code are not accepted application','Run integrated release gate; OPS/PATTERNS and advanced general SKY Replay are explicitly sequenced later; mandatory Track History/Compare is required by current assignment.'
    return ['index.html','src/worker.js','relay.js','tests/observation-contract.test.cjs'],'recent timestamp/pinned-state/partial-cell guards exist; draw and selection have no full source-aware lifecycle/follow policy','Implement per-observation freshness, retained selection, qualified stale markers, outage/recovery policy and north-up offset Follow.'
missing=set(range(25,33))|set(range(55,66))|set(range(95,112))|set(range(119,124))|{42,47,48,49,50,52,60,61,62,63,64,65,85,86,87,88,89,91,94,131,134,135,139,140,141,142,143,144,146,147,151,152,154,156,158,160,161,163,164,170,172,174,175}
entries=[]
for n in range(1,185):
    files,evidence,work=group(n)
    row={'decision':n,'title':titles[n],'requirement':'\n\n'.join(requirements[n]),'amendments':refinements.get(n,[]),'acceptance_criteria':'Every operative clause in requirement and amendments; apply latest explicit supersessions listed in contradiction register. Verify with real data and interaction where relevant.','status':'missing' if n in missing else 'partial','files_and_code_paths':files,'evidence':[evidence,'Baseline 2026-10-11: 85 Node regression tests passed; source-level and mocked tests do not prove browser/provider acceptance.'],'outstanding_engineering_work':work,'dependencies':['Shared timestamp/provenance/identity contracts','Isolated Preview D1 and non-production release gate'],'verification':['Targeted executed regression fixtures','Actual browser workflow, failure and missing-data states','Desktop, phone portrait, short landscape, tablet; keyboard and reduced motion'],'required_for_agreed_release':True,'verification_state':{'code_implemented':False,'tests_executed':False,'committed':False,'merged':False,'preview_deployed':False,'preview_browser_verified':False,'production_deployed':False,'production_verified':False}}
    if n in old: row.update({k:v for k,v in old[n].items() if k not in ['requirement','amendments','title']})
    entries.append(row)
contradictions=[
'Numbering: the source explicitly labels Decisions 21–184. The first 20 entries are indexed by their first-appearance order in Locked design review decisions. Six additional unnumbered BOARD locks before Decision 21 are retained as amendments to Decision 19. This mapping is explicit editorial traceability, not a claim that absent original numbers were present.',
'Decision 176 supersedes Decision 15 tab inventory; retain Decision 15 content obligations. Decision 177 supersedes Decision 18 tab inventory; retain Airport/runway obligations.',
'Decision 128 supersedes Decision 125 full-flight map extent with rolling one-hour trails. Decision 152 narrowly supersedes Decision 133 for subpixel-only rendering jitter.',
'Decisions 159/161 supersede Decision 83 routine marker conflict badge and normal expandable scoring breakdown; preserve conflict evidence and concise details. Decision 165 supersedes withholding all degraded positions in Decision 82.',
'Decision 59 qualifies Decision 57 lightning as observed flash density, not strike points. No invented point feed.',
'Decision 103/105 supersedes all anonymous application/favourites behavior. Decision 104 clarification requires two initially approved Google subjects, not guessed emails.',
'Current assignment explicitly makes Decisions 25–32 release requirements despite Decision 179 deferring advanced general Replay. OPS and PATTERNS remain explicitly outside the release gate.',
'Older SPEC dark theme, five permanent Inspector tabs, airborne-only BOARD, fixed historical status and preview-isolation assertions are superseded by latest locks and observed runtime facts.',
'Historical baseline Preview audit found a PRODUCTION_API proxy with no D1. Latest 2026-10-11 binding inspection verified its own isolated Preview DB (939eda3b-4894-497b-9f67-209771761b3f). Current branch Inspector code is not deployed or authenticated-Preview accepted; Google configuration remains missing.'
]
out={'schema_version':1,'audited_at':'2026-10-11','baseline_commit':'3e6aa0ff98aaf02ac570c19a63625673bf4ad42a','branch':'work/product-recovery-mobile-sky','release_ready':False,'contradiction_register':contradictions,'decisions':entries}
existing.write_text(json.dumps(out,indent=2,ensure_ascii=False)+'\n')
md=['# Decision implementation matrix','', 'This is the complete implementation contract and evidence register, not a completion claim. Machine-readable source: `DECISION_IMPLEMENTATION_MATRIX.json`.','', 'Baseline: `'+out['baseline_commit']+'`; 85 Node tests passed. No Preview/browser/Production acceptance at audit.','', '## Contradictions and supersessions','']+['- '+s for s in contradictions]+['','## Inventory','', '| Decision | Status | Release | Requirement | Evidence / code | Work / verification |','|---|---|---|---|---|---|']
for e in entries:
    clean=lambda s:s.replace('|',' / ').replace('\n',' ')
    md.append('| '+str(e['decision'])+' | '+e['status']+' | Required | '+clean(e['title'])+' | '+clean('; '.join(e['files_and_code_paths'])+' — '+(e['evidence'][0] if e['evidence'][0].startswith('2026-') else e['evidence'][-1]))+' | '+clean(e['outstanding_engineering_work'])+' |')
md+=['','## Full requirements and acceptance criteria','']
for e in entries:
    md+=['### Decision '+str(e['decision'])+' — '+e['title'],'',e['requirement'],'']
    if e['amendments']:md+=['Amendments:','']+['- '+a for a in e['amendments']]+['']
    md+=['Status: '+e['status']+'; release completion is not implied.', '', 'Evidence history (later implementation entries supersede earlier baseline gaps):', '']+['- '+a for a in e['evidence']]+['', 'Outstanding: '+e['outstanding_engineering_work'], '']
    md+=['Acceptance: '+e['acceptance_criteria'],'','Dependencies: '+ '; '.join(e['dependencies']), '', 'Verification: '+ '; '.join(e['verification']), '']
(root/'docs/DECISION_IMPLEMENTATION_MATRIX.md').write_text('\n'.join(md)+'\n')
print('Indexed',len(entries),'decisions; retained',len(implicit[20:]),'additional BOARD locks. Counts:',{s:sum(e['status']==s for e in entries) for s in ['complete','partial','missing','blocked','explicitly deferred']})
