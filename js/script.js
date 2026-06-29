/**
 * Palm Coast Pool Cleaning Services — UI Interactivity
 */

(function () {
  'use strict';

  var navbar = document.getElementById('navbar');
  var menuToggle = document.getElementById('menu-toggle');
  var navMenu = document.getElementById('nav-menu');
  var quoteForm = document.getElementById('quote-form');
  var formSuccess = document.getElementById('form-success');
  var formError = document.getElementById('form-error');
  var backToTop = document.getElementById('back-to-top');

  /* ---- Sticky navbar on scroll ---- */
  function handleScroll() {
    if (navbar) {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 60);
    }
    if (backToTop) {
      backToTop.hidden = window.scrollY < 400;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---- Mobile menu ---- */
  function closeMenu() {
    if (!navMenu || !menuToggle) return;
    navMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle?.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navMenu?.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ---- Smooth scroll with navbar offset ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var navHeight = navbar ? navbar.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: top, behavior: 'smooth' });
      closeMenu();
    });
  });

  /* ---- Back to top ---- */
  backToTop?.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Quote form validation ---- */
  quoteForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    formSuccess.hidden = true;
    formError.hidden = true;

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');

    var isValid =
      name.value.trim() !== '' &&
      email.value.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) &&
      phone.value.trim() !== '';

    if (!isValid) {
      formError.hidden = false;
      return;
    }

    formSuccess.hidden = false;
    quoteForm.reset();
  });
})();
