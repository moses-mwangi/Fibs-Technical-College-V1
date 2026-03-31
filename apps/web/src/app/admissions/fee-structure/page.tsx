'use client';

import { motion } from 'framer-motion';
import { DollarSign, GraduationCap, Calendar, CheckCircle, Info, Calculator } from 'lucide-react';

const FeeStructurePage = () => {
  const certificatePrograms = [
    {
      program: "Business Management",
      duration: "6 months",
      tuition: 45000,
      registration: 2000,
      examination: 3000,
      materials: 5000,
      total: 55000
    },
    {
      program: "Information Technology",
      duration: "6 months", 
      tuition: 50000,
      registration: 2000,
      examination: 3000,
      materials: 8000,
      total: 63000
    },
    {
      program: "Hospitality Management",
      duration: "6 months",
      tuition: 42000,
      registration: 2000,
      examination: 3000,
      materials: 6000,
      total: 53000
    },
    {
      program: "Accounting & Finance",
      duration: "6 months",
      tuition: 48000,
      registration: 2000,
      examination: 3000,
      materials: 4000,
      total: 57000
    }
  ];

  const diplomaPrograms = [
    {
      program: "Business Administration",
      duration: "18 months",
      tuition: 120000,
      registration: 3000,
      examination: 6000,
      materials: 10000,
      total: 139000
    },
    {
      program: "Computer Science",
      duration: "18 months",
      tuition: 140000,
      registration: 3000,
      examination: 6000,
      materials: 15000,
      total: 164000
    },
    {
      program: "Engineering Technology",
      duration: "24 months",
      tuition: 160000,
      registration: 3000,
      examination: 8000,
      materials: 20000,
      total: 191000
    },
    {
      program: "Health Sciences",
      duration: "24 months",
      tuition: 150000,
      registration: 3000,
      examination: 8000,
      materials: 18000,
      total: 179000
    }
  ];

  const shortCourses = [
    {
      course: "Digital Marketing",
      duration: "6 weeks",
      fee: 15000,
      includes: ["Certificate", "Materials", "Online Access"]
    },
    {
      course: "Web Development",
      duration: "8 weeks", 
      fee: 25000,
      includes: ["Certificate", "Portfolio Projects", "Job Support"]
    },
    {
      course: "Professional Driving",
      duration: "4 weeks",
      fee: 20000,
      includes: ["License Processing", "Theory Classes", "Practical Training"]
    },
    {
      course: "Graphic Design",
      duration: "6 weeks",
      fee: 18000,
      includes: ["Software Access", "Portfolio", "Certificate"]
    }
  ];

  const additionalFees = [
    {
      item: "Hostel Accommodation",
      amount: "8,000 - 15,000",
      period: "per month",
      description: "Depending on room type and facilities"
    },
    {
      item: "Meal Plan",
      amount: "6,000 - 10,000", 
      period: "per month",
      description: "Full board meal options available"
    },
    {
      item: "Medical Insurance",
      amount: "3,000",
      period: "per year",
      description: "Basic medical coverage for students"
    },
    {
      item: "Library Access",
      amount: "2,000",
      period: "per year",
      description: "Access to physical and digital libraries"
    },
    {
      item: "Sports & Recreation",
      amount: "1,500",
      period: "per year",
      description: "Access to sports facilities and clubs"
    },
    {
      item: "Student ID Card",
      amount: "500",
      period: "one-time",
      description: "Required for campus access"
    }
  ];

  const paymentPolicies = [
    "Full payment attracts a 5% discount",
    "Installment payment available (3 installments maximum)",
    "Registration fee is non-refundable",
    "50% of tuition fee payable before semester start",
    "Balance payable within first month of semester",
    "Late payment attracts 2% monthly interest"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-emerald-600/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726dc752921?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight font-heading text-impact">Fee Structure</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-body text-readable">
            Comprehensive breakdown of tuition and fees for all programs at FIBS College
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Invest in Your Future</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-body text-readable">
                Our fee structure is designed to be transparent and affordable while maintaining 
                the quality of education and facilities we provide.
              </p>
            </motion.div>

            {/* Certificate Programs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-6 w-6 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900 font-heading">Certificate Programs</h3>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-green-50 border-b border-green-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Program</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Duration</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Tuition</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Registration</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Exam</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Materials</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {certificatePrograms.map((program, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{program.program}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 text-center">{program.duration}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">KES {program.tuition.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">KES {program.registration.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">KES {program.examination.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">KES {program.materials.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-green-600 text-right">KES {program.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Diploma Programs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-6 w-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Diploma Programs</h3>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-50 border-b border-blue-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Program</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Duration</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Tuition</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Registration</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Exam</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Materials</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {diplomaPrograms.map((program, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{program.program}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 text-center">{program.duration}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">KES {program.tuition.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">KES {program.registration.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">KES {program.examination.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">KES {program.materials.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-right">KES {program.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Short Courses */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-6 w-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Short Courses</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {shortCourses.map((course, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{course.course}</h4>
                        <p className="text-sm text-gray-600">{course.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">KES {course.fee.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Includes:</p>
                      <div className="flex flex-wrap gap-2">
                        {course.includes.map((item, itemIndex) => (
                          <span key={itemIndex} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                            <CheckCircle className="h-3 w-3" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Additional Fees */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="h-6 w-6 text-orange-600" />
                <h3 className="text-2xl font-bold text-gray-900">Additional Fees</h3>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-orange-50 border-b border-orange-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Item</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Amount</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Period</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {additionalFees.map((fee, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{fee.item}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">KES {fee.amount}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 text-center">{fee.period}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{fee.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Payment Policies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12 bg-blue-50 rounded-xl p-8 border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <Info className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Payment Policies</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {paymentPolicies.map((policy, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{policy}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fee Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-6 w-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">Fee Calculator</h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                Use our online fee calculator to estimate your total costs based on your program choice and accommodation needs.
              </p>
              
              <div className="text-center">
                <a 
                  href="/admissions/fee-calculator"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Open Fee Calculator
                  <Calculator className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Need Financial Assistance?</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Explore our scholarship programs and flexible payment options to make your education affordable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/admissions/scholarships"
                    className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    View Scholarships
                  </a>
                  <a 
                    href="/admissions/payment-methods"
                    className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                  >
                    Payment Methods
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

export default FeeStructurePage;
