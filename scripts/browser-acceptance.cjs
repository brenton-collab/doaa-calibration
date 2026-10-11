const fixtureServer=require('./acceptance-server.cjs');
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.DOAA_CHROME_PATH||undefined,args:['--no-sandbox'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined}),report=[];try{
 for(const viewport of [{name:'desktop',width:1440,height:900},{name:'phone',width:393,height:851},{name:'landscape',width:851,height:393},{name:'tablet',width:820,height:1180}]){
  const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height},reducedMotion:'reduce'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
  await page.locator('#rack [data-id="c00001"]').first().click();await page.getByRole('button',{name:'Track History',exact:true}).click();
  await page.locator('[data-track-workspace] [data-time]').waitFor();
  await page.locator('[data-event]').first().click();assert.match(await page.locator('.track-readout').innerText(),/3,000 ft/);
  const values=await page.locator('[data-time]').evaluate(el=>({min:+el.min,max:+el.max}));assert.ok(values.max>values.min);
  await page.locator('[data-time]').evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));},values.min+45000);
  const text=await page.locator('.track-readout').innerText();assert.match(text,/2,000 ft/);assert.match(text,/15s before clock/);assert.match(await page.locator('[data-track-workspace] canvas').getAttribute('aria-label'),/45.26500, -75.77500/);
  assert.equal(await page.locator('svg[data-chart] .cursor').count(),2);
  await page.locator('[data-time]').evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));},values.min+200000);
  assert.match(await page.locator('.track-readout').innerText(),/No supported observation/);assert.match(await page.locator('[data-track-workspace] canvas').getAttribute('aria-label'),/no supported position/);
  await page.getByRole('button',{name:'Compare with…',exact:true}).click();await page.locator('dialog [data-candidate]').waitFor();
  assert.equal(await page.locator('dialog').count(),1);await page.locator('dialog [data-candidate]').click();
  await page.locator('dialog .track-readouts .track-readout').nth(1).waitFor();assert.equal(await page.locator('dialog .track-chart').count(),0);
  const bounds=await page.locator('dialog [data-time]').evaluate(el=>({min:+el.min,max:+el.max}));assert.ok(bounds.max>values.max);
  await page.locator('dialog [data-speed]').selectOption('60');await page.locator('dialog [data-play]').click();await page.waitForFunction(start=>Number(document.querySelector('dialog [data-time]').value)>start+5000,bounds.min,{timeout:5000});await page.locator('dialog [data-play]').click();
  const replayed=await page.locator('dialog [data-time]').inputValue();assert.ok(+replayed>bounds.min+5000);
  await page.getByRole('button',{name:'Replace Track 1',exact:true}).click();await page.getByRole('heading',{name:'Choose Track 1',exact:true}).waitFor();await page.locator('[data-candidate]').click();await page.getByRole('heading',{name:'Choose Track 1',exact:true}).waitFor({state:'detached'});assert.match(await page.locator('dialog .track-readout').nth(1).innerText(),/TEST567/);
  await page.getByRole('button',{name:viewport.name==='phone'?'Remove Track 1':'Remove Track 2',exact:true}).click();assert.equal(await page.locator('dialog .track-readout').count(),1);assert.match(await page.locator('dialog .track-readout').innerText(),viewport.name==='phone'?/TEST567/:/TEST234/);
  await page.getByRole('button',{name:'Close Compare Tracks',exact:true}).click();await page.locator('dialog').waitFor({state:'detached'});assert.equal(await page.locator('dialog').count(),0);
  if(viewport.name==='phone'){const expand=page.getByRole('button',{name:'Expand',exact:true});if(await expand.isVisible())await expand.click();}
  await page.getByRole('button',{name:'Overview',exact:true}).click();
  await page.route('**/api/track-history?*',route=>route.fulfill({status:503,contentType:'application/json',body:'{\"ok\":false,\"error\":\"Fixture outage\"}'}));
  await page.getByRole('button',{name:'Track History',exact:true}).click();await page.getByRole('button',{name:'Retry observed track'}).waitFor();assert.match(await page.locator('.track-status').innerText(),/Fixture outage/);
  await page.unroute('**/api/track-history?*');await page.getByRole('button',{name:'Retry observed track'}).click();await page.locator('[data-track-workspace] [data-time]').waitFor();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false,'no viewport horizontal overflow');
  await page.screenshot({path:'/tmp/doaa-'+viewport.name+'.png'});
  assert.deepEqual(errors,[]);report.push({viewport,flows:['SKY Rack to Contact','Track History','synchronized map/charts cursor','observed event navigation','gap visibility','deliberate picker','union clock','60x playback/pause','remove Track 2','close/context return','service failure/retry'],errors});await page.close();
 }
 const crypto=require('node:crypto');const files=Object.fromEntries(['index.html','flight-enrichment.js','track-history.js','track-core.js','track-history.css'].map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')]));fs.writeFileSync('/tmp/doaa-browser-report.json',JSON.stringify({date:new Date().toISOString(),browser:await browser.version(),data:'Offline deterministic fixtures, never provider acceptance',files,viewports:report},null,2));console.log(JSON.stringify({passed:report.length,report:'/tmp/doaa-browser-report.json'}));
}finally{await browser.close();fixtureServer.close();}})().catch(e=>{fixtureServer.close();console.error(e);process.exitCode=1;});
