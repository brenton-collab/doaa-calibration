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
 page.setDefaultTimeout(6000);
 const state={records:structuredClone(fixture.contacts),board:fixture.board(),trafficFailed:false,boardFailed:false,photoHold:new Map(),photoRequests:new Set(),photoFailed:new Set(),dossierHold:new Map()};
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
  const a=state.records.find(a=>a.hex===(u.searchParams.get('hex')||'').toLowerCase())||fixture.contacts[0];
  if(u.pathname==='/api/traffic'){body=fixture.traffic(await page.evaluate(()=>Date.now()),state.records);if(state.trafficFailed){status=503;body={ok:false,error:'Simulated outage'}}}
  else if(u.pathname==='/api/board'){body=state.board;if(state.boardFailed){status=503;body={ok:false,error:'Simulated BOARD outage'}}}
  else if(u.pathname==='/api/dossier'){if(state.dossierHold.has(a.hex))await state.dossierHold.get(a.hex).promise;body=fixture.dossier(a)}
  else if(u.pathname==='/api/flight')body={ok:true,found:true,flight:fixture.flight(a)};
  else if(u.pathname==='/api/ambient-media')body={ok:true,media:state.records.map(fixture.media)};
  else if(u.pathname==='/api/journey')body={ok:true,chronology:[]};
  else if(u.pathname==='/api/ops')body={ok:true,health:{},state:{},meter:{requests:0}};
  else if(u.pathname==='/api/airport')body={ok:true,metar:{rawOb:'CYOW 102000Z 21008KT 15SM FEW040 12/08 A3004',wdir:210,wspd:8,visib:15,fltCat:'VFR'}};
  else if(u.pathname==='/api/search')body={ok:true,results:[{kind:'airframe',scope:'local',icao24:'c00003',canonical_key:'c00003',registration:'C-PAST',encounter_count:2,last_seen_at:'2026-10-01T12:00:00Z',icao_type:'C172'}]};
  return route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});
 });
 await page.goto(base,{waitUntil:'load'});
 await page.waitForFunction(()=>window.DOAALiveSnapshot?.().aircraft.length===2);
 return {page,context,state};
}
function hold(map,id){let release;const promise=new Promise(r=>release=r);map.set(id,{promise,release});return ()=>{map.delete(id);release()}}
async function screenshot(page,name){await page.screenshot({path:path.join(output,name+'.png')})}
let base;
(async()=>{
 server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';if(!assets.has(name)){res.writeHead(404);res.end();return}res.setHeader('content-type',name.endsWith('.html')?'text/html':name.endsWith('.css')?'text/css':'text/javascript');res.end(fs.readFileSync(path.join(root,name)))});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({executablePath:process.env.DOAA_CHROMIUM||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 report.chromium=browser.version();
 let {page,context,state}=await session();
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
  assert.ok(await page.locator('[data-fact]').first().textContent().then(s=>s.trim().length>20),'HTML parser lost the datum value to a nested button');
  assert.equal(await page.locator('[data-fact] button').count(),0);
  await page.locator('[data-fact-explain]').first().click();assert.ok(await page.locator('.explain').count());
 });
 await context.close();
 ({page,context,state}=await session());
 await check('Late Inspector response cannot replace newer aircraft selection',async()=>{
  const release=hold(state.dossierHold,'c00001');
  await page.evaluate(()=>{selectEncounter('c00001');selectEncounter('c00002')});
  await page.waitForFunction(()=>document.querySelector('#detailbody').textContent.includes('TEST202'));
  release();await page.waitForTimeout(300);
  assert.ok(await page.locator('#detailbody').textContent().then(s=>s.includes('TEST202')&&!s.includes('TEST101')));
 });
 await context.close();
 for(const [name,viewport] of [['mobile',{width:390,height:844}],['tablet',{width:820,height:1180}],['landscape',{width:844,height:390}]]){
  ({page,context,state}=await session(viewport));
  await check(name+' Inspector shell, close and navigation remain visible',async()=>{
   await page.locator('#rack .row').first().click();await page.waitForSelector('#detailtray button');await screenshot(page,name+'-inspector');
   const boxes=await page.evaluate(()=>{const r=x=>{const b=document.querySelector(x).getBoundingClientRect();return {x:b.x,y:b.y,w:b.width,h:b.height,bottom:b.bottom}};return {detail:r('#detail'),close:r('#detailclose'),tray:r('#detailtray'),map:r('.map-choice')}});
   assert.ok(boxes.tray.bottom<=viewport.height&&boxes.close.y>=0);
   assert.ok(!(boxes.detail.x<boxes.map.x+boxes.map.w&&boxes.detail.x+boxes.detail.w>boxes.map.x&&boxes.detail.y<boxes.map.bottom&&boxes.detail.bottom>boxes.map.y),'Map controls overlap Inspector');
  });
  await context.close();
 }
 ({page,context,state}=await session());
 await check('AMBIENT preloads during hold and atomically shows matching details',async()=>{
  const release=hold(state.photoHold,'c00002');await page.clock.install();await page.clock.pauseAt(new Date(Date.now()+1000));
  await page.evaluate(()=>{
   window.__slidePairs=[];
   new MutationObserver(()=>{const reg=document.querySelector('.ambient-slide-reg')?.textContent,url=document.querySelector('.ambient-photo')?.style.backgroundImage;if(reg&&url)window.__slidePairs.push({reg,url})}).observe(document.querySelector('#doaa-ambient'),{attributes:true,childList:true,subtree:true});
  });
  await page.locator('#ambient-open').click();await page.locator('[data-ambient-mode="SLIDES"]').click();
  await page.waitForFunction(()=>document.querySelector('.ambient-photo').style.backgroundImage.includes('c00001'));
  await screenshot(page,'desktop-slides');
  assert.equal(await page.locator('.ambient-slide-reg').textContent(),'C-TEST');
  assert.ok(state.photoRequests.has('c00002'),'Next image not preloaded during 45-second display');
  await page.clock.runFor(44000);assert.equal(await page.locator('.ambient-slide-reg').textContent(),'C-TEST');
  release();await page.clock.runFor(11000);await page.waitForFunction(()=>document.querySelector('.ambient-slide-reg').textContent==='C-DEMO');
  assert.ok(await page.locator('.ambient-slide-details').textContent().then(s=>s.includes('ALT UNKNOWN')&&s.includes('SPEED UNKNOWN')));
  assert.ok(await page.evaluate(()=>window.__slidePairs.every(p=>p.url.includes(p.reg==='C-TEST'?'c00001':'c00002'))),'Image/details identity mismatch during transition');
 });
 await check('AMBIENT mode switch / resume retains verification and keyboard focus',async()=>{
  await page.locator('.ambient-switch').click();await page.locator('.ambient-switch').click();assert.equal(await page.locator('.ambient-count').textContent(),'PHOTO VERIFIED');
  assert.ok(await page.evaluate(()=>document.querySelector('#doaa-ambient').contains(document.activeElement)));
  await page.keyboard.press('Escape');assert.equal(await page.locator('#doaa-ambient').isVisible(),false);
 });
 await context.close();
 ({page,context,state}=await session());
 await check('Failed next image preserves the current photograph and details',async()=>{
  state.photoFailed.add('c00002');await page.clock.install();await page.clock.pauseAt(new Date(Date.now()+1000));
  await page.locator('#ambient-open').click();await page.locator('[data-ambient-mode="SLIDES"]').click();
  await page.waitForSelector('.ambient-slide-reg');await page.waitForTimeout(100);await page.clock.runFor(50000);
  assert.equal(await page.locator('.ambient-slide-reg').textContent(),'C-TEST');
  assert.ok(await page.locator('.ambient-photo').evaluate(el=>el.style.backgroundImage.includes('c00001')));
  assert.equal(await page.locator('.ambient-status').textContent(),'');
  assert.equal(await page.locator('.ambient-count').textContent(),'PHOTO VERIFIED');
 });
 await context.close();
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
 await context.close();
 ({page,context,state}=await session());
 await check('Mode cancellation rejects a pending image and AMBIENT SKY remains explicit',async()=>{
  const release=hold(state.photoHold,'c00002');await page.locator('#ambient-open').click();await page.locator('[data-ambient-mode="SLIDES"]').click();await page.waitForSelector('.ambient-slide-reg');
  await page.locator('.ambient-switch').click();release();await page.waitForTimeout(100);
  assert.equal(await page.evaluate(()=>window.DOAAAmbient.mode),'SKY');assert.equal(await page.locator('.ambient-slide').isVisible(),false);
  await screenshot(page,'ambient-sky');
  await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>document.querySelector('#doaa-ambient').contains(document.activeElement)));
  await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'ambient-open');
 });
 await context.close();
 await check('No browser runtime errors or mutation requests',async()=>{assert.deepEqual(report.pageErrors,[]);assert.ok(report.requests.every(r=>r.method==='GET'))});
})().catch(e=>{report.fatal=String(e.stack);console.error(e)}).finally(async()=>{
 if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));
 const failed=report.checks.filter(c=>!c.passed).length;console.log(`${report.checks.length-failed} passed; ${failed} failed; report: ${output}/report.json`);
 if(failed||report.fatal)process.exitCode=1;
});
