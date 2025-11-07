/**
 * Product Model Class
 * Represents a single product in the system
 */
class Product {
    constructor({id, name, category, brand, price, rating, image, specifications, stock = 100}) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.price = this.validatePrice(price);
        this.rating = this.validateRating(rating);
        this.image = image;
        this.specifications = specifications;
        this.stock = stock;
        this.createdAt = new Date().toISOString();
        this.updatedAt = this.createdAt;
    }

    validatePrice(price) {
        if (typeof price !== 'number' || price < 0) {
            throw new Error(`Invalid price for product: ${this.name}`);
        }
        return Number(price.toFixed(2));
    }

    validateRating(rating) {
        if (typeof rating !== 'number' || rating < 0 || rating > 5) {
            throw new Error(`Invalid rating for product: ${this.name}`);
        }
        return Number(rating.toFixed(1));
    }

    updateStock(quantity) {
        if (this.stock + quantity < 0) {
            throw new Error(`Insufficient stock for product: ${this.name}`);
        }
        this.stock += quantity;
        this.updatedAt = new Date().toISOString();
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            category: this.category,
            brand: this.brand,
            price: this.price,
            rating: this.rating,
            image: this.image,
            specifications: this.specifications,
            stock: this.stock,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

export default Product;