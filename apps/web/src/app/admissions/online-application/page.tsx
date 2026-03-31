'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, User, Mail, Phone, BookOpen, AlertCircle, CheckCircle, FileText, GraduationCap, Calendar, Clock } from 'lucide-react';
import { courses } from '@/data/demoData';
import Button from '@/components/ui/Button';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  documents: File[];
  dateOfBirth: string;
  nationality: string;
  address: string;
  previousEducation: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  courseId?: string;
  documents?: string;
  dateOfBirth?: string;
  nationality?: string;
  address?: string;
  previousEducation?: string;
}

const ApplicationPage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    courseId: '',
    documents: [],
    dateOfBirth: '',
    nationality: '',
    address: '',
    previousEducation: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Personal Info', icon: <User className="h-4 w-4" /> },
    { id: 2, title: 'Course Selection', icon: <BookOpen className="h-4 w-4" /> },
    { id: 3, title: 'Documents', icon: <FileText className="h-4 w-4" /> },
    { id: 4, title: 'Review', icon: <CheckCircle className="h-4 w-4" /> }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.courseId) {
      newErrors.courseId = 'Please select a course';
    }

    if (formData.documents.length === 0) {
      newErrors.documents = 'Please upload at least one document';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.nationality.trim()) {
      newErrors.nationality = 'Nationality is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.previousEducation.trim()) {
      newErrors.previousEducation = 'Previous education is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, documents: [...prev.documents, ...files] }));
    
    // Clear document error when files are added
    if (errors.documents) {
      setErrors(prev => ({ ...prev, documents: undefined }));
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would send the data to your backend
      console.log('Application submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        courseId: '',
        documents: [],
        dateOfBirth: '',
        nationality: '',
        address: '',
        previousEducation: ''
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-600/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight font-heading text-impact">Online Application</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-body text-readable">
            Start your journey with FIBS College - Complete our simple online application form
          </p>
        </motion.div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= step.id 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.icon}
                    </motion.div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl"
                >
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-green-800 font-heading">Application Submitted Successfully!</h4>
                      <p className="text-green-600 font-body text-readable mt-1">We will contact you within 2-3 business days.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-6 bg-red-50 border border-red-200 rounded-xl"
                >
                  <div className="flex items-center">
                    <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-red-800 font-heading">Submission Failed</h4>
                      <p className="text-red-600 font-body text-readable mt-1">Please try again or contact us directly.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 flex items-center font-heading">
                        <User className="h-6 w-6 mr-3 text-blue-600" />
                        Personal Information
                      </h3>
                      <p className="text-gray-600 font-body text-readable">Tell us about yourself</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2 font-heading">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.fullName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2 font-heading">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.dateOfBirth && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.dateOfBirth}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-heading">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-heading">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="+254 700 123 456"
                        />
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2 font-heading">
                          Nationality *
                        </label>
                        <input
                          type="text"
                          id="nationality"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.nationality ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your nationality"
                        />
                        {errors.nationality && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.nationality}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="previousEducation" className="block text-sm font-medium text-gray-700 mb-2 font-heading">
                          Previous Education *
                        </label>
                        <input
                          type="text"
                          id="previousEducation"
                          name="previousEducation"
                          value={formData.previousEducation}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.previousEducation ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., KCSE, High School Diploma"
                        />
                        {errors.previousEducation && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.previousEducation}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2 font-heading">
                        Address *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full address"
                      />
                      {errors.address && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Course Selection */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 flex items-center font-heading">
                        <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                        Course Selection
                      </h3>
                      <p className="text-gray-600 font-body text-readable">Choose your desired program</p>
                    </div>
                    
                    <div>
                      <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-2 font-heading">
                        Select Course *
                      </label>
                      <select
                        id="courseId"
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.courseId ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Choose a course...</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.title} - {course.department}
                          </option>
                        ))}
                      </select>
                      {errors.courseId && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.courseId}
                        </p>
                      )}
                    </div>

                    <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <GraduationCap className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-blue-800 font-heading mb-2">Need Help Choosing?</h4>
                          <p className="text-blue-600 font-body text-readable">
                            Our academic advisors are available to help you select the right program based on your interests and career goals.
                          </p>
                          <button type="button" className="mt-3 text-blue-600 font-medium hover:text-blue-800 transition-colors">
                            Contact an Advisor →
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Document Upload */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 flex items-center font-heading">
                        <Upload className="h-6 w-6 mr-3 text-blue-600" />
                        Upload Documents
                      </h3>
                      <p className="text-gray-600 font-body text-readable">Provide your supporting documents</p>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <label htmlFor="documents" className="cursor-pointer">
                        <span className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                          Click to upload
                        </span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </label>
                      <input
                        type="file"
                        id="documents"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        PDF, DOC, DOCX, JPG, PNG (Max 5MB per file)
                      </p>
                    </div>
                    
                    {errors.documents && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.documents}
                      </p>
                    )}

                    {/* Display uploaded files */}
                    {formData.documents.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3 font-heading">Uploaded Files:</h4>
                        <div className="space-y-2">
                          {formData.documents.map((file, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.1 }}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-gray-600" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeDocument(index)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                Remove
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800 font-heading mb-1">Required Documents</h4>
                          <ul className="text-sm text-amber-700 font-body text-readable space-y-1">
                            <li>• National ID or Passport</li>
                            <li>• Academic Certificates</li>
                            <li>• Birth Certificate</li>
                            <li>• Passport Size Photos (2)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 flex items-center font-heading">
                        <CheckCircle className="h-6 w-6 mr-3 text-blue-600" />
                        Review Your Application
                      </h3>
                      <p className="text-gray-600 font-body text-readable">Please review your information before submitting</p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4 font-heading">Personal Information</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span>
                            <p className="font-medium">{formData.fullName || 'Not provided'}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Date of Birth:</span>
                            <p className="font-medium">{formData.dateOfBirth || 'Not provided'}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Email:</span>
                            <p className="font-medium">{formData.email || 'Not provided'}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Phone:</span>
                            <p className="font-medium">{formData.phone || 'Not provided'}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Nationality:</span>
                            <p className="font-medium">{formData.nationality || 'Not provided'}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Education:</span>
                            <p className="font-medium">{formData.previousEducation || 'Not provided'}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className="text-gray-600">Address:</span>
                          <p className="font-medium">{formData.address || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4 font-heading">Course Selection</h4>
                        <p className="font-medium">
                          {courses.find(c => c.id === Number(formData.courseId))?.title || 'No course selected'}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4 font-heading">Documents</h4>
                        <p className="font-medium">{formData.documents.length} file(s) uploaded</p>
                        <div className="mt-2 space-y-1">
                          {formData.documents.map((file, index) => (
                            <p key={index} className="text-sm text-gray-600">• {file.name}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="px-8"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4 animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplicationPage;
