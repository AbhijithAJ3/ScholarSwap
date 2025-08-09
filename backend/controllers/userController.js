// In backend/controllers/userController.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc   Register a new user
// @route  POST /api/users/signup
// @access Public
const registerUser = async (req, res) => {
  try {
    // 1. Get user data from the request body
    const { name, email, phoneNumber, password } = req.body;

    // 2. Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new user in the database
    const user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // 5. If user was created, send back user data and a token
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc   Authenticate a user (Login)
// @route  POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
  try {
    // 1. Get email and password from the request body
    const { email, password } = req.body;

    // 2. Find the user in the database by their email
    const user = await User.findOne({ email });

    // 3. If user exists, compare the provided password with the stored hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      // 4. If they match, send back the user data and a new token
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
      });
    } else {
      // 5. If user not found or password doesn't match, send an error
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  registerUser,
  loginUser, // <-- Make sure to export the new function
};
