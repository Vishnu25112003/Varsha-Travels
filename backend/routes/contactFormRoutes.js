const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// POST /api/contact - handle contact form submissions
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject and message are required",
      });
    }

    const fromAddress = process.env.CONTACT_EMAIL_USER;
    const toAddress = process.env.CONTACT_TO_EMAIL || fromAddress;
    const appPassword = process.env.CONTACT_EMAIL_PASS;

    if (!fromAddress || !appPassword || !toAddress) {
      return res.status(500).json({
        message:
          "Email is not configured on the server. Please set CONTACT_EMAIL_USER, CONTACT_EMAIL_PASS and CONTACT_TO_EMAIL in .env.",
      });
    }

    console.log("[contact] Sending email using", fromAddress, "->", toAddress,
      "pass set:", !!appPassword);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: fromAddress,
        pass: appPassword,
      },
    });

    const mailSubject = `[Varsha Travels Contact] ${subject}`;
    const mailText = `New contact form submission from Varsha Travels website.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      (phone ? `Phone: ${phone}\n` : "") +
      `\nMessage:\n${message}\n`;

    const mailHtml = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line;">${message}</p>
    `;

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      subject: mailSubject,
      text: mailText,
      html: mailHtml,
    });

    res.json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Failed to send contact form email", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

module.exports = router;
