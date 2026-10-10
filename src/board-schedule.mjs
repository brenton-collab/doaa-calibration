/**
 * DOAA BOARD schedule contract — source-neutral, no network or D1 dependency.
 * A schedule flight is NOT an aircraft and is never assigned a hex by this adapter.
 * Dates/times must be ISO 8601 with explicit timezone offset or Z.
 */
const CODE=/^[A-Z0-9]{2,4}$/;
const FLIGHT=/^[A-Z0-9]{2,3}\s?\d{1,5}[A-Z]?$/;
const DIRECTIONS=new Set(['arrival','departure']);
const STATES=new Set(['scheduled','on_time','delayed','boarding','departed','en_route','landed','cancelled','diverted','unknown']);
const clean=(v,max=100)=>String(v??'').trim().slice(0,max);
const iso=v=>{if(!v)return null;const s=clean(v,40);return /^\d{4}-\d\d-\d\dT\d\d:\d\d(?::\d\d(?:\.\d{1,3})?)?(?:Z|[+-]\d\d:\d\d)$/.test(s)&&Number.isFinite(Date.parse(s))?new Date(s).toISOString():null};
export function normalizeScheduleFlight(row,source){
 if(!row||typeof row!=='object')throw Error('Invalid schedule row');
 const direction=clean(row.direction).toLowerCase();
 if(!DIRECTIONS.has(direction))throw Error('Invalid direction');
 const flightNumber=clean(row.flight_number,12).replace(/\s+/g,'').toUpperCase();
 if(!FLIGHT.test(flightNumber))throw Error('Invalid flight number');
 const scheduledAt=iso(row.scheduled_at);
 if(!scheduledAt)throw Error('Scheduled time requires timezone');
 const otherAirport=clean(row.other_airport,4).toUpperCase();
 if(!CODE.test(otherAirport))throw Error('Invalid origin/destination');
 const status=clean(row.status,24).toLowerCase();
 const date=scheduledAt.slice(0,10);
 const sourceId=clean(source,40);
 if(!sourceId)throw Error('Missing source');
 return Object.freeze({
  id:['YOW',direction,date,flightNumber,scheduledAt].join(':'),
  airport:'YOW',direction,flight_number:flightNumber,
  other_airport:otherAirport,other_airport_name:clean(row.other_airport_name)||null,
  airline:clean(row.airline)||null,
  scheduled_at:scheduledAt,estimated_at:iso(row.estimated_at),actual_at:iso(row.actual_at),
  gate:clean(row.gate,12)||null,carousel:clean(row.carousel,12)||null,
  status:STATES.has(status)?status:'unknown',
  raw_status:status&&!STATES.has(status)?clean(row.status,60):null,
  codeshares:Array.isArray(row.codeshares)?[...new Set(row.codeshares.map(v=>clean(v,12).replace(/\s+/g,'').toUpperCase()).filter(v=>FLIGHT.test(v)&&v!==flightNumber))]:[],
  provenance:{source:sourceId,kind:'airport_schedule',observed_at:iso(row.observed_at)},
  aircraft_match:null
 });
}
export function normalizeScheduleSnapshot(rows,{source,observed_at}={}){
 if(!Array.isArray(rows))throw Error('Schedule payload must be an array');
 const byId=new Map(),errors=[];
 rows.forEach((row,index)=>{try{
  const flight=normalizeScheduleFlight({...row,observed_at:row?.observed_at||observed_at},source);
  if(byId.has(flight.id))errors.push({index,reason:'duplicate'});else byId.set(flight.id,flight);
 }catch(e){errors.push({index,reason:e.message})}});
 const flights=[...byId.values()].sort((a,b)=>a.scheduled_at.localeCompare(b.scheduled_at));
 return {ok:true,airport:'YOW',source,observed_at:iso(observed_at),flights,invalid_count:errors.length,errors};
}
