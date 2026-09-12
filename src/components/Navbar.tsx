import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAssetPath } from '../utils/assetPath';

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileStudentHubOpen, setMobileStudentHubOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const isStudentHubActive = () => {
    return pathname.startsWith('/student-hub');
  };

  // Matches the reference nav: transparent over the hero until scrollY > 60
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menus on route change or screen resize
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileAboutOpen(false);
    setMobileStudentHubOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
        setMobileAboutOpen(false);
        setMobileStudentHubOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileMenuOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileMenuOpen]);

  const navLinkClass = (active: boolean) =>
    `font-montserrat text-[12px] sm:text-[12.5px] font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 ${
      active
        ? 'text-[#ea7a1e] drop-shadow-[0_0_8px_rgba(234,122,30,0.35)]'
        : 'text-slate-200 hover:text-[#fb923c]'
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-gradient-to-r from-ink/95 via-[#131d35]/95 to-[#1C2541]/95 backdrop-blur-md border-b ${
        scrolled ? 'border-slate-800 shadow-xl' : 'border-slate-800/80 shadow-md'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 flex items-center justify-between gap-4 py-3.5">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0 mr-4 xl:mr-8">
          <span className="w-2 h-2 rounded-full flex-shrink-0 bg-[#ea7a1e] shadow-[0_0_0_4px_rgba(234,122,30,0.25)]" />
          <img src={getAssetPath('/logos/amsa_logo.png')} alt="AMSA Logo" className="h-9 w-auto object-contain" />
          <span className="hidden sm:inline-block font-montserrat font-bold text-[13.5px] lg:text-[16px] tracking-wide leading-tight whitespace-nowrap transition-colors duration-300 text-white group-hover:text-[#ea7a1e]">
            APPLIED MECHANICS STUDENT ASSOCIATION
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-4.5 2xl:gap-6 flex-shrink-0">
          <Link to="/" className={navLinkClass(isActive('/'))}>HOME</Link>

          {/* About Us Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1.5 outline-none cursor-pointer ${navLinkClass(isActive('/about') || isActive('/team'))}`}>
              <span className="whitespace-nowrap">ABOUT US</span>
              <svg className="h-3.5 w-3.5 transform group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className="absolute left-0 mt-3 w-48 rounded-lg bg-gradient-to-br from-ink to-[#1C2541] border border-slate-800 shadow-2xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 text-left">
              <Link to="/about" className={`block px-4 py-2.5 font-montserrat text-[12px] font-bold tracking-wider uppercase transition-colors duration-150 ${pathname === '/about' ? 'text-[#ea7a1e] bg-white/5' : 'text-slate-300 hover:text-[#ea7a1e] hover:bg-white/5'}`}>
                ASSOCIATION
              </Link>
              <Link to="/team" className={`block px-4 py-2.5 font-montserrat text-[12px] font-bold tracking-wider uppercase transition-colors duration-150 ${pathname === '/team' ? 'text-[#ea7a1e] bg-white/5' : 'text-slate-300 hover:text-[#ea7a1e] hover:bg-white/5'}`}>
                TEAM
              </Link>
            </div>
          </div>

          <Link to="/events" className={navLinkClass(isActive('/events'))}>EVENTS</Link>

          {/* Students Hub Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1.5 outline-none cursor-pointer ${navLinkClass(isStudentHubActive())}`}>
              <span className="whitespace-nowrap">STUDENTS HUB</span>
              <svg className="h-3.5 w-3.5 transform group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className="absolute left-0 mt-3 w-56 rounded-lg bg-gradient-to-br from-ink to-[#1C2541] border border-slate-800 shadow-2xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 text-left">
              <Link
                to="/student-hub/resources"
                className={`block px-4 py-2.5 font-montserrat text-[12px] font-bold tracking-wider uppercase transition-colors duration-150 ${
                  pathname === '/student-hub' || pathname === '/student-hub/' || pathname.startsWith('/student-hub/resources') || pathname.startsWith('/student-hub/internships') || pathname.startsWith('/student-hub/placements') || pathname.startsWith('/student-hub/competitions') || pathname.startsWith('/student-hub/scholarships') || pathname.startsWith('/student-hub/higher-studies') || pathname.startsWith('/student-hub/career-guidance')
                    ? 'text-[#ea7a1e] bg-white/5'
                    : 'text-slate-300 hover:text-[#ea7a1e] hover:bg-white/5'
                }`}
              >
                RESOURCES PORTAL
              </Link>
              <Link
                to="/student-hub/achievements"
                className={`block px-4 py-2.5 font-montserrat text-[12px] font-bold tracking-wider uppercase transition-colors duration-150 ${
                  pathname.startsWith('/student-hub/achievements') ? 'text-[#ea7a1e] bg-white/5' : 'text-slate-300 hover:text-[#ea7a1e] hover:bg-white/5'
                }`}
              >
                ACHIEVEMENTS
              </Link>
              <Link
                to="/student-hub/wellness"
                className={`block px-4 py-2.5 font-montserrat text-[12px] font-bold tracking-wider uppercase transition-colors duration-150 ${
                  pathname.startsWith('/student-hub/wellness') ? 'text-[#ea7a1e] bg-white/5' : 'text-slate-300 hover:text-[#ea7a1e] hover:bg-white/5'
                }`}
              >
                WELLNESS PORTAL
              </Link>
            </div>
          </div>

          <Link to="/collaborations" className={navLinkClass(isActive('/collaborations'))}>PARTNER&nbsp;WITH&nbsp;US</Link>
          <Link to="/gallery" className={navLinkClass(isActive('/gallery'))}>GALLERY</Link>

          {/* Contact — styled as nav-cta with dark gold highlight */}
          <Link
            to="/contact"
            className={`inline-flex items-center gap-1 font-montserrat text-[12px] sm:text-[12.5px] font-bold tracking-wider uppercase whitespace-nowrap border rounded-[4px] px-3.5 py-1.5 transition-all duration-200 ${
              isActive('/contact')
                ? 'border-[#ea7a1e] text-[#ea7a1e] bg-[#ea7a1e]/10 shadow-[0_0_10px_rgba(234,122,30,0.25)]'
                : 'border-slate-500/40 text-slate-100 hover:bg-[#ea7a1e] hover:text-ink hover:border-[#ea7a1e]'
            }`}
          >
            CONTACT <span aria-hidden="true">↗</span>
          </Link>

          {/* IITM affiliation mark */}
          <a
            href="https://www.iitm.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 ml-0.5"
            title="IIT Madras Official Website"
          >
            <img src={getAssetPath('/logos/iitm_logo.png')} alt="IITM Logo" className="h-8.5 w-8.5 object-contain" />
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="xl:hidden inline-flex items-center justify-center p-2 z-[120] text-white hover:text-[#ea7a1e] transition-colors cursor-pointer"
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className={`h-6 w-6 ${mobileMenuOpen ? 'hidden' : 'block'}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg className={`h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile Slide-in Drawer */}
      <div
        className={`xl:hidden fixed top-0 right-0 h-screen w-[78vw] max-w-[320px] bg-gradient-to-b from-ink via-[#131d35] to-[#1C2541] border-l border-slate-800 shadow-2xl transform transition-transform duration-400 ease-in-out z-[110] overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-6 py-24 text-left">
          <Link to="/" className={`block rounded px-3 py-2.5 font-montserrat text-[14px] font-bold tracking-wider uppercase transition-colors duration-200 ${isActive('/') ? 'text-[#ea7a1e] bg-white/5' : 'text-slate-300 hover:text-white'}`}>
            HOME
          </Link>

          <div>
            <button
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              className={`flex items-center justify-between w-full rounded px-3 py-2.5 font-montserrat text-[14px] font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer ${
                isActive('/about') || isActive('/team') ? 'text-[#ea7a1e] bg-white/5' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>ABOUT US</span>
              <svg className={`h-4 w-4 transform transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className={`${mobileAboutOpen ? 'block' : 'hidden'} pl-6 space-y-1 mt-1`}>
              <Link to="/about" className={`block rounded px-3 py-2 font-montserrat text-[12px] font-bold tracking-wider uppercase transition-colors ${pathname === '/about' ? 'text-[#ea7a1e]' : 'text-slate-400 hover:text-white'}`}>
                ASSOCIATION
              </Link>
              <Link to="/team" className={`block rounded px-3 py-2 font-montserrat text-[12px] font-bold tracking-wider uppercase transition-colors ${pathname === '/team' ? 'text-[#ea7a1e]' : 'text-slate-400 hover:text-white'}`}>
                TEAM
              </Link>
            </div>
          </div>

          <Link to="/events" className={`block rounded px-3 py-2.5 font-montserrat text-[14px] font-bold tracking-wider uppercase transition-colors duration-200 ${isActive('/events') ? 'text-[#ea7a1e] bg-white/5' : 'text-slate-300 hover:text-white'}`}>
            EVENTS
          </Link>

          <div>
            <button
              onClick={() => setMobileStudentHubOpen(!mobileStudentHubOpen)}
              className={`flex items-center justify-between w-full rounded px-3 py-2.5 font-montserrat text-[14px] font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer ${
                isStudentHubActive() ? 'text-[#ea7a1e] bg-white/5' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>STUDENTS HUB</span>
              <svg className={`h-4 w-4 transform transition-transform duration-200 ${mobileStudentHubOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className={`${mobileStudentHubOpen ? 'block' : 'hidden'} pl-6 space-y-1 mt-1`}>
              <Link to="/student-hub/resources" className={`block rounded px-3 py-2 font-montserrat text-[12px] font-bold tracking-wider uppercase transition-colors ${pathname === '/student-hub' || pathname === '/student-hub/' || pathname.startsWith('/student-hub/resources') ? 'text-[#ea7a1e]' : 'text-slate-400 hover:text-white'}`}>
                RESOURCES PORTAL
              </Link>
              <Link to="/student-hub/achievements" className={`block rounded px-3 py-2 font-montserrat text-[12px] font-bold tracking-wider uppercase transition-colors ${pathname.startsWith('/student-hub/achievements') ? 'text-[#ea7a1e]' : 'text-slate-400 hover:text-white'}`}>
                ACHIEVEMENTS
              </Link>
              <Link to="/student-hub/wellness" className={`block rounded px-3 py-2 font-montserrat text-[12px] font-bold tracking-wider uppercase transition-colors ${pathname.startsWith('/student-hub/wellness') ? 'text-[#ea7a1e]' : 'text-slate-400 hover:text-white'}`}>
                WELLNESS PORTAL
              </Link>
            </div>
          </div>

          <Link to="/collaborations" className={`block rounded px-3 py-2.5 font-montserrat text-[14px] font-bold tracking-wider uppercase transition-colors duration-200 ${isActive('/collaborations') ? 'text-[#ea7a1e] bg-white/5' : 'text-slate-300 hover:text-white'}`}>
            PARTNER WITH US
          </Link>

          <Link to="/gallery" className={`block rounded px-3 py-2.5 font-montserrat text-[14px] font-bold tracking-wider uppercase transition-colors duration-200 ${isActive('/gallery') ? 'text-[#ea7a1e] bg-white/5' : 'text-slate-300 hover:text-white'}`}>
            GALLERY
          </Link>

          <Link to="/contact" className={`block rounded px-3 py-2.5 font-montserrat text-[14px] font-bold tracking-wider uppercase transition-colors duration-200 ${isActive('/contact') ? 'text-[#ea7a1e] bg-white/5' : 'text-slate-300 hover:text-white'}`}>
            CONTACT
          </Link>

          <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-center">
            <a href="https://www.iitm.ac.in/" target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform duration-300" title="IIT Madras Official Website">
              <img src={getAssetPath('/logos/iitm_logo.png')} alt="IITM Logo" className="h-16 w-auto object-contain mx-auto" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-ink/60 backdrop-blur-sm z-[105]"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
