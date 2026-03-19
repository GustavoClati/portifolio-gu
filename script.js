/* ============================
   Portfolio — Gustavo Clati Filiputi
   Interactions & Animations
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- HEADER — transparent to frosted glass ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- MOBILE MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  /* ---------- SCROLL REVEAL with IntersectionObserver ---------- */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    reveals.forEach(el => {
      // Auto-stagger siblings within grids
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
        const idx = siblings.indexOf(el);
        if (idx > 0) {
          el.dataset.delay = idx * 100;
        }
      }
      observer.observe(el);
    });
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ---------- ACTIVE NAV LINK HIGHLIGHT ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const highlightNav = () => {
    const scrollY = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---------- VIDEO HERO — Pause when out of view ---------- */
  const heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroVideo.play();
        } else {
          heroVideo.pause();
        }
      });
    }, { threshold: 0.1 });
    videoObserver.observe(heroVideo);
  }

});
