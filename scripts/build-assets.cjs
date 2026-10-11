'use strict';
// A deliberately explicit allowlist. Never publish the repository root as web assets.
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'dist');
const assets=['admin-users.html','field-notes.css','admin-users.css','admin-users.js','index.html','sky-map-core.js','vector-base.js','flight-enrichment.js','flight-core.js','inspector-flight.js','movement-core.js','movement-workspace.js','movement-workspace.css','ambient.js','ambient.css','ambient-media.js','look.js','track-core.js','track-history.js','track-history.css', 'airfield.js', 'airport-weather.js', 'units.js', 'catchment-core.js', 'preference-core.js', 'bookmarks.js', 'account.js'];
const staging=path.join(root,'.dist-staging');
fs.rmSync(staging,{recursive:true,force:true});
fs.mkdirSync(staging,{recursive:true});
try {
for(const name of assets){
 if(!/^[a-z0-9.-]+$/i.test(name))throw new Error('Invalid asset path: '+name);
 const source=path.join(root,name);
 if(!fs.statSync(source).isFile())throw new Error('Missing asset: '+name);
 fs.copyFileSync(source,path.join(staging,name));
}
const html=fs.readFileSync(path.join(staging,'index.html'),'utf8');
const refs=[...html.matchAll(/(?:src|href)=["']\/([^"']+)["']/g)].map(m=>m[1]);
for(const ref of refs)if(!assets.includes(ref))throw new Error('Unbundled local asset referenced by index.html: '+ref);
for(const ref of ['index.html','flight-enrichment.js'])if(!fs.existsSync(path.join(staging,ref)))throw new Error('Missing Worker-served asset: '+ref);
fs.rmSync(out,{recursive:true,force:true});
fs.renameSync(staging,out);
} catch (error) {
 fs.rmSync(staging,{recursive:true,force:true});
 throw error;
}
console.log('DOAA web assets packaged:',assets.join(', '));
