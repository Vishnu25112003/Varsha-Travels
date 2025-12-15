import React from "react";
import { ServiceCard, ValueCard, StatCard } from "../components/Card";

// Local about images
import aboutHero from "../data/about/about.jpg";
import aboutProvide1 from "../data/about/about_what_we_provide-1.jpg";
import aboutProvide2 from "../data/about/about_what_we_provide-2.jpg";
import aboutProvide3 from "../data/about/about_what_we_provide-3.jpg";
import aboutProvide4 from "../data/about/about_what_we_provide-4.jpg";
import aboutProvide5 from "../data/about/about_what_we_provide-5.jpg";
import aboutProvide6 from "../data/about/about_what_we_provide-6.jpg";

export default function About() {
  const serviceImages = [
    aboutProvide1,
    aboutProvide2,
    aboutProvide3,
    aboutProvide4,
    aboutProvide5,
    aboutProvide6,
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Image */}
      {/* Reduced height hero banner (a bit taller) */}
      <div className="relative w-full h-80 sm:h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden">
        <img
          src={aboutHero}
          alt="Varsha Travels"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

        {/* Tagline content on top of image */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center md:text-left md:ml-8 lg:ml-16 text-white drop-shadow-md">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-sky-200 mb-3">
              About <span className="varsha-travels-font">Varsha Travels</span>
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">
              Safe, Comfortable Journeys
              <span className="block text-sky-200">Across South India</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-100 max-w-xl mx-auto md:mx-0">
              From family holidays to corporate tours, we plan end-to-end travel with
              clean vehicles, professional drivers, and on-time serviceso you can
              simply relax and enjoy the trip.
            </p>
          </div>
        </div>
      </div>

      {/* Company History */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our History</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              <span className="varsha-travels-font">Varsha Travels</span> was founded in 2008 with a simple vision: to make
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
                image: serviceImages[0],
              },
              {
                title: "Professional Drivers",
                desc: "Experienced and courteous drivers with extensive route knowledge",
                image: serviceImages[1],
              },
              {
                title: "Customized Tours",
                desc: "Flexible itineraries tailored to your preferences and schedule",
                image: serviceImages[2],
              },
              {
                title: "Hotel Arrangements",
                desc: "Partnership with quality hotels and resorts across all destinations",
                image: serviceImages[3],
              },
              {
                title: "Expert Guides",
                desc: "Knowledgeable guides who share rich cultural and historical insights",
                image: serviceImages[4],
              },
              {
                title: "24/7 Support",
                desc: "Round-the-clock customer support for a worry-free travel experience",
                image: serviceImages[5],
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
