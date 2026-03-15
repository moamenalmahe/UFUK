// Reveal elements on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal');
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.service-card, .social-link, .nav-links a').forEach(el => observer.observe(el));

// Only one service card open at a time
const cards = Array.from(document.querySelectorAll('.service-card'));
cards.forEach(card => {
  card.addEventListener('toggle', () => {
    if (card.open) {
      cards.filter(c => c !== card).forEach(c => (c.open = false));
    }
  });
});

// Subtle hover lift for cards via pointer position
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `translateY(-6px) rotateX(${(-y / rect.height) * 2}deg) rotateY(${(x / rect.width) * 2}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
