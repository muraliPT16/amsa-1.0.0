import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Events from './pages/Events';
import Collaborations from './pages/Collaborations';
import Gallery from './pages/Gallery';
import Announcements from './pages/Announcements';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import BackgroundEffect from './components/BackgroundEffect';

// Student hub pages
import StudentHubHome from './pages/student-hub/Home';
import ResourcesPortal from './pages/student-hub/ResourcesPortal';
import Achievements from './pages/student-hub/Achievements';
import WellnessPortal from './pages/student-hub/WellnessPortal';

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <BackgroundEffect />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
          <Route path="/collaborations" element={<Collaborations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Events Subroutes */}
          <Route path="/events/upcoming/EventDetails" element={<Navigate to="/events" replace />} />
          <Route path="/events/upcoming/event-details" element={<Navigate to="/events" replace />} />
          <Route path="/events/upcoming/RegistrationInfo" element={<Navigate to="/events" replace />} />
          <Route path="/events/upcoming/registration-info" element={<Navigate to="/events" replace />} />
          <Route path="/events/past/Reports" element={<Navigate to="/events" replace />} />
          <Route path="/events/past/reports" element={<Navigate to="/events" replace />} />
          <Route path="/events/past/Photos" element={<Navigate to="/gallery" replace />} />
          <Route path="/events/past/photos" element={<Navigate to="/gallery" replace />} />

          {/* Student Hub Subroutes */}
          <Route path="/student-hub" element={<StudentHubHome />} />
          <Route path="/student-hub/resources" element={<ResourcesPortal />} />
          <Route path="/student-hub/resources-portal" element={<ResourcesPortal />} />
          <Route path="/student-hub/achievements" element={<Achievements />} />
          <Route path="/student-hub/wellness" element={<WellnessPortal />} />
          <Route path="/student-hub/wellness-portal" element={<WellnessPortal />} />
          
          {/* Deep links for specific resource categories */}
          <Route path="/student-hub/internships" element={<ResourcesPortal initialCategory="internships" />} />
          <Route path="/student-hub/placements" element={<ResourcesPortal initialCategory="placements" />} />
          <Route path="/student-hub/competitions" element={<ResourcesPortal initialCategory="competitions" />} />
          <Route path="/student-hub/scholarships" element={<ResourcesPortal initialCategory="scholarships" />} />
          <Route path="/student-hub/higher-studies" element={<ResourcesPortal initialCategory="higher-studies" />} />
          <Route path="/student-hub/career-guidance" element={<ResourcesPortal initialCategory="career-guidance" />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
