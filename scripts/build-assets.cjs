'use strict';
// A deliberately explicit allowlist. Never publish the repository root as web assets.
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'dist');
const assets=['index.html','vector-base.js','flight-enrichment.js','ambient.js','ambient.css','ambient-media.js','look.js'];
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
for(const name of assets){
 if(!/^[a-z0-9.-]+$/i.test(name))throw new Error('Invalid asset path: '+name);
 const source=path.join(root,name);
 if(!fs.statSync(source).isFile())throw new Error('Missing asset: '+name);
 fs.copyFileSync(source,path.join(out,name));
}
const html=fs.readFileSync(path.join(out,'index.html'),'utf8');
const refs=[...html.matchAll(/(?:src|href)=["']\/([^"']+)["']/g)].map(m=>m[1]);
for(const ref of refs)if(!assets.includes(ref))throw new Error('Unbundled local asset referenced by index.html: '+ref);
for(const ref of ['index.html','flight-enrichment.js'])if(!fs.existsSync(path.join(out,ref)))throw new Error('Missing Worker-served asset: '+ref);
console.log('DOAA web assets packaged:',assets.join(', '));
