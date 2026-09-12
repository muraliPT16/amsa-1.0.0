import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import homepageData from '../../data/homepage.json';
import announcements from '../../data/announcements/announcements.json';
import { formatDate } from '../../utils/dateFormatting';

export default function HighlightsSection() {
  const { tagline, title, description, ctaAboutText, ctaAboutLink, ctaTeamText, ctaTeamLink } = homepageData.aboutSection;

  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);

  const getCategoryClass = (category: string) => {
    const cat = category.toLowerCase();
    if (cat === 'achievement') return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
    if (cat === 'admission' || cat === 'academics') return 'bg-sky-500/15 text-sky-400 border border-sky-500/30';
    if (cat === 'event' || cat === 'event info') return 'bg-accent-500/15 text-accent-400 border border-accent-500/30';
    return 'bg-violet-500/15 text-violet-400 border border-violet-500/30';
  };

  // Helper to render text with clickable URLs
  const renderFormattedContent = (text: string) => {
    const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    const parts = text.split(urlPattern);

    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        const href = part.startsWith('http') ? part : `https://${part}`;
        return (
          <a
            key={`url-${index}-${part.slice(0, 20)}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-400 hover:text-accent-300 underline underline-offset-2 break-all font-light transition-colors inline"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  // Continuous smooth auto-roll on mount, pauses when user clicks Pause
  useEffect(() => {
    if (isPaused) {
      if (tickerRef.current) {
        tickerRef.current.style.transform = 'none';
      }
      return;
    }

    let animId: number;
    let lastTime = performance.now();
    const speed = 26; // pixels per second for slow, readable rolling

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (tickerRef.current) {
        const fullHeight = tickerRef.current.scrollHeight;
        const halfHeight = fullHeight / 2;

        if (halfHeight > 0) {
          offsetRef.current += speed * delta;
          if (offsetRef.current >= halfHeight) {
            offsetRef.current = offsetRef.current % halfHeight;
          }
          tickerRef.current.style.transform = `translate3d(0, -${offsetRef.current}px, 0)`;
        }
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPaused]);

  // Duplicate items for continuous seamless rolling
  const displayItems = isPaused ? announcements : [...announcements, ...announcements];

  return (
    <section className="py-12 md:py-14 bg-transparent" id="who-we-are">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Who We Are & Pillars */}
          <div className="md:col-span-6 lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-accent-500 font-mono tracking-widest block">
                {tagline}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {title}
              </h2>
              <p className="text-base text-slate-800 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-accent-600 font-bold">✓</span>
                  <h4 className="font-bold text-slate-900 text-sm font-mono tracking-wider">Academic Excellence</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">Resources, peer learning, talks and academic initiatives.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-accent-600 font-bold">✓</span>
                  <h4 className="font-bold text-slate-900 text-sm font-mono tracking-wider">Research & Innovation</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">Research discussions, R&D initiatives, hackathons and interdisciplinary exploration.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-accent-600 font-bold">✓</span>
                  <h4 className="font-bold text-slate-900 text-sm font-mono tracking-wider">Community & Leadership</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">Networking, collaborations, student initiatives and opportunities to lead.</p>
              </div>
            </div>

            {/* CTA Links */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-line">
              <Link 
                to={ctaAboutLink} 
                className="inline-flex items-center text-sm font-bold font-mono tracking-wider text-slate-900 hover:text-accent-600 transition-colors group"
              >
                {ctaAboutText}
                <svg className="h-4 w-4 ml-1.5 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                to={ctaTeamLink} 
                className="inline-flex items-center px-5 py-2.5 rounded text-xs font-extrabold font-mono tracking-wider bg-ink text-accent-500 border border-accent-500/80 hover:bg-accent-500 hover:text-slate-950 hover:border-accent-500 shadow-md transition-all duration-300 group"
              >
                {ctaTeamText}
                <svg className="h-4 w-4 ml-2 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Right Column: Glassmorphic What's Happening? Card */}
          <div className="md:col-span-6 lg:col-span-5 w-full">
            <div className="bg-gradient-to-br from-ink to-[#1C2541] rounded-2xl p-6 shadow-2xl border border-slate-900 relative overflow-hidden text-white min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
              {/* Subtle glass glow */}
              <div className="absolute inset-0 bg-paper/[0.02] backdrop-blur-[2px] pointer-events-none"></div>
              
              {/* Card Header with Highlighted Title and Pause/Scroll Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80 mb-4 relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500"></span>
                  </span>
                  <h3 className="text-sm sm:text-base font-black font-mono tracking-wider text-accent-400 drop-shadow-sm">
                    WHAT'S HAPPENING?
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!isPaused) {
                        offsetRef.current = 0;
                      }
                      setIsPaused(prev => !prev);
                    }}
                    className={`text-xs font-light px-3 py-1.5 rounded-lg border transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer ${
                      isPaused
                        ? 'bg-accent-500 text-slate-950 border-accent-400 shadow-accent-500/20 hover:bg-accent-400'
                        : 'bg-slate-800/90 text-accent-300 border-accent-500/30 hover:bg-slate-800 hover:border-accent-400 hover:text-accent-200'
                    }`}
                    title={isPaused ? "Click to resume automatic rolling motion" : "Click to pause rolling and enable manual scrolling"}
                  >
                    {isPaused ? (
                      <>
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Resume Roll</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                        <span>Pause & Scroll</span>
                      </>
                    )}
                  </button>

                  <Link
                    to="/announcements"
                    className="font-mono text-[11px] text-slate-300 hover:text-accent-300 transition-colors pl-1"
                  >
                    View All →
                  </Link>
                </div>
              </div>

              {/* Window Container */}
              <div 
                ref={containerRef}
                className={`h-[490px] lg:h-[550px] relative z-10 pr-1 select-text ${
                  isPaused ? 'overflow-y-auto scrollbar-thin' : 'overflow-hidden'
                }`}
              >
                <div 
                  ref={tickerRef} 
                  className="space-y-4 will-change-transform"
                >
                  {displayItems.map((ann, idx) => (
                    <div 
                      key={`${ann.id}-${idx}`} 
                      className="bg-slate-950/80 p-5 rounded-xl border-l-4 border-l-accent-500 border-y border-r border-slate-900 flex flex-col space-y-2.5 hover:border-accent-500/50 hover:bg-slate-950 transition-all duration-200 shadow-md text-left"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-light tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${getCategoryClass(ann.category)}`}>
                          {ann.category.toLowerCase() === 'admission' && (
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          )}
                          {ann.category.toLowerCase() === 'achievement' && (
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513c0 .9.595 1.69 1.455 1.954 1.62.5 3.327.765 5.045.765s3.425-.264 5.045-.765C18.405 14.81 19 14.02 19 13.12v-2.513c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-4.024-.166zM8.25 15.75H6a2.25 2.25 0 01-2.25-2.25v-1.5c0-1.242.922-2.285 2.154-2.356C6.46 9.61 7.02 9.6 7.5 9.6M15.75 15.75H18a2.25 2.25 0 002.25-2.25v-1.5c0-1.242-.922-2.285-2.154-2.356c-.566-.032-1.126-.042-1.606-.042" />
                            </svg>
                          )}
                          {(ann.category.toLowerCase() === 'event' || ann.category.toLowerCase() === 'event info') && (
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                          {ann.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-light flex-shrink-0">
                          {formatDate(ann.date)}
                        </span>
                      </div>

                      {/* Full announcement title */}
                      <h4 className="font-google text-sm sm:text-base font-extrabold text-white leading-snug">
                        {ann.title}
                      </h4>

                      {/* Full announcement content with clickable links */}
                      <div className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {renderFormattedContent(ann.content)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Fade gradient at the bottom edge */}
              <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#1C2541] to-transparent pointer-events-none z-20"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
