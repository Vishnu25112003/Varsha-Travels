const express = require("express");
const ContactSettings = require("../models/ContactSettings");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Default initial values (same as original frontend-admin defaults)
const defaultInitial = {
  businessName: "Varsha Travels",
  addressLine1: "57, 5th Cross Street",
  addressLine2: "East Vaithiyanatha Puram, Thathaneri P.O",
  addressLine3: "Madurai - 625018, India",
  phones: ["8778265650", "9435360401"],
  emails: ["varshatravels06@gmail.com"],
  businessHoursWeekdays: "9:00 AM - 6:00 PM",
  businessHoursSaturday: "10:00 AM - 4:00 PM",
  businessHoursSunday: "By Appointment",
  bankName: "State Bank of India",
  accountNumber: "30231884313",
  ifsc: "SBIN0000253",
  branch: "Tallakulam",
  accountHolderName: "S Muthukumar",
  upiId: "varshamd12@okaxis",
  socialFacebook: "",
  socialInstagram: "",
  socialTwitter: "",
  socialWhatsapp: "",
  qrImageUrl: "",
  qrImagePublicId: "",
};

// GET /api/contact-settings - get single settings document (create default if missing)
router.get("/", async (req, res) => {
  try {
    let doc = await ContactSettings.findOne();
    if (!doc) {
      doc = await ContactSettings.create(defaultInitial);
    }
    res.json(doc);
  } catch (error) {
    console.error("Failed to fetch contact settings", error);
    res.status(500).json({ message: "Failed to fetch contact settings" });
  }
});

// PUT /api/contact-settings/:id - update document
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      businessName,
      addressLine1,
      addressLine2,
      addressLine3,
      phones,
      emails,
      businessHoursWeekdays,
      businessHoursSaturday,
      businessHoursSunday,
      bankName,
      accountNumber,
      ifsc,
      branch,
      accountHolderName,
      upiId,
      socialFacebook,
      socialInstagram,
      socialTwitter,
      socialWhatsapp,
      qrImageUrl,
      qrImagePublicId,
    } = req.body;

    const settings = await ContactSettings.findById(id);
    if (!settings) {
      return res.status(404).json({ message: "Contact settings not found" });
    }

    const previousQrPublicId = settings.qrImagePublicId;

    if (businessName) settings.businessName = businessName.trim();
    settings.addressLine1 = (addressLine1 || "").trim();
    settings.addressLine2 = (addressLine2 || "").trim();
    settings.addressLine3 = (addressLine3 || "").trim();

    if (Array.isArray(phones)) {
      settings.phones = phones.map((p) => String(p).trim()).filter(Boolean);
    }
    if (Array.isArray(emails)) {
      settings.emails = emails.map((e) => String(e).trim()).filter(Boolean);
    }

    settings.businessHoursWeekdays = (businessHoursWeekdays || "").trim();
    settings.businessHoursSaturday = (businessHoursSaturday || "").trim();
    settings.businessHoursSunday = (businessHoursSunday || "").trim();

    settings.bankName = (bankName || "").trim();
    settings.accountNumber = (accountNumber || "").trim();
    settings.ifsc = (ifsc || "").trim();
    settings.branch = (branch || "").trim();
    settings.accountHolderName = (accountHolderName || "").trim();

    settings.upiId = (upiId || "").trim();

    settings.socialFacebook = (socialFacebook || "").trim();
    settings.socialInstagram = (socialInstagram || "").trim();
    settings.socialTwitter = (socialTwitter || "").trim();
    settings.socialWhatsapp = (socialWhatsapp || "").trim();

    if (typeof qrImageUrl === "string") {
      settings.qrImageUrl = qrImageUrl;
    }
    if (typeof qrImagePublicId === "string") {
      settings.qrImagePublicId = qrImagePublicId;
    }

    const saved = await settings.save();

    // If QR image changed, delete old Cloudinary image
    if (
      previousQrPublicId &&
      qrImagePublicId &&
      previousQrPublicId !== qrImagePublicId
    ) {
      cloudinary.uploader.destroy(previousQrPublicId).catch((err) => {
        console.error("Failed to delete old QR Cloudinary image", err);
      });
    }

    res.json(saved);
  } catch (error) {
    console.error("Failed to update contact settings", error);
    res.status(500).json({ message: "Failed to update contact settings" });
  }
});

module.exports = router;
