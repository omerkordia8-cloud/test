/**
 * NITAG - نظام تحميل المكونات المشتركة
 * =========================================
 * يتولى تحميل الهيدر والفوتر تلقائياً في كل الصفحات.
 *
 * الاستخدام:
 *   <div id="header-placeholder"></div>
 *   <div id="footer-placeholder"></div>
 *   ثم استورد هذا الملف قبل main.js
 */

(function () {
  'use strict';

  /* -----------------------------------------------
     تحديد المسار الجذر بناءً على موقع الصفحة
  ----------------------------------------------- */
  function getRootPath() {
    const path = window.location.pathname;
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

      document.dispatchEvent(
        new CustomEvent('componentLoaded', { detail: { id: placeholderId } })
      );
    } catch (err) {
      console.warn(`[NITAG] لم يتم تحميل المكوّن: ${componentPath}`, err);
    }
  }

  /* -----------------------------------------------
     تصحيح روابط الهيدر
  ----------------------------------------------- */
  function fixHeaderLinks() {
    const root = getRootPath();
    const header = document.getElementById('main-header');
    if (!header) return;

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
        (page === 'home'    && (currentPage === 'index' || currentPage === '')) ||
        (page !== 'home'    && currentPage === page)
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
    const nav       = document.getElementById('main-nav');
    const overlay   = document.getElementById('mobile-overlay');
    if (!hamburger || !nav) return;

    function toggleMenu(open) {
      hamburger.classList.toggle('open', open);
      nav.classList.toggle('open', open);
      overlay && overlay.classList.toggle('show', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu(!nav.classList.contains('open')));
    overlay && overlay.addEventListener('click', () => toggleMenu(false));
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

    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -----------------------------------------------
     تشغيل كل شيء بعد تحميل المكوّنات
  ----------------------------------------------- */
  let loadedCount = 0;
  const totalComponents = 2;

  document.addEventListener('componentLoaded', () => {
    loadedCount++;
    if (loadedCount >= totalComponents) {
      fixHeaderLinks();
      fixFooterLinks();
      initHamburger();
      initHeaderScroll();
    } else if (loadedCount === 1) {
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
