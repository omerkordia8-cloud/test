/* ============================================
   LOGIN PAGE — JavaScript
   Auth, Animations, Particles
   ============================================ */
'use strict';

// ─── CREDENTIALS (client-side demo) ──────────────────────────────────────────
const VALID_CREDENTIALS = [
  { username: 'admin',  password: 'portfolio2025' },
  { username: 'guest',  password: 'guest123' },
];
const SESSION_KEY = 'portfolio_auth';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

// ─── DOM REFS ─────────────────────────────────────────────────────────────────
const form          = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn      = document.getElementById('loginBtn');
const btnText       = loginBtn.querySelector('.btn-text');
const btnLoader     = loginBtn.querySelector('.btn-loader');
const statusEl      = document.getElementById('loginStatus');
const togglePassBtn = document.getElementById('togglePassword');
const rememberCheck = document.getElementById('rememberMe');

// Group elements
const usernameGroup = document.getElementById('usernameGroup');
const passwordGroup = document.getElementById('passwordGroup');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COLORS = ['rgba(0,229,255,', 'rgba(123,47,255,', 'rgba(255,45,120,'];
  const COUNT  = Math.min(60, Math.floor(window.innerWidth / 25));

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x     = Math.random() * W;
      this.y     = initial ? Math.random() * H : H + 10;
      this.vx    = (Math.random() - 0.5) * 0.4;
      this.vy    = -Math.random() * 0.6 - 0.2;
      this.r     = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.life  = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      const progress = this.life / this.maxLife;
      const alpha = this.alpha * (1 - Math.pow(progress, 2));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ─── REVEAL ANIMATIONS ────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Stagger reveal on load
  document.querySelectorAll('.reveal-left, .reveal-right').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 150);
  });

  // Pre-fill if remembered
  const remembered = localStorage.getItem('portfolio_remember');
  if (remembered) {
    try {
      const { username } = JSON.parse(remembered);
      if (username) {
        usernameInput.value = username;
        rememberCheck.checked = true;
      }
    } catch {}
  }

  // Auto-focus
  setTimeout(() => usernameInput.focus(), 500);
});

// ─── TOGGLE PASSWORD VISIBILITY ───────────────────────────────────────────────
togglePassBtn.addEventListener('click', () => {
  const isPass = passwordInput.type === 'password';
  passwordInput.type = isPass ? 'text' : 'password';
  togglePassBtn.querySelector('.eye-open').classList.toggle('hidden', isPass);
  togglePassBtn.querySelector('.eye-closed').classList.toggle('hidden', !isPass);
});

// ─── REAL-TIME VALIDATION ────────────────────────────────────────────────────
usernameInput.addEventListener('input', () => clearError(usernameGroup, usernameError));
passwordInput.addEventListener('input', () => clearError(passwordGroup, passwordError));

// ─── FORM SUBMIT ──────────────────────────────────────────────────────────────
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  // Validate fields
  let valid = true;
  if (!username) {
    showError(usernameGroup, usernameError, '⚠ Username is required');
    valid = false;
  }
  if (!password) {
    showError(passwordGroup, passwordError, '⚠ Password is required');
    valid = false;
  }
  if (!valid) return;

  // Show loading state
  setLoading(true);
  clearStatus();

  // Simulate async auth check
  await delay(900 + Math.random() * 400);

  const match = VALID_CREDENTIALS.find(
    c => c.username === username && c.password === password
  );

  if (match) {
    handleSuccess(username);
  } else {
    handleFailure();
  }
});

// ─── AUTH HANDLERS ────────────────────────────────────────────────────────────
function handleSuccess(username) {
  // Save session with role
  const session = {
    username,
    role: 'admin',
    expires: Date.now() + SESSION_DURATION,
    loggedInAt: Date.now(),
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

  // Remember username
  if (rememberCheck.checked) {
    localStorage.setItem('portfolio_remember', JSON.stringify({ username }));
  } else {
    localStorage.removeItem('portfolio_remember');
  }

  // Success UI
  setLoading(false);
  showStatus('success', '✓ Access granted — loading portfolio...');
  loginBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00e5ff 100%)';

  // Particle burst (visual feedback)
  triggerSuccessBurst();

  // Navigate after short delay
  setTimeout(() => {
    document.body.classList.add('page-exit');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 600);
  }, 1000);
}

function handleFailure() {
  setLoading(false);
  showStatus('error', '✗ Invalid username or password. Please try again.');
  document.querySelector('.login-card').classList.add('shake');
  setTimeout(() => document.querySelector('.login-card').classList.remove('shake'), 500);
  passwordInput.value = '';
  passwordInput.focus();
}

// ─── UI HELPERS ───────────────────────────────────────────────────────────────
function setLoading(state) {
  loginBtn.disabled = state;
  btnText.classList.toggle('hidden', state);
  btnLoader.classList.toggle('hidden', !state);
}

function showStatus(type, message) {
  statusEl.className = `login-status ${type}`;
  statusEl.textContent = message;
}

function clearStatus() {
  statusEl.className = 'login-status';
  statusEl.textContent = '';
}

function showError(group, errorEl, message) {
  group.classList.add('has-error');
  errorEl.textContent = message;
}

function clearError(group, errorEl) {
  group.classList.remove('has-error');
  errorEl.textContent = '';
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── SUCCESS PARTICLE BURST ───────────────────────────────────────────────────
function triggerSuccessBurst() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  const bursts = Array.from({ length: 30 }, () => ({
    x: cx, y: cy,
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 8,
    r: Math.random() * 4 + 2,
    alpha: 1,
    color: ['#00ff88', '#00e5ff', '#7b2fff'][Math.floor(Math.random() * 3)],
  }));

  let frame = 0;
  function drawBurst() {
    if (frame++ > 40) return;
    bursts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;
      p.alpha -= 0.025;
      if (p.alpha <= 0) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawBurst);
  }
  drawBurst();
}

// ─── KEYBOARD SHORTCUT ────────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement !== loginBtn) {
    form.dispatchEvent(new Event('submit', { cancelable: true }));
  }
});

// ─── INPUT FOCUS GLOW ────────────────────────────────────────────────────────
[usernameInput, passwordInput].forEach(input => {
  input.addEventListener('focus', () => {
    input.closest('.form-group').style.setProperty('--active', '1');
  });
  input.addEventListener('blur', () => {
    input.closest('.form-group').style.removeProperty('--active');
  });
});
