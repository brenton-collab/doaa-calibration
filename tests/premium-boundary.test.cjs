// Run with: node --test tests/premium-boundary.test.cjs
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const worker=fs.readFileSync('src/worker.js','utf8');
const relay=fs.readFileSync('relay.js','utf8');
function section(source,from,to){const a=source.indexOf(from),b=source.indexOf(to,a+from.length);assert(a>=0&&b>a,`missing section ${from}`);return source.slice(a,b)}
test('Worker and relay parse as JavaScript',()=>{
 new vm.Script(worker.replace(/^import .*?;\s*/m,'').replace('export default{','const __worker={'));
 new vm.Script(relay);
});
test('Inspector never invokes metered relay',()=>assert.doesNotMatch(section(worker,'async function dossierApi(','function claimAgeMs'),/\brelay\s*\(/));
test('Flight endpoint never invokes metered relay',()=>assert.doesNotMatch(section(worker,'async function flight(','async function adsblolLive'),/\brelay\s*\(/));
test('BOARD uses ADS-B only, never premium board endpoint',()=>assert.doesNotMatch(section(worker,'async function boardApi(','async function opsApi'),/relay\s*\(\s*['"`]\/board/));
test('Relay hard-stops before reading API key or making network requests',()=>{
 const body=section(relay,'async function airlabs(path,params){','function providerMeta');
 assert.match(body,/^async function airlabs\(path,params\)\{throw new Error\('AirLabs premium acquisition disabled/);
 assert.ok(body.indexOf("throw new Error('AirLabs premium acquisition disabled")<body.indexOf('process.env.AIRLABS_API_KEY'));
});
test('Inspector validates hex and exposes conflicting identities',()=>{
 const d=section(worker,'async function dossierApi(','function claimAgeMs');
 assert.match(d,/\^\[0-9A-F\]\{6\}\$/);
 assert.match(d,/identity_conflicts:conflicts/);
 assert.match(d,/conflicts\.icao_type\?null/);
 assert.match(d,/key:'adsbdb-aircraft'/);
});
