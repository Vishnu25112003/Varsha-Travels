import React from 'react'
import { PackageCard } from './Card'

export default function Packages() {
  const packages = [
    {
      name: 'Weekend Getaway',
      duration: '2 Days / 1 Night',
      price: '₹4,999',
      icon: '🎉',
      description: 'Perfect for a quick escape',
      includes: [
        'Round trip transportation',
        'Hotel accommodation',
        'Local meals (breakfast & dinner)',
        'Guided tour',
        'Travel insurance'
      ],
      popular: false
    },
    {
      name: 'South Tour Special',
      duration: '5 Days / 4 Nights',
      price: '₹12,999',
      icon: '🏆',
      description: 'Premium travel experience',
      includes: [
        'Luxury vehicle with AC',
        '4-star hotel stays',
        'All meals included',
        'Professional guide',
        'Photography sessions',
        'Travel insurance',
        'Emergency support 24/7'
      ],
      popular: true
    },
    {
      name: 'Heritage Explorer',
      duration: '7 Days / 6 Nights',
      price: '₹16,999',
      icon: '🕉️',
      description: 'Explore cultural treasures',
      includes: [
        'Premium vehicle',
        'Premium accommodations',
        'All meals (veg & non-veg)',
        'Expert cultural guide',
        'Temple entry fees',
        'Museum access',
        'Souvenir kit',
        '24/7 support'
      ],
      popular: false
    }
  ]

  return (
    <section id="packages" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-gray-900 to-secondary bg-clip-text text-transparent">
              Travel Packages
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Choose the perfect package for your Tamil Nadu adventure</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/50 rounded-2xl p-8 text-center animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Package?</h3>
          <p className="text-gray-700 mb-6">Tailor your travel experience with our flexible customization options</p>
          <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary/50 transition transform hover:scale-105">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  )
}
