import React, { useState } from 'react';
import { getAssetPath } from '../utils/assetPath';

interface Member {
  id: string;
  name: string;
  role: string;
  vertical: string;
  image: string;
  email: string;
  socials: {
    linkedin?: string;
    instagram?: string;
  };
}

interface TeamCardProps {
  member: Member;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const formatSocialUrl = (url?: string) => {
  if (!url) return '';
  const trimmed = url.trim().replace(/\s+/g, '');
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

export default function TeamCard({ member }: TeamCardProps) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(member.name);
  const cleanEmail = member.email ? member.email.trim() : '';
  const linkedinUrl = formatSocialUrl(member.socials?.linkedin);
  const instagramUrl = formatSocialUrl(member.socials?.instagram);
  const hasImage = Boolean(member.image && !imageError);

  return (
    <div className="bg-box rounded-2xl border border-box-border/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group overflow-hidden">
      {/* Top Accent Line */}
      <div className="h-1.5 w-full bg-ink group-hover:bg-accent-400 transition-colors duration-300 z-10"></div>

      {/* Top Media / Photo Section */}
      <div className="relative w-full aspect-[4/4.6] bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden flex items-center justify-center">
        {hasImage ? (
          <img
            src={getAssetPath(member.image)}
            alt={member.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-ink to-slate-800 text-accent-400 select-none group-hover:from-slate-900 group-hover:to-slate-800 transition-all duration-300">
            <span className="text-4xl sm:text-5xl font-light tracking-wider">{initials}</span>
            <span className="text-[11px] font-bold font-mono tracking-widest text-slate-300 mt-2">AMSA</span>
          </div>
        )}

        {/* Soft bottom vignette gradient for contrast */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none"></div>

        {/* Department / Vertical Badge overlay */}
        <span className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold font-mono tracking-wider bg-slate-950/80 text-accent-400 backdrop-blur-md border border-paper/10 shadow-sm">
          {member.vertical}
        </span>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex flex-col flex-grow justify-between items-center text-center">
        <div className="w-full space-y-1">
          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-accent-600 transition-colors" title={member.name}>
            {member.name.trim()}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-blue-800">
            {member.role}
          </p>
        </div>

        {/* Contacts and Social Links Footer */}
        <div className="w-full pt-3.5 mt-3.5 border-t border-line space-y-2.5">
          {/* Email Address - Single Centered Line */}
          {cleanEmail ? (
            <a
              href={`mailto:${cleanEmail}`}
              className="flex items-center justify-center space-x-1.5 text-xs text-slate-800 hover:text-accent-600 font-medium truncate transition-colors max-w-full group/email"
              title={`Email ${member.name} (${cleanEmail})`}
            >
              <svg className="h-3.5 w-3.5 text-teal-600 group-hover/email:text-accent-600 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate">{cleanEmail}</span>
            </a>
          ) : (
            <div className="text-[11px] text-slate-400 font-medium">IIT Madras</div>
          )}

          {/* Social Media Badges - Centered below Email */}
          <div className="flex items-center justify-center space-x-3.5 min-h-[20px]">
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a66c2] hover:text-[#004182] hover:scale-110 transition-all duration-200"
                aria-label={`${member.name} LinkedIn`}
                title={`${member.name} LinkedIn`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e1306c] hover:text-[#c13584] hover:scale-110 transition-all duration-200"
                aria-label={`${member.name} Instagram`}
                title={`${member.name} Instagram`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
