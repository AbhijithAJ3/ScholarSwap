// In backend/models/userModel.js

const mongoose = require('mongoose');

// This is the blueprint for a user in our database
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // This field is mandatory
    },
    email: {
      type: String,
      required: true,
      unique: true, // Every user must have a unique email
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // This automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// Create the 'User' model from the schema and export it
module.exports = mongoose.model('User', userSchema);