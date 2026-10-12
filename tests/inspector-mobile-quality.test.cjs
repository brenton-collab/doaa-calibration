const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
test('Contact overview exposes a direct keyboard-accessible Airframe action',()=>{
 assert.match(source,/section\('AIRFRAME',\s*'<button type="button" class="inspector-action" data-doaa="aircraft">/);
 assert.match(source,/querySelectorAll\('\[data-doaa\]'\)/);
});
test('Media hero and credit field use sanitized photo attribution',()=>{
 assert.match(source,/\['CREDIT',safePhotoCredit\(y\.photo_credit,y\.photo_artist\)\]/);
 assert.match(source,/y\.photo_image,safePhotoCredit\(y\.photo_credit,y\.photo_artist\)/);
 assert.match(source,/function safePhotoCredit\(/);
});

const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
test('Inspector opens with collapsed phone rack and restores its prior state on close',()=>{
 assert.match(html,/inspectorRackWasCollapsed=rail\.classList\.contains\('collapsed'\)/);
 assert.match(html,/rail\.classList\.add\('collapsed'\)/);
 assert.match(html,/rail\.classList\.toggle\('collapsed',inspectorRackWasCollapsed\)/);
});
test('Legacy Inspector heading no longer draws a dark crossing rule',()=>{
 assert.doesNotMatch(html,/\.detail:before\{[^}]*border-bottom:2px solid #263c48/);
});
