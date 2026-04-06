const mongoose = require('mongoose');

const connectDB = async () => {
  // Skip connection in test mode - dbHelper will handle it
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {

    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;