// In backend/controllers/productController.js

const Product = require('../models/productModel');

// @desc   Create a new product listing
// @route  POST /api/products
// @access Private
const createProduct = async (req, res) => {
  try {
    const { productName, description, category, price, contactEmail } = req.body;

    if (!productName || !description || !category || !price || !contactEmail) {
      return res.status(400).json({ message: 'Please fill out all required fields.' });
    }

    const images = ['/uploads/placeholder.jpg'];

    const product = new Product({
      name: productName,
      description,
      category,
      price,
      contactEmail,
      images,
      user: req.user.id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('ERROR CREATING PRODUCT:', error);
    res.status(500).json({ message: 'Server Error creating product' });
  }
};

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('ERROR FETCHING PRODUCTS:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc   Fetch all products for the logged-in user
// @route  GET /api/products/myproducts
// @access Private
const getMyProducts = async (req, res) => {
  try {
    // Find products where the 'user' field matches the logged-in user's ID
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch (error) {
    console.error('ERROR FETCHING MY PRODUCTS:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getMyProducts, // <-- Export the new function
};
