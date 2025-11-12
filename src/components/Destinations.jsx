import React from 'react'
import { DestinationCard } from './Card'

export default function Destinations() {
  const destinations = [
    {
      name: 'Ooty',
      description: 'The "Queen of the Nilgiris" with misty mountains and tea gardens',
      image: '🏔️',
      color: 'from-primary/30',
      highlights: ['Toy Train', 'Botanical Garden', 'Doddabetta Peak']
    },
    {
      name: 'Madurai',
      description: 'Ancient city home to the magnificent Meenakshi Temple',
      image: '🕉️',
      color: 'from-secondary/30',
      highlights: ['Meenakshi Temple', 'Thiruparankundram', 'Temple City']
    },
    {
      name: 'Kanyakumari',
      description: 'Where three seas meet - southernmost point of India',
      image: '🌊',
      color: 'from-primary/30',
      highlights: ['Sunset View', 'Vivekananda Rock', 'Beach']
    },
    {
      name: 'Kodaikanal',
      description: 'Princess of hill stations with serene lakes and forests',
      image: '🌲',
      color: 'from-secondary/30',
      highlights: ['Lake', 'Coaker\'s Walk', 'Waterfalls']
    },
    {
      name: 'Rameshwaram',
      description: 'Sacred pilgrimage site with pristine beaches and temples',
      image: '⛪',
      color: 'from-primary/30',
      highlights: ['Ramanathaswamy Temple', 'Adam\'s Bridge', 'Beaches']
    },
    {
      name: 'Chettinad',
      description: 'Historic region known for palatial mansions and unique architecture',
      image: '🏛️',
      color: 'from-secondary/30',
      highlights: ['Heritage Mansions', 'Athangudi Tiles', 'Culture']
    }
  ]

  return (
    <section id="destinations" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-gray-900 to-secondary bg-clip-text text-transparent">
              Explore Tamil Nadu
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Discover the most beautiful and culturally rich destinations</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <DestinationCard destination={dest} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
