'use client';

import React, { useState, useEffect } from 'react';
import { apiClient, Application, Course, Branch } from '../../../lib/api';
import {
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Calendar,
  MapPin,
  BookOpen,
  UserCheck,
  XCircle,
  Clock,
  Download,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
    fetchCourses();
    fetchBranches();
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phoneNumber?.includes(searchTerm)
      );
    }

    if (selectedBranch) {
      filtered = filtered.filter(app => app.preferredBranchId === selectedBranch);
    }

    if (selectedCourse) {
      filtered = filtered.filter(app => app.preferredCourseId === selectedCourse);
    }

    if (selectedStatus) {
      filtered = filtered.filter(app => app.status === selectedStatus);
    }

    setFilteredApplications(filtered);
  }, [applications, searchTerm, selectedBranch, selectedCourse, selectedStatus]);

  const fetchApplications = async () => {
    try {
      const response = await apiClient.getApplications();
      if (response.success && response.data) {
        setApplications(response.data.applications);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await apiClient.getCourses();
      if (response.success && response.data) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
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

  const handleStatusUpdate = async (application: Application, newStatus: string) => {
    try {
      const response = await apiClient.updateApplication(application.id, { status: newStatus });
      if (response.success) {
        toast.success(`Application ${newStatus} successfully`);
        setApplications(prev => prev.map(app => 
          app.id === application.id ? { ...response.data } : app
        ));
      }
    } catch (error: any) {
      console.error('Error updating application:', error);
      toast.error(error.response?.data?.message || 'Failed to update application');
    }
  };

  const handleConvertToStudent = async (application: Application) => {
    try {
      const response = await apiClient.convertApplicationToStudent(application.id);
      if (response.success) {
        toast.success('Application converted to student successfully');
        setApplications(prev => prev.map(app => 
          app.id === application.id ? { ...app, status: 'converted' } : app
        ));
      }
    } catch (error: any) {
      console.error('Error converting application:', error);
      toast.error(error.response?.data?.message || 'Failed to convert application');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'converted': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <Check className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'converted': return <UserCheck className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getApplicationStats = () => {
    const total = applications.length;
    const pending = applications.filter(a => a.status === 'pending').length;
    const approved = applications.filter(a => a.status === 'approved').length;
    const rejected = applications.filter(a => a.status === 'rejected').length;
    const converted = applications.filter(a => a.status === 'converted').length;

    return { total, pending, approved, rejected, converted };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = getApplicationStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>
          <p className="text-gray-600">Review and manage student applications</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 rounded-lg p-3">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Converted</p>
              <p className="text-2xl font-bold text-gray-900">{stats.converted}</p>
            </div>
          </div>
        </div>
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
                placeholder="Search applications..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="converted">Converted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preferred Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
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
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{application.fullName}</div>
                      <div className="text-sm text-gray-500">ID: {application.applicationId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="text-sm text-gray-900">{application.email}</div>
                      <div className="text-sm text-gray-500">{application.phoneNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                      {courses.find(c => c.id === application.preferredCourseId)?.name || 'Unknown'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      {branches.find(b => b.id === application.preferredBranchId)?.name || 'Unknown'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span className="ml-1 capitalize">{application.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {application.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(application, 'approved')}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(application, 'rejected')}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      {application.status === 'approved' && (
                        <button
                          onClick={() => handleConvertToStudent(application)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Application Details
                  </h3>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedApplication(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-2">Personal Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Full Name:</span>
                        <span className="ml-2 text-gray-900">{selectedApplication.fullName}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Email:</span>
                        <span className="ml-2 text-gray-900">{selectedApplication.email}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Phone:</span>
                        <span className="ml-2 text-gray-900">{selectedApplication.phoneNumber}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Gender:</span>
                        <span className="ml-2 text-gray-900 capitalize">{selectedApplication.gender}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Date of Birth:</span>
                        <span className="ml-2 text-gray-900">{new Date(selectedApplication.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Address:</span>
                        <span className="ml-2 text-gray-900">{selectedApplication.address}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-2">Application Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Application ID:</span>
                        <span className="ml-2 text-gray-900">{selectedApplication.applicationId}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Applied Date:</span>
                        <span className="ml-2 text-gray-900">{new Date(selectedApplication.appliedDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Preferred Course:</span>
                        <span className="ml-2 text-gray-900">
                          {courses.find(c => c.id === selectedApplication.preferredCourseId)?.name || 'Unknown'}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Preferred Branch:</span>
                        <span className="ml-2 text-gray-900">
                          {branches.find(b => b.id === selectedApplication.preferredBranchId)?.name || 'Unknown'}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Status:</span>
                        <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApplication.status)}`}>
                          {getStatusIcon(selectedApplication.status)}
                          <span className="ml-1 capitalize">{selectedApplication.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedApplication.notes && (
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-2">Additional Notes</h4>
                      <p className="text-sm text-gray-600">{selectedApplication.notes}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedApplication(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Close
                  </button>
                  {selectedApplication.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedApplication, 'approved');
                          setShowDetailsModal(false);
                        }}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedApplication, 'rejected');
                          setShowDetailsModal(false);
                        }}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {selectedApplication.status === 'approved' && (
                    <button
                      onClick={() => {
                        handleConvertToStudent(selectedApplication);
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Convert to Student
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
