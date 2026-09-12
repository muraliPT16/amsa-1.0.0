import React from 'react';
import { Link } from 'react-router-dom';
import contactData from '../data/contact.json';
import { getAssetPath } from '../utils/assetPath';

export default function Footer() {
  const { email, phone, location, socials } = contactData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-slate-400 py-16 border-t border-slate-900 select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 lg:col-span-5 space-y-3.5">
            {/* Logo & Association Name */}
            <Link to="/" className="flex items-center space-x-4 group">
              <img 
                src={getAssetPath('/logos/amsa_logo.png')} 
                alt="AMSA Logo" 
                className="h-20 sm:h-24 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="flex flex-col">
                <span className="font-google font-extrabold text-base sm:text-lg tracking-wider text-white leading-tight group-hover:text-accent-400 transition-colors">
                  Applied Mechanics Student Association
                </span>
                <span className="text-[10px] text-accent-500 font-extrabold font-mono tracking-widest leading-none mt-1.5">
                  Empower. Connect. Lead.
                </span>
              </div>
            </Link>

            {/* Department and University Branding */}
            {/* <div className="bg-slate-950/40 p-3 sm:p-3.5 rounded-xl border border-slate-900 space-y-1">
              <span className="text-[9.5px] sm:text-[10px] xl:text-[10.5px] font-black font-mono text-accent-400 tracking-tight sm:tracking-normal block whitespace-nowrap">
                Department of Applied Mechanics & Biomedical Engineering
              </span>
              <span className="text-[9.5px] sm:text-[10px] xl:text-[10.5px] font-black font-mono text-white tracking-widest block whitespace-nowrap">
                Indian Institute of Technology Madras
              </span>
            </div> */}

            {/* 2-3 Line Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AMSA is the official student body of the <br />
              Department of Applied Mechanics and Biomedical Engineering, <br />
              Indian Institute of Technology Madras.
            </p>
          </div>

          {/* Column 2: Contact Details */}
          <div className="md:col-span-1 lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white font-mono tracking-widest border-b border-slate-900 pb-2">Contact Details</h4>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300">
              {/* Address */}
              <li className="flex items-start space-x-3">
                <div className="text-accent-500 mt-0.5 flex-shrink-0">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>{location}</span>
              </li>

              {/* Email */}
              <li className="flex items-center space-x-3">
                <div className="text-accent-500 flex-shrink-0">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href={`mailto:${email}`} className="hover:text-accent-400 transition-colors">{email}</a>
              </li>

              {/* Phone */}
              <li className="flex items-center space-x-3">
                <div className="text-accent-500 flex-shrink-0">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href={`tel:${phone}`} className="hover:text-accent-400 transition-colors">{phone}</a>
              </li>

              {/* Portal link */}
              <li className="flex items-center space-x-3">
                <div className="text-accent-500 flex-shrink-0">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <Link to="/" className="hover:text-accent-400 transition-colors font-medium">{typeof window !== 'undefined' ? window.location.hostname : 'amsa-iitm.github.io'}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Links & Connect */}
          <div className="md:col-span-1 lg:col-span-3 space-y-8">
            {/* Important Pages */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white font-mono tracking-widest border-b border-slate-900 pb-2">Useful Links</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-bold font-mono tracking-wider">
                <li><Link to="/" className="hover:text-accent-400 transition-colors block py-0.5">Home</Link></li>
                <li><Link to="/about" className="hover:text-accent-400 transition-colors block py-0.5">About Us</Link></li>
                <li><Link to="/team" className="hover:text-accent-400 transition-colors block py-0.5">Our Team</Link></li>
                <li><Link to="/events" className="hover:text-accent-400 transition-colors block py-0.5">Events</Link></li>
                <li><Link to="/gallery" className="hover:text-accent-400 transition-colors block py-0.5">Gallery</Link></li>
                <li><Link to="/student-hub" className="hover:text-accent-400 transition-colors block py-0.5">Students Hub</Link></li>
                <li><Link to="/collaborations" className="hover:text-accent-400 transition-colors block py-0.5">Collaborations</Link></li>
                <li><Link to="/contact" className="hover:text-accent-400 transition-colors block py-0.5">Contact Us</Link></li>
              </ul>
            </div>

            {/* Connect With Us & Social Icons */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white font-mono tracking-widest border-b border-slate-900 pb-2">Connect With Us</h4>
              <div className="flex flex-wrap gap-2.5">
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-accent-400 hover:border-accent-400 flex items-center justify-center transition-all duration-300 shadow" aria-label="LinkedIn">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
                {socials.instagram && (
                  <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-accent-400 hover:border-accent-400 flex items-center justify-center transition-all duration-300 shadow" aria-label="Instagram">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                )}
                {socials.youtube && (
                  <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-accent-400 hover:border-accent-400 flex items-center justify-center transition-all duration-300 shadow" aria-label="YouTube">
                    <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 002.11 2.11c1.858.508 9.388.508 9.388.508s7.53 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
                {socials.facebook && (
                  <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-accent-400 hover:border-accent-400 flex items-center justify-center transition-all duration-300 shadow" aria-label="Facebook">
                    <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {socials.github && (
                  <a href={socials.github} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-accent-400 hover:border-accent-400 flex items-center justify-center transition-all duration-300 shadow" aria-label="GitHub">
                    <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Divider Line */}
        <div className="my-10 border-t border-slate-900"></div>

        {/* Footer Bottom */}
        <div className="text-center text-xs text-slate-500 font-bold font-mono tracking-wider space-y-3">
          <p className="flex items-center justify-center gap-1">
            Designed & Developed with 
            <svg className="h-3.5 w-3.5 text-red-500 animate-pulse inline" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            by Team AMSA
          </p>
          <p className="text-[10px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            &copy; {currentYear} Applied Mechanics Student Association, Department of Applied Mechanics & Biomedical Engineering, Indian Institute of Technology Madras. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
