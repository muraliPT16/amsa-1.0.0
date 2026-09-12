import React from 'react';
import announcements from '../../data/announcements/announcements.json';
import AnnouncementCard from '../AnnouncementCard';

export default function Archive() {
  // Filter archived announcements (older than 90 days)
  const cutoffTime = new Date().getTime() - (90 * 24 * 60 * 60 * 1000);
  const archivedAnnouncements = announcements.filter(
    (ann) => new Date(ann.date).getTime() < cutoffTime
  );

  return (
    <section className="text-left">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-line pb-3 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-slate-400 rounded-full"></span>
        Archived Notices
      </h2>
      {archivedAnnouncements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {archivedAnnouncements.map((ann) => (
            <AnnouncementCard key={ann.id} announcement={ann} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500 font-medium italic">No archived notices at this time.</p>
      )}
    </section>
  );
}
