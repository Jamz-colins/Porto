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

function boot() {
  [initTheme, initNav, initReveal, initPlaceholders, initModal, initForm, initParallax].forEach(fn => { try { fn(); } catch (err) { console.error(fn.name, err); } });
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
}
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
