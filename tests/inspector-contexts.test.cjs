'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../flight-enrichment.js'),'utf8');
function extract(name,next){const start=source.indexOf('function '+name+'(');assert.ok(start>=0,name+' exists');const end=source.indexOf('function '+next+'(',start+1);assert.ok(end>start,'next function '+next+' exists');return source.slice(start,end);}
test('Inspector tabs follow locked Contact, Flight, and Airframe contexts',()=>{
 const context=vm.createContext({});
 vm.runInContext(extract('inspectorNav','shell'),context);
 for(const [surface,labels] of [
 ['contact','Overview,Journey,Track History'],
 ['flight','Overview,Timing,Progress,Journey'],
 ['timing','Overview,Timing,Progress,Journey'],
 ['flight-journey','Overview,Timing,Progress,Journey'],
 ['aircraft','Overview,BIO,Operations,Media,Sightings'],
 ['operations','Overview,BIO,Operations,Media,Sightings']
 ])assert.equal(Array.from(context.inspectorNav(surface),v=>v[0]).join(','),labels);
});
test('all contextual tabs have render paths and do not silently fall back to Contact',()=>{
 const nav=extract('inspectorNav','shell');
 const render=extract('renderSurface','swipeInspector');
 for(const surface of ['timing','progress','flight-journey','contact-journey','track-history','operations'])assert.match(render,new RegExp("z==='"+surface+"'"));
 for(const surface of ['flight','aircraft','bio','media','history'])assert.match(render,new RegExp("z==='"+surface+"'"));
 assert.match(nav,/Track History/);
});
test('Flight progress is gated by observation provenance and timing preserves unknowns',()=>{
 const render=extract('renderSurface','swipeInspector');
 assert.match(render,/live\?'RECENT':'NOT CURRENTLY OBSERVED'/);
 assert.match(render,/live&&a\.alt!=null/);
 assert.match(render,/live&&a\.gs!=null/);
 assert.match(render,/hm\(t\.arr_estimated\)\|\|'UNKNOWN'/);
 assert.match(render,/hm\(t\.arr_actual\)\|\|'UNKNOWN'/);
});
test('Flight and Contact Journey use the same evidence-qualified chronology',()=>{
 const render=extract('renderSurface','swipeInspector');
 assert.equal((render.match(/journeySection\(a,f,history,dossier\?\.journey\)/g)||[]).length,2);
 const journey=extract('journeySection','doaaHistory');
 assert.match(journey,/adjacency_established===true/);
 assert.match(journey,/current_assignment_established===true/);
});
