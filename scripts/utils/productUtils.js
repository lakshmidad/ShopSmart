/**
 * Product Utility Functions
 */

/**
 * Generates a SKU (Stock Keeping Unit) for a product
 * @param {Object} product - The product data
 * @returns {string} - The generated SKU
 */
export function generateSKU(product) {
    const brandPrefix = product.brand.substring(0, 3).toUpperCase();
    const categoryPrefix = product.category.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${brandPrefix}-${categoryPrefix}-${randomNum}`;
}

/**
 * Generates a URL-friendly slug from a product name
 * @param {string} name - The product name
 * @returns {string} - The generated slug
 */
export function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

/**
 * Formats a price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: USD)
 * @returns {string} - The formatted price
 */
export function formatPrice(price, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(price);
}

/**
 * Formats a rating to display stars
 * @param {number} rating - The rating value
 * @returns {string} - Star representation of the rating
 */
export function formatRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);
    
    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '½' : '') + 
           '☆'.repeat(emptyStars);
}

/**
 * Calculates discount percentage
 * @param {number} original - Original price
 * @param {number} current - Current price
 * @returns {number} - Discount percentage
 */
export function calculateDiscount(original, current) {
    return Math.round(((original - current) / original) * 100);
}

/**
 * Validates product data before creation
 * @param {Object} data - Product data to validate
 * @throws {Error} If validation fails
 */
export function validateProductData(data) {
    const required = ['name', 'category', 'brand', 'price'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
    
    if (typeof data.price !== 'number' || data.price < 0) {
        throw new Error('Invalid price value');
    }
    
    if (data.rating && (data.rating < 0 || data.rating > 5)) {
        throw new Error('Rating must be between 0 and 5');
    }
}