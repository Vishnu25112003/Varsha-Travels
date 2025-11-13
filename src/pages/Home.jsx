import React, { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import Spline from "@splinetool/react-spline";
import { placeImages } from "../data/images";
import { PlaceCard, FeatureCard } from "../components/Card";

export default function Home() {
  const heroSlides = [
    {
      src: "https://lp-cms-production.imgix.net/2019-06/GettyImages-149315250_full.jpg",
      title: "Discover Tamil Nadu with Comfort",
      subtitle: "Custom itineraries • Premium vehicles • Expert drivers",
    },
    {
      src: "https://wallpapercave.com/wp/wp14186973.jpg",
      title: "Seamless City To Hill Station Trips",
      subtitle: "Safe, on-time and flexible travel plans for your family",
    },
    {
      src: "https://assets.zeezest.com/blogs/PROD_Tamil%20Nadu%20Hill%20StationsTranquil%20Retreats%20You%20Must%20Visit%21%20%281%29_1716113421026.jpg",
      title: "Weekend Getaways, Made Easy",
      subtitle: "Door‑to‑door pickups and curated stopovers",
    },
    {
      src: "https://wallpapercave.com/wp/wp5148318.jpg",
      title: "Group Tours & Corporate Travel",
      subtitle: "Tempo Traveller, AC Bus and luxury options available",
    },
    {
      src: "https://www.justahotels.com/wp-content/uploads/2023/09/Tamil-Nadu-1-scaled.jpg",
      title: "Book Your Next Journey Today",
      subtitle: "Transparent pricing • 24/7 support",
    },
  ];

  const heroSlidesJSX = heroSlides.map((s, i) => (
    <div key={i} className="relative w-full h-full">
      <img src={s.src} alt={s.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
      <div className="absolute bottom-10 sm:bottom-14 left-4 sm:left-10 right-4 sm:right-auto max-w-xl">
        <span className="inline-block mb-3 rounded-full bg-white/10 border border-white/30 px-3 py-1 text-[10px] sm:text-xs text-white/90">
          Varsha Travels
        </span>
        <h2 className="text-white font-black text-2xl sm:text-4xl md:text-5xl leading-tight drop-shadow">
          {s.title}
        </h2>
        <p className="text-white/90 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">
          {s.subtitle}
        </p>
      </div>
    </div>
  ));

  const topPlaces = [
    {
      name: "Ooty",
      image: placeImages["Ooty"],
      description: "Queen of Nilgiris",
    },
    {
      name: "Madurai",
      image: placeImages["Madurai"],
      description: "Temple City",
    },
    {
      name: "Kanyakumari",
      image: placeImages["Kanyakumari"],
      description: "Three Seas Meet",
    },
    {
      name: "Kodaikanal",
      image: placeImages["Kodaikanal"],
      description: "Princess of Hills",
    },
    {
      name: "Rameshwaram",
      image: placeImages["Rameshwaram"],
      description: "Sacred Pilgrimage",
    },
    {
      name: "RamakkalMedu",
      image: placeImages["RamakkalMedu"],
      description: "Heritage Mansions",
    },
    {
      name: "Munnar",
      image: placeImages["Munnar"],
      description: "Tea Gardens",
    },
    {
      name: "Coorg",
      image: placeImages["Coorg"],
      description: "Coffee Country",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Featured Carousel Section */}
      <section className="p-0 m-0">
        <div className="w-full">
          <div className="h-[60vh] sm:h-[72vh] md:h-[85vh] lg:h-[calc(100vh+120px)] pt-[120px] lg:pt-0 lg:-mt-[120px]">
            <Carousel slides={heroSlidesJSX} autoPlay={true} interval={4500} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="h-80 rounded-2xl overflow-hidden border border-primary/20 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"
                alt="Varsha Travels"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Varsha Travels
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                With over 15 years of experience in the travel industry, Varsha
                Travels has been committed to providing exceptional travel
                experiences across South India. We specialize in curated tours
                of Tamil Nadu, Kerala, and Karnataka with professional drivers
                and premium vehicles.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our mission is to make travel accessible, comfortable, and
                memorable for every customer. From budget-friendly options to
                luxury experiences, we cater to all travel needs with utmost
                professionalism.
              </p>
              <Link
                to="/about"
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary/50 transition transform hover:scale-105 inline-block"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Packages Carousel */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Popular Destinations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topPlaces.map((place, idx) => (
              <Link key={idx} to="/destination">
                <PlaceCard place={place} image={place.image} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👥",
                title: "500+ Happy Customers",
                desc: "Trusted by thousands for quality service",
                image:
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
              },
              {
                icon: "🚗",
                title: "Premium Fleet",
                desc: "Well-maintained vehicles for comfort",
                image:
                  "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop",
              },
              {
                icon: "🌟",
                title: "Expert Guides",
                desc: "Knowledgeable and friendly professionals",
                image:
                  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
              },
            ].map((item, idx) => (
              <FeatureCard key={idx} feature={item} image={item.image} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready for Your Journey?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Get in touch with our travel experts to plan your perfect trip
          </p>
          <Link
            to="/contact"
            className="px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary/50 transition transform hover:scale-105 inline-block text-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
