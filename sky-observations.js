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
   const lat=raw.lat==null||raw.lat===''?NaN:Number(raw.lat),lon=raw.lon==null||raw.lon===''?NaN:Number(raw.lon);
   if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180)continue;
   const id=String(raw.id||raw.hex||'').trim().toLowerCase();
   if(!id)continue;
   const explicit=raw._doaa_observed_at;
   const ageSeconds=raw.seen_pos??raw.seen;
   const observedAt=explicit!=null&&explicit!==''&&Number.isFinite(Number(explicit))?Number(explicit):ageSeconds!=null&&ageSeconds!==''&&Number.isFinite(Number(ageSeconds))?timestamp-Number(ageSeconds)*1000:null;
   if(!Number.isFinite(observedAt)||observedAt<=0||observedAt>receivedAt+60000||receivedAt-observedAt>=90000)continue;
   aircraft.push({...raw,id,lat,lon,ground:raw.ground===true,observedAt,receivedAt});
  }
  return Object.freeze({aircraft,observedAt:validTime?timestamp:null,receivedAt,provider:typeof response?.provider==='string'?response.provider:null,state:!validTime?'unknown':fresh?'fresh':'stale'});
 }
 return Object.freeze({fromTraffic});
});
