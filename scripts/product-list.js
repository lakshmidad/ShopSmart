/* Product list UI logic
   - Reads window.PRODUCTS (external file)
   - Filters by search and category
   - Sorts by price
   - Renders product cards with polished layout
   - Adds wishlist/cart to localStorage
*/
document.addEventListener('DOMContentLoaded', () => {
  const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS.slice() : [];
  const grid = document.getElementById('product-grid');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const resultsCount = document.getElementById('results-count');

  function getSelectedCategories() {
    return Array.from(document.querySelectorAll('input[name="category"]:checked')).map(n => n.value);
  }

  function formatPrice(p) {
    return '$' + Number(p).toFixed(2);
  }

  function renderStars(rating) {
    const rounded = Math.round(rating);
    let stars = '';
    for (let i = 1; i <= 5; i++) stars += i <= rounded ? '★' : '☆';
    return `<span class="stars" aria-hidden="true">${stars}</span> <span class="sr-only">${rating} out of 5</span>`;
  }

  function renderProducts(list) {
    grid.innerHTML = '';
    if (!list.length) {
      grid.innerHTML = '<div class="no-results">No products found.</div>';
      resultsCount.textContent = 'Showing 0 products';
      return;
    }

    resultsCount.textContent = `Showing ${list.length} product${list.length > 1 ? 's' : ''}`;

    const frag = document.createDocumentFragment();
    list.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';

      // guard image
      const imgSrc = p.image ? p.image : 'https://via.placeholder.com/400x300?text=Product';

      card.innerHTML = `
        <div class="product-image-wrap">
          <img class="product-image" src="${imgSrc}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=Product'" />
          <button class="icon-btn wishlist-btn" data-id="${p.id}" title="Add to wishlist" aria-label="Add to wishlist">♡</button>
        </div>
        <div class="product-body">
          <h4 class="product-name">${p.name}</h4>
          <div class="product-meta">
            <div class="price">${formatPrice(p.price)}</div>
            <div class="rating">${renderStars(p.rating)}</div>
          </div>
          <div class="product-actions">
            <button class="btn block primary cart-btn" data-id="${p.id}">Add to Cart</button>
          </div>
        </div>
      `;

      frag.appendChild(card);
    });
    grid.appendChild(frag);

    // wire up buttons: wishlist (icon) and cart
    grid.querySelectorAll('.wishlist-btn').forEach(btn => btn.addEventListener('click', onWishlist));
    grid.querySelectorAll('.cart-btn').forEach(btn => btn.addEventListener('click', onCart));
  }

  function applyFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const cats = getSelectedCategories();
    let out = products.filter(p => cats.includes(p.category));
    if (q) out = out.filter(p => p.name.toLowerCase().includes(q));

    const sort = sortSelect.value;
    if (sort === 'price-asc') out.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') out.sort((a, b) => b.price - a.price);

    renderProducts(out);
  }

  function getStorageArray(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveToStorage(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
  }

  function onWishlist(e) {
    const id = Number(e.currentTarget.dataset.id);
    const item = products.find(p => p.id === id);
    if (!item) return;
    const list = getStorageArray('wishlist');
    const btn = e.currentTarget;
    if (!list.find(i => i.id === id)) {
      list.push(item);
      saveToStorage('wishlist', list);
      // toggle icon to filled style
      btn.classList.add('hearted');
      btn.innerText = '♥';
      btn.title = 'Added to wishlist';
    } else {
      // already in wishlist -> remove (toggle)
      const filtered = list.filter(i => i.id !== id);
      saveToStorage('wishlist', filtered);
      btn.classList.remove('hearted');
      btn.innerText = '♡';
      btn.title = 'Add to wishlist';
    }
  }

  function onCart(e) {
    const id = Number(e.currentTarget.dataset.id);
    const item = products.find(p => p.id === id);
    if (!item) return;
    const list = getStorageArray('cart');
    if (!list.find(i => i.id === id)) {
      list.push(Object.assign({}, item, { qty: 1 }));
      saveToStorage('cart', list);
      e.currentTarget.textContent = 'Added';
      setTimeout(() => { e.currentTarget.textContent = 'Add to Cart'; }, 1200);
    } else {
      // increase qty
      const updated = list.map(i => i.id === id ? Object.assign({}, i, { qty: (i.qty || 1) + 1 }) : i);
      saveToStorage('cart', updated);
      e.currentTarget.textContent = 'Added';
      setTimeout(() => { e.currentTarget.textContent = 'Add to Cart'; }, 1200);
    }
  }

  // Initial render
  applyFilters();

  // Event listeners
  searchInput.addEventListener('input', debounce(applyFilters, 250));
  sortSelect.addEventListener('change', applyFilters);
  document.querySelectorAll('input[name="category"]').forEach(ch => ch.addEventListener('change', applyFilters));

  // Simple debounce
  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
  }
});
/* Product list UI logic
   - Reads window.PRODUCTS (external file)
   - Filters by search and category
   - Sorts by price
   - Renders product cards
   - Adds wishlist/cart to localStorage
*/
document.addEventListener('DOMContentLoaded', () => {
  const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS.slice() : [];
  const grid = document.getElementById('product-grid');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const resultsCount = document.getElementById('results-count');

  function getSelectedCategories() {
    return Array.from(document.querySelectorAll('input[name="category"]:checked')).map(n => n.value);
  }

  function formatPrice(p) {
    return '$' + p.toFixed(2);
  }

  function renderStars(rating) {
    const rounded = Math.round(rating);
    let stars = '';
    for (let i = 1; i <= 5; i++) stars += i <= rounded ? '★' : '☆';
    return `<span class="stars" aria-hidden="true">${stars}</span> <span class="sr-only">${rating} out of 5</span>`;
  }

  function renderProducts(list) {
    grid.innerHTML = '';
    if (!list.length) {
      grid.innerHTML = '<div class="no-results">No products found.</div>';
      resultsCount.textContent = 'Showing 0 products';
      return;
    }

    resultsCount.textContent = `Showing ${list.length} product${list.length > 1 ? 's' : ''}`;

    const frag = document.createDocumentFragment();
    list.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';

      card.innerHTML = `
        <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="product-body">
          <h4 class="product-name">${p.name}</h4>
          <div class="product-meta">
            <div class="price">${formatPrice(p.price)}</div>
            <div class="rating">${renderStars(p.rating)}</div>
          </div>
          <div class="product-actions">
            <button class="btn small wishlist-btn" data-id="${p.id}">Add to Wishlist</button>
            <button class="btn small primary cart-btn" data-id="${p.id}">Add to Cart</button>
          </div>
        </div>
      `;

      frag.appendChild(card);
    });
    grid.appendChild(frag);

    // wire up buttons
    grid.querySelectorAll('.wishlist-btn').forEach(btn => btn.addEventListener('click', onWishlist));
    grid.querySelectorAll('.cart-btn').forEach(btn => btn.addEventListener('click', onCart));
  }

  function applyFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const cats = getSelectedCategories();
    let out = products.filter(p => cats.includes(p.category));
    if (q) out = out.filter(p => p.name.toLowerCase().includes(q));

    const sort = sortSelect.value;
    if (sort === 'price-asc') out.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') out.sort((a, b) => b.price - a.price);

    renderProducts(out);
  }

  function getStorageArray(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveToStorage(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
  }

  function onWishlist(e) {
    const id = Number(e.currentTarget.dataset.id);
    const item = products.find(p => p.id === id);
    if (!item) return;
    const list = getStorageArray('wishlist');
    if (!list.find(i => i.id === id)) {
      list.push(item);
      saveToStorage('wishlist', list);
      e.currentTarget.textContent = 'Added';
    } else {
      e.currentTarget.textContent = 'Added';
    }
  }

  function onCart(e) {
    const id = Number(e.currentTarget.dataset.id);
    const item = products.find(p => p.id === id);
    if (!item) return;
    const list = getStorageArray('cart');
    if (!list.find(i => i.id === id)) {
      list.push(Object.assign({}, item, { qty: 1 }));
      saveToStorage('cart', list);
      e.currentTarget.textContent = 'Added';
    } else {
      e.currentTarget.textContent = 'Added';
    }
  }

  // Initial render
  applyFilters();

  // Event listeners
  searchInput.addEventListener('input', debounce(applyFilters, 250));
  sortSelect.addEventListener('change', applyFilters);
  document.querySelectorAll('input[name="category"]').forEach(ch => ch.addEventListener('change', applyFilters));

  // Simple debounce
  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
  }
});
