/**
 * Product Manager Class
 * Handles product generation, variation creation, and management
 */
import { ProductConfig, ProductImages } from '../config/productConfig.js';
import Product from '../models/Product.js';
import { generateSKU, generateSlug } from '../utils/productUtils.js';

class ProductManager {
    constructor() {
        this.products = new Map();
        this.currentId = 1;
        this.searchIndex = new Map(); // For efficient searching
    }

    /**
     * Creates a new product and adds it to the collection
     * @param {Object} productData - The product data
     * @returns {Product} - The created product instance
     */
    createProduct(productData) {
        const product = new Product({
            id: this.currentId++,
            ...productData,
            sku: generateSKU(productData),
            slug: generateSlug(productData.name)
        });

        this.products.set(product.id, product);
        this.indexProduct(product);
        return product;
    }

    /**
     * Indexes a product for efficient searching
     * @private
     */
    indexProduct(product) {
        // Index by name words
        product.name.toLowerCase().split(' ').forEach(word => {
            if (!this.searchIndex.has(word)) {
                this.searchIndex.set(word, new Set());
            }
            this.searchIndex.get(word).add(product.id);
        });

        // Index by category
        if (!this.searchIndex.has(product.category)) {
            this.searchIndex.set(product.category, new Set());
        }
        this.searchIndex.get(product.category).add(product.id);

        // Index by brand
        if (!this.searchIndex.has(product.brand)) {
            this.searchIndex.set(product.brand, new Set());
        }
        this.searchIndex.get(product.brand).add(product.id);
    }

    /**
     * Generates variations for a base product
     * @param {Product} baseProduct - The base product to create variations from
     * @returns {Array<Product>} - Array of generated product variations
     */
    generateVariations(baseProduct) {
        const variations = [];
        
        switch (baseProduct.category) {
            case ProductConfig.CATEGORIES.ELECTRONICS:
                variations.push(...this.generateElectronicsVariations(baseProduct));
                break;
            case ProductConfig.CATEGORIES.FASHION:
                variations.push(...this.generateFashionVariations(baseProduct));
                break;
            // Add more category variations as needed
        }
        
        return variations.map(variation => this.createProduct(variation));
    }

    /**
     * Generates variations for electronics products
     * @private
     */
    generateElectronicsVariations(baseProduct) {
        const variations = [];
        
        if (baseProduct.name.includes('iPhone')) {
            const storageOptions = ['128GB', '256GB', '512GB', '1TB'];
            const colors = {
                'Titanium Black': ProductImages.electronics.phone.variants['Titanium Black'],
                'Titanium White': ProductImages.electronics.phone.variants['Titanium White'],
                'Titanium Blue': ProductImages.electronics.phone.variants['Titanium Blue']
            };

            Object.entries(colors).forEach(([color, imageId]) => {
                storageOptions.forEach(storage => {
                    variations.push({
                        name: `${baseProduct.name} ${color} ${storage}`,
                        category: baseProduct.category,
                        brand: baseProduct.brand,
                        price: baseProduct.price * (1 + storageOptions.indexOf(storage) * 0.2),
                        rating: baseProduct.rating,
                        image: `${ProductConfig.IMAGE_BASE_URL}${imageId}`,
                        specifications: {
                            ...baseProduct.specifications,
                            storage,
                            color
                        }
                    });
                });
            });
        }

        return variations;
    }

    /**
     * Searches products based on query string
     * @param {string} query - Search query
     * @returns {Array<Product>} - Array of matching products
     */
    searchProducts(query) {
        const searchWords = query.toLowerCase().split(' ');
        const results = new Set();
        
        searchWords.forEach(word => {
            this.searchIndex.forEach((productIds, key) => {
                if (key.includes(word)) {
                    productIds.forEach(id => results.add(this.products.get(id)));
                }
            });
        });

        return Array.from(results);
    }

    /**
     * Gets all products as an array
     * @returns {Array<Product>}
     */
    getAllProducts() {
        return Array.from(this.products.values());
    }

    /**
     * Gets products by category
     * @param {string} category 
     * @returns {Array<Product>}
     */
    getProductsByCategory(category) {
        return this.getAllProducts().filter(product => product.category === category);
    }
}

// Initialize the product manager
const productManager = new ProductManager();

// Export for use in other modules
export default productManager;