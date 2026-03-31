// import Link from 'next/link';
// import Image from 'next/image';
// import { Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* College Info */}
//           <div className="col-span-1 md:col-span-2">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
//                 <Image 
//                   src="/images/fibs_Logo.png" 
//                   alt="FIBS Logo"
//                   width={32}
//                   height={32}
//                   className="object-contain"
//                 />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold">FIBS</h3>
//                 <p className="text-sm text-gray-400">Driving & Technical College</p>
//               </div>
//             </div>
//             <p className="text-gray-300 mb-4">
//               Empowering students with quality education and practical skills for a successful future in driving and technical fields.
//             </p>
//             <div className="flex space-x-4">
//               <div className="h-5 w-5 text-gray-400 hover:text-red-400 cursor-pointer transition-colors">f</div>
//               <div className="h-5 w-5 text-gray-400 hover:text-red-400 cursor-pointer transition-colors">𝕏</div>
//               <div className="h-5 w-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors">📷</div>
//               <div className="h-5 w-5 text-gray-400 hover:text-red-400 cursor-pointer transition-colors">in</div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                 <Link href="/about" className="text-gray-300 hover:text-red-400 transition-colors">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/courses" className="text-gray-300 hover:text-red-400 transition-colors">
//                   Courses
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/apply" className="text-gray-300 hover:text-red-400 transition-colors">
//                   Apply Now
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/gallery" className="text-gray-300 hover:text-red-400 transition-colors">
//                   Gallery
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/news" className="text-gray-300 hover:text-red-400 transition-colors">
//                   News & Events
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-2">
//                 <Phone className="h-4 w-4 text-blue-400" />
//                 <span className="text-gray-300">+254 700 123 456</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Phone className="h-4 w-4 text-blue-400" />
//                 <span className="text-gray-300">+254 712 987 654</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Mail className="h-4 w-4 text-blue-400" />
//                 <span className="text-gray-300">info@fibscollege.ac.ke</span>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <MapPin className="h-4 w-4 text-blue-400 mt-1" />
//                 <span className="text-gray-300">
//                   Nairobi, Kenya<br />
//                   Along Thika Road, Next to Garden City Mall
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//           <p className="text-gray-400">
//             © {new Date().getFullYear()} FIBS Driving and Technical College. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


"use client"
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Send, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Users, 
  Calendar,
} from 'lucide-react';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'About Us', href: '/about', icon: <GraduationCap className="h-4 w-4" /> },
    { name: 'Our Programs', href: '/programs', icon: <BookOpen className="h-4 w-4" /> },
    { name: 'Admissions', href: '/admissions', icon: <Users className="h-4 w-4" /> },
    { name: 'Apply Now', href: '/apply', icon: <Send className="h-4 w-4" /> },
    { name: 'News & Events', href: '/news', icon: <Calendar className="h-4 w-4" /> },
    { name: 'Gallery', href: '/gallery', icon: <Award className="h-4 w-4" /> },
  ];
  
  const contactInfo = [
    { icon: Phone, text: '0706-212101', href: 'tel:+254706212101', label: 'Call us' },
    { icon: Phone, text: '0707-490390', href: 'tel:+254707490390', label: 'WhatsApp' },
    { icon: Mail, text: 'info@fibscollege.ac.ke', href: 'mailto:info@fibscollege.ac.ke', label: 'Email us' },
    { icon: Mail, text: 'applications@fibscollege.ac.ke', href: 'mailto:applications@fibscollege.ac.ke', label: 'Applications' },
  ];
  
  const openingHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];
  
  const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-500' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-sky-400' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-600' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:text-red-600' },
];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* College Info & Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                <Image 
                  src="/images/fibs_Logo.png" 
                  alt="FIBS Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  FIBS
                </h3>
                <p className="text-sm text-gray-400">Driving & Technical College</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed">
              Empowering students with quality education and practical skills for a successful future in driving and technical fields.
            </p>
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/30 mb-4">
              <Award className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-xs text-blue-300">KNEC Accredited Institution</span>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 ${social.color} hover:bg-gray-700 hover:scale-110`}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500 mt-1"></div>
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 -translate-x-1" />
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Contact Info
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500 mt-1"></div>
            </h4>
            <div className="space-y-3">
              {contactInfo.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.href}
                  className="flex items-start space-x-3 group hover:translate-x-1 transition-transform"
                >
                  <contact.icon className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">{contact.label}</span>
                    <span className="text-gray-300 group-hover:text-red-400 transition-colors">
                      {contact.text}
                    </span>
                  </div>
                </a>
              ))}
              
              <div className="flex items-start space-x-3 mt-3 pt-2 border-t border-gray-800">
                <MapPin className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-gray-500">Visit us</span>
                  <p className="text-gray-300 text-sm">
                    Nairobi, Kenya<br />
                    Along Thika Road, Next to Garden City Mall
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Opening Hours
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500 mt-1"></div>
            </h4>
            <div className="space-y-2 mb-6">
              {openingHours.map((schedule, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{schedule.day}</span>
                  <span className="text-gray-300">{schedule.hours}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <p className="text-xs text-gray-400 mb-3">
                Get updates about new courses and events
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} FIBS Driving and Technical College. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-red-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-red-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-red-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button - Optional */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;