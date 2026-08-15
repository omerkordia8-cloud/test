/**
 * إرادة - نظام تحميل المكونات المشتركة
 * =========================================
 * هذا الملف يتولى تحميل الهيدر والفوتر تلقائياً
 * في كل الصفحات دون إعادة كتابة الكود.
 *
 * الاستخدام:
 *   ضع في أي صفحة HTML:
 *     <div id="header-placeholder"></div>
 *     <div id="footer-placeholder"></div>
 *   ثم استورد هذا الملف قبل main.js
 */

(function () {
  'use strict';

  /* -----------------------------------------------
     تحديد المسار الجذر بناءً على موقع الصفحة
  ----------------------------------------------- */
  function getRootPath() {
    const path = window.location.pathname;
    // إذا كانت الصفحة داخل مجلد /pages/ نحتاج مسار أعلى
    return path.includes('/pages/') ? '../' : './';
  }

  /* -----------------------------------------------
     تحميل ملف HTML وحقنه في عنصر معين
  ----------------------------------------------- */
  async function loadComponent(placeholderId, componentPath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    try {
      const response = await fetch(componentPath);
      if (!response.ok) throw new Error(`فشل تحميل: ${componentPath}`);
      const html = await response.text();
      placeholder.innerHTML = html;

      // تشغيل أي scripts داخل المكوّن
      placeholder.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
        oldScript.remove();
      });

      // إرسال حدث مخصص بعد التحميل
      document.dispatchEvent(
        new CustomEvent('componentLoaded', { detail: { id: placeholderId } })
      );
    } catch (err) {
      console.warn(`[إرادة] لم يتم تحميل المكوّن: ${componentPath}`, err);
    }
  }

  /* -----------------------------------------------
     تصحيح روابط الهيدر بناءً على موضع الصفحة
  ----------------------------------------------- */
  function fixHeaderLinks() {
    const root = getRootPath();
    const header = document.getElementById('main-header');
    if (!header) return;

    // تصحيح روابط الـ nav
    header.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        link.setAttribute('href', root + href.replace(/^\//, ''));
      }
    });

    // تمييز الرابط النشط
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    header.querySelectorAll('.nav-link').forEach(link => {
      const page = link.dataset.page;
      if (
        (page === 'home' && (currentPage === 'index' || currentPage === '')) ||
        (page !== 'home' && currentPage === page)
      ) {
        link.classList.add('active');
      }
    });
  }

  /* -----------------------------------------------
     تصحيح روابط الفوتر
  ----------------------------------------------- */
  function fixFooterLinks() {
    const root = getRootPath();
    const footer = document.querySelector('.main-footer');
    if (!footer) return;

    footer.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        link.setAttribute('href', root + href.replace(/^\//, ''));
      }
    });
  }

  /* -----------------------------------------------
     تهيئة الهامبرغر (قائمة الجوال)
  ----------------------------------------------- */
  function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');
    const overlay = document.getElementById('mobile-overlay');
    if (!hamburger || !nav) return;

    function toggleMenu(open) {
      hamburger.classList.toggle('open', open);
      nav.classList.toggle('open', open);
      overlay && overlay.classList.toggle('show', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu(!nav.classList.contains('open')));
    overlay && overlay.addEventListener('click', () => toggleMenu(false));

    // إغلاق القائمة عند النقر على رابط
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  /* -----------------------------------------------
     تأثير scroll على الهيدر
  ----------------------------------------------- */
  function initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // تشغيل فوري عند التحميل
  }

  /* -----------------------------------------------
     تشغيل كل شيء بعد تحميل المكوّنات
  ----------------------------------------------- */
  let loadedCount = 0;
  const totalComponents = 2; // هيدر + فوتر

  document.addEventListener('componentLoaded', () => {
    loadedCount++;
    if (loadedCount >= totalComponents) {
      fixHeaderLinks();
      fixFooterLinks();
      initHamburger();
      initHeaderScroll();
    } else if (loadedCount === 1) {
      // إذا تحمل الهيدر أولاً ابدأ به فوراً
      const header = document.getElementById('main-header');
      if (header) {
        fixHeaderLinks();
        initHamburger();
        initHeaderScroll();
      }
    }
  });

  /* -----------------------------------------------
     تحميل المكوّنات عند جاهزية DOM
  ----------------------------------------------- */
  function init() {
    const root = getRootPath();
    loadComponent('header-placeholder', root + 'components/header.html');
    loadComponent('footer-placeholder', root + 'components/footer.html');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
