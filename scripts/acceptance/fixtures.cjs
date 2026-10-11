'use strict';
// Entirely synthetic. These records and illustrations are never sent to a real API.
const contacts = [
 {hex:'c00001',flight:'TEST101',r:'C-TEST',t:'E295',lat:45.36,lon:-75.62,alt_baro:3200,gs:145,track:210,baro_rate:-600,squawk:'7700',seen_pos:0},
 {hex:'c00002',flight:'TEST202',r:'C-DEMO',t:'DH8D',lat:45.4,lon:-75.7,alt_baro:null,gs:null,track:null,baro_rate:null,seen_pos:0}
];
const imageUrl = id => 'https://doaa.fixture.invalid/'+id+'.svg';
const media = a => ({id:a.hex,registration:a.r,url:imageUrl(a.hex),license:'Test fixture only',attribution:'DOAA acceptance fixture',page:null,specificity:'exact-airframe'});
function flight(a){return {flight_icao:a.flight,flight_iata:a.flight,reg_number:a.r,aircraft_icao:a.t,dep_iata:'YYZ',arr_iata:'YOW',airline_name:'Acceptance Fixture Air',status:'en-route',resolution:'fixture'};}
function dossier(a){return {ok:true,identity:{registration:a.r,icao_type:a.t},flight:flight(a),airframe:{reg_number:a.r,icao:a.t,model:a.t==='E295'?'Embraer E195-E2':'Dash 8-400'},memory:{claims:[],identifiers:[]},history:{encounter_count:1,observation_count:2,encounters:[]},media:{image:imageUrl(a.hex),specificity:'exact-airframe',license:'Test fixture only',credit:'DOAA acceptance fixture'},obv:[]};}
function traffic(now,records=contacts){return {ok:true,now,provider:'LOCAL FIXTURE',aircraft:records,tracks:Object.fromEntries(records.map(a=>[a.hex,{firstSeen:now-10000,lastSeen:now,points:[{lat:a.lat-.02,lon:a.lon-.02,t:now-10000,alt:a.alt_baro},{lat:a.lat,lon:a.lon,t:now,alt:a.alt_baro}]}]))};}
function board(records=contacts){return {ok:true,coverage:'observed',itinerary_count:records.length,inferred_count:0,flights:records.map(a=>({...flight(a),hex:a.hex,lat:a.lat,lng:a.lon,alt:a.alt_baro,speed:a.gs,dir:a.track,board_units:'adsb',board_direction:'ARR',inference:'ITINERARY'}))};}
function illustration(id){return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900"><rect width="1400" height="900" fill="${id==='c00001'?'#214a65':'#3c5760'}"/><path d="M0 640L420 510 860 630 1400 440V900H0" fill="#102d40"/><circle cx="1000" cy="240" r="100" fill="#9fc1ca" opacity=".25"/><text x="700" y="450" text-anchor="middle" fill="#d2e3e8" font-family="sans-serif" font-size="32">SIMULATED</text><text x="700" y="490" text-anchor="middle" fill="#d2e3e8" font-family="sans-serif" font-size="20">ACCEPTANCE FIXTURE · ${id}</text></svg>`;}
module.exports={contacts,media,flight,dossier,traffic,board,illustration,imageUrl};
