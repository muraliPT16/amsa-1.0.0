import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface MainLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function MainLayout({ title, description, children }: MainLayoutProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }, [title, description]);

  return (
    <div className="min-h-screen flex flex-col w-full bg-transparent">
      <Navbar />

      <main className="grow flex flex-col w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
}
