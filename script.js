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

  // Detect saved preference or default to light mode
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('theme');
  } catch (e) {}

  if (!savedTheme) {
    // Default open in light mode
    savedTheme = 'light';
  }
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Header Horizontal Scroll Progress Bar (0% - 100%) ---------- */
  if (scrollProgressBar) {
    function updateScrollProgress() {
      const winScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      const clamped = Math.min(100, Math.max(0, scrolled));
      scrollProgressBar.style.width = clamped + '%';
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();
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

  /* ---------- Cookie Consent Management & Google Consent Mode v2 ---------- */
  function updateGoogleConsent(granted) {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': granted ? 'granted' : 'denied',
        'ad_user_data': granted ? 'granted' : 'denied',
        'ad_personalization': granted ? 'granted' : 'denied',
        'analytics_storage': granted ? 'granted' : 'denied'
      });
    }
  }

  function initCookieConsent() {
    let savedConsent = null;
    try {
      savedConsent = localStorage.getItem('cookie_consent');
    } catch (e) {}

    if (savedConsent === 'accepted') {
      updateGoogleConsent(true);
      return;
    } else if (savedConsent === 'essential') {
      updateGoogleConsent(false);
      return;
    }

    // Create banner dynamically if not present
    let banner = document.getElementById('cookie-consent-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'cookie-consent-banner';
      banner.className = 'cookie-banner';
      banner.setAttribute('role', 'region');
      banner.setAttribute('aria-label', 'Cookie Consent Notice');
      banner.innerHTML = `
        <div class="cookie-content">
          <div class="cookie-header">
            <span aria-hidden="true">🍪</span>
            <h4>Cookie &amp; Privacy Preferences</h4>
          </div>
          <p>
            We use cookies to analyze site traffic, personalize content, and display relevant Google AdSense advertisements. By clicking "Accept All", you consent to our use of cookies in accordance with our <a href="privacy.html">Privacy Policy</a>.
          </p>
        </div>
        <div class="cookie-actions">
          <button type="button" class="btn-cookie-reject" id="cookie-reject-btn">Essential Only</button>
          <button type="button" class="btn-cookie-accept" id="cookie-accept-btn">Accept All</button>
        </div>
      `;
      document.body.appendChild(banner);
    }

    setTimeout(function () {
      banner.classList.add('visible');
    }, 600);

    const acceptBtn = document.getElementById('cookie-accept-btn');
    const rejectBtn = document.getElementById('cookie-reject-btn');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        try {
          localStorage.setItem('cookie_consent', 'accepted');
        } catch (e) {}
        updateGoogleConsent(true);
        banner.classList.remove('visible');
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', function () {
        try {
          localStorage.setItem('cookie_consent', 'essential');
        } catch (e) {}
        updateGoogleConsent(false);
        banner.classList.remove('visible');
      });
    }
  }

  // Allow resetting preferences via footer link
  document.addEventListener('click', function (e) {
    if (e.target && (e.target.matches('#open-cookie-settings') || e.target.closest('#open-cookie-settings') || e.target.matches('.open-cookie-settings'))) {
      e.preventDefault();
      try {
        localStorage.removeItem('cookie_consent');
      } catch (err) {}
      const existing = document.getElementById('cookie-consent-banner');
      if (existing) {
        existing.classList.add('visible');
      } else {
        initCookieConsent();
      }
    }
  });

  initCookieConsent();

  /* ---------- Contact Form Handler ---------- */
  const contactForm = document.getElementById('site-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || '';
      const email = document.getElementById('contact-email')?.value || '';
      const subject = document.getElementById('contact-subject')?.value || 'Website Inquiry';
      const message = document.getElementById('contact-message')?.value || '';
      const feedback = document.getElementById('contact-form-feedback');

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `<strong>Thank you, ${name}!</strong> Opening your email client to send to business.kirtania@gmail.com...`;
      }

      const mailtoUri = `mailto:business.kirtania@gmail.com?subject=${encodeURIComponent('[Kirtania Web] ' + subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\nMessage:\n' + message)}`;
      window.location.href = mailtoUri;
    });
  }
})();
