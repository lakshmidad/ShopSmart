/**
 * Product Database Configuration
 * Centralized configuration for product management
 * @module productConfig
 */
const ProductConfig = {
    IMAGE_BASE_URL: 'https://images.unsplash.com/photo-',
    CATEGORIES: {
        ELECTRONICS: 'Electronics',
        FASHION: 'Fashion',
        HOME_LIVING: 'Home & Living',
        BEAUTY: 'Beauty',
        SPORTS: 'Sports',
        BOOKS: 'Books & Stationery'
    },
    BRANDS: {
        [this.CATEGORIES?.ELECTRONICS]: ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP'],
        [this.CATEGORIES?.FASHION]: ['Nike', 'Adidas', 'Levi\'s', 'H&M', 'Zara', 'Uniqlo'],
        [this.CATEGORIES?.HOME_LIVING]: ['Dyson', 'Philips', 'IKEA', 'KitchenAid', 'Bosch'],
        [this.CATEGORIES?.BEAUTY]: ['MAC', 'L\'Oreal', 'Estée Lauder', 'Clinique', 'Fenty'],
        [this.CATEGORIES?.SPORTS]: ['Nike', 'Adidas', 'Under Armour', 'Puma', 'The North Face'],
        [this.CATEGORIES?.BOOKS]: ['Penguin', 'HarperCollins', 'Random House', 'Simon & Schuster']
    }
};

/**
 * Product Image Database
 * Mapping of product categories and variants to specific high-quality images
 */
const ProductImages = {
    electronics: {
        phone: {
            base: '1696426050396-a4a7c35e5a5b',
            variants: {
                'Titanium Black': '1696426050469-5ff777c86723',
                'Titanium White': '1696426050231-a289e9dd388e',
                'Titanium Blue': '1696426050106-b57f216b8889'
            }
        },
        laptop: {
            base: '1517336714731-489689fd1ca8',
            variants: {
                'Space Gray': '1611186871348-b1ce696e52c9',
                'Silver': '1541807084-5c52b6b3adef'
            }
        },
        tv: {
            base: '1601944177325-f8867652837f',
            variants: {
                'Black': '1593359677879-a4bb92f829d1',
                'Silver': '1593784991095-a205069470b6'
            }
        }
    },
    fashion: {
        shoes: {
            base: '1542291026-7eec264c27ff',
            variants: {
                'Black': '1542291026-7eec264c27ff',
                'Blue': '1556906781-9a412961c28c',
                'Red': '1600185365926-3a2ce3cdb9eb'
            }
        },
        clothing: {
            base: '1598033129183-c4f50c736f10',
            variants: {
                'Casual': '1598033129183-c4f50c736f10',
                'Formal': '1598032945172-89f7c98a8e53'
            }
        }
    },
    home: {
        furniture: {
            base: '1616627561950-9f746e330187',
            variants: {
                'Living': '1616627561950-9f746e330187',
                'Bedroom': '1616486029083-8f8c8473c0b6'
            }
        },
        appliances: {
            base: '1517142089942-ba376ce32a2e',
            variants: {
                'Kitchen': '1517142089942-ba376ce32a2e',
                'Laundry': '1626806819282-2c1ac70ffd3c'
            }
        }
    }
};

// Export configurations for use in other modules
export { ProductConfig, ProductImages };