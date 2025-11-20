const mongoose = require("mongoose");

const contactSettingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true, trim: true },
    addressLine1: { type: String, trim: true },
    addressLine2: { type: String, trim: true },
    addressLine3: { type: String, trim: true },
    phones: { type: [String], default: [] },
    emails: { type: [String], default: [] },
    businessHoursWeekdays: { type: String, trim: true },
    businessHoursSaturday: { type: String, trim: true },
    businessHoursSunday: { type: String, trim: true },
    bankName: { type: String, trim: true },
    accountNumber: { type: String, trim: true },
    ifsc: { type: String, trim: true },
    branch: { type: String, trim: true },
    accountHolderName: { type: String, trim: true },
    upiId: { type: String, trim: true },
    socialFacebook: { type: String, trim: true },
    socialInstagram: { type: String, trim: true },
    socialTwitter: { type: String, trim: true },
    socialWhatsapp: { type: String, trim: true },
    qrImageUrl: { type: String, default: "" },
    qrImagePublicId: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactSettings", contactSettingsSchema);
