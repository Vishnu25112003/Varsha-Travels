import React from "react";
import { ServiceCard, ValueCard, StatCard } from "../components/Card";

export default function About() {

  const serviceImages = [
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1493195671595-30a332807d65?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Image */}
      {/* Reduced height hero banner (a bit taller) */}
      <div className="relative w-full h-80 sm:h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop"
          alt="Varsha Travels"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
      </div>

      {/* Company History */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our History</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Varsha Travels was founded in 2008 with a simple vision: to make
              travel across South India accessible, comfortable, and
              unforgettable for everyone. What started as a small operation with
              just 5 vehicles has grown into a trusted brand serving thousands
              of customers annually.
            </p>
            <p>
              Over the past 15+ years, we've established ourselves as a leader
              in the travel industry by maintaining the highest standards of
              service, vehicle maintenance, and customer care. Our team has
              grown to include experienced drivers, knowledgeable guides, and
              dedicated customer service professionals.
            </p>
            <p>
              We've successfully completed over 1,200 trips, earning a 4.9/5
              rating from our customers. Our commitment to excellence has made
              us the go-to choice for families, corporate groups, and adventure
              seekers exploring Tamil Nadu, Kerala, and Karnataka.
            </p>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            What We Provide
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Vehicles",
                desc: "Fleet of well-maintained cars, SUVs, and buses with modern amenities",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwULbHTXxCHx5AF9EaKOnr9xN-CEr0a3SDPg&s",
              },
              {
                title: "Professional Drivers",
                desc: "Experienced and courteous drivers with extensive route knowledge",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxKz0HDqJ2SD8S8NbEzre1iZx0sHGr3kLGg&s",
              },
              {
                title: "Customized Tours",
                desc: "Flexible itineraries tailored to your preferences and schedule",
                image: serviceImages[2],
              },
              {
                title: "Hotel Arrangements",
                desc: "Partnership with quality hotels and resorts across all destinations",
                image:
                  "https://designsbysundown.com/wp-content/uploads/2025/02/03AmericanaEstate.jpg",
              },
              {
                title: "Expert Guides",
                desc: "Knowledgeable guides who share rich cultural and historical insights",
                image: serviceImages[4],
              },
              {
                title: "24/7 Support",
                desc: "Round-the-clock customer support for a worry-free travel experience",
                image:
                  "https://img.freepik.com/free-photo/man-try-fix-car-engine-problem-local-road_1150-10662.jpg?semt=ais_hybrid&w=740&q=80",
              },
            ].map((service, idx) => (
              <ServiceCard key={idx} service={service} image={service.image} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Safety First",
                desc: "Your safety is our top priority. All vehicles undergo regular maintenance and our drivers follow strict safety protocols.",
              },
              {
                title: "Customer Satisfaction",
                desc: "We go above and beyond to ensure every customer has a memorable and pleasant travel experience.",
              },
              {
                title: "Transparency",
                desc: "Clear pricing, no hidden charges, and honest communication about what to expect on your journey.",
              },
              {
                title: "Environmental Responsibility",
                desc: "We're committed to sustainable travel practices and minimizing our environmental footprint.",
              },
            ].map((value, idx) => (
              <ValueCard key={idx} value={value} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "15+", label: "Years in Business" },
              { number: "1200+", label: "Trips Completed" },
              { number: "500+", label: "Happy Customers" },
              { number: "4.9/5", label: "Average Rating" },
            ].map((stat, idx) => (
              <StatCard key={idx} stat={stat} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
