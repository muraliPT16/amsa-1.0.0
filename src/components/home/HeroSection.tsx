import React, { useState, useEffect, useRef } from 'react';
import homepageData from '../../data/homepage.json';
import { getAssetPath } from '../../utils/assetPath';

interface Slide {
  id?: string;
  image: string;
  title: string;
  description: string;
}

export default function HeroSection() {
  const slides: Slide[] = homepageData.carousel;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const showSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, 5000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, currentIndex]);

  return (
    <section
      id="hero-carousel"
      className="relative mt-7 h-[78vh] min-h-[540px] w-full overflow-hidden bg-ink select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Wrapper */}
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id || `slide-${index}`}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <img
              src={getAssetPath(slide.image)}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* High-contrast bottom scrim for legible overlay text */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />

            {/* Title & Description, always visible over the photo */}
            <div className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-10 md:px-16 pb-12 sm:pb-16 max-w-3xl">
              <span className="text-xs font-bold text-accent-400 font-mono tracking-widest block mb-3 drop-shadow-sm">
                Department & Association Highlights — {(index + 1).toString().padStart(2, '0')} / {slides.length.toString().padStart(2, '0')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight mb-4 tracking-tight drop-shadow-md">
                {slide.title}
              </h1>
              <p className="font-display italic font-light text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl drop-shadow-sm">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow Control */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-box/10 hover:bg-accent-400 hover:text-ink text-white flex items-center justify-center border border-paper/20 hover:border-accent-400 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right Arrow Control */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-box/10 hover:bg-accent-400 hover:text-ink text-white flex items-center justify-center border border-paper/20 hover:border-accent-400 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 right-6 sm:right-10 flex space-x-2.5 z-30">
        {slides.map((slide, index) => (
          <button
            key={`dot-${slide.id || index}`}
            onClick={() => showSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-accent-400 scale-125' : 'bg-paper/40 hover:bg-paper/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
