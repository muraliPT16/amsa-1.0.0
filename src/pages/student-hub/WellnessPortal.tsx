import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentHubLayout from '../../layouts/StudentHubLayout';
import wellnessData from '../../data/wellness.json';

export default function WellnessPortal() {
  const { header, emergencyHelplines, supportServices, amsaInitiatives, selfCareResources, faqs } = wellnessData;

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState('all');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <StudentHubLayout
      title="AMSA | Wellness Portal"
      headerTitle={header.title}
      headerSubtitle={header.subtitle}
      headerTag={header.tag}
      coverImage="/images/wellness_cover.png"
      headerRightContent={
        <a
          href="https://apm.iitm.ac.in/grievances/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block p-4 sm:p-4.5 rounded-2xl bg-[#FFFDF9] hover:bg-box border-2 border-[#7A1E1B]/20 hover:border-[#7A1E1B]/60 shadow-lg hover:shadow-xl transition-all duration-300 max-w-xs sm:max-w-sm w-full text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#7A1E1B]/10 border border-[#7A1E1B]/20 flex items-center justify-center text-[#7A1E1B] flex-shrink-0 group-hover:scale-105 group-hover:bg-[#7A1E1B] group-hover:text-white transition-all duration-300 shadow-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.333A12.063 12.063 0 0012 9c-2.485 0-4.825.755-6.75 2.052V21m16.5 0H2.25" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-extrabold text-[#7A1E1B] group-hover:text-[#942622] transition-colors leading-snug">
                Department Grievance Committee
              </h3>
              <div className="inline-flex items-center text-xs font-light text-[#B8860B] group-hover:text-[#7A1E1B] gap-1 mt-1 transition-colors">
                <span>Visit</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </div>
          </div>
        </a>
      }
    >
      <div className="space-y-12 text-left">
        {/* Urgent Emergency Alert Bar */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600"></span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              24/7 Immediate Help & Helplines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyHelplines.map((item) => (
              <div
                key={item.id}
                className="bg-box p-6 sm:p-7 rounded-2xl border border-box-border/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-5 relative overflow-hidden group"
              >
                <div className="absolute top-0 inset-x-0 h-1.5 bg-rose-500 group-hover:bg-rose-600 transition-colors"></div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black font-mono tracking-wider px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                      {item.badge}
                    </span>
                    <span className="text-xs font-light text-slate-600 flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                      {item.available}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug group-hover:text-rose-700 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-line space-y-2.5">
                  <a
                    href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm sm:text-base font-black font-mono tracking-wider shadow-sm hover:shadow transition-all duration-200"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <span>{item.phone}</span>
                  </a>

                  {item.altPhone && (
                    <a
                      href={`tel:${item.altPhone.replace(/[^0-9+]/g, '')}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 hover:bg-slate-200/90 border border-box-border/60 text-slate-800 rounded-xl text-xs sm:text-sm font-light transition-colors duration-200"
                    >
                      <span className="text-slate-500 font-light">Alt Line:</span>
                      <span className="text-slate-900 font-light">{item.altPhone}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Institute Wellness Ecosystem & Support Portals */}
        <section className="space-y-6">
          <div className="border-l-4 border-l-teal-600 pl-4">
            <span className="text-xs font-bold text-teal-600 font-mono tracking-widest block">
              Institute Facilities & Counseling
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
              Wellness Services & Support Centers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Official institutional bodies providing professional psychological, medical, and peer support across the IIT Madras campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportServices.map((service) => (
              <div
                key={service.id}
                className="bg-box p-6 sm:p-8 rounded-2xl border border-box-border/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Category & Title */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black font-mono tracking-wider px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200 inline-block">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature Highlights */}
                  {service.features && (
                    <div className="space-y-2 pt-2 border-t border-line">
                      <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 block">
                        What They Provide:
                      </span>
                      <ul className="space-y-1.5">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs font-light text-slate-700">
                            <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Logistics Info (Location, Timings, Phone, Email) */}
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-box-border/60 space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-start gap-2.5 text-slate-700">
                      <svg className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span><strong className="text-slate-900">Location:</strong> {service.location}</span>
                    </div>

                    <div className="flex items-start gap-2.5 text-slate-700">
                      <svg className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong className="text-slate-900">Timings:</strong> {service.timings}</span>
                    </div>

                    {service.phone && (
                      <div className="flex items-center gap-2.5 text-slate-700">
                        <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <span>
                          <strong className="text-slate-900">Phone:</strong>{' '}
                          <a
                            href={`tel:${service.phone.replace(/[^0-9+]/g, '')}`}
                            className="text-slate-800 hover:text-teal-700 font-light hover:underline transition-colors"
                          >
                            {service.phone}
                          </a>
                        </span>
                      </div>
                    )}

                    {service.email && (
                      <div className="flex items-center gap-2.5 text-slate-700">
                        <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <span>
                          <strong className="text-slate-900">Email:</strong>{' '}
                          <a
                            href={`mailto:${service.email}`}
                            className="text-teal-700 hover:text-teal-900 font-light hover:underline transition-colors"
                          >
                            {service.email}
                          </a>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3">
                  {service.website && (
                    <a
                      href={service.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold font-mono tracking-wider transition-colors"
                    >
                      <span>Official Website</span>
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}

                  {service.bookingLink && (
                    <a
                      href={service.bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black font-mono tracking-wider shadow-sm hover:shadow transition-all"
                    >
                      <span>Book Appointment</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: AMSA Departmental Wellness Initiatives */}
        <section className="bg-gradient-to-br from-slate-50 to-accent-50/40 p-8 sm:p-10 rounded-3xl border border-box-border/80 shadow-sm space-y-6">
          <div className="text-left space-y-1">
            <span className="text-xs font-bold text-accent-600 font-mono tracking-widest block">
              Student-to-Student Welfare
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              AMSA Peer Support & Wellbeing Initiatives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
              We foster a warm, inclusive, and collaborative atmosphere in the Applied Mechanics & Biomedical Engineering department.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {amsaInitiatives.map((init) => (
              <div
                key={init.id}
                className="bg-box p-5 rounded-2xl border border-box-border/60 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 text-accent-600 flex items-center justify-center font-light">
                    ★
                  </div>
                  <h4 className="text-sm font-black text-slate-900 leading-snug">
                    {init.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {init.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Self-Care & Academic Balance Resources */}
        <section className="space-y-6">
          <div className="border-l-4 border-l-accent-500 pl-4">
            <span className="text-xs font-bold text-accent-600 font-mono tracking-widest block">
              Healthy Habits
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
              Self-Care & Academic Balance Guides
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selfCareResources.map((guide) => (
              <div
                key={guide.id}
                className="bg-box p-6 rounded-2xl border border-box-border/60 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold font-mono tracking-wider text-accent-700 bg-accent-50 border border-accent-200 px-2 py-0.5 rounded">
                    {guide.type}
                  </span>
                  <h4 className="text-base font-black text-slate-900 pt-1">
                    {guide.title}
                  </h4>
                </div>

                <ul className="space-y-2 text-xs font-medium text-slate-600 border-t border-line pt-3">
                  {guide.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent-500 font-light">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Frequently Asked Questions (FAQ) Accordion */}
        <section className="bg-box p-6 sm:p-10 rounded-3xl border border-box-border/60 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-600 font-mono tracking-widest block">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Frequently Asked Questions on Wellness Support
            </h2>
          </div>

          <div className="space-y-3 border-t border-line pt-6">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={`faq-${index}`}
                  className="rounded-2xl border border-box-border/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left bg-slate-50/60 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-light text-slate-900 pr-4">
                      {faq.question}
                    </span>
                    <span className={`w-6 h-6 rounded-full bg-box border border-box-border/60 flex items-center justify-center flex-shrink-0 text-slate-600 transform transition-transform duration-200 ${isOpen ? 'rotate-180 bg-accent-400 text-slate-950 border-accent-400' : ''}`}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-paper border-t border-line text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Reach Out / Need Help Banner */}
        <section className="bg-ink rounded-3xl p-8 sm:p-12 border border-slate-900 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(212,175,55,0.08),_transparent_50%)] pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-black text-accent-400 font-mono tracking-widest block">
                Confidential & Caring Environment
              </span>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                You Are Never Alone. We Are Here For You.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium leading-relaxed">
                Whether you want to discuss academic stress, need a listening ear, or want confidential help connecting to an institute counsellor, feel free to reach out.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <a
                href="https://dost.iitm.ac.in/wellness-center"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-400 hover:bg-accent-300 text-slate-950 font-black text-xs font-mono tracking-wider shadow-lg hover:scale-[1.02] transition-all"
              >
                <span>Visit Wellness Portal</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>

              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs font-mono tracking-wider transition-all"
              >
                <span>Contact AMSA Team</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </StudentHubLayout>
  );
}
