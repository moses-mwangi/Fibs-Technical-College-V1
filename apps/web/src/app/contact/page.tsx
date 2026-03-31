'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  AlertCircle, 
  CheckCircle,
  Navigation,
  Building,
  Car,
  GraduationCap,
  Users,
  ChevronRight,
  ExternalLink,
  Calendar,
  MessageCircle,
  Globe,
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';



interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  location: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    location: 'nairobi'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeLocation, setActiveLocation] = useState('nairobi');

  // College locations
  const locations = [
    {
      id: 'nairobi',
      name: 'Nairobi Main Campus',
      address: 'Along Thika Road, Next to Garden City Mall',
      city: 'Nairobi, Kenya',
      phone: ['+254 706 212 101', '+254 707 490 390'],
      email: ['info@fibscollege.ac.ke', 'admissions@fibscollege.ac.ke'],
      hours: 'Mon-Fri: 8am-6pm | Sat: 8am-2pm',
      coordinates: { lat: -1.2333, lng: 36.8673 },
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8174835425!2d36.8218!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d7b6b5c1f5%3A0x8c2b8c2b8c2b8c2b!2sNairobi!5e0!3m2!1sen!2ske!4v1234567890!5m2!1sen!2ske',
      image: '/images/nairobi-campus.jpg'
    },
    {
      id: 'mombasa',
      name: 'Mombasa Campus',
      address: 'Off Mombasa Road, Next to City Mall',
      city: 'Mombasa, Kenya',
      phone: ['+254 711 223 344', '+254 722 334 455'],
      email: ['mombasa@fibscollege.ac.ke', 'admissions.mombasa@fibscollege.ac.ke'],
      hours: 'Mon-Fri: 8am-5pm | Sat: 8am-1pm',
      coordinates: { lat: -4.0435, lng: 39.6682 },
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8174835425!2d39.6682!3d-4.0435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1840132e8e8e8e8e%3A0x8c2b8c2b8c2b8c2b!2sMombasa!5e0!3m2!1sen!2ske!4v1234567890!5m2!1sen!2ske',
    },
    {
      id: 'kisumu',
      name: 'Kisumu Campus',
      address: 'Kisumu Business Park, 3rd Floor',
      city: 'Kisumu, Kenya',
      phone: ['+254 733 445 566', '+254 744 556 677'],
      email: ['kisumu@fibscollege.ac.ke', 'admissions.kisumu@fibscollege.ac.ke'],
      hours: 'Mon-Fri: 8am-5pm | Sat: 9am-2pm',
      coordinates: { lat: -0.1022, lng: 34.7617 },
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8174835425!2d34.7617!3d-0.1022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d7b6b5c1f5%3A0x8c2b8c2b8c2b8c2b!2sKisumu!5e0!3m2!1sen!2ske!4v1234567890!5m2!1sen!2ske',
    },
    {
      id: 'eldoret',
      name: 'Eldoret Campus',
      address: 'Eldoret Town, Opposite Uasin Gishu County Building',
      city: 'Eldoret, Kenya',
      phone: ['+254 755 667 788', '+254 766 778 899'],
      email: ['eldoret@fibscollege.ac.ke', 'admissions.eldoret@fibscollege.ac.ke'],
      hours: 'Mon-Fri: 8am-5pm | Sat: 9am-1pm',
      coordinates: { lat: 0.5143, lng: 35.2698 },
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8174835425!2d35.2698!3d0.5143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d7b6b5c1f5%3A0x8c2b8c2b8c2b8c2b!2sEldoret!5e0!3m2!1sen!2ske!4v1234567890!5m2!1sen!2ske',
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\d\s+\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Contact form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        location: 'nairobi'
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeLocationData = locations.find(loc => loc.id === activeLocation) || locations[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section - More Dynamic */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-orange-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-orange-600/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Let's Connect</h1>
            <p className="text-xl opacity-100 mb-8">
              Whether you have questions about our programs, need assistance with applications, 
              or want to visit our campus — we're here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Phone className="h-4 w-4" />
                <span>0706-212101</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Mail className="h-4 w-4" />
                <span>info@fibscollege.ac.ke</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Tabs */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(location.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeLocation === location.id
                    ? 'bg-red-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>{location.name.split(' ')[0]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Location Details */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <motion.div
              key={activeLocation}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-xl h-[400px] lg:h-[500px]"
            >
              <iframe
                src={activeLocationData.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </motion.div>

            {/* Location Details */}
            <motion.div
              key={`details-${activeLocation}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeLocationData.name}</h2>
                <div className="w-16 h-1 bg-red-600 rounded"></div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">{activeLocationData.address}</p>
                    <p className="text-gray-600">{activeLocationData.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone Numbers</p>
                    {activeLocationData.phone.map((num, idx) => (
                      <a key={idx} href={`tel:${num}`} className="text-gray-600 hover:text-red-600 block">
                        {num}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Email Addresses</p>
                    {activeLocationData.email.map((email, idx) => (
                      <a key={idx} href={`mailto:${email}`} className="text-gray-600 hover:text-red-600 block">
                        {email}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Opening Hours</p>
                    <p className="text-gray-600">{activeLocationData.hours}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(activeLocationData.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm">Mon-Fri, 8am-6pm</p>
              <p className="text-red-600 font-medium mt-2">0706-212101</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <p className="text-gray-600 text-sm">Quick responses</p>
              <p className="text-green-600 font-medium mt-2">0707-490390</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">24/7 support</p>
              <p className="text-blue-600 font-medium mt-2">info@fibscollege.ac.ke</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">Schedule a tour</p>
              <p className="text-purple-600 font-medium mt-2">Book Appointment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 md:p-10"
            >
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800">Message Sent Successfully!</h4>
                    <p className="text-green-600 text-sm">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Message Failed to Send</h4>
                    <p className="text-red-600 text-sm">Please try again or call us directly at 0706-212101.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      placeholder="0706-212101"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Location
                    </label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    >
                      {locations.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Take the first step towards a successful career. Apply now or schedule a campus visit.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;