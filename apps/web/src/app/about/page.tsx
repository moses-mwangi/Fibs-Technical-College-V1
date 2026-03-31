
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  History, 
  Eye, 
  Users, 
  Award, 
  BookOpen, 
  Wrench, 
  Car, 
  Monitor,
  GraduationCap,
  ChevronRight,
  Heart,
  Target,
  Sparkles,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle
} from 'lucide-react';

const AboutPage = () => {
  const facilities = [
    {
      title: 'Computer Labs',
      description: 'Modern computer labs equipped with high-speed internet and industry-standard software for hands-on learning.',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      title: 'Driving Range',
      description: 'Spacious practice area with various road scenarios and modern training vehicles for real-world experience.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      title: 'Technical Workshop',
      description: 'Fully equipped workshop with modern tools and equipment for practical technical training.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      title: 'Learning Resource Center',
      description: 'Well-stocked library with textbooks, digital resources, and quiet study areas.',
      image: 'https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ];

  const coreValues = [
    { icon: Heart, title: 'Keep It Real', description: 'No fancy talk, just practical skills that work in the real world' },
    { icon: Target, title: 'Do Right', description: 'Treat everyone fairly, charge honestly, deliver what we promise' },
    { icon: Users, title: 'Students First', description: 'If our students don\'t succeed, we don\'t succeed. Simple as that.' },
    { icon: Sparkles, title: 'Stay Current', description: 'Things change fast. We keep updating so what we teach still matters' },
  ];

  const milestones = [
    { year: '2010', title: 'One Car, Big Dreams', description: 'Started with John\'s personal Toyota and 20 determined students' },
    { year: '2012', title: 'Official Recognition', description: 'Got our NTSA license - could finally teach legally!' },
    { year: '2015', title: 'Growing Up', description: 'TVETA accreditation meant we could offer technical courses too' },
    { year: '2018', title: 'New Home', description: 'Moved to our current campus with proper classrooms and workshops' },
    { year: '2020', title: 'Going Digital', description: 'COVID forced us online - turned out students loved the flexibility' },
    { year: '2024', title: '5,000 Strong', description: 'Our alumni network now spans every county in Kenya' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - More natural and welcoming */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-orange-600/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Our Story</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From a small driving school to a community of over 5,000 graduates
          </p>
        </motion.div>
      </section>


      {/* Our Story - More personal and engaging */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <History className="h-8 w-8 text-red-600 mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It All Began</h2>
              </div>
              
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Back in 2010, we started with just a Toyota Corolla and a big dream. Our founder, John Kamau, 
                noticed that many young Kenyans wanted to learn driving but couldn't afford the expensive schools. 
                So he began teaching friends in his spare time, charging just enough to cover fuel.
              </p>
              
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Word spread fast. Within six months, we had 20 students and had to rent a small office. 
                Students kept asking for more - computer skills, business courses, technical training. So we listened. 
                That's how FIBS grew from one car to four departments and hundreds of students.
              </p>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Today, when we see our graduates driving buses for major companies, managing businesses, 
                or fixing cars in busy garages, we remember that first student who showed up with nothing but 
                determination. That's still what drives us.
              </p>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>KNEC Accredited</span>
                <span className="mx-2">•</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>TVETA Recognized</span>
                <span className="mx-2">•</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>NTSA Licensed</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
                    <div 
                      className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
                    ></div>
                  </div>
                  <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
                    <div 
                      className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
                    <div 
                      className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
                    ></div>
                  </div>
                  <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
                    <div 
                      className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Clean and impactful */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Where We're Going</h3>
              <p className="text-gray-700 leading-relaxed">
                We want to be the place Kenyans think of first when they want practical skills that actually 
                get them jobs. Not fancy certificates that collect dust, but real abilities that employers 
                value. The kind where our graduates can walk into any interview and say "I can do this" 
                and actually prove it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Actually Do</h3>
              <p className="text-gray-700 leading-relaxed">
                Keep it simple and affordable. We teach what people need to know, not what looks good on paper. 
                Our instructors aren't just teachers - they're former mechanics, drivers, and business owners 
                who've been in the trenches. They know what works because they've lived it.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                No hidden fees, no complicated requirements. Just solid training that gets you ready for work.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Believe In</h2>
            <p className="text-lg text-gray-600">These aren't just values - they're how we make decisions every day</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Road So Far</h2>
            <p className="text-lg text-gray-600">Some moments that shaped who we are today</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-200"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const isLeft = index % 2 === 0;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative flex items-center justify-between`}
                    >
                      {/* Content card for left side */}
                      {isLeft && (
                        <div className="flex-1 md:pr-12 md:text-right">
                          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow max-w-md ml-auto">
                            <div className="flex items-center gap-3 mb-2 justify-end">
                              <div className="h-px bg-gray-300 flex-1"></div>
                              <span className="text-2xl font-bold text-red-600">{milestone.year}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Timeline dot and spacer */}
                      <div className="relative flex items-center justify-center w-12">
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-4 border-white shadow-sm z-10"></div>
                      </div>
                      
                      {/* Content card for right side */}
                      {!isLeft && (
                        <div className="flex-1 md:pl-12">
                          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow max-w-md">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl font-bold text-red-600">{milestone.year}</span>
                              <div className="h-px bg-gray-300 flex-1"></div>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Mobile fallback - centered card */}
                      <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 w-full max-w-sm">
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-red-600">{milestone.year}</span>
                            <div className="h-px bg-gray-300 flex-1"></div>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities - More visual */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Facilities</h2>
            <p className="text-lg text-gray-600">Modern spaces designed for effective learning</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 aspect-square">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${facility.image})` }}
                  ></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{facility.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">From Our Founder</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "I still remember the first student who came to me. He had saved up for months just 
                    to learn driving. That day I realized this wasn't about making money - it was about 
                    changing lives. Every certificate we issue represents someone's future, someone's family 
                    depending on them. We don't take that lightly."
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">John Kamau</p>
                    <p className="text-sm text-gray-500">Started with one car, still teaches driving sometimes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;