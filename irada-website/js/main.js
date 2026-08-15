/**
 * إرادة - JavaScript الرئيسي
 * =========================================
 * يحتوي على كل التفاعلات العامة:
 *   - Scroll Reveal Animations
 *   - Counter Animation
 *   - Programs / Events Filter
 *   - FAQ Accordion
 *   - Contact Form Validation
 *   - Smooth Scroll
 */

(function () {
  'use strict';

  /* ===================================================
     1. Scroll Reveal
     عناصر بكلاس .reveal تظهر عند الوصول إليها
  =================================================== */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  /* ===================================================
     2. Counter Animation
     عناصر بـ data-count="X" تعدّ من 0 إلى X
  =================================================== */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;

    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString('ar-SA') + '+';
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
      (entries) => {
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
     3. Filter Buttons (Programs & Events)
     أزرار الفلترة لبطاقات البرامج والفعاليات
  =================================================== */
  function initFilters() {
    const filterGroups = document.querySelectorAll('.programs-filter');
    filterGroups.forEach(group => {
      const buttons = group.querySelectorAll('.filter-btn');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          // تحديث الزر النشط
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.dataset.filter;

          // تحديد الحاوية (الشبكة التالية للفلتر أو أي شبكة في المقطع)
          const section = group.closest('section') || document.body;
          const cards = section.querySelectorAll('[data-category]');

          cards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            if (match) {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
              card.style.display = '';
            } else {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.95)';
              setTimeout(() => {
                if (card.dataset.category !== filter && filter !== 'all') {
                  card.style.display = 'none';
                }
              }, 300);
            }
          });
        });
      });
    });
  }

  /* ===================================================
     4. FAQ Accordion
  =================================================== */
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // إغلاق جميع الإجابات
        faqItems.forEach(i => {
          i.classList.remove('open');
          const a = i.querySelector('.faq-answer');
          if (a) a.style.maxHeight = '0';
        });

        // فتح العنصر المحدد إن كان مغلقاً
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ===================================================
     5. Contact Form Validation & Submit
  =================================================== */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success');

    // دالة التحقق من حقل واحد
    function validateField(field) {
      const value = field.value.trim();
      let valid = true;

      field.style.borderColor = '';

      if (field.required && !value) {
        valid = false;
      } else if (field.type === 'email' && value) {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      if (!valid) {
        field.style.borderColor = '#e74c3c';
        field.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.1)';
      } else if (value) {
        field.style.borderColor = 'var(--primary)';
        field.style.boxShadow = '0 0 0 3px rgba(26,107,60,0.1)';
      }

      return valid;
    }

    // التحقق الفوري عند الكتابة
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.style.borderColor === 'rgb(231, 76, 60)') validateField(field);
      });
    });

    // الإرسال
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
      let allValid = true;

      fields.forEach(field => {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) {
        // الانتقال لأول خطأ
        const firstError = form.querySelector('[style*="rgb(231, 76, 60)"]');
        if (firstError) firstError.focus();
        return;
      }

      // محاكاة الإرسال
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        جاري الإرسال...
      `;

      setTimeout(() => {
        form.reset();
        form.querySelectorAll('input, select, textarea').forEach(f => {
          f.style.borderColor = '';
          f.style.boxShadow = '';
        });

        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          إرسال الرسالة
        `;

        if (successMsg) {
          successMsg.style.display = 'block';
          setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
        }

        window.scrollTo({ top: successMsg ? successMsg.offsetTop - 100 : 0, behavior: 'smooth' });
      }, 1500);
    });
  }

  /* ===================================================
     6. Smooth Scroll for anchor links
  =================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
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
     7. Back to Top Button
  =================================================== */
  function initBackToTop() {
    // إنشاء الزر ديناميكياً
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'العودة للأعلى');
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    `;
    btn.style.cssText = `
      position:fixed; bottom:28px; left:28px; z-index:999;
      width:48px; height:48px; border-radius:50%;
      background:var(--primary); color:#fff;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 4px 16px rgba(26,107,60,0.35);
      cursor:pointer; border:none;
      opacity:0; transform:translateY(20px);
      transition:all 0.3s ease;
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      const show = window.scrollY > 400;
      btn.style.opacity = show ? '1' : '0';
      btn.style.transform = show ? 'translateY(0)' : 'translateY(20px)';
      btn.style.pointerEvents = show ? 'auto' : 'none';
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ===================================================
     8. Add spin keyframe for loading button
  =================================================== */
  function addSpinKeyframe() {
    if (document.getElementById('irada-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'irada-keyframes';
    style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }

  /* ===================================================
     تهيئة كل الوظائف عند جاهزية DOM
  =================================================== */
  function init() {
    addSpinKeyframe();
    initScrollReveal();
    initCounters();
    initFilters();
    initFAQ();
    initContactForm();
    initSmoothScroll();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
