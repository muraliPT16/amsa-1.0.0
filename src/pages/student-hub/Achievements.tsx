import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentHubLayout from '../../layouts/StudentHubLayout';
import AchievementCard, { Achievement } from '../../components/AchievementCard';
import achievementsData from '../../data/achievements.json';
import { getAssetPath } from '../../utils/assetPath';

export default function Achievements() {
  const IS_UNDER_PREPARATION: boolean = true;

  const achievements = achievementsData as Achievement[];

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Extract unique categories and years
  const categories = ['all', ...Array.from(new Set(achievements.map((a) => a.category)))];
  const years = ['all', ...Array.from(new Set(achievements.map((a) => a.year).filter(Boolean)))];

  // Filtering
  const q = searchQuery.toLowerCase().trim();
  const filteredAchievements = achievements.filter((a) => {
    const matchesCategory = activeCategory === 'all' || a.category === activeCategory;
    const matchesYear = activeYear === 'all' || a.year === activeYear;
    const matchesSearch =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q) ||
      a.awardBody.toLowerCase().includes(q) ||
      a.program.toLowerCase().includes(q) ||
      (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)));
    return matchesCategory && matchesYear && matchesSearch;
  });

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedAchievement(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (IS_UNDER_PREPARATION) {
    return (
      <StudentHubLayout
        title="AMSA | Student Achievements"
        headerTitle="Achievements"
        headerSubtitle="Celebrating student excellence, groundbreaking research milestones, prestigious fellowships, and competition victories in the Department of Applied Mechanics & Biomedical Engineering."
        headerTag="Student Excellence & Recognition"
      >
        <div className="max-w-3xl mx-auto py-8 sm:py-12 text-center space-y-8">
          <div className="bg-box p-8 sm:p-12 rounded-3xl border border-box-border/60 shadow-xl shadow-slate-200/50 space-y-6 relative overflow-hidden text-center">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent-400 via-accent-500 to-ink"></div>

            <div className="w-20 h-20 mx-auto rounded-3xl bg-accent-50 border border-accent-200/60 flex items-center justify-center text-accent-500 shadow-inner">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.496m5.007 0a7.454 7.454 0 01-.982-3.172M9.496 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.766 1.35m7.774-6.842c.982.143 1.954.317 2.916.52a6.002 6.002 0 01-5.395 5.004M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.726 6.726 0 01-2.767 1.35m0 0a7.5 7.5 0 01-2.996 0" />
              </svg>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black font-mono tracking-wider bg-accent-100/80 text-accent-800 border border-accent-200">
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
              Share & Get Featured
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Share Your Achievements With Us!
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Have you recently published a paper, secured a prestigious fellowship, or won a hackathon or technical competition? We would love to celebrate your success and feature you on the AMSA website.
              </p>
            </div>

            <div className="pt-6 border-t border-line space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="mailto:amsa@smail.iitm.ac.in?subject=Student%20Achievement%20Submission"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent-500 hover:bg-accent-400 text-slate-950 font-black text-xs sm:text-sm font-mono tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>Submit Your Achievement</span>
                </a>
              </div>

              <p className="text-xs text-slate-500 font-light">
                Or write directly to{' '}
                <a href="mailto:amsa@smail.iitm.ac.in" className="text-accent-600 font-light hover:underline">
                  amsa@smail.iitm.ac.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </StudentHubLayout>
    );
  }

  return (
    <StudentHubLayout
      title="AMSA | Student Achievements"
      headerTitle="Achievements"
      headerSubtitle="Celebrating student excellence, groundbreaking research milestones, prestigious fellowships, and competition victories in the Department of Applied Mechanics & Biomedical Engineering."
      headerTag="Student Excellence & Recognition"
    >
      <div className="space-y-10 text-left">
        {/* Top Highlights Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-box p-5 rounded-2xl border border-box-border/60 shadow-sm text-left">
            <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 block mb-1">
              Total Honors
            </span>
            <div className="text-2xl sm:text-3xl font-light text-slate-900">
              {achievements.length}+
            </div>
            <span className="text-[11px] font-light text-accent-600 mt-1 block">
              Department Milestones
            </span>
          </div>

          <div className="bg-box p-5 rounded-2xl border border-box-border/60 shadow-sm text-left">
            <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 block mb-1">
              Research Awards
            </span>
            <div className="text-2xl sm:text-3xl font-light text-purple-700">
              {achievements.filter((a) => a.category === 'Research & Publications').length}
            </div>
            <span className="text-[11px] font-light text-purple-600 mt-1 block">
              Papers & Conferences
            </span>
          </div>

          <div className="bg-box p-5 rounded-2xl border border-box-border/60 shadow-sm text-left">
            <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 block mb-1">
              Fellowships
            </span>
            <div className="text-2xl sm:text-3xl font-light text-emerald-700">
              {achievements.filter((a) => a.category === 'Fellowships & Awards').length}
            </div>
            <span className="text-[11px] font-light text-emerald-600 mt-1 block">
              PMRF & DAAD WISE
            </span>
          </div>

          <div className="bg-box p-5 rounded-2xl border border-box-border/60 shadow-sm text-left">
            <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 block mb-1">
              Innovations
            </span>
            <div className="text-2xl sm:text-3xl font-light text-accent-600">
              {achievements.filter((a) => a.category === 'Competitions & Hackathons').length}
            </div>
            <span className="text-[11px] font-light text-accent-600 mt-1 block">
              Hackathon Wins
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-box p-6 sm:p-8 rounded-2xl border border-box-border/60 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Department Roll of Honor
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Explore student awards across academic years, research bodies, and sports boards.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search by name, award, or tag..."
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

          {/* Filter Categories */}
          <div className="space-y-3 pt-2 border-t border-line">
            <div className="flex items-center justify-between flex-wrap gap-3">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-ink text-accent-400 shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400">
                  Year:
                </span>
                <div className="flex items-center gap-1">
                  {years.map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setActiveYear(yr || 'all')}
                      className={`px-2.5 py-1 rounded-md text-xs font-light transition-all cursor-pointer ${
                        activeYear === yr
                          ? 'bg-accent-400 text-slate-950 font-light'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {yr === 'all' ? 'All' : yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        {filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <div key={achievement.id} className="h-full">
                <AchievementCard
                  achievement={achievement}
                  onSelect={(a) => setSelectedAchievement(a)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-box rounded-2xl border border-box-border/60 p-8 max-w-lg mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-accent-50 text-accent-600 mx-auto flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900">No achievements found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search terms or filter selections.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveYear('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold font-mono tracking-wider transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Submit Achievement Callout */}
        <section className="bg-ink rounded-2xl p-8 sm:p-10 border border-slate-900 shadow-xl relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(212,175,55,0.08),_transparent_50%)] pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-bold text-accent-400 font-mono tracking-widest block">
                Have an achievement to share?
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Submit Your Milestone to AMSA
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
                Published a paper, won a hackathon, or received a prestigious fellowship? Let the department celebrate your success on the AMSA Portal.
              </p>
            </div>
            <Link
              to="/contact?topic=achievement"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-400 hover:bg-accent-300 text-slate-950 font-black text-xs font-mono tracking-wider shadow-lg hover:scale-[1.02] transition-all flex-shrink-0"
            >
              <span>Submit Achievement</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedAchievement(null)}
          ></div>

          <div className="relative bg-box rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-box-border/60 z-10 max-h-[90vh] overflow-y-auto text-left">
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-start gap-4 mb-6">
              {selectedAchievement.image ? (
                <img
                  src={getAssetPath(selectedAchievement.image)}
                  alt={selectedAchievement.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-box-border/60 shadow-md flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-ink text-accent-400 font-light text-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                  {selectedAchievement.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black font-mono tracking-wider bg-accent-50 text-accent-700 border border-accent-200">
                  {selectedAchievement.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {selectedAchievement.name}
                </h3>
                <p className="text-xs font-light text-blue-700">
                  {selectedAchievement.program} • {selectedAchievement.department}
                </p>
                {selectedAchievement.batch && (
                  <p className="text-[11px] font-medium text-slate-400">
                    Batch: {selectedAchievement.batch}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4 border-t border-line pt-5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 block">
                  Award / Honor Title
                </span>
                <h4 className="text-lg font-black text-slate-900">
                  {selectedAchievement.title}
                </h4>
                <p className="text-xs font-light text-accent-600">
                  Conferred by: {selectedAchievement.awardBody}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 block">
                  Date Conferred
                </span>
                <p className="text-xs font-light text-slate-700">
                  {selectedAchievement.date}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 block">
                  Full Details & Description
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-box-border/60">
                  {selectedAchievement.description}
                </p>
              </div>

              {selectedAchievement.tags && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedAchievement.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-light px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {selectedAchievement.link && (
                <div className="pt-4 border-t border-line flex justify-end">
                  <a
                    href={selectedAchievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold font-mono tracking-wider transition-colors shadow-sm"
                  >
                    <span>View Publication / Credential</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </StudentHubLayout>
  );
}
