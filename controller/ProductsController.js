const Product=require('../models/products')

// Create a new product
module.exports.create = async (req, res) => {
    try {
        const { name, quantity } = req.body;

        if (!name || !quantity) {
            return res.status(400).json({ message: "Name and quantity are required." });
        }

        const product = new Product({ name, quantity });
        await product.save();

        return res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};


// Fetch all products from the database
module.exports.getAllProducts = async (req, res) => {
    try {
        // Retrieve all products from the database
        const products = await Product.find();

        // Send the products as a response
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};



module.exports.updateQuantity = async (req, res) => {
    try {
        const { id } = req.params;  // Product ID from URL
        const { number } = req.query; // Quantity from query string

        // Ensure a valid quantity is provided
        if (!number || isNaN(number)) {
            return res.status(400).json({ message: "Invalid quantity provided" });
        }

        // Find the product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update the quantity
        product.quantity = number;
        await product.save();

        return res.status(200).json({ message: "Product quantity updated successfully", product });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
   

module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Get the product ID from the URL

        // Find and delete the product
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
