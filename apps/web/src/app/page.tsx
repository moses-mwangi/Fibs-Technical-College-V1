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
        {/* <motion.div 
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
        </motion.div> */}
      </section>

      <section className="py-20 bg-white bg-opacity-95">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to FIBS College</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are a premier institution dedicated to providing quality education and practical skills 
              in driving, ICT, and technical fields. Our mission is to empower students with 
              the knowledge and expertise needed to succeed in today's competitive job market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Quality Education', description: 'Comprehensive curriculum designed by industry experts' },
              { icon: Users, title: 'Expert Instructors', description: 'Experienced professionals dedicated to your success' },
              { icon: BookOpen, title: 'Practical Training', description: 'Hands-on experience with modern equipment and facilities' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-red-300" />
                </div>
                <h3 className="text-xl text-gray-700 font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-lg text-gray-600">Explore our most popular programs</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.slice(0, 6).map((course, index) => (
              <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl text-gray-700 font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{course.department}</span>
                    <span>{course.duration}gggg</span>
                  </div>
                  <Link href="/courses" className="text-sm text-red-600 hover:text-red-700 font-medium inline-flex items-center">
                    Learn More <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/courses" className='text-[15px]'>
              View All Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
 
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
            <Button href="/news" className='text-[15px] bg-green-600 hover:bg-green-700'>
              View All News
            </Button>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default HomePage;
