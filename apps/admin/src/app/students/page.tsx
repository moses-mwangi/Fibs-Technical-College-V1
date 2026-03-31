"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Award,
  UserCheck,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  department: string;
  enrollmentDate: string;
  status: "active" | "inactive" | "graduated" | "suspended";
  gpa?: number;
  feesPaid: boolean;
  avatar?: string;
}

const StudentsManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const departments = [
    { value: "all", label: "All Departments" },
    { value: "business", label: "Business & Management" },
    { value: "it", label: "Information Technology" },
    { value: "engineering", label: "Engineering & Technical" },
    { value: "health", label: "Health Sciences" },
    { value: "driving", label: "Driving School" }
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "graduated", label: "Graduated" },
    { value: "suspended", label: "Suspended" }
  ];

  // Demo data
  useEffect(() => {
    const timer = setTimeout(() => {
      const demoStudents: Student[] = [
        {
          id: "1",
          name: "John Kamau",
          email: "john.kamau@fibs.ac.ke",
          phone: "+254 712 345678",
          course: "Computer Science",
          department: "it",
          enrollmentDate: "2024-01-15",
          status: "active",
          gpa: 3.8,
          feesPaid: true
        },
        {
          id: "2",
          name: "Mary Wanjiku",
          email: "mary.wanjiku@fibs.ac.ke",
          phone: "+254 723 456789",
          course: "Business Administration",
          department: "business",
          enrollmentDate: "2024-01-20",
          status: "active",
          gpa: 3.6,
          feesPaid: true
        },
        {
          id: "3",
          name: "James Muriithi",
          email: "james.muriithi@fibs.ac.ke",
          phone: "+254 734 567890",
          course: "Professional Driving",
          department: "driving",
          enrollmentDate: "2024-02-01",
          status: "active",
          feesPaid: false
        },
        {
          id: "4",
          name: "Grace Njeri",
          email: "grace.njeri@fibs.ac.ke",
          phone: "+254 745 678901",
          course: "Civil Engineering",
          department: "engineering",
          enrollmentDate: "2023-09-15",
          status: "active",
          gpa: 3.4,
          feesPaid: true
        },
        {
          id: "5",
          name: "Peter Njoroge",
          email: "peter.njoroge@fibs.ac.ke",
          phone: "+254 756 789012",
          course: "Nursing",
          department: "health",
          enrollmentDate: "2023-08-20",
          status: "graduated",
          gpa: 3.9,
          feesPaid: true
        },
        {
          id: "6",
          name: "Susan Achieng",
          email: "susan.achieng@fibs.ac.ke",
          phone: "+254 767 890123",
          course: "Web Development",
          department: "it",
          enrollmentDate: "2024-03-10",
          status: "suspended",
          gpa: 2.8,
          feesPaid: false
        }
      ];

      setStudents(demoStudents);
      setFilteredStudents(demoStudents);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter students
  useEffect(() => {
    let filtered = students;

    if (selectedDepartment !== "all") {
      filtered = filtered.filter(student => student.department === selectedDepartment);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(student => student.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [students, selectedDepartment, selectedStatus, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "graduated": return "bg-blue-100 text-blue-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <UserCheck className="h-4 w-4" />;
      case "inactive": return <AlertCircle className="h-4 w-4" />;
      case "graduated": return <Award className="h-4 w-4" />;
      case "suspended": return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const studentsPerPage = 10;
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  const handleAddStudent = () => {
    setShowAddModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(s => s.id !== studentId));
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-600">Manage and track student information</p>
          </div>
          <button
            onClick={handleAddStudent}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Student
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
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading students...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            <Users className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            {student.gpa && (
                              <div className="text-xs text-gray-600">GPA: {student.gpa.toFixed(1)}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {departments.find(d => d.value === student.department)?.label}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                          {getStatusIcon(student.status)}
                          <span className="ml-2">{student.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditStudent(student)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditStudent(student)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Student"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Student"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-700">
                <span>
                  Showing {((currentPage - 1) * studentsPerPage) + 1} to{" "}
                  {Math.min(currentPage * studentsPerPage, filteredStudents.length)} of{" "}
                  {filteredStudents.length} students
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

export default StudentsManagement;
