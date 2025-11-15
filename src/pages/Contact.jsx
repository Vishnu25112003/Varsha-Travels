import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white pt-20">
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
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-600/50 transition transform hover:scale-105"
              >
                Send Message
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
                      Varsha Travels
                      <br />
                      57, 5th Cross Street
                      <br />
                      East Vaithiyanatha Puram, Thathaneri P.O
                      <br />
                      Madurai - 625018, India
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
                    <p className="text-gray-600 break-words mb-2">
                      Phone 1:{" "}
                      <a
                        href="tel:+918778265650"
                        className="text-blue-700 hover:text-indigo-500"
                      >
                        8778265650
                      </a>
                    </p>
                    <p className="text-gray-600 break-words">
                      Phone 2:{" "}
                      <a
                        href="tel:+919435360401"
                        className="text-blue-700 hover:text-indigo-500"
                      >
                        9435360401
                      </a>
                    </p>
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
                    <p className="text-gray-600 break-words mb-1">
                      <a
                        href="mailto:varshatravels06@gmail.com"
                        className="text-blue-700 hover:text-indigo-500"
                      >
                        varshatravels06@gmail.com
                      </a>
                    </p>
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
                    <p className="text-gray-600 mb-1">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-600 mb-1">
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-gray-600">Sunday: By Appointment</p>
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
                  { icon: "f", name: "Facebook" },
                  { icon: "📷", name: "Instagram" },
                  { icon: "𝕏", name: "Twitter" },
                  { icon: "💬", name: "WhatsApp" },
                ].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="w-12 h-12 rounded-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 font-bold flex items-center justify-center transition transform hover:scale-110"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
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
