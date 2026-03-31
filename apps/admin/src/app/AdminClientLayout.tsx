"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  UserCheck,
  CreditCard,
  Newspaper,
  Award,
  Shield,
  Activity,
  BarChart3,
  Target,
  Clock,
  AlertCircle
} from "lucide-react";

interface AdminClientLayoutProps {
  children: React.ReactNode;
}

const AdminClientLayout: React.FC<AdminClientLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: Home,
      current: pathname === "/admin"
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: Users,
      current: pathname.startsWith("/admin/students")
    },
    {
      name: "Courses",
      href: "/admin/courses", 
      icon: BookOpen,
      current: pathname.startsWith("/admin/courses")
    },
    {
      name: "Admissions",
      href: "/admin/admissions",
      icon: GraduationCap,
      current: pathname.startsWith("/admin/admissions")
    },
    {
      name: "Finance",
      href: "/admin/finance",
      icon: DollarSign,
      current: pathname.startsWith("/admin/finance")
    },
    {
      name: "Applications",
      href: "/admin/applications",
      icon: FileText,
      current: pathname.startsWith("/admin/applications")
    },
    {
      name: "Content",
      href: "/admin/content",
      icon: Newspaper,
      current: pathname.startsWith("/admin/content")
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
      current: pathname.startsWith("/admin/reports")
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: pathname.startsWith("/admin/settings")
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <Image
              src="/images/fibs_Logo.png"
              alt="FIBS College"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg"
            />
            <span className="ml-3 text-xl font-bold text-gray-900">FIBS Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
                  ${item.current
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* User profile section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@fibs.ac.ke</p>
            </div>
          </div>
          <button className="mt-3 w-full flex items-center justify-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-150">
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <AlertCircle className="w-5 h-5" />
              </button>
              <div className="relative">
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminClientLayout;
