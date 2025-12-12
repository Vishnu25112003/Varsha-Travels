const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    trip: { type: String, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    content: { type: String, required: true, trim: true },
    mediaUrl: { type: String, default: "" },
    mediaType: { type: String, enum: ["image", "video", ""], default: "" },
    date: { type: String, trim: true }, // human-readable date string (e.g. "Jan 2024")
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
