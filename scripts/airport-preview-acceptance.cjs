const fs=require('node:fs'),assert=require('node:assert/strict');
const path=require('node:path'),os=require('node:os');
const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
// Live preview only. Supply a disposable QA session; never a production credential.
if(!process.env.DOAA_PREVIEW_SESSION_FILE)throw Error('DOAA_PREVIEW_SESSION_FILE is required');
const state=JSON.parse(fs.readFileSync(process.env.DOAA_PREVIEW_SESSION_FILE,'utf8'));
if(state.origin!=='https://doaa-calibration-preview.brenton-7e6.workers.dev')throw Error('This acceptance script is preview-only');
const out=process.env.DOAA_PREVIEW_QA_OUT||path.join(os.tmpdir(),'doaa-airport-preview-qa');fs.mkdirSync(out,{recursive:true});
const report={viewports:[],errors:[],proxy_certificate_exception:process.env.DOAA_BROWSER_IGNORE_PROXY_CERTS==='1'};
(async()=>{const browser=await chromium.launch({executablePath:process.env.DOAA_CHROME_PATH||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});let page;
try{
 for(const view of [{name:'phone',width:393,height:851},{name:'landscape',width:851,height:393},{name:'tablet',width:820,height:1180},{name:'desktop',width:1440,height:900}]){
  const context=await browser.newContext({viewport:{width:view.width,height:view.height},reducedMotion:'reduce',ignoreHTTPSErrors:report.proxy_certificate_exception});
  const session=state.cookie||state.admin?.cookie;if(!session)throw Error('QA session cookie is required');
  const cookie=session.slice(session.indexOf('=')+1);
  await context.addCookies([{name:'__Host_doaa_session',value:cookie,url:state.origin,httpOnly:true,secure:true,sameSite:'Lax',expires:Date.now()/1000+3600}]);
  page=await context.newPage();page.setDefaultTimeout(20000);page.setDefaultNavigationTimeout(25000);
  const errors=[],api=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(state.origin+'/api/'))api.push({path:new URL(r.url()).pathname,status:r.status()});});
  console.log('BROWSER',view.name,'loading live preview');
  await page.goto(state.origin+'/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>typeof window.DOAASkyView==='function');
  await page.locator('#racksearch').click();await page.locator('#rackquery').fill('CYOW');
  const row=page.locator('#rack .row').filter({hasText:'CYOW'}).first();await row.waitFor();
  await row.click();await page.locator('#detail.show').waitFor();
  await page.waitForFunction(()=>document.querySelector('#detailbody').dataset.activeSurface==='airport');
  if(view.name==='phone')await page.locator('#detail-expand').click();
  await page.locator('[data-airport-hero-airfield] [data-runway]').first().waitFor();
  const runwayButtons=page.locator('[data-airport-hero-airfield] button[data-runway]');assert.equal(await runwayButtons.count(),3);
  await runwayButtons.nth(1).click();const selected=await page.locator('[data-airport-hero-airfield] button[data-runway][aria-pressed="true"]').getAttribute('data-runway');assert.ok(selected);
  const tabs=await page.locator('#detailtray [data-tray-doaa]').allTextContents();assert.deepEqual(tabs.map(x=>x.trim()),['Overview','Runways','Movements']);
  await page.getByRole('button',{name:'Runways',exact:true}).click();await page.locator('[data-airfield-workspace] [data-runway]').first().waitFor();
  assert.equal(await page.locator('[data-airfield-workspace] button[data-runway][aria-pressed="true"]').getAttribute('data-runway'),selected);
  await page.locator('[data-airfield-workspace] svg g[data-runway]').first().focus();await page.keyboard.press('Enter');
  await page.getByRole('button',{name:'Movements',exact:true}).click();await page.locator('[data-movement-workspace]').waitFor();
  await page.getByRole('button',{name:'Overview',exact:true}).click();await page.locator('[data-airport-hero-airfield] [data-runway]').first().waitFor();
  const text=await page.locator('#detailbody').innerText();assert.match(text,/CYOW/);assert.doesNotMatch(text,/undefined|NaN/);
  await page.locator('#detailbody').evaluate(el=>el.scrollTop=0);
  await page.waitForFunction(()=>{const photo=document.querySelector('[data-airport-photo] img');return photo?.complete&&photo.naturalWidth>0;});
  assert.match(await page.locator('[data-airport-photo]').innerText(),/2001/,'historical capture date is visible');
  const layout=await page.evaluate(()=>{const d=document.querySelector('#detail').getBoundingClientRect(),body=document.querySelector('#detailbody');return {right:d.right,bottom:d.bottom,width:d.width,height:d.height,viewportWidth:innerWidth,viewportHeight:innerHeight,documentOverflow:document.documentElement.scrollWidth>innerWidth,bodyOverflow:body.scrollWidth>body.clientWidth+2,runwayState:body._doaaAirfieldState?.id||null};});
  assert.equal(layout.documentOverflow,false);assert.equal(layout.bodyOverflow,false);assert.ok(layout.right<=view.width+1);assert.ok(layout.bottom<=view.height+1);
  await page.screenshot({path:path.join(out,'airport-'+view.name+'.png')});
  report.viewports.push({name:view.name,tabs,layout,errors,api,photo:await page.locator('[data-airport-photo]').innerText(),airportText:text.slice(0,3500)});
  assert.deepEqual(errors,[],'uncaught live browser errors');
  await page.locator('#detailclose').focus();await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('#detail').classList.contains('show'));
  await context.close();console.log('PASS live airport browser',view.name);
 }
 fs.writeFileSync(path.join(out,'live-browser-report.json'),JSON.stringify(report,null,2));
}catch(e){report.error=e.stack;if(page)await page.screenshot({path:path.join(out,'airport-failure.png')}).catch(()=>{});fs.writeFileSync(path.join(out,'live-browser-report.json'),JSON.stringify(report,null,2));console.error(e.message);process.exitCode=1;}finally{await browser.close();}})();
