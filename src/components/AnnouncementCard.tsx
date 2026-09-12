import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateFormatting';

interface Announcement {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
}

interface AnnouncementCardProps {
  announcement: Announcement;
}

const getCategoryColor = (cat: string) => {
  switch (cat.toLowerCase()) {
    case 'admission':
      return 'bg-blue-50 text-blue-700 border-blue-100';
    case 'achievement':
      return 'bg-purple-50 text-purple-700 border-purple-100';
    default:
      return 'bg-slate-50 text-slate-700 border-line';
  }
};

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <div className="bg-box p-6 rounded-xl border border-box-border/60 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3.5">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getCategoryColor(announcement.category)}`}>
          {announcement.category}
        </span>
        <span className="text-xs text-slate-600 font-semibold">
          {formatDate(announcement.date)}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2.5 line-clamp-2 leading-snug">
        {announcement.title}
      </h3>
      
      <p className="text-sm text-slate-800 font-normal leading-relaxed line-clamp-4 flex-grow">
        {announcement.content}
      </p>

      <div className="mt-4 pt-3.5 border-t border-slate-100">
        <Link to="/announcements" className="inline-flex items-center text-xs font-bold text-blue-800 hover:text-blue-900 transition-colors">
          Read Full Announcement
          <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
