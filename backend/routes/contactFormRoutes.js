const express = require("express");
const ContactMessage = require("../models/ContactMessage");

const router = express.Router();

// POST /api/contact - Save contact form submission to database
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body || {};

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject and message are required",
      });
    }

    // Save to database
    const contactMessage = new ContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : "",
      subject: subject.trim(),
      message: message.trim(),
      status: "unread",
      isStarred: false,
    });

    await contactMessage.save();

    console.log(`✅ Contact message saved from: ${name} (${email})`);

    res.status(201).json({
      message: "Message sent successfully",
      id: contactMessage._id,
    });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// GET /api/contact - Get all contact messages (for admin)
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// GET /api/contact/:id - Get single contact message
router.get("/:id", async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    console.error("Failed to fetch contact message:", error);
    res.status(500).json({ message: "Failed to fetch message" });
  }
});

// PUT /api/contact/:id - Update message status or star
router.put("/:id", async (req, res) => {
  try {
    const { status, isStarred } = req.body;

    const updateData = {};
    if (status !== undefined) {
      if (!["unread", "read", "replied"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      updateData.status = status;
    }
    if (isStarred !== undefined) {
      updateData.isStarred = isStarred;
    }

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json(message);
  } catch (error) {
    console.error("Failed to update contact message:", error);
    res.status(500).json({ message: "Failed to update message" });
  }
});

// DELETE /api/contact/:id - Delete contact message
router.delete("/:id", async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Failed to delete contact message:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
});

module.exports = router;
