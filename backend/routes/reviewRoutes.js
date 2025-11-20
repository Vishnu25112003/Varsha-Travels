const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// GET /api/reviews - list all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

// POST /api/reviews - create new review
router.post("/", async (req, res) => {
  try {
    const { name, trip, rating, content, mediaUrl, mediaType, date } = req.body;

    if (!name || !content) {
      return res.status(400).json({
        message: "Name and content are required",
      });
    }

    const review = await Review.create({
      name: name.trim(),
      trip: (trip || "").trim(),
      rating: Math.min(Math.max(Number(rating) || 5, 1), 5),
      content: content.trim(),
      mediaUrl: mediaUrl || "",
      mediaType: mediaType || "",
      date: (date || "").trim(),
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Failed to create review", error);
    res.status(500).json({ message: "Failed to create review" });
  }
});

// DELETE /api/reviews/:id - delete review
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error("Failed to delete review", error);
    res.status(500).json({ message: "Failed to delete review" });
  }
});

module.exports = router;
