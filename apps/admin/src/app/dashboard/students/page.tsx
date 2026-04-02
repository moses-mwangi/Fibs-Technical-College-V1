'use client';

import React, { useState, useEffect } from 'react';
import { apiClient, Student, Course, Branch } from '../../lib/api';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Upload,
  Eye,
  Download,
  UserCheck,
  UserX,
  Calendar,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  X,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const studentSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female'], 'Gender is required'),
  address: z.string().min(5, 'Address is required'),
  branchId: z.string().min(1, 'Branch is required'),
  courseId: z.string().min(1, 'Course is required'),
});

type StudentForm = z.infer<typeof studentSchema>;

export default function StudentsPage() {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentForm>({
    resolver: zodResolver(studentSchema),
  });

  useEffect(() => {
    fetchStudents();
    fetchBranches();
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBranch) {
      filtered = filtered.filter(student => student.branchId === selectedBranch);
    }

    if (selectedCourse) {
      filtered = filtered.filter(student => student.courseId === selectedCourse);
    }

    if (selectedStatus) {
      filtered = filtered.filter(student => student.status === selectedStatus);
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, selectedBranch, selectedCourse, selectedStatus]);

  const fetchStudents = async (page = 1, branchId = '', courseId = '', status = '') => {
    try {
      const response = await apiClient.getStudents({
        page,
        limit: 10,
        branchId,
        courseId,
        status,
      });
      if (response.success && response.data) {
        if (page === 1) {
          setStudents(response.data.students);
          setTotalPages(response.data.totalPages);
        } else {
          setStudents(prev => [...prev, ...response.data.students]);
        }
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await apiClient.getBranches();
      if (response.success && response.data) {
        setBranches(response.data);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await apiClient.getCourses();
      if (response.success && response.data) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const onSubmit = async (data: StudentForm) => {
    try {
      if (editingStudent) {
        const response = await apiClient.updateStudent(editingStudent.id, data);
        if (response.success) {
          toast.success('Student updated successfully');
          setStudents(prev => prev.map(student => 
            student.id === editingStudent.id ? { ...response.data } : student
          ));
          setShowModal(false);
          setEditingStudent(null);
          reset();
        }
      } else {
        const response = await apiClient.createStudent(data);
        if (response.success) {
          toast.success('Student created successfully');
          setStudents(prev => [response.data, ...prev]);
          setShowModal(false);
          reset();
        }
      }
    } catch (error: any) {
      console.error('Error saving student:', error);
      toast.error(error.response?.data?.message || 'Failed to save student');
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    reset({
      fullName: student.fullName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      address: student.address,
      branchId: student.branchId,
      courseId: student.courseId,
    });
    setShowModal(true);
  };

  const handleDelete = async (student: Student) => {
    try {
      const response = await apiClient.deleteStudent(student.id);
      if (response.success) {
        toast.success('Student deleted successfully');
        setStudents(prev => prev.filter(s => s.id !== student.id));
        setShowDeleteModal(false);
        setStudentToDelete(null);
      }
    } catch (error: any) {
      console.error('Error deleting student:', error);
      toast.error(error.response?.data?.message || 'Failed to delete student');
    }
  };

  const handleStatusChange = async (student: Student, newStatus: string) => {
    try {
      const response = await apiClient.updateStudent(student.id, { status: newStatus });
      if (response.success) {
        toast.success(`Student ${newStatus} successfully`);
        setStudents(prev => prev.map(s => 
          s.id === student.id ? { ...response.data } : s
        ));
      }
    } catch (error: any) {
      console.error('Error updating student status:', error);
      toast.error(error.response?.data?.message || 'Failed to update student status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'graduated': return 'text-blue-600 bg-blue-100';
      case 'suspended': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <UserCheck className="h-4 w-4" />;
      case 'inactive': return <UserX className="h-4 w-4" />;
      case 'graduated': return <BookOpen className="h-4 w-4" />;
      case 'suspended': return <UserX className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Manage student records and information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Branches</option>
              {branches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
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
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${student.gender === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                      {student.gender === 'male' ? 'M' : 'F'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.branch?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.course?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {getStatusIcon(student.status)}
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setStudentToDelete(student);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800"
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
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{currentPage}</span> of {totalPages}
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:max-w-2xl">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {editingStudent ? 'Edit Student' : 'Add New Student'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingStudent(null);
                      reset();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        {...register('fullName')}
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter full name"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        {...register('email')}
                        type="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        {...register('phoneNumber')}
                        type="tel"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter phone number"
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input
                        {...register('dateOfBirth')}
                        type="date"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                      {...register('gender')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Branch</label>
                    <select
                      {...register('branchId')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select branch</option>
                      {branches.map(branch => (
                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <select
                      {...register('courseId')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      {...register('address')}
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingStudent ? 'Update' : 'Create'} Student
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingStudent(null);
                      reset();
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && studentToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete Student
                  </h3>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setStudentToDelete(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <span className="font-medium text-gray-900">{studentToDelete.fullName}</span>? This action cannot be undone.
                </p>
              </div>
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setStudentToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(studentToDelete)}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
