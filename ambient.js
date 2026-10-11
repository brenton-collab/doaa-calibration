/* DOAA ambient compositions. Reads existing SKY observations; never acquires aviation data. */
(() => {
  'use strict';
  const root = document.createElement('section');
  root.id = 'doaa-ambient';
  root.setAttribute('aria-label', 'Ambient aviation display');
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
  let lastFrame = 0, lastSignature = '', lastObservationAt = 0, lastCandidates = [];
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
    active = true;
    root.hidden = false;
    document.documentElement.classList.add('ambient-active');
    choice.classList.remove('show');
    lastFrame = 0;
    trails.clear();
    update();
    window.dispatchEvent(new Event('doaa:ambient-enter'));
  }
  function leave() {
    if (!active) return;
    active = false;
    pendingSlideId = '';
    root.hidden = true;
    document.documentElement.classList.remove('ambient-active');
    lastInteraction = Date.now();
  }
  function choose(next) {
    if (next !== 'SKY' && next !== 'SLIDES') return;
    mode = next;
    store('doaa.ambient.mode', mode);
    pendingSlideId = '';
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
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return {w,h};
  }
  // Persistent strokes accumulate from actual observed movement, never simulated traffic.
  const trails = new Map();
  const verifiedMedia = new Map();
  const failedPhotos = new Set();
  window.addEventListener('doaa:airframe-media', event => {const m=event.detail||{};if(m.id&&/^https:\/\//i.test(String(m.url||''))&&m.registration&&m.license&&m.attribution)verifiedMedia.set(String(m.id).toLowerCase(),{...m,seenAt:Date.now()});});
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
  function slideCandidate(snapshot) {
    // Only exact-airframe media already reconciled by an Inspector is eligible.
    // No image searches or new provider calls are made during composition changes.
    const available = (snapshot.aircraft||[]).filter(usable).map(a=>{
      const media=verifiedMedia.get(String(a.id).toLowerCase());
      if(!media || failedPhotos.has(media.url) || !a.reg || String(media.registration).toUpperCase()!==String(a.reg).toUpperCase())return null;
      return {...a,photo:{url:media.url,registration:media.registration,license:media.license,attribution:media.attribution,page:media.page}};
    }).filter(Boolean);
    if(!available.length)return null;
    const previous=available.find(a=>[a.id,a.photo.url].join('|')===lastSlideId);
    const held=previous&&Date.now()-slideChangedAt<45000;
    const next=held?previous:available[(available.indexOf(previous)+1)%available.length];
    lastCandidates=available.map(a=>a.id);
    return next;
  }
  function drawSlides(snapshot) {
    const stamp=Number(snapshot.observedAt)||0;
    const recent=stamp>0&&Date.now()>=stamp&&Date.now()-stamp<90000;
    const a = recent?slideCandidate(snapshot):null;
    slide.hidden = false;
    canvas.hidden = true;
    root.classList.add('ambient-slides-mode');
    if (!a) {
      pendingSlideId = '';
      lastSlideId = '';
      photo.style.backgroundImage = '';
      copy.innerHTML = recent?'<div class="ambient-empty-title">Watching for an identified airframe</div><p>No exact-aircraft photograph has been verified in this session. Ambient Slides will not substitute an unrelated aircraft image.</p>':'<div class="ambient-empty-title">Observations paused</div><p>Waiting for recent aircraft observations before displaying verified photographs.</p>';
      count.textContent = '';
      return;
    }
    const signature = [a.id,a.photo.url].join('|');
    if (signature === lastSlideId || signature === pendingSlideId) return;
    pendingSlideId = signature;
    const image = new Image();
    image.onload = () => {
      if (pendingSlideId !== signature) return;
      pendingSlideId = '';
      if (!active || mode !== 'SLIDES') return;
      const current = data();
      const observed = Number(current.observedAt)||0;
      if (!(observed>0 && Date.now()>=observed && Date.now()-observed<90000) || !(current.aircraft||[]).some(v=>String(v.id)===String(a.id) && String(v.reg||'').toUpperCase()===String(a.reg).toUpperCase())) {update();return;}
      lastSlideId = signature;
      slideChangedAt = Date.now();
      photo.style.backgroundImage = 'url('+JSON.stringify(String(a.photo.url))+')';
      copy.innerHTML = '<div class="ambient-slide-reg">'+escapeHtml(a.reg)+'</div><div class="ambient-slide-type">'+escapeHtml(a.type||'Aircraft type unconfirmed')+'</div><div class="ambient-slide-details">'+escapeHtml(a.call||'')+' · '+escapeHtml(a.alt!=null&&a.alt!==''&&Number.isFinite(Number(a.alt))?Math.round(Number(a.alt))+' FT':'ALT UNKNOWN')+' · '+escapeHtml(a.gs!=null&&a.gs!==''&&Number.isFinite(Number(a.gs))?Math.round(Number(a.gs))+' KT':'SPEED UNKNOWN')+'</div><div class="ambient-slide-credit">'+escapeHtml(a.photo.attribution)+' · '+escapeHtml(a.photo.license)+'</div>';
      count.textContent = 'PHOTO VERIFIED';
    };
    image.onerror = () => {
      failedPhotos.add(a.photo.url);
      if (pendingSlideId !== signature) return;
      pendingSlideId = '';
      if (active && mode === 'SLIDES') update();
    };
    image.src = a.photo.url;
  }
  function update() {
    if (!active) return;
    const snapshot=data();
    const observed=Number(snapshot.observedAt)||0;
    const age=Date.now()-observed;
    const fresh=observed>0 && age>=0 && age<90000;
    status.textContent=mode==='SKY'?(fresh?'':'OBSERVATIONS PAUSED'):(fresh?'RECENT OBSERVATION':observed?'LAST OBSERVED':'AWAITING OBSERVATION');
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
    if (!active && idleEnabled && Date.now()-lastInteraction>=idleMs) enter();
    if (active) update();
  }
  root.querySelector('.ambient-return').addEventListener('click',leave);
  switcher.addEventListener('click',()=>choose(mode==='SKY'?'SLIDES':'SKY'));
  function syncSwitcher(){switcher.textContent=mode==='SKY'?'SLIDES ↗':'SKY ↗';}
  syncSwitcher();
  root.addEventListener('pointerdown',event=>{if (!event.target.closest('button')) leave();});
  root.addEventListener('keydown',event=>{if(event.key==='Escape')leave();});
  choice.querySelectorAll('[data-ambient-mode]').forEach(el=>el.addEventListener('click',()=>choose(el.dataset.ambientMode)));
  choice.querySelector('[data-ambient-idle]').addEventListener('click',()=>{idleEnabled=!idleEnabled;store('doaa.ambient.idle',idleEnabled?'on':'off');lastInteraction=Date.now();updateButtons();});
  document.addEventListener('pointerdown',event=>{if (!active && !event.target.closest('.ambient-controls')) lastInteraction=Date.now();},{passive:true});
  document.addEventListener('keydown',event=>{if (!active)lastInteraction=Date.now();if(active&&event.key==='Escape')leave();});
  document.addEventListener('scroll',()=>{if(!active)lastInteraction=Date.now();},{passive:true,capture:true});
  document.addEventListener('wheel',()=>{if(!active)lastInteraction=Date.now();},{passive:true});
  document.addEventListener('touchmove',()=>{if(!active)lastInteraction=Date.now();},{passive:true});
  document.addEventListener('visibilitychange',()=>{lastInteraction=Date.now();if(!document.hidden&&active)update();});
  window.addEventListener('resize',()=>{if(active)update();});
  window.DOAAAmbient={enter,leave,choose,openSettings:()=>choice.classList.toggle('show'),get mode(){return mode;},get active(){return active;}};
  updateButtons();
  setInterval(heartbeat,10000);
})();
