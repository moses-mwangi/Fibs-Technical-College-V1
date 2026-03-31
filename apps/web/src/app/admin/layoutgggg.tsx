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
  Shield
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
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
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: pathname.startsWith("/admin/settings")
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Image
                src="/images/fibs_Logo.png"
                alt="FIBS"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold text-gray-900">FIBS Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${item.current
                  ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@fibs.ac.ke</p>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Link
              href="/"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome back, Admin
              </span>
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
