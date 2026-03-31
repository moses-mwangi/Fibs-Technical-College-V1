"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Calendar,
  Users,
  CreditCard,
  FileText,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Target,
  Award,
  Receipt
} from "lucide-react";

interface Transaction {
  id: string;
  type: "tuition" | "registration" | "library" | "equipment" | "salary" | "other";
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  studentId?: string;
  studentName?: string;
  method: "cash" | "mpesa" | "bank" | "card" | "cheque";
  category: "income" | "expense";
}

interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  pendingPayments: number;
  collectedFees: number;
  monthlyGrowth: number;
}

const FinanceManagement: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const types = [
    { value: "all", label: "All Types" },
    { value: "tuition", label: "Tuition Fees" },
    { value: "registration", label: "Registration Fees" },
    { value: "library", label: "Library Fees" },
    { value: "equipment", label: "Equipment" },
    { value: "salary", label: "Salaries" },
    { value: "other", label: "Other" }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "income", label: "Income" },
    { value: "expense", label: "Expenses" }
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" }
  ];

  // Demo data
  useEffect(() => {
    const timer = setTimeout(() => {
      const demoTransactions: Transaction[] = [
        {
          id: "1",
          type: "tuition",
          description: "Computer Science - Semester 2",
          amount: 75000,
          date: "2024-03-15",
          status: "completed",
          studentId: "001",
          studentName: "John Kamau",
          method: "mpesa",
          category: "income"
        },
        {
          id: "2",
          type: "tuition",
          description: "Business Administration - Semester 2",
          amount: 60000,
          date: "2024-03-14",
          status: "pending",
          studentId: "002",
          studentName: "Mary Wanjiku",
          method: "bank",
          category: "income"
        },
        {
          id: "3",
          type: "registration",
          description: "Student Registration Fee",
          amount: 2500,
          date: "2024-03-10",
          status: "completed",
          studentId: "003",
          studentName: "James Muriithi",
          method: "cash",
          category: "income"
        },
        {
          id: "4",
          type: "equipment",
          description: "Computers for IT Lab",
          amount: 150000,
          date: "2024-03-05",
          status: "completed",
          method: "card",
          category: "expense"
        },
        {
          id: "5",
          type: "salary",
          description: "Faculty Salaries - March 2024",
          amount: 450000,
          date: "2024-03-01",
          status: "completed",
          method: "bank",
          category: "expense"
        },
        {
          id: "6",
          type: "library",
          description: "Library Books and Resources",
          amount: 25000,
          date: "2024-03-08",
          status: "completed",
          method: "card",
          category: "expense"
        },
        {
          id: "7",
          type: "tuition",
          description: "Professional Driving Course",
          amount: 45000,
          date: "2024-03-12",
          status: "failed",
          studentId: "004",
          studentName: "Peter Njoroge",
          method: "mpesa",
          category: "income"
        }
      ];

      const totalRevenue = demoTransactions
        .filter(t => t.category === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = demoTransactions
        .filter(t => t.category === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      const pendingPayments = demoTransactions
        .filter(t => t.type === "tuition" && t.status === "pending")
        .reduce((sum, t) => sum + t.amount, 0);

      const collectedFees = demoTransactions
        .filter(t => t.type === "tuition" && t.status === "completed")
        .reduce((sum, t) => sum + t.amount, 0);

      setTransactions(demoTransactions);
      setFilteredTransactions(demoTransactions);
      setSummary({
        totalRevenue,
        totalExpenses,
        netIncome: totalRevenue - totalExpenses,
        pendingPayments,
        collectedFees,
        monthlyGrowth: 12.5
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter transactions
  useEffect(() => {
    let filtered = transactions;

    if (selectedType !== "all") {
      filtered = filtered.filter(t => t.type === selectedType);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(t => t.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.studentName && t.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, selectedType, selectedCategory, selectedStatus, searchTerm]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "tuition": return "bg-blue-100 text-blue-800";
      case "registration": return "bg-green-100 text-green-800";
      case "library": return "bg-purple-100 text-purple-800";
      case "equipment": return "bg-orange-100 text-orange-800";
      case "salary": return "bg-red-100 text-red-800";
      case "other": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "cash": return "💵";
      case "mpesa": return "📱";
      case "bank": return "🏦";
      case "card": return "💳";
      case "cheque": return "📄";
      default: return "💰";
    }
  };

  const transactionsPerPage = 10;
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
            <p className="text-gray-600">Track revenue, expenses, and payments</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">KES {summary.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">KES {summary.totalExpenses.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Expenses</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">KES {summary.netIncome.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Net Income</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">KES {summary.pendingPayments.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Pending Payments</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">KES {summary.collectedFees.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Collected Fees</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">+{summary.monthlyGrowth}%</p>
                <p className="text-sm text-gray-600">Monthly Growth</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
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

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading transactions...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(transaction.type)}`}>
                            {transaction.type}
                          </span>
                          <span className="ml-2 text-sm text-gray-900">{transaction.description}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-medium ${
                          transaction.category === "income" ? "text-green-600" : "text-red-600"
                        }`}>
                          KES {transaction.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(transaction.type)}`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-lg">{getMethodIcon(transaction.method)}</span>
                        <span className="ml-2 text-xs text-gray-600">{transaction.method}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.studentName || "-"}
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
                  Showing {((currentPage - 1) * transactionsPerPage) + 1} to{" "}
                  {Math.min(currentPage * transactionsPerPage, filteredTransactions.length)} of{" "}
                  {filteredTransactions.length} transactions
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

export default FinanceManagement;
