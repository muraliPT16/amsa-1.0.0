import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/home/HeroSection';
import HighlightsSection from '../components/home/HighlightsSection';
import UpcomingEvents from '../components/home/UpcomingEvents';
import StatsSection from '../components/home/StatsSection';

export default function Home() {
  return (
    <MainLayout title="Applied Mechanics Student Association | IIT Madras">
      <HeroSection />
      <HighlightsSection />
      <UpcomingEvents />
      <StatsSection />
    </MainLayout>
  );
}
