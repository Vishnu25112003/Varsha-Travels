import React, { useState, useEffect } from 'react'

export default function Carousel({ slides, autoPlay = true, interval = 5000 }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Slides with smooth transitions */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              idx === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {typeof slide === 'string' ? (
              <>
                <img 
                  src={slide} 
                  alt={`Slide ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              </>
            ) : (
              slide
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons - mirrored circular controls, always visible and centered */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 text-gray-600 shadow-lg border border-gray-200 hover:bg-blue-600 hover:text-white transition-transform duration-200 hover:scale-105"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 text-gray-600 shadow-lg border border-gray-200 hover:bg-blue-600 hover:text-white transition-transform duration-200 hover:scale-105"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Modern Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className="group/dot relative"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div className={`h-2 rounded-full transition-all duration-500 ${
              idx === currentSlide 
                ? 'bg-white w-12 shadow-lg shadow-white/50' 
                : 'bg-white/40 w-2 group-hover/dot:bg-white/70 group-hover/dot:w-8'
            }`} />
          </button>
        ))}
      </div>

    </div>
  )
}
