/* ============================================================
   KRUNAL P. MEWADA — PORTFOLIO JAVASCRIPT
   Features: Nav scroll, counter animation, reveal on scroll,
             mobile menu, contact form, year auto-update
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== CURRENT YEAR =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== NAV SCROLL EFFECT =====
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== MOBILE NAV TOGGLE =====
  const burger = document.getElementById('navBurger');
  const mobileNav = document.getElementById('navMobile');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  // ===== STAT COUNTER ANIMATION =====
  const statEls = document.querySelectorAll('.stat__num[data-target]');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    statEls.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1600;
      const start = performance.now();

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    });
  }

  // ===== INTERSECTION OBSERVER: REVEAL + COUNTER =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // Stagger delay for grid children
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    revealObserver.observe(el);
  });

  // Counter trigger when stats section is visible
  const statsSection = document.querySelector('.hero__stats');
  if (statsSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(statsSection);
  }

  // ===== ACTIVE NAV HIGHLIGHT ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active-link');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-link');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // Add active link style dynamically
  const styleTag = document.createElement('style');
  styleTag.textContent = `.nav__links a.active-link { color: var(--white); } .nav__links a.active-link::after { transform: scaleX(1); }`;
  document.head.appendChild(styleTag);

  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const message = form.message.value.trim();

      // Simple validation
      if (!name || !email || !message) {
        formNote.style.color = 'var(--warn)';
        formNote.textContent = '⚠ Please fill in all fields.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formNote.style.color = 'var(--warn)';
        formNote.textContent = '⚠ Please enter a valid email.';
        return;
      }

      // Simulate send (replace with your backend/EmailJS/Formspree endpoint)
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        formNote.style.color = 'var(--accent2)';
        formNote.textContent = '✓ Message sent! I\'ll get back to you soon.';
        form.reset();
        submitBtn.textContent = 'Send Message →';
        submitBtn.disabled = false;
      }, 1200);
    });
  }

  // ===== SMOOTH SCROLL OFFSET FOR FIXED NAV =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 68;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ===== CURSOR GLOW EFFECT (desktop only) =====
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%);
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 0;
      transition: left 0.15s ease, top 0.15s ease;
    `;
    document.body.appendChild(glow);

    window.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

});
