/* Super Builder — Spot On Websites
   Interactive Behaviours v1.0
   Generated: 2026-03-22 */

(function() {
  'use strict';

  // ==========================================================================
  // DOM Ready
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', function() {
    initMobileDrawer();
    initScrollHeader();
    initScrollAnimations();
    initCounters();
    initWaveDividers();
    initServiceCardHovers();
    initFormValidation();
    initSmoothScroll();
    console.log('✅ Super Builder JS initialised');
  });

  // ==========================================================================
  // Mobile Drawer Navigation
  // ==========================================================================
  function initMobileDrawer() {
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('drawer-close');

    if (!hamburger || !drawer || !overlay) return;

    function openDrawer() {
      drawer.classList.add('drawer--open');
      overlay.classList.add('overlay--visible');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('drawer--open');
      overlay.classList.remove('overlay--visible');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Close drawer when clicking a link inside
    drawer.querySelectorAll('.drawer__link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ==========================================================================
  // Header Scroll Effect (Glassmorphism)
  // ==========================================================================
  function initScrollHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    function updateHeader() {
      const scrollY = window.scrollY;
      if (scrollY > scrollThreshold) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      // Optional: hide/show on scroll direction (optional extra)
      // if (scrollY > lastScroll && scrollY > 80) {
      //   header.classList.add('header--hidden');
      // } else {
      //   header.classList.remove('header--hidden');
      // }
      lastScroll = scrollY;
    }

    window.addEventListener('scroll', updateHeader);
    updateHeader(); // initial call
  }

  // ==========================================================================
  // Scroll‑Reveal Animations
  // ==========================================================================
  function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    // Individual elements
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    // Staggered groups
    document.querySelectorAll('.animate-stagger').forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        child.style.transitionDelay = `${index * 80}ms`;
        observer.observe(child);
      });
    });
  }

  // ==========================================================================
  // Counter Animation (Stats Bar)
  // ==========================================================================
  function initCounters() {
    const statElements = document.querySelectorAll('.stat-number');
    if (statElements.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      statElements.forEach((el) => {
        el.textContent = el.dataset.target + (el.dataset.suffix || '');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const decimals = parseInt(el.dataset.decimals) || 0;
          const duration = 1800;
          const startTime = performance.now();

          function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = value.toFixed(decimals) + (progress === 1 ? suffix : '');

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          }

          requestAnimationFrame(update);
        });
      },
      { threshold: 0.5 }
    );

    statElements.forEach((el) => observer.observe(el));
  }

  // ==========================================================================
  // Wave Dividers (Ensure they fill width)
  // ==========================================================================
  function initWaveDividers() {
    // Ensure wave SVGs scale correctly on resize
    function resizeWaves() {
      document.querySelectorAll('.wave-divider svg').forEach((svg) => {
        const width = svg.parentElement.offsetWidth;
        const height = svg.parentElement.offsetHeight;
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      });
    }

    window.addEventListener('resize', resizeWaves);
    resizeWaves(); // initial
  }

  // ==========================================================================
  // Service Card Hover Effects
  // ==========================================================================
  function initServiceCardHovers() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
      });
      card.addEventListener('mouseleave', () => {
        card.style.zIndex = '';
      });
    });
  }

  // ==========================================================================
  // Simple Form Validation
  // ==========================================================================
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    if (!forms.length) return;

    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        let valid = true;
        const required = form.querySelectorAll('[required]');

        required.forEach((input) => {
          if (!input.value.trim()) {
            valid = false;
            input.classList.add('form-input--error');
          } else {
            input.classList.remove('form-input--error');
          }
        });

        if (!valid) {
          e.preventDefault();
          alert('Please fill in all required fields.');
        }
      });
    });
  }

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      });
    });
  }

  // ==========================================================================
  // Polyfill for backdrop‑filter on older Safari (optional)
  // ==========================================================================
  if (!CSS.supports('backdrop-filter', 'blur(12px)')) {
    document.querySelectorAll('.header, .drawer').forEach((el) => {
      el.style.backgroundColor = 'rgba(11, 23, 40, 0.98)';
    });
  }

})();