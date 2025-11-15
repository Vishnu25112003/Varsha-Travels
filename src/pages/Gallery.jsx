import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import { vehiclesData } from "../data/vehicles";
import { vehicleImages } from "../data/images";
import { CategoryCard, FeatureCard } from "../components/Card";

export default function Gallery() {
  const carImages = [
    "https://lh4.googleusercontent.com/kMFOQyx8yv-AJUeQZnS30SsaSruZqEE2q_nr0hK_Wd-GCQTpusizZ6Fgrbu2zEfnqRLn2w3jrA-tBfwU0w8L3YYMjK1L5yvOKfmcbgZD7npetWOsFTm3dXgoAE3Yd8vUcJdS86kHune5WzIumHXmR-M",
    "https://parkers-images.bauersecure.com/wp-images/18309/930x620/052-most-economical-cars-2024-kia-niro.jpg",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
    "https://images.pexels.com/photos/7674/pexels-photo.jpg?cs=srgb&dl=pexels-life-of-pix-7674.jpg&fm=jpg",
  ];

  // Build plain image list for vehicles
  const vehicleGallery = vehiclesData
    .map((v) => ({ name: v.name, src: vehicleImages[v.name] }))
    .filter((v) => !!v.src);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [current, setCurrent] = useState(0);

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
            {vehicleGallery.map((item, idx) => (
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
                image:
                  "https://autoimage.capitalone.com/cms/Auto/assets/images/1814-hero-5-three-row-vehicles-with-the-best-fuel-economy-sorento-phev.jpg",
              },
              {
                title: "Premium SUVs",
                desc: "Ideal for adventure seekers and family trips",
                vehicles: ["Hyundai Creta", "Mahindra XUV 500"],
                image:
                  "https://cdn.luxe.digital/media/20230103134646/best-luxury-suvs-2023-cadillac-escalade-esv-luxe-digital-780x520.jpg",
              },
              {
                title: "Luxury & Group",
                desc: "For corporate travel and large group tours",
                vehicles: ["BMW 5 Series", "Tempo Traveller", "AC Bus"],
                image:
                  "https://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/rolls_royce_phantom_top_10.jpg?itok=XjL9f1tx",
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
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl"
          >
            ×
          </button>
          <button
            onClick={prev}
            className="absolute left-4 sm:left-10 text-white/80 hover:text-white bg-white/10 rounded-full p-3"
          >
            ◀
          </button>
          <img
            src={vehicleGallery[current].src}
            alt={vehicleGallery[current].name}
            className="max-h-[80vh] w-auto max-w-[95vw] object-contain rounded-xl shadow-2xl"
          />
          <button
            onClick={next}
            className="absolute right-4 sm:right-10 text-white/80 hover:text-white bg-white/10 rounded-full p-3"
          >
            ▶
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {vehicleGallery.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === current ? "w-10 bg-white" : "w-3 bg-white/50"}`}
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
                image:
                  "https://www.indusmotor.com/public/uploads/pages/179020210129170225.jpg",
              },
              {
                title: "Latest Technology",
                desc: "Equipped with modern safety and comfort features",
                image:
                  "https://superkilometerfilter.com/wp-content/uploads/2022/01/Digital-speedometer-for-car-All-you-need-to-know-about-the-part-1.jpg",
              },
              {
                title: "Clean & Hygienic",
                desc: "Thorough cleaning and sanitization after every trip",
                image:
                  "https://thegenuinetravels.com/wp-content/uploads/2024/07/12.webp",
              },
              {
                title: "Fuel Efficient",
                desc: "Modern vehicles with excellent fuel economy",
                image:
                  "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1474",
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
