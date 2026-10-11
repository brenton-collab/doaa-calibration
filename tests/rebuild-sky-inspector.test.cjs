// Rebuild contract: selection must not erase the surrounding traffic picture.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('SKY keeps unselected aircraft visible during inspection',()=>{
 assert.match(html,/dim=false/);
 assert.match(html,/ctx\.globalAlpha=rackSearchResults\?\(sm\?1:\.10\):\(dim\?\.22:1\)/);
});
test('Inspector fallback labels position freshness instead of claiming LIVE',()=>{
 assert.match(html,/function inspectorTelemetry\(a,live=false\)/);
 assert.match(html,/RECENT POSITION/);
 assert.match(html,/LAST KNOWN POSITION/);
 assert.match(html,/inspectorTelemetry\(a,live\)/);
});
