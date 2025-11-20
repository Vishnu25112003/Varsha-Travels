const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    details: { type: String, trim: true },
    highlights: { type: [String], default: [] },
    imageUrl: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", destinationSchema);
