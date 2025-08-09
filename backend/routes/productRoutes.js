// In backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getMyProducts, // <-- Import the new function
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();

// Route for creating a product (Private)
router.post('/', protect, upload.any(), createProduct);

// Route for getting all products (Public)
router.get('/', getProducts);

// Route for getting the logged-in user's products (Private)
router.get('/myproducts', protect, getMyProducts);

module.exports = router;
