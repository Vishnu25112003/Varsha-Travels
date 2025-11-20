import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VarshaLogo from '../data/Varsha_Logo.png'

const API_BASE_URL = "https://varsha-travels.onrender.com"; // same backend as admin

export default function Footer() {
  const [showQr, setShowQr] = useState(false)
  const [settings, setSettings] = useState(null)
  const [showTerms, setShowTerms] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/contact-settings`)
        if (!res.ok) throw new Error('Failed to load contact settings')
        const data = await res.json()
        setSettings(data)
      } catch (error) {
        console.error('Failed to fetch contact settings', error)
        setSettings(null)
      }
    }

    fetchSettings()
  }, [])
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Mobile: collapsible sections */}
        <MobileFooter />
        {/* Desktop: 4-column layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-10 md:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <img
                src={VarshaLogo}
                alt="Varsha Travels Logo"
                className="h-10 w-auto sm:h-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-base sm:text-lg leading-tight">VARSHA</span>
                <span className="text-blue-400 font-semibold text-xs tracking-wide">TRAVELS</span>
              </div>
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
              {settings?.bankName && <li>Bank: {settings.bankName}</li>}
              {settings?.accountNumber && <li>Account No: {settings.accountNumber}</li>}
              {settings?.ifsc && <li>IFSC: {settings.ifsc}</li>}
              {settings?.branch && <li>Branch: {settings.branch}</li>}
              {settings?.accountHolderName && <li>Account Name: {settings.accountHolderName}</li>}
              {!settings && (
                <li>Account details will appear here once configured.</li>
              )}
            </ul>
            <button
              type="button"
              onClick={() => setShowQr((prev) => !prev)}
              className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs sm:text-sm text-white transition"
            >
              {showQr ? 'Hide QR Code' : 'Show QR Code'}
            </button>
            {showQr && settings?.qrImageUrl && (
              <div className="mt-3">
                <img
                  src={settings.qrImageUrl}
                  alt="UPI payment QR code"
                  className="w-32 h-32 object-contain rounded-md border border-white/10 bg-white"
                />
                {settings?.upiId && (
                  <p className="text-xs text-gray-400 mt-1">UPI ID: {settings.upiId}</p>
                )}
              </div>
            )}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-3 md:mb-4">Contact</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                📍 {settings?.addressLine1}
                {settings?.addressLine2 && `, ${settings.addressLine2}`}
                {settings?.addressLine3 && `, ${settings.addressLine3}`}
              </li>
              <li>
                📞 {(settings?.phones || []).join(' / ')}
              </li>
              <li>
                ✉️ {(settings?.emails || []).join(' / ')}
              </li>
              <li>🕐 24/7 Support</li>
            </ul>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1 max-w-md text-center md:text-left">
              <p className="text-gray-400 text-xs sm:text-sm">
                © 2024 Varsha Travels. All rights reserved.
              </p>
              <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed">
                By using this website and booking our services, you agree to our basic terms.
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="ml-1 underline underline-offset-2 text-blue-300 hover:text-blue-100"
                >
                  Terms &amp; Conditions
                </button>
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-4 mt-1 md:mt-0">
              {[
                { name: "Facebook", url: settings?.socialFacebook },
                { name: "Instagram", url: settings?.socialInstagram },
                { name: "Twitter", url: settings?.socialTwitter },
                { name: "WhatsApp", url: settings?.socialWhatsapp },
              ]
                .filter((social) => !!social.url)
                .map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition text-xs sm:text-sm break-words"
                  >
                    {social.name}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Transparent / light overlay */}
          <div
            className="absolute inset-0 bg-white/40 backdrop-blur-sm"
            onClick={() => setShowTerms(false)}
          />

          <div className="relative z-10 max-w-lg w-full mx-4 bg-white/95 rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setShowTerms(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              aria-label="Close terms and conditions"
            >
              ×
            </button>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              Terms &amp; Conditions
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-gray-700 max-h-72 overflow-y-auto">
              <p>
                1. Itineraries and timings may change due to traffic, weather or local
                conditions. Our team will do their best to inform you of any changes.
              </p>
              <p>
                2. Package prices generally include vehicle, driver and basic charges only.
                Entry tickets, tolls, parking, food, and personal expenses are extra unless
                clearly mentioned in writing.
              </p>
              <p>
                3. A booking is confirmed only after advance payment. Cancellations or date
                changes may attract charges as per our current policy shared at the time of
                booking.
              </p>
              <p>
                4. Passengers are responsible for their personal belongings during the trip.
              </p>
              <p>
                5. By confirming a trip with Varsha Travels, you agree to these terms and any
                additional terms communicated for special packages.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}

function MobileFooter() {
  const [open, setOpen] = useState({ links: false, services: false, contact: false })
  const [showQr, setShowQr] = useState(false)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/contact-settings`)
        if (!res.ok) throw new Error('Failed to load contact settings')
        const data = await res.json()
        setSettings(data)
      } catch (error) {
        console.error('Failed to fetch contact settings', error)
        setSettings(null)
      }
    }

    fetchSettings()
  }, [])
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  return (
    <div className="md:hidden mb-8">
      {/* Brand */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={VarshaLogo}
            alt="Varsha Travels Logo"
            className="h-10 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="text-white font-bold text-base leading-tight">VARSHA</span>
            <span className="text-blue-400 font-semibold text-xs tracking-wide">TRAVELS</span>
          </div>
        </div>
        <p className="text-gray-300 text-xs">Explore Tamil Nadu with trusted, reliable, and premium travel services.</p>
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
            {settings?.bankName && <li>Bank: {settings.bankName}</li>}
            {settings?.accountNumber && <li>Account No: {settings.accountNumber}</li>}
            {settings?.ifsc && <li>IFSC: {settings.ifsc}</li>}
            {settings?.branch && <li>Branch: {settings.branch}</li>}
            {settings?.accountHolderName && <li>Account Name: {settings.accountHolderName}</li>}
            {!settings && (
              <li>Account details will appear here once configured.</li>
            )}
          </ul>
          <button
            type="button"
            onClick={() => setShowQr((prev) => !prev)}
            className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white transition"
          >
            {showQr ? 'Hide QR Code' : 'Show QR Code'}
          </button>
          {showQr && settings?.qrImageUrl && (
            <div className="mt-3 flex justify-center">
              <img
                src={settings.qrImageUrl}
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
            <li>
              📍 {settings?.addressLine1}
              {settings?.addressLine2 && `, ${settings.addressLine2}`}
              {settings?.addressLine3 && `, ${settings.addressLine3}`}
            </li>
            <li>
              📞 {(settings?.phones || []).join(' / ')}
            </li>
            <li>
              ✉️ {(settings?.emails || []).join(' / ')}
            </li>
            <li>🕐 24/7 Support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
