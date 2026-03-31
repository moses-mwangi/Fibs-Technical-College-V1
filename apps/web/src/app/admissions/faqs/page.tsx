'use client';

import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, Search, CheckCircle, AlertCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const FAQsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    { id: 'all', name: 'All Categories', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'admissions', name: 'Admissions', icon: <CheckCircle className="h-5 w-5" /> },
    { id: 'fees', name: 'Fees & Payments', icon: <AlertCircle className="h-5 w-5" /> },
    { id: 'academics', name: 'Academics', icon: <MessageCircle className="h-5 w-5" /> },
    { id: 'student-life', name: 'Student Life', icon: <CheckCircle className="h-5 w-5" /> },
    { id: 'international', name: 'International', icon: <AlertCircle className="h-5 w-5" /> }
  ];

  const faqs = [
    {
      category: 'admissions',
      question: 'What are the minimum entry requirements for certificate programs?',
      answer: 'For certificate programs, you need a minimum KCSE mean grade of D+ (plus), be 16 years and above, have a copy of birth certificate or national ID, and 2 passport size photographs. Some programs may have specific subject requirements.',
      tags: ['certificate', 'requirements', 'KCSE']
    },
    {
      category: 'admissions',
      question: 'How do I apply to FIBS College?',
      answer: 'You can apply online through our website by filling out the application form, uploading required documents, and paying the application fee. Alternatively, you can visit our campus and apply in person at the admissions office.',
      tags: ['application', 'online', 'process']
    },
    {
      category: 'admissions',
      question: 'When are the application deadlines?',
      answer: 'We have three main intakes: January (deadline December 15), May (deadline April 30), and September (deadline August 31). Early bird discounts are available if you apply 2 months before the deadline.',
      tags: ['deadlines', 'intakes', 'early bird']
    },
    {
      category: 'fees',
      question: 'What is the fee structure for different programs?',
      answer: 'Certificate programs range from KES 53,000 - 63,000, diploma programs from KES 139,000 - 191,000, and short courses from KES 15,000 - 25,000. Fees vary by program and duration. Detailed fee structures are available on our website.',
      tags: ['fees', 'certificate', 'diploma', 'cost']
    },
    {
      category: 'fees',
      question: 'What payment methods are accepted?',
      answer: 'We accept M-PESA, Airtel Money, bank transfers, credit/debit cards, PayPal, and cash payments at the finance office. Mobile money payments are instant, while bank transfers take 1-2 business days to process.',
      tags: ['payment', 'M-PESA', 'bank', 'mobile money']
    },
    {
      category: 'fees',
      question: 'Are there scholarships available?',
      answer: 'Yes, we offer various scholarships including Academic Excellence (up to 50% tuition), Need-Based Financial Aid (up to 30%), Sports Talent (up to 40%), and Women in Tech (up to 35%). Applications are open throughout the year with specific deadlines for each scholarship.',
      tags: ['scholarships', 'financial aid', 'discounts']
    },
    {
      category: 'fees',
      question: 'Can I pay fees in installments?',
      answer: 'Yes, we offer installment payment plans. You can pay in 3 installments: 50% before semester start, 25% within the first month, and 25% by mid-semester. A 5% discount is available for full upfront payment.',
      tags: ['installments', 'payment plan', 'discount']
    },
    {
      category: 'academics',
      question: 'What programs are offered at FIBS College?',
      answer: 'We offer certificate and diploma programs in Business & Management, Information Technology, Engineering & Technical, Health Sciences, Hospitality & Tourism, and various short courses in Digital Marketing, Web Development, and Professional Driving.',
      tags: ['programs', 'courses', 'diploma', 'certificate']
    },
    {
      category: 'academics',
      question: 'How long do the programs take?',
      answer: 'Certificate programs typically take 6 months, diploma programs take 18-24 months depending on the field, and short courses range from 4-8 weeks. Program durations may vary based on the specific course and study mode.',
      tags: ['duration', 'timeline', 'program length']
    },
    {
      category: 'academics',
      question: 'Are classes available on weekends?',
      answer: 'Yes, we offer flexible learning options including weekday, weekend, and evening classes to accommodate working students and those with other commitments.',
      tags: ['schedule', 'weekend', 'flexible learning']
    },
    {
      category: 'student-life',
      question: 'Is accommodation available for students?',
      answer: 'Yes, we provide on-campus hostel facilities with options for shared and private rooms. Accommodation costs range from KES 8,000 - 15,000 per month depending on the room type and facilities. Off-campus housing options are also available.',
      tags: ['accommodation', 'hostel', 'housing']
    },
    {
      category: 'student-life',
      question: 'What extracurricular activities are available?',
      answer: 'We offer various clubs and societies including sports, drama, debate, entrepreneurship, and community service. Students can participate in inter-college competitions, cultural events, and leadership development programs.',
      tags: ['activities', 'clubs', 'sports', 'extracurricular']
    },
    {
      category: 'student-life',
      question: 'Is there a dress code?',
      answer: 'Yes, we have a modest dress code policy. Students are expected to dress appropriately for the learning environment. Specific uniforms may be required for certain practical sessions and lab work.',
      tags: ['dress code', 'uniform', 'policy']
    },
    {
      category: 'international',
      question: 'What support is available for international students?',
      answer: 'We provide comprehensive support including airport pickup, accommodation assistance, orientation programs, visa processing support, English language support, and dedicated international student advisors.',
      tags: ['international', 'support', 'visa', 'orientation']
    },
    {
      category: 'international',
      question: 'What are the English language requirements?',
      answer: 'Non-native English speakers need IELTS (6.0 overall), TOEFL (550 paper/79 internet), or Cambridge English qualifications. English proficiency tests may be waived for students from English-speaking countries or those with English-medium education.',
      tags: ['English', 'IELTS', 'TOEFL', 'language']
    },
    {
      category: 'international',
      question: 'How do I apply for a student visa?',
      answer: 'After receiving your admission letter, you can apply for a student pass through the Kenyan immigration department. We provide guidance and required documents including admission letter, passport copy, and medical certificates.',
      tags: ['visa', 'student pass', 'immigration']
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-600/40 z-10"></div>
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about admissions, fees, and student life at FIBS College
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex flex-wrap gap-3 justify-center">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* FAQs List */}
            <div className="space-y-4 mb-16">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {faq.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {expandedItems.includes(index) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </button>
                  
                  {expandedItems.includes(index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-4 border-t border-gray-200"
                    >
                      <p className="text-gray-700 mt-4">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs Found</h3>
                <p className="text-gray-600">Try adjusting your search or browse all categories.</p>
              </motion.div>
            )}

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4 text-center">Still Have Questions?</h3>
              <p className="text-center mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help you with any questions about admissions, fees, or student life.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Call Us</h4>
                  <p className="text-sm mb-2">+254 700 123 456</p>
                  <p className="text-xs opacity-75">Mon-Fri: 8AM-5PM</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Email Us</h4>
                  <p className="text-sm mb-2">info@fibscollege.ac.ke</p>
                  <p className="text-xs opacity-75">24-48 hour response</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-sm mb-2">Available on website</p>
                  <p className="text-xs opacity-75">Mon-Fri: 9AM-4PM</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contact Admissions Office
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQsPage;
