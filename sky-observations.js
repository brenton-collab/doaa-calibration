/* SKY observation adapter: accepts only externally supplied, time-bounded evidence. No network side effects. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAASkyObservations=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 function fromTraffic(response,receivedAt=Date.now()){
  const timestamp=Number(response?.now);
  const validTime=Number.isFinite(timestamp)&&timestamp>0&&timestamp<=receivedAt+60000;
  const age=validTime?receivedAt-timestamp:Infinity;
  const fresh=validTime&&age>=-60000&&age<90000;
  const aircraft=[];
  if(fresh&&Array.isArray(response.aircraft))for(const raw of response.aircraft){
   const lat=Number(raw.lat),lon=Number(raw.lon);
   if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180)continue;
   const id=String(raw.id||raw.hex||'').trim().toLowerCase();
   if(!id)continue;
   aircraft.push({...raw,id,lat,lon,ground:raw.ground===true,observedAt:timestamp,receivedAt});
  }
  return Object.freeze({aircraft,observedAt:validTime?timestamp:null,receivedAt,provider:typeof response?.provider==='string'?response.provider:null,state:!validTime?'unknown':fresh?'fresh':'stale'});
 }
 return Object.freeze({fromTraffic});
});
