  // Header background on scroll
  const header = document.querySelector('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.links');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    header.classList.add('scrolled');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Projects carousel: auto-advances, loops, pauses on hover/touch/focus
  (() => {
    const track = document.querySelector('.proj-track');
    if (!track) return;
    const cards = [...track.children];
    const dotsWrap = document.querySelector('.proj-dots');
    const stepSize = () => cards[0].offsetWidth + parseFloat(getComputedStyle(track).gap || 0);
    const maxScroll = () => track.scrollWidth - track.clientWidth;
    const go = dir => {
      if (dir > 0 && track.scrollLeft >= maxScroll() - 5) track.scrollTo({ left: 0 });
      else if (dir < 0 && track.scrollLeft <= 5) track.scrollTo({ left: maxScroll() });
      else track.scrollBy({ left: dir * stepSize() });
    };
    // dots: one per reachable position
    const buildDots = () => {
      const count = Math.round(maxScroll() / stepSize()) + 1;
      dotsWrap.innerHTML = '';
      for (let i = 0; i < count; i++) {
        const d = document.createElement('button');
        d.className = 'proj-dot';
        d.addEventListener('click', () => track.scrollTo({ left: i * stepSize() }));
        dotsWrap.appendChild(d);
      }
      updateDots();
    };
    const updateDots = () => {
      const i = Math.round(track.scrollLeft / stepSize());
      [...dotsWrap.children].forEach((d, n) => d.classList.toggle('active', n === i));
    };
    track.addEventListener('scroll', updateDots, { passive: true });
    window.addEventListener('resize', buildDots);
    buildDots();
    document.querySelectorAll('.proj-arrow').forEach(b => b.addEventListener('click', () => { go(+b.dataset.dir); pause(8000); }));

    // autoplay
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let held = false, until = 0;
    const pause = ms => { until = Date.now() + ms; };
    const section = document.getElementById('projects');
    section.addEventListener('mouseenter', () => held = true);
    section.addEventListener('mouseleave', () => held = false);
    section.addEventListener('focusin', () => held = true);
    section.addEventListener('focusout', () => held = false);
    track.addEventListener('touchstart', () => pause(8000), { passive: true });
    if (!reduced) setInterval(() => {
      if (held || document.hidden || Date.now() < until) return;
      go(1);
    }, 4500);
  })();

  document.getElementById('year').textContent = new Date().getFullYear();
