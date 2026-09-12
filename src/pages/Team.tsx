import React from 'react';
import MainLayout from '../layouts/MainLayout';
import TeamCard from '../components/TeamCard';
import teamData from '../data/team/team.json';

interface TeamMember {
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

interface Vertical {
  category: string;
  members: TeamMember[];
}

export default function Team() {
  const advisors = teamData.advisors as TeamMember[];
  const secretaries = teamData.secretaries as TeamMember[];
  const verticals = teamData.verticals as Vertical[];

  return (
    <MainLayout title="AMSA | Our Team">
      {/* Page Header */}
      <div className="bg-ink text-white pt-28 pb-8 border-b border-slate-900 relative overflow-hidden">
        {/* Subtle background gradient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(212,175,55,0.06),_transparent_50%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <span className="text-xs font-bold text-accent-500 font-mono tracking-widest mb-2 block">Organization Directory</span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Meet the Team</h1>
          <p className="font-display italic font-light text-slate-300 text-sm sm:text-base md:text-lg mt-2 max-w-xl">
            The faculty advisors and student executive committee steering academic and operational initiatives at AMSA.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 relative z-10">
        
        {/* Tier 1: Patrons & Advisors */}
        <section className="space-y-8 text-left">
          <div className="border-l-4 border-l-accent-500 pl-4">
            <span className="text-xs font-bold text-accent-600 font-mono tracking-widest block">Executive Guidance</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Patrons & Advisors</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Providing academic direction and strategic guidance to the student body.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {advisors.map((advisor) => (
              <div key={advisor.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-24px)] max-w-xs sm:max-w-none">
                <TeamCard member={advisor} />
              </div>
            ))}
          </div>
        </section>

        {/* Tier 2: Executive Secretaries */}
        <section className="space-y-8 text-left">
          <div className="border-l-4 border-l-accent-500 pl-4">
            <span className="text-xs font-bold text-accent-600 font-mono tracking-widest block">Student Leadership</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Executive Secretaries</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Steering the overall operations, financial channels, and technical directives.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {secretaries.map((secretary) => (
              <div key={secretary.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-24px)] max-w-xs sm:max-w-none">
                <TeamCard member={secretary} />
              </div>
            ))}
          </div>
        </section>

        {/* Tier 3: Student Verticals */}
        <section className="space-y-16 text-left">
          <div className="border-l-4 border-l-accent-500 pl-4 mb-10">
            <span className="text-xs font-bold text-accent-600 font-mono tracking-widest block">Operational Core</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Student Verticals</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Dedicated verticals executing core development projects, event logistics, creative media, and outreach.</p>
          </div>

          <div className="space-y-16">
            {verticals.map((vertical, vIdx) => (
              <div key={vIdx} className="space-y-6">
                <h3 className="text-xl font-extrabold text-slate-900 border-b border-line pb-3 flex items-center justify-center gap-2 text-center">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  {vertical.category}
                </h3>
                
                <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                  {vertical.members.map((member) => (
                    <div key={member.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-24px)] max-w-xs sm:max-w-none">
                      <TeamCard member={member} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </MainLayout>
  );
}
