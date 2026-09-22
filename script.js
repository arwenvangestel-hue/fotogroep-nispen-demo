const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption');
const lightboxClose = document.querySelector('[data-lightbox-close]');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Menu openen');
  nav.classList.remove('open');
  header.classList.remove('menu-open');
  document.body.classList.remove('menu-open');
};

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  if (isOpen) return closeMenu();
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Menu sluiten');
  nav.classList.add('open');
  header.classList.add('menu-open');
  document.body.classList.add('menu-open');
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.querySelectorAll('[data-lightbox-src]').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.lightboxSrc;
    lightboxImage.alt = button.querySelector('img')?.alt || '';
    lightboxCaption.textContent = button.dataset.caption || '';
    document.body.classList.add('lightbox-open');
    lightbox.showModal();
  });
});

const closeLightbox = () => {
  lightbox.close();
  document.body.classList.remove('lightbox-open');
  lightboxImage.src = '';
};

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener('close', () => document.body.classList.remove('lightbox-open'));
