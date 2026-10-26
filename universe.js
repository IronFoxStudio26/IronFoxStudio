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
    nav.innerHTML = '<a href="index.html" class="logo if-universe-brand"><img src="Images/Logo.jpg" alt="" width="38" height="38"><span>IRON FOX <i>/</i> STUDIO</span></a><div class="menu"><a href="HTMLPage2.html">Games</a><a href="About.html">About</a><a href="Contacts.html">Contacts</a></div><a class="back" href="index.html">Back to Nexus ↗</a>';
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

  // Cinematic portal transition for same-site navigation. External links and downloads stay native.
  if (!reduceMotion) {
    const portal = document.createElement('div');
    portal.className = 'if-portal-transition';
    portal.setAttribute('aria-hidden', 'true');
    portal.innerHTML = '<span class="if-portal-transition-label">Entering the next world · Iron Fox Studio</span>';
    document.body.appendChild(portal);
    let navigating = false;
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      let url;
      try { url = new URL(link.href, location.href); } catch (_) { return; }
      if (url.origin !== location.origin || url.pathname === location.pathname && url.hash) return;
      if (!/\.html?$/i.test(url.pathname) && !url.pathname.endsWith('/')) return;
      if (navigating) { event.preventDefault(); return; }
      navigating = true;
      event.preventDefault();
      portal.classList.add('is-active');
      window.setTimeout(() => { location.href = url.href; }, 260);
    });
  }

  // Add original logo styling only to the legacy projects header rebuilt above.
  const injectedBrand = document.querySelector('.if-universe-brand');
  if (injectedBrand) {
    injectedBrand.style.display = 'inline-flex';
    injectedBrand.style.alignItems = 'center';
    injectedBrand.style.gap = '10px';
    injectedBrand.style.color = 'inherit';
    const brandImg = injectedBrand.querySelector('img');
    if (brandImg) { brandImg.style.width = '38px'; brandImg.style.height = '38px'; brandImg.style.objectFit = 'contain'; brandImg.style.borderRadius = '50%'; }
    const brandText = injectedBrand.querySelector('span');
    if (brandText) { brandText.style.fontSize = 'clamp(15px,2vw,22px)'; brandText.style.fontWeight = '800'; brandText.style.letterSpacing = '.04em'; }
    const slash = injectedBrand.querySelector('i');
    if (slash) { slash.style.color = '#ff641e'; slash.style.fontStyle = 'normal'; }
  }

  document.querySelectorAll('.project-card, .game-card, .contact-card, .project').forEach(card => {
    card.addEventListener('pointerenter', () => card.classList.add('is-focused'));
    card.addEventListener('pointerleave', () => card.classList.remove('is-focused'));
  });

  // Tactile game-console feedback: quick physical press and a small energy pulse.
  // Native navigation, forms, downloads and modified clicks remain intact.
  document.addEventListener('pointerdown', event => {
    const control = event.target.closest('a[href],button,input[type="button"],input[type="submit"],[role="button"]');
    if (!control || event.button !== 0 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    control.classList.add('if-game-pressed');
    window.setTimeout(() => control.classList.remove('if-game-pressed'), 170);
    if (event.pointerType === 'touch' || event.pointerType === 'pen' || event.isPrimary) {
      const pulse = document.createElement('span');
      pulse.className = 'if-hub-pulse';
      pulse.setAttribute('aria-hidden', 'true');
      pulse.style.left = `${event.clientX}px`;
      pulse.style.top = `${event.clientY}px`;
      document.body.appendChild(pulse);
      window.setTimeout(() => pulse.remove(), 520);
    }
  }, {passive:true});

  // Portal opens from the point the player activated, rather than always from screen center.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    const portal = document.querySelector('.if-portal-transition');
    if (!link || !portal || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    let target;
    try { target = new URL(link.href, location.href); } catch (_) { return; }
    if (target.origin !== location.origin || link.target === '_blank' || link.hasAttribute('download')) return;
    if (!/\.html?$/i.test(target.pathname) && !target.pathname.endsWith('/')) return;
    portal.style.setProperty('--if-portal-x', `${event.clientX}px`);
    portal.style.setProperty('--if-portal-y', `${event.clientY}px`);
  }, true);

})();