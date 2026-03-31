// app/admin/page.tsx (Dashboard)
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  GraduationCap,
  CreditCard,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Calendar,
  MessageSquare,
  DollarSign,
  UserPlus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  type: 'success' | 'warning' | 'info';
}

export default function AdminDashboard() {
  const stats: StatCard[] = [
    {
      title: 'Total Students',
      value: '1,234',
      change: 12,
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Courses',
      value: '24',
      change: 8,
      icon: <BookOpen className="h-6 w-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'New Applications',
      value: '156',
      change: 23,
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Revenue This Month',
      value: 'KES 2.4M',
      change: 18,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const recentActivities: Activity[] = [
    { id: 1, user: 'John Mwangi', action: 'Applied for Computer Science', time: '5 minutes ago', type: 'success' },
    { id: 2, user: 'Sarah Wanjiku', action: 'Completed payment for Driving Course', time: '1 hour ago', type: 'success' },
    { id: 3, user: 'Peter Otieno', action: 'Submitted admission documents', time: '2 hours ago', type: 'info' },
    { id: 4, user: 'Mary Kamau', action: 'Requested fee structure', time: '3 hours ago', type: 'warning' },
    { id: 5, user: 'James Kariuki', action: 'Enrolled in Web Development', time: '5 hours ago', type: 'success' },
  ];

  const upcomingEvents = [
    { title: 'New Student Orientation', date: 'April 15, 2024', time: '9:00 AM', attendees: 45 },
    { title: 'Faculty Meeting', date: 'April 16, 2024', time: '2:00 PM', attendees: 28 },
    { title: 'Exam Registration Deadline', date: 'April 20, 2024', time: '11:59 PM', attendees: 312 },
    { title: 'Graduation Ceremony', date: 'May 10, 2024', time: '10:00 AM', attendees: 156 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
          <p className="text-red-100">Here's what's happening with your college today.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-sm">Today's Visitors</p>
              <p className="text-2xl font-bold">342</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-sm">Pending Applications</p>
              <p className="text-2xl font-bold">28</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-sm">Unread Messages</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-sm">System Status</p>
              <p className="text-2xl font-bold text-green-300">Active</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <span className={`flex items-center gap-1 text-sm font-medium ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {Math.abs(stat.change)}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts and Activities Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Activities</h2>
            <Link href="/admin/activities" className="text-red-600 text-sm hover:text-red-700">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'success' ? 'bg-green-100' :
                  activity.type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : activity.type === 'warning' ? (
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                  ) : (
                    <UserPlus className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Events</h2>
            <Link href="/admin/events" className="text-red-600 text-sm hover:text-red-700">
              Manage Events
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.date} • {event.time}</p>
                  <p className="text-xs text-gray-400 mt-1">{event.attendees} attendees</p>
                </div>
                <Link href="#" className="text-red-600 text-xs hover:text-red-700">
                  Details
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/students/add"
            className="group flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-200 transition-colors">
              <UserPlus className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add Student</span>
          </Link>
          
          <Link
            href="/admin/admissions"
            className="group flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Process Applications</span>
          </Link>
          
          <Link
            href="/admin/payments"
            className="group flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Record Payment</span>
          </Link>
          
          <Link
            href="/admin/schedule"
            className="group flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Create Schedule</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}