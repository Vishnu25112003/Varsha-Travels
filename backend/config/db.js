const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI is not set in environment variables");
    throw new Error("Missing MONGODB_URI env variable");
  }

  try {
    await mongoose.connect(uri, {
      // Mongoose 8+ uses modern defaults; no extra options required
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
}

module.exports = connectDB;