(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAAAirportWeather=api;})(globalThis,function(){
 'use strict';
 // AWC OpenAPI: obsTime seconds; wind knots/true degrees; visibility SM;
 // cloud base feet; temperature Celsius; altimeter setting hPa.
 const number=v=>v==null||typeof v==='boolean'||String(v).trim()===''?null:Number.isFinite(Number(v))?Number(v):null;
 const positive=v=>{const n=number(v);return n!=null&&n>=0?n:null;};
 function decode(m,station,now=Date.now()){
  if(!m||typeof m!=='object'||Array.isArray(m))return{available:false,reason:'No current METAR available'};
  if(!/^[A-Z0-9]{4}$/.test(String(station||'').toUpperCase())||String(m.icaoId||'').toUpperCase()!==String(station||'').toUpperCase())return{available:false,reason:'Observation station does not match this airport'};
  const seconds=positive(m.obsTime),at=seconds>0&&seconds*1000<=8640000000000000?seconds*1000:null,age=at==null?null:now-at;
  const freshness=age==null?'TIME UNKNOWN':age < -60000?'FUTURE TIME — CHECK SOURCE':age>90*60000?'STALE OBSERVATION':'RECENT OBSERVATION';
  const direction=number(m.wdir),wind=positive(m.wspd),gust=positive(m.wgst),variable=String(m.wdir).toUpperCase()==='VRB';
  const visibility=String(m.visib??'').trim().match(/^(\d+(?:\.\d+)?)(\+)?$/),clouds=Array.isArray(m.clouds)?m.clouds:[];
  const ceilingLayers=clouds.filter(c=>['BKN','OVC','OVX','VV'].includes(c.cover)),bases=ceilingLayers.map(c=>positive(c.base));
  const knownClouds=clouds.length>0&&clouds.every(c=>['CLR','CAVOK','SKC','NSC','NCD','FEW','SCT','BKN','OVC','OVX','VV'].includes(c.cover));
  return{available:true,at,freshness,wind,gust,direction:direction!=null&&direction>=0&&direction<=360?direction:null,variable,
   visibility:visibility?Number(visibility[1]):null,visibilityLowerBound:!!visibility?.[2],
   ceiling:bases.length&&bases.every(b=>b!=null)?Math.min(...bases):null,noReportedCeiling:knownClouds&&!ceilingLayers.length,
   temperature:number(m.temp),dewpoint:number(m.dewp),pressure:positive(m.altim),category:['VFR','MVFR','IFR','LIFR'].includes(m.fltCat)?m.fltCat:'UNKNOWN',
   raw:String(m.rawOb||''),presentWeather:String(m.wxString||''),clouds:clouds.map(c=>({cover:String(c.cover||'UNKNOWN'),base:positive(c.base)}))};
 }
 return{decode};
});
