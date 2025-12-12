const express = require("express");
const Destination = require("../models/Destination");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// GET /api/destinations - list all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.json(destinations);
  } catch (error) {
    console.error("Failed to fetch destinations", error);
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
});

// POST /api/destinations - create new destination
router.post("/", async (req, res) => {
  try {
    const { name, state, details, highlights, imageUrl, imagePublicId } = req.body;

    if (!name || !state) {
      return res.status(400).json({ message: "Name and state are required" });
    }

    const doc = await Destination.create({
      name: name.trim(),
      state: state.trim(),
      details: (details || "").trim(),
      highlights: Array.isArray(highlights)
        ? highlights.map((h) => String(h).trim()).filter(Boolean)
        : [],
      imageUrl: imageUrl || "",
      imagePublicId: imagePublicId || "",
    });

    res.status(201).json(doc);
  } catch (error) {
    console.error("Failed to create destination", error);
    res.status(500).json({ message: "Failed to create destination" });
  }
});

// PUT /api/destinations/:id - update destination
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, state, details, highlights, imageUrl, imagePublicId } = req.body;

    const dest = await Destination.findById(id);
    if (!dest) {
      return res.status(404).json({ message: "Destination not found" });
    }

    dest.name = name ? name.trim() : dest.name;
    dest.state = state ? state.trim() : dest.state;
    dest.details = typeof details === "string" ? details.trim() : dest.details;
    if (Array.isArray(highlights)) {
      dest.highlights = highlights.map((h) => String(h).trim()).filter(Boolean);
    }
    if (typeof imageUrl === "string") {
      dest.imageUrl = imageUrl;
    }
    if (typeof imagePublicId === "string") {
      dest.imagePublicId = imagePublicId;
    }

    const saved = await dest.save();
    res.json(saved);
  } catch (error) {
    console.error("Failed to update destination", error);
    res.status(500).json({ message: "Failed to update destination" });
  }
});

// DELETE /api/destinations/:id - delete destination and its Cloudinary image if present
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dest = await Destination.findById(id);

    if (!dest) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // If we have an associated Cloudinary public ID, best-effort delete the asset
    if (dest.imagePublicId) {
      cloudinary.uploader.destroy(dest.imagePublicId).catch((err) => {
        console.error("Failed to delete Cloudinary image", err);
      });
    }

    await dest.deleteOne();

    res.json({ message: "Destination deleted" });
  } catch (error) {
    console.error("Failed to delete destination", error);
    res.status(500).json({ message: "Failed to delete destination" });
  }
});

module.exports = router;
