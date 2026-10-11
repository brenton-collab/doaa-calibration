'use strict';
// Explicit local command, never part of a provider/CI/deployment job.
// DOAA_PLAYWRIGHT_MODULE=/path/to/playwright DOAA_CHROMIUM=/path/to/chromium node scripts/browser-acceptance.cjs
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.DOAA_PLAYWRIGHT_MODULE||'playwright');
const fixture=require('./acceptance/fixtures.cjs');
const root=path.resolve(__dirname,'..');
const output=path.resolve(process.env.DOAA_ACCEPTANCE_OUTPUT||path.join(root,'tmp/acceptance'));
fs.mkdirSync(output,{recursive:true});
const assets=new Set(['index.html','vector-base.js','flight-enrichment.js','ambient.js','ambient.css','ambient-media.js','look.js']);
const report={environment:'Real headless Chromium; local static assets; all aviation APIs, imagery and clock changes simulated; external map services blocked',checks:[],requests:[],pageErrors:[],externalBlocked:[]};
let browser,server;
async function check(name,fn){try{await fn();report.checks.push({name,passed:true});console.log('PASS',name)}catch(e){report.checks.push({name,passed:false,error:String(e.message).slice(0,1400)});console.log('FAIL',name,String(e.message).slice(0,200))}}
async function session(viewport={width:1440,height:1000}){
 const context=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await context.newPage();
 // Capture application timers before any script schedules them.
 await page.clock.install();
 page.setDefaultTimeout(6000);
 const state={records:structuredClone(fixture.contacts),board:fixture.board(),trafficFailed:false,boardFailed:false,dossierFailed:false,flightFailed:false,provider:'LOCAL FIXTURE',photoHold:new Map(),photoRequests:new Set(),photoFailed:new Set(),dossierHold:new Map(),searchHold:new Map(),searchRequests:new Set(),airportHold:new Map()};
 page.on('pageerror',e=>report.pageErrors.push(String(e)));
 await page.route('**/*',async route=>{
  const u=new URL(route.request().url());
  if(u.hostname==='doaa.fixture.invalid'){
   const id=path.basename(u.pathname,'.svg');
   state.photoRequests.add(id);
   if(state.photoHold.has(id))await state.photoHold.get(id).promise;
   if(state.photoFailed.has(id))return route.abort('failed');
   return route.fulfill({contentType:'image/svg+xml',body:fixture.illustration(id)});
  }
  if(u.origin!==base){report.externalBlocked.push(u.origin);return route.abort('blockedbyclient')}
  if(!/^\/(api|memory)\//.test(u.pathname))return route.continue();
  report.requests.push({path:u.pathname,method:route.request().method()});
  assert.equal(route.request().method(),'GET','Acceptance must not exercise a real mutation');
  let body={ok:true,found:false},status=200;
  const known=state.records.find(a=>a.hex===(u.searchParams.get('hex')||'').toLowerCase()),a=known||{hex:u.searchParams.get('hex'),flight:u.searchParams.get('call'),r:u.searchParams.get('reg'),t:u.searchParams.get('type')};
  if(u.pathname==='/api/traffic'){body={...fixture.traffic(await page.evaluate(()=>Date.now()),state.records),provider:state.provider};if(state.trafficFailed){status=503;body={ok:false,error:'Simulated outage'}}}
  else if(u.pathname==='/api/board'){body=state.board;if(state.boardFailed){status=503;body={ok:false,error:'Simulated BOARD outage'}}}
  else if(u.pathname==='/api/dossier'){
   if(state.dossierHold.has(a.hex))await state.dossierHold.get(a.hex).promise;
   body=known?fixture.dossier(a):{ok:true,identity:{registration:a.r,icao_type:a.t},airframe:{reg_number:a.r,icao:a.t},memory:{claims:[],identifiers:[]},history:{encounter_count:2},obv:[]};
   if(state.dossierFailed){status=503;body={ok:false,error:'Simulated enrichment outage'}}
  }
  else if(u.pathname==='/api/flight'){body={ok:true,found:Boolean(known),flight:known?fixture.flight(a):null};if(state.flightFailed){status=503;body={ok:false,error:'Simulated flight outage'}}}
  else if(u.pathname==='/api/ambient-media')body={ok:true,media:state.records.map(fixture.media)};
  else if(u.pathname==='/api/journey')body={ok:true,chronology:[]};
  else if(u.pathname==='/api/ops')body={ok:true,health:{},state:{},meter:{requests:0}};
  else if(u.pathname==='/api/airport'){
   if(state.airportHold.has(u.searchParams.get('icao')))await state.airportHold.get(u.searchParams.get('icao')).promise;
   body={ok:true,metar:{rawOb:'CYOW 102000Z 21008KT 15SM FEW040 12/08 A3004',wdir:210,wspd:8,visib:15,fltCat:'VFR'}};
  }
  else if(u.pathname==='/api/search'){
   const q=u.searchParams.get('q');state.searchRequests.add(q);
   if(state.searchHold.has(q))await state.searchHold.get(q).promise;
   body={ok:true,results:[{kind:'airframe',scope:'local',icao24:'c00003',canonical_key:'c00003',registration:'C-PAST',encounter_count:2,last_seen_at:'2026-10-01T12:00:00Z',icao_type:'C172'}]};
  }
  return route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});
 });
 await page.goto(base,{waitUntil:'load'});
 await page.waitForFunction(()=>window.DOAALiveSnapshot?.().aircraft.length===2);
 return {page,context,state};
}
function hold(map,id){let release;const promise=new Promise(r=>release=r);map.set(id,{promise,release});return ()=>{map.delete(id);release()}}
async function freezeClock(page){
 const time=await page.evaluate(()=>Date.now());await page.clock.pauseAt(time+1000);
 // Acquire fixtures in the installed browser clock's domain before testing elapsed time.
 await page.evaluate(()=>{cellCache.clear();scout=null;return refresh(true)});
}
async function screenshot(page,name){await page.screenshot({path:path.join(output,name+'.png')})}
async function closeSession(context){
 // Ignore only route-handler teardown errors after assertions; page runtime errors are still recorded.
 for(const page of context.pages())await page.unrouteAll({behavior:'ignoreErrors'});
 await context.close();
}
let base;
(async()=>{
 server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';if(!assets.has(name)){res.writeHead(404);res.end();return}res.setHeader('content-type',name.endsWith('.html')?'text/html':name.endsWith('.css')?'text/css':'text/javascript');res.end(fs.readFileSync(path.join(root,name)))});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:process.env.DOAA_CHROMIUM||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 report.chromium=browser.version();
 let {page,context,state}=await session();
 await check('Blocked map resources settle as unavailable rather than loading indefinitely',async()=>{
  await freezeClock(page);await page.clock.runFor(11000);
  assert.ok(await page.locator('#attrib').textContent().then(s=>s.includes('UNAVAILABLE')));
 });
 await check('SKY → LOOK → Inspector → LOOK keyboard return',async()=>{
  await page.locator('[data-primary="LOOK"]').click();await page.locator('.look-item').first().focus();await page.keyboard.press('Enter');
  await page.waitForSelector('#detail.show');await page.waitForFunction(()=>document.querySelector('#detailtray').children.length>0);
  await screenshot(page,'desktop-inspector');
  await page.locator('#detailclose').click();assert.equal(await page.locator('#viewtitle').textContent(),'LOOK');
  assert.equal(await page.evaluate(()=>document.activeElement?.dataset.lookId),'c00001');
 });
 await check('BOARD → Inspector → BOARD identity focus',async()=>{
  await page.locator('[data-primary="BOARD"]').click();await page.locator('.boardrow').first().focus();await page.keyboard.press('Enter');await page.waitForSelector('#detail.show');
  await page.locator('#detailclose').click();await page.waitForSelector('.boardrow');assert.equal(await page.evaluate(()=>document.activeElement?.dataset.boardIndex),'0');
 });
 await check('Provider HTML is rendered as text in BOARD',async()=>{
  state.board=fixture.board();state.board.flights[0].airline_name='<img src=x onerror="window.__injected=1">';await page.locator('[data-primary="BOARD"]').click();await page.waitForSelector('.boardrow');
  assert.equal(await page.locator('.boardrow img').count(),0);assert.equal(await page.evaluate(()=>window.__injected),undefined);
 });
 await check('Inspector datum has independent accessible explanation and navigation',async()=>{
  await page.locator('[data-primary="SKY"]').click();await page.locator('#rack .row').first().click();await page.waitForSelector('[data-fact]');
  assert.ok(await page.locator('[data-fact] .datum-value').first().textContent().then(s=>s.trim().length>0),'HTML parser lost the datum value to a nested button');
  assert.equal(await page.locator('[data-fact] button').count(),0);
  await page.locator('[data-tray-doaa="aircraft"]').click();
  assert.ok(await page.locator('[data-fact] .datum-value [title="Hold to favourite"]').count(),'Favourite cue lost after datum DOM repair');
  await page.locator('[data-fact-explain]').first().click();assert.ok(await page.locator('.explain').count());
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Late Inspector response cannot replace newer aircraft selection',async()=>{
  const release=hold(state.dossierHold,'c00001');
  await page.evaluate(()=>{selectEncounter('c00001');selectEncounter('c00002')});
  await page.waitForFunction(()=>document.querySelector('#detailbody').textContent.includes('TEST202'));
  release();await page.waitForTimeout(300);
  assert.ok(await page.locator('#detailbody').textContent().then(s=>s.includes('TEST202')&&!s.includes('TEST101')));
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Late enrichment preserves the chosen Inspector tab, scroll and focus',async()=>{
  const release=hold(state.dossierHold,'c00001');
  await page.locator('#rack .row').first().click();await page.locator('[data-tray-doaa="aircraft"]').click();
  await page.locator('[data-fact-explain]').first().focus();
  const before=await page.locator('#detailbody').evaluate(d=>{d.scrollTop=80;return {scroll:d.scrollTop,explanation:document.activeElement.dataset.factExplain}});
  release();await page.waitForFunction(()=>document.querySelector('#detailbody').getAttribute('aria-busy')==='false');
  assert.equal(await page.locator('#detailbody').getAttribute('data-active-surface'),'aircraft');
  assert.equal(await page.locator('#detailbody').evaluate(d=>d.scrollTop),before.scroll);
  assert.equal(await page.evaluate(()=>document.activeElement.dataset.factExplain),before.explanation);
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Clearing search cannot be undone by its delayed response',async()=>{
  const release=hold(state.searchHold,'old');await page.locator('#racksearch').click();await page.locator('#rackquery').fill('old');
  await page.waitForFunction(()=>document.querySelector('#rackquery').value==='old');
  for(let i=0;i<20&&!state.searchRequests.has('old');i++)await page.waitForTimeout(50);
  assert.ok(state.searchRequests.has('old'));
  await page.locator('#rackquery').fill('');await page.waitForTimeout(250);release();await page.waitForTimeout(200);
  assert.ok(await page.locator('#rack').textContent().then(s=>s.includes('TEST101')&&!s.includes('C-PAST')));
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Enrichment failure after tab change preserves known facts without runtime errors',async()=>{
  await freezeClock(page);
  state.dossierFailed=true;state.flightFailed=true;state.records[0].flight='FAIL101';
  const release=hold(state.dossierHold,'c00001');await page.evaluate(()=>{cellCache.clear();scout=null;return refresh(true)});
  await page.locator('#rack .row').first().click();await page.locator('[data-tray-doaa="aircraft"]').click();release();
  await page.waitForFunction(()=>document.querySelector('#detailbody').getAttribute('aria-busy')==='false');
  assert.equal(await page.locator('#detailbody').getAttribute('data-active-surface'),'aircraft');
  assert.ok(await page.locator('#detailbody').textContent().then(s=>s.includes('C-TEST')&&s.includes('Additional facts unavailable')));
  await page.locator('[data-tray-doaa="contact"]').click();state.trafficFailed=true;await page.clock.runFor(100000);
  assert.equal(await page.locator('#detailbody .datum-label').filter({hasText:/^LIVE$/}).count(),0);
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Historical search opens a non-live Inspector and returns focus to its record',async()=>{
  await page.locator('#racksearch').click();await page.locator('#rackquery').fill('C-PAST');await page.waitForSelector('[data-id="c00003"]');
  assert.ok(await page.locator('#rack').textContent().then(s=>s.includes('LAST SEEN')&&!s.includes('0 FT')));
  await page.locator('[data-id="c00003"]').click();await page.waitForFunction(()=>document.querySelector('#detailbody').getAttribute('aria-busy')==='false');
  assert.ok(await page.locator('#detailbody').textContent().then(s=>s.includes('C-PAST')&&s.includes('LAST OBSERVED')&&!s.includes('0 FT')));
  assert.equal(await page.locator('#detailbody .datum-label').filter({hasText:/^LIVE$/}).count(),0);
  await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.dataset.id),'c00003');
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Individual position age expires despite another recent contact',async()=>{
  state.records[0].seen_pos=85;await freezeClock(page);
  await page.locator('#rack .row').first().click();await page.waitForFunction(()=>document.querySelector('#detailbody').getAttribute('aria-busy')==='false');
  await page.clock.runFor(6000);await page.evaluate(()=>compose(viewportCells()));
  assert.ok(await page.evaluate(()=>!window.DOAALiveSnapshot().aircraft.some(a=>a.id==='c00001')),'Response timestamp concealed the individual position age');
  assert.ok(await page.locator('#detailbody').textContent().then(s=>s.includes('LAST OBSERVED')&&!s.includes('LIVE')));
  await page.locator('#detailclose').click();await page.locator('[data-primary="LOOK"]').click();
  assert.equal(await page.locator('[data-look-id="c00001"]').count(),0);
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Traffic outage removes live telemetry and LOOK cues; recovery resumes',async()=>{
  await freezeClock(page);
  await page.locator('#rack .row').first().click();await page.waitForFunction(()=>document.querySelector('#detailbody').getAttribute('aria-busy')==='false');
  state.trafficFailed=true;await page.clock.runFor(100000);await page.evaluate(()=>refresh(true));
  assert.equal(await page.evaluate(()=>window.DOAALiveSnapshot().aircraft.length),0);
  assert.ok(await page.locator('#detailbody').textContent().then(s=>s.includes('LAST OBSERVED')&&!s.includes('LIVE')));
  await page.locator('#detailclose').click();await page.locator('[data-primary="LOOK"]').click();
  assert.equal(await page.locator('.look-item').count(),0);assert.ok(await page.locator('#board').textContent().then(s=>s.includes('aging or unavailable')));
  state.trafficFailed=false;await page.evaluate(()=>refresh(true));await page.waitForSelector('.look-item');
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Provider attribution remains text in the SKY status',async()=>{
  state.provider='<img src=x onerror="window.__statusInjected=1">';await page.evaluate(()=>{cellCache.clear();scout=null;return refresh(true)});
  assert.equal(await page.locator('#status img').count(),0);assert.equal(await page.evaluate(()=>window.__statusInjected),undefined);
  assert.ok(await page.locator('#status').textContent().then(s=>s.includes('<img src=x')));
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('BOARD empty, failure and recovery states remain distinct',async()=>{
  state.board={...fixture.board(),flights:[]};await page.locator('[data-primary="BOARD"]').click();
  await page.waitForFunction(()=>document.querySelector('#board').textContent.includes('No airborne'));
  state.boardFailed=true;await page.locator('[data-primary="BOARD"]').click();await page.waitForFunction(()=>document.querySelector('#board').textContent.includes('UNAVAILABLE'));
  state.boardFailed=false;state.board=fixture.board();await page.locator('[data-primary="BOARD"]').click();await page.waitForSelector('.boardrow');
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Airport marker opens conditions; an obsolete weather response cannot replace a contact',async()=>{
  const position=await page.evaluate(()=>project(HOME.lat,HOME.lon));await page.locator('#sky').click({position});
  await page.waitForFunction(()=>document.querySelector('#detailbody').textContent.includes('FEW040'));
  assert.ok(await page.locator('#detailbody').textContent().then(s=>s.includes('CYOW')&&s.includes('210°')&&s.includes('VFR')));
  await page.keyboard.press('Escape');
  const release=hold(state.airportHold,'CYOW');await page.locator('#sky').click({position});await page.waitForSelector('#detail.show');
  await page.locator('#rack .row').first().click();await page.waitForFunction(()=>document.querySelector('#detailbody').textContent.includes('TEST101'));
  release();await page.waitForTimeout(100);assert.ok(await page.locator('#detailbody').textContent().then(s=>s.includes('TEST101')&&!s.includes('FEW040')));
 });
 await closeSession(context);
 for(const [name,viewport] of [['mobile',{width:390,height:844}],['tablet',{width:820,height:1180}],['landscape',{width:844,height:390}]]){
  ({page,context,state}=await session(viewport));
  await check(name+' Inspector shell, close and navigation remain visible',async()=>{
   await page.locator('#rack .row').first().click();await page.waitForSelector('#detailtray button');await screenshot(page,name+'-inspector');
   const boxes=await page.evaluate(()=>{const r=x=>{const b=document.querySelector(x).getBoundingClientRect();return {x:b.x,y:b.y,w:b.width,h:b.height,bottom:b.bottom}};return {detail:r('#detail'),close:r('#detailclose'),tray:r('#detailtray'),map:r('.map-choice')}});
   assert.ok(boxes.tray.bottom<=viewport.height&&boxes.close.y>=0);
   assert.ok(!(boxes.detail.x<boxes.map.x+boxes.map.w&&boxes.detail.x+boxes.detail.w>boxes.map.x&&boxes.detail.y<boxes.map.bottom&&boxes.detail.bottom>boxes.map.y),'Map controls overlap Inspector');
   if(name!=='tablet'){
    await page.locator('#detail-expand').click();assert.equal(await page.locator('#detail-expand').getAttribute('aria-expanded'),'true');
    await screenshot(page,name+'-inspector-expanded');
    assert.ok(await page.locator('#detailclose').evaluate(el=>{const r=el.getBoundingClientRect();return document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)===el}),'Expanded close is obstructed');
    await page.keyboard.press('Escape');assert.equal(await page.locator('#detail').isVisible(),false);
    assert.equal(await page.evaluate(()=>document.activeElement.dataset.id),'c00001');
   }
  });
  await closeSession(context);
 }
 ({page,context,state}=await session());
 await check('Keyboard AMBIENT options focus the chosen mode and Escape returns to its opener',async()=>{
  await page.locator('#ambient-open').focus();await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(()=>document.activeElement.dataset.ambientMode),'SKY');
  assert.equal(await page.locator('#ambient-open').getAttribute('aria-expanded'),'true');
  await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'ambient-open');
  assert.equal(await page.locator('#ambient-open').getAttribute('aria-expanded'),'false');
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('AMBIENT preloads during hold and atomically shows matching details',async()=>{
  const release=hold(state.photoHold,'c00002');await freezeClock(page);
  await page.evaluate(()=>{
   window.__slidePairs=[];
   new MutationObserver(()=>{const reg=document.querySelector('.ambient-slide-reg')?.textContent,url=document.querySelector('.ambient-photo')?.style.backgroundImage;if(reg&&url)window.__slidePairs.push({reg,url,at:Date.now()})}).observe(document.querySelector('#doaa-ambient'),{attributes:true,childList:true,subtree:true});
  });
  await page.locator('#ambient-open').click();await page.locator('[data-ambient-mode="SLIDES"]').click();
  await page.waitForFunction(()=>document.querySelector('.ambient-photo').style.backgroundImage.includes('c00001'));
  await screenshot(page,'desktop-slides');
  assert.equal(await page.locator('.ambient-slide-reg').textContent(),'C-TEST');
  assert.ok(state.photoRequests.has('c00002'),'Next image not preloaded during 45-second display');
  await page.clock.runFor(44000);assert.equal(await page.locator('.ambient-slide-reg').textContent(),'C-TEST');
  release();await page.clock.runFor(11000);await page.waitForFunction(()=>document.querySelector('.ambient-slide-reg').textContent==='C-DEMO');
  assert.ok(await page.locator('.ambient-slide-details').textContent().then(s=>s.includes('ALT UNKNOWN')&&s.includes('SPEED UNKNOWN')));
  const secondElapsed=await page.evaluate(()=>{const start=window.__slidePairs.find(p=>p.reg==='C-DEMO').at;return Date.now()-start});
  await page.clock.runFor(Math.max(0,44000-secondElapsed));assert.equal(await page.locator('.ambient-slide-reg').textContent(),'C-DEMO');
  await page.clock.runFor(11000);await page.waitForFunction(()=>document.querySelector('.ambient-slide-reg').textContent==='C-TEST');
  assert.ok(await page.evaluate(()=>window.__slidePairs.every(p=>p.url.includes(p.reg==='C-TEST'?'c00001':'c00002'))),'Image/details identity mismatch during transition');
  assert.ok(await page.evaluate(()=>{const changes=window.__slidePairs.filter((p,i,a)=>i===0||p.reg!==a[i-1].reg);return changes.length>=3&&changes.every((p,i)=>i===0||p.at-changes[i-1].at>=45000)}),'A later successful slide lost its own 45-second hold');
 });
 await check('AMBIENT mode switch / resume retains verification and keyboard focus',async()=>{
  await page.locator('.ambient-switch').click();await page.locator('.ambient-switch').click();assert.equal(await page.locator('.ambient-count').textContent(),'PHOTO VERIFIED');
  assert.ok(await page.evaluate(()=>document.querySelector('#doaa-ambient').contains(document.activeElement)));
  await page.keyboard.press('Escape');assert.equal(await page.locator('#doaa-ambient').isVisible(),false);
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Failed next image preserves the current photograph and details',async()=>{
  state.photoFailed.add('c00002');await freezeClock(page);
  await page.locator('#ambient-open').click();await page.locator('[data-ambient-mode="SLIDES"]').click();
  await page.waitForSelector('.ambient-slide-reg');await page.waitForTimeout(100);await page.clock.runFor(50000);
  assert.equal(await page.locator('.ambient-slide-reg').textContent(),'C-TEST');
  assert.ok(await page.locator('.ambient-photo').evaluate(el=>el.style.backgroundImage.includes('c00001')));
  assert.equal(await page.locator('.ambient-status').textContent(),'');
  assert.equal(await page.locator('.ambient-count').textContent(),'PHOTO VERIFIED');
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Late image is rejected after identity changes; stale observations clear current slide',async()=>{
  const release=hold(state.photoHold,'c00002');
  await page.locator('#ambient-open').click();await page.locator('[data-ambient-mode="SLIDES"]').click();await page.waitForSelector('.ambient-slide-reg');
  await page.evaluate(()=>{
   const s=window.DOAALiveSnapshot();s.aircraft=s.aircraft.map(a=>a.id==='c00002'?{...a,reg:'C-CHANGED'}:a);
   window.__snapshot=s;window.DOAALiveSnapshot=()=>window.__snapshot;window.dispatchEvent(new Event('doaa:observations'));
  });
  release();await page.waitForTimeout(100);assert.equal(await page.locator('.ambient-slide-reg').textContent(),'C-TEST');
  await page.evaluate(()=>{window.__snapshot.observedAt=Date.now()-100000;window.dispatchEvent(new Event('doaa:observations'))});
  assert.equal(await page.locator('.ambient-photo').evaluate(el=>el.style.backgroundImage),'');
  assert.equal(await page.locator('.ambient-count').textContent(),'');assert.ok(await page.locator('.ambient-slide-copy').textContent().then(s=>s.includes('Observations paused')));
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Mode cancellation rejects a pending image and AMBIENT SKY remains explicit',async()=>{
  const release=hold(state.photoHold,'c00002');await page.locator('#ambient-open').click();await page.locator('[data-ambient-mode="SLIDES"]').click();await page.waitForSelector('.ambient-slide-reg');
  await page.locator('.ambient-switch').click();release();await page.waitForTimeout(100);
  assert.equal(await page.evaluate(()=>window.DOAAAmbient.mode),'SKY');assert.equal(await page.locator('.ambient-slide').isVisible(),false);
  await screenshot(page,'ambient-sky');
  await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>document.querySelector('#doaa-ambient').contains(document.activeElement)));
  await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'ambient-open');
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('AMBIENT SKY resize does not invent movement from screen coordinates',async()=>{
  await page.locator('#ambient-open').click();await page.locator('[data-ambient-mode="SKY"]').click();
  await page.evaluate(()=>{
   const ctx=document.querySelector('.ambient-canvas').getContext('2d'),move=ctx.moveTo.bind(ctx),line=ctx.lineTo.bind(ctx),stroke=ctx.stroke.bind(ctx);
   window.__ambientDiagonals=[];let p,q;
   ctx.moveTo=(x,y)=>{p={x,y};move(x,y)};ctx.lineTo=(x,y)=>{q={x,y};line(x,y)};
   ctx.stroke=()=>{if(p&&q&&Math.abs(p.x-q.x)>1&&Math.abs(p.y-q.y)>1)window.__ambientDiagonals.push({p,q});stroke();p=q=null};
  });
  await page.setViewportSize({width:820,height:1180});await page.waitForTimeout(100);
  assert.deepEqual(await page.evaluate(()=>window.__ambientDiagonals),[],'Stationary observations acquired a synthetic diagonal trail on resize');
  state.records[0].lat+=.02;state.records[0].lon+=.02;await page.evaluate(()=>refresh(true));
  assert.ok(await page.evaluate(()=>window.__ambientDiagonals.length>0),'Actual fixture position change did not leave an observed trail');
 });
 await closeSession(context);
 ({page,context,state}=await session());
 await check('Opt-in idle entry defers while reading and persists the chosen mode',async()=>{
  await freezeClock(page);await page.locator('#ambient-open').click();await page.locator('[data-ambient-idle]').click();
  await page.locator('[data-ambient-mode="SLIDES"]').click();await page.waitForSelector('.ambient-slide-reg');await page.keyboard.press('Escape');
  await page.locator('#rack .row').first().click();await page.clock.runFor(310000);assert.equal(await page.evaluate(()=>window.DOAAAmbient.active),false);
  await page.keyboard.press('Escape');await page.clock.runFor(310000);assert.equal(await page.evaluate(()=>window.DOAAAmbient.active),true);
  assert.equal(await page.evaluate(()=>window.DOAAAmbient.mode),'SLIDES');
  await page.keyboard.press('Escape');await page.reload();await page.waitForFunction(()=>window.DOAALiveSnapshot?.().aircraft.length===2);
  assert.equal(await page.evaluate(()=>window.DOAAAmbient.mode),'SLIDES');
  assert.equal(await page.locator('[data-ambient-idle]').getAttribute('aria-pressed'),'true');
 });
 await closeSession(context);
 for(const [name,viewport] of [['phone',{width:390,height:844}],['short-phone',{width:360,height:640}],['landscape',{width:844,height:390}]]){
  ({page,context,state}=await session(viewport));
  await check(name+' SLIDES keeps verification, identity, telemetry and credit visible',async()=>{
   await page.waitForFunction(()=>window.DOAALiveSnapshot().aircraft.some(a=>a.flight&&a.operator));
   await page.locator('#ambient-open').click();await page.locator('[data-ambient-mode="SLIDES"]').click();await page.waitForSelector('.ambient-slide-reg');
   await screenshot(page,name+'-slides');
   const b=await page.evaluate(()=>{const r=s=>{const b=document.querySelector(s).getBoundingClientRect();return {x:b.x,y:b.y,right:b.right,bottom:b.bottom,width:b.width,height:b.height}};return {pill:r('.ambient-count'),brand:r('.ambient-kicker'),copy:r('.ambient-slide-copy'),credit:r('.ambient-slide-credit'),details:r('.ambient-slide-details'),reg:r('.ambient-slide-reg')}});
   assert.ok(b.pill.x>=12&&b.pill.y>=12&&b.pill.right<=viewport.width-12);
   assert.ok(!(b.pill.x<b.brand.right&&b.pill.right>b.brand.x&&b.pill.y<b.brand.bottom&&b.pill.bottom>b.brand.y),'Verification overlaps DOAA identity');
   for(const key of ['reg','details','credit'])assert.ok(b[key].y>=b.copy.y&&b[key].bottom<=viewport.height-8,key+' overflows the information region');
   assert.equal(await page.locator('.ambient-status').textContent(),'');await page.keyboard.press('Escape');
  });
  await closeSession(context);
 }
 await check('No browser runtime errors or mutation requests',async()=>{assert.deepEqual(report.pageErrors,[]);assert.ok(report.requests.every(r=>r.method==='GET'))});
})().catch(e=>{report.fatal=String(e.stack);console.error(e)}).finally(async()=>{
 if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));
 const failed=report.checks.filter(c=>!c.passed).length;console.log(`${report.checks.length-failed} passed; ${failed} failed; report: ${output}/report.json`);
 if(failed||report.fatal)process.exitCode=1;
});
