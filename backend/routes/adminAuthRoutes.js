const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// In-memory OTP store: { [email]: { code, expiresAt } }
// For a simple project this is ok; for production use a persistent store.
const otpStore = new Map();

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000)); // 6-digit
}

function createTransporter() {
  const fromAddress = process.env.CONTACT_EMAIL_USER;
  const appPassword = process.env.CONTACT_EMAIL_PASS;

  if (!fromAddress || !appPassword) {
    throw new Error(
      "Email is not configured. Please set CONTACT_EMAIL_USER and CONTACT_EMAIL_PASS in .env."
    );
  }

  return {
    transporter: nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: fromAddress,
        pass: appPassword,
      },
    }),
    fromAddress,
  };
}

// POST /api/admin/send-otp
// Body: { email }
// Only allows emails that are present in ContactSettings.emails
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body || {};

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Only allow the single admin email configured in .env
    const allowedEnvEmail = (process.env.CONTACT_TO_EMAIL || process.env.CONTACT_EMAIL_USER || "")
      .trim()
      .toLowerCase();

    if (!allowedEnvEmail) {
      return res.status(500).json({
        message:
          "Admin email is not configured. Please set CONTACT_TO_EMAIL (or CONTACT_EMAIL_USER) in .env.",
      });
    }

    if (normalizedEmail !== allowedEnvEmail) {
      return res.status(401).json({
        message: "This email is not authorized for admin login.",
      });
    }

    const code = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(normalizedEmail, { code, expiresAt });

    // Send OTP email
    const { transporter, fromAddress } = createTransporter();

    const subject = "Varsha Travels Admin Login OTP";
    const text = `Your Varsha Travels admin login OTP is: ${code}\n\nThis code is valid for 5 minutes. If you did not request this login, you can ignore this email.`;

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <h2>Varsha Travels Admin Login</h2>
        <p>Use the following one-time password (OTP) to sign in to the admin panel:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${code}</p>
        <p style="color: #4b5563; font-size: 14px;">This code is valid for 5 minutes.</p>
        <p style="color: #6b7280; font-size: 12px;">If you did not request this login, you can safely ignore this email.</p>
      </div>
    `;

    await transporter.sendMail({
      from: fromAddress,
      to: normalizedEmail,
      subject,
      text,
      html,
    });

    return res.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Failed to send admin OTP", error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
});

// POST /api/admin/verify-otp
// Body: { email, otp }
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body || {};

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const code = String(otp).trim();

    const entry = otpStore.get(normalizedEmail);
    if (!entry) {
      return res.status(400).json({ message: "No OTP found for this email. Please request a new OTP." });
    }

    if (Date.now() > entry.expiresAt) {
      otpStore.delete(normalizedEmail);
      return res.status(400).json({ message: "OTP has expired. Please request a new OTP." });
    }

    if (entry.code !== code) {
      return res.status(400).json({ message: "Invalid OTP. Please check and try again." });
    }

    // OTP is valid; remove it from store
    otpStore.delete(normalizedEmail);

    // For this simple app, we just return success; frontend will keep the session in memory.
    return res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Failed to verify admin OTP", error);
    return res.status(500).json({ message: "Failed to verify OTP" });
  }
});

module.exports = router;
