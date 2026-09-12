import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout';
import { getAssetPath } from '../utils/assetPath';

interface StudentHubLayoutProps {
  title?: string;
  description?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  headerTag?: string;
  headerRightContent?: React.ReactNode;
  showResourceSidebar?: boolean;
  coverImage?: string;
  coverPosition?: string;
  coverOpacity?: string;
  children: React.ReactNode;
}

export default function StudentHubLayout({
  title = "AMSA | Students Hub",
  description = "Student resources, achievements, and wellness support hub",
  headerTitle = "Students Hub",
  headerSubtitle = "Your gateway for academic archives, career pathways, student excellence, and comprehensive wellness support.",
  headerTag = "Student Community & Support",
  headerRightContent,
  showResourceSidebar = false,
  coverImage,
  coverPosition = "object-[center_75%]",
  coverOpacity = "opacity-60",
  children
}: StudentHubLayoutProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const resourceSidebarItems = [
    { name: 'All Resources Overview', path: '/student-hub/resources' },
    { name: 'Academic Materials', path: '/student-hub/resources#academic' },
    { name: 'Internship Openings', path: '/student-hub/internships' },
    { name: 'Placement Portal', path: '/student-hub/placements' },
    { name: 'Competitions', path: '/student-hub/competitions' },
    { name: 'Scholarships & Grants', path: '/student-hub/scholarships' },
    { name: 'Higher Studies', path: '/student-hub/higher-studies' },
    { name: 'Career Guidance', path: '/student-hub/career-guidance' },
  ];

  const isResourceActive = (path: string) => {
    const fullPath = `${pathname}${location.hash}`;
    return fullPath === path || pathname === path || pathname === `${path}/`;
  };

  return (
    <MainLayout title={title} description={description}>
      {/* Header Banner */}
      <div className="bg-ink text-white pt-28 sm:pt-32 pb-8 sm:pb-10 border-b border-slate-900 relative overflow-hidden">
        {coverImage ? (
          <>
            <img 
              src={getAssetPath(coverImage)} 
              alt="Header Cover Banner" 
              className={`absolute inset-0 w-full h-full object-cover ${coverPosition} ${coverOpacity} select-none pointer-events-none`} 
            />
            {/* Overlay dark gradients for text readability and contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20"></div>
            <div className="absolute inset-0 bg-slate-950/10"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(212,175,55,0.06),_transparent_50%)]"></div>
        )}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-accent-500 font-mono tracking-widest mb-2 block">
                {headerTag}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                {headerTitle}
              </h1>
              <p className="font-display italic text-slate-200 text-sm sm:text-base md:text-lg mt-2 leading-relaxed max-w-xl">
                {headerSubtitle}
              </p>
            </div>
            {headerRightContent && (
              <div className="flex-shrink-0 lg:ml-6 mt-2 lg:mt-0">
                {headerRightContent}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-grow">
        {showResourceSidebar ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left sidebar for Resources */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 bg-box p-5 rounded-2xl border border-box-border/60 shadow-sm space-y-2 text-left">
                <p className="text-[10px] text-slate-600 font-extrabold font-mono tracking-wider px-3 mb-3">
                  Resource Categories
                </p>
                <nav className="space-y-1">
                  {resourceSidebarItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                        isResourceActive(item.path)
                          ? 'text-accent-700 bg-accent-50/80 border-l-4 border-l-accent-500 font-bold'
                          : 'text-slate-800 hover:text-accent-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Right content pane */}
            <main className="lg:col-span-3 bg-box p-6 sm:p-8 rounded-2xl border border-box-border/60 shadow-sm min-h-[450px] flex flex-col text-left">
              {children}
            </main>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </MainLayout>
  );
}
