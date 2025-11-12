import React, { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    date: '',
    passengers: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      destination: '',
      date: '',
      passengers: '',
      message: ''
    })
    alert('Thank you for your inquiry! We will contact you soon.')
  }

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-gray-900 to-secondary bg-clip-text text-transparent">
              Book Your Journey
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Get in touch with us for an unforgettable travel experience</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-slide-up">
          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-gray-50 border border-primary/20 rounded-2xl p-8 space-y-6">
          <div>
          <label className="block text-gray-900 font-semibold mb-2">Full Name</label>
          <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
          placeholder="Your name"
          required
          />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
          <label className="block text-gray-900 font-semibold mb-2">Email</label>
          <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
          placeholder="your@email.com"
          required
          />
          </div>
          <div>
          <label className="block text-gray-900 font-semibold mb-2">Phone</label>
          <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
          placeholder="+91 XXXXX XXXXX"
          required
          />
          </div>
          </div>

          <div>
          <label className="block text-gray-900 font-semibold mb-2">Preferred Destination</label>
          <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
          required
          >
          <option value="">Select a destination</option>
          <option value="ooty">Ooty</option>
          <option value="madurai">Madurai</option>
          <option value="kanyakumari">Kanyakumari</option>
          <option value="kodaikanal">Kodaikanal</option>
          <option value="rameshwaram">Rameshwaram</option>
          <option value="chettinad">Chettinad</option>
          <option value="custom">Custom Package</option>
          </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
          <label className="block text-gray-900 font-semibold mb-2">Travel Date</label>
          <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
          required
          />
          </div>
          <div>
          <label className="block text-gray-900 font-semibold mb-2">Passengers</label>
          <input
          type="number"
          name="passengers"
          value={formData.passengers}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition"
          placeholder="Number of passengers"
          min="1"
          required
          />
          </div>
          </div>

          <div>
          <label className="block text-gray-900 font-semibold mb-2">Message</label>
          <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg text-gray-900 focus:outline-none focus:border-primary transition resize-none"
          rows="4"
          placeholder="Tell us about your travel preferences..."
          />
          </div>

          <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition transform hover:scale-105"
          >
          Submit Inquiry
          </button>
          </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in">
          <div className="group">
          <div className="flex flex-wrap sm:flex-nowrap items-start gap-4 p-6 bg-gradient-to-br from-white to-gray-50 border border-primary/20 rounded-2xl hover:border-primary/50 transition cursor-pointer hover:-translate-y-2">
          <div className="text-4xl shrink-0">📍</div>
          <div className="min-w-0">
          <h3 className="text-gray-900 font-bold text-lg mb-2">Our Location</h3>
          <p className="text-gray-600 break-words">Varsha Travels Head Office<br/>Chennai, Tamil Nadu<br/>India - 600001</p>
          </div>
          </div>
          </div>

          <div className="group">
          <div className="flex flex-wrap sm:flex-nowrap items-start gap-4 p-6 bg-gradient-to-br from-white to-gray-50 border border-primary/20 rounded-2xl hover:border-primary/50 transition cursor-pointer hover:-translate-y-2">
          <div className="text-4xl shrink-0">📞</div>
          <div className="min-w-0">
          <h3 className="text-gray-900 font-bold text-lg mb-2">Phone</h3>
          <p className="text-gray-600 break-words">+91 9876543210<br/>+91 9876543211<br/>Available 24/7</p>
          </div>
          </div>
          </div>

          <div className="group">
          <div className="flex flex-wrap sm:flex-nowrap items-start gap-4 p-6 bg-gradient-to-br from-white to-gray-50 border border-primary/20 rounded-2xl hover:border-primary/50 transition cursor-pointer hover:-translate-y-2">
          <div className="text-4xl shrink-0">✉️</div>
          <div className="min-w-0">
          <h3 className="text-gray-900 font-bold text-lg mb-2">Email</h3>
          <p className="text-gray-600 break-words">info@varshatravels.com<br/>bookings@varshatravels.com<br/>support@varshatravels.com</p>
          </div>
          </div>
          </div>

          <div className="group">
          <div className="flex flex-wrap sm:flex-nowrap items-start gap-4 p-6 bg-gradient-to-br from-white to-gray-50 border border-primary/20 rounded-2xl hover:border-primary/50 transition cursor-pointer hover:-translate-y-2">
          <div className="text-4xl shrink-0">🕐</div>
          <div className="min-w-0">
          <h3 className="text-gray-900 font-bold text-lg mb-2">Business Hours</h3>
          <p className="text-gray-600 break-words">Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM<br/>Sunday: By Appointment</p>
          </div>
          </div>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-primary/20">
          <p className="text-gray-900 font-bold mb-4">Follow Us</p>
          <div className="flex gap-4">
          {['f', 'i', 't', 'w'].map((social, idx) => (
          <button
          key={idx}
          className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold transition transform hover:scale-110"
          >
          {social === 'f' && '👍'}
          {social === 'i' && '📷'}
          {social === 't' && '✓'}
          {social === 'w' && '🐦'}
          </button>
          ))}
          </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
