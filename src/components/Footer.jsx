import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-gray-900 font-bold">Varsha Travels</span>
            </div>
            <p className="text-gray-600 text-sm">Explore Tamil Nadu with trusted, reliable, and premium travel services.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition">About</Link></li>
              <li><Link to="/destination" className="hover:text-primary transition">Destination</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition">Gallery</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition">Car Rentals</a></li>
              <li><a href="#" className="hover:text-primary transition">Tour Packages</a></li>
              <li><a href="#" className="hover:text-primary transition">Group Bookings</a></li>
              <li><a href="#" className="hover:text-primary transition">Corporate Travel</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📍 Chennai, TN</li>
              <li>📞 +91 9876543210</li>
              <li>✉️ info@varshatravels.com</li>
              <li>🕐 24/7 Support</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © 2024 Varsha Travels. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-primary hover:text-secondary transition text-sm">Facebook</a>
              <a href="#" className="text-primary hover:text-secondary transition text-sm">Instagram</a>
              <a href="#" className="text-primary hover:text-secondary transition text-sm">Twitter</a>
              <a href="#" className="text-primary hover:text-secondary transition text-sm">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
