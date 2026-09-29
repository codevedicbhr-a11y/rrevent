/* RR Studio – Interactive Scripts */

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Active nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a:not(.nav-cta)');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  // Hero slider
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  let currentSlide = 0;
  let slideTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll('.hero-dot');

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    resetTimer();
  }
  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }
  function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 5000);
  }
  resetTimer();

  // Gallery lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.getAttribute('data-src') || item.querySelector('img').src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.service-card, .price-card, .testimonial-card, .gallery-item, .about-image, .about-content, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    observer.observe(el);
  });
});

function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const date = document.getElementById('date').value;
  const pkg = document.getElementById('package').value;
  const message = document.getElementById('message').value.trim();

  let text = `Hi RR Studio! 👋%0A%0A`;
  text += `*Name:* ${name}%0A`;
  text += `*Email:* ${email}%0A`;
  text += `*Phone:* ${phone}%0A`;
  if (date) text += `*Wedding Date:* ${date}%0A`;
  if (pkg) text += `*Package:* ${pkg}%0A`;
  if (message) text += `%0A*Message:*%0A${message}`;

  window.open(`https://wa.me/916204026201?text=${text}`, '_blank');
  return false;
}
