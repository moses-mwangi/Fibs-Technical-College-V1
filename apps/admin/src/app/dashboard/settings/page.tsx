'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../../lib/api';
import {
  Settings,
  User,
  Building,
  BookOpen,
  DollarSign,
  Bell,
  Shield,
  Database,
  Save,
  RefreshCw,
  X,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const userSettingsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const systemSettingsSchema = z.object({
  institutionName: z.string().min(1, 'Institution name is required'),
  institutionEmail: z.string().email('Invalid email address'),
  institutionPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  institutionAddress: z.string().min(1, 'Address is required'),
  academicYear: z.string().min(1, 'Academic year is required'),
  semester: z.string().min(1, 'Semester is required'),
  currency: z.string().min(1, 'Currency is required'),
  timezone: z.string().min(1, 'Timezone is required'),
});

type UserSettingsForm = z.infer<typeof userSettingsSchema>;
type SystemSettingsForm = z.infer<typeof systemSettingsSchema>;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  // User settings form
  const {
    register: registerUser,
    handleSubmit: handleUserSubmit,
    reset: resetUser,
    formState: { errors: userErrors },
  } = useForm<UserSettingsForm>({
    resolver: zodResolver(userSettingsSchema),
  });

  // System settings form
  const {
    register: registerSystem,
    handleSubmit: handleSystemSubmit,
    reset: resetSystem,
    formState: { errors: systemErrors },
  } = useForm<SystemSettingsForm>({
    resolver: zodResolver(systemSettingsSchema),
  });

  useEffect(() => {
    if (user) {
      resetUser({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
      });
    }
    
    // Load system settings
    loadSystemSettings();
  }, [user]);

  const loadSystemSettings = () => {
    // Mock system settings - will be loaded from API
    resetSystem({
      institutionName: 'FIBS College & Driving',
      institutionEmail: 'info@fibscollege.com',
      institutionPhone: '+254 700 000 000',
      institutionAddress: 'Nairobi, Kenya',
      academicYear: '2024-2025',
      semester: 'Semester 1',
      currency: 'KES',
      timezone: 'Africa/Nairobi',
    });
  };

  const onUserSettingsSubmit = async (data: UserSettingsForm) => {
    setLoading(true);
    try {
      // Update user profile
      if (data.newPassword && data.currentPassword) {
        await changePassword(data.currentPassword, data.newPassword);
        toast.success('Password changed successfully');
      }
      
      // Update user profile (mock for now)
      toast.success('Profile updated successfully');
      
      // Clear password fields
      resetUser({
        ...data,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      console.error('Error updating user settings:', error);
      toast.error(error.response?.data?.message || 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const onSystemSettingsSubmit = async (data: SystemSettingsForm) => {
    setLoading(true);
    try {
      // Save system settings (mock for now)
      toast.success('System settings saved successfully');
    } catch (error: any) {
      console.error('Error saving system settings:', error);
      toast.error(error.response?.data?.message || 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: User },
    { id: 'system', name: 'System Settings', icon: Settings },
    { id: 'branches', name: 'Branches', icon: Building },
    { id: 'courses', name: 'Courses', icon: BookOpen },
    { id: 'fees', name: 'Fees', icon: DollarSign },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'backup', name: 'Backup & Restore', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and system settings</p>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon
                  className={`-ml-0.5 mr-2 h-5 w-5 ${
                    activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <form onSubmit={handleUserSubmit(onUserSettingsSubmit)} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      {...registerUser('firstName')}
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {userErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{userErrors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      {...registerUser('lastName')}
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {userErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{userErrors.lastName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      {...registerUser('email')}
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {userErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{userErrors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      {...registerUser('phoneNumber')}
                      type="tel"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {userErrors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">{userErrors.phoneNumber.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                      {...registerUser('currentPassword')}
                      type="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                      {...registerUser('newPassword')}
                      type="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                      {...registerUser('confirmPassword')}
                      type="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {userErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{userErrors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <form onSubmit={handleSystemSubmit(onSystemSettingsSubmit)} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Institution Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution Name</label>
                    <input
                      {...registerSystem('institutionName')}
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {systemErrors.institutionName && (
                      <p className="mt-1 text-sm text-red-600">{systemErrors.institutionName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution Email</label>
                    <input
                      {...registerSystem('institutionEmail')}
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {systemErrors.institutionEmail && (
                      <p className="mt-1 text-sm text-red-600">{systemErrors.institutionEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution Phone</label>
                    <input
                      {...registerSystem('institutionPhone')}
                      type="tel"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {systemErrors.institutionPhone && (
                      <p className="mt-1 text-sm text-red-600">{systemErrors.institutionPhone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      {...registerSystem('institutionAddress')}
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {systemErrors.institutionAddress && (
                      <p className="mt-1 text-sm text-red-600">{systemErrors.institutionAddress.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Academic Year</label>
                    <input
                      {...registerSystem('academicYear')}
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {systemErrors.academicYear && (
                      <p className="mt-1 text-sm text-red-600">{systemErrors.academicYear.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Semester</label>
                    <input
                      {...registerSystem('semester')}
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {systemErrors.semester && (
                      <p className="mt-1 text-sm text-red-600">{systemErrors.semester.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Currency</label>
                    <select
                      {...registerSystem('currency')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="KES">Kenyan Shilling (KES)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                    </select>
                    {systemErrors.currency && (
                      <p className="mt-1 text-sm text-red-600">{systemErrors.currency.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Settings
                </button>
              </div>
            </form>
          )}

          {/* Other tabs - placeholder content */}
          {activeTab !== 'profile' && activeTab !== 'system' && (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                {(() => {
                  const tab = tabs.find(t => t.id === activeTab);
                  return tab ? <tab.icon className="h-6 w-6 text-gray-400" /> : null;
                })()}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h3>
              <p className="text-gray-500">
                This section is under development. More features coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
