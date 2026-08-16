// ============================================================
// main.js — TechZone PC Store
// Theme, Cart, Toast, Navbar, Canvas BG, Cursor Glow,
// Scroll Reveal, Page Entry — adapted from portfolio
// ============================================================
'use strict';

// ===== Theme =====
const THEME_KEY = 'pcstore_theme';

function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem(THEME_KEY, theme);
  // Re-init canvas with theme colors
  if (window._bgCanvas) window._bgCanvas.updateColors(theme);
}

function toggleTheme() {
  applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

// ===== Cart =====
const CART_KEY = 'pcstore_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const cart = getCart();
  const product = getProductById(productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty += 1; }
  else { cart.push({ id: productId, qty: 1, name: product.name, price: product.price, icon: product.icon, category: product.category }); }
  saveCart(cart);
  showToast(`✅ تمت إضافة "${product.name}" إلى السلة`, 'success');
}

function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.id !== productId));
}

function updateQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) { item.qty = Math.max(1, parseInt(qty) || 1); saveCart(cart); }
}

function getCartTotal() { return getCart().reduce((s, i) => s + i.price * i.qty, 0); }
function getCartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }

function updateCartCount() {
  const el = document.getElementById('cartCount');
  const count = getCartCount();
  if (el) { el.textContent = count; el.style.display = count > 0 ? 'flex' : 'none'; }
}

// ===== Toast (portfolio admin-toast style) =====
function showToast(msg, type = 'info', duration = 3200) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===== Stars =====
function renderStars(rating, interactive = false, productId = '') {
  let html = '<span class="stars">';
  for (let i = 1; i <= 5; i++) {
    const cls = i <= Math.floor(rating) ? 'filled' : (i - 0.5 <= rating ? 'half' : '');
    if (interactive) {
      html += `<span class="star ${cls}" data-val="${i}" onclick="rateProduct('${productId}',${i})" style="cursor:pointer">★</span>`;
    } else {
      html += `<span class="star ${cls}">★</span>`;
    }
  }
  html += '</span>';
  return html;
}

function rateProduct(productId, rating) {
  const ratings = JSON.parse(localStorage.getItem('pcstore_ratings') || '{}');
  ratings[productId] = rating;
  localStorage.setItem('pcstore_ratings', JSON.stringify(ratings));
  showToast(`⭐ شكراً! قيّمت المنتج بـ ${rating} نجوم`, 'success');
  const starsEl = document.getElementById('interactiveStars');
  if (starsEl) starsEl.innerHTML = renderStars(rating, true, productId);
}

function getUserRating(productId) {
  const ratings = JSON.parse(localStorage.getItem('pcstore_ratings') || '{}');
  return ratings[productId] || 0;
}

// ===== Product Card Builder =====
function buildProductCard(product) {
  const badgeMap = { bestseller:'🏆 الأكثر مبيعاً', popular:'🔥 شائع', new:'✨ جديد', premium:'💎 برميوم' };
  const badge = product.badge
    ? `<span class="badge badge-new" style="position:absolute;top:12px;right:12px;font-size:0.7rem">${badgeMap[product.badge] || product.badge}</span>`
    : '';
  const price = product.price.toLocaleString('ar-SA');
  const stars = renderStars(product.rating);
  let specTags = '';
  if (product.cores)     specTags += `<span class="spec-tag">${product.cores} أنوية</span>`;
  if (product.vram)      specTags += `<span class="spec-tag">${product.vram}</span>`;
  if (product.capacity)  specTags += `<span class="spec-tag">${product.capacity}</span>`;
  if (product.speed && product.category === 'ram') specTags += `<span class="spec-tag">${product.speed}</span>`;
  if (product.type && product.category === 'ram')  specTags += `<span class="spec-tag">${product.type}</span>`;
  if (product.socket)    specTags += `<span class="spec-tag">${product.socket}</span>`;
  if (product.size && product.category === 'cases') specTags += `<span class="spec-tag">${product.size}</span>`;
  if (product.radiator)  specTags += `<span class="spec-tag">${product.radiator}</span>`;
  if (product.wattage)   specTags += `<span class="spec-tag">${product.wattage}W</span>`;
  if (product.subCategory) specTags += `<span class="spec-tag">${product.subCategory}</span>`;

  return `
  <div class="product-card reveal" onclick="goToProduct('${product.id}')">
    ${badge}
    <div class="product-card-img">${product.icon || '📦'}</div>
    <div class="product-card-body">
      <div class="product-card-brand">${product.brand}</div>
      <div class="product-card-name">${product.name}</div>
      <div class="product-card-specs">${specTags}</div>
      <div class="product-card-footer">
        <div>
          <div class="product-price">${price} <span class="currency">ر.س</span></div>
          <div style="display:flex;align-items:center;gap:6px;margin-top:4px">
            ${stars}
            <span style="font-size:0.78rem;color:var(--text-muted)">(${product.reviews})</span>
          </div>
        </div>
        <button class="add-to-cart-btn" onclick="event.stopPropagation();addToCart('${product.id}')" title="أضف للسلة">🛒</button>
      </div>
    </div>
  </div>`;
}

function getBadgeLabel(badge) {
  const map = { bestseller:'الأكثر مبيعاً', popular:'شائع', new:'جديد', premium:'برميوم' };
  return map[badge] || badge;
}

function goToProduct(id) {
  window.location.href = `pages/product.html?id=${id}`;
}

// ══════════════════════════════════════════════
// BACKGROUND CANVAS — Particle Network (portfolio)
// ══════════════════════════════════════════════
function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const DARK_COLORS  = ['rgba(0,229,255,',  'rgba(123,47,255,', 'rgba(255,45,120,', 'rgba(0,255,136,'];
  const LIGHT_COLORS = ['rgba(108,92,231,', 'rgba(0,184,212,',  'rgba(255,45,120,', 'rgba(0,150,100,'];
  let COLORS = DARK_COLORS;

  function updateColors(theme) {
    COLORS = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
    particles.forEach(p => { p.color = COLORS[Math.floor(Math.random() * COLORS.length)]; });
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', () => { resize(); buildParticles(); }, { passive: true });
  resize();

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x     = Math.random() * W;
      this.y     = initial ? Math.random() * H : (Math.random() < 0.5 ? -10 : H + 10);
      this.vx    = (Math.random() - 0.5) * 0.3;
      this.vy    = (Math.random() - 0.5) * 0.3;
      this.r     = Math.random() * 1.4 + 0.3;
      this.base  = Math.random() * 0.4 + 0.05;
      this.alpha = this.base;
      this.pulse = Math.random() * Math.PI * 2;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.pulse += 0.018;
      this.alpha = this.base + Math.sin(this.pulse) * 0.08;
      if (this.x < -20 || this.x > W + 20) this.vx *= -1;
      if (this.y < -20 || this.y > H + 20) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function buildParticles() {
    const COUNT = Math.min(90, Math.floor(W / 16));
    particles = Array.from({ length: COUNT }, () => new Particle());
  }
  buildParticles();

  function connectParticles() {
    const DIST = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          const alpha = (1 - dist / DIST) * (getTheme() === 'light' ? 0.06 : 0.08);
          ctx.strokeStyle = `rgba(108,92,231,${alpha})`;
          if (getTheme() === 'dark') ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  let animId;
  (function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    animId = requestAnimationFrame(animate);
  })();

  // expose updateColors globally
  window._bgCanvas = { updateColors };

  // init colors based on current theme
  updateColors(getTheme());
}

// ══════════════════════════════════════════════
// CURSOR GLOW (portfolio initCursorGlow)
// ══════════════════════════════════════════════
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
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

  document.querySelectorAll('a, button, .product-card, .category-card, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      glow.style.width = glow.style.height = '420px';
      glow.style.background = 'radial-gradient(circle, rgba(123,47,255,0.09) 0%, transparent 70%)';
      if (getTheme() === 'light') glow.style.background = 'radial-gradient(circle, rgba(108,92,231,0.07) 0%, transparent 70%)';
    });
    el.addEventListener('mouseleave', () => {
      glow.style.width = glow.style.height = '300px';
      glow.style.background = getTheme() === 'dark'
        ? 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(108,92,231,0.06) 0%, transparent 70%)';
    });
  });
}

// ══════════════════════════════════════════════
// SCROLL REVEAL (portfolio initScrollReveal)
// ══════════════════════════════════════════════
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const parent = entry.target.closest('.products-grid, .categories-grid, .features-grid, .footer-grid');
      if (parent) {
        const idx = Array.from(parent.children).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 70);
      } else {
        entry.target.classList.add('visible');
      }
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// ══════════════════════════════════════════════
// TILT CARDS (portfolio initTiltCards)
// ══════════════════════════════════════════════
function initTiltCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.product-card, .category-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease';
    });
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -5;
      const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  5;
      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
    });
  });
}

// ══════════════════════════════════════════════
// NAVBAR SCROLL
// ══════════════════════════════════════════════
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

// ══════════════════════════════════════════════
// ACTIVE NAV LINK
// ══════════════════════════════════════════════
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (path.endsWith(href) || (href !== '' && href !== '#' && path.includes(href.replace('.html', '')))) {
      link.classList.add('active');
    }
  });
}

// ══════════════════════════════════════════════
// MOBILE NAV (portfolio initMobileNav)
// ══════════════════════════════════════════════
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  function close() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

// ══════════════════════════════════════════════
// INJECT CANVAS + ORBS + GRID to body
// ══════════════════════════════════════════════
function injectBgElements() {
  if (!document.getElementById('bg-canvas')) {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);
  }
  if (!document.querySelector('.bg-grid')) {
    const grid = document.createElement('div');
    grid.className = 'bg-grid';
    document.body.insertBefore(grid, document.body.firstChild);
  }
  if (!document.querySelector('.bg-noise')) {
    const noise = document.createElement('div');
    noise.className = 'bg-noise';
    document.body.insertBefore(noise, document.body.firstChild);
  }
  if (!document.querySelector('.bg-orb')) {
    [1,2,3].forEach(n => {
      const orb = document.createElement('div');
      orb.className = `bg-orb bg-orb-${n}`;
      document.body.insertBefore(orb, document.body.firstChild);
    });
  }
}

// ══════════════════════════════════════════════
// SECTION LINE PULSE (portfolio misc effects)
// ══════════════════════════════════════════════
function initSectionLinePulse() {
  document.querySelectorAll('.section-line').forEach((line, i) => {
    setInterval(() => {
      line.style.boxShadow = `0 0 ${12 + Math.random() * 10}px rgba(108,92,231,0.5)`;
    }, 1800 + i * 250);
  });
}

// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Page entry animation (portfolio)
  document.body.classList.add('page-enter');

  // Inject bg elements before anything
  injectBgElements();

  // Apply saved theme
  applyTheme(getTheme());

  // Cart count
  updateCartCount();

  // Navbar
  initNavbarScroll();
  setActiveNavLink();

  // Theme button
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Mobile nav
  initMobileNav();

  // Portfolio effects
  initBgCanvas();
  initCursorGlow();
  initScrollReveal();
  initTiltCards();
  initSectionLinePulse();
});
