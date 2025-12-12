import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import { CategoryCard, FeatureCard } from "../components/Card";

// Local gallery images
import galleryHero1 from "../data/gallery/gallery_carousel-1.jpg";
import galleryHero2 from "../data/gallery/gallery_carousel-2.jpg";
import galleryHero3 from "../data/gallery/gallery_carousel-3.jpg";
import galleryHero4 from "../data/gallery/gallery_carousel-4.jpg";
import galleryCategory1 from "../data/gallery/gallery_vehicle_categories-1.jpg";
import galleryCategory2 from "../data/gallery/gallery_vehicle_categories-2.jpg";
import galleryCategory3 from "../data/gallery/gallery_vehicle_categories-3.jpg";
import galleryFleet1 from "../data/gallery/gallery_why_our_fleet-1.jpg";
import galleryFleet2 from "../data/gallery/gallery_why_our_fleet-2.jpg";
import galleryFleet3 from "../data/gallery/gallery_why_our_fleet-3.webp";
import galleryFleet4 from "../data/gallery/gallery_why_our_fleet-4.jpg";

const API_BASE_URL = "https://varsha-travels.onrender.com"; // same backend as admin

export default function Gallery() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/vehicles`);
        if (!res.ok) throw new Error("Failed to load vehicle gallery");
        const data = await res.json();
        setVehicles(data || []);
      } catch (error) {
        console.error("Failed to fetch vehicles", error);
        setVehicles([]);
      }
    };

    fetchVehicles();
  }, []);
  const carImages = [galleryHero1, galleryHero2, galleryHero3, galleryHero4];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Build plain image list for vehicles from backend data
  const vehicleGallery = vehicles
    .map((v) => ({ name: v.name, src: v.imageUrl }))
    .filter((v) => !!v.src);

  // For the grid, initially show only 2 rows (responsive: 2 cols mobile, 3 cols tablet, 4 cols desktop)
  // Mobile: 2 cols × 2 rows = 4 images
  // Tablet: 3 cols × 2 rows = 6 images
  // Desktop: 4 cols × 2 rows = 8 images
  const INITIAL_VISIBLE_COUNT = 8;
  const visibleGallery = showAll
    ? vehicleGallery
    : vehicleGallery.slice(0, INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight")
        setCurrent((i) => (i + 1) % vehicleGallery.length);
      if (e.key === "ArrowLeft")
        setCurrent(
          (i) => (i - 1 + vehicleGallery.length) % vehicleGallery.length,
        );
    };
    window.addEventListener("keydown", onKey);
    const timer = setInterval(
      () => setCurrent((i) => (i + 1) % vehicleGallery.length),
      3500,
    );
    return () => {
      window.removeEventListener("keydown", onKey);
      clearInterval(timer);
    };
  }, [lightboxOpen, vehicleGallery.length]);

  const openAt = (idx) => {
    setCurrent(idx);
    setLightboxOpen(true);
  };
  const next = () => setCurrent((i) => (i + 1) % vehicleGallery.length);
  const prev = () =>
    setCurrent((i) => (i - 1 + vehicleGallery.length) % vehicleGallery.length);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Car Carousel */}
      {/* Mobile/tablet: slightly taller; desktop: full-screen under navbar */}
      <div className="w-full h-[300px] sm:h-[380px] md:h-[460px] lg:h-[calc(100vh-80px)]">
        <Carousel slides={carImages} autoPlay={true} interval={5000} />
      </div>

      {/* Vehicle Image Gallery (no details/prices) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            Vehicle Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {visibleGallery.map((item, idx) => (
              <button
                key={item.name + idx}
                onClick={() => openAt(idx)}
                className="group relative block w-full h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow hover:shadow-lg transition"
                aria-label={`Open ${item.name}`}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          {vehicleGallery.length > INITIAL_VISIBLE_COUNT && !showAll && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-blue-600/40 transition-transform hover:scale-105"
             >
                View all images
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Vehicle Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Economy Vehicles",
                desc: "Perfect for small groups and budget-conscious travelers",
                vehicles: ["Maruti Swift", "Tata Nexon"],
                image: galleryCategory1,
              },
              {
                title: "Premium SUVs",
                desc: "Ideal for adventure seekers and family trips",
                vehicles: ["Hyundai Creta", "Mahindra XUV 500"],
                image: galleryCategory2,
              },
              {
                title: "Luxury & Group",
                desc: "For corporate travel and large group tours",
                vehicles: ["BMW 5 Series", "Tempo Traveller", "AC Bus"],
                image: galleryCategory3,
              },
            ].map((category, idx) => (
              <CategoryCard
                key={idx}
                category={category}
                image={category.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white text-3xl sm:text-4xl transition-colors z-10"
            aria-label="Close lightbox"
          >
            ×
          </button>

          {/* Previous button with arrow icon */}
          <button
            onClick={prev}
            className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 text-white hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 md:p-4 transition-all hover:scale-110 z-10 group"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Image */}
          <img
            src={vehicleGallery[current].src}
            alt={vehicleGallery[current].name}
            className="max-h-[80vh] w-auto max-w-[95vw] object-contain rounded-xl shadow-2xl"
          />

          {/* Next button with arrow icon */}
          <button
            onClick={next}
            className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 text-white hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 md:p-4 transition-all hover:scale-110 z-10 group"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* Image counter and name */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs sm:text-sm">
            <p className="font-semibold">{vehicleGallery[current].name}</p>
            <p className="text-white/70">
              {current + 1} / {vehicleGallery.length}
            </p>
          </div>

          {/* Progress indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {vehicleGallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${i === current ? "w-10 bg-white" : "w-3 bg-white/50 hover:bg-white/70"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Why Our Fleet */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Our Fleet?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Regular Maintenance",
                desc: "All vehicles undergo strict maintenance schedules",
                image: galleryFleet1,
              },
              {
                title: "Latest Technology",
                desc: "Equipped with modern safety and comfort features",
                image: galleryFleet2,
              },
              {
                title: "Clean & Hygienic",
                desc: "Thorough cleaning and sanitization after every trip",
                image: galleryFleet3,
              },
              {
                title: "Fuel Efficient",
                desc: "Modern vehicles with excellent fuel economy",
                image: galleryFleet4,
              },
            ].map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} image={feature.image} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
