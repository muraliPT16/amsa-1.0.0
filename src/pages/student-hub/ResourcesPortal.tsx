import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentHubLayout from '../../layouts/StudentHubLayout';
import hubData from '../../data/student-hub.json';

interface ResourcesPortalProps {
  initialCategory?: string;
}

export default function ResourcesPortal({ initialCategory }: ResourcesPortalProps = {}) {
  const IS_UNDER_PREPARATION: boolean = true;

  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const {
    resources = [],
    internships = [],
    placements = [],
    competitions = [],
    scholarships = [],
    higherStudies = [],
    careerGuidance = []
  } = hubData;

  const categories = [
    { id: 'all', name: 'All Resources', count: resources.length + internships.length + placements.length + competitions.length + scholarships.length + higherStudies.length + careerGuidance.length },
    { id: 'academic', name: 'Academic Materials', count: resources.length },
    { id: 'internships', name: 'Internships', count: internships.length },
    { id: 'placements', name: 'Placements', count: placements.length },
    { id: 'competitions', name: 'Competitions', count: competitions.length },
    { id: 'scholarships', name: 'Scholarships', count: scholarships.length },
    { id: 'higher-studies', name: 'Higher Studies', count: higherStudies.length },
    { id: 'career-guidance', name: 'Career Guidance', count: careerGuidance.length },
  ];

  // Filtering helpers
  const q = searchQuery.toLowerCase().trim();

  const filteredResources = resources.filter(r => !q || r.title.toLowerCase().includes(q) || r.type.toLowerCase().includes(q));
  const filteredInternships = internships.filter(i => !q || i.role.toLowerCase().includes(q) || i.company.toLowerCase().includes(q) || i.requirements.toLowerCase().includes(q));
  const filteredPlacements = placements.filter(p => !q || p.role.toLowerCase().includes(q) || p.company.toLowerCase().includes(q) || p.eligibility.toLowerCase().includes(q));
  const filteredCompetitions = competitions.filter(c => !q || c.title.toLowerCase().includes(q) || c.prize.toLowerCase().includes(q));
  const filteredScholarships = scholarships.filter(s => !q || s.name.toLowerCase().includes(q) || s.eligibility.toLowerCase().includes(q));
  const filteredHigherStudies = higherStudies.filter(h => !q || h.program.toLowerCase().includes(q) || h.university.toLowerCase().includes(q));
  const filteredCareer = careerGuidance.filter(g => !q || g.title.toLowerCase().includes(q) || g.speaker.toLowerCase().includes(q));

  const shouldShow = (catId: string) => activeCategory === 'all' || activeCategory === catId;

  if (IS_UNDER_PREPARATION) {
    return (
      <StudentHubLayout
        title="AMSA | Resources Portal"
        headerTitle="Resources Portal"
        headerSubtitle="Academic archives, reference materials, placement guides, and study resources curated for Applied Mechanics students."
        headerTag="Academic & Career Archives"
      >
        <div className="max-w-3xl mx-auto py-8 sm:py-12 text-center space-y-8">
          <div className="bg-box p-8 sm:p-12 rounded-3xl border border-box-border/60 shadow-xl shadow-slate-200/50 space-y-6 relative overflow-hidden text-center">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent-400 via-accent-500 to-ink"></div>

            <div className="w-20 h-20 mx-auto rounded-3xl bg-accent-50 border border-accent-200/60 flex items-center justify-center text-accent-600 shadow-inner">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black font-mono tracking-wider bg-accent-100/80 text-accent-800 border border-accent-200">
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
              Under Preparation
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Resources for students will be uploaded soon
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                We are currently compiling verified textbook references, computational lab manuals, past course materials, internship opportunities, and placement archives for the department.
              </p>
            </div>

            <div className="pt-6 border-t border-box-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/70 p-5 rounded-2xl border border-box-border/60 text-left">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Have study materials or notes to contribute?</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Help fellow students by sharing verified academic resources.</p>
              </div>
              <a
                href="mailto:amsa@smail.iitm.ac.in?subject=Resource%20Contribution"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ink hover:bg-slate-900 text-accent-400 hover:text-accent-300 text-xs font-extrabold font-mono tracking-wider transition-all shadow-sm flex-shrink-0"
              >
                <span>Email Us</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </StudentHubLayout>
    );
  }

  return (
    <StudentHubLayout
      title="AMSA | Resources Portal"
      headerTitle="Resources Portal"
      headerSubtitle="Access textbooks, computational lab manuals, placement opportunities, active internships, and higher study archives."
      headerTag="Academic & Career Archives"
    >
      <div className="space-y-10 text-left">
        {/* Intro & Search Filter Bar */}
        <div className="bg-box p-6 sm:p-8 rounded-2xl border border-box-border/60 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Academic & Professional Resources
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Curated by AMSA for undergraduate, dual-degree, and postgraduate scholars.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search resources, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-box-border/60 rounded-xl text-xs sm:text-sm font-light text-slate-900 focus:bg-box focus:border-accent-400 focus:outline-none transition-all shadow-inner"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none border-t border-line">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-ink text-accent-400 shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === cat.id ? 'bg-accent-400 text-slate-950 font-light' : 'bg-slate-200 text-slate-600'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 1: Academic Materials */}
        {shouldShow('academic') && filteredResources.length > 0 && (
          <section id="academic" className="space-y-4">
            <div className="border-l-4 border-l-accent-500 pl-4">
              <span className="text-[10px] font-bold text-accent-600 font-mono tracking-widest block">Core Coursework</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">Academic & Course Resources</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((res) => (
                <div key={res.id} className="p-5 bg-box border border-box-border/60 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded font-mono tracking-wider inline-block">
                      {res.type}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-accent-600 transition-colors">
                      {res.title}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                    <span className="text-[11px] font-light text-slate-400">{res.size}</span>
                    <a
                      href={res.link || '#'}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink hover:bg-accent-500 text-accent-400 hover:text-slate-950 rounded-lg text-xs font-bold font-mono tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
                    >
                      <span>Download</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Internship Openings */}
        {shouldShow('internships') && filteredInternships.length > 0 && (
          <section id="internships" className="space-y-4">
            <div className="border-l-4 border-l-blue-600 pl-4">
              <span className="text-[10px] font-bold text-blue-600 font-mono tracking-widest block">Industrial & Research Training</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">Internship Openings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInternships.map((item) => (
                <div key={item.id} className="p-6 bg-box border border-box-border/60 rounded-xl shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-black text-slate-900">{item.role}</h4>
                      <p className="text-xs font-light text-blue-700">{item.company}</p>
                    </div>
                    <span className="text-[10px] font-light text-rose-700 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      Deadline: {item.deadline}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-box-border/60">
                    <span className="text-[10px] font-extrabold font-mono tracking-wider text-slate-400 block mb-1">Key Requirements</span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.requirements}</p>
                  </div>
                  <div className="flex justify-end pt-1">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-accent-600 transition-colors font-mono tracking-wider"
                    >
                      <span>Apply via AMSA Portal</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Placements */}
        {shouldShow('placements') && filteredPlacements.length > 0 && (
          <section id="placements" className="space-y-4">
            <div className="border-l-4 border-l-emerald-600 pl-4">
              <span className="text-[10px] font-bold text-emerald-600 font-mono tracking-widest block">Campus Recruitment</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">Placement Opportunities</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPlacements.map((plc) => (
                <div key={plc.id} className="p-6 bg-box border border-box-border/60 rounded-xl shadow-sm hover:shadow-md transition-all space-y-4">
                  <div>
                    <h4 className="text-base font-black text-slate-900">{plc.role}</h4>
                    <p className="text-xs font-light text-emerald-700">{plc.company}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-line text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block">Package</span>
                      <span className="font-light text-slate-800">{plc.package}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider block">Eligibility</span>
                      <span className="font-light text-slate-700">{plc.eligibility}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Competitions */}
        {shouldShow('competitions') && filteredCompetitions.length > 0 && (
          <section id="competitions" className="space-y-4">
            <div className="border-l-4 border-l-purple-600 pl-4">
              <span className="text-[10px] font-bold text-purple-600 font-mono tracking-widest block">Hackathons & Contests</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">Competitions & Challenges</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCompetitions.map((comp) => (
                <div key={comp.id} className="p-6 bg-box border border-box-border/60 rounded-xl shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-black text-slate-900">{comp.title}</h4>
                    <span className="text-[10px] font-light text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Due: {comp.deadline}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-line text-xs">
                    <span className="font-light text-purple-700">Prize Pool: {comp.prize}</span>
                    <a
                      href={comp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-light text-blue-700 hover:text-blue-800"
                    >
                      <span>Registration Link</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Scholarships */}
        {shouldShow('scholarships') && filteredScholarships.length > 0 && (
          <section id="scholarships" className="space-y-4">
            <div className="border-l-4 border-l-accent-500 pl-4">
              <span className="text-[10px] font-bold text-accent-600 font-mono tracking-widest block">Financial Grants</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">Scholarships & Grants</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredScholarships.map((schol) => (
                <div key={schol.id} className="p-6 bg-box border border-box-border/60 rounded-xl shadow-sm hover:shadow-md transition-all space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-black text-slate-900">{schol.name}</h4>
                    <span className="text-xs font-light text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                      {schol.amount}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    <strong className="text-slate-900">Eligibility:</strong> {schol.eligibility}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Higher Studies */}
        {shouldShow('higher-studies') && filteredHigherStudies.length > 0 && (
          <section id="higher-studies" className="space-y-4">
            <div className="border-l-4 border-l-teal-600 pl-4">
              <span className="text-[10px] font-bold text-teal-600 font-mono tracking-widest block">Global Opportunities</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">Higher Studies & Fellowships</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHigherStudies.map((hs) => (
                <div key={hs.id} className="p-6 bg-box border border-box-border/60 rounded-xl shadow-sm hover:shadow-md transition-all space-y-2">
                  <h4 className="text-base font-black text-slate-900">{hs.program}</h4>
                  <p className="text-xs font-light text-teal-700">{hs.university}</p>
                  <p className="text-[11px] font-light text-slate-400 pt-2 border-t border-line">
                    Application Deadline: {hs.deadline}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 7: Career Guidance */}
        {shouldShow('career-guidance') && filteredCareer.length > 0 && (
          <section id="career-guidance" className="space-y-4">
            <div className="border-l-4 border-l-indigo-600 pl-4">
              <span className="text-[10px] font-bold text-indigo-600 font-mono tracking-widest block">Alumni Mentorship</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">Career Guidance & Webinars</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCareer.map((cg) => (
                <div key={cg.id} className="p-6 bg-box border border-box-border/60 rounded-xl shadow-sm hover:shadow-md transition-all space-y-3">
                  <h4 className="text-base font-black text-slate-900">{cg.title}</h4>
                  <p className="text-xs font-light text-slate-600">
                    Speaker: <span className="text-indigo-700 font-light">{cg.speaker}</span>
                  </p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-line text-slate-500 font-light">
                    <span>Date: {cg.date}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-light text-slate-700">{cg.platform}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </StudentHubLayout>
  );
}
