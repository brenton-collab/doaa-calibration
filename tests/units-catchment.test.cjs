'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),U=require('../units.js'),{Context,valid}=require('../catchment-core.js');
const yow={icao:'CYOW',lat:45.32,lon:-75.67},yhz={icao:'CYHZ',lat:44.88,lon:-63.51},yul={icao:'CYUL',lat:45.47,lon:-73.74};
test('canonical aviation quantities convert independently with honest unknowns',()=>{
 assert.equal(U.convert(10,'distance','km'),18.52);assert.ok(Math.abs(U.convert(100,'speed','km/h')-185.2)<1e-9);assert.equal(U.convert(1000,'altitude','m'),304.8);assert.equal(U.convert(0,'temperature','°F'),32);assert.equal(U.convert(-40,'temperature','°F'),-40);assert.ok(Math.abs(U.convert(1013.25,'pressure','inHg')-29.9213)<.0001);assert.equal(U.convert(1,'visibility','m'),1609.344);assert.equal(U.convert(600,'verticalSpeed','m/s'),3.048);
 for(const unknown of [null,undefined,'',NaN,Infinity,true])assert.equal(U.convert(unknown,'altitude','m'),null);
 assert.equal(U.format(0,'altitude',{unit:'m'}),'0 m');assert.equal(U.format(null,'speed'),'UNKNOWN');
 U.set({altitude:'m',speed:'km/h',distance:'bogus'});assert.equal(U.format(1000,'altitude'),'305 m');assert.equal(U.format(100,'speed'),'185 km/h');assert.equal(U.unit('distance'),'NM');U.set(U.defaults);
});
test('exploration and radius do not change saved Home; setting Home preserves camera context',()=>{
 const c=new Context(yow,45);c.explore(yhz);c.setRadius(70);assert.deepEqual(c.home,yow);assert.equal(c.homeRadius,45);c.setHome(yul);assert.deepEqual(c.active,yhz);assert.equal(c.radius,70);c.returnHome();assert.deepEqual(c.active,yul);assert.equal(c.radius,45);assert.equal(c.exploring,false);c.setRadius(60);assert.equal(c.homeRadius,60);
});
test('fresh launch starts at Home and retains bounded deduplicated recents',()=>{
 const c=new Context(yow,45);c.explore(yhz);c.explore(yul);c.explore(yhz);assert.deepEqual(c.recent.map(x=>x.icao),['CYHZ','CYUL']);const fresh=new Context(c.home,c.homeRadius,c.recent);assert.deepEqual(fresh.active,yow);assert.equal(fresh.exploring,false);assert.deepEqual(fresh.recent,c.recent);for(const ap of [{...yow,lat:null},{...yow,lon:181},{...yow,icao:'<svg>'}]){assert.ok(!valid(ap));assert.throws(()=>c.explore(ap));}
});
