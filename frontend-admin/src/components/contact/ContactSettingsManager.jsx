import { useEffect, useState } from "react";
import ContactSettingsForm from "./ContactSettingsForm.jsx";
import { useNotification } from "../../hooks/useNotificationPopup.jsx";

const API_BASE_URL = "http://localhost:5000"; // adjust for production

function ContactSettingsManager() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE_URL}/api/contact-settings`);
        if (!res.ok) throw new Error("Failed to load contact settings");
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load contact settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const uploadQrIfNeeded = async (qrImageFile) => {
    if (!qrImageFile) {
      return {
        qrImageUrl: settings?.qrImageUrl || "",
        qrImagePublicId: settings?.qrImagePublicId || "",
      };
    }
    const formData = new FormData();
    formData.append("image", qrImageFile);
    const res = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "QR code upload failed");
    }
    const data = await res.json();
    return { qrImageUrl: data.secureUrl, qrImagePublicId: data.publicId };
  };

  const handleSubmit = async (data) => {
    if (!settings) return;
    try {
      setError("");
      const uploaded = await uploadQrIfNeeded(data.qrImageFile);

      const res = await fetch(
        `${API_BASE_URL}/api/contact-settings/${settings._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            qrImageUrl: uploaded.qrImageUrl,
            qrImagePublicId: uploaded.qrImagePublicId,
          }),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to update contact settings");
      }
      const updated = await res.json();
      setSettings(updated);
      showNotification({
        type: "success",
        title: "Contact settings saved",
        message: "Your contact and footer details have been updated.",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update contact settings");
      showNotification({
        type: "error",
        title: "Failed to save contact settings",
        message: err.message || "Something went wrong while saving contact settings.",
      });
    }
  };

  if (loading) {
    return <p className="text-xs text-slate-500">Loading contact settings...</p>;
  }

  if (!settings) {
    return (
      <p className="text-xs text-red-600">
        Failed to load contact settings. Please try reloading the page.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Contact & footer details</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Manage the address, contact numbers, email, bank account details and
            UPI QR code used in your Contact page and Footer on the user website.
          </p>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <ContactSettingsForm
        key={settings._id}
        initialValues={settings}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default ContactSettingsManager;
