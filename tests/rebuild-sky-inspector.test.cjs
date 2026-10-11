// Rebuild contract: selection must not erase the surrounding traffic picture.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
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
 const css=fs.readFileSync(new URL('../field-notes.css',import.meta.url),'utf8');
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
