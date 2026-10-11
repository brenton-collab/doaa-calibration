(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DOAAMovementCore=api;})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
const text=v=>String(v??'').trim();
function instant(v){if(typeof v==='number')return Number.isFinite(v)&&v>0&&v<8640000000000000?v:null;const s=text(v);if(!/^\d{4}-\d\d-\d\dT\d\d:\d\d(?::\d\d(?:\.\d+)?)?(?:Z|[+-]\d\d:\d\d)$/.test(s))return null;const n=Date.parse(s);return Number.isFinite(n)?n:null;}
function zone(airport){const z=text(airport?.timezone||airport?.time_zone);try{if(z){new Intl.DateTimeFormat('en',{timeZone:z}).format();return {name:z,known:true};}}catch{}return {name:'UTC',known:false};}
function date(at,z='UTC'){if(instant(at)==null)return null;return new Intl.DateTimeFormat('en-CA',{timeZone:z,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(at));}
function clock(at,z='UTC'){return instant(at)==null?'TIME UNKNOWN':new Intl.DateTimeFormat('en-GB',{timeZone:z,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(at));}
function shift(day,delta){if(!/^\d{4}-\d\d-\d\d$/.test(day))return null;const n=Date.parse(day+'T12:00:00Z');if(!Number.isFinite(n)||new Date(n).toISOString().slice(0,10)!==day)return null;return new Date(n+delta*86400000).toISOString().slice(0,10);}
function normalize(raw,snapshot,airport){
 const direction=['ARR','DEP'].includes(raw.board_direction)?raw.board_direction:raw.direction==='arrival'?'ARR':raw.direction==='departure'?'DEP':'UNKNOWN';
 const scheduled=instant(raw.scheduled_at||(direction==='ARR'?raw.arr_time:raw.dep_time));
 const published=raw.provenance?.kind==='airport_schedule'||raw.evidence?.kind==='airport_schedule'||raw.evidence_types?.includes('Published');
 const observed=instant(raw.observed_at)||instant(snapshot.at),hex=/^[a-f0-9]{6}$/i.test(text(raw.hex))?text(raw.hex).toLowerCase():null;
 const recorded=!!(hex&&observed!=null),inferred=!!raw.inference||raw.evidence_types?.includes('Inferred');
 const types=[...(published?['Published']:[]),...(recorded?['Recorded']:[]),...(inferred?['Inferred']:[])];
 const anchor=published&&scheduled!=null?scheduled:observed;
 const z=zone(airport),day=date(anchor,z.name),flight=text(raw.flight_number||raw.flight_iata||raw.flight_icao),id=text(raw.movement_id||raw.id)||[airport.icao||airport.iata,direction,day||'undated',published&&scheduled!=null?flight+':'+scheduled:hex||flight||JSON.stringify(raw.evidence||{})].join(':');
 const actual=instant(raw.actual_at||(direction==='ARR'?raw.arr_actual:raw.dep_actual)),estimated=instant(raw.estimated_at||(direction==='ARR'?raw.arr_estimated:raw.dep_estimated));
 const verifiedFlight=published||raw.current_assignment_established===true;
 const target=verifiedFlight&&flight?'flight':recorded?'contact':'provisional';
 const route=[raw.dep_icao||raw.dep_iata,raw.arr_icao||raw.arr_iata].filter(Boolean).join(' → ')||text(raw.other_airport)||'ROUTE UNKNOWN';
 const evidence=types.map(kind=>({kind,source:text(kind==='Published'?raw.provenance?.source:raw.evidence?.source||raw.source||snapshot.source)||'SOURCE UNKNOWN',at:kind==='Published'?instant(raw.provenance?.observed_at||raw.retrieved_at):observed,method:kind==='Inferred'?(raw.inference==='ITINERARY'?'Reported route association; current operation is unverified':raw.evidence?.method||'Track trend relative to airport; not proof of takeoff or landing'):kind==='Recorded'?'Timestamped ADS-B Contact; airport movement not confirmed':'Published operation; completion not confirmed',support:raw.evidence||{},confidence:raw.evidence?.confidence||'NOT QUANTIFIED'}));
 return {id,direction,flight:flight||text(raw.reg_number)||hex||'UNIDENTIFIED',route,anchor,day,scheduled:published?scheduled:null,actual:verifiedFlight?actual:null,estimated:verifiedFlight?estimated:null,observed,types,target,hex,status:verifiedFlight?text(raw.status)||'STATE UNKNOWN':inferred?'AIRPORT ASSOCIATION UNVERIFIED':'OBSERVED CONTACT',evidence,raw};
}
function merge(previous,incoming){const byId=new Map(previous.map(r=>[r.id,r]));for(const row of incoming){const old=byId.get(row.id);byId.set(row.id,old&&old.scheduled==null&&row.scheduled==null?{...row,anchor:old.anchor,day:old.day}:row);}return [...byId.values()].sort((a,b)=>(a.anchor??Infinity)-(b.anchor??Infinity)||a.id.localeCompare(b.id)).slice(-512);}
function filter(rows,{day,direction='ALL',evidence='ALL'}={}){return rows.filter(r=>(!day||r.day===day)&&(direction==='ALL'||r.direction===direction)&&(evidence==='ALL'||r.types.includes(evidence)));}
function signature(rows){return JSON.stringify(rows.map(r=>[r.id,r.status,r.actual,r.estimated,r.types,r.route]));}
return {instant,zone,date,clock,shift,normalize,merge,filter,signature};
});
