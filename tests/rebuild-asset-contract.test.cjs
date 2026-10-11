// Run with: node --test tests/rebuild-asset-contract.test.cjs
// Static regression for Worker-first asset routing. Does not prove deployed responses.
'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('every bundled asset is explicitly reachable under Worker-first routing',()=>{
 const build=read('scripts/build-assets.cjs'),worker=read('src/worker.js');
 assert.match(read('wrangler.jsonc'),/"run_worker_first"\s*:\s*true/);
 const bundle=build.match(/const assets=\[([^\]]+)\]/);
 assert.ok(bundle,'build asset list missing');
 const assets=[...bundle[1].matchAll(/'([^']+)'/g)].map(x=>x[1]);
 const routes=worker.match(/if\(\[([^\]]+)\]\.includes\(u\.pathname\)\)return env\.ASSETS\.fetch\(request\)/);
 assert.ok(routes,'Worker static route allowlist missing');
 const served=new Set([...routes[1].matchAll(/'\/([^']+)'/g)].map(x=>x[1]));
 served.add('index.html');served.add('flight-enrichment.js');served.add('admin-users.html');
 assert.match(read('src/account-admin.mjs'),/env\.ASSETS\.fetch\(new Request\(new URL\('\/admin-users\.html'/);
 assert.deepEqual(assets.filter(x=>!served.has(x)),[],'bundled asset missing authenticated Worker route');
 const html=read('index.html');
 const refs=[...html.matchAll(/(?:src|href)=["']\/([^"'?]+)["']/g)].map(x=>x[1]);
 assert.deepEqual(refs.filter(x=>!assets.includes(x)),[],'HTML references unbundled asset');
});
test('password tables are supplied by versioned migrations',()=>{
 assert.match(read('migrations/0014_password_login_limits.sql'),/CREATE TABLE IF NOT EXISTS password_login_limits/);
 assert.match(read('migrations/0015_password_accounts.sql'),/CREATE TABLE IF NOT EXISTS password_accounts/);
 const preview=read('scripts/preview-empty-schema.sql');
 assert.match(preview,/CREATE TABLE IF NOT EXISTS password_login_limits/);
 assert.match(preview,/CREATE TABLE IF NOT EXISTS password_accounts/);
});
