// Welcome page behavior
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const browseBtn = document.getElementById('browse-btn');
  const searchInput = document.getElementById('welcome-search-input');
  const searchGo = document.getElementById('welcome-search-go');

  // Start Shopping -> go to product list
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startBtn.style.transform = 'scale(0.98)';
      startBtn.style.transition = 'transform .12s ease';
      setTimeout(() => { startBtn.style.transform = ''; window.location.href = '../product-list.html'; }, 160);
    });
  }

  // Browse products -> focus the local search input
  if (browseBtn && searchInput) {
    browseBtn.addEventListener('click', () => {
      // small pulse to indicate focus
      browseBtn.classList.add('focused');
      setTimeout(() => browseBtn.classList.remove('focused'), 250);
      searchInput.focus();
    });
  }

  // Search button: navigate to product list with query param
  if (searchGo && searchInput) {
    searchGo.addEventListener('click', () => {
      const q = (searchInput.value || '').trim();
      const url = q ? (`../product-list.html?q=${encodeURIComponent(q)}`) : ('../product-list.html');
      window.location.href = url;
    });
    // allow Enter key
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); searchGo.click(); } });
  }
});
