// ============ HEADER scroll state ============
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ============ Mobile nav ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

// ============ Reveal on scroll ============
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
reveals.forEach(el => io.observe(el));

// ============ Cookie banner ============
const banner = document.getElementById('cookieBanner');
const COOKIE_KEY = 'darhan_cookie_consent';
if (!localStorage.getItem(COOKIE_KEY)) {
  setTimeout(() => banner.classList.add('show'), 1200);
  banner.hidden = false;
}
document.getElementById('cookieAccept').addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, 'accepted');
  banner.classList.remove('show');
});
banner.querySelector('[data-modal="cookies"]').addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, 'accepted');
  banner.classList.remove('show');
  openModal('cookies');
});

// ============ Modals ============
const overlay = document.getElementById('modalOverlay');
function openModal(name) {
  const m = document.getElementById('modal-' + name);
  if (!m) return;
  m.hidden = false;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.querySelectorAll('.modal').forEach(m => m.hidden = true);
  overlay.hidden = true;
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.getAttribute('data-modal')));
});
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
