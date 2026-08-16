/* ============================================
   PORTFOLIO — Main JavaScript
   Public site — no login required to VIEW
   Admin login needed only for project CRUD
   ============================================ */
'use strict';

/* ══════════════════════════════════════════════
   SESSION HELPER
══════════════════════════════════════════════ */
const SESSION_KEY = 'portfolio_auth';

function isAdmin() {
  try {
    const s = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
    return !!(s && s.expires && Date.now() < s.expires && s.role === 'admin');
  } catch { return false; }
}

/* ══════════════════════════════════════════════
   DOM READY
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle(); // must run first — reads localStorage & wires button
  initPageEntry();
  initBgCanvas();
  initNavbar();
  initTyped();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initProjectFilter();
  initContactForm();
  initScrollTop();
  initAdminUI();   // show/hide admin controls based on session
  initMobileNav();
  initCursorGlow();
  initTiltCards();
});

/* ══════════════════════════════════════════════
   PAGE ENTRY ANIMATION
══════════════════════════════════════════════ */
function initPageEntry() {
  document.body.classList.add('page-enter');
}

/* ══════════════════════════════════════════════
   THEME TOGGLE — Light / Dark
══════════════════════════════════════════════ */
const THEME_KEY = 'portfolio_theme';

function initThemeToggle() {
  // Apply saved preference (the inline <script> handles initial render,
  // but we still sync here in case DOMContentLoaded fires before it ran)
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved, false);

  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next    = current === 'light' ? 'dark' : 'light';
    applyTheme(next, true);
  });
}

function applyTheme(theme, animate) {
  const root = document.documentElement;

  if (animate) {
    // Brief flash-overlay for smooth transition
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99999;pointer-events:none;
      background:${theme === 'light' ? '#f0f4ff' : '#050810'};
      opacity:0;transition:opacity 0.18s ease;
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      overlay.style.opacity = '0.35';
      setTimeout(() => {
        root.setAttribute('data-theme', theme === 'light' ? 'light' : '');
        if (theme === 'dark') root.removeAttribute('data-theme');
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 200);
      }, 180);
    });
  } else {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  localStorage.setItem(THEME_KEY, theme);

  // Update canvas particle colours to match theme
  _themeParticleColors = theme === 'light'
    ? ['rgba(0,180,220,', 'rgba(110,40,230,', 'rgba(220,30,90,', 'rgba(0,180,100,']
    : ['rgba(0,229,255,', 'rgba(123,47,255,', 'rgba(255,45,120,', 'rgba(0,255,136,'];

  // Update cursor glow colour
  const glowEl = document.getElementById('_cursorGlow');
  if (glowEl) {
    glowEl.style.background = theme === 'light'
      ? 'radial-gradient(circle,rgba(0,180,220,0.08) 0%,transparent 70%)'
      : 'radial-gradient(circle,rgba(0,229,255,0.06) 0%,transparent 70%)';
  }
}

/* ══════════════════════════════════════════════
   BACKGROUND CANVAS — Particle Network
══════════════════════════════════════════════ */
// Shared colour array — updated by applyTheme()
let _themeParticleColors = ['rgba(0,229,255,','rgba(123,47,255,','rgba(255,45,120,','rgba(0,255,136,'];

function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', () => { resize(); buildParticles(); });
  resize();

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x     = Math.random() * W;
      this.y     = initial ? Math.random() * H : Math.random() * H;
      this.vx    = (Math.random() - 0.5) * 0.25;
      this.vy    = (Math.random() - 0.5) * 0.25;
      this.r     = Math.random() * 1.2 + 0.3;
      this.base  = Math.random() * 0.35 + 0.05;
      this.alpha = this.base;
      this.pulse = Math.random() * Math.PI * 2;
      this.colorIdx = Math.floor(Math.random() * 4);
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.pulse += 0.02;
      this.alpha = this.base + Math.sin(this.pulse) * 0.07;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = _themeParticleColors[this.colorIdx] + this.alpha + ')';
      ctx.fill();
    }
  }

  function buildParticles() {
    const COUNT = Math.min(80, Math.floor(W / 18));
    particles = Array.from({ length: COUNT }, () => new Particle());
  }
  buildParticles();

  function connectParticles() {
    const DIST = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `${_themeParticleColors[0]}${(1 - dist/DIST) * 0.07})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  (function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  })();
}

/* ══════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════ */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const indicator = document.getElementById('navIndicator');
  const sections  = document.querySelectorAll('section[id]');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveLink();
  }

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(sec => { if (sec.offsetTop <= scrollY) current = sec.id; });
    navLinks.forEach(link => {
      const active = link.dataset.section === current;
      link.classList.toggle('active', active);
      if (active) moveIndicator(link);
    });
  }

  function moveIndicator(link) {
    if (!indicator) return;
    const r  = link.getBoundingClientRect();
    const nr = navbar.getBoundingClientRect();
    indicator.style.left  = `${r.left - nr.left}px`;
    indicator.style.width = `${r.width}px`;
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(link.dataset.section)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const al = document.querySelector('.nav-link.active');
  if (al) moveIndicator(al);
}

/* ══════════════════════════════════════════════
   TYPED TEXT
══════════════════════════════════════════════ */
function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const PHRASES = ['A Developer.','A Designer.','3D Artist.','Tech Creator.','Problem Solver.'];
  let pi = 0, ci = 0, del = false, paused = false;

  function tick() {
    if (paused) return;
    const p = PHRASES[pi];
    if (!del) {
      el.textContent = p.slice(0, ++ci);
      if (ci === p.length) { paused = true; setTimeout(() => { paused = false; del = true; tick(); }, 1800); return; }
      setTimeout(tick, 85);
    } else {
      el.textContent = p.slice(0, --ci);
      if (ci === 0) { del = false; pi = (pi + 1) % PHRASES.length; paused = true; setTimeout(() => { paused = false; tick(); }, 400); return; }
      setTimeout(tick, 45);
    }
  }
  setTimeout(tick, 800);
}

/* ══════════════════════════════════════════════
   SCROLL REVEAL — Professional entrance system
   Each element gets a context-aware animation
══════════════════════════════════════════════ */
function initScrollReveal() {
  // Upgrade existing .reveal elements with smarter variants
  _assignRevealVariants();

  const ELS = document.querySelectorAll(
    '.reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-flip'
  );
  if (!ELS.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const parent = el.closest(
        '.projects-grid,.contact-cards,.about-pillars,.skills-list,.hero-actions,.hero-stats'
      );

      if (parent) {
        // Staggered siblings — each child delayed by 80ms
        const siblings = Array.from(parent.children).filter(c =>
          c.classList.contains('reveal') ||
          c.classList.contains('reveal-left') ||
          c.classList.contains('reveal-right') ||
          c.classList.contains('reveal-scale') ||
          c.classList.contains('reveal-flip')
        );
        const idx = siblings.indexOf(el);
        const delay = idx * 85;
        el.style.transitionDelay = `${delay}ms`;
        setTimeout(() => {
          el.classList.add('visible');
          // Clean up delay after animation so hover transitions aren't delayed
          setTimeout(() => { el.style.transitionDelay = ''; }, delay + 900);
        }, delay);
      } else {
        el.classList.add('visible');
      }

      obs.unobserve(el);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  ELS.forEach(el => obs.observe(el));
}

/* Assign smarter animation classes based on element context */
function _assignRevealVariants() {
  // Section titles → scale up
  document.querySelectorAll('.section-title').forEach(el => {
    el.classList.remove('reveal-left','reveal-right');
    el.classList.add('reveal-scale');
  });

  // Section lines → width reveal (use scale)
  document.querySelectorAll('.section-line').forEach(el => {
    el.classList.add('reveal-scale');
  });

  // Project cards → flip in
  document.querySelectorAll('.project-card').forEach(el => {
    el.classList.remove('reveal-left','reveal-right');
    el.classList.add('reveal-flip');
  });

  // Pillars → already reveal, keep slide up but add stagger class
  document.querySelectorAll('.pillar').forEach((el, i) => {
    el.classList.add(`reveal-delay-${Math.min(i + 1, 6)}`);
  });

  // Contact cards → slide from left
  document.querySelectorAll('.contact-card').forEach(el => {
    el.classList.remove('reveal-right');
    el.classList.add('reveal-left');
  });

  // Stats → scale
  document.querySelectorAll('.hstat').forEach((el, i) => {
    el.classList.add('reveal-scale');
    el.style.transitionDelay = `${i * 100}ms`;
  });

  // Skill bars → slide from right
  document.querySelectorAll('.skill-bar-item').forEach(el => {
    el.classList.add('reveal-right');
  });
}

/* ══════════════════════════════════════════════
   SKILL BARS
══════════════════════════════════════════════ */
function initSkillBars() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const fill = entry.target.querySelector('.sb-fill');
      if (fill) setTimeout(() => { fill.style.width = entry.target.dataset.level + '%'; }, 200);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-bar-item').forEach(b => obs.observe(b));
}

/* ══════════════════════════════════════════════
   COUNTERS
══════════════════════════════════════════════ */
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target, end = parseInt(el.dataset.count, 10), dur = 1600;
      const start = performance.now();
      (function upd(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * end);
        if (p < 1) requestAnimationFrame(upd);
      })(start);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.hstat-num[data-count]').forEach(n => obs.observe(n));
}

/* ══════════════════════════════════════════════
   PROJECT FILTER
══════════════════════════════════════════════ */
function initProjectFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach((card, i) => {
        const cats = card.dataset.category || '';
        const show = filter === 'all' || cats.split(' ').includes(filter);
        if (show) {
          card.classList.remove('hidden-card');
          card.style.animationDelay = `${i * 50}ms`;
          card.classList.add('filter-in');
          card.addEventListener('animationend', () => card.classList.remove('filter-in'), { once: true });
        } else {
          card.classList.add('filter-out');
          card.addEventListener('animationend', () => {
            card.classList.remove('filter-out');
            card.classList.add('hidden-card');
          }, { once: true });
        }
      });
    });
  });
}

/* ══════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════ */
function initContactForm() {
  const form       = document.getElementById('contactForm');
  const sendBtn    = document.getElementById('sendBtn');
  const successMsg = document.getElementById('formSuccessMsg');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name    = form.contactName?.value.trim();
    const email   = form.contactEmail?.value.trim();
    const message = form.contactMessage?.value.trim();
    if (!name || !email || !message) { highlightEmpty(form); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.contactEmail.style.borderColor = 'rgba(255,45,120,0.5)';
      form.contactEmail.focus(); return;
    }
    sendBtn.disabled = true; sendBtn.style.opacity = '0.7';
    sendBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="animation:spin 1s linear infinite"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="20"/></svg> Sending...`;
    await new Promise(r => setTimeout(r, 1200));
    sendBtn.disabled = false; sendBtn.style.opacity = '1';
    sendBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2"/><polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" stroke-width="2"/></svg> Send Message`;
    form.reset();
    if (successMsg) {
      successMsg.textContent = "✓ Message sent! I'll get back to you soon.";
      successMsg.classList.add('show');
      setTimeout(() => successMsg.classList.remove('show'), 5000);
    }
  });
  form.querySelectorAll('.form-input').forEach(inp => {
    inp.addEventListener('input', () => { inp.style.borderColor = ''; });
  });
}

function highlightEmpty(form) {
  ['contactName','contactEmail','contactMessage'].forEach(id => {
    const el = form[id];
    if (el && !el.value.trim()) {
      el.style.borderColor = 'rgba(255,45,120,0.5)';
      el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
    }
  });
}

/* ══════════════════════════════════════════════
   SCROLL TO TOP
══════════════════════════════════════════════ */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ══════════════════════════════════════════════
   MOBILE NAV
══════════════════════════════════════════════ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.getElementById('navOverlay');
  if (!hamburger || !navLinks) return;

  function close() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    overlay?.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    overlay?.classList.toggle('show', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  overlay?.addEventListener('click', close);
  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ══════════════════════════════════════════════
   CURSOR GLOW (desktop only)
══════════════════════════════════════════════ */
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.id = '_cursorGlow';
  glow.style.cssText = `
    position:fixed;width:300px;height:300px;border-radius:50%;
    pointer-events:none;z-index:9999;
    background:radial-gradient(circle,rgba(0,229,255,0.06) 0%,transparent 70%);
    transform:translate(-50%,-50%);
    transition:width .3s,height .3s,background .3s,opacity .3s;
    mix-blend-mode:screen;
  `;
  document.body.appendChild(glow);
  let mx = -999, my = -999, gx = -999, gy = -999;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
  (function loop() {
    gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
    glow.style.left = `${gx}px`; glow.style.top = `${gy}px`;
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.project-card,.contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      glow.style.width = glow.style.height = '420px';
      glow.style.background = 'radial-gradient(circle,rgba(123,47,255,0.1) 0%,transparent 70%)';
    });
    el.addEventListener('mouseleave', () => {
      glow.style.width = glow.style.height = '300px';
      glow.style.background = 'radial-gradient(circle,rgba(0,229,255,0.06) 0%,transparent 70%)';
    });
  });
}

/* ══════════════════════════════════════════════
   TILT CARDS
══════════════════════════════════════════════ */
function initTiltCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease,border-color 0.3s ease,box-shadow 0.3s ease';
    });
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height/2) / (r.height/2)) * -6;
      const ry = ((e.clientX - r.left - r.width /2) / (r.width /2)) *  6;
      card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = ''; card.style.transition = 'transform 0.5s ease';
    });
  });
}

/* ══════════════════════════════════════════════
   ████████████████████████████████████████████
   ADMIN UI — All admin features live here
   ████████████████████████████████████████████
══════════════════════════════════════════════ */

function initAdminUI() {
  const admin = isAdmin();

  // ── 1. Navbar: show Admin button or Login button ──
  const navControls = document.querySelector('.nav-controls');

  if (admin) {
    // Render: [+ Add Project] [Logout]
    const addBtn = document.createElement('button');
    addBtn.className = 'btn-admin-add';
    addBtn.id = 'adminAddBtn';
    addBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2"/>
        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/>
      </svg>
      <span>Add Project</span>`;
    addBtn.setAttribute('aria-label', 'Add new project');

    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn-admin-logout';
    logoutBtn.id = 'logoutBtn';
    logoutBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2"/>
        <polyline points="16 17 21 12 16 7" stroke="currentColor" stroke-width="2"/>
        <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2"/>
      </svg>
      <span>Logout</span>`;

    // Replace existing logout button content
    const existingLogout = document.getElementById('logoutBtn');
    const hamburger      = document.getElementById('hamburger');
    if (existingLogout) existingLogout.replaceWith(logoutBtn);
    navControls.insertBefore(addBtn, hamburger || null);

    addBtn.addEventListener('click',    () => openModal('add'));
    logoutBtn.addEventListener('click', doLogout);

    // ── 2. Per-card: inject Edit / Delete buttons ──
    document.querySelectorAll('.project-card').forEach((card, i) => {
      card.dataset.id = i + 1;
      injectCardControls(card);
    });

    // ── 3. Build the modal & confirm dialog in DOM ──
    buildAdminDOM();

  } else {
    // Not admin — show "Admin Login" link instead of logout
    const existingLogout = document.getElementById('logoutBtn');
    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.className = 'btn-admin-login-link';
    loginLink.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" stroke-width="2"/>
        <polyline points="10 17 15 12 10 7" stroke="currentColor" stroke-width="2"/>
        <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/>
      </svg>
      Admin`;
    if (existingLogout) existingLogout.replaceWith(loginLink);
  }
}

/* ── Logout ───────────────────────────────── */
function doLogout() {
  document.body.style.transition = 'opacity 0.4s ease,filter 0.4s ease';
  document.body.style.opacity    = '0';
  document.body.style.filter     = 'blur(8px)';
  setTimeout(() => {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.reload();
  }, 400);
}

/* ── Inject edit/delete into a card ─────── */
function injectCardControls(card) {
  const footer = card.querySelector('.card-footer');
  if (!footer) return;

  const wrap = document.createElement('div');
  wrap.className = 'card-admin-btns';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn-card-edit';
  editBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/></svg> Edit`;
  editBtn.addEventListener('click', () => openModal('edit', card));

  const delBtn = document.createElement('button');
  delBtn.className = 'btn-card-delete';
  delBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="currentColor" stroke-width="2"/><path d="M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="2"/><path d="M10 11v6M14 11v6M9 6V4h6v2" stroke="currentColor" stroke-width="2"/></svg> Delete`;
  delBtn.addEventListener('click', () => openConfirm(card));

  wrap.append(editBtn, delBtn);
  footer.appendChild(wrap);
}

/* ── Build modal HTML once ───────────────── */
let modalBuilt = false;
function buildAdminDOM() {
  if (modalBuilt) return;
  modalBuilt = true;

  document.body.insertAdjacentHTML('beforeend', `
    <!-- Admin Modal -->
    <div id="adminModalBackdrop" class="admin-modal-backdrop" role="dialog" aria-modal="true">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <h2 class="admin-modal-title" id="adminModalTitle">Add Project</h2>
          <button class="admin-modal-close" id="adminModalClose" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
              <line x1="6"  y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <form id="adminForm" class="admin-form" novalidate>
          <input type="hidden" id="editCardId"/>
          <div class="form-group">
            <label class="form-label" for="projTitle">Project Title *</label>
            <input type="text" id="projTitle" class="form-input" placeholder="e.g. AI Chatbot System" required/>
          </div>
          <div class="form-group">
            <label class="form-label" for="projDesc">Description *</label>
            <textarea id="projDesc" class="form-input" rows="3" placeholder="Short project description..." required></textarea>
          </div>
          <div class="admin-form-row">
            <div class="form-group">
              <label class="form-label" for="projCategory">Category</label>
              <select id="projCategory" class="form-input">
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="3d">3D</option>
                <option value="ai">AI / ML</option>
                <option value="programming design">Programming + Design</option>
                <option value="3d design">3D + Design</option>
                <option value="programming ai">Programming + AI</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="projTech">Tech Stack</label>
              <input type="text" id="projTech" class="form-input" placeholder="Python, TensorFlow, ..."/>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="projLink">Project Link</label>
            <input type="text" id="projLink" class="form-input" placeholder="https://..."/>
          </div>
          <div class="admin-form-actions">
            <button type="button" class="btn-admin-cancel" id="adminCancelBtn">Cancel</button>
            <button type="submit" class="btn-admin-save"><span id="adminSaveLabel">Save Project</span></button>
          </div>
        </form>
      </div>
    </div>

    <!-- Confirm Delete -->
    <div id="confirmDialog" class="confirm-dialog" role="alertdialog" aria-modal="true">
      <div class="confirm-box">
        <div class="confirm-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <polyline points="3 6 5 6 21 6" stroke="currentColor" stroke-width="2"/>
            <path d="M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="2"/>
            <path d="M10 11v6M14 11v6M9 6V4h6v2" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="confirm-title">Delete Project?</h3>
        <p class="confirm-text">This action cannot be undone.<br/>The project card will be permanently removed.</p>
        <div class="confirm-actions">
          <button class="btn-admin-cancel" id="confirmCancelBtn">Cancel</button>
          <button class="btn-confirm-delete" id="confirmDeleteBtn">Delete</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div id="adminToast" class="admin-toast" role="status" aria-live="polite"></div>
  `);

  // Wire modal events
  const backdrop   = document.getElementById('adminModalBackdrop');
  const form       = document.getElementById('adminForm');
  const closeBtn   = document.getElementById('adminModalClose');
  const cancelBtn  = document.getElementById('adminCancelBtn');
  const confirmDlg = document.getElementById('confirmDialog');
  const confirmDel = document.getElementById('confirmDeleteBtn');
  const confirmCxl = document.getElementById('confirmCancelBtn');

  closeBtn.addEventListener('click',  closeModal);
  cancelBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click',  e => { if (e.target === backdrop) closeModal(); });
  confirmDel.addEventListener('click', executeDeletion);
  confirmCxl.addEventListener('click', closeConfirm);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeConfirm(); }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const title    = document.getElementById('projTitle').value.trim();
    const desc     = document.getElementById('projDesc').value.trim();
    const category = document.getElementById('projCategory').value;
    const tech     = document.getElementById('projTech').value.trim();
    const link     = document.getElementById('projLink').value.trim() || '#';
    const editId   = document.getElementById('editCardId').value;

    if (!title || !desc) { showToast('Title and description are required.', 'error'); return; }

    if (editId) {
      // Edit existing
      const card = document.querySelector(`.project-card[data-id="${editId}"]`);
      if (card) {
        card.querySelector('.card-title').textContent = title;
        card.querySelector('.card-desc').textContent  = desc;
        card.dataset.category = category;
        const techEl = card.querySelector('.card-tech');
        if (techEl) techEl.innerHTML = tech
          ? tech.split(',').map(t => `<span class="tech-pill">${t.trim()}</span>`).join('')
          : '';
        const linkEl = card.querySelector('.card-link');
        if (linkEl) linkEl.href = link;
        showToast('✓ Project updated!');
      }
    } else {
      // Add new
      const id   = Date.now();
      const card = buildCard({ id, title, desc, category, tech, link });
      document.getElementById('projectsGrid').appendChild(card);
      injectCardControls(card);
      void card.offsetWidth;
      card.classList.add('reveal', 'visible');
      showToast('✓ Project added!');
    }
    closeModal();
  });
}

/* ── Modal open/close ─────────────────────── */
let _editTarget = null;
let _deleteTarget = null;

function openModal(mode, card = null) {
  const backdrop = document.getElementById('adminModalBackdrop');
  const titleEl  = document.getElementById('adminModalTitle');
  const saveLabel= document.getElementById('adminSaveLabel');
  const editId   = document.getElementById('editCardId');

  document.getElementById('adminForm').reset();

  if (mode === 'edit' && card) {
    _editTarget = card;
    titleEl.textContent  = 'Edit Project';
    saveLabel.textContent= 'Update Project';
    editId.value = card.dataset.id;
    document.getElementById('projTitle').value    = card.querySelector('.card-title')?.textContent || '';
    document.getElementById('projDesc').value     = card.querySelector('.card-desc')?.textContent  || '';
    document.getElementById('projCategory').value = card.dataset.category || 'programming';
    document.getElementById('projTech').value     = Array.from(card.querySelectorAll('.tech-pill')).map(p => p.textContent).join(', ');
    const linkHref = card.querySelector('.card-link')?.getAttribute('href') || '';
    document.getElementById('projLink').value = linkHref === '#' ? '' : linkHref;
  } else {
    _editTarget = null;
    titleEl.textContent  = 'Add Project';
    saveLabel.textContent= 'Save Project';
    editId.value = '';
  }

  backdrop.classList.add('open');
  setTimeout(() => document.getElementById('projTitle')?.focus(), 100);
}

function closeModal() {
  document.getElementById('adminModalBackdrop')?.classList.remove('open');
  _editTarget = null;
}

function openConfirm(card) {
  _deleteTarget = card;
  document.getElementById('confirmDialog').classList.add('open');
}

function closeConfirm() {
  document.getElementById('confirmDialog')?.classList.remove('open');
  _deleteTarget = null;
}

function executeDeletion() {
  if (!_deleteTarget) { closeConfirm(); return; }
  _deleteTarget.style.animation = 'card-hide 0.3s ease forwards';
  setTimeout(() => { _deleteTarget?.remove(); _deleteTarget = null; }, 300);
  showToast('✓ Project deleted.');
  closeConfirm();
}

/* ── Build a new project card ─────────────── */
function buildCard({ id, title, desc, category, tech, link }) {
  const pills = tech
    ? tech.split(',').map(t => `<span class="tech-pill">${esc(t.trim())}</span>`).join('')
    : '';
  const cat1  = (category || 'programming').split(' ')[0];
  const badgeMap = { programming:'badge-programming', design:'badge-design', '3d':'badge-3d', ai:'badge-ai' };
  const bc = badgeMap[cat1] || 'badge-programming';

  const art = document.createElement('article');
  art.className = 'project-card';
  art.dataset.category = category;
  art.dataset.id = id;
  art.innerHTML = `
    <div class="card-glow-border"></div>
    <div class="card-inner">
      <div class="card-header">
        <div class="card-icon" style="--ci:#00e5ff">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="card-badges">
          <span class="badge ${bc}">${cat1.toUpperCase()}</span>
        </div>
      </div>
      <h3 class="card-title">${esc(title)}</h3>
      <p class="card-desc">${esc(desc)}</p>
      <div class="card-tech">${pills}</div>
      <div class="card-footer">
        <a href="${esc(link)}" class="card-link" target="_blank" rel="noopener">
          View Project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/>
            <polyline points="12 5 19 12 12 19" stroke="currentColor" stroke-width="2"/>
          </svg>
        </a>
      </div>
    </div>
    <div class="card-scanline"></div>`;
  return art;
}

/* ── Toast ───────────────────────────────── */
function showToast(msg, type = 'success') {
  const t = document.getElementById('adminToast');
  if (!t) return;
  t.textContent = msg;
  t.className = `admin-toast ${type === 'error' ? 'error' : ''}`;
  void t.offsetWidth;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ── HTML escape ─────────────────────────── */
function esc(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(String(str)));
  return d.innerHTML;
}

/* ══════════════════════════════════════════════
   MISC EFFECTS
══════════════════════════════════════════════ */
// Section line pulse
document.querySelectorAll('.section-line').forEach((line, i) => {
  setInterval(() => {
    line.style.boxShadow = `0 0 ${12 + Math.random() * 8}px rgba(0,229,255,0.4)`;
  }, 2000 + i * 300);
});

// Hero badge glitch
(function() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  setInterval(() => {
    badge.style.filter = 'brightness(1.5)';
    setTimeout(() => { badge.style.filter = ''; }, 80);
  }, 5000 + Math.random() * 3000);
})();

// Inject @keyframes spin for send button
(function() {
  const s = document.createElement('style');
  s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
})();
