import React from 'react';
import { formatDate } from '../utils/dateFormatting';
import { getAssetPath } from '../utils/assetPath';

interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  location: string;
  time: string;
  poster?: string;
  video?: string;
  outcome?: string;
  albumId?: string;
  speaker?: string;
  speaker2?: string;
  edition?: string;
  link?: string;
}

interface EventCardProps {
  event: Event;
  index?: number;
  isUpcoming?: boolean;
  onClick?: () => void;
}

const getCategoryIcon = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes('workshop') || c.includes('bootcamp') || c.includes('code') || c.includes('hack')) {
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
  } else if (c.includes('symposium') || c.includes('conference') || c.includes('summit')) {
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    );
  } else if (c.includes('seminar') || c.includes('lecture') || c.includes('talk') || c.includes('guest')) {
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    );
  } else if (c.includes('cultural') || c.includes('night') || c.includes('fresh')) {
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    );
  } else {
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    );
  }
};

export default function EventCard({ event, index = 0, isUpcoming = false, onClick }: EventCardProps) {
  const eventDate = new Date(event.date);
  const day = eventDate.getDate().toString().padStart(2, '0');
  const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = eventDate.getFullYear().toString();
  const formattedDate = formatDate(event.date);

  return (
    <>
      {isUpcoming ? (
        /* ==================== UPCOMING EVENT CARD LAYOUT ==================== */
        <div 
          onClick={onClick}
          className="group bg-box rounded-2xl border border-box-border/90 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer event-card-trigger" 
          data-id={event.id}
        >
          {/* Top Image Cover Wrapper */}
          <div className="relative w-full h-64 sm:h-72">
            {/* Top Image Cover */}
            {event.poster && event.poster.trim() !== '' ? (
              <div className="absolute inset-0 overflow-hidden bg-slate-950 rounded-t-2xl">
                <img 
                  src={getAssetPath(event.poster)} 
                  alt={event.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent"></div>
              </div>
            ) : (
              <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-ink via-[#111C44] to-slate-950 rounded-t-2xl flex flex-col items-center justify-center p-6 text-center border-b border-slate-800/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.12),transparent_70%)]"></div>
                <div className="relative z-10 flex flex-col items-center justify-center space-y-2 opacity-90 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-slate-900/90 border border-accent-500/20 flex items-center justify-center text-accent-400 shadow-md">
                    <svg className="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-black font-mono tracking-widest text-slate-200">
                    Poster Coming Soon
                  </span>
                </div>
              </div>
            )}
            
            {/* Top-left Ribbon Tag */}
            <div className="absolute top-4 left-4 z-10 bg-ink text-accent-400 text-[10px] font-black font-mono tracking-wider px-3 py-1 rounded shadow-md border border-accent-400/20">
              Upcoming
            </div>

            {/* Centered overlapping category icon badge */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 bg-ink text-accent-500 h-12 w-12 rounded-full flex items-center justify-center shadow-lg border-2 border-paper">
              {getCategoryIcon(event.category)}
            </div>
          </div>

          {/* Body layout */}
          <div className="pt-8 px-6 pb-4 flex-grow flex flex-row gap-4 items-start">
            {/* Left Column: Date Stack */}
            <div className="w-16 flex-shrink-0 flex flex-col items-center border-r border-line pr-4 mt-1">
              <span className="text-3xl font-bold text-accent-600 leading-none">{day}</span>
              <span className="text-[10px] text-slate-900 font-bold font-mono tracking-wider mt-1.5 leading-none">{month}</span>
              <span className="text-[10px] text-slate-600 font-medium mt-1 leading-none">{year}</span>
            </div>

            {/* Right Column: Text content */}
            <div className="flex-grow text-left">
              <span className="text-[9px] font-bold font-mono tracking-widest text-accent-600 block mb-1">{event.category}</span>
              <h3 className="text-base font-bold text-slate-950 group-hover:text-accent-500 transition-colors tracking-wide leading-snug">
                <span>{event.title}</span>
                {event.edition && (
                  <span className="block mt-0.5">
                    {event.edition}
                  </span>
                )}
              </h3>
              {event.speaker && (
                <div className="text-[11px] font-bold text-accent-600 mt-1.5 font-mono tracking-wider whitespace-pre-line">
                  {event.speaker2 ? `Speakers: ${event.speaker} & ${event.speaker2}` : `Speaker: ${event.speaker}`}
                </div>
              )}
            </div>
          </div>

          {/* Footer metadata details: Distinct colors for Time (Maroon) and Location (Teal), centered */}
          <div className="border-t border-line pt-3.5 px-6 flex flex-col items-center justify-center space-y-2 text-xs font-medium tracking-wide text-center">
            {/* Time (Line 1 - Maroon) */}
            <div className="flex items-center justify-center space-x-1.5 w-full text-[#7A1E1B] font-medium">
              <svg className="h-4 w-4 text-[#7A1E1B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate">{event.time}</span>
            </div>
            
            {/* Location (Line 2 - Teal) */}
            <div className="flex items-center justify-center space-x-1.5 w-full text-teal-800 font-medium">
              <svg className="h-4 w-4 text-teal-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          {/* Action button */}
          <div className="px-6 pb-6 pt-3.5 mt-auto">
            <div className="w-full text-center border border-box-border/60 py-2.5 rounded text-xs font-black font-mono tracking-wider text-slate-700 group-hover:bg-ink group-hover:text-accent-500 group-hover:border-ink transition-all duration-300 flex items-center justify-center gap-1.5">
              Register Now
              <svg className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== PAST EVENT CARD LAYOUT ==================== */
        <div 
          onClick={onClick}
          className="group bg-box rounded-2xl border border-box-border/90 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer event-card-trigger" 
          data-id={event.id}
        >
          {/* Top Image Cover Wrapper */}
          <div className="relative w-full h-64 sm:h-72">
            {/* Top Image Cover */}
            {event.poster && event.poster.trim() !== '' ? (
              <div className="absolute inset-0 overflow-hidden bg-ink/95 rounded-t-2xl">
                <img 
                  src={getAssetPath(event.poster)} 
                  alt={event.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent"></div>
              </div>
            ) : (
              <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-ink via-[#111C44] to-slate-950 rounded-t-2xl flex flex-col items-center justify-center p-6 text-center border-b border-slate-800/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.08),transparent_70%)]"></div>
                <div className="relative z-10 flex flex-col items-center justify-center space-y-2 opacity-90 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-accent-400 shadow-md">
                    <svg className="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-black font-mono tracking-widest text-slate-200">
                    Poster Coming Soon
                  </span>
                </div>
              </div>
            )}
            
            {/* Top-left stacked date badge */}
            <div className="absolute top-4 left-4 z-10 bg-ink/95 border border-slate-800 text-white rounded text-center w-12 py-1.5 shadow-lg flex flex-col justify-center">
              <span className="text-xs text-accent-400 font-bold font-mono tracking-wider leading-none">{month}</span>
              <span className="text-lg font-bold leading-none mt-1">{day}</span>
              <span className="text-[9px] text-slate-300 font-bold leading-none mt-0.5">{year}</span>
            </div>

            {/* Centered overlapping category icon badge */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 bg-box text-slate-800 h-12 w-12 rounded-full flex items-center justify-center shadow-lg border-2 border-accent-400">
              <div className="text-ink">
                {getCategoryIcon(event.category)}
              </div>
            </div>
          </div>

          {/* Body layout: Centered */}
          <div className="pt-8 px-6 pb-6 flex-grow flex flex-col justify-between text-center">
            <div className="space-y-2.5">
              <span className="text-[9px] font-extrabold font-mono tracking-widest text-accent-600 block">{event.category}</span>
              <h3 className="text-lg font-extrabold text-ink group-hover:text-accent-500 transition-colors tracking-wide leading-tight">
                <span>{event.title}</span>
                {event.edition && (
                  <span className="block mt-0.5">
                    {event.edition}
                  </span>
                )}
              </h3>
              {event.speaker && (
                <div className="text-[11px] font-bold text-accent-600 mt-1.5 font-mono tracking-wider whitespace-pre-line">
                  {event.speaker2 ? `Speakers: ${event.speaker} & ${event.speaker2}` : `Speaker: ${event.speaker}`}
                </div>
              )}
            </div>

            {/* Footer divider and metadata row */}
            <div className="border-t border-line pt-4 mt-6 flex items-center justify-center gap-4 text-[10px] sm:text-xs text-slate-500 font-bold font-mono tracking-wider">
              {/* Date */}
              <div className="flex items-center space-x-1">
                <svg className="h-4 w-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formattedDate}</span>
              </div>
              
              {/* Location */}
              <div className="flex items-center space-x-1 max-w-[140px] truncate">
                <svg className="h-4 w-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
