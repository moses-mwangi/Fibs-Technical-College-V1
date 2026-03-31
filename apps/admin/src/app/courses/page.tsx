"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Clock,
  Users,
  DollarSign,
  Award,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Target,
  TrendingUp
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  code: string;
  department: string;
  duration: string;
  credits: number;
  instructor: string;
  enrolled: number;
  maxCapacity: number;
  status: "active" | "inactive" | "upcoming" | "completed";
  startDate: string;
  endDate: string;
  description: string;
  level: "certificate" | "diploma" | "bachelor" | "master";
  tuitionFee: number;
}

const CoursesManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const departments = [
    { value: "all", label: "All Departments" },
    { value: "business", label: "Business & Management" },
    { value: "it", label: "Information Technology" },
    { value: "engineering", label: "Engineering & Technical" },
    { value: "health", label: "Health Sciences" },
    { value: "driving", label: "Driving School" },
    { value: "hospitality", label: "Hospitality & Tourism" }
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" }
  ];

  // Demo data
  useEffect(() => {
    const timer = setTimeout(() => {
      const demoCourses: Course[] = [
        {
          id: "1",
          title: "Computer Science",
          code: "CS101",
          department: "it",
          duration: "4 Years",
          credits: 240,
          instructor: "Dr. John Smith",
          enrolled: 45,
          maxCapacity: 60,
          status: "active",
          startDate: "2024-01-15",
          endDate: "2028-01-15",
          description: "Comprehensive computer science program covering software development, algorithms, and system design.",
          level: "bachelor",
          tuitionFee: 150000
        },
        {
          id: "2",
          title: "Business Administration",
          code: "BA201",
          department: "business",
          duration: "3 Years",
          credits: 180,
          instructor: "Prof. Mary Johnson",
          enrolled: 38,
          maxCapacity: 50,
          status: "active",
          startDate: "2024-01-20",
          endDate: "2027-01-20",
          description: "Business management, marketing, finance, and entrepreneurship fundamentals.",
          level: "bachelor",
          tuitionFee: 120000
        },
        {
          id: "3",
          title: "Professional Driving Course",
          code: "PD301",
          department: "driving",
          duration: "3 Months",
          credits: 45,
          instructor: "Michael Kamau",
          enrolled: 25,
          maxCapacity: 30,
          status: "active",
          startDate: "2024-02-01",
          endDate: "2024-05-01",
          description: "Comprehensive driving training including theory and practical sessions.",
          level: "certificate",
          tuitionFee: 45000
        },
        {
          id: "4",
          title: "Civil Engineering",
          code: "CE401",
          department: "engineering",
          duration: "4 Years",
          credits: 260,
          instructor: "Eng. Peter Njoroge",
          enrolled: 32,
          maxCapacity: 40,
          status: "active",
          startDate: "2024-01-10",
          endDate: "2028-01-10",
          description: "Structural engineering, construction management, and infrastructure development.",
          level: "bachelor",
          tuitionFee: 180000
        },
        {
          id: "5",
          title: "Nursing",
          code: "NU501",
          department: "health",
          duration: "4 Years",
          credits: 280,
          instructor: "Dr. Grace Achieng",
          enrolled: 28,
          maxCapacity: 35,
          status: "active",
          startDate: "2024-01-15",
          endDate: "2028-01-15",
          description: "Comprehensive nursing program with clinical practice and theoretical knowledge.",
          level: "bachelor",
          tuitionFee: 200000
        },
        {
          id: "6",
          title: "Web Development Bootcamp",
          code: "WD601",
          department: "it",
          duration: "3 Months",
          credits: 60,
          instructor: "James Muriithi",
          enrolled: 18,
          maxCapacity: 25,
          status: "upcoming",
          startDate: "2024-06-01",
          endDate: "2024-09-01",
          description: "Intensive web development covering HTML, CSS, JavaScript, React, and Node.js.",
          level: "certificate",
          tuitionFee: 35000
        }
      ];

      setCourses(demoCourses);
      setFilteredCourses(demoCourses);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter courses
  useEffect(() => {
    let filtered = courses;

    if (selectedDepartment !== "all") {
      filtered = filtered.filter(course => course.department === selectedDepartment);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(course => course.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [courses, selectedDepartment, selectedStatus, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "certificate": return "bg-blue-100 text-blue-800";
      case "diploma": return "bg-green-100 text-green-800";
      case "bachelor": return "bg-purple-100 text-purple-800";
      case "master": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const coursesPerPage = 10;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handleAddCourse = () => {
    setShowAddModal(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== courseId));
    }
  };

  const getEnrollmentPercentage = (enrolled: number, maxCapacity: number) => {
    return Math.round((enrolled / maxCapacity) * 100);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
            <p className="text-gray-600">Manage academic courses and programs</p>
          </div>
          <button
            onClick={handleAddCourse}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {departments.map(dept => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading courses...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {paginatedCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  {/* Course Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.code}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>{course.department} Department</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{course.duration}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{course.instructor}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2" />
                      <span>{course.credits} Credits</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>KES {course.tuitionFee.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Enrollment Progress */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Enrollment</span>
                      <span className={`text-sm font-semibold ${
                        getEnrollmentPercentage(course.enrolled, course.maxCapacity) >= 90 ? "text-green-600" :
                        getEnrollmentPercentage(course.enrolled, course.maxCapacity) >= 70 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {course.enrolled}/{course.maxCapacity} ({getEnrollmentPercentage(course.enrolled, course.maxCapacity)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          getEnrollmentPercentage(course.enrolled, course.maxCapacity) >= 90 ? "bg-green-500" :
                          getEnrollmentPercentage(course.enrolled, course.maxCapacity) >= 70 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${getEnrollmentPercentage(course.enrolled, course.maxCapacity)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit Course"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-700">
                <span>
                  Showing {((currentPage - 1) * coursesPerPage) + 1} to{" "}
                  {Math.min(currentPage * coursesPerPage, filteredCourses.length)} of{" "}
                  {filteredCourses.length} courses
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesManagement;
