import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import albumsData from '../data/gallery.expanded.json';
import { getAssetPath } from '../utils/assetPath';

interface Album {
  id: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  description: string;
  images: string[];
  video?: string;
}

export default function Gallery() {
  const routeLocation = useLocation();
  const searchParams = new URLSearchParams(routeLocation.search);
  const activeAlbumId = searchParams.get('id') || searchParams.get('album');

  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(false);

  // Grid styling helpers - varying layout pattern with minimum column span of 4 (min ~33% width on desktop, ~50% on tablet)
  const getCardSpan = (index: number) => {
    const spans = [
      'md:col-span-7 lg:col-span-7', // 7 cols
      'md:col-span-5 lg:col-span-5', // 5 cols (row total = 12)
      'md:col-span-6 lg:col-span-4', // 4 cols (min span)
      'md:col-span-6 lg:col-span-4', // 4 cols
      'md:col-span-12 lg:col-span-4', // 4 cols (row total = 12)
      'md:col-span-5 lg:col-span-5', // 5 cols
      'md:col-span-7 lg:col-span-7', // 7 cols (row total = 12)
      'md:col-span-6 lg:col-span-6', // 6 cols
      'md:col-span-6 lg:col-span-6', // 6 cols (row total = 12)
      'md:col-span-8 lg:col-span-8', // 8 cols
      'md:col-span-4 lg:col-span-4', // 4 cols (row total = 12)
      'md:col-span-6 lg:col-span-4', // 4 cols
      'md:col-span-6 lg:col-span-4', // 4 cols
      'md:col-span-12 lg:col-span-4', // 4 cols (row total = 12)
    ];
    return spans[index % spans.length];
  };

  // Dynamic heights with guaranteed generous minimum height (min 288px-320px)
  const getCardHeight = (index: number) => {
    const heights = [
      'h-72 sm:h-80 md:h-[340px]', // Row 1 (7 cols)
      'h-72 sm:h-80 md:h-[340px]', // Row 1 (5 cols)
      'h-64 sm:h-72 md:h-80',       // Row 2 (4 cols - generous minimum)
      'h-64 sm:h-72 md:h-80',       // Row 2 (4 cols)
      'h-64 sm:h-72 md:h-80',       // Row 2 (4 cols)
      'h-72 sm:h-80 md:h-[340px]', // Row 3 (5 cols)
      'h-72 sm:h-80 md:h-[340px]', // Row 3 (7 cols)
      'h-72 sm:h-80 md:h-80',       // Row 4 (6 cols)
      'h-72 sm:h-80 md:h-80',       // Row 4 (6 cols)
      'h-72 sm:h-80 md:h-[340px]', // Row 5 (8 cols)
      'h-72 sm:h-80 md:h-[340px]', // Row 5 (4 cols)
      'h-64 sm:h-72 md:h-80',       // Row 6 (4 cols)
      'h-64 sm:h-72 md:h-80',       // Row 6 (4 cols)
      'h-64 sm:h-72 md:h-80',       // Row 6 (4 cols)
    ];
    return heights[index % heights.length];
  };

  // Open & Close controls
  const openAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setIsAlbumOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const closeAlbum = () => {
    setIsAlbumOpen(false);
    document.body.classList.remove('overflow-hidden');
    setTimeout(() => {
      setSelectedAlbum(null);
      setZoomIndex(null);
    }, 300);
  };

  const openZoom = (index: number) => {
    setZoomIndex(index);
  };

  const closeZoom = () => {
    setZoomIndex(null);
  };

  const navigateZoom = (dir: 'prev' | 'next') => {
    if (zoomIndex === null || !selectedAlbum) return;
    const len = selectedAlbum.images.length;
    if (dir === 'next') {
      setZoomIndex((zoomIndex + 1) % len);
    } else {
      setZoomIndex((zoomIndex - 1 + len) % len);
    }
  };

  const openHighlights = () => {
    setIsHighlightsOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const closeHighlights = () => {
    setIsHighlightsOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  // URL query sync
  useEffect(() => {
    if (activeAlbumId) {
      const album = (albumsData as Album[]).find(a => a.id === activeAlbumId);
      if (album) {
        openAlbum(album);
      }
    }
  }, [activeAlbumId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (zoomIndex !== null) {
        if (e.key === 'Escape') closeZoom();
        else if (e.key === 'ArrowRight') navigateZoom('next');
        else if (e.key === 'ArrowLeft') navigateZoom('prev');
      } else if (isAlbumOpen) {
        if (e.key === 'Escape') closeAlbum();
      } else if (isHighlightsOpen) {
        if (e.key === 'Escape') closeHighlights();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIndex, isAlbumOpen, isHighlightsOpen, selectedAlbum]);

  // Sorting & Filtering logic
  const categories = [
    'all',
    ...Array.from(
      new Set(
        (albumsData as Album[])
          .filter(album => album.id && album.title && album.category)
          .map(album => album.category.trim())
          .filter(cat => cat !== '')
      )
    ).sort((a, b) => a.localeCompare(b))
  ];

  const filteredAlbums = (albumsData as Album[])
    .filter(album => album.id && album.title && (activeCategory === 'all' || album.category.toLowerCase() === activeCategory))
    .sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortBy === 'latest' ? timeB - timeA : timeA - timeB;
    });

  return (
    <MainLayout title="AMSA | Media Gallery">
      {/* 1. Hero Cover Section */}
      <div className="relative w-full h-[52vh] min-h-[440px] flex items-center justify-between bg-slate-950 text-white overflow-hidden select-none">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-slate-950/15 z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between w-full h-full pt-10">
          {/* Cover Left */}
          <div className="w-full lg:w-7/12 space-y-6 text-left lg:pl-4">
            <span className="text-xs font-black text-accent-500 font-mono tracking-widest block mb-1">AMSA Archives</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Moments That <br />
              <span className="text-accent-400">Inspire</span> Us
            </h1>
            <div className="w-16 h-1 bg-accent-400 rounded"></div>
            <p className="font-display italic font-light text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              A glimpse into the events, activities, and memories that define our journey together. Relive the department's milestone gatherings.
            </p>
            <div className="pt-2">
              <button 
                onClick={openHighlights}
                className="inline-flex items-center px-5 py-3 rounded border border-accent-400/40 bg-accent-400/5 hover:bg-accent-400 hover:text-slate-950 text-accent-400 text-xs font-extrabold font-mono tracking-wider transition-all duration-300 cursor-pointer shadow-lg shadow-accent-400/5 hover:scale-[1.02]"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Highlights Reel
              </button>
            </div>
          </div>

          {/* Cover Right - Wall Collage (Standalone, Delinked from Gallery Albums) */}
          <div className="hidden lg:flex w-5/12 xl:w-1/2 items-center justify-end pr-4 xl:pr-8 relative">
            {/* Ambient wall spotlight effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.07)_0%,_transparent_70%)] pointer-events-none -z-10"></div>
            
            <div className="relative w-[450px] xl:w-[500px] h-[330px] xl:h-[350px]">
              {/* Photo 1 (Top-Left) */}
              <div 
                className="group absolute top-0 left-0 xl:left-2 w-[140px] xl:w-[155px] bg-[#fafaf9] p-2 xl:p-2.5 pb-5 xl:pb-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6),0_6px_10px_-4px_rgba(0,0,0,0.4)] border border-paper/30 rounded-[2px] transform -rotate-6 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.8)] z-10 hover:z-40 select-none"
              >
                {/* Adhesive Tape Strip */}
                <div 
                  className="absolute -top-2.5 left-1/2 w-12 xl:w-14 h-3.5 xl:h-4 bg-accent-50/40 backdrop-blur-[2px] border-y border-paper/50 shadow-xs pointer-events-none rounded-[1px] opacity-85 group-hover:opacity-100 transition-opacity"
                  style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
                ></div>
                <div className="w-full aspect-[4/3] rounded-[1px] overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img 
                    src={getAssetPath('/images/gallery_polaroid/img_001.jpg')} 
                    alt="Cover Polaroid 1"
                    className="w-full h-full object-cover pointer-events-none" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-slate-800 text-[8.5px] xl:text-[9.5px] font-black font-mono tracking-wider text-center mt-2 truncate">Moments Captured</div>
              </div>

              {/* Photo 2 (Top-Center) */}
              <div 
                className="group absolute top-[-10px] left-[150px] xl:left-[170px] w-[140px] xl:w-[155px] bg-[#fafaf9] p-2 xl:p-2.5 pb-5 xl:pb-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6),0_6px_10px_-4px_rgba(0,0,0,0.4)] border border-paper/30 rounded-[2px] transform rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.8)] z-10 hover:z-40 select-none"
              >
                {/* Adhesive Tape Strip */}
                <div 
                  className="absolute -top-2.5 left-1/2 w-12 xl:w-14 h-3.5 xl:h-4 bg-accent-50/40 backdrop-blur-[2px] border-y border-paper/50 shadow-xs pointer-events-none rounded-[1px] opacity-85 group-hover:opacity-100 transition-opacity"
                  style={{ transform: 'translateX(-50%) rotate(1deg)' }}
                ></div>
                <div className="w-full aspect-[4/3] rounded-[1px] overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img 
                    src={getAssetPath('/images/gallery_polaroid/img_002.jpg')} 
                    alt="Cover Polaroid 2"
                    className="w-full h-full object-cover pointer-events-none" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-slate-800 text-[8.5px] xl:text-[9.5px] font-black font-mono tracking-wider text-center mt-2 truncate">Milestones</div>
              </div>

              {/* Photo 3 (Top-Right) */}
              <div 
                className="group absolute top-1 right-0 xl:right-2 w-[140px] xl:w-[155px] bg-[#fafaf9] p-2 xl:p-2.5 pb-5 xl:pb-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6),0_6px_10px_-4px_rgba(0,0,0,0.4)] border border-paper/30 rounded-[2px] transform rotate-6 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.8)] z-10 hover:z-40 select-none"
              >
                {/* Adhesive Tape Strip */}
                <div 
                  className="absolute -top-2.5 left-1/2 w-12 xl:w-14 h-3.5 xl:h-4 bg-accent-50/40 backdrop-blur-[2px] border-y border-paper/50 shadow-xs pointer-events-none rounded-[1px] opacity-85 group-hover:opacity-100 transition-opacity"
                  style={{ transform: 'translateX(-50%) rotate(4deg)' }}
                ></div>
                <div className="w-full aspect-[4/3] rounded-[1px] overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img 
                    src={getAssetPath('/images/gallery_polaroid/img_003.jpg')} 
                    alt="Cover Polaroid 3"
                    className="w-full h-full object-cover pointer-events-none" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-slate-800 text-[8.5px] xl:text-[9.5px] font-black font-mono tracking-wider text-center mt-2 truncate">Campus Memories</div>
              </div>

              {/* Photo 4 (Bottom-Left) */}
              <div 
                className="group absolute bottom-1 left-2 xl:left-4 w-[142px] xl:w-[158px] bg-[#fafaf9] p-2 xl:p-2.5 pb-5 xl:pb-6 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.65),0_6px_12px_-4px_rgba(0,0,0,0.4)] border border-paper/30 rounded-[2px] transform -rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.8)] z-20 hover:z-40 select-none"
              >
                {/* Adhesive Tape Strip */}
                <div 
                  className="absolute -top-2.5 left-1/2 w-12 xl:w-14 h-3.5 xl:h-4 bg-accent-50/40 backdrop-blur-[2px] border-y border-paper/50 shadow-xs pointer-events-none rounded-[1px] opacity-85 group-hover:opacity-100 transition-opacity"
                  style={{ transform: 'translateX(-50%) rotate(-3deg)' }}
                ></div>
                <div className="w-full aspect-[4/3] rounded-[1px] overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img 
                    src={getAssetPath('/images/gallery_polaroid/img_004.jpg')} 
                    alt="Cover Polaroid 4"
                    className="w-full h-full object-cover pointer-events-none" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-slate-800 text-[8.5px] xl:text-[9.5px] font-black font-mono tracking-wider text-center mt-2 truncate">Department Life</div>
              </div>

              {/* Photo 5 (Bottom-Center - Focus) */}
              <div 
                className="group absolute bottom-[-6px] left-[150px] xl:left-[170px] w-[146px] xl:w-[162px] bg-[#ffffff] p-2.5 xl:p-3 pb-6 xl:pb-7 shadow-[0_14px_30px_-6px_rgba(0,0,0,0.7),0_8px_14px_-4px_rgba(0,0,0,0.45)] border border-paper/40 rounded-[2px] transform -rotate-1 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-8px_rgba(0,0,0,0.85)] z-30 hover:z-40 select-none ring-1 ring-black/5"
              >
                {/* Adhesive Tape Strip */}
                <div 
                  className="absolute -top-2.5 left-1/2 w-12 xl:w-14 h-3.5 xl:h-4 bg-accent-50/45 backdrop-blur-[2px] border-y border-paper/50 shadow-xs pointer-events-none rounded-[1px] opacity-90 group-hover:opacity-100 transition-opacity"
                  style={{ transform: 'translateX(-50%) rotate(0deg)' }}
                ></div>
                <div className="w-full aspect-[4/3] rounded-[1px] overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img 
                    src={getAssetPath('/images/gallery_polaroid/img_005.jpg')} 
                    alt="Cover Polaroid 5"
                    className="w-full h-full object-cover pointer-events-none" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-slate-900 text-[9px] xl:text-[10px] font-black font-mono tracking-wider text-center mt-2.5 truncate">AMSA Gathering</div>
              </div>

              {/* Photo 6 (Bottom-Right) */}
              <div 
                className="group absolute bottom-1 right-2 xl:right-4 w-[142px] xl:w-[158px] bg-[#fafaf9] p-2 xl:p-2.5 pb-5 xl:pb-6 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.65),0_6px_12px_-4px_rgba(0,0,0,0.4)] border border-paper/30 rounded-[2px] transform rotate-5 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.8)] z-20 hover:z-40 select-none"
              >
                {/* Adhesive Tape Strip */}
                <div 
                  className="absolute -top-2.5 left-1/2 w-12 xl:w-14 h-3.5 xl:h-4 bg-accent-50/40 backdrop-blur-[2px] border-y border-paper/50 shadow-xs pointer-events-none rounded-[1px] opacity-85 group-hover:opacity-100 transition-opacity"
                  style={{ transform: 'translateX(-50%) rotate(3deg)' }}
                ></div>
                <div className="w-full aspect-[4/3] rounded-[1px] overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img 
                    src={getAssetPath('/images/gallery_polaroid/img_006.jpg')} 
                    alt="Cover Polaroid 6"
                    className="w-full h-full object-cover pointer-events-none" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-slate-800 text-[8.5px] xl:text-[9.5px] font-black font-mono tracking-wider text-center mt-2 truncate">Community</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 relative z-10">
        
        {/* Controls Block */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between border-b border-line pb-6">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 w-full lg:w-auto">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category.toLowerCase())}
                className={`px-4 py-2 text-xs font-bold font-mono tracking-wider rounded border transition-all duration-300 outline-none flex items-center gap-1.5 ${
                  activeCategory === category.toLowerCase()
                    ? 'border-ink bg-ink text-accent-500 shadow'
                    : 'border-line text-slate-600 hover:border-accent-400 hover:text-accent-500'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <div className="flex-shrink-0 w-full sm:w-auto flex justify-end items-center space-x-2">
            <label htmlFor="gallery-sort" className="text-[10px] text-slate-400 font-extrabold font-mono tracking-widest">Sort by:</label>
            <select 
              id="gallery-sort" 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-box-border/60 text-slate-700 rounded px-3 py-2 text-xs font-bold font-mono tracking-wider outline-none bg-box cursor-pointer hover:border-accent-400 transition-all duration-300"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Album Cards Grid */}
        {filteredAlbums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8" id="gallery-album-grid">
            {filteredAlbums.map((album, index) => (
              <div 
                key={album.id}
                className={`gallery-album-wrapper ${getCardSpan(index)} transition-all duration-300 transform scale-100 opacity-100`}
              >
                <div 
                  onClick={() => openAlbum(album)}
                  className={`group relative ${getCardHeight(index)} min-h-[260px] w-full rounded-2xl overflow-hidden shadow-md cursor-pointer border border-slate-900/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 gallery-album-trigger`}
                >
                  <img 
                    src={getAssetPath(album.coverImage)} 
                    alt={album.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent z-10"></div>
                  
                  {/* Top bar with category & photo count */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black font-mono tracking-wider bg-slate-950/70 backdrop-blur-md text-accent-400 border border-accent-400/25 shadow-sm">
                      {album.category}
                    </span>
                    {album.images && album.images.length > 0 && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black font-mono tracking-wider bg-slate-950/70 backdrop-blur-md text-white/90 border border-paper/15 shadow-sm flex items-center gap-1.5">
                        <svg className="h-3 w-3 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {album.images.length} {album.images.length === 1 ? 'Photo' : 'Photos'}
                      </span>
                    )}
                  </div>

                  {/* Bottom Album Info */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 text-white flex items-start space-x-3">
                    <div className="bg-accent-500/10 border border-accent-500/25 backdrop-blur-md rounded-lg p-2 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:bg-accent-500 group-hover:text-slate-950 transition-all duration-300">
                      <svg className="h-4 w-4 text-accent-400 group-hover:text-slate-950 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <span className="text-sm sm:text-base font-black font-mono tracking-wide text-white block group-hover:text-accent-400 transition-colors duration-200 line-clamp-2 leading-snug">
                        {album.title}
                      </span>
                      <span className="text-[10px] font-bold text-slate-300 font-mono tracking-wider block mt-1">
                        {new Date(album.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div id="gallery-empty-state" className="text-center py-20 bg-box rounded-2xl border border-box-border/60 shadow-sm max-w-md mx-auto">
            <p className="text-slate-500 font-light">No matching albums found for this category.</p>
          </div>
        )}

        {/* Propose Submit Photos CTA Banner */}
        <section className="max-w-5xl mx-auto py-4">
          <div className="bg-ink rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 border border-slate-950 shadow-2xl relative overflow-hidden text-white text-left">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(212,175,55,0.06),_transparent_40%)] pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-32 w-32 bg-paper/[0.01] rounded-bl-full pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10 text-center sm:text-left flex-1 min-w-0 pr-0 md:pr-6">
              <div className="h-14 w-14 bg-slate-950 border border-slate-800 text-accent-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-extrabold font-mono tracking-wide leading-snug">Have Photos to Share?</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl">Relive the memories and help us tell our story. Contribute your photos and be a part of our journey.</p>
              </div>
            </div>
            <div className="mt-6 md:mt-0 relative z-10 flex-shrink-0">
              <Link 
                to="/contact?subject=Gallery-Submission" 
                className="inline-flex items-center px-6 py-3 rounded bg-accent-500 hover:bg-accent-400 text-slate-950 text-xs font-extrabold font-mono tracking-wider shadow-lg shadow-accent-500/10 hover:shadow-accent-500/20 hover:scale-[1.02] transition-all duration-300"
              >
                Submit Your Photos
                <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* Album Detail Modal */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 transition-all duration-300 ${
          isAlbumOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div onClick={closeAlbum} className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm cursor-pointer pointer-events-auto"></div>
        
        {selectedAlbum && (
          <div 
            className={`relative bg-slate-950 rounded-2xl max-w-6xl w-full h-[85vh] overflow-hidden shadow-2xl border border-slate-800 flex flex-col pointer-events-auto transform transition-all duration-300 ${
              isAlbumOpen ? 'scale-100' : 'scale-95'
            }`}
          >
            {/* Close Button */}
            <button 
              onClick={closeAlbum}
              className="absolute top-4 right-4 text-slate-400 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer z-50 bg-slate-900/80 rounded-full p-2 border border-slate-800 shadow" 
              aria-label="Close album"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Images Area */}
            <div className="w-full h-full overflow-y-auto px-6 pt-20 pb-28 space-y-8 scrollbar-thin flex flex-col items-center">
              {/* YouTube video */}
              {selectedAlbum.video && (
                <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-black mb-4 flex-shrink-0">
                  <iframe 
                    src={isAlbumOpen ? selectedAlbum.video : ""}
                    className="w-full h-full border-0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Images list */}
              {selectedAlbum.images.map((imgUrl, index) => (
                <div 
                  key={`img-${index}-${imgUrl.split('/').pop()}`}
                  onClick={() => openZoom(index)}
                  className="bg-box p-3 pb-8 rounded-lg shadow-2xl border border-box-border/10 max-w-5xl w-full transform transition-transform duration-300 hover:scale-[1.01] cursor-zoom-in mb-8 flex-shrink-0 select-none"
                >
                  <img 
                    src={getAssetPath(imgUrl)} 
                    alt={selectedAlbum.title} 
                    className="w-full h-auto rounded-sm object-contain max-h-[65vh] pointer-events-none" 
                  />
                </div>
              ))}
            </div>
            
            {/* Sticky Overlay Bottom Details Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-6 pt-16 z-30 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
              <div className="text-left space-y-1 flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-black font-mono text-white tracking-wide">
                  {selectedAlbum.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-slate-400 font-extrabold font-mono tracking-widest">
                  <span>{new Date(selectedAlbum.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>•</span>
                  <span className="font-lora normal-case font-normal tracking-normal text-slate-300">{selectedAlbum.description}</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded text-[10px] font-black font-mono tracking-wider bg-accent-500/10 text-accent-500 border border-accent-500/25 flex-shrink-0">
                {selectedAlbum.category}
              </span>
            </div>
            
          </div>
        )}
      </div>

      {/* Video Highlights Modal */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
          isHighlightsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div onClick={closeHighlights} className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm cursor-pointer pointer-events-auto"></div>
        <div className={`relative w-full max-w-[440px] h-[680px] max-h-[88vh] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 pointer-events-auto transform transition-all duration-300 flex flex-col items-center justify-center ${
          isHighlightsOpen ? 'scale-100' : 'scale-95'
        }`}>
          <button 
            onClick={closeHighlights}
            className="absolute top-3 right-3 text-white hover:text-accent-400 hover:scale-110 transition-all duration-200 cursor-pointer z-50 bg-slate-900/80 rounded-full p-2 border border-slate-700 shadow-md"
            aria-label="Close video"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <iframe 
            className="w-full h-full border-0 rounded-2xl" 
            src={isHighlightsOpen ? "https://www.instagram.com/reel/DcJS-c0yEje/embed/" : ""} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Image Lightbox Zoom Overlay */}
      {selectedAlbum && zoomIndex !== null && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 select-none opacity-100 pointer-events-auto transition-opacity duration-300"
        >
          <div onClick={closeZoom} className="absolute inset-0 bg-slate-950/95 cursor-pointer pointer-events-auto"></div>
          
          <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center z-10 pointer-events-auto">
            {/* Close button */}
            <button 
              onClick={closeZoom}
              className="absolute top-[-44px] right-0 text-white hover:text-accent-400 hover:scale-110 transition-all duration-200 cursor-pointer p-1"
              aria-label="Close zoom"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Main Image */}
            <img 
              src={getAssetPath(selectedAlbum.images[zoomIndex])} 
              alt="Zoomed photo" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-paper/10" 
            />
            
            {/* Navigation Arrows */}
            <button 
              onClick={() => navigateZoom('prev')}
              className="absolute left-[-60px] top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer p-2 hidden sm:block bg-slate-900/40 hover:bg-slate-900/60 rounded-full border border-paper/10"
              aria-label="Previous image"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => navigateZoom('next')}
              className="absolute right-[-60px] top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer p-2 hidden sm:block bg-slate-900/40 hover:bg-slate-900/60 rounded-full border border-paper/10"
              aria-label="Next image"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Caption/Counter */}
            <div className="mt-4 text-white/80 text-xs font-bold font-mono tracking-wider bg-slate-900/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-paper/10">
              {zoomIndex + 1} / {selectedAlbum.images.length}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
