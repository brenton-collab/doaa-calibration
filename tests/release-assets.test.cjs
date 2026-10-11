'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('asset builder explicitly excludes repository and private infrastructure files',()=>{
 const source=read('scripts/build-assets.cjs');
 assert.match(source,/const assets=\[/);
 for(const name of ['index.html','vector-base.js','flight-enrichment.js','ambient.js','ambient.css','ambient-media.js','look.js'])assert.ok(source.includes("'"+name+"'"));
 for(const forbidden of ['doaa-memory.js','wrangler.jsonc','src/worker.js','.github','migrations'])assert.ok(!source.includes("'"+forbidden+"'"));
 assert.equal(JSON.parse(read('wrangler.jsonc')).assets.directory,'./dist');
});
test('all local frontend references are represented in curated assets',()=>{
 const html=read('index.html'),source=read('scripts/build-assets.cjs');
 const refs=[...html.matchAll(/(?:src|href)=["']\/([^"']+)["']/g)].map(m=>m[1]);
 for(const ref of refs)assert.ok(source.includes("'"+ref+"'"),'missing '+ref);
});
test('inline scripts and bundled modules parse',()=>{
 const html=read('index.html');
 for(const [,code] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(code.trim())new vm.Script(code);
 for(const p of ['vector-base.js','flight-enrichment.js','ambient.js','ambient-media.js','look.js','track-core.js','track-history.js','airport-weather.js', 'units.js','catchment-core.js','preference-core.js','account.js','bookmarks.js'])new vm.Script(read(p));
});
