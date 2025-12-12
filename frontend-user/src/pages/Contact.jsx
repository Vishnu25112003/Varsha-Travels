import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";

const API_BASE_URL = "http://localhost:5000"; // same backend as admin

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [settings, setSettings] = useState(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoadingSettings(true);
        const res = await fetch(`${API_BASE_URL}/api/contact-settings`);
        if (!res.ok) throw new Error("Failed to load contact settings");
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch contact settings", error);
        setSettings(null);
      } finally {
        setLoadingSettings(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let body = {};
      try {
        body = await res.json();
      } catch (err) {
        body = {};
      }

      if (!res.ok) {
        throw new Error(body.message || "Failed to send message");
      }

      // Show success notification
      setNotification({
        type: "success",
        message: "Thank you for contacting us! We will get back to you soon.",
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to submit contact form", error);
      
      // Show error notification
      setNotification({
        type: "error",
        message: error.message || "Failed to send your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
          duration={5000}
        />
      )}

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            Get in touch with our travel experts
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-white to-gray-50 border border-blue-600/20 rounded-3xl p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-blue-600/30 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 transition"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-blue-600/30 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 transition"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-blue-600/30 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 transition"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-blue-600/30 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 transition"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-blue-600/30 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 transition resize-none"
                  rows="5"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-600/50 transition transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Address */}
              <div className="bg-gradient-to-br from-white to-gray-50 border border-blue-600/20 rounded-2xl p-8 hover:border-blue-600/50 transition">
                <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start">
                  <div className="text-4xl shrink-0">📍</div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Address
                    </h3>
                    <p className="text-gray-600 break-words">
                      {settings?.businessName || "Varsha Travels"}
                      <br />
                      {settings?.addressLine1}
                      {settings?.addressLine1 && <br />}
                      {settings?.addressLine2}
                      {settings?.addressLine2 && <br />}
                      {settings?.addressLine3}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gradient-to-br from-white to-gray-50 border border-blue-600/20 rounded-2xl p-8 hover:border-blue-600/50 transition">
                <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start">
                  <div className="text-4xl shrink-0">📞</div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Phone Numbers
                    </h3>
                    {(settings?.phones || []).map((phone, idx) => (
                      <p key={idx} className="text-gray-600 break-words mb-1">
                        Phone {idx + 1}:{" "}
                        <a
                          href={`tel:+91${phone}`}
                          className="text-blue-700 hover:text-indigo-500"
                        >
                          {phone}
                        </a>
                      </p>
                    ))}
                    {(!settings?.phones || settings.phones.length === 0) && (
                      <p className="text-gray-600 break-words">
                        Phone details coming soon.
                      </p>
                    )}
                    <p className="text-gray-600 text-sm mt-2">Available 24/7</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gradient-to-br from-white to-gray-50 border border-blue-600/20 rounded-2xl p-8 hover:border-blue-600/50 transition">
                <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start">
                  <div className="text-4xl shrink-0">✉️</div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Email
                    </h3>
                    {(settings?.emails || []).map((email, idx) => (
                      <p key={idx} className="text-gray-600 break-words mb-1">
                        <a
                          href={`mailto:${email}`}
                          className="text-blue-700 hover:text-indigo-500"
                        >
                          {email}
                        </a>
                      </p>
                    ))}
                    {(!settings?.emails || settings.emails.length === 0) && (
                      <p className="text-gray-600 break-words">
                        Email details coming soon.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-gradient-to-br from-white to-gray-50 border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition">
                <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start">
                  <div className="text-4xl shrink-0">🕐</div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Business Hours
                    </h3>
                    {settings?.businessHoursWeekdays && (
                      <p className="text-gray-600 mb-1">
                        Monday - Friday: {settings.businessHoursWeekdays}
                      </p>
                    )}
                    {settings?.businessHoursSaturday && (
                      <p className="text-gray-600 mb-1">
                        Saturday: {settings.businessHoursSaturday}
                      </p>
                    )}
                    {settings?.businessHoursSunday && (
                      <p className="text-gray-600">
                        Sunday: {settings.businessHoursSunday}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-blue-600/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                {[
                  { icon: "f", name: "Facebook", url: settings?.socialFacebook },
                  { icon: "📷", name: "Instagram", url: settings?.socialInstagram },
                  { icon: "𝕏", name: "Twitter", url: settings?.socialTwitter },
                  { icon: "💬", name: "WhatsApp", url: settings?.socialWhatsapp },
                ]
                  .filter((social) => !!social.url)
                  .map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 rounded-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 font-bold flex items-center justify-center transition transform hover:scale-110"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                {(!settings?.socialFacebook &&
                  !settings?.socialInstagram &&
                  !settings?.socialTwitter &&
                  !settings?.socialWhatsapp) && (
                  <p className="text-gray-500 text-sm">Social links coming soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Find Us Here
          </h2>
          <div className="bg-gradient-to-br from-white to-gray-50 border border-blue-600/20 rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=9.942378,78.1041718&hl=en&z=16&output=embed"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
