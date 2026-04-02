'use client';

import React from 'react';
import { 
  BarChart3, 
  Users, 
  GraduationCap, 
  DollarSign, 
  Calendar,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Students', href: '/dashboard/students', icon: Users },
  { name: 'Courses', href: '/dashboard/courses', icon: GraduationCap },
  { name: 'Fees', href: '/dashboard/fees', icon: DollarSign },
  { name: 'Attendance', href: '/dashboard/attendance', icon: Calendar },
  { name: 'Applications', href: '/dashboard/applications', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Simple redirect without authentication
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          {/* <SidebarContent pathname={pathname} onLogout={handleLogout} user={user} /> */}
          <SidebarContent pathname={pathname} onLogout={handleLogout}  />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        {/* <SidebarContent pathname={pathname} onLogout={handleLogout} user={user} /> */}
        <SidebarContent pathname={pathname} onLogout={handleLogout} />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex h-16 bg-white shadow-sm lg:hidden">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900 py-3">FIBS College</h1>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ pathname, onLogout }: any) {
  return (
    <>
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
        <div className="flex items-center flex-shrink-0 px-4">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">FIBS</span>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs font-medium text-gray-500">System Administrator</p>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={onLogout}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
