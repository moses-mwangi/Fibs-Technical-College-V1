'use client';

import React, { useState, useEffect } from 'react';
import { apiClient, Payment, Student, Branch } from '../../../lib/api';
import {
  DollarSign,
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  Calendar,
  Receipt,
  X,
  RefreshCw,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const paymentSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  paymentMethod: z.enum(['cash', 'mpesa', 'bank', 'cheque'], 'Payment method is required'),
  paymentDate: z.string().min(1, 'Payment date is required'),
  description: z.string().min(1, 'Description is required'),
  transactionId: z.string().optional(),
});

type PaymentForm = z.infer<typeof paymentSchema>;

export default function FeesPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
  });

  useEffect(() => {
    fetchPayments();
    fetchStudents();
    fetchBranches();
  }, []);

  useEffect(() => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.student?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.student?.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBranch) {
      filtered = filtered.filter(payment => payment.branchId === selectedBranch);
    }

    if (selectedStatus) {
      filtered = filtered.filter(payment => payment.status === selectedStatus);
    }

    if (selectedMethod) {
      filtered = filtered.filter(payment => payment.paymentMethod === selectedMethod);
    }

    if (startDate) {
      filtered = filtered.filter(payment => payment.paymentDate >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter(payment => payment.paymentDate <= endDate);
    }

    setFilteredPayments(filtered);
  }, [payments, searchTerm, selectedBranch, selectedStatus, selectedMethod, startDate, endDate]);

  const fetchPayments = async (page = 1, branchId = '', status = '', method = '') => {
    try {
      const response = await apiClient.getPayments({
        page,
        limit: 10,
        branchId,
        status,
        paymentMethod: method,
        startDate,
        endDate,
      });
      if (response.success && response.data) {
        if (page === 1) {
          setPayments(response.data.payments);
          setTotalPages(response.data.totalPages);
        } else {
          setPayments(prev => [...prev, ...response.data.payments]);
        }
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await apiClient.getStudents({ status: 'active' });
      if (response.success && response.data) {
        setStudents(response.data.students);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
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

  const onSubmit = async (data: PaymentForm) => {
    try {
      const response = await apiClient.createPayment(data);
      if (response.success) {
        toast.success('Payment recorded successfully');
        setPayments(prev => [response.data, ...prev]);
        setShowModal(false);
        reset();
      }
    } catch (error: any) {
      console.error('Error recording payment:', error);
      toast.error(error.response?.data?.message || 'Failed to record payment');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'cash': return 'text-green-600 bg-green-100';
      case 'mpesa': return 'text-blue-600 bg-blue-100';
      case 'bank': return 'text-purple-600 bg-purple-100';
      case 'cheque': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStats = () => {
    const total = filteredPayments.length;
    const completed = filteredPayments.filter(p => p.status === 'completed').length;
    const pending = filteredPayments.filter(p => p.status === 'pending').length;
    const failed = filteredPayments.filter(p => p.status === 'failed').length;
    const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);

    return { total, completed, pending, failed, totalAmount };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = getPaymentStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fees Management</h1>
          <p className="text-gray-600">Record and manage student fee payments</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Record Payment
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">KES {stats.totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
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
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Methods</option>
              <option value="cash">Cash</option>
              <option value="mpesa">M-Pesa</option>
              <option value="bank">Bank Transfer</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.transactionId || `PAY-${payment.id}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.student?.fullName}</div>
                      <div className="text-sm text-gray-500">{payment.student?.studentId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                      KES {payment.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(payment.paymentMethod)}`}>
                      {payment.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {branches.find(b => b.id === payment.branchId)?.name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowReceiptModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
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

      {/* Record Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Record Payment
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false);
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
                      <label className="block text-sm font-medium text-gray-700">Student</label>
                      <select
                        {...register('studentId')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select student</option>
                        {students.map(student => (
                          <option key={student.id} value={student.id}>
                            {student.fullName} ({student.studentId})
                          </option>
                        ))}
                      </select>
                      {errors.studentId && (
                        <p className="mt-1 text-sm text-red-600">{errors.studentId.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount (KES)</label>
                      <input
                        {...register('amount', { valueAsNumber: true })}
                        type="number"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter amount"
                      />
                      {errors.amount && (
                        <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                      <select
                        {...register('paymentMethod')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select method</option>
                        <option value="cash">Cash</option>
                        <option value="mpesa">M-Pesa</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="cheque">Cheque</option>
                      </select>
                      {errors.paymentMethod && (
                        <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Payment Date</label>
                      <input
                        {...register('paymentDate')}
                        type="date"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.paymentDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.paymentDate.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                    <input
                      {...register('transactionId')}
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter transaction ID (optional)"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      {...register('description')}
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter payment description"
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
                    Record Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
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

      {/* Payment Receipt Modal */}
      {showReceiptModal && selectedPayment && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Payment Receipt
                  </h3>
                  <button
                    onClick={() => {
                      setShowReceiptModal(false);
                      setSelectedPayment(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Transaction ID</p>
                        <p className="text-lg font-medium">{selectedPayment.transactionId || `PAY-${selectedPayment.id}`}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment Date</p>
                        <p className="text-lg font-medium">{new Date(selectedPayment.paymentDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Student Name</p>
                        <p className="text-lg font-medium">{selectedPayment.student?.fullName}</p>
                        <p className="text-sm text-gray-500">{selectedPayment.student?.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Amount Paid</p>
                        <p className="text-2xl font-bold text-green-600">KES {selectedPayment.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMethodColor(selectedPayment.paymentMethod)}`}>
                          {selectedPayment.paymentMethod.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPayment.status)}`}>
                          {selectedPayment.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="text-gray-900">{selectedPayment.description}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowReceiptModal(false);
                      setSelectedPayment(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Close
                  </button>
                  <button
                    className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
