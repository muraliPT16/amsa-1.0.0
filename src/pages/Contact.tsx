import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import contactData from '../data/contact.json';

export default function Contact() {
  const { location: officeLocation, email, phone, socials, mapEmbedUrl } = contactData;

  const routeLocation = useLocation();
  const searchParams = new URLSearchParams(routeLocation.search);
  const activeEvent = searchParams.get('event');
  const activeSubject = searchParams.get('subject');
  const activeTopic = searchParams.get('topic');

  // Form states
  const [name, setName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Set values from query parameters on mount
  useEffect(() => {
    if (activeEvent) {
      setSubject(`Event Inquiry: ${decodeURIComponent(activeEvent)}`);
      setCategory('General Inquiry');
    } else if (activeSubject) {
      if (activeSubject === 'Gallery-Submission') {
        setSubject('Gallery Photo Submission');
        setCategory('General Inquiry');
      } else {
        setSubject(decodeURIComponent(activeSubject));
        if (activeSubject.toLowerCase().includes('partner')) {
          setCategory('Collaborations');
        }
      }
    } else if (activeTopic) {
      if (activeTopic === 'achievement') {
        setSubject('Student Achievement Submission');
        setCategory('Student Support');
      } else {
        setSubject(decodeURIComponent(activeTopic));
      }
    }
  }, [activeEvent, activeSubject, activeTopic]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock network lag
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setName('');
    setFormEmail('');
    setSubject('');
    setCategory('General Inquiry');
    setMessage('');
    setIsSuccess(false);
  };

  return (
    <MainLayout title="AMSA | Contact Us" description="Get in touch with the Applied Mechanics Student Association (AMSA). Send us a message, find our office, or view our location on Google Maps.">
      {/* 1. Hero Cover & Form Section */}
      <div className="relative w-full pt-28 pb-16 md:py-24 bg-ink text-white border-b border-slate-900 overflow-hidden select-none">
        {/* Subtle background gradient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(212,175,55,0.06),_transparent_50%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Header Details */}
            <div className="w-full lg:col-span-5 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-xs font-black text-accent-500 font-mono tracking-widest block mb-1">Get In Touch</span>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
                  We'd Love to <br />
                  Hear From <span className="text-accent-400">You!</span>
                </h1>
                <div className="w-16 h-1 bg-accent-400 rounded"></div>
                <p className="font-display italic font-light text-slate-300 text-base sm:text-lg leading-relaxed max-w-md pt-2">
                  Have a question, suggestion, or collaboration idea? We're here to connect and create impact together. Reach out to us!
                </p>
              </div>

              {/* Contact Channels List */}
              <div className="space-y-6 pt-2">
                {/* Channel 1: Email */}
                <a href={`mailto:${email}`} className="flex items-center space-x-4 group cursor-pointer max-w-sm">
                  <div className="h-11 w-11 rounded-lg bg-accent-500/10 border border-accent-500/25 flex items-center justify-center text-accent-400 group-hover:bg-accent-500 group-hover:text-slate-950 transition-all duration-300 shadow-inner">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-[10px] font-black font-mono text-slate-400 tracking-wider block">Email Us</span>
                    <span className="text-sm font-medium text-slate-100 group-hover:text-accent-400 transition-colors block mt-0.5">{email}</span>
                  </div>
                </a>

                {/* Channel 2: Phone */}
                <a href={`tel:${phone}`} className="flex items-center space-x-4 group cursor-pointer max-w-sm">
                  <div className="h-11 w-11 rounded-lg bg-accent-500/10 border border-accent-500/25 flex items-center justify-center text-accent-400 group-hover:bg-accent-500 group-hover:text-slate-950 transition-all duration-300 shadow-inner">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-[10px] font-black font-mono text-slate-400 tracking-wider block">Call Us</span>
                    <span className="text-sm font-medium text-slate-100 group-hover:text-accent-400 transition-colors block mt-0.5">{phone}</span>
                  </div>
                </a>

                {/* Channel 3: Address */}
                <div className="flex items-center space-x-4 max-w-sm">
                  <div className="h-11 w-11 rounded-lg bg-accent-500/10 border border-accent-500/25 flex items-center justify-center text-accent-400 shadow-inner flex-shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-[10px] font-black font-mono text-slate-400 tracking-wider block">Visit Us</span>
                    <span className="text-sm font-medium text-slate-200 block mt-0.5">Department of Applied Mechanics & Biomedical Engineering, Indian Institute of Technology Madras</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Message Form Card */}
            <div className="w-full lg:col-span-7">
              <div className="bg-box border border-box-border/60 rounded-2xl p-8 sm:p-10 shadow-2xl relative">
                <div className="space-y-1.5 text-left mb-8">
                  <h2 className="text-xl sm:text-2xl font-black font-mono tracking-wide text-slate-900">Send Us a Message</h2>
                  <p className="text-xs text-slate-600 font-medium">We'll get back to you as soon as possible.</p>
                </div>

                {/* Contact Submit Form */}
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label htmlFor="form-name" className="text-[9px] font-black font-mono tracking-wider text-slate-500 block">Your Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          id="form-name" 
                          required 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe" 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-box-border/60 focus:border-accent-400 focus:bg-box focus:outline-none rounded-lg text-sm text-slate-900 placeholder-slate-400 transition-all duration-300 font-light"
                        />
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5">
                      <label htmlFor="form-email" className="text-[9px] font-black font-mono tracking-wider text-slate-500 block">Your Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <input 
                          type="email" 
                          id="form-email" 
                          required 
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="johndoe@email.com" 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-box-border/60 focus:border-accent-400 focus:bg-box focus:outline-none rounded-lg text-sm text-slate-900 placeholder-slate-400 transition-all duration-300 font-light"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Subject input */}
                    <div className="space-y-1.5">
                      <label htmlFor="form-subject" className="text-[9px] font-black font-mono tracking-wider text-slate-500 block">Subject</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          id="form-subject" 
                          required 
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Inquiry / Registration Help" 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-box-border/60 focus:border-accent-400 focus:bg-box focus:outline-none rounded-lg text-sm text-slate-900 placeholder-slate-400 transition-all duration-300 font-light"
                        />
                      </div>
                    </div>

                    {/* Category selector */}
                    <div className="space-y-1.5">
                      <label htmlFor="form-category" className="text-[9px] font-black font-mono tracking-wider text-slate-500 block">Category</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        </div>
                        <select 
                          id="form-category" 
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-box-border/60 focus:border-accent-400 focus:bg-box focus:outline-none rounded-lg text-sm text-slate-900 transition-all duration-300 font-light cursor-pointer appearance-none"
                        >
                          <option value="General Inquiry">General Inquiries</option>
                          <option value="Collaborations">Collaborations</option>
                          <option value="Sponsorships">Sponsorships</option>
                          <option value="Internships & Placements">Internships & Placements</option>
                          <option value="Student Support">Student Support</option>
                        </select>
                        {/* Custom Arrow */}
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message input */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-message" className="text-[9px] font-black font-mono tracking-wider text-slate-500 block">Your Message</label>
                    <div className="relative">
                      <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-500">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <textarea 
                        id="form-message" 
                        required 
                        rows={4} 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your question or proposal details here..." 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-box-border/60 focus:border-accent-400 focus:bg-box focus:outline-none rounded-lg text-sm text-slate-900 placeholder-slate-400 transition-all duration-300 font-light resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-accent-500 hover:bg-accent-400 text-slate-950 text-xs font-black font-mono tracking-wider shadow-lg shadow-accent-500/10 hover:shadow-accent-500/20 hover:scale-[1.02] cursor-pointer transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Success Alert Overlay */}
                <div
                  className={`absolute inset-0 bg-paper/95 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 transition-opacity duration-300 z-20 ${
                    isSuccess ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="h-16 w-16 bg-accent-500/10 border border-accent-500/25 text-accent-500 rounded-full flex items-center justify-center shadow-lg shadow-accent-500/5">
                    <svg className="h-9 w-9 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <h3 className="text-xl font-black text-accent-600">Message Received!</h3>
                    <p className="text-sm text-slate-600 font-medium">Thank you for reaching out. A member of our student association team will get back to you shortly.</p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-2.5 rounded border border-box-border/60 bg-slate-50 hover:bg-slate-100 text-xs font-extrabold font-mono tracking-widest text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Find Us & Interactive Vector Map Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Address Details Card */}
          <div className="w-full lg:col-span-4 flex flex-col justify-between bg-ink border border-slate-900 text-white rounded-2xl p-8 shadow-xl text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,_rgba(212,175,55,0.04),_transparent_35%)] pointer-events-none"></div>
            
            <div className="space-y-8 relative z-10">
              <div className="space-y-2">
                <h2 className="text-2xl font-black font-mono tracking-wide leading-none text-white">Find Us</h2>
                <div className="w-10 h-0.5 bg-accent-400 rounded"></div>
              </div>
              
              <div className="space-y-6 pt-2">
                {/* Office */}
                <div className="flex items-start space-x-3.5">
                  <div className="h-9 w-9 bg-accent-500/10 border border-accent-500/20 text-accent-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black font-mono text-slate-400 tracking-wider block">Office Address</span>
                    <p className="text-xs font-light leading-relaxed text-slate-200">{officeLocation}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3.5">
                  <div className="h-9 w-9 bg-accent-500/10 border border-accent-500/20 text-accent-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black font-mono text-slate-400 tracking-wider block">Email Inquiries</span>
                    <p className="text-xs font-light text-slate-200">{email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3.5">
                  <div className="h-9 w-9 bg-accent-500/10 border border-accent-500/20 text-accent-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black font-mono text-slate-400 tracking-wider block">Office Hotline</span>
                    <p className="text-xs font-light text-slate-200">{phone}</p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start space-x-3.5">
                  <div className="h-9 w-9 bg-accent-500/10 border border-accent-500/20 text-accent-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black font-mono text-slate-400 tracking-wider block">Working Hours</span>
                    <p className="text-xs font-light text-slate-200">Mon – Fri &nbsp;|&nbsp; 9:00 AM – 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Follow Icons */}
            <div className="border-t border-slate-800 pt-6 mt-8 relative z-10 flex flex-col gap-3">
              <span className="text-[9px] font-black font-mono tracking-wider text-slate-400">Follow Us</span>
              <div className="flex items-center space-x-3">
                {socials.instagram && (
                  <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded bg-slate-950 border border-slate-800 hover:border-accent-400 hover:bg-slate-900 text-slate-400 hover:text-accent-400 flex items-center justify-center transition-all duration-300" aria-label="Instagram">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded bg-slate-950 border border-slate-800 hover:border-accent-400 hover:bg-slate-900 text-slate-400 hover:text-accent-400 flex items-center justify-center transition-all duration-300" aria-label="LinkedIn">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {socials.facebook && (
                  <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded bg-slate-950 border border-slate-800 hover:border-accent-400 hover:bg-slate-900 text-slate-400 hover:text-accent-400 flex items-center justify-center transition-all duration-300" aria-label="Facebook">
                    <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                <a href={`mailto:${email}`} className="h-9 w-9 rounded bg-slate-950 border border-slate-800 hover:border-accent-400 hover:bg-slate-900 text-slate-400 hover:text-accent-400 flex items-center justify-center transition-all duration-300" aria-label="Email">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="w-full lg:col-span-8 flex flex-col">
            <div className="relative w-full bg-slate-50 border border-box-border/60 rounded-2xl overflow-hidden shadow-xl flex-grow flex flex-col justify-between min-h-[450px] lg:min-h-auto">
              {/* Google Map Iframe */}
              <div className="w-full flex-grow relative z-10 min-h-[380px] lg:min-h-[420px]">
                <iframe 
                  title="Department of Applied Mechanics & Biomedical Engineering, IIT Madras Location Map"
                  className="w-full h-full min-h-[380px] lg:min-h-[420px] border-0 bg-slate-100" 
                  src={mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7117810041077!2d80.22817227592431!3d12.99027731446687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52677e5de7aa4d%3A0xc17d2a5cbc4c94b9!2sDepartment%20of%20Applied%20Mechanics%20and%20Biomedical%20Engineering!5e0!3m2!1sen!2sin!4v1787580568377!5m2!1sen!2sin"} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>

              {/* Bottom hint overlay */}
              <div className="bg-paper border-t border-line/80 px-6 py-4 relative z-10 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 font-extrabold font-mono tracking-widest gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-accent-500 rounded-full"></span>
                  Google Maps Location
                </span>
                <span>Department of Applied Mechanics & Biomedical Engineering &bull; IIT Madras</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
