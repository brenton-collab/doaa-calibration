// Rebuild contract: selection must not erase the surrounding traffic picture.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
test('SKY keeps unselected aircraft visible during inspection',()=>{
 assert.match(html,/ctx\.arc\(0,0,12,0,Math\.PI\*2\)/);
 assert.match(html,/ctx\.globalAlpha=rackSearchResults\?\(sm\?1:\.38\):1/);
});
test('Inspector fallback labels position freshness instead of claiming LIVE',()=>{
 assert.match(html,/function inspectorTelemetry\(a,live=false\)/);
 assert.match(html,/DOAASkyMapCore\.observation\(a,Date\.now\(\)\)\.label/);
 assert.match(html,/last reported telemetry is shown above/);
 assert.match(html,/inspectorTelemetry\(a,live\)/);
});

test('Rack rows are keyboard operable and retain focus across refresh',()=>{
 assert.match(html,/role="button" tabindex="0" data-id="\$\{a\.id\}"/);
 assert.match(html,/el\.onkeydown=e=>/);
 assert.match(html,/e\.key==='Enter'\|\|e\.key===' '/);
 assert.match(html,/\(row\|\|racksearch\)\.focus\(\{preventScroll:true\}\)/);
});

test('Inspector offers a close control and keyboard-visible navigation',()=>{
 const css=fs.readFileSync(require('node:path').join(__dirname,'../field-notes.css'),'utf8');
 assert.match(html,/id="detailclose"/);
 assert.match(html,/detailclose\.onclick=/);
 assert.match(css,/\.detail\.show \.detail-tray button:focus-visible/);
 assert.match(css,/\.detail\.show \.detail-close:focus-visible/);
});

test('Inspector returns keyboard focus to its Rack origin even after rerender',()=>{
 assert.match(html,/inspectorReturnFocus=document\.activeElement\?\.closest\?\.\('#rack \.row'\)\?\.dataset\.id\|\|null/);
 assert.match(html,/el\.dataset\.id===inspectorReturnFocus/);
 assert.match(html,/\(row\|\|racksearch\)\.focus\(\{preventScroll:true\}\)/);
});

test('Keyboard-opened Inspector receives focus and Escape closes it',()=>{
 assert.match(html,/if\(inspectorReturnFocus\)detailclose\.focus\(\{preventScroll:true\}\)/);
 assert.match(html,/detail\.addEventListener\('keydown',e=>\{if\(e\.key==='Escape'\)/);
});

test('Rack distinguishes acquisition, feed loss and an observed empty view',()=>{
 assert.match(html,/acquiring\?'Checking the current view for aircraft/);
 assert.match(html,/now<=0\?'Aircraft feed unavailable/);
 assert.match(html,/No airborne aircraft observed in this view/);
 assert.match(html,/role="status"/);
});

test('Rack search protects newer queries',()=>{
 assert.ok(html.includes('const seq=++rackSearchSeq'));
 assert.ok(html.includes('if(seq!==rackSearchSeq)return'));
 assert.ok(html.includes('Search unavailable. Try again.'));
});

test('Inspector fallback does not overstate freshness or overwrite newer selection',()=>{
 assert.ok(html.includes('The last reported telemetry is shown above'));
 assert.ok(html.includes("if(selected===id&&detail.classList.contains('show'))detailbody.innerHTML=inspectorTelemetry(a,live)"));
 assert.ok(html.includes('DOAASkyMapCore.observation(a,Date.now()).label'));
 assert.ok(html.includes('!DOAASkyMapCore.fresh(a,Date.now())'))
});

test('Inspector selection uses aircraft observation timestamp rather than feed clock',()=>{
 assert.ok(html.includes('const live=DOAASkyMapCore.observation(a,Date.now()).fresh'));
});

test('SKY markers and Rack share per-aircraft freshness filtering',()=>{
 assert.ok(html.includes('a._pinned||DOAASkyMapCore.fresh(a,t)'));
 assert.ok(html.includes('inView(a)&&DOAASkyMapCore.fresh(a,t)'));
});

test('Field Notes Inspector has reusable semantic layout styles',()=>{
 const css=fs.readFileSync(require('node:path').join(__dirname,'../field-notes.css'),'utf8');
 assert.ok(css.includes('.fn-inspector-header'));
 assert.ok(css.includes('.fn-inspector-section-title'));
 assert.ok(css.includes('.fn-inspector-hero'));
});

test('Contact evidence separates broadcast observations from enrichment and route associations',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 assert.ok(source.includes("section('OBSERVED CONTACT'"));
 assert.ok(source.includes("section('POSITION & MOVEMENT'"));
 assert.ok(source.includes("section('AIRFRAME IDENTITY · ENRICHED'"));
 assert.ok(source.includes("section('POSSIBLE FLIGHT ASSOCIATION'"));
});

test('Contact telemetry identifies stale and uncertain evidence',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../inspector-flight.js'),'utf8');
 assert.match(source,/fn-telemetry-status/);
 assert.match(source,/LAST KNOWN POSITION/);
 assert.match(source,/Additional observation details/);
});

test('Inspector related objects require airframe identity and navigable controls',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 assert.ok(source.includes('class="fn-object-link"'));
 assert.ok(source.includes("/^[0-9a-f]{6}$/i.test(a.id||'')"));
});

test('Inspector Back retains the rendered object context',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 assert.match(source,/d\._doaaRenderedState\|\|d\._doaaSwipeState/);
 assert.match(source,/d\._doaaSubject=previous\.state\.a\.id/);
 assert.match(source,/previous\.surface==='contact'/);
 assert.match(source,/aria-current/);
});

test('Inspector tab switches invalidate pending lookup navigation',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 assert.match(source,/if\(b\.dataset\.trayDoaa===activeSurface\(d\)\)return/);
 assert.match(source,/if\(z===activeSurface\(d\)\)return/);
 assert.match(source,/if\(!current\(\)\|\|activeSurface\(d\)!=='flight'\)return/);
});

test('Airport navigation renders before remote lookup completes',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 const start=source.indexOf("if(p.kind==='airport')");
 const end=source.indexOf("if(p.kind==='flight')",start);
 const airport=source.slice(start,end);
 assert.ok(airport.indexOf("renderSurface('airport'")<airport.indexOf("await fetch('/api/airport-lookup"));
 assert.match(airport,/activeSurface\(d\)\.startsWith\('airport'\)/);
});

test('Airport identity lookup offers a retry without duplicating Back history',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 assert.match(source,/data-airport-lookup-retry/);
 assert.match(source,/pushHistory=true/);
 assert.match(source,/if\(pushHistory\)rememberInspector\(d\)/);
 assert.match(source,/status:'unavailable'/);
});

test('Unresolved flight evidence has a functional retry path',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 assert.match(source,/data-flight-lookup-retry/);
 assert.match(source,/if\(same&&pushHistory\)/);
 assert.match(source,/status:'unavailable'/);
});

test('Flight dossier distinguishes callsign association from confirmed assignment',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 assert.match(source,/section\('ASSOCIATION'/);
 assert.match(source,/A dated aircraft-to-flight assignment has not been established/);
 assert.match(source,/current_assignment_established:f\?\.current_assignment_established===true/);
});

test('Flight airframe and carrier identity remain source-qualified',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 assert.match(source,/FLIGHT SOURCE REGISTRATION/);
 assert.match(source,/FLIGHT SOURCE AIRCRAFT TYPE/);
 assert.match(source,/AIRFRAME · FLIGHT SOURCE/);
 assert.match(source,/do not independently establish the operator/);
});

test('Flight Explore suppresses inferred airframe links',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 assert.ok(source.includes("context!=='flight'&&reg"));
 assert.ok(source.includes("relatedObjects(a,f,af,'flight')"));
});

test('Flight related objects do not imply airframe assignment or link to self',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 assert.match(source,/function relatedObjects\(a,f,af,context='contact'\)/);
 assert.match(source,/context!=='flight'&&reg&&/);
 assert.match(source,/if\(flight&&context!=='flight'\)/);
 assert.match(source,/relatedObjects\(a,f,af,'flight'\)/);
});

test('Related-object Flight navigation identifies association as possible, not assigned',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 const related=source.slice(source.indexOf('function relatedObjects('),source.indexOf('function rememberInspector('));
 assert.match(related,/Possible flight association · not a confirmed assignment/);
 assert.match(related,/if\(dep\)out\.push\(objectLink\('airport',dep/);
 assert.match(related,/if\(arr\)out\.push\(objectLink\('airport',arr/);
 assert.match(related,/context!=='flight'&&reg&&/);
 assert.match(related,/if\(flight&&context!=='flight'\)/);
});

test('Aircraft dossier does not promote flight-source registration or type to airframe identity',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 const aircraft=source.slice(source.indexOf('function aircraft('),source.indexOf('function sightingLink('));
 assert.ok(aircraft.includes('y.reg_number||a.reg'));
 assert.ok(aircraft.includes('y.icao||a.type'));
 assert.ok(!aircraft.includes('f?.reg_number'));
 assert.ok(!aircraft.includes('f?.aircraft_icao'));
});

test('Aircraft identity labels distinguish reference and Contact feed from flight lookup',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 const aircraft=source.slice(source.indexOf('function aircraft('),source.indexOf('function sightingLink('));
 assert.match(aircraft,/Airframe reference and Contact-feed identifiers are source-reported/);
 assert.match(aircraft,/Flight lookup identity is excluded/);
 assert.doesNotMatch(aircraft,/f\?\.reg_number|f\?\.aircraft_icao/);
});

test('Aircraft fallback provenance is specific to registration and ICAO type',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 const helper=fs.readFileSync(require('node:path').join(__dirname,'../inspector-flight.js'),'utf8');
 const aircraft=source.slice(source.indexOf('function aircraft('),source.indexOf('function sightingLink('));
 assert.match(aircraft,/y\.reg_number\?'AIRFRAME REFERENCE':'CONTACT FEED'/);
 assert.match(aircraft,/y\.icao\?'AIRFRAME REFERENCE':'CONTACT FEED'/);
 assert.match(helper,/fallbackSource='AIRFRAME REFERENCE'/);
 assert.match(helper,/field\.state==='reported'\?fallbackSource/);
 assert.doesNotMatch(aircraft,/f\?\.reg_number|f\?\.aircraft_icao/);
});

test('Aircraft biography includes effective end date',()=>{
 const helper=fs.readFileSync(require('node:path').join(__dirname,'../inspector-flight.js'),'utf8');
 assert.ok(helper.includes('q.effective_to'));
});

test('Dated Aircraft claims do not imply resolved current identity',()=>{
 const helper=fs.readFileSync(require('node:path').join(__dirname,'../inspector-flight.js'),'utf8');
 assert.ok(helper.includes('Overlapping periods, missing end dates and differing claims'));
});

test('Related Airframe link excludes flight lookup identity',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 const related=source.slice(source.indexOf('function relatedObjects('),source.indexOf('function rememberInspector('));
 assert.ok(related.includes("reg=af?.reg_number||a.reg||('ICAO24 '"));
 assert.ok(related.includes('[af?.manufacturer,af?.model]'));
 assert.ok(!related.includes('||f?.reg_number'));
 assert.ok(!related.includes('||f?.manufacturer'));
 assert.ok(!related.includes('||f?.model'));
});

test('Date-only airframe evidence is visible in chronology',()=>{
 const src=fs.readFileSync(require('node:path').join(__dirname,'../inspector-flight.js'),'utf8');
 assert.ok(src.includes('chronologyDate'));
 assert.ok(src.includes('DATE ONLY'));
});

test('Contact identity does not borrow Flight lookup identifiers',()=>{
 const src=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 const contact=src.slice(src.indexOf('function contact('),src.indexOf('function flight('));
 assert.ok(contact.includes("id=a.call||a.id.toUpperCase()"));
 assert.ok(contact.includes("reg=af?.reg_number||a.reg||'UNKNOWN'"));
 assert.ok(!contact.includes('||f?.reg_number'));
 assert.ok(!contact.includes('f?.aircraft_icao'));
});

test('Airport movement navigation invalidates pending lookup responses',()=>{
 const src=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 const movement=src.slice(src.indexOf("d.querySelectorAll('[data-airport-movement]')"),src.indexOf("d.querySelectorAll('[data-flight-lookup-retry]')"));
 assert.ok(movement.includes('rememberInspector(d);d._doaaNavigation=(d._doaaNavigation||0)+1;'));
 assert.ok(src.includes('d._doaaNavigation===navigation&&d._doaaSubject===subject'));
 assert.ok(src.includes('d._doaaNavigation=(d._doaaNavigation||0)+1;window.DOAATrackHistory?.dispose(d)'));
});

test('Back navigation restores subject and invalidates stale responses',()=>{
 const src=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 const back=src.slice(src.indexOf('function backInspector('),src.indexOf('async function openObject('));
 assert.ok(back.includes('d._doaaNavigation=(d._doaaNavigation||0)+1'));
 assert.ok(back.includes('d._doaaSubject=previous.state.a.id'));
 assert.ok(back.includes('d.dataset.activeSurface=previous.surface'));
 assert.ok(back.includes('d.scrollTop=previous.scroll'));
});

test('Movement workspace is disposed once per Inspector surface change',()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
 const section=source.slice(source.indexOf('function renderSurface('),source.indexOf("if(z==='airport')",source.indexOf('function renderSurface(')));
 assert.equal(section.split('_doaaMovementsDispose?.()').length-1,1);
});
