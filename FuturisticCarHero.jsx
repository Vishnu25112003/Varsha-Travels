import React from "react";
import Spline from "@splinetool/react-spline";

export default function FuturisticCarHero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-green text-white">
      {/* Soft hero glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(255,255,255,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 items-center gap-10">
        <div className="max-w-xl">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            Automotive • Futuristic • Sleek
          </span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-black leading-tight">
            Futuristic Sports Car in Motion
          </h1>
          <p className="mt-4 text-white/90">
            A sleek, dark gray car with glowing red interior, cruising a dark
            road with subtle mist — rendered live in 3D.
          </p>
        </div>

        {/* 3D Spline canvas */}
        <div className="relative w-full">
          <div className="absolute -inset-6 rounded-3xl bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative rounded-3xl border border-white/20 bg-white/5 backdrop-blur p-2 shadow-2xl">
            <div className="h-[420px] w-full overflow-hidden rounded-2xl">
              <Spline
                scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
