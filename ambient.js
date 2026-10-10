/* DOAA ambient compositions. Reads existing SKY observations; never acquires aviation data. */
(() => {
  'use strict';
  const root = document.createElement('section');
  root.id = 'doaa-ambient';
  root.setAttribute('aria-label', 'Ambient aviation display');
  root.hidden = true;
  root.innerHTML = `<canvas class="ambient-canvas" aria-hidden="true"></canvas>
    <div class="ambient-vignette"></div>
    <header class="ambient-head"><span class="ambient-kicker">DOAA <span class="ambient-dot">·</span> OTTAWA AVIATION</span><span class="ambient-status" aria-live="off">OBSERVING THE SKY</span></header>
    <div class="ambient-slide" hidden><div class="ambient-photo" aria-hidden="true"></div><div class="ambient-slide-copy"></div></div>
    <footer class="ambient-foot"><div class="ambient-caption">THE SKY, AS OBSERVED</div><div class="ambient-count"></div><button class="ambient-return" type="button">RETURN TO SKY <span aria-hidden="true">↗</span></button></footer>`;
  document.body.appendChild(root);
  const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
  const slide = root.querySelector('.ambient-slide'), photo = root.querySelector('.ambient-photo'), copy = root.querySelector('.ambient-slide-copy');
  const status = root.querySelector('.ambient-status'), count = root.querySelector('.ambient-count');
  const caption = root.querySelector('.ambient-caption');
  const choice = document.createElement('div');
  choice.className = 'ambient-controls';
  choice.innerHTML = `<button type="button" data-ambient-mode="SKY">AMBIENT SKY</button><button type="button" data-ambient-mode="SLIDES">AMBIENT SLIDES</button><button type="button" data-ambient-idle aria-pressed="false">AUTO-ENTER AFTER IDLE</button>`;
  document.body.appendChild(choice);
  const safeStorage = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const store = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  let mode = safeStorage('doaa.ambient.mode', 'SKY') === 'SLIDES' ? 'SLIDES' : 'SKY';
  let idleEnabled = safeStorage('doaa.ambient.idle', 'off') === 'on';
  let active = false, lastInteraction = Date.now(), lastSlideId = '', slideChangedAt = 0;
  let lastFrame = 0, lastSignature = '', lastObservationAt = 0, lastCandidates = [];
  const idleMs = 5 * 60 * 1000;
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const data = () => window.DOAALiveSnapshot?.() || { aircraft: [], observedAt: 0, home: null, provider: 'UNAVAILABLE' };
  const usable = a => Number.isFinite(Number(a.lat)) && Number.isFinite(Number(a.lon)) && a.id;
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
    update();
  }
  function leave() {
    if (!active) return;
    active = false;
    root.hidden = true;
    document.documentElement.classList.remove('ambient-active');
    lastInteraction = Date.now();
  }
  function choose(next) {
    if (next !== 'SKY' && next !== 'SLIDES') return;
    mode = next;
    store('doaa.ambient.mode', mode);
    lastSlideId = '';
    updateButtons();
    enter();
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
  function drawSky(snapshot) {
    const {w,h} = dimensions(), home = snapshot.home || {lat:45.32,lon:-75.67};
    const aircraft = (snapshot.aircraft || []).filter(usable);
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#081723';
    ctx.fillRect(0,0,w,h);
    const cx = w * .5, cy = h * .48, radius = Math.max(140, Math.min(w*.44,h*.43));
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(140,188,204,.13)';
    for (let i=1;i<=4;i++) { ctx.beginPath(); ctx.arc(cx,cy,radius*i/4,0,Math.PI*2); ctx.stroke(); }
    ctx.beginPath();ctx.moveTo(cx-radius,cy);ctx.lineTo(cx+radius,cy);ctx.moveTo(cx,cy-radius);ctx.lineTo(cx,cy+radius);ctx.stroke();
    ctx.fillStyle = '#9db5c2';ctx.font = '10px ui-monospace,monospace';ctx.textAlign='center';ctx.fillText('N',cx,cy-radius-14);
    const nm = 80, px = radius/nm, lat = Number(home.lat), lon = Number(home.lon);
    const cos = Math.cos(lat*Math.PI/180);
    for (const a of aircraft) {
      const x = cx+(Number(a.lon)-lon)*60*cos*px, y=cy-(Number(a.lat)-lat)*60*px;
      if (Math.hypot(x-cx,y-cy)>radius || !Number.isFinite(x+y)) continue;
      const heading = (Number(a.trk)||0)*Math.PI/180;
      ctx.save();ctx.translate(x,y);ctx.rotate(heading);
      ctx.fillStyle = '#b8e7ed';ctx.beginPath();ctx.moveTo(0,-9);ctx.lineTo(5,5);ctx.lineTo(0,2);ctx.lineTo(-5,5);ctx.closePath();ctx.fill();ctx.restore();
      if (w>600) {ctx.textAlign='left';ctx.font='10px ui-monospace,monospace';ctx.fillStyle='rgba(205,229,237,.76)';ctx.fillText(String(a.call||a.reg||a.id).slice(0,12),x+10,y+4);}
    }
    ctx.fillStyle='#c7dfe5';ctx.beginPath();ctx.arc(cx,cy,3,0,Math.PI*2);ctx.fill();
    count.textContent = aircraft.length + ' AIRCRAFT IN CURRENT SNAPSHOT · 80 NM REFERENCE';
  }
  function slideCandidate(snapshot) {
    // Only media already resolved by the application may appear. Never search for images here.
    const a = (snapshot.aircraft || []).find(x => usable(x) && x.photo?.url && x.photo?.registration && x.reg && String(x.photo.registration).toUpperCase() === String(x.reg).toUpperCase() && x.photo.license && x.photo.attribution);
    return a || null;
  }
  function drawSlides(snapshot) {
    const a = slideCandidate(snapshot);
    slide.hidden = false;
    canvas.hidden = true;
    caption.textContent = 'OBSERVED AIRCRAFT · VERIFIED MEDIA ONLY';
    if (!a) {
      photo.style.backgroundImage = '';
      copy.innerHTML = '<div class="ambient-empty-title">Watching for an identified airframe</div><p>No exact-aircraft photograph has been verified in this session. Ambient Slides will not substitute an unrelated aircraft image.</p>';
      count.textContent = 'AWAITING VERIFIED MEDIA';
      return;
    }
    const signature = [a.id,a.photo.url].join('|');
    if (signature !== lastSlideId && (!lastSlideId || Date.now()-slideChangedAt>45000)) {
      lastSlideId=signature;slideChangedAt=Date.now();
      photo.style.backgroundImage='url('+JSON.stringify(String(a.photo.url))+')';
      copy.innerHTML = '<div class="ambient-slide-reg">'+escapeHtml(a.reg)+'</div><div class="ambient-slide-type">'+escapeHtml(a.type||'Aircraft type unconfirmed')+'</div><div class="ambient-slide-details">'+escapeHtml(a.call||'')+' · '+escapeHtml(Math.round(Number(a.alt)||0))+' FT · '+escapeHtml(Math.round(Number(a.gs)||0))+' KT</div><div class="ambient-slide-credit">'+escapeHtml(a.photo.attribution)+' · '+escapeHtml(a.photo.license)+'</div>';
      count.textContent='CURRENT OBSERVATION · PHOTO VERIFIED';
    }
  }
  function update() {
    if (!active) return;
    const snapshot=data();
    const observed=Number(snapshot.observedAt)||0;
    const age=Date.now()-observed;
    const fresh=observed>0 && age>=0 && age<90000;
    status.textContent=fresh?'RECENT OBSERVATIONS · '+Math.round(age/1000)+' SEC AGO':observed?'LAST OBSERVED · '+Math.max(1,Math.round(age/60000))+' MIN AGO':'WAITING FOR OBSERVATIONS';
    status.classList.toggle('ambient-stale',!fresh);
    if (mode==='SKY') {
      slide.hidden=true;canvas.hidden=false;caption.textContent='THE SKY, AS OBSERVED';
      drawSky(snapshot);
    } else drawSlides(snapshot);
  }
  function heartbeat() {
    if (!active && idleEnabled && !document.hidden && Date.now()-lastInteraction>=idleMs) enter();
    if (active) update();
  }
  root.querySelector('.ambient-return').addEventListener('click',leave);
  root.addEventListener('pointerdown',event=>{if (!event.target.closest('button')) leave();});
  root.addEventListener('keydown',event=>{if(event.key==='Escape'||event.key==='Enter')leave();});
  choice.querySelectorAll('[data-ambient-mode]').forEach(el=>el.addEventListener('click',()=>choose(el.dataset.ambientMode)));
  choice.querySelector('[data-ambient-idle]').addEventListener('click',()=>{idleEnabled=!idleEnabled;store('doaa.ambient.idle',idleEnabled?'on':'off');lastInteraction=Date.now();updateButtons();});
  document.addEventListener('pointerdown',event=>{if (!active && !event.target.closest('.ambient-controls')) lastInteraction=Date.now();},{passive:true});
  document.addEventListener('keydown',event=>{if (!active)lastInteraction=Date.now();if(active&&event.key==='Escape')leave();});
  document.addEventListener('visibilitychange',()=>{lastInteraction=Date.now();});
  window.addEventListener('resize',()=>{if(active)update();});
  window.DOAAAmbient={enter,leave,choose,openSettings:()=>choice.classList.toggle('show'),get mode(){return mode;}};
  updateButtons();
  setInterval(heartbeat,10000);
})();
