import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import { placeImages } from "../data/images";
import { PlaceCard, FeatureCard } from "../components/Card";
import { useReviews } from "../hooks/useReviews";

// Local images
import homeHero1 from "../data/home/home_carousel-1.jpg";
import homeHero2 from "../data/home/home_carousel-2.jpg";
import homeHero3 from "../data/home/home_carosuel-3.jpg"; // note: file name is 'carosuel' in data folder
import homeHero4 from "../data/home/home_carousel-4.jpg";
import homeHero5 from "../data/home/home_carousel-5.jpg";
import homeAboutImg from "../data/home/home_about.jpg";
import homeWhy1 from "../data/home/home_why_choose_us-1.jpg";
import homeWhy2 from "../data/home/home_why_choose_us-2.jpg";
import homeWhy3 from "../data/home/home_why_choose_us-3.jpg";

const API_BASE_URL = "https://varsha-travels.onrender.com"; // same backend as admin/destination page

export default function Home() {
  const { reviews } = useReviews();
  const [destinations, setDestinations] = useState([]);
  const [contactSettings, setContactSettings] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/destinations`);
        if (!res.ok) {
          throw new Error("Failed to load destinations");
        }
        const data = await res.json();
        setDestinations(data || []);
      } catch (error) {
        console.error("Failed to fetch destinations", error);
        setDestinations([]);
      }
    };

    const fetchContactSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/contact-settings`);
        if (!res.ok) throw new Error("Failed to load contact settings");
        const data = await res.json();
        setContactSettings(data);
      } catch (error) {
        console.error("Failed to fetch contact settings", error);
        setContactSettings(null);
      }
    };

    fetchDestinations();
    fetchContactSettings();
  }, []);
  const heroSlides = [
    {
      src: homeHero1,
      title: "Discover Tamil Nadu with Comfort",
      subtitle: "Custom itineraries • Premium vehicles • Expert drivers",
    },
    {
      src: homeHero2,
      title: "Seamless City To Hill Station Trips",
      subtitle: "Safe, on-time and flexible travel plans for your family",
    },
    {
      src: homeHero3,
      title: "Weekend Getaways, Made Easy",
      subtitle: "Door‑to‑door pickups and curated stopovers",
    },
    {
      src: homeHero4,
      title: "Group Tours & Corporate Travel",
      subtitle: "Tempo Traveller, AC Bus and luxury options available",
    },
    {
      src: homeHero5,
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

  // Use the same destination data as Destination page (from backend)
  // Only show up to 8 destinations that have an image available
  const topPlaces = (destinations || [])
    .filter((d) => d.imageUrl || placeImages[d.name])
    .slice(0, 8);

  // Get primary phone number for call/WhatsApp
  const primaryPhone = contactSettings?.phones?.[0] || "+918778265650";
  const whatsappNumber = primaryPhone.replace(/[^0-9+]/g, "");
  const whatsappMessage = encodeURIComponent(
    "Hi Varsha Travels! I would like to enquire about your travel services."
  );

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-28">
      {/* Featured Carousel Section */}
      <section className="p-0 m-0">
        <div className="w-full">
          {/* On mobile/tablet: tall banner; on desktop: full screen under navbar */}
          <div className="h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[calc(100vh-7rem)]">
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
                src={homeAboutImg}
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
            {topPlaces.map((place) => (
              <Link
                key={place._id || place.id || place.name}
                to="/destination"
              >
                <PlaceCard
                  place={place}
                  image={place.imageUrl || placeImages[place.name]}
                />
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
                image: homeWhy1,
              },
              {
                icon: "🚗",
                title: "Premium Fleet",
                desc: "Well-maintained vehicles for comfort",
                image: homeWhy2,
              },
              {
                icon: "🌟",
                title: "Expert Guides",
                desc: "Knowledgeable and friendly professionals",
                image: homeWhy3,
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

      {/* Floating Call and WhatsApp Buttons */}
      {/* Call Button - Bottom Left Corner */}
      <a
        href={`tel:${primaryPhone}`}
        className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 group"
        aria-label="Call us"
      >
        <div className="relative">
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
          {/* Main button */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 sm:w-8 sm:h-8 text-white"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {/* Tooltip on hover */}
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Call Now
        </div>
      </a>

      {/* WhatsApp Button - Bottom Right Corner */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
          {/* Main button */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-lg hover:shadow-2xl hover:shadow-green-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 sm:w-8 sm:h-8 text-white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
        </div>
        {/* Tooltip on hover */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          WhatsApp Us
        </div>
      </a>
    </div>
  );
}
