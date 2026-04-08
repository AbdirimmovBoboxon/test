// Smooth typewriter effect for roles
const roles = ['Mobile Developer', 'iOS Developer', 'Android Developer'];
const roleEl = document.getElementById('role-text');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  const speed = deleting ? 40 : 95;
  const pause = 1200;

  if (!deleting && charIndex <= current.length) {
    roleEl.textContent = current.slice(0, charIndex++);
  } else if (deleting && charIndex >= 0) {
    roleEl.textContent = current.slice(0, charIndex--);
  }

  if (!deleting && charIndex === current.length + 1) {
    deleting = true;
    setTimeout(typeLoop, pause);
    return;
  }
  if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeLoop, speed);
}
typeLoop();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.22 });
revealEls.forEach(el => revealObserver.observe(el));

// Active nav highlight
const sections = document.querySelectorAll('[data-section]');
const navItems = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.55 });
sections.forEach(sec => navObserver.observe(sec));

// Contact form validation (front-end only)
const form = document.getElementById('contact-form');
const status = document.querySelector('.form-status');

if (form) {
  form.addEventListener('submit', (e) => {
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!name || !email || !message) {
      e.preventDefault();
      status.textContent = 'Please fill in all fields.';
      status.style.color = '#ffb4b4';
      return;
    }

    if (!emailRegex.test(email)) {
      e.preventDefault();
      status.textContent = 'Please enter a valid email address.';
      status.style.color = '#ffb4b4';
      return;
    }

    status.textContent = 'Sending your message...';
    status.style.color = '#5de3ff';
  });
}

// Light parallax for hero visual
const root = document.documentElement;
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  root.style.setProperty('--parallax-x', x.toFixed(3));
  root.style.setProperty('--parallax-y', (-y).toFixed(3));
});

// Starfield animation (background stars)
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars(count = 320) {
  stars = new Array(count).fill().map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.6 + 0.4,
    speed: Math.random() * 0.25 + 0.04,
    alpha: Math.random() * 0.5 + 0.35,
    twinkle: Math.random() * 0.8 + 0.2,
    phase: Math.random() * Math.PI * 2,
    drift: (Math.random() - 0.5) * 0.04
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  stars.forEach(star => {
    star.phase += 0.02;
    const twinkle = star.alpha + Math.sin(star.phase) * 0.15 * star.twinkle;
    ctx.globalAlpha = Math.min(1, Math.max(0.1, twinkle));
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    star.x += star.drift;
    if (star.y > canvas.height) star.y = -2;
    if (star.x > canvas.width) star.x = 0;
    if (star.x < 0) star.x = canvas.width;
  });
  requestAnimationFrame(drawStars);
}

resizeCanvas();
createStars();
drawStars();
window.addEventListener('resize', () => { resizeCanvas(); createStars(); });
