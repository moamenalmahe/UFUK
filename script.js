const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal');
    });
  },
  { threshold: 0.18 }
);

document
  .querySelectorAll('.pill, .tile, .step, .stat, .cta-box, .floating-cards .card, .service-card, .folio-card, .quote-card, .about-card, .faq-list details')
  .forEach(el => observer.observe(el));

// Counter animation
const counters = document.querySelectorAll('.stat-number');
counters.forEach(counter => {
  const target = parseFloat(counter.dataset.count);
  const isFloat = target % 1 !== 0;
  let current = 0;
  const step = target / 120;
  const update = () => {
    current += step;
    if (current >= target) {
      counter.textContent = target + (isFloat ? '' : '+');
    } else {
      counter.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + (isFloat ? '' : '+');
      requestAnimationFrame(update);
    }
  };
  requestAnimationFrame(update);
});

// Particle canvas background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let w, h, particles;

const colors = ['#1976d2', '#ff6f00', '#c9a227', '#f5f7fa'];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  initParticles();
}

function initParticles() {
  particles = Array.from({ length: Math.min(120, Math.floor(w / 14)) }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 0.8,
    c: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
  }));
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    ctx.beginPath();
    ctx.fillStyle = p.c + '40';
    ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
    ctx.fill();

    particles.forEach(q => {
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        ctx.strokeStyle = p.c + '50';
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(draw);
}

resize();
draw();
window.addEventListener('resize', resize);

// Parallax tilt for hero cards
const heroCards = document.querySelectorAll('.floating-cards .card');
const orbital = document.querySelector('.orbital');

window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  orbital.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
  heroCards.forEach((card, i) => {
    card.style.transform = `translate3d(${x * (i + 1) * 0.6}px, ${y * (i + 1) * 0.6}px, 0)`;
  });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
