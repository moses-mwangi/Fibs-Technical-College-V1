"use client"

import React from 'react';
import Link from 'next/link';

interface ContactItem {
  id: string;
  icon: React.ReactNode;
  label?: string;
  value: string;
  href?: string;
  type: 'email' | 'phone' | 'action';
}

const TopContactBar: React.FC = () => {
  // Contact information items with icons and links
  const contactItems: ContactItem[] = [
    {
      id: 'email1',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Info',
      value: 'info@fibscollege.com',
      href: 'mailto:info@fibscollege.com',
      type: 'email',
    },
    {
      id: 'email2',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Applications',
      value: 'applications@fibscollege.com',
      href: 'mailto:applications@fibscollege.com',
      type: 'email',
    },
    {
      // 0757 305 480 / 0723 895 185 / 0720 707 519
      id: 'phone1',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Call us',
      value: '0757 305 480',
      href: 'tel:+254757 305 480',
      type: 'phone',
    },
    {
      id: 'phone2',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'WhatsApp',
      value: '0723 895 185',
      href: 'https://wa.me/254723 895 1850?text=Hello%2C%20I%27m%20interested%20in%20your%20programs',
      type: 'phone',
    },
  ];

  // Additional action item: Online Application button
  const actionItem = {
    id: 'apply',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: 'Online Application',
    href: '/apply',
  };

  // Current date and time display (Kenya time)
  const [currentDateTime, setCurrentDateTime] = React.useState<string>('');
  
  React.useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Nairobi',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentDateTime(now.toLocaleString('en-KE', options));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-50 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white border-b border-indigo-400/30 shadow-lg">
      {/* Background pattern (optional subtle grid) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 py-2.5">
        {/* Flex layout: left side contact info, right side date + action button */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm md:text-base">
          {/* LEFT: Contact details - emails & phones */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {/* Emails group */}
            <div className="flex items-center gap-3 flex-wrap">
              {contactItems.filter(item => item.type === 'email').map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="group flex items-center gap-2 transition-all duration-200 hover:text-indigo-200 hover:scale-[102%] focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md px-1"
                  aria-label={`Email ${item.label}: ${item.value}`}
                >
                  <span className="text-indigo-300 group-hover:text-white transition-colors">
                    {item.icon}
                  </span>
                  <span className="font-medium tracking-wide">
                    {item.label && <span className="text-indigo-200 mr-1 text-xs font-semibold uppercase">{item.label}:</span>}
                    <span className="text-white/90 text-[15px] group-hover:text-white">{item.value}</span>
                  </span>
                </a>
              ))}
            </div>

            {/* Separator dot (visible on medium+) */}
            <span className="hidden sm:inline text-indigo-400 select-none">•</span>

            {/* Phone numbers group */}
            <div className="flex items-center gap-3 flex-wrap">
              {contactItems.filter(item => item.type === 'phone').map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.label === 'WhatsApp' ? '_blank' : undefined}
                  rel={item.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-2 transition-all duration-200 hover:text-indigo-200 hover:scale-[102%] focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md px-1"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  <span className="text-indigo-300 group-hover:text-white transition-colors">
                    {item.icon}
                  </span>
                  <span className="font-medium">
                    {item.label && <span className="text-indigo-200 mr-1 text-xs font-semibold uppercase">{item.label}:</span>}
                    <span className="text-white/90 text-[15px] group-hover:text-white">{item.value}</span>
                  </span>
                  {item.label === 'WhatsApp' && (
                    <span className="ml-0.5 text-xs bg-green-500/20 px-1.5 py-0.5 rounded-full text-green-200 font-semibold">
                      <i className="fab fa-whatsapp text-xs mr-0.5"></i> Chat
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: current time + online application button */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Live Kenya time chip */}
            {currentDateTime && (
              <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-indigo-300/30 shadow-sm">
                <svg className="w-3.5 h-3.5 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-mono font-semibold tracking-wider text-indigo-100">{currentDateTime}</span>
                <span className="text-[10px] text-indigo-300">(EAT)</span>
              </div>
            )}
            
            {/* Primary CTA: Online Application button (advanced style) */}
            <Link
              href={actionItem.href}
              className="group relative flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-4 py-1.5 rounded-full shadow-md transition-all duration-300 transform hover:scale-[102%] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-indigo-900 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                {actionItem.icon}
                <span className='text-[14px]'>{actionItem.label}</span>
                <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Optional subtle bottom shimmer line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>
    </div>
  );
};

export default TopContactBar;