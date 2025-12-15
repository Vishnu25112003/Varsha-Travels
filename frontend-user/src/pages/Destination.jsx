import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { placeImages } from "../data/images";
import { PlaceCard } from "../components/Card";

// Local destination hero images
import destHero1 from "../data/destination/destination_carousel-1.jpg";
import destHero2 from "../data/destination/destination_carousel-2.jpg";
import destHero3 from "../data/destination/destination_carousel-3.jpg";

const API_BASE_URL = "https://varsha-travels.onrender.com"; // same backend as admin

export default function Destination() {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("all");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [destinations, setDestinations] = useState([]);

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

    fetchDestinations();
  }, []);

  const carouselImages = [destHero1, destHero2, destHero3];

  // Define the preferred order of states
  const stateOrder = [
    "Tamil Nadu",
    "Kerala", 
    "Puducherry",
    "Karnataka",
    "Andhra Pradesh"
  ];

  // Get unique states from destinations
  const availableStates = Array.from(new Set(destinations.map((d) => d.state))).filter(Boolean);
  
  // Function to get the priority index for a state
  const getStatePriority = (stateName) => {
    const state = stateName.toLowerCase().trim();
    
    // Check for Tamil Nadu variations
    if (state.includes('tamil') || state === 'tn' || state === 'tamilnadu') {
      return 0;
    }
    // Check for Kerala variations
    if (state.includes('kerala') || state === 'kl') {
      return 1;
    }
    // Check for Puducherry variations
    if (state.includes('puducherry') || state.includes('pondicherry') || state === 'py') {
      return 2;
    }
    // Check for Karnataka variations
    if (state.includes('karnataka') || state === 'ka') {
      return 3;
    }
    // Check for Andhra Pradesh variations
    if (state.includes('andhra') || state === 'ap') {
      return 4;
    }
    
    // If no match found, return high number to put at end
    return 999;
  };

  // Sort states according to preferred order
  const sortedStates = availableStates.sort((a, b) => {
    const priorityA = getStatePriority(a);
    const priorityB = getStatePriority(b);
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // If same priority, sort alphabetically
    return a.localeCompare(b);
  });

  const states = ["all", ...sortedStates];

  // Sort destinations by state order when showing all
  const sortDestinationsByState = (destinations) => {
    return destinations.sort((a, b) => {
      const priorityA = getStatePriority(a.state);
      const priorityB = getStatePriority(b.state);
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // If same priority, sort by state name alphabetically
      return a.state.localeCompare(b.state);
    });
  };

  const places =
    selectedState === "all"
      ? sortDestinationsByState([...destinations])
      : destinations.filter((d) => d.state === selectedState);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Carousel */}
      {/* Mobile/tablet: slightly taller; desktop: full-screen under navbar */}
      <div className="w-full h-[300px] sm:h-[380px] md:h-[460px] lg:h-[calc(100vh-80px)]">
        <Carousel slides={carouselImages} autoPlay={true} interval={5000} />
      </div>

      {/* Filter Section (sticky toolbar) */}
      <section className="sticky top-20 sm:top-24 md:top-28 dest-filter-sticky z-40 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/50 border-b border-blue-600/10">
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
                      ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white border-transparent"
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
                key={place._id || place.id}
                place={place}
                image={place.imageUrl || placeImages[place.name]}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Place Detail Modal */}
      {selectedPlace && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="bg-gradient-to-br from-white to-gray-50 border border-blue-600/30 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl animate-scale-in relative no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-white hover:text-gray-200 transition text-2xl sm:text-3xl bg-black/30 hover:bg-black/50 backdrop-blur-sm w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full shadow-lg"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Place Image */}
            <div className="h-48 sm:h-64 md:h-80 w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl relative">
              <img
                src={selectedPlace.imageUrl || placeImages[selectedPlace.name]}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {selectedPlace.name}
              </h2>
              <p className="text-blue-700 font-semibold text-base sm:text-lg mb-4 sm:mb-6">
                📍 {selectedPlace.state}
              </p>

              {selectedPlace.details && (
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  {selectedPlace.details}
                </p>
              )}

              {selectedPlace.highlights && selectedPlace.highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-3 sm:mb-4">
                    ✨ Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {selectedPlace.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-600/10 border border-blue-600/50 rounded-lg p-2.5 sm:p-3 text-gray-900 text-sm sm:text-base break-anywhere"
                      >
                        ✓ {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm sm:text-base font-bold rounded-lg hover:shadow-lg hover:shadow-blue-600/50 transition transform hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => {
                  navigate("/booking");
                }}
              >
                Book This Destination →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
