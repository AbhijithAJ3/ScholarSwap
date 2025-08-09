// In backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
// Update the import to include loginUser
const { registerUser, loginUser } = require('../controllers/userController');

// When a POST request is made to '/signup', run the registerUser function
router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;