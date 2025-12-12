import { useState } from "react";

function ContactSettingsForm({ initialValues, onSubmit }) {
  const [form, setForm] = useState(() => ({
    businessName: initialValues?.businessName || "",
    addressLine1: initialValues?.addressLine1 || "",
    addressLine2: initialValues?.addressLine2 || "",
    addressLine3: initialValues?.addressLine3 || "",
    // Multiple phones & emails
    phones: Array.isArray(initialValues?.phones) && initialValues.phones.length
      ? initialValues.phones
      : [""],
    emails: Array.isArray(initialValues?.emails) && initialValues.emails.length
      ? initialValues.emails
      : [""],
    // Business hours
    businessHoursWeekdays: initialValues?.businessHoursWeekdays || "",
    businessHoursSaturday: initialValues?.businessHoursSaturday || "",
    businessHoursSunday: initialValues?.businessHoursSunday || "",
    bankName: initialValues?.bankName || "",
    accountNumber: initialValues?.accountNumber || "",
    ifsc: initialValues?.ifsc || "",
    branch: initialValues?.branch || "",
    accountHolderName: initialValues?.accountHolderName || "",
    upiId: initialValues?.upiId || "",
    // Social links
    socialFacebook: initialValues?.socialFacebook || "",
    socialInstagram: initialValues?.socialInstagram || "",
    socialTwitter: initialValues?.socialTwitter || "",
    socialWhatsapp: initialValues?.socialWhatsapp || "",
    qrImageFile: initialValues?.qrImageFile || null,
    qrImagePreview:
      initialValues?.qrImagePreview || initialValues?.qrImageUrl || "",
  }));

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setForm((prev) => {
      const next = Array.isArray(prev[field]) ? [...prev[field]] : [];
      next[index] = value;
      return { ...prev, [field]: next };
    });
  };

  const handleArrayAdd = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ""],
    }));
  };

  const handleArrayRemove = (field, index) => {
    setForm((prev) => {
      const next = Array.isArray(prev[field]) ? [...prev[field]] : [];
      if (next.length <= 1) return prev; // keep at least one field
      next.splice(index, 1);
      return { ...prev, [field]: next };
    });
  };

  const handleQrImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({
      ...prev,
      qrImageFile: file,
      qrImagePreview: previewUrl,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.businessName.trim()) return;

    const trimmedPhones = (form.phones || [])
      .map((p) => p.trim())
      .filter(Boolean);
    const trimmedEmails = (form.emails || [])
      .map((em) => em.trim())
      .filter(Boolean);

    onSubmit({
      ...form,
      businessName: form.businessName.trim(),
      addressLine1: form.addressLine1.trim(),
      addressLine2: form.addressLine2.trim(),
      addressLine3: form.addressLine3.trim(),
      phones: trimmedPhones.length ? trimmedPhones : [""],
      emails: trimmedEmails.length ? trimmedEmails : [""],
      businessHoursWeekdays: form.businessHoursWeekdays.trim(),
      businessHoursSaturday: form.businessHoursSaturday.trim(),
      businessHoursSunday: form.businessHoursSunday.trim(),
      bankName: form.bankName.trim(),
      accountNumber: form.accountNumber.trim(),
      ifsc: form.ifsc.trim(),
      branch: form.branch.trim(),
      accountHolderName: form.accountHolderName.trim(),
      upiId: form.upiId.trim(),
      socialFacebook: form.socialFacebook.trim(),
      socialInstagram: form.socialInstagram.trim(),
      socialTwitter: form.socialTwitter.trim(),
      socialWhatsapp: form.socialWhatsapp.trim(),
      qrImageFile: form.qrImageFile || null,
      qrImagePreview: form.qrImagePreview || "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">
          Contact information & account details
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-500 max-w-xs sm:text-right">
          These details are shown on both the Contact page and the footer of your
          user website.
        </p>
      </div>

      <div className="space-y-5">
        {/* Address & business hours */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Address details
              </h4>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Business name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="e.g., Varsha Travels"
                value={form.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Address lines
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Address line 1"
                value={form.addressLine1}
                onChange={(e) => handleChange("addressLine1", e.target.value)}
              />
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Address line 2"
                value={form.addressLine2}
                onChange={(e) => handleChange("addressLine2", e.target.value)}
              />
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Address line 3 / city, pincode"
                value={form.addressLine3}
                onChange={(e) => handleChange("addressLine3", e.target.value)}
              />
            </div>
          </div>

          {/* Business hours */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
              Business hours
            </h4>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Monday - Friday
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="e.g., 9:00 AM - 6:00 PM"
                value={form.businessHoursWeekdays}
                onChange={(e) => handleChange("businessHoursWeekdays", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Saturday
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="e.g., 10:00 AM - 4:00 PM"
                value={form.businessHoursSaturday}
                onChange={(e) => handleChange("businessHoursSaturday", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Sunday
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="e.g., By Appointment"
                value={form.businessHoursSunday}
                onChange={(e) => handleChange("businessHoursSunday", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Contact numbers & emails */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact numbers */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
              Contact numbers
            </h4>
            {form.phones.map((phone, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder={index === 0 ? "Primary phone" : "Additional phone"}
                  value={phone}
                  onChange={(e) =>
                    handleArrayChange("phones", index, e.target.value)
                  }
                />
                {form.phones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleArrayRemove("phones", index)}
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-500 hover:bg-slate-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleArrayAdd("phones")}
              className="inline-flex items-center rounded-lg border border-dashed border-sky-300 px-3 py-1.5 text-xs font-medium text-sky-700 bg-sky-50 hover:bg-sky-100"
            >
              + Add phone number
            </button>
          </div>

          {/* Emails */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
              Email addresses
            </h4>
            {form.emails.map((email, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="email"
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder={index === 0 ? "Primary email" : "Additional email"}
                  value={email}
                  onChange={(e) =>
                    handleArrayChange("emails", index, e.target.value)
                  }
                />
                {form.emails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleArrayRemove("emails", index)}
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-500 hover:bg-slate-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleArrayAdd("emails")}
              className="inline-flex items-center rounded-lg border border-dashed border-sky-300 px-3 py-1.5 text-xs font-medium text-sky-700 bg-sky-50 hover:bg-sky-100"
            >
              + Add email address
            </button>
          </div>
        </div>

        {/* Account details & QR */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
              Account details
            </h4>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Bank name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="e.g., State Bank of India"
                value={form.bankName}
                onChange={(e) => handleChange("bankName", e.target.value)}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Account number
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Account number"
                  value={form.accountNumber}
                  onChange={(e) => handleChange("accountNumber", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  IFSC code
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="IFSC"
                  value={form.ifsc}
                  onChange={(e) => handleChange("ifsc", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Branch
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Branch"
                  value={form.branch}
                  onChange={(e) => handleChange("branch", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Account holder name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Account holder name"
                  value={form.accountHolderName}
                  onChange={(e) => handleChange("accountHolderName", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                UPI ID
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="e.g., yourupi@oksbi"
                value={form.upiId}
                onChange={(e) => handleChange("upiId", e.target.value)}
              />
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
              UPI QR code
            </h4>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              UPI QR code image
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-xs sm:text-sm text-slate-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
              onChange={handleQrImageChange}
            />
            {form.qrImagePreview && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                <img
                  src={form.qrImagePreview}
                  alt="UPI QR preview"
                  className="w-20 h-20 rounded-md object-contain bg-white"
                />
                <span className="text-[11px] text-slate-500">
                  Preview of the QR image used in the footer.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Social media links */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
            Social media links
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Facebook URL
              </label>
              <input
                type="url"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="https://facebook.com/your-page"
                value={form.socialFacebook}
                onChange={(e) => handleChange("socialFacebook", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="https://instagram.com/your-page"
                value={form.socialInstagram}
                onChange={(e) => handleChange("socialInstagram", e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Twitter URL
              </label>
              <input
                type="url"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="https://twitter.com/your-page"
                value={form.socialTwitter}
                onChange={(e) => handleChange("socialTwitter", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                WhatsApp link
              </label>
              <input
                type="url"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="https://wa.me/91xxxxxxxxxx"
                value={form.socialWhatsapp}
                onChange={(e) => handleChange("socialWhatsapp", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2">
        <button
          type="submit"
          className="inline-flex justify-center rounded-lg bg-sky-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
        >
          Save changes
        </button>
      </div>
    </form>
  );
}

export default ContactSettingsForm;
