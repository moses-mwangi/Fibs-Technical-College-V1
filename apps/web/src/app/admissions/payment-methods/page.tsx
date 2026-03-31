'use client';

import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building, DollarSign, CheckCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';

const PaymentMethodsPage = () => {
  const paymentMethods = [
    {
      name: "Mobile Money Payments",
      icon: <Smartphone className="h-8 w-8 text-green-600" />,
      description: "Fast, secure, and convenient mobile payment options",
      methods: [
        {
          provider: "M-PESA",
          details: "Paybill: 123456",
          account: "Account Number: Your Student ID",
          instructions: "Enter amount, follow prompts, and save the transaction ID"
        },
        {
          provider: "Airtel Money",
          details: "Business Number: 987654",
          account: "Reference: Your Student ID",
          instructions: "Select Pay Bill, enter details, and confirm payment"
        },
        {
          provider: "T-Kash",
          details: "Paybill: 555555",
          account: "Account: Your Student ID",
          instructions: "Navigate to T-Kash, choose Pay Bill, and complete payment"
        }
      ],
      processingTime: "Instant",
      available: "24/7",
      fees: "No additional fees"
    },
    {
      name: "Bank Payments",
      icon: <Building className="h-8 w-8 text-blue-600" />,
      description: "Traditional bank payment methods for larger amounts",
      methods: [
        {
          provider: "Direct Bank Deposit",
          details: "Account Name: FIBS COLLEGE",
          account: "Account Number: 0123456789",
          instructions: "Visit any branch, deposit to our account, and keep the deposit slip"
        },
        {
          provider: "Bank Transfer",
          details: "Bank: Equity Bank Kenya",
          account: "SWIFT: EQBLKENA",
          instructions: "Use online banking or visit branch for transfers"
        },
        {
          provider: "Standing Order",
          details: "Monthly automatic payments",
          account: "Set up with your bank",
          instructions: "Arrange with your bank for regular fee payments"
        }
      ],
      processingTime: "1-2 business days",
      available: "Banking hours",
      fees: "Bank charges may apply"
    },
    {
      name: "Online Payments",
      icon: <CreditCard className="h-8 w-8 text-purple-600" />,
      description: "Secure online payment platforms",
      methods: [
        {
          provider: "Credit/Debit Cards",
          details: "Visa, Mastercard, American Express",
          account: "Available on student portal",
          instructions: "Login to portal, select payment, enter card details"
        },
        {
          provider: "PayPal",
          details: "International payments accepted",
          account: "payments@fibscollege.ac.ke",
          instructions: "Send payment via PayPal with student ID reference"
        },
        {
          provider: "Bank Mobile Apps",
          details: "All major Kenyan bank apps",
          account: "Select FIBS College as payee",
          instructions: "Use your bank's mobile app for quick transfers"
        }
      ],
      processingTime: "Instant",
      available: "24/7",
      fees: "Card processing fees may apply"
    },
    {
      name: "Cash Payments",
      icon: <DollarSign className="h-8 w-8 text-orange-600" />,
      description: "In-person cash payment options",
      methods: [
        {
          provider: "Campus Finance Office",
          details: "Main Campus, Building A, Ground Floor",
          account: "Hours: 8:00 AM - 5:00 PM",
          instructions: "Visit finance office with cash and student ID"
        },
        {
          provider: "Designated Bank Branches",
          details: "Equity Bank, KCB, Co-op Bank branches",
          account: "Present fee invoice at bank",
          instructions: "Pay cash at designated bank branches only"
        }
      ],
      processingTime: "Instant",
      available: "Office hours",
      fees: "No additional fees"
    }
  ];

  const paymentSteps = [
    {
      step: 1,
      title: "Check Your Invoice",
      description: "Login to student portal to view your current fee invoice",
      icon: <CheckCircle className="h-6 w-6 text-blue-600" />
    },
    {
      step: 2,
      title: "Choose Payment Method",
      description: "Select your preferred payment method from the available options",
      icon: <CreditCard className="h-6 w-6 text-green-600" />
    },
    {
      step: 3,
      title: "Make Payment",
      description: "Complete the payment using your chosen method",
      icon: <DollarSign className="h-6 w-6 text-purple-600" />
    },
    {
      step: 4,
      title: "Get Confirmation",
      description: "Receive payment receipt and confirmation via email/SMS",
      icon: <CheckCircle className="h-6 w-6 text-orange-600" />
    }
  ];

  const importantNotes = [
    "Always include your Student ID as reference when making payments",
    "Keep all payment receipts and transaction IDs for future reference",
    "Payments may take 24-48 hours to reflect in the student portal",
    "Late payments attract penalties as per the fee payment schedule",
    "Contact the finance office immediately if you encounter any payment issues",
    "International students should consider currency conversion rates and bank charges"
  ];

  const financeOffice = {
    location: "Main Campus, Building A, Ground Floor",
    phone: "+254 700 123 456",
    email: "finance@fibscollege.ac.ke",
    hours: "Monday - Friday: 8:00 AM - 5:00 PM",
    saturday: "Saturday: 9:00 AM - 1:00 PM"
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-600/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Payment Methods</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Convenient and secure payment options for your tuition fees at FIBS College
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Flexible Payment Options</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose from multiple secure payment methods that suit your convenience. 
                All payments are processed securely and receipts are issued immediately.
              </p>
            </motion.div>

            {/* Payment Methods Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{method.name}</h3>
                      <p className="text-gray-600">{method.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {method.methods.map((paymentMethod, methodIndex) => (
                      <div key={methodIndex} className="border-l-4 border-blue-200 pl-4 py-2">
                        <h4 className="font-semibold text-gray-900 mb-1">{paymentMethod.provider}</h4>
                        <p className="text-sm text-gray-600 mb-1">{paymentMethod.details}</p>
                        <p className="text-sm text-gray-600 mb-1">{paymentMethod.account}</p>
                        <p className="text-sm text-blue-600">{paymentMethod.instructions}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Processing:</span>
                      <p className="font-medium">{method.processingTime}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Available:</span>
                      <p className="font-medium">{method.available}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Fees:</span>
                      <p className="font-medium">{method.fees}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Payment Process */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Make a Payment</h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                {paymentSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          {step.icon}
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                        {step.step}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Important Notes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16 bg-amber-50 rounded-xl p-8 border border-amber-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="h-6 w-6 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-900">Important Payment Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {importantNotes.map((note, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-amber-600 font-bold">•</span>
                    <span className="text-gray-700">{note}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Finance Office Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Finance Office Contact</h3>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <h4 className="text-xl font-bold mb-2">Need Payment Assistance?</h4>
                  <p className="text-blue-100">Our finance team is here to help you with any payment-related queries</p>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Location</p>
                          <p className="text-gray-600">{financeOffice.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Phone</p>
                          <p className="text-gray-600">{financeOffice.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Email</p>
                          <p className="text-gray-600">{financeOffice.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-gray-900 mb-2">Office Hours</p>
                        <p className="text-gray-600">{financeOffice.hours}</p>
                        <p className="text-gray-600">{financeOffice.saturday}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900 mb-2">Services Available</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Fee payment processing</li>
                          <li>• Payment receipts and confirmations</li>
                          <li>• Installment plan arrangements</li>
                          <li>• Financial aid consultations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Make a Payment?</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Choose your preferred payment method and complete your fee payment securely and conveniently.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/admissions/student-portal"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <CreditCard className="h-4 w-4" />
                    Student Portal
                  </a>
                  <a 
                    href="/admissions/fee-structure"
                    className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    View Fee Structure
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

export default PaymentMethodsPage;
