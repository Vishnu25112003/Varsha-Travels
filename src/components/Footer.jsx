import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [showQr, setShowQr] = useState(false)
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
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 flex items-center justify-center">
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
              <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
              <li><Link to="/destination" className="hover:text-blue-400 transition">Destination</Link></li>
              <li><Link to="/gallery" className="hover:text-blue-400 transition">Gallery</Link></li>
            </ul>
          </div>

          {/* Account Details */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-3 md:mb-4">Account Details</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>Bank: State Bank of India</li>
              <li>Account No: 30231884313</li>
              <li>IFSC: SBIN0000253</li>
              <li>Branch: Tallakulam</li>
              <li>Account Name: S Muthukumar</li>
            </ul>
            <button
              type="button"
              onClick={() => setShowQr((prev) => !prev)}
              className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs sm:text-sm text-white transition"
            >
              {showQr ? 'Hide QR Code' : 'Show QR Code'}
            </button>
            {showQr && (
              <div className="mt-3">
                <img
                  src="/upi-qr.png"
                  alt="UPI payment QR code"
                  className="w-32 h-32 object-contain rounded-md border border-white/10 bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">UPI ID: varshamd12@okaxis</p>
              </div>
            )}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-3 md:mb-4">Contact</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>📍 57, 5th Cross Street, East Vaithiyanatha Puram, Thathaneri P.O, Madurai - 625018</li>
              <li>📞 8778265650 / 9435360401</li>
              <li>✉️ varshatravels06@gmail.com</li>
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
  const [showQr, setShowQr] = useState(false)
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  return (
    <div className="md:hidden mb-8">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 flex items-center justify-center">
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
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
            <li><Link to="/destination" className="hover:text-blue-400 transition">Destination</Link></li>
            <li><Link to="/gallery" className="hover:text-blue-400 transition">Gallery</Link></li>
          </ul>
        </div>
      </div>

      {/* Accordion: Account Details */}
      <div className="border border-white/10 rounded-xl overflow-hidden mb-3">
        <button onClick={() => toggle('services')} aria-expanded={open.services} aria-controls="footer-services" className="w-full flex items-center justify-between px-4 py-3 bg-white/5">
          <span className="font-semibold">Account Details</span>
          <svg className={`w-5 h-5 transition-transform ${open.services ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div id="footer-services" className={`${open.services ? 'block' : 'hidden'} px-4 pb-3 pt-2`}>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Bank: State Bank of India</li>
            <li>Account No: 30231884313</li>
            <li>IFSC: SBIN0000253</li>
            <li>Branch: Tallakulam</li>
            <li>Account Name: S Muthukumar</li>
          </ul>
          <button
            type="button"
            onClick={() => setShowQr((prev) => !prev)}
            className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white transition"
          >
            {showQr ? 'Hide QR Code' : 'Show QR Code'}
          </button>
          {showQr && (
            <div className="mt-3 flex justify-center">
              <img
                src="/upi-qr.png"
                alt="UPI payment QR code"
                className="w-40 h-40 object-contain rounded-md border border-white/10 bg-white"
              />
            </div>
          )}
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
            <li>📍 57, 5th Cross Street, East Vaithiyanatha Puram, Thathaneri P.O, Madurai - 625018</li>
            <li>📞 8778265650 / 9435360401</li>
            <li>✉️ varshatravels06@gmail.com</li>
            <li>🕐 24/7 Support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
