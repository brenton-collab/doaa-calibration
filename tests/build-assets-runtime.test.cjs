'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{spawnSync}=require('node:child_process');
const source=fs.readFileSync(path.join(__dirname,'../scripts/build-assets.cjs'),'utf8');
const assets=['index.html','vector-base.js','flight-enrichment.js','ambient.js','ambient.css','ambient-media.js','look.js','track-core.js','track-history.js','track-history.css','airport-weather.js', 'units.js','catchment-core.js', 'preference-core.js', 'bookmarks.js', 'account.js'];
function fixture(fn){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'doaa-assets-'));
 try{
  fs.mkdirSync(path.join(root,'scripts'));fs.writeFileSync(path.join(root,'scripts/build-assets.cjs'),source);
  for(const name of assets)fs.writeFileSync(path.join(root,name),name==='index.html'?'<script src="/ambient.js"></script>':'// test asset');
  const dist=path.join(root,'dist');fs.mkdirSync(dist);fs.writeFileSync(path.join(dist,'sentinel.txt'),'last good release');
  return fn({root,dist,run:()=>spawnSync(process.execPath,[path.join(root,'scripts/build-assets.cjs')],{encoding:'utf8'})});
 }finally{fs.rmSync(root,{recursive:true,force:true});}
}
test('missing asset preserves previous dist',()=>fixture(({root,dist,run})=>{
 fs.rmSync(path.join(root,'ambient.js'));assert.notEqual(run().status,0);
 assert.equal(fs.readFileSync(path.join(dist,'sentinel.txt'),'utf8'),'last good release');
 assert.equal(fs.existsSync(path.join(root,'.dist-staging')),false);
}));
test('unbundled local HTML reference preserves previous dist',()=>fixture(({root,dist,run})=>{
 fs.writeFileSync(path.join(root,'index.html'),'<script src="/secret.js"></script>');
 assert.notEqual(run().status,0);
 assert.equal(fs.readFileSync(path.join(dist,'sentinel.txt'),'utf8'),'last good release');
 assert.equal(fs.existsSync(path.join(root,'.dist-staging')),false);
}));
test('successful build publishes only allowlisted assets',()=>fixture(({root,dist,run})=>{
 fs.writeFileSync(path.join(root,'secret.env'),'secret');
 const result=run();assert.equal(result.status,0,result.stderr);
 assert.deepEqual(fs.readdirSync(dist).sort(),assets.slice().sort());
 assert.equal(fs.existsSync(path.join(root,'.dist-staging')),false);
}));
