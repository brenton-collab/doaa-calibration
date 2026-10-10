/* DOAA isolated cartography preview; read-only live data via service binding. */
addEventListener('fetch',e=>e.respondWith((async()=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET')return new Response('Preview is read-only',{status:405});
 if(u.pathname.startsWith('/api/'))return PRODUCTION_API.fetch(new Request('https://doaa-calibration.brenton-7e6.workers.dev'+u.pathname+u.search,{method:'GET'}));
 const path=u.pathname==='/'?'index.html':u.pathname.slice(1);
 if(path.includes('..')||!/^[-a-zA-Z0-9_./]+$/.test(path))return new Response('Not found',{status:404});
 const r=await fetch('https://raw.githubusercontent.com/brenton-collab/doaa-calibration/work/base-map-isolated/'+path);
 if(!r.ok)return new Response('Preview asset unavailable',{status:502});
 return new Response(r.body,{headers:{'content-type':path.endsWith('.html')?'text/html; charset=utf-8':path.endsWith('.js')?'text/javascript; charset=utf-8':path.endsWith('.css')?'text/css':'application/octet-stream','cache-control':'no-store','x-doaa-preview':'isolated-branch'}});
})()));
