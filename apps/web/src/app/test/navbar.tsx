"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface DropdownSection {
  title: string;
  items: DropdownItem[];
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const programsRef = useRef<HTMLDivElement>(null);
  const admissionsRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  // Programs data - comprehensive list of all programs
  const programs: DropdownSection[] = [
    {
      title: "Business & Management",
      items: [
        { name: "Business Administration", href: "/programs/business-administration", description: "Bachelor's & Diploma programs" },
        { name: "Accounting & Finance", href: "/programs/accounting-finance", description: "CPA, ACCA, and finance courses" },
        { name: "Marketing Management", href: "/programs/marketing-management", description: "Digital marketing & brand strategy" },
        { name: "Human Resource Management", href: "/programs/human-resource", description: "HR analytics & people management" },
        { name: "Project Management", href: "/programs/project-management", description: "PMP, PRINCE2 certified" },
      ]
    },
    {
      title: "Information Technology",
      items: [
        { name: "Computer Science", href: "/programs/computer-science", description: "Software development & algorithms" },
        { name: "Information Technology", href: "/programs/information-technology", description: "Network admin & IT support" },
        { name: "Data Science & Analytics", href: "/programs/data-science", description: "Big data, ML & AI" },
        { name: "Cybersecurity", href: "/programs/cybersecurity", description: "Ethical hacking & security" },
        { name: "Web & Mobile Development", href: "/programs/web-mobile-dev", description: "Full-stack & app development" },
      ]
    },
    {
      title: "Engineering & Technical",
      items: [
        { name: "Civil Engineering", href: "/programs/civil-engineering", description: "Structural & construction" },
        { name: "Electrical Engineering", href: "/programs/electrical-engineering", description: "Power systems & electronics" },
        { name: "Mechanical Engineering", href: "/programs/mechanical-engineering", description: "Manufacturing & robotics" },
        { name: "Computer Engineering", href: "/programs/computer-engineering", description: "Hardware & embedded systems" },
      ]
    },
    {
      title: "Health Sciences",
      items: [
        { name: "Nursing", href: "/programs/nursing", description: "Registered nursing programs" },
        { name: "Clinical Medicine", href: "/programs/clinical-medicine", description: "Clinical officer training" },
        { name: "Pharmacy", href: "/programs/pharmacy", description: "Pharmaceutical sciences" },
        { name: "Public Health", href: "/programs/public-health", description: "Community health & epidemiology" },
      ]
    },
    {
      title: "Hospitality & Tourism",
      items: [
        { name: "Hotel Management", href: "/programs/hotel-management", description: "Hospitality operations" },
        { name: "Tourism Management", href: "/programs/tourism-management", description: "Travel & tour operations" },
        { name: "Culinary Arts", href: "/programs/culinary-arts", description: "Professional chef training" },
      ]
    },
    {
      title: "Short Courses & Certifications",
      items: [
        { name: "Digital Marketing", href: "/programs/digital-marketing", description: "SEO, social media, analytics" },
        { name: "Graphic Design", href: "/programs/graphic-design", description: "Adobe Creative Suite" },
        { name: "Python Programming", href: "/programs/python", description: "Programming fundamentals" },
        { name: "Leadership & Governance", href: "/programs/leadership", description: "Executive leadership" },
      ]
    }
  ];

  // Media Center data - Gallery, News, Blogs
  const mediaCenter: DropdownItem[] = [
    { name: "Gallery", href: "/media/gallery", description: "Campus life, events, and facilities", icon: "📸" },
    { name: "News", href: "/media/news", description: "Latest updates and announcements", icon: "📰" },
    { name: "Blogs", href: "/media/blogs", description: "Insights, articles, and student stories", icon: "✍️" },
    { name: "Events", href: "/media/events", description: "Upcoming workshops and seminars", icon: "🎉" },
    { name: "Podcasts", href: "/media/podcasts", description: "Educational audio content", icon: "🎙️" },
  ];

  // Admissions data - comprehensive admission details
  const admissions: DropdownSection[] = [
    {
      title: "Admission Process",
      items: [
        { name: "Registration Process", href: "/admissions/registration-process", description: "Step-by-step enrollment guide" },
        { name: "Online Application", href: "/admissions/online-application", description: "Apply directly through our portal" },
        { name: "Entry Requirements", href: "/admissions/entry-requirements", description: "Minimum qualifications & documents" },
        { name: "Application Deadlines", href: "/admissions/deadlines", description: "Important dates and timelines" },
      ]
    },
    {
      title: "Fees & Payments",
      items: [
        { name: "Fee Structure", href: "/admissions/fee-structure", description: "Detailed program costs" },
        { name: "Fee Payment Batch", href: "/admissions/fee-payment-batch", description: "Payment schedules & batches" },
        { name: "Scholarships", href: "/admissions/scholarships", description: "Financial aid opportunities" },
        { name: "Payment Methods", href: "/admissions/payment-methods", description: "MPESA, bank, card payments" },
      ]
    },
    {
      title: "Student Support",
      items: [
        { name: "International Students", href: "/admissions/international", description: "Visa & accommodation info" },
        { name: "Student Portal", href: "/admissions/student-portal", description: "Access your academic records" },
        { name: "FAQs", href: "/admissions/faqs", description: "Frequently asked questions" },
      ]
    }
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Programs', href: '/programs', hasDropdown: true, dropdownType: 'programs' },
    { name: 'Admissions', href: '/admissions', hasDropdown: true, dropdownType: 'admissions' },
    { name: 'Media Center', href: '/media', hasDropdown: true, dropdownType: 'media' },
    { name: 'Campus', href: '/campus-life' },
    { name: 'Contact', href: '/contact' },
  ];

  // Handle dropdown hover with delay for better UX
  const handleMouseEnter = (dropdownType: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(dropdownType);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleMobileExpand = (dropdownType: string) => {
    if (mobileExpanded === dropdownType) {
      setMobileExpanded(null);
    } else {
      setMobileExpanded(dropdownType);
    }
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  // Render Programs Dropdown - responsive width, positioned under link
  const renderProgramsDropdown = () => (
    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[90vw] max-w-5xl bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 max-h-[70vh] overflow-y-auto">
        {programs.map((section, idx) => (
          <div key={idx} className="border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0">
            <div className="px-5 pt-5 pb-2">
              <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
            <div className="px-5 pb-5 space-y-1">
              {section.items.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  href={item.href}
                  className="block group py-2 transition-all duration-150"
                  onClick={() => setActiveDropdown(null)}
                >
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-medium group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </span>
                    {item.description && (
                      <span className="text-xs text-gray-500 group-hover:text-indigo-500">
                        {item.description}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-t border-gray-100">
        <Link href="/programs/all" className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 inline-flex items-center gap-1">
          View All Programs
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );

  // Render Media Center Dropdown - centered under link
  const renderMediaDropdown = () => (
    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
      <div className="p-4">
        <div className="grid gap-2">
          {mediaCenter.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onClick={() => setActiveDropdown(null)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-150 group"
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-gray-800 group-hover:text-indigo-600">
                  {item.name}
                </div>
                {item.description && (
                  <div className="text-xs text-gray-500">{item.description}</div>
                )}
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Admissions Dropdown - responsive width, centered under link
  const renderAdmissionsDropdown = () => (
    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[90vw] max-w-4xl bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-h-[70vh] overflow-y-auto">
        {admissions.map((section, idx) => (
          <div key={idx} className="border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0">
            <div className="px-5 pt-5 pb-2">
              <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
            <div className="px-5 pb-5 space-y-2">
              {section.items.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  href={item.href}
                  onClick={() => setActiveDropdown(null)}
                  className="block py-2 group"
                >
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-medium group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </span>
                    {item.description && (
                      <span className="text-xs text-gray-500 group-hover:text-indigo-500">
                        {item.description}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
        <Link href="/admissions/online-application" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
          Apply Now
        </Link>
        <Link href="/admissions/contact-admissions" className="text-sm text-indigo-600 font-semibold hover:text-indigo-800">
          Contact Admissions →
        </Link>
      </div>
    </div>
  );

  const getDropdownContent = (dropdownType: string) => {
    switch (dropdownType) {
      case 'programs':
        return renderProgramsDropdown();
      case 'media':
        return renderMediaDropdown();
      case 'admissions':
        return renderAdmissionsDropdown();
      default:
        return null;
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-white rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src="/images/fibs_Logo.png" 
                  alt="FIBS Logo"
                  width={65}
                  height={65}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FIBS</h1>
                <p className="text-xs text-gray-600">Driving & Technical College</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links with Dropdowns */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(link.dropdownType!)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 flex items-center gap-1 whitespace-nowrap ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                      }`}
                    >
                      {link.name}
                      <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.dropdownType ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === link.dropdownType && getDropdownContent(link.dropdownType!)}
                  </div>
                );
              }
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Button (desktop) */}
          <div className="flex gap-4">
          <div className="hidden md:block">
            <Link
              href="/admissions/online-application"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-red-700 hover:to-red-800 text-white px-5 py-[10px] rounded-md text-sm font-semibold shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Apply Now
            </Link>
          </div>
          <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-indigo-700 hover:to-indigo-800 text-white px-5 py-2 rounded-md text-sm font-semibold shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel with expandable sections */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              
              if (link.hasDropdown) {
                const isExpanded = mobileExpanded === link.dropdownType;
                return (
                  <div key={link.name} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => handleMobileExpand(link.dropdownType!)}
                      className="w-full flex justify-between items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      <span>{link.name}</span>
                      <svg className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className="pl-4 pb-2 space-y-2">
                        {link.dropdownType === 'programs' && (
                          <div className="space-y-4">
                            {programs.map((section, idx) => (
                              <div key={idx}>
                                <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider px-3 pt-2">
                                  {section.title}
                                </h4>
                                {section.items.map((item, itemIdx) => (
                                  <Link
                                    key={itemIdx}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                        {link.dropdownType === 'media' && (
                          <div>
                            {mediaCenter.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
                              >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                        {link.dropdownType === 'admissions' && (
                          <div className="space-y-4">
                            {admissions.map((section, idx) => (
                              <div key={idx}>
                                <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider px-3 pt-2">
                                  {section.title}
                                </h4>
                                {section.items.map((item, itemIdx) => (
                                  <Link
                                    key={itemIdx}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/admissions/online-application"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 w-full text-center bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-3 rounded-full font-semibold"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;