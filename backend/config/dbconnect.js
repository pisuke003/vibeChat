const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.CONN_STRING)
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}   

module.exports = dbConnect;