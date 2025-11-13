import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Mobile: collapsible sections */}
        <MobileFooter />
        {/* Desktop: 4-column layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-10 md:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-white font-bold text-sm sm:text-base">Varsha Travels</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm">Explore Tamil Nadu with trusted, reliable, and premium travel services.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-3 md:mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:block sm:space-y-2 text-xs sm:text-sm text-gray-300">
              <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition">About</Link></li>
              <li><Link to="/destination" className="hover:text-primary transition">Destination</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition">Gallery</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-3 md:mb-4">Services</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:block sm:space-y-2 text-xs sm:text-sm text-gray-300">
              <li><a href="#" className="hover:text-primary transition">Car Rentals</a></li>
              <li><a href="#" className="hover:text-primary transition">Tour Packages</a></li>
              <li><a href="#" className="hover:text-primary transition">Group Bookings</a></li>
              <li><a href="#" className="hover:text-primary transition">Corporate Travel</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-3 md:mb-4">Contact</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>📍 Chennai, TN</li>
              <li>📞 +91 9876543210</li>
              <li>✉️ info@varshatravels.com</li>
              <li>🕐 24/7 Support</li>
            </ul>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2024 Varsha Travels. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-4 mt-4 md:mt-0">
              <a href="#" className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-xs sm:text-sm break-words">Facebook</a>
              <a href="#" className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-xs sm:text-sm break-words">Instagram</a>
              <a href="#" className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-xs sm:text-sm break-words">Twitter</a>
              <a href="#" className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-xs sm:text-sm break-words">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function MobileFooter() {
  const [open, setOpen] = useState({ links: false, services: false, contact: false })
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  return (
    <div className="md:hidden mb-8">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <span className="text-white font-bold">V</span>
        </div>
        <div>
          <span className="text-white font-bold">Varsha Travels</span>
          <p className="text-gray-300 text-xs">Explore Tamil Nadu with trusted, reliable, and premium travel services.</p>
        </div>
      </div>

      {/* Accordion: Quick Links */}
      <div className="border border-white/10 rounded-xl overflow-hidden mb-3">
        <button onClick={() => toggle('links')} aria-expanded={open.links} aria-controls="footer-links" className="w-full flex items-center justify-between px-4 py-3 bg-white/5">
          <span className="font-semibold">Quick Links</span>
          <svg className={`w-5 h-5 transition-transform ${open.links ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div id="footer-links" className={`${open.links ? 'block' : 'hidden'} px-4 pb-3 pt-2`}>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary transition">About</Link></li>
            <li><Link to="/destination" className="hover:text-primary transition">Destination</Link></li>
            <li><Link to="/gallery" className="hover:text-primary transition">Gallery</Link></li>
          </ul>
        </div>
      </div>

      {/* Accordion: Services */}
      <div className="border border-white/10 rounded-xl overflow-hidden mb-3">
        <button onClick={() => toggle('services')} aria-expanded={open.services} aria-controls="footer-services" className="w-full flex items-center justify-between px-4 py-3 bg-white/5">
          <span className="font-semibold">Services</span>
          <svg className={`w-5 h-5 transition-transform ${open.services ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div id="footer-services" className={`${open.services ? 'block' : 'hidden'} px-4 pb-3 pt-2`}>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-primary transition">Car Rentals</a></li>
            <li><a href="#" className="hover:text-primary transition">Tour Packages</a></li>
            <li><a href="#" className="hover:text-primary transition">Group Bookings</a></li>
            <li><a href="#" className="hover:text-primary transition">Corporate Travel</a></li>
          </ul>
        </div>
      </div>

      {/* Accordion: Contact */}
      <div className="border border-white/10 rounded-xl overflow-hidden">
        <button onClick={() => toggle('contact')} aria-expanded={open.contact} aria-controls="footer-contact" className="w-full flex items-center justify-between px-4 py-3 bg-white/5">
          <span className="font-semibold">Contact</span>
          <svg className={`w-5 h-5 transition-transform ${open.contact ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div id="footer-contact" className={`${open.contact ? 'block' : 'hidden'} px-4 pb-3 pt-2`}>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>📍 Chennai, TN</li>
            <li>📞 +91 9876543210</li>
            <li>✉️ info@varshatravels.com</li>
            <li>🕐 24/7 Support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
