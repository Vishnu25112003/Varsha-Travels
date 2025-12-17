import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import VarshaLogo from "../data/Varsha_Logo.png";
import { Button } from "./ui/moving-border";

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
    const cls = "nav-hidden";
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
      {/* <div className="bg-gradient-to-r from-primary to-secondary text-white">
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
      </div>*/}

      {/* Main navbar */}
      <div className="bg-white/30 backdrop-blur-2xl border-b border-white/20 shadow-md supports-[backdrop-filter]:bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 sm:h-28 md:h-30 lg:h-32">
            {/* Left - Logo with Company Name */}
            <Link
              to="/"
              className="flex items-center gap-3 sm:gap-4 hover:opacity-80 transition"
            >
              <img
                src={VarshaLogo}
                alt="Varsha Travels Logo"
                className="h-20 w-auto sm:h-22 md:h-24 lg:h-26 object-contain"
              />
              <Button
                as="div"
                borderRadius="0.75rem"
                containerClassName="w-auto"
                className="bg-white shadow-lg px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3"
              >
                <span className="varsha-travels-color varsha-travels-font font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl whitespace-nowrap">
                  Varsha Travels
                </span>
              </Button>
            </Link>

            {/* Right - Navigation Links and Book Now */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 ml-auto">
              <Link
                to="/"
                className={`px-2 py-1 text-sm xl:text-base font-semibold transition-all duration-300 ${
                  isActive("/") 
                    ? "text-blue-700 border-b-2 border-blue-700" 
                    : "text-gray-700 hover:text-blue-700"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-2 py-1 text-sm xl:text-base font-semibold transition-all duration-300 ${
                  isActive("/about") 
                    ? "text-blue-700 border-b-2 border-blue-700" 
                    : "text-gray-700 hover:text-blue-700"
                }`}
              >
                About
              </Link>
              <Link
                to="/destination"
                className={`px-2 py-1 text-sm xl:text-base font-semibold transition-all duration-300 ${
                  isActive("/destination") 
                    ? "text-blue-700 border-b-2 border-blue-700" 
                    : "text-gray-700 hover:text-blue-700"
                }`}
              >
                Destinations
              </Link>
              <Link
                to="/gallery"
                className={`px-2 py-1 text-sm xl:text-base font-semibold transition-all duration-300 ${
                  isActive("/gallery") 
                    ? "text-blue-700 border-b-2 border-blue-700" 
                    : "text-gray-700 hover:text-blue-700"
                }`}
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className={`px-2 py-1 text-sm xl:text-base font-semibold transition-all duration-300 ${
                  isActive("/contact") 
                    ? "text-blue-700 border-b-2 border-blue-700" 
                    : "text-gray-700 hover:text-blue-700"
                }`}
              >
                Contact
              </Link>

              <Link
                to="/booking"
                className="ml-3 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold text-sm xl:text-base rounded-full hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-300 transform hover:scale-105"
              >
                Book Now
              </Link>
            </div>

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
            <div className="lg:hidden pb-5 space-y-2 border-t border-blue-600/20 pt-4 bg-white">
              <div className="px-2 space-y-2">
                <Link
                  to="/"
                  onClick={handleNavClick}
                  className={`block w-full text-base font-semibold px-4 py-3 rounded-lg transition ${isActive("/") ? "bg-blue-600/10 text-blue-700" : "text-gray-700 hover:bg-blue-600/5 hover:text-blue-700"}`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={handleNavClick}
                  className={`block w-full text-base font-semibold px-4 py-3 rounded-lg transition ${isActive("/about") ? "bg-blue-600/10 text-blue-700" : "text-gray-700 hover:bg-blue-600/5 hover:text-blue-700"}`}
                >
                  About
                </Link>
                <Link
                  to="/destination"
                  onClick={handleNavClick}
                  className={`block w-full text-base font-semibold px-4 py-3 rounded-lg transition ${isActive("/destination") ? "bg-blue-600/10 text-blue-700" : "text-gray-700 hover:bg-blue-600/5 hover:text-blue-700"}`}
                >
                  Destination
                </Link>
                <Link
                  to="/gallery"
                  onClick={handleNavClick}
                  className={`block w-full text-base font-semibold px-4 py-3 rounded-lg transition ${isActive("/gallery") ? "bg-blue-600/10 text-blue-700" : "text-gray-700 hover:bg-blue-600/5 hover:text-blue-700"}`}
                >
                  Gallery
                </Link>
                <Link
                  to="/contact"
                  onClick={handleNavClick}
                  className={`block w-full text-base font-semibold px-4 py-3 rounded-lg transition ${isActive("/contact") ? "bg-blue-600/10 text-blue-700" : "text-gray-700 hover:bg-blue-600/5 hover:text-blue-700"}`}
                >
                  Contact
                </Link>
              </div>

              <div className="px-2 pt-2">
                <Link
                  to="/booking"
                  onClick={handleNavClick}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold rounded-full"
                >
                  Book Now
                </Link>
              </div>

              <div className="px-2 pt-3">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+918778265650"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-blue-600/30 text-blue-700 font-semibold hover:bg-blue-600/5"
                  >
                    {/* Phone icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Call Us</span>
                  </a>
                  <a
                    href="mailto:varshatravels06@gmail.com?subject=Travel%20Enquiry%20-%20Varsha%20Travels&body=Hi%20Varsha%20Travels,%0D%0A%0D%0AI%20would%20like%20to%20enquire%20about%20your%20travel%20services.%0D%0A%0D%0AName:%0D%0APhone:%0D%0ATravel%20dates:%0D%0ADestination:%0D%0A%0D%0AThank%20you!"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-blue-600/30 text-blue-700 font-semibold hover:bg-blue-600/5"
                  >
                    {/* Email icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                      <polyline points="3 7 12 13 21 7" />
                    </svg>
                    <span>Email Us</span>
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
