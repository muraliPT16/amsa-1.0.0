import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { getAssetPath } from '../utils/assetPath';

export default function Collaborations() {
  return (
    <MainLayout title="AMSA | Collaborations & Partnerships">
      <div className="w-full">
      {/* 1. Hero Cover Section */}
      <div className="relative w-full h-[60vh] min-h-[460px] flex items-center justify-between bg-slate-950 text-white overflow-hidden select-none">
        {/* Cover Background Photo */}
        <img 
          src={getAssetPath('/images/collaborations/collab_cover.png')} 
          alt="Business Handshake Collaborations Cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-25 object-center" 
        />
        {/* Overlay dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-slate-950/15"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between w-full h-full pt-10">
          
          {/* Hero Left: Text Content */}
          <div className="w-full lg:w-7/12 space-y-6 text-left lg:pl-4">
            <span className="text-xs font-black text-accent-500 font-mono tracking-widest block mb-1">Stronger Together</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Collaborate. <br />
              Create <span className="text-accent-400">Impact</span>.
            </h1>
            <div className="w-16 h-1 bg-accent-400 rounded"></div>
            <p className="font-display italic font-light text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              We partner with industries, academia, and organizations to inspire innovation, provide opportunities, and shape the leaders of tomorrow.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link 
                to="/contact?subject=Partnership" 
                className="inline-flex items-center px-6 py-3 rounded bg-accent-500 hover:bg-accent-400 text-slate-950 text-xs font-extrabold font-mono tracking-wider shadow-lg shadow-accent-500/10 hover:scale-[1.02] transition-all duration-300"
              >
                Partner With Us
                <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a 
                href={getAssetPath('/documents/AMSA_Partnership_Deck.pdf')} 
                download
                className="inline-flex items-center px-5 py-3 rounded border border-paper/30 hover:border-paper/85 hover:bg-box/5 text-white text-xs font-extrabold font-mono tracking-wider transition-all duration-300"
              >
                Download Partnership Deck
                <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hero Right: Interactive CSS Dotted Connection Diagram */}
          <div className="hidden lg:flex w-5/12 items-center justify-center pr-10 relative">
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Animated dotted ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-paper/15 animate-[spin_120s_linear_infinite]"></div>
              
              {/* Central handshaking badge */}
              <div className="h-16 w-16 bg-ink border border-accent-400 text-accent-500 rounded-full flex items-center justify-center shadow-lg relative z-25">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              {/* Orbit Node 1: Industry (Top) */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-ink/95 border border-slate-800/80 px-4 py-2 rounded-full shadow-xl">
                <div className="h-8 w-8 rounded-full bg-slate-950 text-accent-400 flex items-center justify-center border border-slate-800">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-left leading-none">
                  <span className="text-xs font-black font-mono text-white block">Industry</span>
                  <span className="text-[8px] font-bold font-mono tracking-tight block mt-0.5">Expertise & Opps</span>
                </div>
              </div>

              {/* Orbit Node 2: Academia (Left) */}
              <div className="absolute top-1/2 -left-20 transform -translate-y-1/2 flex items-center space-x-3 bg-ink/95 border border-slate-800/80 px-4 py-2 rounded-full shadow-xl">
                <div className="h-8 w-8 rounded-full bg-slate-950 text-accent-400 flex items-center justify-center border border-slate-800">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div className="text-left leading-none">
                  <span className="text-xs font-black font-mono text-white block">Academia</span>
                  <span className="text-[8px] font-bold font-mono tracking-tight block mt-0.5">Knowledge & R&D</span>
                </div>
              </div>

              {/* Orbit Node 3: Students (Right) */}
              <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 flex items-center space-x-3 bg-ink/95 border border-slate-800/80 px-4 py-2 rounded-full shadow-xl">
                <div className="h-8 w-8 rounded-full bg-slate-950 text-accent-400 flex items-center justify-center border border-slate-800">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="text-left leading-none">
                  <span className="text-xs font-black font-mono text-white block">Students</span>
                  <span className="text-[8px] font-bold font-mono tracking-tight block mt-0.5">Skills & Innovation</span>
                </div>
              </div>

              {/* Orbit Node 4: Impact (Bottom) */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-ink/95 border border-slate-800/80 px-4 py-2 rounded-full shadow-xl">
                <div className="h-8 w-8 rounded-full bg-slate-950 text-accent-400 flex items-center justify-center border border-slate-800">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="text-left leading-none">
                  <span className="text-xs font-black font-mono text-white block">Impact</span>
                  <span className="text-[8px] font-bold font-mono tracking-tight block mt-0.5">Growth & Progress</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-28 relative z-10">

        {/* 2. "Why Collaborate With Us?" Section */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left side: Reasons/Bullets */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-2">
              <span className="text-xs font-black text-accent-600 font-mono tracking-widest block">Partnership Benefits</span>
              <h2 className="text-3xl font-extrabold text-ink">Why Collaborate With Us?</h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl">
                We bridge ideas with execution and connect you with talented, motivated, and future-ready students. Expand your engineering pipeline through our platform.
              </p>
            </div>

            {/* Bullets Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Item 1 */}
              <div className="flex items-start space-x-3.5">
                <div className="h-10 w-10 bg-ink text-accent-500 rounded-full flex items-center justify-center flex-shrink-0 shadow shadow-accent-500/10">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="space-y-0.5 text-left">
                  <h4 className="text-sm font-extrabold text-slate-900 font-mono tracking-wide">Access to Talent</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">Engage with highly skilled, enthusiastic biomechanics and mechanics students.</p>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="flex items-start space-x-3.5">
                <div className="h-10 w-10 bg-ink text-accent-500 rounded-full flex items-center justify-center flex-shrink-0 shadow shadow-accent-500/10">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="space-y-0.5 text-left">
                  <h4 className="text-sm font-extrabold text-slate-900 font-mono tracking-wide">Innovation & Ideas</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">Collaborate on engineering projects, hackathons, and real-world simulations.</p>
                </div>
              </div>
              
              {/* Item 3 */}
              <div className="flex items-start space-x-3.5">
                <div className="h-10 w-10 bg-ink text-accent-500 rounded-full flex items-center justify-center flex-shrink-0 shadow shadow-accent-500/10">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <div className="space-y-0.5 text-left">
                  <h4 className="text-sm font-extrabold text-slate-900 font-mono tracking-wide">Brand Visibility</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">Showcase your brand logos, banners, and brochures across all major department events.</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start space-x-3.5">
                <div className="h-10 w-10 bg-ink text-accent-500 rounded-full flex items-center justify-center flex-shrink-0 shadow shadow-accent-500/10">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="space-y-0.5 text-left">
                  <h4 className="text-sm font-extrabold text-slate-900 font-mono tracking-wide">Social Impact</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">Participate in community programs, engineering outreach, and healthcare support loops.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side: Color-coded stats mosaic */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-box border border-box-border/60 p-6 rounded-2xl flex flex-col justify-between text-left space-y-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-accent-500/10 border border-accent-500/20 text-accent-600 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-light text-ink block leading-none">500+</span>
                <span className="text-[12px] font-black font-mono tracking-wider text-slate-500 block leading-tight">Active Members</span>
              </div>
            </div>

            <div className="bg-[#F4F8FA] border border-[#D5E6F0]/60 p-6 rounded-2xl flex flex-col justify-between text-left space-y-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-light text-ink block leading-none">25+</span>
                <span className="text-[12px] font-black font-mono tracking-wider text-slate-500 block leading-tight">Events Every Year</span>
              </div>
            </div>

            <div className="bg-[#F2FAF8] border border-[#C5EAE1]/60 p-6 rounded-2xl flex flex-col justify-between text-left space-y-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-teal-500/10 border border-teal-500/20 text-teal-600 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-light text-ink block leading-none">10+</span>
                <span className="text-[12px] font-black font-mono tracking-wider text-slate-500 block leading-tight">Institutions Engaged</span>
              </div>
            </div>

            <div className="bg-[#FAF5FB] border border-[#EDDCF5]/60 p-6 rounded-2xl flex flex-col justify-between text-left space-y-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-purple-500/10 border border-purple-500/20 text-purple-600 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-light text-ink block leading-none">15+</span>
                <span className="text-[12px] font-black font-mono tracking-wider text-slate-500 block leading-tight">Industry Partners</span>
              </div>
            </div>
          </div>

        </section>

        {/* 3. "How We Collaborate" Section */}
        <section className="space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 sm:w-20 bg-accent-400/40"></div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink font-mono tracking-wide">How We Collaborate</h2>
              <div className="h-[1px] w-12 sm:w-20 bg-accent-400/40"></div>
            </div>
            <div className="text-accent-500 text-sm font-light">★</div>
            <p className="text-xs sm:text-sm text-slate-500 font-light max-w-lg mx-auto">Connecting academia with industry through diverse channels of cooperation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 max-w-6xl mx-auto">
            
            {/* Card 1 */}
            <div className="bg-box p-8 rounded-2xl border border-box-border/90 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 bg-ink text-accent-500 rounded-full flex items-center justify-center shadow-md">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 font-mono tracking-wide">Conduct Events</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Co-host technical symposiums, research hackathons, guest seminars, and training bootcamps.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-box p-8 rounded-2xl border border-box-border/90 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 bg-ink text-accent-500 rounded-full flex items-center justify-center shadow-md">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 font-mono tracking-wide">Knowledge Sharing</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Share domain expertise through interactive expert panels, masterclasses, and student mentorship loops.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-box p-8 rounded-2xl border border-box-border/90 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 bg-ink text-accent-500 rounded-full flex items-center justify-center shadow-md">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z" />
                </svg>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 font-mono tracking-wide">Sponsorships</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Support student innovations, provide hardware kits, and sponsor flagship events for brand exposure.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-box p-8 rounded-2xl border border-box-border/90 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 bg-ink text-accent-500 rounded-full flex items-center justify-center shadow-md">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 font-mono tracking-wide">Internships & Placements</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Post active internships, summer jobs, and graduate careers to access our pre-vetted database of students.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-box p-8 rounded-2xl border border-box-border/90 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 bg-ink text-accent-500 rounded-full flex items-center justify-center shadow-md">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 font-mono tracking-wide">Projects & Hackathons</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Collaborate on industry-defined research challenges, structural assessments, and prototyping contests.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-box p-8 rounded-2xl border border-box-border/90 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 bg-ink text-accent-500 rounded-full flex items-center justify-center shadow-md">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 font-mono tracking-wide">Research & Development</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Co-develop clinical/biomechanical solutions, run stress simulation models, and publish joint reviews.
              </p>
            </div>

          </div>
        </section>

        {/* 4. "Opportunities for Students" */}
        <section className="max-w-6xl mx-auto py-4">
          <div className="bg-box rounded-2xl p-8 sm:p-12 border border-box-border/80 shadow-xl flex flex-col lg:flex-row gap-10 items-center justify-between">
            
            <div className="space-y-4 max-w-lg text-left">
              <span className="text-xs font-black text-accent-600 font-mono tracking-widest block">Student Focus</span>
              <h2 className="text-3xl font-extrabold text-ink font-mono tracking-wide">Opportunities for Students</h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Through our collaborations, students gain access to career-defining opportunities. We strive to provide a pipeline of exposure that shapes engineering excellence.
              </p>
            </div>
            
            {/* Grid of 6 Pill badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:max-w-xl">
              
              <div className="flex items-center space-x-2.5 px-4.5 py-3.5 rounded-xl border border-box-border/60 bg-slate-50/50 text-xs font-bold font-mono tracking-wider text-slate-700 shadow-sm hover:shadow transition-shadow">
                <svg className="h-4.5 w-4.5 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Internships</span>
              </div>

              <div className="flex items-center space-x-2.5 px-4.5 py-3.5 rounded-xl border border-box-border/60 bg-slate-50/50 text-xs font-bold font-mono tracking-wider text-slate-700 shadow-sm hover:shadow transition-shadow">
                <svg className="h-4.5 w-4.5 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Live Projects</span>
              </div>

              <div className="flex items-center space-x-2.5 px-4.5 py-3.5 rounded-xl border border-box-border/60 bg-slate-50/50 text-xs font-bold font-mono tracking-wider text-slate-700 shadow-sm hover:shadow transition-shadow">
                <svg className="h-4.5 w-4.5 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Mentorship</span>
              </div>

              <div className="flex items-center space-x-2.5 px-4.5 py-3.5 rounded-xl border border-box-border/60 bg-slate-50/50 text-xs font-bold font-mono tracking-wider text-slate-700 shadow-sm hover:shadow transition-shadow">
                <svg className="h-4.5 w-4.5 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span>Placements</span>
              </div>

              <div className="flex items-center space-x-2.5 px-4.5 py-3.5 rounded-xl border border-box-border/60 bg-slate-50/50 text-xs font-bold font-mono tracking-wider text-slate-700 shadow-sm hover:shadow transition-shadow">
                <svg className="h-4.5 w-4.5 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                </svg>
                <span>Certifications</span>
              </div>

              <div className="flex items-center space-x-2.5 px-4.5 py-3.5 rounded-xl border border-box-border/60 bg-slate-50/50 text-xs font-bold font-mono tracking-wider text-slate-700 shadow-sm hover:shadow transition-shadow">
                <svg className="h-4.5 w-4.5 text-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>Exposure</span>
              </div>

            </div>
          </div>
        </section>

        {/* 5. Bottom CTA Ribbon Banner */}
        <section className="max-w-6xl mx-auto py-4">
          <div className="bg-ink rounded-2xl p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 border border-slate-950 shadow-2xl relative overflow-hidden text-white text-left">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(212,175,55,0.06),_transparent_40%)] pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-32 w-32 bg-paper/[0.01] rounded-bl-full pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 lg:space-x-6 relative z-10 text-center sm:text-left flex-1 min-w-0">
              <div className="h-13 w-13 sm:h-14 sm:w-14 bg-slate-950 border border-slate-800 text-accent-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold font-mono tracking-wide md:whitespace-nowrap">
                  Let's Build Something Extraordinary Together
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-2xl">
                  Whether you want to collaborate, sponsor, mentor, or hire, we'd love to connect and explore possibilities.
                </p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-4 lg:ml-6 relative z-10 flex-shrink-0">
              <Link 
                to="/contact?subject=Partnership" 
                className="inline-flex items-center px-6 py-3 rounded bg-accent-500 hover:bg-accent-400 text-slate-950 text-xs font-extrabold font-mono tracking-wider shadow-lg shadow-accent-500/10 hover:shadow-accent-500/20 hover:scale-[1.02] transition-all duration-300 whitespace-nowrap"
              >
                Let's Connect
                <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </div>
      </div>
    </MainLayout>
  );
}
