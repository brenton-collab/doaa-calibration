/* DOAA ambient compositions. Reads existing SKY observations; never acquires aviation data. */
(() => {
  'use strict';
  const root = document.createElement('section');
  root.id = 'doaa-ambient';
  root.setAttribute('aria-label', 'Ambient aviation display');
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.tabIndex = -1;
  root.hidden = true;
  root.innerHTML = `<canvas class="ambient-canvas" aria-hidden="true"></canvas>
    <div class="ambient-vignette"></div>
    <header class="ambient-head"><button class="ambient-switch" type="button" aria-label="Switch ambient composition">SKY / SLIDES</button><span class="ambient-kicker">DOAA <span class="ambient-dot">·</span> OTTAWA AVIATION</span></header>
    <div class="ambient-slide" hidden><div class="ambient-photo" aria-hidden="true"></div><div class="ambient-slide-copy"></div></div>
    <footer class="ambient-foot"><span class="ambient-status" aria-live="off"></span><span class="ambient-count"></span><button class="ambient-return" type="button" aria-label="Return to interactive SKY">↗</button></footer>`;
  document.body.appendChild(root);
  const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
  const slide = root.querySelector('.ambient-slide'), photo = root.querySelector('.ambient-photo'), copy = root.querySelector('.ambient-slide-copy');
  const status = root.querySelector('.ambient-status'), count = root.querySelector('.ambient-count');
  const switcher = root.querySelector('.ambient-switch');
  const choice = document.createElement('div');
  choice.className = 'ambient-controls';
  choice.innerHTML = `<button type="button" data-ambient-mode="SKY">AMBIENT SKY</button><button type="button" data-ambient-mode="SLIDES">AMBIENT SLIDES</button><button type="button" data-ambient-idle aria-pressed="false">AUTO-ENTER AFTER IDLE</button>`;
  document.body.appendChild(choice);
  const safeStorage = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const store = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  let mode = safeStorage('doaa.ambient.mode', 'SKY') === 'SLIDES' ? 'SLIDES' : 'SKY';
  let idleEnabled = safeStorage('doaa.ambient.idle', 'off') === 'on';
  let active = false, lastInteraction = Date.now(), lastSlideId = '', pendingSlideId = '', slideChangedAt = 0;
  let lifecycle = 0, prepared = null, displayed = null, returnFocus = null;
  const backgroundInert = new Map();
  const HOLD_MS = 45000;
  const idleMs = 5 * 60 * 1000;
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const data = () => window.DOAALiveSnapshot?.() || { aircraft: [], observedAt: 0, home: null, provider: 'UNAVAILABLE' };
  const usable = a => a && a.id && a.lat != null && a.lat !== '' && a.lon != null && a.lon !== '' && Number.isFinite(Number(a.lat)) && Number.isFinite(Number(a.lon)) && Math.abs(Number(a.lat)) <= 90 && Math.abs(Number(a.lon)) <= 180;
  function updateButtons() {
    choice.querySelectorAll('[data-ambient-mode]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.ambientMode === mode)));
    choice.querySelector('[data-ambient-idle]').setAttribute('aria-pressed', String(idleEnabled));
  }
  function enter() {
    if (active) return;
    returnFocus = document.activeElement;
    active = true;
    lifecycle++;
    for (const el of document.body.children) if (el !== root) {backgroundInert.set(el, el.inert);el.inert = true;}
    window.setPrimaryView?.('SKY');
    root.hidden = false;
    document.documentElement.classList.add('ambient-active');
    choice.classList.remove('show');
    trails.clear();
    root.focus({preventScroll:true});
    update();
    window.dispatchEvent(new Event('doaa:ambient-enter'));
  }
  function leave() {
    if (!active) return;
    active = false;
    cancelPreload();
    lifecycle++;
    for (const [el, inert] of backgroundInert) el.inert = inert;
    backgroundInert.clear();
    root.hidden = true;
    document.documentElement.classList.remove('ambient-active');
    lastInteraction = Date.now();
    const target = returnFocus?.isConnected && returnFocus.getClientRects().length && !returnFocus.closest('.ambient-controls') ? returnFocus : document.getElementById('ambient-open');
    target?.focus({preventScroll:true});
  }
  function choose(next) {
    if (next !== 'SKY' && next !== 'SLIDES') return;
    mode = next;
    store('doaa.ambient.mode', mode);
    cancelPreload();
    lifecycle++;
    updateButtons();
    syncSwitcher();
    enter();
    window.dispatchEvent(new Event('doaa:ambient-mode'));
    update();
  }
  function dimensions() {
    const ratio = Math.min(2, devicePixelRatio || 1);
    const w = innerWidth, h = innerHeight;
    if (canvas.width !== Math.round(w * ratio) || canvas.height !== Math.round(h * ratio)) {
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      // Trails store screen-space points; old pixels cannot survive a viewport re-projection.
      trails.clear();
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return {w,h};
  }
  // Persistent strokes accumulate from actual observed movement, never simulated traffic.
  const trails = new Map();
  const verifiedMedia = new Map();
  const failedPhotos = new Map();
  window.addEventListener('doaa:airframe-media', event => {
    const m=event.detail||{};
    if(m.id&&/^https:\/\//i.test(String(m.url||''))&&m.registration&&m.license&&m.attribution) {
      const key=String(m.id).toLowerCase();
      verifiedMedia.delete(key);
      verifiedMedia.set(key,{...m,seenAt:Date.now()});
      while(verifiedMedia.size>128)verifiedMedia.delete(verifiedMedia.keys().next().value);
      if(active&&mode==='SLIDES')update();
    }
  });
  let lastDrawAt = 0;
  function drawSky(snapshot) {
    const {w,h} = dimensions();
    const home = snapshot.home;
    const validHome = home && home.lat != null && home.lat !== '' && home.lon != null && home.lon !== '' && Number.isFinite(Number(home.lat)) && Number.isFinite(Number(home.lon)) && Math.abs(Number(home.lat)) <= 90 && Math.abs(Number(home.lon)) <= 180;
    const observed=Number(snapshot.observedAt)||0;
    const recent=observed>0&&Date.now()>=observed&&Date.now()-observed<90000;
    const aircraft = recent?(snapshot.aircraft || []).filter(usable):[];
    if(!recent)trails.clear();
    const cx = w * .5, cy = h * .5;
    const scale = Math.min(w,h) * .46 / 80;
    const lat = validHome ? Number(home.lat) : 0;
    const lon = validHome ? Number(home.lon) : 0;
    const cos = Math.cos(lat * Math.PI / 180);
    const t = Date.now();
    const current = new Set();
    ctx.fillStyle = '#07141c';
    ctx.fillRect(0,0,w,h);
    // Barely perceptible geographic field, no map labels, rings or compass.
    ctx.strokeStyle = 'rgba(154,194,202,.035)';
    ctx.lineWidth = .7;
    for (let n=-3;n<=3;n++) {
      const x=cx+n*Math.min(w,h)*.16;
      ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();
    }
    for (let n=-3;n<=3;n++) {
      const y=cy+n*Math.min(w,h)*.16;
      ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();
    }
    for (const a of aircraft) {
      if (!validHome) break;
      const x=cx+(Number(a.lon)-lon)*60*cos*scale;
      const y=cy-(Number(a.lat)-lat)*60*scale;
      if (!Number.isFinite(x+y) || x < -30 || x>w+30 || y < -30 || y>h+30) continue;
      current.add(a.id);
      const points=trails.get(a.id)||[];
      if (!points.length || Math.hypot(x-points[points.length-1].x,y-points[points.length-1].y)>1.5) {
        points.push({x,y,t});
        if(points.length>150)points.shift();
        trails.set(a.id,points);
      }
      for(let i=1;i<points.length;i++){
        const p=points[i-1],q=points[i];
        const age=Math.max(0,t-q.t);
        const alpha=.27*Math.max(0,1-age/900000);
        if(alpha<=0)continue;
        ctx.strokeStyle='rgba(142,208,217,'+alpha.toFixed(3)+')';
        ctx.lineWidth=1.2;
        ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
      }
      const hasTrack=a.trk!=null&&a.trk!==''&&Number.isFinite(Number(a.trk));
      ctx.save();ctx.translate(x,y);
      ctx.fillStyle='rgba(205,242,243,.8)';
      if(hasTrack){ctx.rotate(Number(a.trk)*Math.PI/180);ctx.beginPath();ctx.moveTo(0,-5);ctx.lineTo(2.7,3.5);ctx.lineTo(0,1);ctx.lineTo(-2.7,3.5);ctx.closePath();ctx.fill();}
      else{ctx.beginPath();ctx.arc(0,0,3.2,0,Math.PI*2);ctx.fill();}
      ctx.restore();
      ctx.fillStyle='rgba(124,212,222,.08)';
      ctx.beginPath();ctx.arc(x,y,15,0,Math.PI*2);ctx.fill();
    }
    for(const [id,points] of trails){
      const live=points.filter(p=>t-p.t<900000);
      if(!live.length)trails.delete(id);
      else if(!current.has(id))trails.set(id,live);
    }
    count.textContent='';
    lastDrawAt=t;
  }
  function recent(snapshot) {
    const observed=Number(snapshot.observedAt)||0;
    return observed>0 && Date.now()>=observed && Date.now()-observed<90000;
  }
  const identity = a => [String(a.id).toLowerCase(),String(a.reg).toUpperCase(),a.photo.url].join('|');
  function slideCandidates(snapshot) {
    if(!recent(snapshot))return [];
    for(const [url, at] of failedPhotos)if(Date.now()-at>=120000)failedPhotos.delete(url);
    return (snapshot.aircraft||[]).filter(usable).map(a=>{
      const media=verifiedMedia.get(String(a.id).toLowerCase());
      if(!media || failedPhotos.has(media.url) || !a.reg || String(media.registration).toUpperCase()!==String(a.reg).toUpperCase())return null;
      return {...a,photo:media};
    }).filter(Boolean);
  }
  function cancelPreload() {
    if(prepared){prepared.image.onload=null;prepared.image.onerror=null;}
    prepared=null;
    pendingSlideId='';
  }
  const number = (value, suffix, unknown) => value!=null&&value!==''&&Number.isFinite(Number(value))?Math.round(Number(value)).toLocaleString()+suffix:unknown;
  function slideCopy(a, snapshot) {
    const f=a.flight||{},airframe=a.airframe||{};
    const type=airframe.model||a.type||'Aircraft type unconfirmed';
    const service=[a.operator,f.flight_iata||f.flight_icao||a.call].filter(Boolean).join(' · ');
    const route=(f.dep_iata||f.dep_icao)&&(f.arr_iata||f.arr_icao)?(f.dep_iata||f.dep_icao)+' → '+(f.arr_iata||f.arr_icao):'';
    const telemetry=[number(a.alt,' FT','ALT UNKNOWN'),number(a.gs,' KT','SPEED UNKNOWN'),number(a.trk,'° TRACK','TRACK UNKNOWN')].join(' · ');
    const observed=Number(a.observedAt)||Number(snapshot.observedAt);
    const time=Number.isFinite(observed)?new Date(observed).toISOString().slice(11,19)+'Z':'TIME UNKNOWN';
    return '<div class="ambient-slide-reg">'+escapeHtml(a.reg)+'</div><div class="ambient-slide-type">'+escapeHtml(type)+'</div>'+
      (service?'<div class="ambient-slide-service">'+escapeHtml(service)+'</div>':'')+
      (route?'<div class="ambient-slide-route">'+escapeHtml(route)+'</div>':'')+
      '<div class="ambient-slide-details">'+escapeHtml(telemetry)+'</div><div class="ambient-slide-observed">OBSERVED '+escapeHtml(time)+'</div>'+
      '<div class="ambient-slide-credit">'+escapeHtml(a.photo.attribution)+' · '+escapeHtml(a.photo.license)+'</div>';
  }
  function display(a, snapshot) {
    displayed={signature:identity(a),id:a.id,registration:a.reg,url:a.photo.url};
    lastSlideId=displayed.signature;
    slideChangedAt=Date.now();
    // Both assignments happen in the same task after load AND decode. No mixed-airframe frame.
    photo.style.backgroundImage='url('+JSON.stringify(String(a.photo.url))+')';
    copy.innerHTML=slideCopy(a,snapshot);
    count.textContent='PHOTO VERIFIED';
    cancelPreload();
  }
  function preload(a) {
    if(!a)return cancelPreload();
    const signature=identity(a);
    if(prepared?.signature===signature)return;
    cancelPreload();
    const image=new Image(),generation=lifecycle;
    const pending=prepared={signature,image,ready:false};
    pendingSlideId=signature;
    image.onload=async()=>{
      try{if(image.decode)await image.decode();}catch{fail();return;}
      if(prepared!==pending||generation!==lifecycle||!active||mode!=='SLIDES')return;
      // Reread current identity, media and freshness after asynchronous decoding.
      if(!slideCandidates(data()).some(v=>identity(v)===signature)){cancelPreload();update();return;}
      pending.ready=true;
      update();
    };
    function fail(){
      if(prepared!==pending||generation!==lifecycle||!active||mode!=='SLIDES')return;
      failedPhotos.set(a.photo.url,Date.now());
      while(failedPhotos.size>128)failedPhotos.delete(failedPhotos.keys().next().value);
      cancelPreload();
      update();
    }
    image.onerror=fail;
    image.src=a.photo.url;
  }
  function drawSlides(snapshot) {
    const available=slideCandidates(snapshot);
    slide.hidden=false;canvas.hidden=true;
    root.classList.add('ambient-slides-mode');
    const current=displayed&&available.find(a=>identity(a)===displayed.signature);
    if(!current){
      displayed=null;lastSlideId='';count.textContent='';photo.style.backgroundImage='';
      copy.innerHTML=available.length?'':recent(snapshot)?'<div class="ambient-empty-title">Watching for an identified airframe</div><p>No exact-aircraft photograph has been verified in this session. Ambient Slides will not substitute an unrelated aircraft image.</p>':'<div class="ambient-empty-title">Observations paused</div><p>Waiting for recent aircraft observations before displaying verified photographs.</p>';
    } else {
      // Refresh actual aviation facts without interrupting the displayed image or hold.
      const html=slideCopy(current,snapshot);
      if(copy.innerHTML!==html)copy.innerHTML=html;
      count.textContent='PHOTO VERIFIED';
    }
    if(!available.length){cancelPreload();return;}
    const next=current?available[(available.indexOf(current)+1)%available.length]:available[0];
    if(current&&identity(next)===displayed.signature){cancelPreload();return;}
    if(prepared?.ready&&prepared.signature===identity(next)&&(!current||Date.now()-slideChangedAt>=HOLD_MS)){
      display(next,snapshot);
      const following=available[(available.indexOf(next)+1)%available.length];
      if(identity(following)!==displayed.signature)preload(following);
    } else preload(next);
  }
  function update() {
    if (!active) return;
    const snapshot=data();
    const observed=Number(snapshot.observedAt)||0;
    const age=Date.now()-observed;
    const fresh=observed>0 && age>=0 && age<90000;
    status.textContent=mode==='SKY'?(fresh?'':'OBSERVATIONS PAUSED'):'';
    status.classList.toggle('ambient-stale',!fresh);
    root.classList.toggle('ambient-slides-mode',mode==='SLIDES');
    if (mode==='SKY') {
      slide.hidden=true;canvas.hidden=false;
      drawSky(snapshot);
    } else {
      drawSlides(snapshot);

    }
  }
  function heartbeat() {
    if (document.hidden) return;
    if (!active && idleEnabled && Date.now()-lastInteraction>=idleMs && !document.querySelector('.detail.show,.catchment.show,.quota-panel.open')) enter();
    if (active) update();
  }
  root.querySelector('.ambient-return').addEventListener('click',leave);
  switcher.addEventListener('click',()=>choose(mode==='SKY'?'SLIDES':'SKY'));
  function syncSwitcher(){switcher.textContent=mode==='SKY'?'SLIDES ↗':'SKY ↗';}
  syncSwitcher();
  root.addEventListener('pointerdown',event=>{if (!event.target.closest('button,a')) leave();});
  root.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.stopPropagation();leave();}
    if(event.key==='Tab'){
      const controls=[...root.querySelectorAll('button,a[href]')].filter(el=>el.getClientRects().length);
      const first=controls[0],last=controls[controls.length-1];
      if(event.shiftKey&&(document.activeElement===first||document.activeElement===root)){event.preventDefault();last?.focus();}
      else if(!event.shiftKey&&(document.activeElement===last||document.activeElement===root)){event.preventDefault();first?.focus();}
    }
  });
  choice.querySelectorAll('[data-ambient-mode]').forEach(el=>el.addEventListener('click',()=>choose(el.dataset.ambientMode)));
  choice.querySelector('[data-ambient-idle]').addEventListener('click',()=>{idleEnabled=!idleEnabled;store('doaa.ambient.idle',idleEnabled?'on':'off');lastInteraction=Date.now();updateButtons();});
  document.addEventListener('pointerdown',event=>{if (!active && !event.target.closest('.ambient-controls')) lastInteraction=Date.now();},{passive:true});
  document.addEventListener('keydown',event=>{if (!active)lastInteraction=Date.now();if(active&&event.key==='Escape')leave();});
  document.addEventListener('scroll',()=>{if(!active)lastInteraction=Date.now();},{passive:true,capture:true});
  document.addEventListener('wheel',()=>{if(!active)lastInteraction=Date.now();},{passive:true});
  document.addEventListener('touchmove',()=>{if(!active)lastInteraction=Date.now();},{passive:true});
  document.addEventListener('visibilitychange',()=>{lastInteraction=Date.now();if(!document.hidden&&active)update();});
  window.addEventListener('doaa:observations',()=>{if(active)update();});
  window.addEventListener('resize',()=>{if(active)update();});
  window.DOAAAmbient={enter,leave,choose,openSettings:()=>choice.classList.toggle('show'),get mode(){return mode;},get active(){return active;}};
  updateButtons();
  setInterval(heartbeat,10000);
})();
