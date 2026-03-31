'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  FileText,
  TrendingUp,
  Calendar,
  AlertCircle,
  Award,
  Activity,
  BarChart3,
  Target,
  Clock,
  UserCheck,
  CreditCard,
  Home
} from 'lucide-react';

const AdminPage = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    pendingApplications: 0,
    monthlyRevenue: 0,
    recentEnrollments: [],
    upcomingEvents: [],
    systemAlerts: []
  });

  useEffect(() => {
    // Simulate fetching dashboard data
    setStats({
      totalStudents: 1247,
      activeCourses: 28,
      pendingApplications: 43,
      monthlyRevenue: 284750,
      recentEnrollments: [
        { id: 1, name: 'John Kamau', course: 'Web Development', date: '2024-03-30' },
        { id: 2, name: 'Sarah Wanjiku', course: 'Driving Class B', date: '2024-03-30' },
        { id: 3, name: 'Michael Ochieng', course: 'Mechanical Engineering', date: '2024-03-29' }
      ],
      upcomingEvents: [
        { id: 1, title: 'Board Meeting', date: '2024-04-02', time: '10:00 AM' },
        { id: 2, title: 'Student Orientation', date: '2024-04-05', time: '9:00 AM' },
        { id: 3, title: 'Faculty Training', date: '2024-04-08', time: '2:00 PM' }
      ],
      systemAlerts: [
        { id: 1, type: 'warning', message: 'Server storage at 85% capacity' },
        { id: 2, type: 'info', message: 'New software update available' },
        { id: 3, type: 'success', message: 'Monthly backup completed successfully' }
      ]
    });
  }, []);

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Courses',
      value: stats.activeCourses,
      change: '+3',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Applications',
      value: stats.pendingApplications,
      change: '-8',
      icon: FileText,
      color: 'bg-yellow-500'
    },
    {
      title: 'Monthly Revenue',
      value: `KES ${stats.monthlyRevenue.toLocaleString()}`,
      change: '+18.2%',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at FIBS College today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-2 ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enrollments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Enrollments</h2>
            <UserCheck className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {stats.recentEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{enrollment.name}</p>
                  <p className="text-sm text-gray-600">{enrollment.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{enrollment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">System Alerts</h2>
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {stats.systemAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                alert.type === 'error' ? 'bg-red-50 border border-red-200' :
                alert.type === 'success' ? 'bg-green-50 border border-green-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <p className={`text-sm ${
                  alert.type === 'warning' ? 'text-yellow-800' :
                  alert.type === 'error' ? 'text-red-800' :
                  alert.type === 'success' ? 'text-green-800' :
                  'text-blue-800'
                }`}>
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.upcomingEvents.map((event) => (
            <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{event.date}</p>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPage;
