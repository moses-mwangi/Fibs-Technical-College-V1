"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Users,
  Calendar,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Award,
  DollarSign,
  Download,
  Eye,
  X
} from "lucide-react";

interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  course: string;
  department: string;
  submissionDate: string;
  status: "pending" | "under_review" | "approved" | "rejected" | "waitlisted";
  priority: "high" | "medium" | "low";
  gpa?: number;
  previousEducation?: string;
  notes?: string;
  documents: {
    transcript: boolean;
    certificate: boolean;
    id: boolean;
    recommendation: boolean;
  };
}

const AdmissionsManagement: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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
    { value: "pending", label: "Pending" },
    { value: "under_review", label: "Under Review" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "waitlisted", label: "Waitlisted" }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ];

  // Demo data
  useEffect(() => {
    const timer = setTimeout(() => {
      const demoApplications: Application[] = [
        {
          id: "1",
          applicantName: "John Kamau",
          email: "john.kamau@email.com",
          phone: "+254 712 345678",
          course: "Computer Science",
          department: "it",
          submissionDate: "2024-03-15",
          status: "pending",
          priority: "high",
          gpa: 3.8,
          previousEducation: "Nairobi High School",
          notes: "Strong background in mathematics and science",
          documents: {
            transcript: true,
            certificate: true,
            id: true,
            recommendation: false
          }
        },
        {
          id: "2",
          applicantName: "Mary Wanjiku",
          email: "mary.wanjiku@email.com",
          phone: "+254 723 456789",
          course: "Business Administration",
          department: "business",
          submissionDate: "2024-03-14",
          status: "under_review",
          priority: "high",
          gpa: 3.6,
          previousEducation: "Kenya High School",
          notes: "Excellent leadership qualities",
          documents: {
            transcript: true,
            certificate: true,
            id: true,
            recommendation: true
          }
        },
        {
          id: "3",
          applicantName: "James Muriithi",
          email: "james.muriithi@email.com",
          phone: "+254 734 567890",
          course: "Professional Driving Course",
          department: "driving",
          submissionDate: "2024-03-13",
          status: "approved",
          priority: "medium",
          gpa: 3.2,
          previousEducation: "Technical Secondary School",
          notes: "Experienced driver looking for professional certification",
          documents: {
            transcript: false,
            certificate: true,
            id: true,
            recommendation: true
          }
        },
        {
          id: "4",
          applicantName: "Grace Njeri",
          email: "grace.njeri@email.com",
          phone: "+254 745 678901",
          course: "Nursing",
          department: "health",
          submissionDate: "2024-03-12",
          status: "rejected",
          priority: "medium",
          gpa: 3.9,
          previousEducation: "Girls High School",
          notes: "Strong academic record but limited clinical experience",
          documents: {
            transcript: true,
            certificate: false,
            id: true,
            recommendation: true
          }
        },
        {
          id: "5",
          applicantName: "Peter Njoroge",
          email: "peter.njoroge@email.com",
          phone: "+254 756 789012",
          course: "Civil Engineering",
          department: "engineering",
          submissionDate: "2024-03-11",
          status: "waitlisted",
          priority: "low",
          gpa: 3.4,
          previousEducation: "Boys High School",
          notes: "Good academic background, needs to improve mathematics scores",
          documents: {
            transcript: true,
            certificate: true,
            id: false,
            recommendation: false
          }
        }
      ];

      setApplications(demoApplications);
      setFilteredApplications(demoApplications);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter applications
  useEffect(() => {
    let filtered = applications;

    if (selectedDepartment !== "all") {
      filtered = filtered.filter(app => app.department === selectedDepartment);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(app => app.status === selectedStatus);
    }

    if (selectedPriority !== "all") {
      filtered = filtered.filter(app => app.priority === selectedPriority);
    }

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  }, [applications, selectedDepartment, selectedStatus, selectedPriority, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "under_review": return "bg-blue-100 text-blue-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "waitlisted": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const applicationsPerPage = 10;
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * applicationsPerPage,
    currentPage * applicationsPerPage
  );

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleApprove = (applicationId: string) => {
    if (confirm("Are you sure you want to approve this application?")) {
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: "approved" } : app
      ));
    }
  };

  const handleReject = (applicationId: string) => {
    if (confirm("Are you sure you want to reject this application?")) {
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: "rejected" } : app
      ));
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admissions Management</h1>
            <p className="text-gray-600">Review and manage student applications</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Selected
            </button>
            <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorityOptions.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              <p className="text-sm text-gray-600">Total Applications</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.status === "pending").length}
              </p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.status === "approved").length}
              </p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.status === "rejected").length}
              </p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading applications...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
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
                  {paginatedApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            <Users className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{application.applicantName}</div>
                            {application.gpa && (
                              <div className="text-xs text-gray-600">GPA: {application.gpa.toFixed(1)}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {departments.find(d => d.value === application.department)?.label}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(application.priority)}`}>
                          {application.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(application)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {application.status === "pending" && (
                            <button
                              onClick={() => handleApprove(application.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Approve Application"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          {application.status === "pending" && (
                            <button
                              onClick={() => handleReject(application.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Reject Application"
                            >
                              <AlertCircle className="h-4 w-4" />
                            </button>
                          )}
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
                  Showing {((currentPage - 1) * applicationsPerPage) + 1} to{" "}
                  {Math.min(currentPage * applicationsPerPage, filteredApplications.length)} of{" "}
                  {filteredApplications.length} applications
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

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Application Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Applicant Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 mb-2">Applicant Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-medium">Name:</span>
                      <span>{selectedApplication.applicantName}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-medium">Email:</span>
                      <span>{selectedApplication.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-medium">Phone:</span>
                      <span>{selectedApplication.phone}</span>
                    </div>
                    {selectedApplication.gpa && (
                      <div className="flex items-center text-sm">
                        <Award className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="font-medium">GPA:</span>
                        <span>{selectedApplication.gpa.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Application Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 mb-2">Application Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <FileText className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-medium">Course:</span>
                      <span>{selectedApplication.course}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="font-medium">Submitted:</span>
                      <span>{selectedApplication.submissionDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">Priority:</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedApplication.priority)}`}>
                        {selectedApplication.priority}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">Status:</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedApplication.status)}`}>
                        {selectedApplication.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="md:col-span-2 mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-3 rounded-lg text-center ${
                    selectedApplication.documents.transcript ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  }`}>
                    <FileText className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-medium">Transcript</p>
                    <p className="text-xs">
                      {selectedApplication.documents.transcript ? "Uploaded" : "Not uploaded"}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg text-center ${
                    selectedApplication.documents.certificate ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  }`}>
                    <Award className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-medium">Certificate</p>
                    <p className="text-xs">
                      {selectedApplication.documents.certificate ? "Uploaded" : "Not uploaded"}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg text-center ${
                    selectedApplication.documents.id ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  }`}>
                    <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-medium">ID Card</p>
                    <p className="text-xs">
                      {selectedApplication.documents.id ? "Uploaded" : "Not uploaded"}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg text-center ${
                    selectedApplication.documents.recommendation ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  }`}>
                    <FileText className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-medium">Recommendation</p>
                    <p className="text-xs">
                      {selectedApplication.documents.recommendation ? "Uploaded" : "Not uploaded"}
                    </p>
                  </div>
                </div>
              </div>

              {selectedApplication.notes && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedApplication.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionsManagement;
