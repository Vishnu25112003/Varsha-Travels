const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    vehicle: {
      type: String,
      required: true,
      trim: true,
    },
    pickupDate: {
      type: String,
      required: true,
    },
    dropoffDate: {
      type: String,
      required: true,
    },
    passengers: {
      type: String,
      required: true,
    },
    specialRequests: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
