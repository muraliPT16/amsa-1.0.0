import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import upcomingEvents from '../data/events/upcoming.json';
import pastEvents from '../data/events/archive.json';
import EventCard from '../components/EventCard';
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

export default function Events() {
  const routeLocation = useLocation();
  const searchParams = new URLSearchParams(routeLocation.search);
  const activeId = searchParams.get('id') || searchParams.get('event');

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort upcoming events by date ascending (first-to-happen, left to right)
  const sortedUpcomingEvents = [...upcomingEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  ) as Event[];

  // Sort past events by date descending
  const sortedPastEvents = [...pastEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ) as Event[];

  const allEvents = [...sortedUpcomingEvents, ...sortedPastEvents];

  // Helper to check if event is upcoming
  const isUpcomingEvent = (event: Event) => {
    return sortedUpcomingEvents.some(e => e.id === event.id);
  };

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('overflow-hidden');
    // We delay clearing selectedEvent slightly for smooth transition out
    setTimeout(() => {
      setSelectedEvent(null);
    }, 300);
  };

  // URL query sync
  useEffect(() => {
    if (activeId) {
      const matchedEvent = allEvents.find(e => e.id === activeId);
      if (matchedEvent) {
        openModal(matchedEvent);
      }
    }
  }, [activeId]);

  // Esc key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter logic
  const filteredPastEvents = activeFilter === 'all'
    ? sortedPastEvents
    : sortedPastEvents.filter(e => e.date.substring(0, 4) === activeFilter);

  return (
    <MainLayout title="AMSA | Events & Workshops">
      {/* Events Cover Header */}
      <div className="relative w-full h-[55vh] min-h-[420px] flex items-center justify-start bg-slate-950 text-white overflow-hidden select-none">
        <img 
          src={getAssetPath('/images/events/events_cover.png')} 
          alt="Lecture Auditorium Events Cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-25 object-center" 
        />
        {/* Overlay dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-slate-950/10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left mr-auto max-w-3xl space-y-6">
          <span className="text-xs font-bold text-accent-500 font-mono tracking-widest block mb-1">AMSA Gatherings</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Events That Inspire, <br />
            <span className="text-accent-400">Connections</span> That Last.
          </h1>
          <div className="w-16 h-1 bg-accent-400 rounded"></div>
          <p className="font-display italic font-light text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl pt-2">
            From insightful talks to exciting cultural nights, our events create opportunities to learn, grow, and bond together.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 relative z-10">
        
        {/* Section 1: Upcoming Events */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 sm:w-20 bg-accent-400/40"></div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink font-mono tracking-wide">Upcoming Events</h2>
              <div className="h-[1px] w-12 sm:w-20 bg-accent-400/40"></div>
            </div>
            <div className="text-accent-500 text-sm font-light">★</div>
            <p className="text-xs sm:text-sm text-slate-500 font-light max-w-lg mx-auto">Exciting events ahead! Mark your calendars and join us.</p>
          </div>

          {sortedUpcomingEvents.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-8">
              {sortedUpcomingEvents.map((event, index) => (
                <div key={event.id} className="w-full sm:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)] max-w-md flex-shrink-0 flex flex-col h-full">
                  <EventCard 
                    event={event} 
                    index={index} 
                    isUpcoming={true} 
                    onClick={() => openModal(event)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-xl border border-box-border/60 p-8 max-w-lg mx-auto">
              <p className="text-slate-500 font-medium">No upcoming events scheduled currently. Check back soon!</p>
            </div>
          )}
        </section>

        {/* Section 2: Past Events */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 sm:w-20 bg-accent-400/40"></div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink font-mono tracking-wide">Past Events</h2>
              <div className="h-[1px] w-12 sm:w-20 bg-accent-400/40"></div>
            </div>
            <div className="text-accent-500 text-sm font-light">★</div>
            <p className="text-xs sm:text-sm text-slate-500 font-light max-w-lg mx-auto">A look back at the moments that made an impact. Filter events by academic year below.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {['all', '2025', '2024', '2023'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-xs font-bold font-mono tracking-wider rounded border transition-all duration-300 outline-none ${
                  activeFilter === filter
                    ? 'border-ink bg-ink text-accent-500 shadow-sm'
                    : 'border-line text-slate-600 hover:border-accent-400 hover:text-accent-500'
                }`}
              >
                {filter === 'all' ? 'All' : filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="past-events-grid">
            {filteredPastEvents.map((event, index) => (
              <div 
                key={event.id}
                className="past-event-item-wrapper transition-all duration-300"
              >
                <EventCard 
                  event={event} 
                  index={index + 10} 
                  isUpcoming={false} 
                  onClick={() => openModal(event)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Propose an Event CTA Banner */}
        <section className="max-w-5xl mx-auto py-4">
          <div className="bg-ink rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between border border-slate-950 shadow-2xl relative overflow-hidden text-white text-left">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(212,175,55,0.06),_transparent_40%)] pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-32 w-32 bg-paper/[0.01] rounded-bl-full pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10 text-center sm:text-left">
              <div className="h-14 w-14 bg-slate-950 border border-slate-800 text-accent-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold font-mono tracking-wide">Have an Idea for an Event?</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl">We'd love to hear from you! Let's collaborate to build programs that inspire, connect, and lead.</p>
              </div>
            </div>
            <div className="mt-6 md:mt-0 relative z-10 flex-shrink-0">
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 rounded bg-accent-500 hover:bg-accent-400 text-slate-950 text-xs font-extrabold font-mono tracking-wider shadow-lg shadow-accent-500/10 hover:shadow-accent-500/20 hover:scale-[1.02] transition-all duration-300"
              >
                Propose an Event
                <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* Interactive Lightbox Modal Overlay */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none transition-all duration-300 ${
          isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Dark Backdrop */}
        <div 
          onClick={closeModal}
          className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm cursor-pointer pointer-events-auto"
        ></div>

        {/* Modal Window Box - Uniform and Consistent Large Size for All Events */}
        {selectedEvent && (
          <div 
            className={`relative bg-box rounded-2xl max-w-5xl lg:max-w-6xl w-full h-[90vh] md:h-[680px] lg:h-[740px] shadow-2xl border border-box-border/60 flex flex-col md:flex-row pointer-events-auto overflow-hidden transform transition-transform duration-300 ${
              isModalOpen ? 'scale-100' : 'scale-95'
            }`}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900 hover:scale-110 transition-all duration-200 cursor-pointer shadow-md" 
              aria-label="Close details"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Left Side: Poster & Video Preview (Maximized Display Size) */}
            <div className="w-full md:w-1/2 bg-slate-950 p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center relative border-r border-slate-900 flex-shrink-0 h-[40vh] md:h-full overflow-hidden">
              {/* Background gradient glow */}
              <div className="absolute inset-0 bg-radial from-slate-900/60 to-slate-950 pointer-events-none"></div>

              {/* Event Poster Image (Maximized within layout) */}
              {selectedEvent.poster && selectedEvent.poster.trim() !== '' && (
                <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={getAssetPath(selectedEvent.poster)} 
                    alt={selectedEvent.title} 
                    className="w-full h-full object-contain rounded-lg shadow-2xl block" 
                  />
                </div>
              )}
              
              {/* Embedded Video Player */}
              {selectedEvent.video && selectedEvent.video.trim() !== '' && (
                <div className="relative z-10 w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black my-auto">
                  <iframe 
                    className="w-full h-full border-0" 
                    src={isModalOpen ? selectedEvent.video : ""} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              
              {/* Media Fallback Card */}
              {(!selectedEvent.poster || selectedEvent.poster.trim() === '') && (!selectedEvent.video || selectedEvent.video.trim() === '') && (
                <div className="relative z-10 text-center py-16 text-slate-400 font-bold font-mono tracking-wider flex flex-col items-center justify-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-accent-400 shadow-inner">
                    <svg className="h-8 w-8 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
                    </svg>
                  </div>
                  <span className="text-sm tracking-widest text-slate-200 font-light">
                    Poster Coming Soon
                  </span>
                  <span className="text-xs tracking-wider text-slate-400 font-medium normal-case">
                    {isUpcomingEvent(selectedEvent) ? 'Event poster and details will be updated soon.' : 'Event poster was not attached.'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Right Side: Text details & Scrollable Info & Fixed Footer */}
            <div className="w-full md:w-1/2 flex flex-col justify-between relative text-left h-[50vh] md:h-full overflow-hidden">
              
              {/* Scrollable Content Container */}
              <div className="p-6 sm:p-8 md:p-10 overflow-y-auto flex-grow space-y-6 scrollbar-thin select-text">
                <div className="space-y-3 pr-8">
                  <span className="inline-block px-3 py-1 rounded text-[11px] font-extrabold font-mono tracking-wider bg-accent-500/10 text-accent-700 border border-accent-500/20">
                    {selectedEvent.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug tracking-wide">
                    <span>{selectedEvent.title}</span>
                    {selectedEvent.edition && (
                      <span className="block mt-1">
                        {selectedEvent.edition}
                      </span>
                    )}
                  </h2>
                  {selectedEvent.speaker && (
                    <div className="text-sm sm:text-base font-bold text-accent-700 font-mono tracking-wider flex items-start gap-2 whitespace-pre-line text-left pt-1">
                      <svg className="h-5 w-5 text-accent-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>
                        {selectedEvent.speaker2 ? `Speakers: ${selectedEvent.speaker} & ${selectedEvent.speaker2}` : `Speaker: ${selectedEvent.speaker}`}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-extrabold font-mono tracking-wider pt-1">
                    <svg className="h-4 w-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
                
                <div className="border-t border-line pt-5 space-y-5">
                  {/* Grid info details */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-box-border/60">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-extrabold font-mono tracking-widest block">Timing</span>
                      <p className="text-xs sm:text-sm text-slate-800 font-light">{selectedEvent.time}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-extrabold font-mono tracking-widest block">Venue</span>
                      <p className="text-xs sm:text-sm text-slate-800 font-light truncate">{selectedEvent.location}</p>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-extrabold font-mono tracking-widest block font-medium">About this Program</span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {selectedEvent.description}
                    </p>
                  </div>

                  {/* Outcome Card */}
                  {selectedEvent.outcome && (
                    <div className="bg-accent-500/[0.04] p-4 sm:p-5 rounded-xl border border-accent-500/15 space-y-2">
                      <span className="text-[10px] text-accent-700 font-extrabold font-mono tracking-widest block">Key Outcomes & Achievements</span>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {selectedEvent.outcome}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Fixed Bottom Action Bar */}
              <div className="px-6 sm:px-8 md:px-10 py-5 bg-slate-50 border-t border-line flex items-center justify-between flex-shrink-0">
                <span className="text-xs text-slate-500 font-bold font-mono tracking-wider hidden sm:inline-block">
                  {isUpcomingEvent(selectedEvent) ? 'Upcoming AMSA Event' : 'AMSA Event Archive'}
                </span>

                <div className="flex items-center gap-3 ml-auto">
                  {!isUpcomingEvent(selectedEvent) && selectedEvent.albumId && (
                    <Link 
                      to={`/gallery?id=${selectedEvent.albumId}`}
                      onClick={() => {
                        document.body.classList.remove('overflow-hidden');
                      }}
                      className="inline-flex items-center px-6 py-3 rounded-lg bg-accent-500 hover:bg-accent-400 text-slate-950 hover:scale-[1.02] transition-all duration-300 text-xs font-extrabold font-mono tracking-wider shadow-md"
                    >
                      See Photos
                      <svg className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </Link>
                  )}
                  {isUpcomingEvent(selectedEvent) && (
                    selectedEvent.link && selectedEvent.link.trim() !== '' ? (
                      selectedEvent.link.startsWith('http://') || selectedEvent.link.startsWith('https://') || selectedEvent.link.startsWith('mailto:') ? (
                        <a 
                          href={selectedEvent.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 rounded-lg bg-ink text-accent-400 border border-accent-500/80 hover:bg-accent-500 hover:text-slate-950 transition-all duration-300 text-xs font-extrabold font-mono tracking-wider shadow-md"
                        >
                          Register for Event
                          <svg className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <Link 
                          to={selectedEvent.link}
                          onClick={() => {
                            document.body.classList.remove('overflow-hidden');
                          }}
                          className="inline-flex items-center px-6 py-3 rounded-lg bg-ink text-accent-400 border border-accent-500/80 hover:bg-accent-500 hover:text-slate-950 transition-all duration-300 text-xs font-extrabold font-mono tracking-wider shadow-md"
                        >
                          Register for Event
                          <svg className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )
                    ) : (
                      <Link 
                        to={`/contact?event=${encodeURIComponent(selectedEvent.title)}`}
                        onClick={() => {
                          document.body.classList.remove('overflow-hidden');
                        }}
                        className="inline-flex items-center px-6 py-3 rounded-lg bg-ink text-accent-400 border border-accent-500/80 hover:bg-accent-500 hover:text-slate-950 transition-all duration-300 text-xs font-extrabold font-mono tracking-wider shadow-md"
                      >
                        Register for Event
                        <svg className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )
                  )}
                </div>
              </div>

            </div>
            
          </div>
        )}
      </div>
    </MainLayout>
  );
}
