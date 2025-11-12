import React, { useState } from "react";
import Carousel from "../components/Carousel";
import { getPlacesByState, getUniqueStates } from "../data/places";
import { placeImages } from "../data/images";
import { PlaceCard } from "../components/Card";

export default function Destination() {
  const [selectedState, setSelectedState] = useState("all");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const carouselImages = [
    "https://images.unsplash.com/photo-1527705381526-469031509a9d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FueWFrdW1hcml8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000",
    "https://images.unsplash.com/photo-1596295357308-b9ff1d2fe788?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1760",
    "https://upload.wikimedia.org/wikipedia/commons/d/d4/Pamban_Bridge_Train_Passing.jpg",
  ];

  const places = getPlacesByState(selectedState);
  const states = getUniqueStates();

  return (
    <div className="min-h-screen bg-white pt-[120px]">
      {/* Hero Carousel */}
      <div className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[calc(100vh-120px)]">
        <Carousel slides={carouselImages} autoPlay={true} interval={5000} />
      </div>

      {/* Filter Section (sticky toolbar) */}
      <section className="sticky top-[120px] dest-filter-sticky z-40 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/50 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Filter by State
            </h2>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:m-0 whitespace-nowrap">
              {states.map((state) => (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition shadow-sm border ${
                    selectedState === state
                      ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent"
                      : "bg-white/80 text-gray-800 hover:bg-gray-100 border-gray-200"
                  }`}
                >
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                image={placeImages[place.name]}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Place Detail Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white to-gray-50 border border-primary/30 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-6 right-6 text-gray-900 hover:text-primary transition text-2xl bg-white/50 w-10 h-10 flex items-center justify-center rounded-full"
            >
              ✕
            </button>

            {/* Place Image */}
            <div className="h-80 w-full overflow-hidden rounded-t-3xl">
              <img
                src={placeImages[selectedPlace.name]}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {selectedPlace.name}
              </h2>
              <p className="text-primary font-semibold text-lg mb-6">
                {selectedPlace.state}
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">
                {selectedPlace.details}
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Highlights
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedPlace.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="bg-primary/10 border border-primary/50 rounded-lg p-3 text-gray-900"
                    >
                      ✓ {highlight}
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition">
                Book This Destination
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
