'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),core=require('../sky-map-core.js');
test('fixed altitude palette prefers barometric then geometric; unknown is grey and bounds clamp',()=>{
 assert.deepEqual(core.altitude({alt_baro:0,alt_geom:300}),{value:0,basis:'barometric'});
 assert.equal(core.altitude({alt_baro:null,alt_geom:12000}).basis,'geometric');
 assert.equal(core.altitude({alt:8000}).basis,'reported; type unspecified');
 assert.deepEqual(core.colour({}),[112,124,132]);assert.deepEqual(core.colour({alt:-500}),core.colour({alt:0}));assert.deepEqual(core.colour({alt:60000}),core.colour({alt:45000}));
 assert.notDeepEqual(core.colour({alt:0}),core.colour({alt:45000}));
});
test('rolling one-hour history survives empty acquisition and expires on real elapsed time',()=>{
 const now=4e9,p=(t,lat=45)=>({t,lat,lon:-75,alt:8000}),before=new Map([['c00001',{points:[p(now-core.HOUR-1),p(now-20000),p(now-10000)],lastSeen:now-10000}]]);
 const retained=core.mergeTrails(before,new Map(),now);assert.equal(retained.get('c00001').points.length,2);
 assert.equal(core.mergeTrails(retained,new Map(),now+core.HOUR).size,0);
 const next=new Map([['c00001',{points:[p(now-10000,46),p(now+1000),p(now,91),p(now)]}]]);
 const merged=core.mergeTrails(retained,next,now);assert.deepEqual(merged.get('c00001').points.map(p=>p.t),[now-20000,now-10000,now]);assert.equal(merged.get('c00001').points[1].lat,46);
 assert.ok(core.alpha(now-5000,now)>core.alpha(now-3000000,now));assert.equal(core.alpha(now-core.HOUR,now),0);assert.equal(core.alpha(now+1,now),0);
 assert.ok(core.alpha(now-5000,now,true)>core.alpha(now-5000,now));
});
test('follow uses only fresh supported coordinates and reliable reported direction',()=>{
 const now=4e9,a={id:'c00001',lat:45,lon:-75,observed_at:now-1000,trk:90};assert.equal(core.fresh(a,now),true);
 for(const change of [{_pinned:true},{observed_at:null},{observed_at:now+1},{observed_at:now-90000},{id:'airport:cyow'},{lat:91},{ground:true}])assert.equal(core.fresh({...a,...change},now),false);
 const rect={left:100,right:500,top:200,bottom:600};assert.deepEqual(core.target({...a,trk:null},rect),{x:300,y:400});assert.ok(core.target(a,rect).x<300);assert.equal(core.target(a,rect).y,400);
});
