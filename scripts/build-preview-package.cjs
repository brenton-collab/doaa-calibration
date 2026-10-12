'use strict';
// Connector/API alternative to Wrangler. Same allowlisted dist and actual Worker modules.
// Generated package is an intermediate, contains no credentials, and is never an app asset.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..');process.chdir(root);
cp.execFileSync('git',['diff','--quiet','HEAD']);
require('./verify-preview-isolation.cjs');require('./build-assets.cjs');
const config=JSON.parse(fs.readFileSync('wrangler.preview.jsonc','utf8'));
const assets=Object.fromEntries(fs.readdirSync('dist').sort().map(name=>['/'+name,fs.readFileSync(path.join('dist',name),'utf8')]));
const entry=`import worker from './worker.js';
import assets from './preview-assets.mjs';
const ASSETS={async fetch(request){const path=new URL(request.url).pathname,body=assets[path];if(body==null)return new Response('Not found',{status:404});return new Response(request.method==='HEAD'?null:body,{headers:{'content-type':path.endsWith('.css')?'text/css; charset=utf-8':path.endsWith('.js')?'application/javascript; charset=utf-8':'text/html; charset=utf-8','cache-control':'private, no-store'}});}};
export default {fetch(request,env,ctx){return worker.fetch(request,{...env,ASSETS},ctx);}};
`;
// Follow actual local imports, including password/admin modules and the generated
// authenticated SKY document. A stale hand-maintained list silently omits code.
const found=new Map();
function include(name){
 if(found.has(name))return;
 const resolved=path.resolve(root,name);
 if(!resolved.startsWith(root+path.sep))throw Error('Module escapes repository: '+name);
 const content=fs.readFileSync(resolved,'utf8');
 cp.execFileSync(process.execPath,['--check',resolved]);
 found.set(name,{name,content});
 for(const match of content.matchAll(/^import\s+(?:[^;\n]*?\s+from\s+)?['"](\.[^'"]+)['"]/gm)){
  include(path.posix.normalize(path.posix.join(path.posix.dirname(name),match[1])));
 }
}
include(config.main);
const modules=[...found.values()];
modules.push({name:'src/preview-entry.mjs',content:entry},{name:'src/preview-assets.mjs',content:'export default '+JSON.stringify(assets)+';\n'});
const source_commit=cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
// This connector transport embeds all allowlisted assets in code, behind gate().
// Do not retain an old public static namespace that could bypass authentication.
// The normal Wrangler configuration continues to use its native ASSETS binding.
const metadata={main_module:'src/preview-entry.mjs',compatibility_date:config.compatibility_date,bindings:[{type:'d1',name:'DB',database_id:config.d1_databases[0].database_id}],keep_assets:false,keep_bindings:['secret_text','plain_text','json'],logpush:false,tags:['doaa-preview-isolated','source-'+source_commit],annotations:{'workers/message':'Field Notes Airport Inspector preview','workers/tag':source_commit}};
fs.writeFileSync('.preview-package.json',JSON.stringify({script_name:config.name,source_commit,metadata,modules}));
console.log('Self-contained Preview package:',modules.length,'modules;',Buffer.byteLength(fs.readFileSync('.preview-package.json')),'bytes.');
