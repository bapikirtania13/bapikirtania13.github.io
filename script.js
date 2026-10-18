/* ==========================================================================
   Kirtania Developer Website — Modern Interactive Script
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- DOM References ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const backToTop = document.getElementById('back-to-top');
  const yearSpan = document.getElementById('current-year');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const appCards = document.querySelectorAll('.app-card');
  const copyButtons = document.querySelectorAll('.copy-btn');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const scrollProgressBar = document.getElementById('header-scroll-progress');

  /* ---------- Current Year ---------- */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile Navigation Menu ---------- */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when a navigation link is clicked
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Dark / Light Theme Toggle ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Ignore localStorage restrictions
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // Detect saved preference or default to dark mode for rich aesthetics
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('theme');
  } catch (e) {}

  if (!savedTheme) {
    // Default to dark mode for maximum modern visual appeal, or respect system
    savedTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Header Scroll Progress Animation ---------- */
  if (scrollProgressBar) {
    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgressBar.style.width = scrollPercent + '%';
    }, { passive: true });
  }

  /* ---------- App Category Filtering ---------- */
  if (filterBtns.length > 0 && appCards.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        appCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || (category && category.includes(filterValue))) {
            card.style.display = 'block';
            setTimeout(function () {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(function () {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  /* ---------- Copy to Clipboard Buttons ---------- */
  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(function () {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✓</span> Copied!';
        btn.style.color = 'var(--color-accent-emerald)';
        btn.style.borderColor = 'var(--color-accent-emerald)';

        setTimeout(function () {
          btn.innerHTML = originalText;
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2200);
      }).catch(function () {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          btn.innerHTML = '<span>✓</span> Copied!';
          setTimeout(function () {
            btn.innerHTML = '📋 Copy Email';
          }, 2000);
        } catch (err) {}
        document.body.removeChild(textarea);
      });
    });
  });

  /* ---------- Back to Top Button ---------- */
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 350) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Scroll Spy for Active Navigation Link ---------- */
  if (navLinks.length > 0) {
    const sections = [];
    navLinks.forEach(function (link) {
      const targetId = link.getAttribute('href').substring(1);
      const section = document.getElementById(targetId);
      if (section) {
        sections.push({ el: section, link: link });
      }
    });

    window.addEventListener('scroll', function () {
      const scrollPos = window.scrollY + 130;
      let currentSection = null;

      for (let i = 0; i < sections.length; i++) {
        if (sections[i].el.offsetTop <= scrollPos) {
          currentSection = sections[i];
        }
      }

      navLinks.forEach(function (l) { l.classList.remove('active'); });
      if (currentSection) {
        currentSection.link.classList.add('active');
      }
    }, { passive: true });
  }

  /* ---------- Intersection Observer for Smooth Scroll Reveals ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }
})();
