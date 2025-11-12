import React, { useState } from 'react'

export default function Fleet() {
  const [activeVehicle, setActiveVehicle] = useState(0)

  const vehicles = [
    {
      name: 'Economy Sedan',
      capacity: '4-5 Passengers',
      features: ['Comfortable Seating', 'Air Conditioning', 'Music System', 'Clean Interior'],
      emoji: '🚗',
      color: 'from-blue-500 to-blue-600',
      price: '₹1,500/day',
      ideal: 'Small group or family trips'
    },
    {
      name: 'SUV Adventure',
      capacity: '6-7 Passengers',
      features: ['Spacious Interior', 'All-Terrain', 'Advanced Safety', 'Panoramic Windows'],
      emoji: '🚙',
      color: 'from-primary to-emerald-500',
      price: '₹2,500/day',
      ideal: 'Mountain and off-road adventures'
    },
    {
      name: 'Luxury Premium',
      capacity: '5-6 Passengers',
      features: ['Leather Seats', 'Climate Control', 'Premium Sound', 'WiFi Internet'],
      emoji: '🚗',
      color: 'from-secondary to-blue-300',
      price: '₹3,500/day',
      ideal: 'Business and luxury travel'
    },
    {
      name: 'Tempo Traveller',
      capacity: '12-13 Passengers',
      features: ['Group Comfort', 'Reclining Seats', 'Entertainment', 'Luggage Space'],
      emoji: '🚌',
      color: 'from-purple-500 to-pink-500',
      price: '₹4,500/day',
      ideal: 'Large group tours and events'
    },
    {
      name: 'Bus Service',
      capacity: '30-40 Passengers',
      features: ['Full AC', 'Comfortable Seating', 'Entertainment System', 'Experienced Drivers'],
      emoji: '🚌',
      color: 'from-orange-500 to-red-500',
      price: '₹8,000/day',
      ideal: 'School and corporate trips'
    }
  ]

  return (
    <section id="fleet" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-gray-900 to-secondary bg-clip-text text-transparent">
              Our Fleet
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Premium vehicles for every travel need</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Vehicle Display */}
        <div className="relative h-96 rounded-3xl overflow-hidden border-2 border-primary/30 animate-fade-in">
        <div className={`absolute inset-0 bg-gradient-to-br ${vehicles[activeVehicle].color} opacity-10`} />
        <div className="relative h-full flex items-center justify-center">
        <div className="text-center">
        <div className="text-9xl mb-6 animate-bounce">{vehicles[activeVehicle].emoji}</div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">{vehicles[activeVehicle].name}</h3>
        <p className="text-secondary font-semibold text-lg">{vehicles[activeVehicle].price}</p>
        </div>
        </div>
        </div>

        {/* Vehicle Details */}
        <div className="animate-slide-up">
        <div className="bg-gradient-to-br from-white to-gray-50 border border-primary/20 rounded-2xl p-8">
        <div className="mb-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">{vehicles[activeVehicle].name}</h3>
        <p className="text-primary font-semibold">{vehicles[activeVehicle].capacity}</p>
        <p className="text-gray-600 mt-2">{vehicles[activeVehicle].ideal}</p>
        </div>

        <div className="mb-8">
        <h4 className="text-primary font-bold mb-4">Features & Amenities:</h4>
        <div className="grid grid-cols-2 gap-4">
        {vehicles[activeVehicle].features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-gray-700">{feature}</span>
        </div>
        ))}
        </div>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition transform hover:scale-105">
        Book This Vehicle
        </button>
        </div>
        </div>
        </div>

        {/* Vehicle Selection */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-in">
        {vehicles.map((vehicle, idx) => (
        <button
        key={idx}
        onClick={() => setActiveVehicle(idx)}
        className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
        activeVehicle === idx
        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/30'
        : 'border-gray-300 bg-white hover:border-primary/50'
        }`}
        >
        <div className="text-4xl mb-2">{vehicle.emoji}</div>
        <p className="text-sm font-semibold text-gray-900">{vehicle.name}</p>
        <p className="text-xs text-gray-600 mt-1">{vehicle.capacity}</p>
        </button>
        ))}
        </div>
      </div>
    </section>
  )
}
