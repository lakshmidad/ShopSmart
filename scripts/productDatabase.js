// Product Database Configuration
const ProductConfig = {
    IMAGE_BASE_URL: 'https://images.unsplash.com/photo-',
    CATEGORIES: {
        ELECTRONICS: 'Electronics',
        FASHION: 'Fashion',
        HOME_LIVING: 'Home & Living',
        BEAUTY: 'Beauty',
        SPORTS: 'Sports',
        BOOKS: 'Books'
    },
    BRANDS: {
        ELECTRONICS: ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP'],
        FASHION: ['Nike', 'Adidas', 'Levi\'s', 'H&M', 'Zara'],
        HOME_LIVING: ['Dyson', 'Philips', 'IKEA', 'KitchenAid'],
        BEAUTY: ['MAC', 'L\'Oreal', 'Estée Lauder', 'Clinique'],
        SPORTS: ['Nike', 'Adidas', 'Under Armour', 'Puma'],
        BOOKS: ['Penguin', 'HarperCollins', 'Random House']
    }
};

// Image mapping for consistent product images
const ProductImages = {
    electronics: {
        iphone: {
            base: '1696426050396-a4a7c35e5a5b',
            variants: {
                'Titanium Black': '1696426050469-5ff777c86723',
                'Titanium White': '1696426050231-a289e9dd388e',
                'Titanium Blue': '1696426050106-b57f216b8889'
            }
        },
        macbook: {
            base: '1517336714731-489689fd1ca8',
            variants: {
                'Space Gray': '1611186871348-b1ce696e52c9',
                'Silver': '1541807084-5c52b6b3adef'
            }
        },
        // Add more products...
    },
    fashion: {
        shoes: {
            base: '1542291026-7eec264c27ff',
            variants: {
                'Black': '1542291026-7eec264c27ff',
                'Blue': '1556906781-9a412961c28c',
                'Red': '1600185365926-3a2ce3cdb9eb'
            }
        }
        // Add more products...
    }
};