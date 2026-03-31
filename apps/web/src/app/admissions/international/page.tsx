'use client';

import { motion } from 'framer-motion';
import { Globe, Plane, Home, BookOpen, CheckCircle, AlertCircle, Phone, Mail, MapPin, Users, Shield } from 'lucide-react';

const InternationalStudentsPage = () => {
  const admissionRequirements = [
    {
      title: "Academic Requirements",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      items: [
        "Recognized high school diploma or equivalent",
        "Minimum grades as per program requirements",
        "Translated academic certificates (if not in English)",
        "Proof of English proficiency for non-native speakers"
      ]
    },
    {
      title: "Language Requirements",
      icon: <Globe className="h-6 w-6 text-green-600" />,
      items: [
        "IELTS: Overall score of 6.0 (no band below 5.5)",
        "TOEFL: Minimum score of 550 (paper) or 79 (internet)",
        "Cambridge English: Advanced (CAE) or Proficiency (CPE)",
        "English proficiency test exemptions for native speakers"
      ]
    },
    {
      title: "Immigration Requirements",
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      items: [
        "Valid passport with at least 6 months validity",
        "Student visa/pass from Kenyan immigration",
        "Medical insurance coverage",
        "Police clearance certificate from home country"
      ]
    }
  ];

  const supportServices = [
    {
      service: "Airport Pickup",
      description: "Complimentary airport pickup from Jomo Kenyatta International Airport",
      icon: <Plane className="h-6 w-6 text-blue-600" />,
      available: "24/7 with prior arrangement"
    },
    {
      service: "Accommodation",
      description: "Secure and comfortable hostel facilities with international student options",
      icon: <Home className="h-6 w-6 text-green-600" />,
      available: "On-campus and off-campus options"
    },
    {
      service: "Orientation Program",
      description: "Comprehensive orientation covering academic, cultural, and social aspects",
      icon: <Users className="h-6 w-6 text-purple-600" />,
      available: "Pre-semester and ongoing support"
    },
    {
      service: "Academic Support",
      description: "Additional tutoring, language support, and academic counseling",
      icon: <BookOpen className="h-6 w-6 text-orange-600" />,
      available: "Throughout the academic year"
    }
  ];

  const visaProcess = [
    {
      step: 1,
      title: "Receive Admission Letter",
      description: "Get your official admission letter from FIBS College",
      documents: ["Admission letter", "Academic certificates"]
    },
    {
      step: 2,
      title: "Apply for Student Pass",
      description: "Submit application to Kenyan immigration department",
      documents: ["Completed application form", "Passport copy", "Admission letter"]
    },
    {
      step: 3,
      title: "Medical Check-up",
      description: "Complete medical examination as required",
      documents: ["Medical certificate", "Yellow fever vaccination"]
    },
    {
      step: 4,
      title: "Receive Student Pass",
      description: "Collect your student pass from immigration office",
      documents: ["Approval letter", "Original documents"]
    }
  ];

  const accommodationOptions = [
    {
      type: "On-Campus Hostel",
      price: "$150 - $250 per month",
      features: [
        "Secure 24/7 access",
        "Furnished rooms",
        "WiFi and utilities included",
        "Meal plans available",
        "Laundry facilities",
        "Study areas"
      ],
      availability: "Limited spaces, apply early"
    },
    {
      type: "Off-Campus Housing",
      price: "$200 - $400 per month",
      features: [
        "Independent living",
        "Various locations near campus",
        "Shared or private options",
        "Kitchen facilities",
        "Local neighborhood experience",
        "Flexible lease terms"
      ],
      availability: "Multiple options available"
    },
    {
      type: "Homestay Program",
      price: "$300 - $500 per month",
      features: [
        "Live with local host family",
        "Cultural immersion experience",
        "Meals included",
        "English practice environment",
        "Family support system",
        "Cultural activities"
      ],
      availability: "Limited host families available"
    }
  ];

  const costs = [
    {
      item: "Tuition Fees",
      amount: "$2,000 - $4,000 per year",
      description: "Varies by program and level of study"
    },
    {
      item: "Accommodation",
      amount: "$150 - $400 per month",
      description: "Depending on choice of housing"
    },
    {
      item: "Living Expenses",
      amount: "$300 - $500 per month",
      description: "Food, transport, and personal expenses"
    },
    {
      item: "Health Insurance",
      amount: "$200 - $400 per year",
      description: "Mandatory medical coverage"
    },
    {
      item: "Student Pass",
      amount: "$100 - $200 per year",
      description: "Immigration document renewal"
    }
  ];

  const contacts = {
    internationalOffice: {
      title: "International Student Office",
      phone: "+254 700 123 456",
      email: "international@fibscollege.ac.ke",
      location: "Main Campus, Building B, 2nd Floor"
    },
    emergency: {
      title: "24/7 Emergency Contact",
      phone: "+254 722 987 654",
      email: "emergency@fibscollege.ac.ke"
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-green-600/40 z-10"></div>
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">International Students</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Welcome to FIBS College - Your gateway to quality education in Kenya
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome International Students!</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                FIBS College welcomes students from around the world. We provide comprehensive support 
                to ensure your smooth transition and successful academic journey in Kenya.
              </p>
            </motion.div>

            {/* Admission Requirements */}
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8"
              >
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Admission Requirements</h3>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {admissionRequirements.map((requirement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {requirement.icon}
                      <h4 className="text-lg font-semibold text-gray-900">{requirement.title}</h4>
                    </div>
                    <ul className="space-y-2">
                      {requirement.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Support Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Support Services</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      {service.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.service}</h4>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <p className="text-xs text-blue-600 font-medium">{service.available}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visa Process */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Student Visa Process</h3>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    {visaProcess.map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                          {step.step}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                        <div className="text-left">
                          <p className="text-xs font-medium text-gray-700 mb-1">Required:</p>
                          {step.documents.map((doc, docIndex) => (
                            <p key={docIndex} className="text-xs text-gray-600">• {doc}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Accommodation Options */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Accommodation Options</h3>
              
              <div className="space-y-6">
                {accommodationOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{option.type}</h4>
                        <p className="text-blue-600 font-medium">{option.price}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {option.availability}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {option.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Cost Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Estimated Costs</h3>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-50 p-6 border-b border-blue-200">
                  <p className="text-gray-700">
                    Approximate annual costs for international students. All amounts are in USD.
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {costs.map((cost, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">{cost.item}</h4>
                          <p className="text-sm text-gray-600">{cost.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">{cost.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> Costs are approximate and may vary based on personal choices and exchange rates.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Contact Us</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-6 w-6 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">{contacts.internationalOffice.title}</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">{contacts.internationalOffice.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">{contacts.internationalOffice.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">{contacts.internationalOffice.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-xl shadow-lg p-6 border border-red-200">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <h4 className="text-lg font-semibold text-gray-900">{contacts.emergency.title}</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-red-600" />
                      <span className="text-gray-700">{contacts.emergency.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-red-600" />
                      <span className="text-gray-700">{contacts.emergency.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Join FIBS College?</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Start your international education journey with us. Apply today and become part of our diverse student community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/admissions/online-application"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Apply Now
                  </a>
                  <a 
                    href="/admissions/international@fibscollege.ac.ke"
                    className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Contact International Office
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

export default InternationalStudentsPage;
