/* Read-only, bounded reuse of existing D1 media. No provider calls or media discovery. */
(() => {
 'use strict';
 let lastQuery='',lastAt=0,inflight=false;
 const INTERVAL=120000;
 async function poll(){
  if(document.hidden||window.DOAAAmbient?.mode!=='SLIDES'||!window.DOAAAmbient?.active)return;
  const snapshot=window.DOAALiveSnapshot?.();
  const aircraft=(snapshot?.aircraft||[]).filter(a=>/^[a-f0-9]{6}$/i.test(String(a.id||''))&&a.reg).slice(0,12);
  const ids=aircraft.map(a=>String(a.id).toUpperCase()).sort();
  const signature=ids.join(',');
  if(!signature||inflight||(signature===lastQuery&&Date.now()-lastAt<INTERVAL))return;
  lastQuery=signature;lastAt=Date.now();inflight=true;
  try{
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8000);
   let response;
   try{response=await fetch('/api/ambient-media?hex='+encodeURIComponent(signature),{cache:'no-store',signal:controller.signal})}finally{clearTimeout(timer)}
   if(!response.ok)return;
   const body=await response.json();
   for(const media of body.media||[]){
    const a=aircraft.find(x=>String(x.id).toLowerCase()===String(media.id).toLowerCase());
    if(!a||String(a.reg).toUpperCase()!==String(media.registration).toUpperCase())continue;
    if(!media.url||!media.license||!media.attribution)continue;
    window.dispatchEvent(new CustomEvent('doaa:airframe-media',{detail:media}));
   }
  }catch{}finally{inflight=false}
 }
 window.addEventListener('doaa:ambient-enter',poll);
 window.addEventListener('doaa:ambient-mode',poll);
 setInterval(poll,30000);
})();
