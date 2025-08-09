// In backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  // Check if the request has an 'Authorization' header that starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token from the header (it's in the format "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token is real using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user's ID from the token and find them in the database
      // We attach the user to the request object so our controllers can use it
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Let the user proceed to the route
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };