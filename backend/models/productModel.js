// In backend/models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Link to the User model
      required: true,
      ref: 'User', // The model this ID refers to
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // An array of image URLs
      required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);