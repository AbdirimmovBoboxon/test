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

// Enhanced mouse-based parallax for hero visual
const root = document.documentElement;
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  root.style.setProperty('--parallax-x', x.toFixed(3));
  root.style.setProperty('--parallax-y', (-y).toFixed(3));
});

// Enhanced starfield with depth and realistic stars
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars(count = 400) {
  stars = [];
  
  // Create multi-layer starfield for depth perception
  // Distant stars (small, subtle)
  for (let i = 0; i < count * 0.4; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.08 + 0.02,
      alpha: Math.random() * 0.3 + 0.15,
      twinkle: Math.random() * 0.6 + 0.1,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.02,
      depth: 0.3,
      color: ['#ffffff', '#e3f2fd', '#bbdefb'][Math.floor(Math.random() * 3)]
    });
  }
  
  // Mid-range stars (medium brightness)
  for (let i = 0; i < count * 0.35; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.5,
      speed: Math.random() * 0.12 + 0.04,
      alpha: Math.random() * 0.5 + 0.35,
      twinkle: Math.random() * 0.8 + 0.15,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.03,
      depth: 0.6,
      color: '#ffffff'
    });
  }
  
  // Bright stars (foreground)
  for (let i = 0; i < count * 0.25; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.8,
      speed: Math.random() * 0.18 + 0.06,
      alpha: Math.random() * 0.7 + 0.4,
      twinkle: Math.random() * 1 + 0.2,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.04,
      depth: 1,
      color: ['#ffffff', '#5de3ff', '#a78bfa'][Math.floor(Math.random() * 3)]
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  stars.forEach(star => {
    star.phase += 0.015;
    
    // Twinkle effect
    const twinkleAmount = Math.sin(star.phase) * 0.15 * star.twinkle;
    const finalAlpha = Math.min(1, Math.max(0.05, star.alpha + twinkleAmount));
    
    // Set color based on star type
    ctx.fillStyle = star.color || '#ffffff';
    ctx.globalAlpha = finalAlpha;
    
    // Draw star with slight glow
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add subtle glow for brighter stars
    if (star.depth > 0.6) {
      ctx.globalAlpha = finalAlpha * 0.3;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Slow downward drift (space dust falling)
    star.y += star.speed * 0.3;
    star.x += star.drift;
    
    // Wrap around edges
    if (star.y > canvas.height + 10) {
      star.y = -10;
      star.x = Math.random() * canvas.width;
    }
    if (star.x > canvas.width + 10) {
      star.x = -10;
    }
    if (star.x < -10) {
      star.x = canvas.width + 10;
    }
  });
  
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}

// Initialize starfield
resizeCanvas();
createStars();
drawStars();

// Recreate stars on resize
window.addEventListener('resize', () => {
  resizeCanvas();
  createStars();
});

// Optional: Form validation (keeping existing logic structure)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const status = contactForm.querySelector('.form-status');
  
  // You can add additional client-side validation here if needed
  // The form already submits to formsubmit.co which handles validation
}
