/* Page-specific identity layer for Iron Fox Universe. Keeps existing content and links intact. */
(() => {
  const file = decodeURIComponent(location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const pages = {
    'htmlpage2.html': {id:'games',kicker:'01 / THE WORLDS',title:'ENTER THE <span>WORLDS.</span>',desc:'Explore the games forged by Iron Fox Studio. Choose a world to discover its story, style and gameplay.'},
    'our projects.html': {id:'projects',kicker:'02 / PROJECT ARCHIVE',title:'WORLDS IN <span>PROGRESS.</span>',desc:'A closer look at the projects, experiments and adventures taking shape inside the studio.'},
    'about.html': {id:'about',kicker:'03 / THE FORGE',title:'BUILT BY <span>IMAGINATION.</span>',desc:'Get to know the ideas, craft and ambition behind Iron Fox Studio.'},
    'contacts.html': {id:'contacts',kicker:'04 / OPEN CHANNEL',title:'LET’S CONNECT<span>.</span>',desc:'Have a project in mind, want to collaborate, or simply want to say hello? Open a channel.'},
    'samurai survivors.html': {id:'samurai',kicker:'GAME FILE / 001',title:'SAMURAI <span>SURVIVORS.</span>',desc:'Enter the battlefield and discover the game.'},
    'settings.html': {id:'settings',kicker:'SYSTEM / CONFIGURATION',title:'YOUR <span>CONTROL ROOM.</span>',desc:'Manage your Iron Fox Studio account and preferences.'},
    'profile.html': {id:'profile',kicker:'SYSTEM / PLAYER ID',title:'YOUR <span>PROFILE.</span>',desc:'Your identity in the Iron Fox universe.'}
  };
  const page = pages[file];
  document.body.classList.add('if-universe-page', `if-page-${page ? page.id : 'home'}`);
  if (page) {
    document.body.dataset.ifPage = page.id;
    const target = page.id === 'games' ? document.querySelector('section.games') : page.id === 'about' ? document.querySelector('section.about') : page.id === 'contacts' ? document.querySelector('section.contacts') : page.id === 'projects' ? document.querySelector('section.hero') : document.querySelector('main');
    if (target && !document.querySelector('.if-page-intro')) {
      const intro = document.createElement('div');
      intro.className = 'if-page-intro';
      intro.innerHTML = `<span class="if-kicker">${page.kicker}</span><h1>${page.title}</h1><p>${page.desc}</p><span class="if-scene-tag">IRON FOX STUDIO · INTERACTIVE UNIVERSE</span>`;
      target.parentNode.insertBefore(intro, target);
      if (page.id === 'projects') target.style.display = 'none';
    }
  }
  // Pointer-driven ambience is intentionally subtle and disabled for touch-only devices.
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let frame = 0;
    window.addEventListener('pointermove', e => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / innerWidth - .5) * 2;
        const y = (e.clientY / innerHeight - .5) * 2;
        document.documentElement.style.setProperty('--if-pointer-x', `${x.toFixed(3)}`);
        document.documentElement.style.setProperty('--if-pointer-y', `${y.toFixed(3)}`);
        frame = 0;
      });
    }, {passive:true});
  }
})();
