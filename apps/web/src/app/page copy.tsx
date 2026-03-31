'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Calendar, Users, Award, BookOpen, TrendingUp, Clock, MapPin, Phone, Mail, CheckCircle, Play } from 'lucide-react';
import { courses, testimonials, announcements } from '@/data/demoData';
import Button from '@/components/ui/Button';
import Image from 'next/image';

const HomePage = () => {
  const [currentDateTime, setCurrentDateTime] = React.useState<string>('');
    
    React.useEffect(() => {
      const updateDateTime = () => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Africa/Nairobi',
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour12: true,
        };
        setCurrentDateTime(now.toLocaleString('en-KE', options));
      };
      updateDateTime();
      const interval = setInterval(updateDateTime, 1000); // update every minute
      return () => clearInterval(interval);
    }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="FIBS College Campus"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        
       
        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-6 pt-20 pb-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
                <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                <span>Enrolling Now for {currentDateTime} Intake</span>
              </div>
              
              <h1 className="text-5xl md:text-[65px] font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Drive Your Future
                </span>
                <br />
                <span className="text-white bg-clip-text text-transparent">
                  Forward
                </span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Transform your career with industry-leading technical and driving education. 
                Join thousands of successful graduates building their future at FIBS College.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button href="/admissions/online-application" size="lg" className=" text-[16px] bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-0 shadow-2xl">
                  <Play className="h-5 w-5 mr-2" />
                  Start Your Journey
                </Button>
                <Button href="/courses" variant="outline" size="lg" className="text-[16px] border-white/30 text-white hover:bg-transparent hover:text-slate-900">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Programs
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">15+</div>
                  <div className="text-sm text-gray-400">Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">5000+</div>
                  <div className="text-sm text-gray-400">Graduates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">98%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <Award className="h-8 w-8 text-yellow-400 mb-2" />
                    <div className="text-white font-semibold">KNEC Accredited</div>
                    <div className="text-gray-400 text-sm">Recognized Institution</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <Users className="h-8 w-8 text-blue-400 mb-2" />
                    <div className="text-white font-semibold">Expert Faculty</div>
                    <div className="text-gray-400 text-sm">Industry Professionals</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <Clock className="h-8 w-8 text-green-400 mb-2" />
                    <div className="text-white font-semibold">Flexible Schedule</div>
                    <div className="text-gray-400 text-sm">Day & Evening Classes</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <CheckCircle className="h-8 w-8 text-red-400 mb-2" />
                    <div className="text-white font-semibold">Job Placement</div>
                    <div className="text-gray-400 text-sm">Career Support</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Preview Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-red-500/5"></div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
              About FIBS College
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Excellence in <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Technical Education</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Transform your career with industry-leading programs designed for real-world success. 
              Our comprehensive approach combines theoretical knowledge with practical hands-on experience.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Industry Accredited</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Fully accredited by KNEC and recognized by TVETA, ensuring your qualifications meet national standards and employer expectations.
                  </p>
                  <div className="flex items-center text-red-600 font-medium group-hover:text-red-700 transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Expert Faculty</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Learn from industry professionals with years of practical experience. Our instructors bring real-world knowledge directly to the classroom.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    <span>Meet Our Team</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Hands-On Training</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Get practical experience with modern equipment and facilities. Our approach ensures you're job-ready from day one.
                  </p>
                  <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                    <span>View Facilities</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10"></div>
            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Career?</h3>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Join thousands of successful graduates who have built rewarding careers through our comprehensive programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/apply" size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-0">
                    Apply Today
                  </Button>
                  <Button href="/contact" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-slate-900">
                    Schedule Visit
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">15+</div>
                  <div className="text-gray-400">Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">5000+</div>
                  <div className="text-gray-400">Graduates</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">98%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">10+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="programs" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Our Programs
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Skills with <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Industry-Leading Courses</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Choose from our comprehensive range of programs designed to meet industry demands and launch your career.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {courses.slice(0, 6).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {course.department}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.requirements}</span>
                      </div>
                      <Link 
                        href="/courses" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-all"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-50"></div>
            <div className="relative text-center">
              <h3 className="text-3xl font-bold mb-6">Ready to Start Learning?</h3>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                Explore our full catalog of courses and find the perfect program to advance your career.
              </p>
              <Button href="/courses" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-0 shadow-xl">
                View All Courses
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Students Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Real experiences from graduates who transformed their careers through our programs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -mr-10 -mt-10"></div>
                  
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic leading-relaxed text-lg">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.course}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
                  <p className="text-xl text-gray-600">Real experiences from our graduates</p>
                </motion.div>
      
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="bg-white rounded-lg shadow-lg p-6"
                    >
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                      <div>
                        <p className="font-semibold text-gray-700">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.course}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

      {/* News & Events Section */}
      {/* <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-4">
              Latest Updates
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              News & <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Stay updated with our latest announcements, events, and important dates.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {announcements.slice(0, 3).map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  <div className="p-8">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      {announcement.createdAt.toLocaleDateString()}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-green-600 transition-colors">
                      {announcement.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {announcement.content}
                    </p>
                    
                    <Link 
                      href="/news" 
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group-hover:translate-x-1 transition-all"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <Button href="/news" size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-xl">
              View All News
            </Button>
          </motion.div>
        </div>
      </section> */}

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News & Events</h2>
            <p className="text-xl text-gray-600">Stay updated with our latest announcements</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {announcement.createdAt.toLocaleDateString()}
                  </div>
                  <h3 className="text-xl text-gray-700 font-semibold mb-3">{announcement.title}</h3>
                  <p className="text-gray-600 mb-4">{announcement.content}</p>
                  <Link href="/news" className="text-red-600 hover:text-red-700 font-medium inline-flex items-center">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/news" size="lg">
              View All News
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Transform</span> Your Future?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Take the first step towards a successful career. Apply now or schedule a visit to learn more about our programs.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Phone className="h-8 w-8 text-red-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                <p className="text-gray-300">+254 700 000 000</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Mail className="h-8 w-8 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                <p className="text-gray-300">info@fibscollege.ac.ke</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <MapPin className="h-8 w-8 text-green-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
                <p className="text-gray-300">Nairobi, Kenya</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button href="/apply" size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-0 shadow-2xl">
                Apply Now
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-slate-900">
                Schedule Visit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
