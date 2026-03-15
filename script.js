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
});
