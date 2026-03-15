// Redirect /index.html to clean root on any page that includes this script
(function() {
  const path = window.location.pathname;
  if (path.toLowerCase().endsWith('/index.html')) {
    const cleanPath = path.replace(/index\.html$/i, '') || '/';
    const target = cleanPath + window.location.search + window.location.hash;
    window.location.replace(target);
  }
})();

// Reveal elements on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal');
    });
  },
  { threshold: 0.18 }
);

document
  .querySelectorAll('.tilt-card, .social-link, .nav-links a, .cta-banner')
  .forEach(el => observer.observe(el));

// Subtle hover tilt for interactive cards
const tiltables = Array.from(document.querySelectorAll('.tilt-card'));

tiltables.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `translateY(-4px) rotateX(${(-y / rect.height) * 3}deg) rotateY(${(x / rect.width) * 3}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });

  // Make every card behave like a link to services
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  const goServices = () => (window.location.href = 'services.html');
  card.addEventListener('click', goServices);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goServices();
    }
  });
});
