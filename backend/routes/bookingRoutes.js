const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// GET /api/bookings - Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// GET /api/bookings/:id - Get single booking
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error("Failed to fetch booking:", error);
    res.status(500).json({ message: "Failed to fetch booking" });
  }
});

// POST /api/bookings - Create new booking
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      destination,
      vehicle,
      pickupDate,
      dropoffDate,
      passengers,
      specialRequests,
    } = req.body;

    // Validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !destination ||
      !vehicle ||
      !pickupDate ||
      !dropoffDate ||
      !passengers
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const booking = new Booking({
      fullName,
      email,
      phone,
      destination,
      vehicle,
      pickupDate,
      dropoffDate,
      passengers,
      specialRequests: specialRequests || "",
      status: "pending",
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Failed to create booking:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
});

// PUT /api/bookings/:id - Update booking status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Failed to update booking:", error);
    res.status(500).json({ message: "Failed to update booking" });
  }
});

// DELETE /api/bookings/:id - Delete booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Failed to delete booking:", error);
    res.status(500).json({ message: "Failed to delete booking" });
  }
});

module.exports = router;
