const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // This looks for the variable you will create in Render
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully to the cloud!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Stop the server if the database fails
  }
};

module.exports = connectDB;
