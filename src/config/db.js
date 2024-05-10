const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/library");
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  }
};
module.exports = connectDB