// Rebuild contract: selection must not erase the surrounding traffic picture.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
test('SKY keeps unselected aircraft visible during inspection',()=>{
 assert.match(html,/ctx\.arc\(0,0,12,0,Math\.PI\*2\)/);
 assert.match(html,/ctx\.globalAlpha=rackSearchResults\?\(sm\?1:\.38\):1/);
});
test('Inspector fallback labels position freshness instead of claiming LIVE',()=>{
 assert.match(html,/function inspectorTelemetry\(a,live=false\)/);
 assert.match(html,/RECENT POSITION/);
 assert.match(html,/LAST KNOWN POSITION/);
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
