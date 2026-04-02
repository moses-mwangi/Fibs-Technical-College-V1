'use client';

import React, { useState, useEffect } from 'react';
import { apiClient, Staff, Branch } from '../../../lib/api';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserCheck,
  UserX,
  Building,
  X,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const staffSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  role: z.enum(['lecturer', 'admin', 'accountant', 'support', 'manager'], 'Role is required'),
  department: z.string().min(2, 'Department is required'),
  branchId: z.string().min(1, 'Branch is required'),
  salary: z.number().min(0, 'Salary must be a positive number').optional(),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  hireDate: z.string().min(1, 'Hire date is required'),
});

type StaffForm = z.infer<typeof staffSchema>;

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StaffForm>({
    resolver: zodResolver(staffSchema),
  });

  useEffect(() => {
    fetchStaff();
    fetchBranches();
  }, []);

  useEffect(() => {
    let filtered = staff;

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.staffId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBranch) {
      filtered = filtered.filter(member => member.branchId === selectedBranch);
    }

    if (selectedRole) {
      filtered = filtered.filter(member => member.role === selectedRole);
    }

    if (selectedDepartment) {
      filtered = filtered.filter(member => member.department === selectedDepartment);
    }

    setFilteredStaff(filtered);
  }, [staff, searchTerm, selectedBranch, selectedRole, selectedDepartment]);

  const fetchStaff = async (page = 1, branchId = '', role = '', department = '') => {
    try {
      const response = await apiClient.getStaff({
        page,
        limit: 10,
        branchId,
        role,
        department,
      });
      if (response.success && response.data) {
        if (page === 1) {
          setStaff(response.data.staff);
          setTotalPages(response.data.totalPages);
        } else {
          setStaff(prev => [...prev, ...response.data.staff]);
        }
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
      toast.error('Failed to fetch staff');
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

  const onSubmit = async (data: StaffForm) => {
    try {
      if (editingStaff) {
        const response = await apiClient.updateStaff(editingStaff.id, data);
        if (response.success) {
          toast.success('Staff member updated successfully');
          setStaff(prev => prev.map(member => 
            member.id === editingStaff.id ? { ...response.data } : member
          ));
          setShowModal(false);
          setEditingStaff(null);
          reset();
        }
      } else {
        const response = await apiClient.createStaff(data);
        if (response.success) {
          toast.success('Staff member created successfully');
          setStaff(prev => [response.data, ...prev]);
          setShowModal(false);
          reset();
        }
      }
    } catch (error: any) {
      console.error('Error saving staff:', error);
      toast.error(error.response?.data?.message || 'Failed to save staff');
    }
  };

  const handleEdit = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    reset({
      fullName: staffMember.fullName,
      email: staffMember.email,
      phoneNumber: staffMember.phoneNumber,
      role: staffMember.role,
      department: staffMember.department,
      branchId: staffMember.branchId,
      salary: staffMember.salary,
      address: staffMember.address,
      hireDate: staffMember.hireDate,
    });
    setShowModal(true);
  };

  const handleDelete = async (staffMember: Staff) => {
    try {
      const response = await apiClient.deleteStaff(staffMember.id);
      if (response.success) {
        toast.success('Staff member deleted successfully');
        setStaff(prev => prev.filter(s => s.id !== staffMember.id));
        setShowDeleteModal(false);
        setStaffToDelete(null);
      }
    } catch (error: any) {
      console.error('Error deleting staff:', error);
      toast.error(error.response?.data?.message || 'Failed to delete staff');
    }
  };

  const handleStatusChange = async (staffMember: Staff, isActive: boolean) => {
    try {
      const response = await apiClient.updateStaff(staffMember.id, { isActive });
      if (response.success) {
        toast.success(`Staff member ${isActive ? 'activated' : 'deactivated'} successfully`);
        setStaff(prev => prev.map(s => 
          s.id === staffMember.id ? { ...response.data } : s
        ));
      }
    } catch (error: any) {
      console.error('Error updating staff status:', error);
      toast.error(error.response?.data?.message || 'Failed to update staff status');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'lecturer': return 'text-blue-600 bg-blue-100';
      case 'admin': return 'text-purple-600 bg-purple-100';
      case 'accountant': return 'text-green-600 bg-green-100';
      case 'support': return 'text-orange-600 bg-orange-100';
      case 'manager': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
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
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage staff members and their information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Staff
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
                placeholder="Search staff..."
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
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Roles</option>
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin</option>
              <option value="accountant">Accountant</option>
              <option value="support">Support</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Departments</option>
              <option value="ICT">ICT</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Administration">Administration</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff ID
                </th>
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
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch
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
              {filteredStaff.map((staffMember) => (
                <tr key={staffMember.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {staffMember.staffId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {staffMember.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      {staffMember.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      {staffMember.phoneNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(staffMember.role)}`}>
                      {staffMember.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {staffMember.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 text-gray-400 mr-2" />
                      {staffMember.branch?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${staffMember.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                      {staffMember.isActive ? <UserCheck className="h-4 w-4 mr-1" /> : <UserX className="h-4 w-4 mr-1" />}
                      {staffMember.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(staffMember)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(staffMember, !staffMember.isActive)}
                        className="text-green-600 hover:text-green-800"
                      >
                        {staffMember.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => {
                          setStaffToDelete(staffMember);
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
                    {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingStaff(null);
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
                      <label className="block text-sm font-medium text-gray-700">Hire Date</label>
                      <input
                        {...register('hireDate')}
                        type="date"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.hireDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.hireDate.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Role</label>
                      <select
                        {...register('role')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select role</option>
                        <option value="lecturer">Lecturer</option>
                        <option value="admin">Admin</option>
                        <option value="accountant">Accountant</option>
                        <option value="support">Support</option>
                        <option value="manager">Manager</option>
                      </select>
                      {errors.role && (
                        <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <input
                        {...register('department')}
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter department"
                      />
                      {errors.department && (
                        <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
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
                      <label className="block text-sm font-medium text-gray-700">Salary (KES)</label>
                      <input
                        {...register('salary')}
                        type="number"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter salary"
                      />
                      {errors.salary && (
                        <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>
                      )}
                    </div>
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
                    {editingStaff ? 'Update' : 'Create'} Staff Member
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingStaff(null);
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
      {showDeleteModal && staffToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:max-w-md">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete Staff Member
                  </h3>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setStaffToDelete(null);
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
                  Are you sure you want to delete <span className="font-medium text-gray-900">{staffToDelete.fullName}</span>? This action cannot be undone.
                </p>
              </div>
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setStaffToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(staffToDelete)}
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
