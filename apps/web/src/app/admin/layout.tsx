// app/admin/layout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  CreditCard,
  MessageSquare,
  Settings,
  BarChart3,
  FileText,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Search,
  UserCircle
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Students', href: '/admin/students', icon: <Users className="h-5 w-5" />, badge: 3 },
    { name: 'Courses', href: '/admin/courses', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Admissions', href: '/admin/admissions', icon: <GraduationCap className="h-5 w-5" />, badge: 12 },
    { name: 'Schedule', href: '/admin/schedule', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Payments', href: '/admin/payments', icon: <CreditCard className="h-5 w-5" /> },
    { name: 'Messages', href: '/admin/messages', icon: <MessageSquare className="h-5 w-5" />, badge: 5 },
    { name: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Reports', href: '/admin/reports', icon: <FileText className="h-5 w-5" /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-72 h-full bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FIBS Admin</h1>
                <p className="text-xs text-gray-500">College Management</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="px-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">AD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Administrator</p>
              </div>
              <button className="text-gray-400 hover:text-red-600">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students, courses, or documents..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <UserCircle className="h-8 w-8 text-gray-500" />
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link href="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile Settings
                    </Link>
                    <Link href="/admin/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Account
                    </Link>
                    <hr className="my-1" />
                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}