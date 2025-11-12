import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Close mobile menu when navigating
  const handleNavClick = () => setIsOpen(false);

  // Hide on scroll down, show on scroll up
  const lastScroll = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      const delta = y - lastScroll.current;
      const threshold = 80;
      if (y <= threshold) {
        setHidden(false);
      } else if (delta > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep navbar visible when mobile menu open
  useEffect(() => {
    if (isOpen) setHidden(false);
  }, [isOpen]);

  // Expose navbar visibility to CSS consumers (e.g., pages needing sticky offsets)
  useEffect(() => {
    const cls = 'nav-hidden';
    if (hidden) {
      document.body.classList.add(cls);
    } else {
      document.body.classList.remove(cls);
    }
  }, [hidden]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transform transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      {/* Top contact bar */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        {/* Desktop/Tablet: tagline left, contact right */}
        <div className="hidden sm:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 items-center justify-between">
          <div className="text-xs sm:text-sm font-medium">
            Live the Journey, Cherish the Memories & English
          </div>
          <div className="flex items-center gap-6 text-xs sm:text-sm">
            <a href="tel:+919876543210" className="hover:opacity-90">
              +919876543210
            </a>
            <a
              href="mailto:info@thegenuinetravels.com"
              className="hover:opacity-90"
            >
              info@varshatravels.com
            </a>
          </div>
        </div>
        {/* Mobile: continuous scrolling marquee */}
        <div className="sm:hidden h-10 overflow-hidden">
          <div className="marquee h-full flex items-center">
            <div className="marquee-item">
              Live the Journey, Cherish the Memories & English • Call:
              +919500273692 • Email: info@thegenuinetravels.com
            </div>
            <div className="marquee-item">
              For - Hindi & English • Call: +919500273692 • Email:
              info@thegenuinetravels.com
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white/30 backdrop-blur-2xl border-b border-white/20 shadow-md supports-[backdrop-filter]:bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left - Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-gray-900 font-bold text-lg">VARSHA</span>
                <p className="text-primary text-xs">TRAVELS</p>
              </div>
            </Link>

            {/* Right - Navigation Links */}
            <div className="hidden lg:flex items-center gap-10">
              <Link
                to="/"
                className={`transition font-semibold ${isActive("/") ? "text-primary" : "text-gray-700 hover:text-primary"}`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`transition font-semibold ${isActive("/about") ? "text-primary" : "text-gray-700 hover:text-primary"}`}
              >
                About
              </Link>
              <Link
                to="/destination"
                className={`transition font-semibold ${isActive("/destination") ? "text-primary" : "text-gray-700 hover:text-primary"}`}
              >
                Destination
              </Link>
              <Link
                to="/gallery"
                className={`transition font-semibold ${isActive("/gallery") ? "text-primary" : "text-gray-700 hover:text-primary"}`}
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className={`transition font-semibold ${isActive("/contact") ? "text-primary" : "text-gray-700 hover:text-primary"}`}
              >
                Contact
              </Link>
            </div>

            {/* Right - Book Now Button */}
            <Link
              to="/booking"
              className="hidden lg:block px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary/50 transition transform hover:scale-105"
            >
              Book Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-900"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden pb-5 space-y-2 border-t border-primary/20 pt-4 bg-white">
              <div className="px-2 space-y-2">
                <Link
                  to="/"
                  onClick={handleNavClick}
                  className={`block w-full text-base font-semibold px-4 py-3 rounded-lg transition ${isActive("/") ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-primary/5 hover:text-primary"}`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={handleNavClick}
                  className={`block w-full text-base font-semibold px-4 py-3 rounded-lg transition ${isActive("/about") ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-primary/5 hover:text-primary"}`}
                >
                  About
                </Link>
                <Link
                  to="/destination"
                  onClick={handleNavClick}
                  className={`block w-full text-base font-semibold px-4 py-3 rounded-lg transition ${isActive("/destination") ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-primary/5 hover:text-primary"}`}
                >
                  Destination
                </Link>
                <Link
                  to="/gallery"
                  onClick={handleNavClick}
                  className={`block w-full text-base font-semibold px-4 py-3 rounded-lg transition ${isActive("/gallery") ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-primary/5 hover:text-primary"}`}
                >
                  Gallery
                </Link>
                <Link
                  to="/contact"
                  onClick={handleNavClick}
                  className={`block w-full text-base font-semibold px-4 py-3 rounded-lg transition ${isActive("/contact") ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-primary/5 hover:text-primary"}`}
                >
                  Contact
                </Link>
              </div>

              <div className="px-2 pt-2">
                <Link
                  to="/booking"
                  onClick={handleNavClick}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full"
                >
                  Book Now
                </Link>
              </div>

              <div className="px-2 pt-3">
                <div className="grid grid-cols-2 gap-3">
                  <a href="tel:+919876543210" className="w-full text-center px-4 py-2 rounded-full border border-primary/30 text-primary font-semibold hover:bg-primary/5">
                    Call Us
                  </a>
                  <a href="mailto:info@varshatravels.com" className="w-full text-center px-4 py-2 rounded-full border border-primary/30 text-primary font-semibold hover:bg-primary/5">
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
