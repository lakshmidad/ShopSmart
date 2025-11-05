// app.js - global utilities and page boot
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
    });
  }

  // Global search: if user submits from header, ensure it goes to product-list.html with q param
  const searchForm = document.getElementById('site-search');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      // allow default form action (GET) to product-list.html?q=...
    });
  }
});
