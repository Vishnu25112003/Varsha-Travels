import React from "react";
import Spline from "@splinetool/react-spline";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 text-gray-900 pt-[120px]"
    >
      {/* Animated background gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(45,124,92,0.08),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(600px_300px_at_50%_100%,rgba(43,123,169,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 items-center gap-10 h-full">
        <div className="max-w-xl animate-slide-up">
          <div className="inline-block mb-4">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary border border-primary/30">
              🚗 Travel with Comfort
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black leading-tight bg-gradient-to-r from-primary via-gray-900 to-secondary bg-clip-text text-transparent">
            Explore Tamil Nadu Like Never Before
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Experience the beauty of Tamil Nadu with Varsha Travels. Premium
            vehicles, professional drivers, and unforgettable journeys across
            the cultural capital of South India.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary/50 transition transform hover:scale-105">
              Book a Trip
            </button>
            <button className="px-8 py-3 border-2 border-secondary text-secondary font-bold rounded-full hover:bg-secondary/10 transition">
              Learn More
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">25+</div>
              <p className="text-sm text-gray-600">Destinations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <p className="text-sm text-gray-600">Support</p>
            </div>
          </div>
        </div>

        {/* 3D Spline Car */}
        <div className="relative w-full h-[500px] animate-fade-in">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-primary/15 to-secondary/15 blur-3xl pointer-events-none" />
          <div className="relative rounded-3xl border border-primary/20 bg-white/50 backdrop-blur-xl p-2 shadow-2xl h-full">
            <div className="h-full w-full overflow-hidden rounded-2xl">
              <Spline
                scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
