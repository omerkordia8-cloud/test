/**
 * NITAG - JavaScript الرئيسي
 * =========================================
 * - Scroll Reveal Animations
 * - Counter Animation
 * - Join Form Validation
 * - Smooth Scroll
 * - Back to Top Button
 * - Typing Effect (Hero)
 */

(function () {
  'use strict';

  /* ===================================================
     1. Scroll Reveal
  =================================================== */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  /* ===================================================
     2. Counter Animation
  =================================================== */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;

    const duration  = 1800;
    const step      = 16;
    const increment = target / (duration / step);
    let current     = 0;

    const suffix = el.dataset.suffix || '+';

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString('ar-SA') + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString('ar-SA');
      }
    }, step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => observer.observe(el));
  }

  /* ===================================================
     3. Typing Effect (Hero title second line)
  =================================================== */
  function initTyping() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const phrases = [
      'ثورة الغد التقنية.',
      'مستقبل البرمجيات.',
      'ريادة الأمن الرقمي.',
      'عالم الذكاء الاصطناعي.',
    ];

    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;
    let pause     = false;

    function type() {
      if (pause) return;

      const current = phrases[phraseIdx];

      if (!deleting) {
        el.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          pause = true;
          setTimeout(() => { pause = false; deleting = true; }, 2200);
        }
      } else {
        el.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
    }

    setInterval(type, deleting ? 60 : 90);
  }

  /* ===================================================
     4. Join Form Validation
  =================================================== */
  function initJoinForm() {
    const form       = document.getElementById('join-form');
    if (!form) return;

    const submitBtn  = document.getElementById('join-submit');
    const successMsg = document.getElementById('form-success');

    function validateField(field) {
      const value = field.value.trim();
      let valid   = true;

      field.style.borderColor = '';
      field.style.boxShadow   = '';

      if (field.required && !value) {
        valid = false;
      } else if (field.type === 'email' && value) {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      if (!valid) {
        field.style.borderColor = '#ff5f57';
        field.style.boxShadow   = '0 0 0 3px rgba(255,95,87,0.15)';
      } else if (value) {
        field.style.borderColor = '#0a84ff';
        field.style.boxShadow   = '0 0 0 3px rgba(10,132,255,0.15)';
      }

      return valid;
    }

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur',  () => validateField(field));
      field.addEventListener('input', () => {
        if (field.style.borderColor === 'rgb(255, 95, 87)') validateField(field);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

      const fields    = form.querySelectorAll('input[required], select[required], textarea[required]');
      let allValid    = true;
      fields.forEach(f => { if (!validateField(f)) allValid = false; });

      if (!allValid) {
        const firstError = form.querySelector('[style*="rgb(255, 95, 87)"]');
        if (firstError) firstError.focus();
        return;
      }

      // محاكاة الإرسال
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          style="animation:spin 1s linear infinite">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        جاري تنفيذ الأمر...
      `;

      setTimeout(() => {
        form.reset();
        form.querySelectorAll('input, select, textarea').forEach(f => {
          f.style.borderColor = '';
          f.style.boxShadow   = '';
        });

        submitBtn.disabled    = false;
        submitBtn.innerHTML   = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          تنفيذ الأمر // انضم إلى NITAG
        `;

        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
        }
      }, 1600);
    });
  }

  /* ===================================================
     5. Smooth Scroll for anchor links
  =================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const headerH = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '80'
          );
          const top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ===================================================
     6. Back to Top Button
  =================================================== */
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.id    = 'back-to-top';
    btn.setAttribute('aria-label', 'العودة للأعلى');
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    `;
    btn.style.cssText = `
      position:fixed; bottom:28px; left:28px; z-index:999;
      width:48px; height:48px; border-radius:50%;
      background: linear-gradient(135deg, #0a84ff, #00d4ff);
      color:#fff; display:flex; align-items:center; justify-content:center;
      box-shadow:0 4px 20px rgba(10,132,255,0.4);
      cursor:pointer; border:none;
      opacity:0; transform:translateY(20px);
      transition:all 0.3s ease;
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      const show = window.scrollY > 400;
      btn.style.opacity       = show ? '1' : '0';
      btn.style.transform     = show ? 'translateY(0)' : 'translateY(20px)';
      btn.style.pointerEvents = show ? 'auto' : 'none';
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ===================================================
     7. Inject global keyframes
  =================================================== */
  function addKeyframes() {
    if (document.getElementById('nitag-keyframes')) return;
    const style = document.createElement('style');
    style.id    = 'nitag-keyframes';
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  /* ===================================================
     Init
  =================================================== */
  function init() {
    addKeyframes();
    initScrollReveal();
    initCounters();
    initTyping();
    initJoinForm();
    initSmoothScroll();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
