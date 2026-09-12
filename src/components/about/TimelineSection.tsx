import React, { useRef, useState, useEffect } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineSectionProps {
  timeline: TimelineItem[];
}

export default function TimelineSection({ timeline }: TimelineSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [timeline]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="space-y-8 relative" id="our-journey">
      {/* Centered Section Header with Navigation Buttons */}
      <div className="relative border-b border-line pb-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-accent-600 font-mono tracking-widest block">
            History & Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Journey
          </h2>
          <p className="text-sm text-slate-700 max-w-xl mx-auto">
            A journey of excellence, community building, and technical advancement in applied mechanics.
          </p>
        </div>

        {/* Navigation Buttons for Horizontal Scroll */}
        <div className="flex items-center justify-end space-x-2 mb-4">
          <button 
            onClick={() => scroll('left')}
            className={`p-2 rounded-full border transition-all duration-200 ${
              canScrollLeft 
                ? 'bg-box border-line text-slate-900 hover:bg-accent-50 hover:border-accent-400 hover:text-accent-700 shadow-sm cursor-pointer' 
                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-50'
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll timeline left"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className={`p-2 rounded-full border transition-all duration-200 ${
              canScrollRight 
                ? 'bg-box border-line text-slate-900 hover:bg-accent-50 hover:border-accent-400 hover:text-accent-700 shadow-sm cursor-pointer' 
                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-50'
            }`}
            disabled={!canScrollRight}
            aria-label="Scroll timeline right"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal Timeline Track */}
      <div className="relative">
        {/* Scrollable timeline cards */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-6 pt-4 snap-x snap-mandatory scroll-smooth focus:outline-none select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className="w-[300px] sm:w-[340px] flex-shrink-0 snap-start flex flex-col group relative"
            >
              {/* Top Node & Connector */}
              <div className="flex items-center mb-4 relative">
                {/* Horizontal line segment */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-accent-500/20 via-slate-200 to-accent-500/20 group-hover:from-accent-400/50 group-hover:to-accent-500/50 transition-colors z-0"></div>

                {/* Highlighted Year Node Pill */}
                <div className="relative z-10 mx-auto px-3.5 py-1.5 rounded-full bg-ink text-accent-400 border border-accent-500/40 group-hover:bg-accent-500 group-hover:text-slate-950 group-hover:border-accent-400 group-hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent-400 group-hover:bg-slate-950 transition-colors flex-shrink-0"></span>
                  <span className="text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">
                    {item.year}
                  </span>
                </div>
              </div>

              {/* Milestone Card */}
              <div className="bg-box rounded-2xl border border-box-border/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-6 flex flex-col justify-between flex-grow group-hover:border-accent-400/60 relative overflow-hidden text-left">
                {/* Top Accent Line */}
                <div className="h-1.5 w-full bg-ink group-hover:bg-accent-400 transition-colors duration-300 absolute top-0 inset-x-0"></div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-accent-600 transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
