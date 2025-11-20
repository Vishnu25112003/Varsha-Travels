const express = require("express");
const Vehicle = require("../models/Vehicle");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// GET /api/vehicles - list all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    console.error("Failed to fetch vehicles", error);
    res.status(500).json({ message: "Failed to fetch vehicles" });
  }
});

// POST /api/vehicles - create new vehicle
router.post("/", async (req, res) => {
  try {
    const { name, imageUrl, imagePublicId } = req.body;

    if (!name || !imageUrl || !imagePublicId) {
      return res
        .status(400)
        .json({ message: "Name, imageUrl and imagePublicId are required" });
    }

    const doc = await Vehicle.create({
      name: name.trim(),
      imageUrl,
      imagePublicId,
    });

    res.status(201).json(doc);
  } catch (error) {
    console.error("Failed to create vehicle", error);
    res.status(500).json({ message: "Failed to create vehicle" });
  }
});

// PUT /api/vehicles/:id - update vehicle
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageUrl, imagePublicId } = req.body;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (name) vehicle.name = name.trim();
    if (typeof imageUrl === "string") vehicle.imageUrl = imageUrl;
    if (typeof imagePublicId === "string") vehicle.imagePublicId = imagePublicId;

    const saved = await vehicle.save();
    res.json(saved);
  } catch (error) {
    console.error("Failed to update vehicle", error);
    res.status(500).json({ message: "Failed to update vehicle" });
  }
});

// DELETE /api/vehicles/:id - delete vehicle and its Cloudinary image
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (vehicle.imagePublicId) {
      cloudinary.uploader.destroy(vehicle.imagePublicId).catch((err) => {
        console.error("Failed to delete Cloudinary vehicle image", err);
      });
    }

    await vehicle.deleteOne();

    res.json({ message: "Vehicle deleted" });
  } catch (error) {
    console.error("Failed to delete vehicle", error);
    res.status(500).json({ message: "Failed to delete vehicle" });
  }
});

module.exports = router;
