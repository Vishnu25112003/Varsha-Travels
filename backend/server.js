require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const uploadRoutes = require("./routes/uploadRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const contactSettingsRoutes = require("./routes/contactSettingsRoutes");
const contactFormRoutes = require("./routes/contactFormRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Varsha Travels backend is running" });
});

// Image upload route
app.use("/api/upload", uploadRoutes);

// Destination routes
app.use("/api/destinations", destinationRoutes);

// Vehicle gallery routes
app.use("/api/vehicles", vehicleRoutes);

// Contact settings routes
app.use("/api/contact-settings", contactSettingsRoutes);

// Contact form routes
app.use("/api/contact", contactFormRoutes);

// Admin OTP auth routes
app.use("/api/admin", adminAuthRoutes);

// Reviews routes
app.use("/api/reviews", reviewRoutes);

// Booking routes
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server due to DB error:", error.message);
    process.exit(1);
  });