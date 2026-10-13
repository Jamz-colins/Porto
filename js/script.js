'use strict';
const EN = {
 skip:'Skip to content','nav.home':'Home','nav.about':'About','nav.skills':'Skills','nav.projects':'Projects','nav.contact':'Contact',
 'hero.headline':'Building the Web, One Thoughtful Solution at a Time.',
 'hero.desc':'A PPLG (software engineering) student interested in web development. I know the basics of WordPress, plus PHP, Laravel and MySQL, and I am looking for an internship (PKL) to learn in a real workplace.',
 'hero.cta1':'Explore Projects','hero.cta2':'Contact Me','hero.cap':'Decorative illustration: table relationships, something I learned through ERD work.',
 'about.title':'About me',
 'about.p1':'I am Muhaad Siro Jammu, called Siro, a Grade 11 PPLG 1 student at SMKN 1 Bangsri. I am drawn to web development because I enjoy breaking problems into small parts and solving them one by one.',
 'about.p2':'I understand the basics of WordPress and web programming with PHP, Laravel and MySQL. In a team project I worked on the design stage: drawing system flowcharts and an ERD for the database structure. Through an internship, I want to practise these basics in a real workplace and learn from professionals.',
 'about.t1':'Enjoys solving problems','about.t2':'Structured thinker','about.t3':'Quick to learn new things','about.t4':'Persistent in finding technical solutions',
 'about.school':'School','about.major':'Major / Class','about.loc':'Location',
 'skills.title':'Skills & technologies','skills.note':'Basic to intermediate level, used in school projects. No percentage scores, to stay honest.',
 'skills.web':'Web Development','skills.tools':'Tools & Design','skills.learning':'Currently learning','skills.basic':'basics',
 'proj.title':'Featured project','proj.sum':'A school profile website and information system, built by a team of three. I was responsible for designing the system logic flow and the database structure.',
 'proj.contribH':'My contribution','proj.c1':'Designed the system logic flow through flowcharts.','proj.c2':'Structured the database schema with an ERD.','proj.c3':'Contributed to system design together with the team.',
 'proj.detail':'View Details','proj.docs':'Project documentation will be added.',
 'jr.title':'Learning journey','jr.note':'I have no formal work experience yet, so this is a map of what I have learned and am learning.',
 'jr.1h':'Web development basics','jr.1p':'HTML, CSS, PHP and Laravel to build dynamic pages.',
 'jr.2h':'System flow design','jr.2p':'Drawing flowcharts so the team agrees on the logic before it becomes code.',
 'jr.3h':'Database modelling','jr.3p':'Building ERDs and MySQL schemas for school data.',
 'jr.4h':'Development tools','jr.4p':'Git, GitHub, Vite, Laragon, VS Code and Figma.',
 'jr.5h':'In progress','jr.5p':'WordPress, basic Linux and CLI, and JavaScript.',
 'ct.lead':'Open to an internship (PKL) in web development. Reach me through any of these.','ct.name':'Name','ct.email':'Email','ct.msg':'Message','ct.send':'Open email app',
 'ct.fnote':'This form opens your email app with the message prepared. There is no sending server yet.',
 'ft.txt':'Portfolio of a PPLG student at SMKN 1 Bangsri.',
 'd.1h':'1. Name and purpose','d.1p':'MTs Fadlun Nafis Website: a school profile website and information system.',
 'd.2h':'2. Need being addressed','d.2p':'The school needs a way to present its profile and manage information. Detailed requirements will be added from the team documentation.',
 'd.3h':'3. Solution overview','d.3p':'A web-based system using Laravel and MySQL, designed first through flowcharts, an ERD and Figma designs.',
 'd.4h':'4. Technologies','d.5h':'5. My contribution','d.5p':'Designing the logic flow (flowchart) and database structure (ERD) as part of the team. I do not claim to have built the whole frontend or backend.',
 'd.6h':'6. Flowchart design','d.6p':'The flowchart maps system steps and decision branches so every team member shares the same reference.',
 'd.7h':'7. ERD and database','d.7p':'The ERD defines tables, primary keys, foreign keys and the relationships between data in the MySQL schema.',
 'd.8h':'8. Team collaboration','d.8p':'Built by three people. My designs served as a shared reference so the other members\u2019 work connects.',
 'd.9h':'9. Technical lessons','d.9p':'A tidy flow and database design up front reduces confusion during implementation, and I learned to explain designs so the team understands them.',
 err:{req:['Wajib diisi.','This field is required.'],mail:['Format email belum benar, contoh: nama@email.com.','Invalid email format, e.g. name@email.com.'],ok:['Aplikasi email dibuka. Jika tidak muncul, kirim langsung ke jamun8036@gmail.com.','Email app opened. If nothing appears, write directly to jamun8036@gmail.com.']}
};
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = { get(k){ try { return localStorage.getItem(k) } catch { return null } }, set(k,v){ try { localStorage.setItem(k,v) } catch {} } };
let lang = 'id';

/* i18n: Indonesian text lives in the HTML; EN is swapped in. */
function initI18n() { $$('[data-i18n]').forEach(el => el.dataset.id = el.innerHTML); }
function setLang(l) {
  lang = l; document.documentElement.lang = l;
  $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; el.innerHTML = l === 'en' ? (EN[k] ?? el.dataset.id) : el.dataset.id; });
  $('#lang').textContent = l === 'id' ? 'ID' : 'EN'; $('#lang').setAttribute('aria-label', l === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia');
  document.title = l === 'en' ? 'Muhaad Siro Jammu (Siro) — PPLG Student & Aspiring Web Developer' : 'Muhaad Siro Jammu (Siro) — Portofolio Siswa PPLG & Calon Web Developer';
  $('.headline').textContent = l === 'en' ? EN['hero.headline'] : 'Membangun web, satu solusi yang dipikirkan matang pada satu waktu.';
  store.set('lang', l);
}
const t = k => EN.err[k][lang === 'en' ? 1 : 0];

function initTheme() {
  const root = document.documentElement, b = $('#theme');
  const sync = () => b.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Aktifkan mode terang / Light mode' : 'Aktifkan mode gelap / Dark mode');
  b.addEventListener('click', () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; store.set('theme', root.dataset.theme); sync(); });
  sync();
}

function initNav() {
  const menu = $('#menu'), burger = $('#burger');
  const close = () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
  $$('#menu a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  const links = $$('#menu a'), secs = ['home','about','skills','projects','contact'].map(id => document.getElementById(id));
  const mark = () => { let cur = 'home'; secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
    if (document.getElementById('journey').getBoundingClientRect().top < innerHeight * .4 && cur === 'projects') cur = 'projects';
    links.forEach(a => { const on = a.getAttribute('href') === '#' + cur; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'); }); };
  const top = $('#top');
  addEventListener('scroll', () => { mark(); top.hidden = scrollY < 600; }, { passive: true }); mark();
  top.addEventListener('click', () => scrollTo({ top: 0 }));
}

function initReveal() {
  const items = $$('.sec-t,.sk,.feat,.steps li,.links li,form,.edu,.traits');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  items.forEach(el => { el.classList.add('rv'); io.observe(el); });
}

function initPlaceholders() {
  $$('.ph').forEach(f => { const img = $('img', f), miss = () => f.classList.add('nophoto');
    img.addEventListener('error', miss); if (img.complete && !img.naturalWidth) miss(); });
}

function initModal() {
  const d = $('#dlg'), open = $('#open'); let opener;
  open.addEventListener('click', () => { opener = open; typeof d.showModal === 'function' ? d.showModal() : d.setAttribute('open', ''); });
  const shut = () => { d.close ? d.close() : d.removeAttribute('open'); opener && opener.focus(); };
  $('#close').addEventListener('click', shut);
  d.addEventListener('click', e => { if (e.target === d) shut(); });
}

function initForm() {
  const f = $('#form'), F = { n: ['#n', '#en'], e: ['#e', '#ee'], m: ['#m', '#em'] };
  const check = k => { const [i, o] = F[k].map(s => $(s)); const v = i.value.trim(); let m = '';
    if (!v) m = t('req'); else if (k === 'e' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) m = t('mail');
    o.textContent = m; i.setAttribute('aria-invalid', !!m); i.setAttribute('aria-describedby', o.id); return !m; };
  Object.keys(F).forEach(k => $(F[k][0]).addEventListener('blur', () => check(k)));
  f.addEventListener('submit', e => { e.preventDefault();
    const ok = Object.keys(F).map(check).every(Boolean); if (!ok) { const bad = $$('[aria-invalid=true]', f)[0]; bad && bad.focus(); return; }
    const body = `${$('#m').value.trim()}\n\n— ${$('#n').value.trim()} (${$('#e').value.trim()})`;
    location.href = `mailto:jamun8036@gmail.com?subject=${encodeURIComponent('Pesan dari portofolio: ' + $('#n').value.trim())}&body=${encodeURIComponent(body)}`;
    $('#fnote').textContent = t('ok'); });
}

function initParallax() {
  const art = $('#erd'); if (!art || matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover:hover)').matches) return;
  $('#home').addEventListener('pointermove', e => { const x = (e.clientX / innerWidth - .5) * 14, y = (e.clientY / innerHeight - .5) * 14; art.style.transform = `translate(${x}px,${y}px)`; });
}

function boot() {
  const steps = [initI18n, initTheme, initNav, initReveal, initPlaceholders, initModal, initForm, initParallax];
  steps.forEach(fn => { try { fn(); } catch (err) { console.error(fn.name, err); } });
  $('#year').textContent = new Date().getFullYear();
  $('#lang').addEventListener('click', () => setLang(lang === 'id' ? 'en' : 'id'));
  if (store.get('lang') === 'en') setLang('en');
}
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
