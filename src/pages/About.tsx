import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import TimelineSection from '../components/about/TimelineSection';
import aboutData from '../data/about.json';

export default function About() {
  const {
    header,
    associationProfile,
    academicContext,
    corePurpose,
    visionMission,
    objectivesSection,
    timeline,
    teamReferral
  } = aboutData;

  const { vision, mission } = visionMission;

  return (
    <MainLayout title={`AMSA | ${header.title}`}>
      {/* Page Header */}
      <div className="bg-ink text-white pt-28 pb-8 border-b border-slate-900 relative overflow-hidden">
        {/* Subtle background gradient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(212,175,55,0.06),_transparent_50%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <span className="text-xs font-bold text-accent-500 font-mono tracking-widest mb-2 block">{header.tag}</span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{header.title}</h1>
          <p className="font-display italic font-light text-slate-300 text-sm sm:text-base md:text-lg mt-2 max-w-xl">
            {header.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 relative z-10">
        
        {/* Section 1: Who We Are & The Department */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: The Association */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="border-l-4 border-l-accent-500 pl-4">
              <span className="text-xs font-bold text-accent-600 font-mono tracking-widest block">{associationProfile.tag}</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">{associationProfile.title}</h2>
            </div>
            <div className="space-y-4 text-slate-800 text-sm sm:text-base leading-relaxed">
              {associationProfile.history.map((para, index) => (
                <p key={`history-${index}`}>{para}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Our Department */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="border-l-4 border-l-teal-600 pl-4">
              <span className="text-xs font-bold text-teal-600 font-mono tracking-widest block">{academicContext.tag}</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">{academicContext.title}</h2>
            </div>
            <div className="space-y-4 text-slate-800 text-sm sm:text-base leading-relaxed">
              {academicContext.paragraphs.map((para, index) => (
                <p key={`dept-${index}`}>{para}</p>
              ))}
            </div>
            {academicContext.websiteLink && (
              <a 
                href={academicContext.websiteLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between p-4 rounded-xl border border-[#7A1E1B]/15 bg-gradient-to-r from-[#7A1E1B]/5 to-[#CA8A04]/5 hover:from-[#7A1E1B]/10 hover:to-[#CA8A04]/10 hover:border-[#CA8A04]/40 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7A1E1B]/10 text-[#7A1E1B] group-hover:bg-[#CA8A04] group-hover:text-white transition-all duration-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#7A1E1B] transition-colors">
                      {academicContext.websiteLink.text}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Explore academic programs, research labs, and faculty profiles
                    </p>
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 group-hover:bg-[#CA8A04]/10 group-hover:text-[#CA8A04] text-slate-400 group-hover:translate-x-1 transition-all duration-300">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            )}
          </div>
        </section>

        {/* Section 2: Why We Do What We Do (Highlighted Callout Card) */}
        <section className="relative bg-ink text-white p-8 sm:p-12 lg:p-16 rounded-2xl overflow-hidden border border-slate-950 shadow-2xl">
          {/* Background pattern decorations */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(212,175,55,0.06),_transparent_40%)] pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-32 w-32 bg-paper/[0.01] rounded-bl-full pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
            <span className="text-xs font-bold text-accent-500 font-mono tracking-widest block">{corePurpose.tag}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{corePurpose.title}</h2>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
              {corePurpose.description}
            </p>
            {corePurpose.subtext && (
              <p className="text-xs sm:text-sm text-accent-400 font-bold font-mono tracking-wider max-w-2xl mx-auto pt-2">
                {corePurpose.subtext}
              </p>
            )}
          </div>
        </section>

        {/* Section 3: Vision & Mission (Grid) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Vision Card */}
          <div className="bg-slate-50/70 border border-box-border/80 hover:border-accent-400/40 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Our Vision
            </h3>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{vision}</p>
          </div>
          
          {/* Mission Card */}
          <div className="bg-slate-50/70 border border-box-border/80 hover:border-teal-400/40 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Our Mission
            </h3>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{mission}</p>
          </div>
        </section>

        {/* Section 4: Operational Goals */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-accent-600 font-mono tracking-widest block mb-2">{objectivesSection.tag}</span>
            <h2 className="text-3xl font-extrabold text-slate-900">{objectivesSection.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {objectivesSection.objectives.map((obj, index) => (
              <div key={`obj-${index}`} className="flex items-start space-x-4 bg-slate-50/40 p-6 rounded-lg border border-box-border/80 hover:bg-box hover:border-accent-400/30 transition-all duration-300">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-500/10 text-accent-600 text-xs font-bold flex-shrink-0">
                  {(index + 1)}
                </span>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed pt-0.5">
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: History & Milestones Horizontal Timeline */}
        {timeline && timeline.length > 0 && (
          <TimelineSection timeline={timeline} />
        )}

        {/* Section 6: Team Referral (Call To Action) */}
        <section className="border-t-2 border-line/90 pt-16 flex flex-col items-center justify-center text-center space-y-6">
          <div className="max-w-xl space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900">{teamReferral.title}</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              {teamReferral.description}
            </p>
          </div>
          <Link 
            to="/team" 
            className="inline-flex items-center px-6 py-3 rounded bg-ink text-accent-500 border border-accent-500/80 hover:bg-accent-500 hover:text-slate-950 transition-all duration-300 font-extrabold text-sm font-mono tracking-wider shadow-md"
          >
            {teamReferral.buttonText}
            <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>
    </MainLayout>
  );
}
