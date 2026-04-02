'use client';

import React, { useState, useEffect } from 'react';
import { apiClient, Course, Branch, Staff } from '../../../lib/api';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  User,
  DollarSign,
  Clock,
  MapPin,
  X,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const courseSchema = z.object({
  name: z.string().min(2, 'Course name is required'),
  code: z.string().min(2, 'Course code is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  duration: z.string().min(1, 'Duration is required'),
  fee: z.number().min(0, 'Fee must be a positive number'),
  lecturerId: z.string().optional(),
  branchId: z.string().min(1, 'Branch is required'),
});

type CourseForm = z.infer<typeof courseSchema>;

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    fetchCourses();
    fetchBranches();
    fetchStaff();
  }, []);

  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBranch) {
      filtered = filtered.filter(course => course.branchId === selectedBranch);
    }

    if (selectedLecturer) {
      filtered = filtered.filter(course => course.lecturerId === selectedLecturer);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedBranch, selectedLecturer]);

  const fetchCourses = async (page = 1, branchId = '', lecturerId = '') => {
    try {
      const response = await apiClient.getCourses({
        page,
        limit: 10,
        branchId,
        lecturerId,
      });
      if (response.success && response.data) {
        if (page === 1) {
          setCourses(response.data.courses);
          setTotalPages(response.data.totalPages);
        } else {
          setCourses(prev => [...prev, ...response.data.courses]);
        }
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses');
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

  const fetchStaff = async () => {
    try {
      const response = await apiClient.getStaff({ role: 'lecturer' });
      if (response.success && response.data) {
        setStaff(response.data.staff);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const onSubmit = async (data: CourseForm) => {
    try {
      if (editingCourse) {
        const response = await apiClient.updateCourse(editingCourse.id, data);
        if (response.success) {
          toast.success('Course updated successfully');
          setCourses(prev => prev.map(course => 
            course.id === editingCourse.id ? { ...response.data } : course
          ));
          setShowModal(false);
          setEditingCourse(null);
          reset();
        }
      } else {
        const response = await apiClient.createCourse(data);
        if (response.success) {
          toast.success('Course created successfully');
          setCourses(prev => [response.data, ...prev]);
          setShowModal(false);
          reset();
        }
      }
    } catch (error: any) {
      console.error('Error saving course:', error);
      toast.error(error.response?.data?.message || 'Failed to save course');
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    reset({
      name: course.name,
      code: course.code,
      description: course.description,
      duration: course.duration,
      fee: course.fee,
      lecturerId: course.lecturerId,
      branchId: course.branchId,
    });
    setShowModal(true);
  };

  const handleDelete = async (course: Course) => {
    try {
      const response = await apiClient.deleteCourse(course.id);
      if (response.success) {
        toast.success('Course deleted successfully');
        setCourses(prev => prev.filter(c => c.id !== course.id));
        setShowDeleteModal(false);
        setCourseToDelete(null);
      }
    } catch (error: any) {
      console.error('Error deleting course:', error);
      toast.error(error.response?.data?.message || 'Failed to delete course');
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
          <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600">Manage courses and their information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Course
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
                placeholder="Search courses..."
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
            <label className="block text-sm font-medium text-gray-700">Lecturer</label>
            <select
              value={selectedLecturer}
              onChange={(e) => setSelectedLecturer(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Lecturers</option>
              {staff.map(lecturer => (
                <option key={lecturer.id} value={lecturer.id}>{lecturer.fullName}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lecturer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{course.name}</div>
                      <div className="text-sm text-gray-500">{course.description.substring(0, 50)}...</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      {course.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                      KES {course.fee.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      {course.lecturer?.fullName || 'Not assigned'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      {course.branch?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setCourseToDelete(course);
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
                    {editingCourse ? 'Edit Course' : 'Add New Course'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingCourse(null);
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
                      <label className="block text-sm font-medium text-gray-700">Course Name</label>
                      <input
                        {...register('name')}
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter course name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Course Code</label>
                      <input
                        {...register('code')}
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter course code"
                      />
                      {errors.code && (
                        <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <input
                        {...register('duration')}
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 3 months, 6 weeks"
                      />
                      {errors.duration && (
                        <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fee (KES)</label>
                      <input
                        {...register('fee', { valueAsNumber: true })}
                        type="number"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter course fee"
                      />
                      {errors.fee && (
                        <p className="mt-1 text-sm text-red-600">{errors.fee.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
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
                      {errors.branchId && (
                        <p className="mt-1 text-sm text-red-600">{errors.branchId.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Lecturer</label>
                      <select
                        {...register('lecturerId')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select lecturer</option>
                        {staff.map(lecturer => (
                          <option key={lecturer.id} value={lecturer.id}>{lecturer.fullName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      {...register('description')}
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter course description"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingCourse ? 'Update' : 'Create'} Course
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingCourse(null);
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
      {showDeleteModal && courseToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete Course
                  </h3>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setCourseToDelete(null);
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
                  Are you sure you want to delete <span className="font-medium text-gray-900">{courseToDelete.name}</span>? This action cannot be undone.
                </p>
              </div>
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setCourseToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(courseToDelete)}
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
