'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = { get(k){ try { return localStorage.getItem(k) } catch { return null } }, set(k,v){ try { localStorage.setItem(k,v) } catch {} } };

function initTheme() {
  const root = document.documentElement, btn = $('#theme'), meta = $('meta[name=theme-color]');
  const apply = (t, save) => {
    root.dataset.theme = t;
    btn.setAttribute('aria-label', t === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
    btn.setAttribute('aria-pressed', t === 'dark');
    if (meta) meta.content = t === 'dark' ? '#070d24' : '#f6f8fc';
    if (save) store.set('theme', t);
  };
  apply(root.dataset.theme === 'light' ? 'light' : 'dark', false);
  btn.addEventListener('click', () => apply(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
  const mq = matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener && mq.addEventListener('change', e => { if (!store.get('theme')) apply(e.matches ? 'dark' : 'light', false); });
}

function initNav() {
  const menu = $('#menu'), burger = $('#burger'), nav = $('#nav');
  const close = () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
  $$('#menu a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) close(); });
  addEventListener('resize', () => { if (innerWidth > 900) close(); });
  const links = $$('#menu a'), ids = ['home','about','skills','projects','contact'], secs = ids.map(id => document.getElementById(id));
  const top = $('#top');
  const mark = () => {
    let cur = 'home';
    secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
    const j = document.getElementById('journey'); if (j.getBoundingClientRect().top < innerHeight * .4 && cur === 'projects') cur = 'projects';
    links.forEach(a => { const on = a.getAttribute('href') === '#' + cur; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'); });
    top.hidden = scrollY < 600;
    nav.classList.toggle('compact', scrollY > 40);
  };
  addEventListener('scroll', mark, { passive: true }); mark();
  top.addEventListener('click', () => scrollTo({ top: 0 }));
}

function initReveal() {
  const items = $$('.sec-t,.sk,.feat,.card,.steps li,.links li,form,.edu,.traits');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  items.forEach(el => { el.classList.add('rv'); io.observe(el); });
}

function initPlaceholders() {
  $$('.ph').forEach(f => { const img = $('img', f), miss = () => f.classList.add('nophoto');
    img.addEventListener('error', miss); if (img.complete && !img.naturalWidth) miss(); });
}

function initModal() {
  const d = $('#dlg'), open = $('#open');
  open.addEventListener('click', () => typeof d.showModal === 'function' ? d.showModal() : d.setAttribute('open', ''));
  const shut = () => { d.close ? d.close() : d.removeAttribute('open'); open.focus(); };
  $('#close').addEventListener('click', shut);
  d.addEventListener('click', e => { if (e.target === d) shut(); });
}

function initForm() {
  const f = $('#form'), F = { n: ['#n', '#en'], e: ['#e', '#ee'], m: ['#m', '#em'] };
  const check = k => { const [i, o] = F[k].map(s => $(s)), v = i.value.trim(); let m = '';
    if (!v) m = 'Wajib diisi.'; else if (k === 'e' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) m = 'Format email belum benar, contoh: nama@email.com.';
    o.textContent = m; i.setAttribute('aria-invalid', !!m); i.setAttribute('aria-describedby', o.id); return !m; };
  Object.keys(F).forEach(k => $(F[k][0]).addEventListener('blur', () => check(k)));
  f.addEventListener('submit', e => { e.preventDefault();
    if (!Object.keys(F).map(check).every(Boolean)) { const bad = $('[aria-invalid=true]', f); bad && bad.focus(); return; }
    const n = $('#n').value.trim(), body = `${$('#m').value.trim()}\n\n— ${n} (${$('#e').value.trim()})`;
    location.href = `mailto:jamun8036@gmail.com?subject=${encodeURIComponent('Pesan dari portofolio: ' + n)}&body=${encodeURIComponent(body)}`;
    $('#fnote').textContent = 'Aplikasi email dibuka. Jika tidak muncul, kirim langsung ke jamun8036@gmail.com.'; });
}

function initParallax() {
  const art = $('#erd'); if (!art || matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover:hover)').matches) return;
  $('#home').addEventListener('pointermove', e => { art.style.transform = `translate(${(e.clientX / innerWidth - .5) * 14}px,${(e.clientY / innerHeight - .5) * 14}px)`; });
}

function initIcons() {
  $$('img.ti').forEach(img => { const fb = () => { const s = document.createElement('span'); s.className = 'ti-fb'; s.setAttribute('aria-hidden', 'true'); s.textContent = img.dataset.n || '•'; img.replaceWith(s); };
    img.addEventListener('error', fb); if (img.complete && !img.naturalWidth) fb(); });
}
function initAvatar() {
  const logo = $('.logo'), img = $('.avatar'); if (!logo || !img) return;
  const miss = () => logo.classList.add('nophoto'); img.addEventListener('error', miss); if (img.complete && !img.naturalWidth) miss();
}

/* ===== pixel / game effects ===== */
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

function initEmbers() {
  const cv = $('#fx'), hero = $('#home'); if (!cv || REDUCED) return;
  const ctx = cv.getContext('2d'), S = 4; let w, h, ps = [], on = true, last = 0, pal = ['#4d82ff', '#7fb0ff', '#2fc3de'];
  const readPal = () => { const a = getComputedStyle(document.documentElement).getPropertyValue('--acc').trim(); if (a) pal = [a, '#7fb0ff', '#2fc3de']; };
  const mk = (anywhere) => ({ x: Math.random() * w, y: anywhere ? Math.random() * h : h + 2, vy: .12 + Math.random() * .35, ph: Math.random() * 6.28, sz: Math.random() < .2 ? 2 : 1, c: pal[(Math.random() * pal.length) | 0], a: .4 + Math.random() * .6 });
  const size = () => { w = Math.ceil(hero.clientWidth / S); h = Math.ceil(hero.clientHeight / S); cv.width = w; cv.height = h;
    const n = Math.min(70, Math.round(w / 9)); ps = Array.from({ length: n }, () => mk(true)); };
  const tick = t => { requestAnimationFrame(tick); if (!on || document.hidden || t - last < 50) return; last = t;
    ctx.clearRect(0, 0, w, h);
    for (const p of ps) { p.y -= p.vy; p.ph += .06; p.x += Math.sin(p.ph) * .25; if (p.y < -2) Object.assign(p, mk(false));
      ctx.globalAlpha = Math.random() < .08 ? .2 : p.a * Math.min(1, p.y / (h * .5) + .2); ctx.fillStyle = p.c; ctx.fillRect(p.x | 0, p.y | 0, p.sz, p.sz); } };
  readPal(); size(); addEventListener('resize', size);
  new MutationObserver(readPal).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  'IntersectionObserver' in window && new IntersectionObserver(e => { on = e[0].isIntersecting; }).observe(hero);
  requestAnimationFrame(tick);
}

function initRunner() {
  const svg = $('#runner'), bar = $('#rbar'); if (!svg || !bar) return;
  const head = ['.....f......','....fFf.....','...fFFFf....','...fFFFf....','....fff.....','....bbb.....','...bbbbb....','..bbbbbbb...','..b.bbb.b...','....bbb.....'];
  const A = ['....b.b.....','...b...b....','..b.....bb..','..bb....bb..'], B = ['....bbb.....','....b.b.....','....b.b.....','...bb.bb....'];
  const draw = (rows, cls, y0) => `<g class="${cls}">` + rows.map((r, y) => [...r].map((c, x) => c === '.' ? '' : `<rect class="s-${c}" x="${x}" y="${y0 + y}" width="1" height="1"/>`).join('')).join('') + '</g>';
  svg.innerHTML = draw(head, '', 0) + draw(A, 'fA', 10) + draw(B, 'fB', 10);
  let t;
  const upd = () => { const max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? Math.min(1, scrollY / max) : 0;
    bar.style.width = p * 100 + '%'; svg.style.left = Math.max(0, p * (innerWidth - 24)) + 'px';
    if (!REDUCED) { svg.classList.add('run'); clearTimeout(t); t = setTimeout(() => svg.classList.remove('run'), 160); } };
  addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
}

function initBurst() {
  if (REDUCED) return;
  document.addEventListener('click', e => { if (!e.target.closest('.btn')) return;
    for (let i = 0; i < 10; i++) { const d = document.createElement('span'); d.className = 'burst'; d.style.left = e.clientX + 'px'; d.style.top = e.clientY + 'px';
      document.body.appendChild(d); const a = (i / 10) * 6.28 + Math.random(), r = 24 + Math.random() * 28, q = v => Math.round(v / 4) * 4;
      d.animate([{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${q(Math.cos(a) * r)}px,${q(Math.sin(a) * r)}px)`, opacity: 0 }], { duration: 520, easing: 'steps(5)' }).onfinish = () => d.remove(); } });
}

function boot() {
  [initTheme, initNav, initIcons, initAvatar, initEmbers, initRunner, initBurst, initReveal, initPlaceholders, initModal, initForm, initParallax].forEach(fn => { try { fn(); } catch (err) { console.error(fn.name, err); } });
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
}
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
