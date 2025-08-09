// In backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try to connect to the database using the URI from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If successful, log a message to the console
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If it fails, log the error and exit the application
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with a failure code
  }
};

module.exports = connectDB;