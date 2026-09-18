// Header scroll effect (sub pages keep the solid header)
(function () {
  var header = document.getElementById('header');
  var solid = header.classList.contains('solid');
  function onScroll() {
    if (solid) return;
    header.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', onScroll); onScroll();

  // Mobile menu
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  function closeNav() { nav.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); header.classList.remove('nav-open'); }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    header.classList.toggle('nav-open', open);
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      var id = href.slice(href.indexOf('#'));
      if (id === '#') { e.preventDefault(); return; }
      var onIndex = /(^|\/)(index\.html)?$/.test(location.pathname);
      if (href.charAt(0) !== '#' && !onIndex) return; // go to index page normally
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  // Fade-in on scroll
  var io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in-up').forEach(function (el) { io.observe(el); });
})();
