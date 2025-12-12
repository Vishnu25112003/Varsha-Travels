import React, { useEffect, useState } from "react";
import { vehiclesData } from "../data/vehicles";
import { placesData } from "../data/places";
import Notification from "../components/Notification";

const API_BASE_URL = "http://localhost:5000"; // same backend as contact form

export default function Booking() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    vehicle: "",
    pickupDate: "",
    dropoffDate: "",
    passengers: "1",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, vehRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/destinations`),
          fetch(`${API_BASE_URL}/api/vehicles`),
        ]);

        if (destRes.ok) {
          const destData = await destRes.json();
          setDestinations(Array.isArray(destData) ? destData : []);
        } else {
          setDestinations([]);
        }

        if (vehRes.ok) {
          const vehData = await vehRes.json();
          setVehicles(Array.isArray(vehData) ? vehData : []);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.error("Failed to load booking dropdown data", error);
        setDestinations([]);
        setVehicles([]);
      }
    };

    fetchData();
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

      // Save booking to backend database
      const bookingRes = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let bookingBody = {};
      try {
        bookingBody = await bookingRes.json();
      } catch (err) {
        bookingBody = {};
      }

      if (!bookingRes.ok) {
        throw new Error(bookingBody.message || "Failed to create booking");
      }

      // Send notification email via contact form endpoint
      const subject = `New booking request - ${formData.destination || "Destination not specified"}`;

      const messageLines = [
        `New booking request from Varsha Travels website.`,
        "",
        `Name: ${formData.fullName}`,
        `Email: ${formData.email}`,
        `Phone: ${formData.phone}`,
        `Destination: ${formData.destination}`,
        `Vehicle: ${formData.vehicle}`,
        `Pickup Date: ${formData.pickupDate}`,
        `Dropoff Date: ${formData.dropoffDate}`,
        `Passengers: ${formData.passengers}`,
        "",
        "Special requests:",
        formData.specialRequests || "(none)",
      ];

      // Send email notification (don't fail if this fails)
      try {
        await fetch(`${API_BASE_URL}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            subject,
            message: messageLines.join("\n"),
          }),
        });
      } catch (emailError) {
        console.error("Failed to send booking email notification", emailError);
        // Don't throw - booking is already saved
      }

      console.log("Booking submitted:", bookingBody);
      
      // Show success notification
      setNotification({
        type: "success",
        message: "Your booking request has been submitted! We will contact you shortly.",
      });

      // Clear form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        destination: "",
        vehicle: "",
        pickupDate: "",
        dropoffDate: "",
        passengers: "1",
        specialRequests: "",
      });
    } catch (error) {
      console.error("Failed to submit booking", error);
      
      // Show error notification
      setNotification({
        type: "error",
        message: error.message || "Failed to send your booking details. Please try again later.",
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Book Your Journey
          </h1>
          <p className="text-gray-600 text-lg">
            Fill out the form below to reserve your travel experience
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 border border-blue-600/20 rounded-3xl p-6 sm:p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-blue-600/20">
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-blue-600/30 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 transition"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Email Address *
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

                <div className="md:col-span-2">
                  <label className="block text-gray-900 font-semibold mb-2">
                    Phone Number *
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
            </div>

            {/* Travel Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-blue-600/20">
                Travel Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Destination *
                  </label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-blue-600/30 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 transition"
                    required
                  >
                    <option value="">Select a destination</option>
                    {(destinations.length ? destinations : placesData).map(
                      (place) => (
                        <option
                          key={place._id || place.id}
                          value={place.name}
                        >
                          {place.name} - {place.state}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Vehicle Type *
                  </label>
                  <select
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-blue-600/30 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 transition"
                    required
                  >
                    <option value="">Select a vehicle</option>
                    {(vehicles.length ? vehicles : vehiclesData).map(
                      (vehicle) => {
                        const name = vehicle.name;
                        const key = vehicle._id || vehicle.id || name;
                        const meta = vehiclesData.find(
                          (v) => v.name === name,
                        );
                        const label = meta?.price
                          ? `${name} - ${meta.price}`
                          : vehicle.price
                          ? `${name} - ${vehicle.price}`
                          : name;
                        return (
                          <option key={key} value={name}>
                            {label}
                          </option>
                        );
                      },
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-blue-600/30 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Dropoff Date *
                  </label>
                  <input
                    type="date"
                    name="dropoffDate"
                    value={formData.dropoffDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-blue-600/30 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Number of Passengers *
                  </label>
                  <input
                    type="number"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
                    min="1"
                    max="50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-blue-600/20">
                Additional Information
              </h2>
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Special Requests / Preferences
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-blue-600/30 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600 transition resize-none"
                  rows="5"
                  placeholder="Any special preferences, dietary requirements, or accessibility needs?"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-blue-600/50 transition transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Complete Booking"}
            </button>

            <p className="text-gray-600 text-sm text-center">
              We will contact you within 2 hours to confirm your booking
            </p>
          </form>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {/* Text block */}
            <div className="md:col-span-1 bg-white border border-blue-100 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase mb-1">
                Need quick help?
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Talk to our travel team
              </h2>
              <p className="text-gray-600 text-sm">
                Prefer WhatsApp or a direct call? Reach us instantly using the options on the right.
              </p>
            </div>

            {/* Call card */}
            <div className="bg-white border border-blue-100 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Call us</p>
                  <p className="text-base font-semibold text-gray-900">+91 8778265650</p>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mb-3">
                For urgent pickups, last‑minute changes, or same‑day bookings.
              </p>
              <a
                href="tel:+918778265650"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
              >
                Call Now
              </a>
            </div>

            {/* Email card */}
            <div className="bg-white border border-blue-100 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Email us</p>
                  <p className="text-base font-semibold text-gray-900">varshatravels06@gmail.com</p>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mb-3">
                Share your full trip details and we&apos;ll respond with a customized quote.
              </p>
              <a
                href="mailto:varshatravels06@gmail.com?subject=Travel%20Enquiry%20-%20Varsha%20Travels&body=Hi%20Varsha%20Travels,%0D%0A%0D%0AI%20would%20like%20to%20enquire%20about%20your%20travel%20services.%0D%0A%0D%0AName:%0D%0APhone:%0D%0ATravel%20dates:%0D%0ADestination:%0D%0A%0D%0AThank%20you!"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-indigo-500 text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition"
              >
                Email Template
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is included in the booking?",
                a: "Your booking includes vehicle rental, professional driver, fuel, and basic insurance coverage.",
              },
              {
                q: "Can I modify my booking after submission?",
                a: "Yes, you can modify your booking up to 24 hours before the scheduled date.",
              },
              {
                q: "What is your cancellation policy?",
                a: "Free cancellation up to 3 days before the journey. 50% refund for 1-3 days cancellation.",
              },
              {
                q: "Do you provide guide services?",
                a: "Yes, we can arrange professional guides for additional cost depending on the destination.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-gray-50 border border-blue-600/20 rounded-2xl p-6 hover:border-blue-600/50 transition"
              >
                <h3 className="text-lg font-bold text-blue-700 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
