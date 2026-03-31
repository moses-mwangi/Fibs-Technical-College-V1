'use client';

import { motion } from 'framer-motion';
import { Calendar, DollarSign, Clock, CheckCircle, AlertCircle, Download, CreditCard } from 'lucide-react';

const FeePaymentBatchPage = () => {
  const paymentSchedules = [
    {
      intake: "January 2024 Intake",
      batches: [
        {
          name: "Batch 1 - Early Bird",
          deadline: "November 15, 2023",
          status: "completed",
          description: "Early payment with 5% discount",
          amount: "Full payment or 50% of tuition",
          discount: "5% discount on full payment"
        },
        {
          name: "Batch 2 - Regular",
          deadline: "December 20, 2023",
          status: "completed", 
          description: "Regular payment deadline",
          amount: "Full payment or 50% of tuition",
          discount: "No discount"
        },
        {
          name: "Batch 3 - Late",
          deadline: "January 10, 2024",
          status: "completed",
          description: "Late payment with additional fees",
          amount: "Full payment + 2% late fee",
          discount: "2% late fee applies"
        },
        {
          name: "Batch 4 - Final",
          deadline: "January 25, 2024",
          status: "completed",
          description: "Final payment deadline",
          amount: "Remaining balance + penalties",
          discount: "5% penalty on outstanding amount"
        }
      ]
    },
    {
      intake: "May 2024 Intake",
      batches: [
        {
          name: "Batch 1 - Early Bird",
          deadline: "March 20, 2024",
          status: "upcoming",
          description: "Early payment with 5% discount",
          amount: "Full payment or 50% of tuition",
          discount: "5% discount on full payment"
        },
        {
          name: "Batch 2 - Regular",
          deadline: "April 25, 2024",
          status: "upcoming",
          description: "Regular payment deadline", 
          amount: "Full payment or 50% of tuition",
          discount: "No discount"
        },
        {
          name: "Batch 3 - Late",
          deadline: "May 10, 2024",
          status: "upcoming",
          description: "Late payment with additional fees",
          amount: "Full payment + 2% late fee",
          discount: "2% late fee applies"
        },
        {
          name: "Batch 4 - Final",
          deadline: "May 25, 2024",
          status: "upcoming",
          description: "Final payment deadline",
          amount: "Remaining balance + penalties",
          discount: "5% penalty on outstanding amount"
        }
      ]
    },
    {
      intake: "September 2024 Intake",
      batches: [
        {
          name: "Batch 1 - Early Bird",
          deadline: "July 20, 2024",
          status: "future",
          description: "Early payment with 5% discount",
          amount: "Full payment or 50% of tuition",
          discount: "5% discount on full payment"
        },
        {
          name: "Batch 2 - Regular",
          deadline: "August 25, 2024",
          status: "future",
          description: "Regular payment deadline",
          amount: "Full payment or 50% of tuition",
          discount: "No discount"
        },
        {
          name: "Batch 3 - Late",
          deadline: "September 10, 2024",
          status: "future",
          description: "Late payment with additional fees",
          amount: "Full payment + 2% late fee",
          discount: "2% late fee applies"
        },
        {
          name: "Batch 4 - Final",
          deadline: "September 25, 2024",
          status: "future",
          description: "Final payment deadline",
          amount: "Remaining balance + penalties",
          discount: "5% penalty on outstanding amount"
        }
      ]
    }
  ];

  const installmentPlan = [
    {
      installment: "First Installment",
      dueDate: "Before semester start",
      percentage: "50%",
      description: "Must be paid before the first day of classes"
    },
    {
      installment: "Second Installment", 
      dueDate: "Within first month",
      percentage: "25%",
      description: "Due within 30 days of semester start"
    },
    {
      installment: "Third Installment",
      dueDate: "Mid-semester",
      percentage: "25%", 
      description: "Due by mid-semester examination period"
    }
  ];

  const paymentMethods = [
    {
      method: "Mobile Money",
      options: ["M-PESA Paybill: 123456", "Airtel Money", "T-Kash"],
      processingTime: "Instant",
      available: "24/7"
    },
    {
      method: "Bank Transfer",
      options: ["Direct deposit", "Bank standing order", "RTGS"],
      processingTime: "1-2 business days",
      available: "Banking hours"
    },
    {
      method: "Online Payment",
      options: ["Credit/Debit cards", "PayPal", "Bank mobile apps"],
      processingTime: "Instant",
      available: "24/7"
    },
    {
      method: "Cash Payment",
      options: ["Campus finance office", "Designated bank branches"],
      processingTime: "Instant",
      available: "Office hours"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'future': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'upcoming': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'future': return <Calendar className="h-4 w-4 text-gray-600" />;
      default: return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-purple-600/40 z-10"></div>
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Fee Payment Schedule</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Payment batches and installment plans for flexible fee payment at FIBS College
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Current Batch Alert */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">May 2024 - Batch 2 Now Open!</h3>
                  <p className="text-gray-700">Regular payment deadline: April 25, 2024. Pay now to avoid late fees.</p>
                </div>
              </div>
            </motion.div>

            {/* Payment Schedules */}
            <div className="space-y-8 mb-16">
              {paymentSchedules.map((intake, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
                    <h3 className="text-2xl font-bold">{intake.intake}</h3>
                    <p className="text-indigo-100 mt-1">Payment batches and deadlines</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {intake.batches.map((batch, batchIndex) => (
                        <div key={batchIndex} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{batch.name}</h4>
                              <p className="text-sm text-gray-600">{batch.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(batch.status)}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(batch.status)}`}>
                                {batch.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Deadline:</span>
                              <span className="font-medium">{batch.deadline}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-medium">{batch.amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Terms:</span>
                              <span className={`font-medium ${
                                batch.discount.includes('discount') ? 'text-green-600' : 
                                batch.discount.includes('fee') || batch.discount.includes('penalty') ? 'text-red-600' : 
                                'text-gray-700'
                              }`}>
                                {batch.discount}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Installment Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="h-6 w-6 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Installment Payment Plan</h3>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-green-50 p-6 border-b border-green-200">
                  <p className="text-gray-700">
                    Pay your tuition fees in convenient installments. Available for all diploma and certificate programs.
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {installmentPlan.map((installment, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{installment.installment}</h4>
                          <p className="text-sm text-gray-600">{installment.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{installment.percentage}</p>
                          <p className="text-sm text-gray-600">{installment.dueDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Accepted Payment Methods</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{method.method}</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Options:</p>
                        <ul className="space-y-1">
                          {method.options.map((option, optionIndex) => (
                            <li key={optionIndex} className="text-sm text-gray-600 flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-blue-500" />
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Processing:</span>
                        <span className="font-medium">{method.processingTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Available:</span>
                        <span className="font-medium">{method.available}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
                <h3 className="text-xl font-bold text-gray-900">Important Payment Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Payment Guidelines</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Always include your student ID in payment references</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Keep payment receipts for future reference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Late payments attract penalties as per batch schedule</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Registration fees are non-refundable</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Payment Confirmation</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Receipts issued within 24 hours of payment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Email confirmations sent for online payments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Payment status updated in student portal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>Contact finance office for payment inquiries</span>
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
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Make a Payment?</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Choose your preferred payment method and complete your fee payment securely.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/admissions/payment-methods"
                    className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <CreditCard className="h-4 w-4" />
                    Payment Methods
                  </a>
                  <a 
                    href="/admissions/student-portal"
                    className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
                  >
                    Student Portal
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

export default FeePaymentBatchPage;
