const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Store uploads temporarily on disk before sending to Cloudinary
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || "";
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit, adjust as needed
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed"));
    }
    cb(null, true);
  },
});

// POST /api/upload
router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded" });
  }

  const filePath = req.file.path;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "varsha_travels", // optional folder name in Cloudinary
    });

    // Remove local file after upload
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete temporary file", err);
      }
    });

    return res.status(201).json({
      message: "Image uploaded successfully",
      secureUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload error", error);
    // Best effort clean-up
    fs.unlink(filePath, () => {});
    return res.status(500).json({ message: "Failed to upload image" });
  }
});

module.exports = router;
