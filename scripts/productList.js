import { products } from './products.js';

function createProductCard(product) {
    return `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-brand">${product.brand}</p>
                <div class="product-rating">${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5-Math.floor(product.rating))}</div>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                    <button class="add-to-wishlist" data-product-id="${product.id}">♡</button>
                </div>
            </div>
        </article>
    `;
}

function displayProducts(productsToShow = products) {
    const contentSection = document.querySelector('.content');
    if (!contentSection) return;
    
    // Create a container for product grid if it doesn't exist
    let productGrid = contentSection.querySelector('.product-grid');
    if (!productGrid) {
        productGrid = document.createElement('div');
        productGrid.className = 'product-grid';
        contentSection.appendChild(productGrid);
    }

    // Display products
    productGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');

    // Add event listeners to buttons
    productGrid.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            addToCart(productId);
        });
    });

    productGrid.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            addToWishlist(productId);
        });
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
    }
}

function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Product added to wishlist!');
    }
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    // Setup search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.brand.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        });
    }

    // Setup category filters
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectedCategories = Array.from(categoryCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            const filteredProducts = products.filter(product =>
                selectedCategories.includes(product.category)
            );
            displayProducts(filteredProducts);
        });
    });
});