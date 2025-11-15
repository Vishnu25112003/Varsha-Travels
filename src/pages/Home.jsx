import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import { placeImages } from "../data/images";
import { PlaceCard, FeatureCard } from "../components/Card";
import { useReviews } from "../hooks/useReviews";

export default function Home() {
  const { reviews } = useReviews();
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
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
    <div className="min-h-screen bg-white pt-20">
      {/* Featured Carousel Section */}
      <section className="p-0 m-0">
        <div className="w-full">
          {/* On mobile/tablet: tall banner; on desktop: full screen under navbar */}
          <div className="h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[calc(100vh-80px)]">
            <Carousel slides={heroSlidesJSX} autoPlay={true} interval={4500} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="h-80 rounded-2xl overflow-hidden border border-blue-600/20 shadow-lg">
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
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-600/50 transition transform hover:scale-105 inline-block"
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
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-600/50 transition transform hover:scale-105 inline-block text-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Reviews Section (between contact and footer) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                What Our Travellers Say
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Real feedback from guests who explored South India with Varsha Travels.
              </p>
            </div>
            <Link
              to="/reviews"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm sm:text-base font-semibold shadow hover:shadow-lg hover:shadow-blue-600/40 transition-transform hover:scale-105"
            >
              + Add Review
            </Link>
          </div>

          {reviews && reviews.length > 0 ? (
            <div className="w-full h-[260px] sm:h-[240px] md:h-[220px] lg:h-[260px]">
              <Carousel
                autoPlay
                interval={6000}
                slides={reviews.map((review) => (
                  <div
                    key={review.id}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <div className="max-w-3xl w-full mx-auto bg-gradient-to-br from-white to-slate-50 border border-blue-600/15 rounded-3xl shadow-sm px-5 sm:px-8 py-6 sm:py-8 flex flex-col md:flex-row gap-4 md:gap-6">
                      {review.mediaUrl && (
                        <div className="hidden sm:block w-40 h-32 rounded-2xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                          {review.mediaType === "video" ? (
                            <video
                              src={review.mediaUrl}
                              className="w-full h-full object-cover"
                              controls
                              playsInline
                            />
                          ) : (
                            <img
                              src={review.mediaUrl}
                              alt={review.trip || review.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <p className="font-semibold text-gray-900 text-sm sm:text-base truncate max-w-[65%]">
                            {review.name}
                          </p>
                          {review.date && (
                            <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                              {review.date}
                            </span>
                          )}
                        </div>
                        {review.trip && (
                          <p className="text-[11px] sm:text-xs text-blue-700 mb-1">
                            {review.trip}
                          </p>
                        )}
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span
                              key={index}
                              className={
                                index < (review.rating || 0)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-4">
                          {review.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              />
            </div>
          ) : (
            <div className="border border-dashed border-blue-500/40 rounded-2xl p-6 text-center bg-blue-50/40 text-sm text-gray-600">
              No reviews yet. Be the first to share your experience.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
