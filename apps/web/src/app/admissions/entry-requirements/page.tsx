'use client';

import { motion } from 'framer-motion';
import { GraduationCap, FileText, CheckCircle, AlertCircle, BookOpen, Users } from 'lucide-react';

const EntryRequirementsPage = () => {
  const requirements = [
    {
      category: "Academic Requirements",
      icon: <GraduationCap className="h-6 w-6 text-blue-600" />,
      items: [
        {
          level: "Certificate Programs",
          requirements: [
            "Minimum KCSE mean grade of D+ (plus)",
            "Be 16 years and above",
            "Copy of birth certificate or national ID",
            "2 passport size photographs"
          ]
        },
        {
          level: "Diploma Programs", 
          requirements: [
            "Minimum KCSE mean grade of C- (minus)",
            "Relevant subjects at KCSE level",
            "Be 17 years and above",
            "Copy of birth certificate or national ID",
            "2 passport size photographs"
          ]
        },
        {
          level: "Professional Courses",
          requirements: [
            "Minimum KCSE mean grade of C (plain)",
            "Specific subject requirements as per course",
            "Previous certificates for advanced levels",
            "Be 18 years and above",
            "Copy of national ID or passport"
          ]
        }
      ]
    },
    {
      category: "Document Requirements",
      icon: <FileText className="h-6 w-6 text-green-600" />,
      items: [
        {
          level: "Mandatory Documents",
          requirements: [
            "Completed application form",
            "Academic certificates (KCSE, KCPE, or equivalent)",
            "Birth certificate or national ID",
            "Passport size photographs (2 copies)",
            "Parent/guardian ID for students under 18"
          ]
        },
        {
          level: "Additional Documents",
          requirements: [
            "School leaving certificate",
            "Recommendation letters (for some programs)",
            "Medical certificate (for health-related programs)",
            "Portfolio (for creative courses)",
            "Proof of English proficiency (for international students)"
          ]
        }
      ]
    },
    {
      category: "Special Requirements",
      icon: <AlertCircle className="h-6 w-6 text-orange-600" />,
      items: [
        {
          level: "Driving Courses",
          requirements: [
            "Valid driving learner's permit",
            "Medical fitness certificate",
            "Minimum age of 18 years",
            "Vision test certificate",
            "Copy of national ID"
          ]
        },
        {
          level: "Technical Courses",
          requirements: [
            "Good physical health",
            "Basic mathematics skills",
            "Technical drawing knowledge (for engineering)",
            "Computer literacy (for IT courses)",
            "Ability to work with tools"
          ]
        }
      ]
    }
  ];

  const internationalRequirements = [
    "Valid passport and visa",
    "Student pass from Kenyan immigration",
    "Translated academic certificates",
    "Proof of English language proficiency",
    "Medical insurance coverage",
    "Guardian/consent letter for minors"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-indigo-600/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight font-heading text-impact">Entry Requirements</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-body text-readable">
            Everything you need to know about admission requirements at FIBS College
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Admission Requirements</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-body text-readable">
                At FIBS College, we maintain clear and fair admission requirements to ensure all students 
                can succeed in their chosen programs. Find the specific requirements for your desired course below.
              </p>
            </motion.div>

            {/* Requirements Grid */}
            <div className="space-y-12">
              {requirements.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">
                    <div className="flex items-center gap-3">
                      {section.icon}
                      <h3 className="text-2xl font-bold text-gray-900">{section.category}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-indigo-600" />
                            {item.level}
                          </h4>
                          <ul className="space-y-3">
                            {item.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* International Students Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 border border-orange-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-8 w-8 text-orange-600" />
                <h3 className="text-2xl font-bold text-gray-900">International Students</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                International students seeking admission at FIBS College must meet additional requirements 
                to comply with Kenyan education regulations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {internationalRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Important Notes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 bg-blue-50 rounded-xl p-8 border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-blue-600" />
                <div className="px-5 pt-5 pb-2">
                  <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider font-heading">
                    Important Notes
                  </h3>
                </div>
              </div>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>All submitted documents must be certified copies of the originals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Foreign certificates must be recognized by the Kenyan Ministry of Education.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>The college reserves the right to verify all submitted documents.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Meeting minimum requirements does not guarantee admission.</span>
                </li>
              </ul>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  If you meet the requirements for your desired program, take the next step and submit your application.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/admissions/online-application"
                    className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Apply Online
                  </a>
                  <a 
                    href="/admissions/faqs"
                    className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
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

export default EntryRequirementsPage;
