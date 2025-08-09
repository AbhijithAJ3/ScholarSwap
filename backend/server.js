// 1. IMPORT YOUR PACKAGES
// ========================
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db.js'); // <-- ADD THIS: Import the database connection
const productRoutes = require('./routes/productRoutes');

// 2. INITIALIZE THE APP & MIDDLEWARE
// ===================================
dotenv.config();
connectDB(); // <-- ADD THIS: Run the function to connect to the database
const app = express();

app.use(cors());
app.use(express.json());

// 3. DEFINE ROUTES
// ===============================
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

// Tell the app to use the routes you defined in userRoutes.js
app.use('/api/users', userRoutes); // <-- ADD THIS: Use your user routes
app.use('/api/products', productRoutes);

// 4. START THE SERVER
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});