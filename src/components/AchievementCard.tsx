import React, { useState } from 'react';
import { getAssetPath } from '../utils/assetPath';

export interface Achievement {
  id: string;
  name: string;
  program: string;
  department: string;
  batch?: string;
  title: string;
  awardBody: string;
  category: string;
  date: string;
  year?: string;
  image?: string;
  description: string;
  tags?: string[];
  link?: string;
}

interface AchievementCardProps {
  achievement: Achievement;
  onSelect?: (achievement: Achievement) => void;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Research & Publications':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Competitions & Hackathons':
      return 'bg-accent-50 text-accent-700 border-accent-200';
    case 'Fellowships & Awards':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Academic & Institute Honors':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Sports & Extra-Curriculars':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-50 text-slate-700 border-line';
  }
};

export default function AchievementCard({ achievement, onSelect }: AchievementCardProps) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(achievement.name);
  const categoryColorClass = getCategoryColor(achievement.category);
  const hasImage = Boolean(achievement.image && !imageError);

  return (
    <div className="bg-box rounded-2xl border border-box-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full">
      {/* Top Accent Line */}
      <div className="h-1.5 w-full bg-ink group-hover:bg-accent-400 transition-colors duration-300"></div>

      <div className="p-6 sm:p-7 flex-grow flex flex-col">
        {/* Header: Photo / Initials Avatar + Student Meta */}
        <div className="flex items-start gap-4 mb-5">
          <div className="relative flex-shrink-0">
            {hasImage ? (
              <img
                src={getAssetPath(achievement.image)}
                alt={achievement.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-box-border/60 shadow-sm group-hover:border-accent-400/50 group-hover:scale-105 transition-all duration-300"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-ink to-slate-800 text-accent-400 font-light text-xl sm:text-2xl flex items-center justify-center shadow-sm border border-box-border/60 group-hover:from-accent-500 group-hover:to-accent-600 group-hover:text-slate-950 transition-all duration-300 select-none">
                {initials}
              </div>
            )}
            {/* Year Tag Badge */}
            {achievement.year && (
              <span className="absolute -bottom-2 -right-2 bg-slate-900 text-accent-400 text-[10px] font-light px-2 py-0.5 rounded-full border border-slate-700 shadow-sm">
                {achievement.year}
              </span>
            )}
          </div>

          <div className="space-y-1 min-w-0 flex-1 text-left">
            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono tracking-wider border ${categoryColorClass} mb-1 truncate max-w-full`}>
              {achievement.category}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-accent-600 transition-colors">
              {achievement.name}
            </h3>
            <p className="text-xs font-medium text-slate-700 truncate">
              {achievement.program}
            </p>
            {achievement.batch && (
              <p className="text-[11px] font-medium text-slate-600">
                Batch: {achievement.batch}
              </p>
            )}
          </div>
        </div>

        {/* Achievement Title & Organization */}
        <div className="space-y-2 mb-4 text-left border-t border-line pt-4">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-accent-600 font-mono tracking-wide">
            <svg className="w-4 h-4 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="truncate">{achievement.awardBody}</span>
          </div>

          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
            {achievement.title}
          </h4>

          <p className="text-xs text-slate-800 font-normal leading-relaxed line-clamp-3">
            {achievement.description}
          </p>
        </div>

        {/* Tags */}
        {achievement.tags && achievement.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {achievement.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100/90 text-slate-800 group-hover:bg-accent-50 group-hover:text-accent-800 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 py-3.5 bg-slate-50/70 border-t border-line flex items-center justify-between text-xs">
        <span className="text-[11px] font-medium text-slate-600">
          {achievement.date}
        </span>

        <div className="flex items-center gap-2">
          {achievement.link && (
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-800 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Link</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {onSelect && (
            <button
              onClick={() => onSelect(achievement)}
              className="inline-flex items-center gap-1 font-semibold text-accent-600 hover:text-accent-700 transition-colors cursor-pointer"
            >
              <span>Details</span>
              <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
