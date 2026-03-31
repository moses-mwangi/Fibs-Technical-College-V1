'use client';

import { motion } from 'framer-motion';
import { Award, DollarSign, Users, BookOpen, CheckCircle, AlertCircle, Download, Target } from 'lucide-react';

const ScholarshipsPage = () => {
  const scholarships = [
    {
      name: "Academic Excellence Scholarship",
      icon: <Award className="h-6 w-6 text-yellow-600" />,
      category: "Merit-Based",
      value: "Up to 50% tuition fee",
      eligibility: [
        "KCSE mean grade of A- or above",
        "Strong performance in relevant subjects",
        "Demonstrated leadership qualities",
        "Good conduct certificate"
      ],
      deadline: "December 15, 2023",
      available: 20,
      description: "Awarded to top-performing students with outstanding academic records"
    },
    {
      name: "Need-Based Financial Aid",
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      category: "Need-Based",
      value: "Up to 30% tuition fee",
      eligibility: [
        "Demonstrated financial need",
        "Household income below KES 100,000/month",
        "Good academic standing (C+ and above)",
        "Personal statement and references"
      ],
      deadline: "January 10, 2024",
      available: 30,
      description: "Support for students from low-income backgrounds who demonstrate academic potential"
    },
    {
      name: "Sports Talent Scholarship",
      icon: <Target className="h-6 w-6 text-blue-600" />,
      category: "Talent-Based",
      value: "Up to 40% tuition fee",
      eligibility: [
        "Regional or national level participation",
        "Outstanding sports achievements",
        "Minimum academic requirement of C plain",
        "Commitment to college sports teams"
      ],
      deadline: "February 28, 2024",
      available: 15,
      description: "For talented athletes who will represent the college in various sports competitions"
    },
    {
      name: "Women in Tech Scholarship",
      icon: <BookOpen className="h-6 w-6 text-purple-600" />,
      category: "Special Interest",
      value: "Up to 35% tuition fee",
      eligibility: [
        "Female students applying for IT/Engineering programs",
        "Strong academic performance in sciences",
        "Passion for technology innovation",
        "Commitment to mentor other female students"
      ],
      deadline: "March 15, 2024",
      available: 25,
      description: "Encouraging female participation in technology and engineering fields"
    },
    {
      name: "Community Service Scholarship",
      icon: <Users className="h-6 w-6 text-orange-600" />,
      category: "Service-Based",
      value: "Up to 25% tuition fee",
      eligibility: [
        "Documented community service experience",
        "Minimum 100 hours of volunteer work",
        "Letters of recommendation from community leaders",
        "Good academic standing"
      ],
      deadline: "April 10, 2024",
      available: 10,
      description: "Recognizing students who have made significant contributions to their communities"
    },
    {
      name: "Disability Support Scholarship",
      icon: <CheckCircle className="h-6 w-6 text-indigo-600" />,
      category: "Special Support",
      value: "Up to 45% tuition fee",
      eligibility: [
        "Certified disability status",
        "Medical documentation required",
        "Minimum academic requirement",
        "Demonstrated determination and resilience"
      ],
      deadline: "Rolling admission",
      available: 12,
      description: "Supporting students with disabilities to achieve their educational goals"
    }
  ];

  const applicationProcess = [
    {
      step: 1,
      title: "Check Eligibility",
      description: "Review the specific requirements for your desired scholarship program",
      documents: ["Academic certificates", "Identification documents"]
    },
    {
      step: 2,
      title: "Prepare Documents",
      description: "Gather all required documents and complete the application form",
      documents: ["Application form", "Personal statement", "Recommendation letters"]
    },
    {
      step: 3,
      title: "Submit Application",
      description: "Submit your complete application before the deadline",
      documents: ["Completed application", "All supporting documents"]
    },
    {
      step: 4,
      title: "Interview & Review",
      description: "Shortlisted candidates will be invited for interviews",
      documents: ["Interview preparation", "Additional documents if requested"]
    },
    {
      step: 5,
      title: "Award Notification",
      description: "Successful applicants will receive scholarship offers",
      documents: ["Acceptance letter", "Scholarship agreement"]
    }
  ];

  const externalScholarships = [
    {
      name: "Higher Education Loans Board (HELB)",
      description: "Government loans and bursaries for Kenyan students",
      website: "www.helb.co.ke",
      type: "Loan & Bursary"
    },
    {
      name: "County Government Bursaries",
      description: "Various county governments offer education bursaries",
      website: "Contact your county office",
      type: "Bursary"
    },
    {
      name: "Corporate Scholarships",
      description: "Companies offering education support programs",
      website: "Various corporate websites",
      type: "Scholarship"
    },
    {
      name: "NGO Education Support",
      description: "Non-governmental organizations providing education aid",
      website: "Various NGO platforms",
      type: "Grant"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/40 to-orange-600/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Scholarships & Financial Aid</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Invest in your future with our comprehensive scholarship programs at FIBS College
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Investing in Your Success</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                At FIBS College, we believe that financial constraints should not hinder your educational journey. 
                Our comprehensive scholarship and financial aid programs support deserving students.
              </p>
            </motion.div>

            {/* Available Scholarships */}
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8"
              >
                <Award className="h-6 w-6 text-yellow-600" />
                <h3 className="text-2xl font-bold text-gray-900">Available Scholarships</h3>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scholarships.map((scholarship, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        {scholarship.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{scholarship.name}</h4>
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                          {scholarship.category}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{scholarship.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Value:</span>
                        <span className="font-semibold text-green-600">{scholarship.value}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Available:</span>
                        <span className="font-medium">{scholarship.available} slots</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Deadline:</span>
                        <span className="font-medium text-blue-600">{scholarship.deadline}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">Eligibility:</p>
                      <ul className="space-y-1">
                        {scholarship.eligibility.slice(0, 3).map((item, itemIndex) => (
                          <li key={itemIndex} className="text-xs text-gray-600 flex items-start gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                        {scholarship.eligibility.length > 3 && (
                          <li className="text-xs text-gray-500">+{scholarship.eligibility.length - 3} more requirements</li>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Application Process</h3>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="space-y-6">
                    {applicationProcess.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                          <p className="text-gray-600 mb-3">{step.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {step.documents.map((doc, docIndex) => (
                              <span key={docIndex} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                <CheckCircle className="h-3 w-3" />
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* External Scholarships */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <DollarSign className="h-6 w-6 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">External Funding Opportunities</h3>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-green-50 p-6 border-b border-green-200">
                  <p className="text-gray-700">
                    In addition to our internal scholarships, explore these external funding opportunities to support your education.
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {externalScholarships.map((scholarship, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{scholarship.name}</h4>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {scholarship.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{scholarship.description}</p>
                        <div className="text-sm">
                          <span className="text-gray-600">Website: </span>
                          <span className="text-blue-600 font-medium">{scholarship.website}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Important Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16 bg-amber-50 rounded-xl p-8 border border-amber-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="h-6 w-6 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-900">Important Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Scholarship Terms</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Scholarships are renewable based on academic performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Recipients must maintain minimum GPA requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Scholarship may be combined with other financial aid</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Poor academic conduct may lead to scholarship withdrawal</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Application Tips</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Apply early to increase your chances</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Provide accurate and complete information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Submit all required documents on time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Follow up on your application status regularly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Start Your Scholarship Journey</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Don't let financial constraints hold you back. Apply for our scholarships today and invest in your future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/admissions/scholarship-application"
                    className="inline-flex items-center gap-2 bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download Application Form
                  </a>
                  <a 
                    href="/admissions/faqs"
                    className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors"
                  >
                    Scholarship FAQs
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

export default ScholarshipsPage;
