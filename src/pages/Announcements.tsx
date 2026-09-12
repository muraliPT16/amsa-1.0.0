import React from 'react';
import MainLayout from '../layouts/MainLayout';
import NoticeBoard from '../components/announcements/NoticeBoard';
import Archive from '../components/announcements/Archive';

export default function Announcements() {
  return (
    <MainLayout title="AMSA | Notice Board">
      <div className="bg-paper pt-28 pb-8 border-b border-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <span className="text-xs font-bold text-accent-600 font-mono tracking-widest mb-1.5 block">Notice Board</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-1">Announcements & News</h1>
          <p className="text-slate-700 text-sm sm:text-base md:text-lg">Updates on events, achievements, resources and more.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 max-w-4xl">
        <NoticeBoard />
        <Archive />
      </div>
    </MainLayout>
  );
}
