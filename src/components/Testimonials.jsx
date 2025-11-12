import React from 'react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      city: 'Chennai',
      rating: 5,
      text: 'Fantastic service! The driver was professional, the vehicle was clean and comfortable. Highly recommended for family trips!',
      avatar: '👨'
    },
    {
      name: 'Priya Sharma',
      city: 'Bangalore',
      rating: 5,
      text: 'Best travel experience ever! The team at Varsha Travels made sure everything was perfect. Will definitely book again!',
      avatar: '👩'
    },
    {
      name: 'Arjun Patel',
      city: 'Coimbatore',
      rating: 5,
      text: 'Amazing journey through Tamil Nadu. The itinerary was well-planned and the guides were knowledgeable. 10/10!',
      avatar: '👨'
    },
    {
      name: 'Anjali Reddy',
      city: 'Hyderabad',
      rating: 5,
      text: 'Affordable pricing with no compromise on quality. Every detail was taken care of. Excellent service!',
      avatar: '👩'
    },
    {
      name: 'Vikram Singh',
      city: 'Delhi',
      rating: 5,
      text: 'Professional drivers, clean vehicles, great customer support. Everything exceeded expectations!',
      avatar: '👨'
    },
    {
      name: 'Deepa Nair',
      city: 'Kochi',
      rating: 5,
      text: 'Had an unforgettable trip with family. The staff was courteous and the travel was smooth. Highly appreciated!',
      avatar: '👩'
    }
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-gray-900 to-secondary bg-clip-text text-transparent">
              Traveler Reviews
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Hear from our satisfied customers</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group animate-fade-in bg-gradient-to-br from-white to-gray-50 border border-primary/20 hover:border-primary/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-primary fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-primary/20">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
        { label: 'Happy Customers', value: '500+' },
        { label: 'Trips Completed', value: '1200+' },
        { label: 'Rating', value: '4.9/5' },
        { label: 'Years Experience', value: '15+' }
        ].map((stat, idx) => (
        <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
        <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
        {stat.value}
        </div>
        <p className="text-gray-600 text-sm">{stat.label}</p>
        </div>
        ))}
        </div>
        </div>
        </section>
        )
}
