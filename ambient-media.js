/* Bounded cache-first media discovery for viewport aircraft; display only verified licensed media. */
(() => {
 'use strict';
 let lastQuery='',lastAt=0,inflight=false;
 const INTERVAL=120000;
 // One external investigation per five minutes, at most six per page session.
 // Existing server investigator owns source reconciliation and provenance.
 const DISCOVERY_GAP=300000,DISCOVERY_LIMIT=6;
 const attempted=new Set();
 let discoveryCount=0,lastDiscovery=0,discoveryTimer=null,discoveryBusy=false;
 function scheduleDiscovery(aircraft,verified){
  if(discoveryTimer||discoveryBusy||discoveryCount>=DISCOVERY_LIMIT)return;
  const candidates=aircraft.filter(a=>/^[A-Z0-9-]{3,12}$/i.test(String(a.reg||''))&&!verified.has(String(a.id).toLowerCase())&&!attempted.has(String(a.id).toLowerCase()+':'+String(a.reg).toUpperCase()));
  if(!candidates.length)return;
  const delay=Math.max(30000,DISCOVERY_GAP-(Date.now()-lastDiscovery));
  discoveryTimer=setTimeout(async()=>{
   discoveryTimer=null;
   if(document.hidden||window.DOAAAmbient?.mode!=='SLIDES'||!window.DOAAAmbient?.active)return;
   const a=candidates[0],latest=window.DOAALiveSnapshot?.();
   const stamp=Number(latest?.observedAt)||0;
   if(!(stamp>0&&Date.now()>=stamp&&Date.now()-stamp<90000))return;
   const current=latest?.aircraft?.find(x=>String(x.id).toLowerCase()===String(a.id).toLowerCase());
   if(!current||String(current.reg||'').toUpperCase()!==String(a.reg).toUpperCase())return;
   const key=String(a.id).toLowerCase()+':'+String(a.reg).toUpperCase();
   if(discoveryBusy||discoveryCount>=DISCOVERY_LIMIT)return;
   attempted.add(key);discoveryBusy=true;discoveryCount++;lastDiscovery=Date.now();
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
   try{
    const query=new URLSearchParams({hex:String(a.id),registration:String(a.reg)});
    if(a.type)query.set('type',String(a.type));
    const response=await fetch('/api/investigate?'+query,{cache:'no-store',signal:controller.signal});
    if(response.ok){lastQuery='';setTimeout(poll,0)}
   }catch{}finally{clearTimeout(timeout);discoveryBusy=false}
  },delay);
 }

 async function poll(){
  if(document.hidden||window.DOAAAmbient?.mode!=='SLIDES'||!window.DOAAAmbient?.active)return;
  const snapshot=window.DOAALiveSnapshot?.();
  // Do not discover against an expired ADS-B snapshot. Legacy snapshots without
  // a timestamp retain the cache-only path, but cannot trigger provider work.
  const observed=Number(snapshot?.observedAt)||0;
  const recent=observed>0&&Date.now()>=observed&&Date.now()-observed<90000;
  const aircraft=(snapshot?.aircraft||[]).filter(a=>/^[a-f0-9]{6}$/i.test(String(a.id||'')) ).slice(0,12);
  const ids=aircraft.map(a=>String(a.id).toUpperCase()).sort();
  const signature=aircraft.map(a=>String(a.id).toUpperCase()+':'+String(a.reg||'').toUpperCase()).sort().join(',');
  if(!signature||inflight||(signature===lastQuery&&Date.now()-lastAt<INTERVAL))return;
  lastQuery=signature;lastAt=Date.now();inflight=true;
  try{
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8000);
   let response;
   try{response=await fetch('/api/ambient-media?hex='+encodeURIComponent(ids.join(',')),{cache:'no-store',signal:controller.signal})}finally{clearTimeout(timer)}
   if(!response.ok){lastQuery='';return;}
   const body=await response.json();
   if(document.hidden||window.DOAAAmbient?.mode!=='SLIDES'||!window.DOAAAmbient?.active)return;
   const latest=window.DOAALiveSnapshot?.();
   const current=new Map((latest?.aircraft||[]).map(a=>[String(a.id||'').toLowerCase(),String(a.reg||'').toUpperCase()]));
   const verified=new Set();
   for(const media of body.media||[]){
    const a=aircraft.find(x=>String(x.id).toLowerCase()===String(media.id).toLowerCase());
    if(!a||!media.registration)continue;
    const liveReg=current.get(String(media.id).toLowerCase());
    if(liveReg===undefined)continue;
    // A current registration is authoritative for this encounter. A hex-only contact
    // may reuse the server's exact-airframe association without inventing a registration.
    if((a.reg&&String(a.reg).toUpperCase()!==String(media.registration).toUpperCase())||(a.reg&&!liveReg)||(liveReg&&liveReg!==String(media.registration).toUpperCase()))continue;
    if(typeof media.url!=='string'||!/^https:\/\/[^\s/]+\//i.test(media.url)||!media.license||!media.attribution)continue;
    verified.add(String(media.id).toLowerCase());
    window.dispatchEvent(new CustomEvent('doaa:airframe-media',{detail:media}));
   }
   if(recent)scheduleDiscovery(aircraft,verified);
  }catch{lastQuery='';}finally{inflight=false}
 }
 window.addEventListener('doaa:ambient-enter',poll);
 window.addEventListener('doaa:ambient-mode',poll);
 setInterval(poll,30000);
})();
