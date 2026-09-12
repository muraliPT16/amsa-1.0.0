import React, { useEffect, useRef, useState } from 'react';
import homepageData from '../../data/homepage.json';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface StatCardProps {
  stat: Stat;
  icon: React.ReactNode;
}

function StatCard({ stat, icon }: StatCardProps) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const targetVal = stat.value;
          const duration = 1500; // 1.5 seconds
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeOutQuad = (t: number) => t * (2 - t);
            const easeProgress = easeOutQuad(progress);

            const currentVal = Math.floor(easeProgress * targetVal);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(targetVal);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [stat.value]);

  return (
    <div ref={cardRef} className="bg-ink p-6 rounded-lg border border-slate-950 shadow-lg hover:shadow-accent-500/10 hover:scale-[1.02] transition-all duration-300 flex flex-col items-start text-left">
      <div className="h-10 w-10 rounded bg-slate-950 flex items-center justify-center mb-4 border border-slate-900">
        {icon}
      </div>
      <div className="flex items-baseline space-x-0.5">
        <span className="text-3xl sm:text-4xl font-bold text-white leading-none">
          {count}
        </span>
        <span className="text-2xl font-bold text-accent-400">{stat.suffix}</span>
      </div>
      <span className="text-xs text-slate-300 font-bold font-mono tracking-wider mt-2.5">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  const { stats } = homepageData;

  const icons = [
    // Active Members (Users Icon)
    <svg className="h-7 w-7 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    // Annual Events (Calendar Icon)
    <svg className="h-7 w-7 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>,
    // Alumni Connected (Graduation/Badge Icon)
    <svg className="h-7 w-7 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>,
    // R&D Collaborations (Handshake/Link Icon)
    <svg className="h-7 w-7 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ];

  return (
    <section className="py-12 md:py-14 bg-transparent text-slate-800 border-t border-line" id="key-stats">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-accent-600 font-mono tracking-widest block mb-2">
            Key Statistics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AMSA in Numbers
          </h2>
          <p className="text-sm sm:text-base text-slate-700 mt-2">
            A snapshot of our growing department community, initiatives, and academic network.
          </p>
        </div>

        {/* 4 Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.label} 
              stat={stat} 
              icon={icons[index % icons.length]} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
