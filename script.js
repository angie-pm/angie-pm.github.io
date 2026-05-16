  lucide.createIcons();

  // Nav scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = navLinks.classList.contains('open') ? 'x' : 'menu';
    hamburger.innerHTML = `<i data-lucide="${icon}"></i>`;
    lucide.createIcons();
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.innerHTML = `<i data-lucide="menu"></i>`;
      lucide.createIcons();
    });
  });

  // Fade-in observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.fade-in').forEach((el,i) => {
    el.style.transitionDelay = `${Math.min(i*60,400)}ms`;
    io.observe(el);
  });

  // Active section highlight
  const sections = document.querySelectorAll('section[id]');
  const linksByHash = {};
  document.querySelectorAll('.nav-link').forEach(a => {
    linksByHash[a.getAttribute('href')] = a;
  });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const link = linksByHash['#'+e.target.id];
      if (!link) return;
      if (e.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {rootMargin:'-40% 0px -55% 0px'});
  sections.forEach(s => spy.observe(s));
