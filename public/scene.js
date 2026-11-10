(() => {
  const hero = document.getElementById('hero');
  const sections = document.querySelector('.fc-after-hero');
  if (!hero || !sections) return;

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileCta = [...sections.children].find((element) =>
    element.classList.contains('fixed') && element.classList.contains('md:hidden'),
  );

  if (mobileCta) {
    const updateCta = () => {
      const start = document.getElementById('start');
      const startBox = start?.getBoundingClientRect();
      const formOnScreen = startBox && startBox.top < window.innerHeight && startBox.bottom > 0;
      mobileCta.dataset.previewCta = window.scrollY > hero.offsetHeight * 0.6 && !formOnScreen
        ? 'visible'
        : '';
    };
    updateCta();
    window.addEventListener('scroll', updateCta, { passive: true });
    window.addEventListener('resize', updateCta, { passive: true });
  }

  if (!('IntersectionObserver' in window) || motionPreference.matches) return;

  const capturedReveals = sections.querySelectorAll('.fc-rv[data-rv]');
  if (capturedReveals.length) document.documentElement.classList.add('preview-reveals');

  const reveal = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      reveal.unobserve(entry.target);
      if (entry.target.classList.contains('fc-rv')) {
        entry.target.classList.add('fc-rv-in');
        continue;
      }
      if (motionPreference.matches) continue;
      const { previewReveal, previewDelay } = entry.target.dataset;
      const artwork = previewReveal === 'art';
      entry.target.animate([
        artwork ? { opacity: .52, transform: 'translateY(13px) scale(.94)' } : { opacity: .42, translate: '0 18px' },
        artwork ? { opacity: 1, transform: 'none' } : { opacity: 1, translate: '0 0' },
      ], {
        delay: Number(previewDelay) || 0,
        duration: artwork ? 720 : 580,
        easing: 'cubic-bezier(.22, 1, .36, 1)',
        fill: 'backwards',
      });
    }
  }, { rootMargin: '0px 0px 100px', threshold: 0 });

  for (const element of sections.querySelectorAll('[data-preview-reveal], .fc-rv[data-rv]')) {
    reveal.observe(element);
  }
})();
