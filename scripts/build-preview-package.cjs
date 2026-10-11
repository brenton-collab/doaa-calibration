'use strict';
// Connector/API alternative to Wrangler. Same allowlisted dist and actual Worker modules.
// Generated package is an intermediate, contains no credentials, and is never an app asset.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..');process.chdir(root);
require('./verify-preview-isolation.cjs');require('./build-assets.cjs');
const config=JSON.parse(fs.readFileSync('wrangler.preview.jsonc','utf8'));
const assets=Object.fromEntries(fs.readdirSync('dist').sort().map(name=>['/'+name,fs.readFileSync(path.join('dist',name),'utf8')]));
const entry=`import worker from './worker.js';
import assets from './preview-assets.mjs';
const ASSETS={async fetch(request){const path=new URL(request.url).pathname,body=assets[path];if(body==null)return new Response('Not found',{status:404});return new Response(request.method==='HEAD'?null:body,{headers:{'content-type':path.endsWith('.css')?'text/css; charset=utf-8':path.endsWith('.js')?'application/javascript; charset=utf-8':'text/html; charset=utf-8','cache-control':'private, no-store'}});}};
export default {fetch(request,env,ctx){return worker.fetch(request,{...env,ASSETS},ctx);}};
`;
const files=['src/worker.js','src/airfield.mjs','doaa-memory.js','src/track-history.mjs','src/auth.mjs','src/personal.mjs'];
const modules=files.map(name=>({name,content:fs.readFileSync(name,'utf8')}));
modules.push({name:'src/preview-entry.mjs',content:entry},{name:'src/preview-assets.mjs',content:'export default '+JSON.stringify(assets)+';\n'});
const metadata={main_module:'src/preview-entry.mjs',compatibility_date:config.compatibility_date,bindings:[{type:'d1',name:'DB',id:config.d1_databases[0].database_id}],keep_bindings:[],logpush:false,tags:['doaa-preview-isolated']};
const source_commit=cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
fs.writeFileSync('.preview-package.json',JSON.stringify({script_name:config.name,source_commit,metadata,modules}));
console.log('Self-contained Preview package:',modules.length,'modules;',Buffer.byteLength(fs.readFileSync('.preview-package.json')),'bytes.');
