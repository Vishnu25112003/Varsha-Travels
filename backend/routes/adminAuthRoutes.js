const express = require("express");

const router = express.Router();

// POST /api/admin/login
// Body: { email, password }
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password || typeof password !== "string") {
      return res.status(400).json({ message: "Password is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Get admin credentials from environment variables
    const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "";

    if (!adminEmail || !adminPassword) {
      console.error("❌ Admin credentials not configured in .env");
      return res.status(500).json({
        message: "Admin credentials not configured. Please contact the administrator.",
      });
    }

    // Check if email matches
    if (normalizedEmail !== adminEmail) {
      console.log(`⚠️  Invalid login attempt: ${normalizedEmail}`);
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check if password matches
    if (password !== adminPassword) {
      console.log(`⚠️  Invalid password for: ${normalizedEmail}`);
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.log(`✅ Admin login successful: ${normalizedEmail}`);

    // Login successful
    return res.json({
      message: "Login successful",
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
});

module.exports = router;
