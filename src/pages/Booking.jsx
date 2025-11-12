import React, { useState } from "react";
import { vehiclesData } from "../data/vehicles";
import { placesData } from "../data/places";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    alert(
      "Your booking request has been submitted! We will contact you shortly.",
    );
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
  };

  return (
    <div className="min-h-screen bg-white pt-20">
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
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 border border-primary/20 rounded-3xl p-6 sm:p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-primary/20">
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
                    className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
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
                    className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
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
                    className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Travel Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-primary/20">
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
                    className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
                    required
                  >
                    <option value="">Select a destination</option>
                    {placesData.map((place) => (
                      <option key={place.id} value={place.name}>
                        {place.name} - {place.state}
                      </option>
                    ))}
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
                    className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
                    required
                  >
                    <option value="">Select a vehicle</option>
                    {vehiclesData.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.name}>
                        {vehicle.name} - {vehicle.price}
                      </option>
                    ))}
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
                    className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
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
                    className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-primary/20">
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
                  className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition resize-none"
                  rows="5"
                  placeholder="Any special preferences, dietary requirements, or accessibility needs?"
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1" required />
                <span className="text-gray-700 text-sm">
                  I agree to the terms and conditions and privacy policy of
                  Varsha Travels
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-primary/50 transition transform hover:scale-105"
            >
              Complete Booking
            </button>

            <p className="text-gray-600 text-sm text-center">
              We will contact you within 2 hours to confirm your booking
            </p>
          </form>
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
                className="bg-gradient-to-br from-white to-gray-50 border border-primary/20 rounded-2xl p-6 hover:border-primary/50 transition"
              >
                <h3 className="text-lg font-bold text-primary mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
