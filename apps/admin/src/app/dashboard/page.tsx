'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api';
import {
  Users,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Calendar,
  Activity,
  BarChart3,
  PieChart,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardPage() {
  const [stats, setStats] = useState<any>({
    totalStudents: 0,
    activeStudents: 0,
    totalCourses: 0,
    totalStaff: 0,
    feesCollectedToday: 0,
    monthlyRevenue: 0,
    attendancePercentage: 0,
  });
  const [enrollmentTrends, setEnrollmentTrends] = useState<any>([]);
  const [revenueTrends, setRevenueTrends] = useState<any>([]);
  const [branchComparison, setBranchComparison] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Mock data for now - will be connected to API
        setStats({
          totalStudents: 245,
          activeStudents: 198,
          totalCourses: 12,
          totalStaff: 28,
          feesCollectedToday: 45000,
          monthlyRevenue: 1250000,
          attendancePercentage: 87,
        });

        setEnrollmentTrends([
          { month: 'Jan', students: 180 },
          { month: 'Feb', students: 195 },
          { month: 'Mar', students: 210 },
          { month: 'Apr', students: 225 },
          { month: 'May', students: 245 },
          { month: 'Jun', students: 260 },
        ]);

        setRevenueTrends([
          { month: 'Jan', revenue: 800000 },
          { month: 'Feb', revenue: 950000 },
          { month: 'Mar', revenue: 1100000 },
          { month: 'Apr', revenue: 1050000 },
          { month: 'May', revenue: 1200000 },
          { month: 'Jun', revenue: 1250000 },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase',
    },
    {
      title: 'Active Students',
      value: stats?.activeStudents || 0,
      icon: GraduationCap,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'increase',
    },
    {
      title: 'Total Courses',
      value: stats?.totalCourses || 0,
      icon: BarChart3,
      color: 'bg-purple-500',
      change: '+2',
      changeType: 'neutral',
    },
    {
      title: 'Total Staff',
      value: stats?.totalStaff || 0,
      icon: Users,
      color: 'bg-orange-500',
      change: '+5%',
      changeType: 'increase',
    },
  ];

  const revenueCards = [
    {
      title: 'Fees Collected Today',
      value: `KES ${stats?.feesCollectedToday?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Monthly Revenue',
      value: `KES ${stats?.monthlyRevenue?.toLocaleString() || 0}`,
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      title: 'Attendance Rate',
      value: `${stats?.attendancePercentage || 0}%`,
      icon: Activity,
      color: 'bg-purple-500',
    },
  ];

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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to FIBS College Dashboard! Here's what's happening at your college today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {revenueCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${card.color} rounded-lg p-3`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Enrollment Trends</h3>
          {enrollmentTrends?.data && (
            <Line
              data={{
                labels: enrollmentTrends.data.map((t: any) => t.month),
                datasets: [
                  {
                    label: 'New Enrollments',
                    data: enrollmentTrends.data.map((t: any) => t.enrollments),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
        </div>

        {/* Revenue Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trends</h3>
          {revenueTrends?.data && (
            <Bar
              data={{
                labels: revenueTrends.data.map((t: any) => t.month),
                datasets: [
                  {
                    label: 'Revenue (KES)',
                    data: revenueTrends.data.map((t: any) => t.revenue),
                    backgroundColor: 'rgba(34, 197, 94, 0.8)',
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
        </div>
      </div>

      {/* Branch Comparison */}
      {branchComparison?.data && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Branch Comparison</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Bar
                data={{
                  labels: branchComparison.data.map((b: any) => b.name),
                  datasets: [
                    {
                      label: 'Students',
                      data: branchComparison.data.map((b: any) => b.students),
                      backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
            <div>
              <Bar
                data={{
                  labels: branchComparison.data.map((b: any) => b.name),
                  datasets: [
                    {
                      label: 'Revenue (KES)',
                      data: branchComparison.data.map((b: any) => b.revenue),
                      backgroundColor: 'rgba(34, 197, 94, 0.8)',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities?.data?.slice(0, 5).map((activity: any, index: number) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'payment' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {activity.type === 'payment' ? (
                      <DollarSign className="h-4 w-4 text-green-600" />
                    ) : (
                      <Users className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
