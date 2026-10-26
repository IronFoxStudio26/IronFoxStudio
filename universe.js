/* IRON FOX UNIVERSE — shared interaction layer */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  if (!body) return;

  const atmosphere = document.createElement('div');
  atmosphere.className = 'universe-atmosphere';
  atmosphere.setAttribute('aria-hidden', 'true');
  atmosphere.innerHTML = '<div class="universe-orb"></div>';
  body.prepend(atmosphere);

  // Add consistent navigation to the projects index, which previously had only a back button.
  const header = document.querySelector('header');
  if (header && !header.querySelector('nav') && !header.classList.contains('site-header')) {
    const nav = document.createElement('nav');
    nav.className = 'universe-nav';
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = '<a href="index.html" class="logo">IRON FOX <span style="color:#ff641e">/</span> STUDIO</a><div class="menu"><a href="HTMLPage2.html">Games</a><a href="About.html">About</a><a href="Contacts.html">Contacts</a></div><a class="back" href="index.html">Back to Nexus ↗</a>';
    header.replaceChildren(nav);
  }

  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('header .menu a, header .nav-links a').forEach(link => {
    const target = (link.getAttribute('href') || '').split('/').pop().toLowerCase();
    if (target === page) {
      link.setAttribute('aria-current', 'page');
      link.style.color = '#ff8a42';
    }
  });

  // Gentle pointer parallax: visual only, never blocks navigation or touch scrolling.
  if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
    let tx = 0, ty = 0, x = 0, y = 0;
    window.addEventListener('pointermove', event => {
      tx = (event.clientX / Math.max(innerWidth, 1) - .5) * 2;
      ty = (event.clientY / Math.max(innerHeight, 1) - .5) * 2;
    }, { passive: true });
    const tick = () => {
      x += (tx - x) * .035;
      y += (ty - y) * .035;
      atmosphere.style.transform = `translate3d(${x * -7}px, ${y * -5}px, 0)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Preserve a clear interaction signal for keyboard and touch users.
  document.querySelectorAll('.project-card, .game-card, .contact-card, .project').forEach(card => {
    card.addEventListener('pointerenter', () => card.classList.add('is-focused'));
    card.addEventListener('pointerleave', () => card.classList.remove('is-focused'));
  });
})();