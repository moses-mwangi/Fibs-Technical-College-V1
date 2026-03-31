'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Trophy, 
  Music, 
  Gamepad2, 
  Dumbbell, 
  Coffee, 
  BookOpen, 
  Heart,
  GraduationCap,
  Camera,
  Mic,
  Palette,
  Plane,
  Bus,
  Utensils,
  Wifi,
  Shield,
  Stethoscope,
  HelpCircle,
  MapPin,
  Clock,
  Star
} from 'lucide-react';

const CampusLifePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
    "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
    "url('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);
  const activities = [
    {
      icon: Music,
      title: 'Music & Drama',
      description: 'Join our vibrant music club, participate in drama productions, and showcase your talents at college events.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Sports & Athletics',
      description: 'Compete in various sports including football, basketball, volleyball, and athletics tournaments.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Gamepad2,
      title: 'Gaming & eSports',
      description: 'Modern gaming lounge with PlayStation, Xbox, and PC gaming stations for recreational and competitive gaming.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'Art & Design',
      description: 'Express your creativity through painting, digital art, sculpture, and design workshops.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Camera,
      title: 'Photography Club',
      description: 'Capture campus life, learn photography techniques, and contribute to our college magazine.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Mic,
      title: 'Debate & Public Speaking',
      description: 'Develop your communication skills through debates, public speaking competitions, and presentations.',
      color: 'from-red-500 to-orange-500'
    }
  ];

  const facilities = [
    {
      icon: Dumbbell,
      title: 'Gym & Fitness Center',
      description: 'Modern gym equipment, fitness classes, and personal training options.',
      available: '6:00 AM - 8:00 PM'
    },
    {
      icon: Coffee,
      title: 'Student Lounge',
      description: 'Comfortable seating, refreshments, and space for relaxation and socializing.',
      available: '8:00 AM - 10:00 PM'
    },
    {
      icon: BookOpen,
      title: 'Library & Study Areas',
      description: 'Quiet study spaces, group discussion rooms, and extensive learning resources.',
      available: '7:00 AM - 9:00 PM'
    },
    {
      icon: Utensils,
      title: 'Cafeteria',
      description: 'Affordable, nutritious meals with diverse menu options including vegetarian choices.',
      available: '7:00 AM - 8:00 PM'
    },
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Campus-wide high-speed internet connectivity for all students.',
      available: '24/7'
    },
    {
      icon: Shield,
      title: 'Security Services',
      description: '24/7 security personnel, CCTV surveillance, and secure campus environment.',
      available: '24/7'
    }
  ];

  const supportServices = [
    {
      icon: Stethoscope,
      title: 'Health & Medical',
      description: 'On-campus medical services, first aid, and health wellness programs.',
      contact: 'Ext: 101'
    },
    {
      icon: Heart,
      title: 'Counseling Services',
      description: 'Professional counselors for personal, academic, and career guidance.',
      contact: 'Ext: 102'
    },
    {
      icon: HelpCircle,
      title: 'Student Support',
      description: 'Assistance with academic issues, accommodation, and general student welfare.',
      contact: 'Ext: 103'
    },
    {
      icon: GraduationCap,
      title: 'Career Services',
      description: 'Career counseling, job placement assistance, and internship opportunities.',
      contact: 'Ext: 104'
    }
  ];

  const events = [
    {
      month: 'JAN',
      title: 'Freshers Orientation',
      description: 'Welcome week for new students with campus tours and introductions.',
      type: 'orientation'
    },
    {
      month: 'MAR',
      title: 'Sports Festival',
      description: 'Inter-department sports competitions and athletic championships.',
      type: 'sports'
    },
    {
      month: 'JUN',
      title: 'Cultural Week',
      description: 'Celebration of diverse cultures through food, music, and performances.',
      type: 'cultural'
    },
    {
      month: 'SEP',
      title: 'Talent Show',
      description: 'Annual showcase of student talents in music, dance, and arts.',
      type: 'talent'
    },
    {
      month: 'NOV',
      title: 'Graduation Ceremony',
      description: 'Celebration of our graduates\' achievements and success.',
      type: 'academic'
    },
    {
      month: 'DEC',
      title: 'End of Year Party',
      description: 'Festive celebration and awards ceremony for all students.',
      type: 'social'
    }
  ];

  const transportation = [
    {
      icon: Bus,
      title: 'College Shuttle',
      description: 'Free shuttle service connecting campus to major transport hubs and residential areas.',
      schedule: 'Every 30 minutes',
      routes: '5 main routes'
    },
    {
      icon: MapPin,
      title: 'Strategic Location',
      description: 'Easily accessible via public transport, located near major highways.',
      schedule: 'N/A',
      routes: 'Multiple bus stops'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-600/40 z-10"></div>
        
        {/* Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => {
            const isActive = currentImageIndex === index;
            const isNext = (currentImageIndex + 1) % heroImages.length === index;
            const isPrev = (currentImageIndex - 1 + heroImages.length) % heroImages.length === index;
            
            return (
              <motion.div
                key={index}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: image }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? '0%' : isNext ? '100%' : isPrev ? '-100%' : '100%',
                  zIndex: isActive ? 1 : 0
                }}
                transition={{
                  opacity: { duration: 0.8, ease: "easeInOut" },
                  x: { duration: 1.2, ease: "easeInOut" }
                }}
              />
            );
          })}
        </div>
        
        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Campus Life</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience vibrant student life, modern facilities, and endless opportunities for growth
          </p>
        </motion.div>
      </section>

      {/* Student Activities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Student Activities</h2>
            <p className="text-lg text-gray-600">Discover your passions and make lifelong memories</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${activity.color}`}></div>
                  <div className="p-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <activity.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Facilities */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Campus Facilities</h2>
            <p className="text-lg text-gray-600">Modern amenities designed for your comfort and convenience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <facility.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{facility.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{facility.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{facility.available}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Events */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Annual Events</h2>
            <p className="text-lg text-gray-600">Mark your calendar for these exciting campus events</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-center">
                  <div className="text-2xl font-bold text-white">{event.month}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full capitalize">
                      {event.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Student Support Services</h2>
            <p className="text-lg text-gray-600">We're here to support you every step of the way</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {supportServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                <div className="text-xs text-purple-600 font-medium">{service.contact}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transportation</h2>
            <p className="text-lg text-gray-600">Easy and convenient transport options</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {transportation.map((transport, index) => (
              <motion.div
                key={transport.title}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <transport.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{transport.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{transport.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{transport.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{transport.routes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Student Life Experiences</h2>
            <p className="text-lg text-gray-600">Hear what our students say about campus life</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah Wanjiku',
                course: 'Web Development',
                content: 'The campus life here is amazing! I love the diverse activities and the supportive community. The gaming lounge is my favorite spot after classes.',
                rating: 5
              },
              {
                name: 'Michael Ochieng',
                course: 'Business Management',
                content: 'Joining the debate club boosted my confidence so much. The facilities are top-notch, and the cafeteria food is actually great!',
                rating: 5
              },
              {
                name: 'Grace Mueni',
                course: 'Professional Driving',
                content: 'The sports festival was the highlight of my year! Made great friends and the support services really helped me settle in quickly.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.course}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampusLifePage;
