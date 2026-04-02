"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDashboardStats,
  branches,
  payments,
  students,
} from "@/lib/mockData";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Calendar,
  UserCheck,
} from "lucide-react";

interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalCourses: number;
  monthlyRevenue: number;
  totalStaff: number;
  feesCollectedToday: number;
  attendancePercentage: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export default function DashboardPage() {
  const router = useRouter();
  const [selectedBranch, setSelectedBranch] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // router.push("/login");
      return;
    }
  }, [router]);

  const stats = getDashboardStats(selectedBranch || undefined);

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Chart data
  const enrollmentTrends = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Student Enrollments",
        data: [45, 52, 48, 60, 55, 70, 65, 80, 75, 85, 90, 95],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const monthlyRevenue = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue (KES)",
        data: [
          250000, 280000, 310000, 340000, 360000, 390000, 420000, 450000,
          480000, 510000, 540000, 570000,
        ],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const branchComparison = {
    labels: branches.map((b) => b.name),
    datasets: [
      {
        label: "Number of Students",
        data: branches.map(
          (b) => students.filter((s) => s.branchId === b.id).length,
        ),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Branches</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={Users}
            color="bg-blue-500"
            trend="+12%"
          />
          <StatCard
            title="Active Students"
            value={stats.activeStudents}
            icon={UserCheck}
            color="bg-green-500"
            trend="+8%"
          />
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={BookOpen}
            color="bg-purple-500"
            trend="+2"
          />
          <StatCard
            title="Monthly Revenue"
            value={`KES ${stats.monthlyRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="bg-yellow-500"
            trend="+15%"
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Staff"
            value={stats.totalStaff}
            icon={Users}
            color="bg-indigo-500"
            trend="+3"
          />
          <StatCard
            title="Fees Collected Today"
            value={`KES ${stats.feesCollectedToday.toLocaleString()}`}
            icon={TrendingUp}
            color="bg-pink-500"
          />
          <StatCard
            title="Attendance Percentage"
            value={`${stats.attendancePercentage}%`}
            icon={Calendar}
            color="bg-orange-500"
            trend="+5%"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Student Enrollment Trends
            </h3>
            <Line data={enrollmentTrends} options={{ responsive: true }} />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Revenue Trends
            </h3>
            <Line data={monthlyRevenue} options={{ responsive: true }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Branch Comparison
            </h3>
            <Bar data={branchComparison} options={{ responsive: true }} />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Payments
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Receipt No
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Student
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payments.slice(0, 5).map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {payment.receiptNo}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {payment.student.fullName}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        KES {payment.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {payment.paymentDate.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-2">
              {trend} from last month
            </p>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}
