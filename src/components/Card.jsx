import React from 'react'
import { Link } from 'react-router-dom'

export function PlaceCard({ place, image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={image}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-semibold border border-white/30">
          {place.state || place.description}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500">
          <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
            {place.name}
          </h3>
          <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            Click to explore →
          </p>
        </div>
      </div>
      
      <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-blue-600/50 rounded-3xl transition-all duration-300" />
    </div>
  )
}

export function VehicleCard({ vehicle, image }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-600/30">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        <img
          src={image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {vehicle.price && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg">
            {vehicle.price}
          </div>
        )}
      </div>

      <div className="p-6 relative">
        <div className="absolute top-0 left-6 transform -translate-y-1/2">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 p-3 rounded-2xl shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
            {vehicle.name}
          </h3>
          <p className="text-primary text-sm font-semibold mb-3">{vehicle.type}</p>
          
          {vehicle.capacity && (
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{vehicle.capacity}</span>
            </div>
          )}

          {vehicle.features && (
            <div className="space-y-2 mb-6">
              {vehicle.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>{feature}</span>
                </div>
              ))}
              {vehicle.features.length > 3 && (
                <p className="text-xs text-blue-700 font-semibold mt-2">
                  +{vehicle.features.length - 3} more features
                </p>
              )}
            </div>
          )}

          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 transform hover:scale-[1.02] group-hover:translate-y-0">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export function ServiceCard({ service, image }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 hover:border-blue-600/30">
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 relative">
        <div className="absolute top-0 left-6 transform -translate-y-1/2">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-500 p-3 rounded-xl shadow-lg">
            <span className="text-2xl">{service.icon || '✓'}</span>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {service.desc || service.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FeatureCard({ feature, image }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-600/30">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={feature.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-500/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
            {feature.icon || feature.emoji || '✓'}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
              {feature.title}
            </h3>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">
          {feature.desc || feature.description}
        </p>
      </div>
    </div>
  )
}

export function CategoryCard({ category, image }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-300">
            {category.title}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-gray-600 text-sm leading-relaxed">
          {category.desc || category.description}
        </p>
      </div>
    </div>
  )
}

export function StatCard({ stat }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-600/30">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-indigo-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative text-center">
        <div className="text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
          {stat.number}
        </div>
        <p className="text-gray-600 font-semibold">{stat.label}</p>
      </div>
    </div>
  )
}

export function ValueCard({ value }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border-l-4 border-blue-600 hover:border-indigo-500">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-600/5 to-indigo-500/5 rounded-full blur-2xl" />
      
      <div className="relative">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
            ✓
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
              {value.title}
            </h3>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed pl-[72px]">
          {value.desc || value.description}
        </p>
      </div>
    </div>
  )
}

export function PackageCard({ pkg }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${
        pkg.popular ? 'ring-2 ring-blue-600 scale-105' : 'border border-gray-100'
      }`}
    >
      {pkg.popular && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 text-xs font-bold rounded-bl-3xl rounded-tr-3xl shadow-lg">
            ⭐ MOST POPULAR
          </div>
        </div>
      )}

      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-600/10 to-indigo-500/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20" />
      
      <div className="relative p-8 flex flex-col h-full min-h-[600px]">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
              {pkg.name}
            </h3>
            <p className="text-indigo-500 font-semibold mb-2">{pkg.duration}</p>
            <p className="text-gray-600 text-sm">{pkg.description}</p>
          </div>
          <div className="text-5xl ml-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
            {pkg.icon}
          </div>
        </div>

        <div className="mb-8 p-6 bg-gradient-to-br from-blue-600/5 to-indigo-500/5 rounded-2xl border border-blue-600/20">
          <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-1">
            {pkg.price}
          </div>
          <p className="text-gray-600 text-sm font-semibold">Per person</p>
        </div>

        <div className="flex-grow mb-8">
          <h4 className="text-blue-700 font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
            </svg>
            Package Includes:
          </h4>
          <ul className="space-y-3">
            {pkg.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-3 group/item">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="text-gray-700 text-sm group-hover/item:text-gray-900 transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className={`w-full py-4 font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${
          pkg.popular
            ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:shadow-xl hover:shadow-blue-600/30'
            : 'border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white'
        }`}>
          Book Now →
        </button>
      </div>
    </div>
  )
}

export function DestinationCard({ destination }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100 hover:border-blue-600/30">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-96 p-8 flex flex-col justify-between">
        <div className="absolute top-8 right-8 text-7xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 opacity-20 group-hover:opacity-100">
          {destination.image}
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-600/20 mb-4">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 animate-pulse" />
            <span className="text-sm font-semibold text-gray-700">Popular Destination</span>
          </div>
          
          <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
            {destination.name}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            {destination.description}
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {destination.highlights.map((highlight, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-600/10 to-indigo-500/10 text-blue-700 text-xs font-semibold rounded-full border border-blue-600/30 group-hover:border-blue-600/50 transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                {highlight}
              </span>
            ))}
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 transform group-hover:scale-[1.02] flex items-center justify-center gap-2">
            Explore More
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default {
  PlaceCard,
  VehicleCard,
  ServiceCard,
  FeatureCard,
  CategoryCard,
  StatCard,
  ValueCard,
  PackageCard,
  DestinationCard
}
