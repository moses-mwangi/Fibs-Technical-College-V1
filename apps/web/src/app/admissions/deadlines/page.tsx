'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, AlertTriangle, CheckCircle, Bell, ArrowRight } from 'lucide-react';

const DeadlinesPage = () => {
  const deadlines = [
    {
      intake: "January Intake 2024",
      status: "Open",
      color: "green",
      deadlines: [
        {
          event: "Application Opening",
          date: "September 1, 2023",
          status: "completed",
          description: "Applications for January 2024 intake open"
        },
        {
          event: "Early Bird Deadline",
          date: "October 31, 2023",
          status: "completed",
          description: "Submit by this date for early bird discount"
        },
        {
          event: "Regular Application Deadline",
          date: "December 15, 2023",
          status: "completed",
          description: "Final deadline for January intake applications"
        },
        {
          event: "Late Application Deadline",
          date: "January 10, 2024",
          status: "completed",
          description: "Late applications with additional fees"
        },
        {
          event: "Orientation Week",
          date: "January 15-19, 2024",
          status: "completed",
          description: "New student orientation and registration"
        },
        {
          event: "Classes Begin",
          date: "January 22, 2024",
          status: "completed",
          description: "First day of classes for January intake"
        }
      ]
    },
    {
      intake: "May Intake 2024",
      status: "Open",
      color: "blue",
      deadlines: [
        {
          event: "Application Opening",
          date: "February 1, 2024",
          status: "completed",
          description: "Applications for May 2024 intake open"
        },
        {
          event: "Early Bird Deadline",
          date: "March 31, 2024",
          status: "upcoming",
          description: "Submit by this date for early bird discount"
        },
        {
          event: "Regular Application Deadline",
          date: "April 30, 2024",
          status: "upcoming",
          description: "Final deadline for May intake applications"
        },
        {
          event: "Late Application Deadline",
          date: "May 10, 2024",
          status: "upcoming",
          description: "Late applications with additional fees"
        },
        {
          event: "Orientation Week",
          date: "May 13-17, 2024",
          status: "upcoming",
          description: "New student orientation and registration"
        },
        {
          event: "Classes Begin",
          date: "May 20, 2024",
          status: "upcoming",
          description: "First day of classes for May intake"
        }
      ]
    },
    {
      intake: "September Intake 2024",
      status: "Upcoming",
      color: "orange",
      deadlines: [
        {
          event: "Application Opening",
          date: "June 1, 2024",
          status: "future",
          description: "Applications for September 2024 intake open"
        },
        {
          event: "Early Bird Deadline",
          date: "July 31, 2024",
          status: "future",
          description: "Submit by this date for early bird discount"
        },
        {
          event: "Regular Application Deadline",
          date: "August 31, 2024",
          status: "future",
          description: "Final deadline for September intake applications"
        },
        {
          event: "Late Application Deadline",
          date: "September 10, 2024",
          status: "future",
          description: "Late applications with additional fees"
        },
        {
          event: "Orientation Week",
          date: "September 16-20, 2024",
          status: "future",
          description: "New student orientation and registration"
        },
        {
          event: "Classes Begin",
          date: "September 23, 2024",
          status: "future",
          description: "First day of classes for September intake"
        }
      ]
    }
  ];

  const shortCourses = [
    {
      course: "Digital Marketing Certificate",
      duration: "6 weeks",
      nextStart: "April 15, 2024",
      deadline: "April 10, 2024"
    },
    {
      course: "Web Development Bootcamp",
      duration: "8 weeks", 
      nextStart: "May 6, 2024",
      deadline: "May 1, 2024"
    },
    {
      course: "Professional Driving Course",
      duration: "4 weeks",
      nextStart: "Rolling admission",
      deadline: "1 week before start"
    },
    {
      course: "Graphic Design Fundamentals",
      duration: "6 weeks",
      nextStart: "June 3, 2024",
      deadline: "May 28, 2024"
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-600/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight font-heading text-impact">Application Deadlines</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-body text-readable">
            Important dates and timelines for admissions at FIBS College
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Current Status Alert */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
            >
              <div className="flex items-center gap-3">
                <Bell className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 font-heading">May Intake 2024 Now Open!</h3>
                  <p className="text-gray-700 font-body text-readable">Applications are currently being accepted. Early bird deadline: March 31, 2024</p>
                </div>
              </div>
            </motion.div>

            {/* Intake Deadlines */}
            <div className="space-y-8">
              {deadlines.map((intake, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${
                    intake.color === 'green' ? 'from-green-500 to-green-600' :
                    intake.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    'from-orange-500 to-orange-600'
                  } p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">{intake.intake}</h3>
                        <p className="text-green-100 mt-1">Status: {intake.status}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                          intake.status === 'Open' ? 'bg-white/20 text-white' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {intake.status === 'Open' ? 'Accepting Applications' : 'Upcoming'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {intake.deadlines.map((deadline, deadlineIndex) => (
                        <div key={deadlineIndex} className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex-shrink-0">
                            {getStatusIcon(deadline.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900">{deadline.event}</h4>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">{deadline.date}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(deadline.status)}`}>
                                  {deadline.status}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{deadline.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Short Courses Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Short Course Deadlines</h2>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                  <h3 className="text-xl font-bold">Flexible Short Courses</h3>
                  <p className="text-purple-100 mt-1">Rolling admission with multiple start dates</p>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {shortCourses.map((course, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{course.course}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{course.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Next Start:</span>
                            <span className="font-medium">{course.nextStart}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Deadline:</span>
                            <span className="font-medium text-blue-600">{course.deadline}</span>
                          </div>
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
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 bg-amber-50 rounded-xl p-8 border border-amber-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-900">Important Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Application Tips</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Apply early to secure your spot and avoid late fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Ensure all required documents are ready before applying</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Check specific program deadlines as they may vary</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Late Applications</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Late applications subject to availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Additional fees may apply for late applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>Processing time may be longer for late applications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Don't Miss Your Deadline!</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Start your application today to secure your place in your desired program.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/admissions/online-application"
                    className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Apply Now
                  </a>
                  <a 
                    href="/admissions/entry-requirements"
                    className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
                  >
                    Check Requirements
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

export default DeadlinesPage;
