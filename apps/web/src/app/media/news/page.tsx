'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Search, Plus } from 'lucide-react';
import { announcements } from '@/data/demoData';
import Button from '@/components/ui/Button';

interface Announcement {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  author?: string;
  category?: string;
}

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Extend demo data with more details
  const extendedAnnouncements: Announcement[] = announcements.map((ann, index) => ({
    ...ann,
    author: ['Admin', 'Principal', 'Academic Office'][index] || 'Admin',
    category: ['General', 'Academic', 'Events'][index] || 'General'
  }));

  const categories = ['All', 'General', 'Academic', 'Events', 'Admissions'];

  const filteredAnnouncements = extendedAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 to-orange-600/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">News & Announcements</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest news and events from FIBS College
          </p>
        </motion.div>
      </section>

      {/* Admin Panel Toggle */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <div className="text-sm text-gray-600">
              {filteredAnnouncements.length} {filteredAnnouncements.length === 1 ? 'announcement' : 'announcements'} found
            </div>
            <Button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {showAdminPanel ? 'Hide Admin Panel' : 'Show Admin Panel'}
            </Button>
          </div>
        </div>
      </section>

      {/* Admin Panel */}
      {showAdminPanel && (
        <section className="py-8 bg-blue-50 border-b">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4">Post New Announcement</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter announcement title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {categories.filter(cat => cat !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter announcement content"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Post Announcement
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search announcements..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:w-48">
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                          {announcement.category}
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(announcement.createdAt)}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {announcement.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {announcement.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      <span>By {announcement.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>2 min read</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No announcements found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-white ">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest announcements and news directly in your inbox
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-300 focus:outline-none"
                />
                <Button className="bg-gay-50 cursor-pointer text-gray-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
