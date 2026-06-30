/* ============================================
   Kirtania Developer Website — script.js
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM references ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const backToTop = document.getElementById('back-to-top');
  const yearSpan = document.getElementById('current-year');

  /* ---------- Current year ---------- */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile menu ---------- */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Dark / Light theme ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // Initialize theme
  var savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Back to top button ---------- */
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Fade-in on scroll ---------- */
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show all elements
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }
})();
