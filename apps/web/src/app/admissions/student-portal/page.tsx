'use client';

import { motion } from 'framer-motion';
import { User, BookOpen, DollarSign, FileText, Calendar, Award, Settings, LogIn, CheckCircle, AlertCircle, Lock } from 'lucide-react';

const StudentPortalPage = () => {
  const portalFeatures = [
    {
      title: "Academic Records",
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      description: "Access your grades, transcripts, and academic progress",
      features: [
        "View current semester grades",
        "Download official transcripts",
        "Track GPA and academic standing",
        "View class schedules and timetables"
      ]
    },
    {
      title: "Fee Management",
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      description: "Manage your tuition fees and payment history",
      features: [
        "View current fee balance",
        "Check payment history and receipts",
        "Make online payments securely",
        "Download fee statements"
      ]
    },
    {
      title: "Course Registration",
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      description: "Register for courses and manage your academic plan",
      features: [
        "Register for upcoming semesters",
        "Add/drop courses within deadlines",
        "View course catalog and descriptions",
        "Check course prerequisites"
      ]
    },
    {
      title: "Examination Schedule",
      icon: <Calendar className="h-8 w-8 text-orange-600" />,
      description: "View exam timetables and results",
      features: [
        "Access examination timetables",
        "View exam venues and seating arrangements",
        "Check exam results when released",
        "Download exam result slips"
      ]
    },
    {
      title: "Library Services",
      icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
      description: "Access digital library resources and services",
      features: [
        "Search and borrow books online",
        "Access e-books and journals",
        "View borrowing history",
        "Renew borrowed materials"
      ]
    },
    {
      title: "Achievements & Awards",
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      description: "Track your academic achievements and awards",
      features: [
        "View certificates and awards",
        "Track scholarship status",
        "View academic honors",
        "Download achievement documents"
      ]
    }
  ];

  const loginSteps = [
    {
      step: 1,
      title: "Visit Portal",
      description: "Go to the student portal website",
      url: "portal.fibscollege.ac.ke"
    },
    {
      step: 2,
      title: "Enter Credentials",
      description: "Use your student ID and password",
      credentials: "Student ID: Provided during admission"
    },
    {
      step: 3,
      title: "Access Dashboard",
      description: "Navigate through your personalized dashboard",
      features: "Quick access to all services"
    }
  ];

  const troubleshooting = [
    {
      issue: "Forgot Password",
      solution: "Click 'Forgot Password' link and follow reset instructions",
      contact: "Contact IT support if email not received"
    },
    {
      issue: "Account Locked",
      solution: "Account locks after 3 failed attempts. Wait 30 minutes or contact support",
      contact: "IT Support: it@fibscollege.ac.ke"
    },
    {
      issue: "First Time Login",
      solution: "Use default password: your birthdate (DDMMYYYY)",
      contact: "Change password after first login"
    },
    {
      issue: "Portal Access Issues",
      solution: "Clear browser cache and cookies, try different browser",
      contact: "Ensure stable internet connection"
    }
  ];

  const securityTips = [
    "Never share your login credentials with anyone",
    "Use a strong password with letters, numbers, and symbols",
    "Log out after each session, especially on shared computers",
    "Change your password regularly",
    "Enable two-factor authentication if available",
    "Report suspicious activity immediately"
  ];

  const supportContacts = {
    itSupport: {
      title: "IT Support",
      phone: "+254 700 123 456",
      email: "itsupport@fibscollege.ac.ke",
      hours: "Monday - Friday: 8:00 AM - 6:00 PM",
      location: "Main Campus, IT Department"
    },
    academicOffice: {
      title: "Academic Office",
      phone: "+254 700 234 567",
      email: "academics@fibscollege.ac.ke",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM",
      location: "Main Campus, Building A"
    },
    financeOffice: {
      title: "Finance Office",
      phone: "+254 700 345 678",
      email: "finance@fibscollege.ac.ke",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM",
      location: "Main Campus, Building A"
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-600/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559028006-315a5db2c516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Student Portal</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Your gateway to academic services and resources at FIBS College
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Login Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Access Your Student Portal</h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Login to access your academic records, fee information, and other student services
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://portal.fibscollege.ac.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    Login to Student Portal
                  </a>
                  <button className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    <Settings className="h-4 w-4" />
                    Portal Help
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Portal Features */}
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8"
              >
                <User className="h-6 w-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Portal Features</h3>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portalFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                    
                    <ul className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Login Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Login</h3>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {loginSteps.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                          {step.step}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                        <p className="text-xs text-blue-600 font-medium">{step.url || step.credentials || step.features}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Troubleshooting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Common Issues & Solutions</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {troubleshooting.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                      <h4 className="font-semibold text-gray-900">{item.issue}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.solution}</p>
                    <p className="text-xs text-blue-600">{item.contact}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Security Tips */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-16 bg-amber-50 rounded-xl p-8 border border-amber-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="h-6 w-6 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-900">Security Tips</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {securityTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Support Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Support Contacts</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(supportContacts).map(([key, contact]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + key === 'itSupport' ? 0 : key === 'academicOffice' ? 0.1 : 0.2 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{contact.title}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-bold">📞</span>
                        </div>
                        <span className="text-gray-700">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm font-bold">✉</span>
                        </div>
                        <span className="text-gray-700">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 text-sm font-bold">📍</span>
                        </div>
                        <span className="text-gray-700">{contact.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 text-sm font-bold">🕐</span>
                        </div>
                        <span className="text-gray-700">{contact.hours}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile App */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mb-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobile App Available</h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Access the student portal on the go with our mobile app. Available for both Android and iOS devices.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    <span className="text-xl">📱</span>
                    Download on App Store
                  </button>
                  <button className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    <span className="text-xl">📱</span>
                    Get it on Google Play
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Need Help With Your Portal?</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Our support team is here to help you with any portal-related issues or questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:itsupport@fibscollege.ac.ke"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Contact IT Support
                  </a>
                  <a 
                    href="/admissions/faqs"
                    className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    View FAQs
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentPortalPage;
