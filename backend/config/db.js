const mongoose = require('mongoose');

const connectDB = async () => {
  // If no connection string is provided, skip attempting to connect.
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI not set; skipping database connection.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
