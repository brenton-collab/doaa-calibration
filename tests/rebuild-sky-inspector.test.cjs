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
 assert.match(html,/row\?\.focus\(\{preventScroll:true\}\)/);
});
