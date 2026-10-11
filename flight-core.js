(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.DOAAFlightCore=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const number=v=>v==null||v===''||typeof v==='boolean'||!Number.isFinite(Number(v))?null:Number(v);
function time(value){
 if(value==null||value==='')return{state:'unavailable',raw:null,at:null,label:'NOT AVAILABLE'};
 const raw=String(value),m=raw.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:?\d{2})$/);
 if(!m)return{state:'unresolved',raw,at:null,label:raw+' · DATE / TIMEZONE UNRESOLVED'};
 const [year,month,day,hour,minute,second]=m.slice(1,7).map(x=>Number(x||0)),calendar=new Date(Date.UTC(year,month-1,day));
 const at=Date.parse(raw.replace(' ','T'));
 if(!Number.isFinite(at)||calendar.getUTCFullYear()!==year||calendar.getUTCMonth()!==month-1||calendar.getUTCDate()!==day||hour>23||minute>59||second>59)return{state:'invalid',raw,at:null,label:'INVALID SOURCE TIME'};
 return{state:'known',raw,at,label:new Date(at).toISOString().replace('T',' ').replace(/\.\d{3}Z$/,' UTC')};
}
function punctuality(scheduled,actual,estimated,basis={},now=Date.now()){
 const value=actual.at!=null?actual:estimated.at!=null?estimated:null,isActual=value===actual;
 if(scheduled.at==null||!value)return{state:'unknown',minutes:null,label:'NOT ESTABLISHED'};
 if(isActual&&value.at>now+60000)return{state:'future-actual',minutes:null,label:'ACTUAL TIME IS IN THE FUTURE · UNVERIFIED'};
 const left=basis.scheduled||'departure/arrival',right=isActual?basis.actual:basis.estimated;
 if(right&&left!==right)return{state:'incomparable',minutes:null,label:'EVENT BASES DIFFER · NOT COMPARABLE'};
 const minutes=Math.round((value.at-scheduled.at)/60000),prefix=isActual?'ACTUAL':'ESTIMATED';
 return{state:isActual?'actual':'estimated',minutes,label:prefix+' · '+(minutes===0?'ON TIME':Math.abs(minutes)+' MIN '+(minutes>0?'LATE':'EARLY'))};
}
function timing(f={},now=Date.now()){
 const result={};
 for(const side of ['dep','arr']){
  const scheduled=time(f[side+'_time']),estimated=time(f[side+'_estimated']),actual=time(f[side+'_actual']);
  result[side]={scheduled,estimated,actual,basis:{scheduled:f[side+'_scheduled_basis']||null,estimated:f[side+'_estimated_basis']||null,actual:f[side+'_actual_basis']||null},source:f[side+'_time_source']||f.source||'SOURCE NOT RECORDED'};
  result[side].punctuality=punctuality(scheduled,actual,estimated,result[side].basis,now);
 }
 const off=time(f.dep_off_block),takeoff=time(f.dep_takeoff),landing=time(f.arr_landing),on=time(f.arr_on_block);
 result.events={off,takeoff,landing,on};
 result.airborneMinutes=takeoff.at!=null&&takeoff.at<=now&&(landing.at==null||landing.at>=takeoff.at)?Math.floor(((landing.at!=null&&landing.at<=now?landing.at:now)-takeoff.at)/60000):null;
 result.remainingMinutes=result.arr.actual.at==null&&result.arr.estimated.at!=null&&result.arr.estimated.at>=now?Math.ceil((result.arr.estimated.at-now)/60000):null;
 return result;
}
function position(a){const lat=number(a?.lat),lon=number(a?.lon);return lat!=null&&lon!=null&&Math.abs(lat)<=90&&Math.abs(lon)<=180?{lat,lon}:null;}
function observation(a={},live=false,now=Date.now()){
 const n=number(a.observed_at),at=n!=null&&n>0&&n<=8640000000000000?n:typeof a.observed_at==='string'?time(a.observed_at).at:null,age=at==null?null:(now-at)/1000;
 const freshness=age==null?'TIME UNKNOWN':age<-60?'FUTURE TIME · UNVERIFIED':!live?'LAST OBSERVED':age>90?'STALE OBSERVATION':'RECENT OBSERVATION';
 const vr=number(a.vr),ground=a.on_ground===true||a.on_ground===1?true:a.on_ground===false||a.on_ground===0?false:null;
 const current=live&&age!=null&&age>=-60&&age<=90;const phase=!live?'NOT CURRENTLY OBSERVED':ground===true?'REPORTED ON GROUND':vr==null?'UNKNOWN':vr>200?'CLIMBING · VERTICAL TREND':vr<-200?'DESCENDING · VERTICAL TREND':'LEVEL · VERTICAL TREND';return{at,age,freshness,current,position:position(a),phase:live&&!current&&phase!=='UNKNOWN'?'LAST REPORTED · '+phase:phase,phaseBasis:ground===true?'Explicit ground report. Taxi, takeoff and landing are not established.':'One reported vertical-rate sample, not a detector of cruise, approach, touchdown or pilot intent.'};
}
const rad=Math.PI/180,R=3440.065;
function angular(a,b){const dlat=(b.lat-a.lat)*rad,dlon=(b.lon-a.lon)*rad,q=Math.sin(dlat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dlon/2)**2;return 2*Math.asin(Math.sqrt(Math.min(1,q)));}
function bearing(a,b){const p=a.lat*rad,q=b.lat*rad,d=(b.lon-a.lon)*rad;return Math.atan2(Math.sin(d)*Math.cos(q),Math.cos(p)*Math.sin(q)-Math.sin(p)*Math.cos(q)*Math.cos(d));}
function route(f={},a={},live=false,now=Date.now()){
 const origin=position({lat:f.dep_lat,lon:f.dep_lon}),destination=position({lat:f.arr_lat,lon:f.arr_lon}),obs=observation(a,live,now);
 const distance=origin&&destination?angular(origin,destination):null;
 const result={origin,destination,observation:obs,distanceNm:distance==null?null:distance*R,fraction:null,crossTrackNm:null,reason:'ROUTE ENDPOINT GEOMETRY NOT AVAILABLE'};
 if(distance==null||distance<1e-6)return result;
 result.reason='ROUTE ASSOCIATION · CURRENT ASSIGNMENT NOT VERIFIED';
 if(f.current_assignment_established!==true)return result;
 if(!obs.current||!obs.position){result.reason=obs.position?'CURRENT POSITION NOT ESTABLISHED':'POSITION NOT AVAILABLE';return result;}
 const d=angular(origin,obs.position),difference=bearing(origin,obs.position)-bearing(origin,destination),cross=Math.asin(Math.max(-1,Math.min(1,Math.sin(d)*Math.sin(difference)))),along=Math.atan2(Math.sin(d)*Math.cos(difference),Math.cos(d));
 result.crossTrackNm=Math.abs(cross)*R;
 if(along<0||along>distance||result.crossTrackNm>Math.max(20,distance*R*.1)){result.reason='POSITION OUTSIDE ROUTE CORRIDOR · PROGRESS UNKNOWN';return result;}
 result.fraction=along/distance;result.reason='GEOGRAPHIC PROGRESS · NOT TIME ELAPSED OR FLIGHT PLAN';return result;
}
function layout(route){
 if(!route.origin||!route.destination)return null;
 const wrap=(x,center)=>center+((x-center+540)%360)-180;
 const points=[route.origin,route.destination,...(route.observation.position?[route.observation.position]:[])],center=route.origin.lon,lat=points.reduce((sum,p)=>sum+p.lat,0)/points.length,cos=Math.max(.02,Math.cos(lat*rad)),project=p=>({x:(wrap(p.lon,center)-center)*cos,y:-p.lat}),xy=points.map(project),minx=Math.min(...xy.map(p=>p.x)),maxx=Math.max(...xy.map(p=>p.x)),miny=Math.min(...xy.map(p=>p.y)),maxy=Math.max(...xy.map(p=>p.y)),scale=Math.min(260/Math.max(.01,maxx-minx),130/Math.max(.01,maxy-miny)),plot=p=>{const q=project(p);return{x:160+(q.x-(minx+maxx)/2)*scale,y:100+(q.y-(miny+maxy)/2)*scale};};
 return{origin:plot(route.origin),destination:plot(route.destination),aircraft:route.observation.position?plot(route.observation.position):null};
}
function field(dossier,predicates,fallback){
 const keys=Array.isArray(predicates)?predicates:[predicates],claims=(dossier?.claims||[]).filter(q=>keys.includes(q.predicate)&&q.status!=='superseded'&&q.value_text!=null&&q.value_text!==''),supported=claims.filter(q=>q.status!=='inferred'),values=[...new Set(supported.map(q=>String(q.value_text)))];
 if(values.length>1||supported.some(q=>q.status==='conflicting'))return{state:'conflicting',value:'CONFLICTING',claims:supported};
 if(values.length===1)return{state:'supported',value:values[0],claims:supported};
 if(fallback!=null&&fallback!=='')return{state:'reported',value:String(fallback),claims:[]};
 if(claims.length)return{state:'inferred',value:String(claims[0].value_text)+' · INFERRED',claims};
 return{state:'unknown',value:'UNKNOWN',claims:[]};
}
return{number,time,punctuality,timing,position,observation,route,layout,field};
});
