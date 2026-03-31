'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Award, Monitor, Car, Wrench, Briefcase, Search } from 'lucide-react';
import { courses, departments } from '@/data/demoData';
import Button from '@/components/ui/Button';

const CoursesPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesDepartment = selectedDepartment === 'All' || course.department === selectedDepartment;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'ICT Department':
        return <Monitor className="h-6 w-6" />;
      case 'Driving Department':
        return <Car className="h-6 w-6" />;
      case 'Technical Department':
        return <Wrench className="h-6 w-6" />;
      case 'Business Department':
        return <Briefcase className="h-6 w-6" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'ICT Department':
        return 'bg-red-500';
      case 'Driving Department':
        return 'bg-green-500';
      case 'Technical Department':
        return 'bg-orange-500';
      case 'Business Department':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 to-orange-600/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Our Courses</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive range of programs designed to equip you with practical skills
          </p>
        </motion.div>
      </section>

      {/* Departments Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Departments</h2>
            <p className="text-xl text-gray-600">Explore our diverse academic departments</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedDepartment(dept.name)}
              >
                <div className={`${getDepartmentColor(dept.name)} w-16 h-16 rounded-full flex items-center justify-center text-white mb-4 mx-auto`}>
                  {getDepartmentIcon(dept.name)}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{dept.name}</h3>
                <p className="text-gray-600 text-center text-sm">{dept.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:w-64">
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="All">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept.name} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Listing */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedDepartment === 'All' ? 'All Courses' : `${selectedDepartment} Courses`}
            </h2>
            <p className="text-gray-600">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${getDepartmentColor(course.department)} h-2`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-500">{course.department}</span>
                    <div className={`${getDepartmentColor(course.department)} p-2 rounded-full text-white`}>
                      {getDepartmentIcon(course.department)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2 text-red-600" />
                      <span>Duration: {course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 text-red-600" />
                      <span>Requirements: {course.requirements}</span>
                    </div>
                  </div>
                  
                  <Button href="/apply" className="w-full">
                    Apply Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSelectedDepartment('All');
                  setSearchTerm('');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of successful graduates who have transformed their careers through our quality education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/apply" size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Apply Now
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
                Get More Info
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
