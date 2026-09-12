import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import upcomingEvents from '../../data/events/upcoming.json';
import pastEvents from '../../data/events/archive.json';
import { sortEventsByDate } from '../../utils/eventSorting';
import EventCard from '../EventCard';

export default function UpcomingEvents() {
  const navigate = useNavigate();

  // Top 2 upcoming events (sorted ascending by date - first to happen)
  const nextUpcoming = sortEventsByDate(upcomingEvents, true).slice(0, 2);

  // 1 most recent completed event from archive (filtered and sorted descending by date)
  const recentPast = [...pastEvents]
    .filter(e => e.id && e.title && e.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 1);

  // Combine: 2 next upcoming + 1 recently finished event
  const featuredEvents = [
    ...nextUpcoming.map(e => ({ ...e, isUpcoming: true })),
    ...recentPast.map(e => ({ ...e, isUpcoming: false }))
  ];

  return (
    <section className="py-12 md:py-14 bg-transparent border-t border-line">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with decorative underline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-line/60 pb-5 mb-8">
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Featured Events
            </h2>
            <span className="absolute bottom-[-22px] left-0 w-24 h-1 bg-accent-400 rounded-full"></span>
          </div>
          <div className="mt-6 sm:mt-0">
            <Link 
              to="/events" 
              className="inline-flex items-center text-sm font-bold font-mono tracking-wider text-accent-600 hover:text-accent-700 transition-colors"
            >
              View All Events
              <svg className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Events Grid (2 Upcoming + 1 Recent Completed Event) */}
        {featuredEvents.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {featuredEvents.map((event, index) => (
              <div key={event.id} className="w-full sm:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)] max-w-md flex-shrink-0 flex flex-col h-full">
                <EventCard 
                  event={event} 
                  index={index} 
                  isUpcoming={event.isUpcoming} 
                  onClick={() => navigate(`/events?id=${event.id}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-box rounded border border-box-border/60 p-8">
            <p className="text-slate-500 font-medium">No events scheduled at this time. Check back soon!</p>
          </div>
        )}

      </div>
    </section>
  );
}
