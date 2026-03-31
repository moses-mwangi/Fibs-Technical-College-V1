'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  FileText, 
  Image, 
  LogOut, 
  Menu, 
  X, 
  Edit, 
  Trash2, 
  Plus, 
  Eye 
} from 'lucide-react';
import { courses, announcements, galleryImages } from '@/data/demoData';
import Button from '@/components/ui/Button';

interface AdminUser {
  id: number;
  username: string;
  email: string;
}

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // Demo admin user
  const adminUser: AdminUser = {
    id: 1,
    username: 'admin',
    email: 'admin@fibscollege.ac.ke'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo authentication - in production, this would be a proper API call
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use admin/admin123 for demo');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '' });
    setActiveTab('dashboard');
  };

  // Login Form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">FIBS College Management System</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">
                <strong>Demo Credentials:</strong><br />
                Username: admin<br />
                Password: admin123
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {adminUser.username}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-64 bg-white shadow-md min-h-screen`}>
          <nav className="mt-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-6 py-3 hover:bg-red-50 flex items-center gap-3 ${
                activeTab === 'dashboard' ? 'bg-red-50 text-red-600 border-r-2 border-red-600' : 'text-gray-700'
              }`}
            >
              <Users className="h-5 w-5" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full text-left px-6 py-3 hover:bg-red-50 flex items-center gap-3 ${
                activeTab === 'courses' ? 'bg-red-50 text-red-600 border-r-2 border-red-600' : 'text-gray-700'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              Courses
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full text-left px-6 py-3 hover:bg-red-50 flex items-center gap-3 ${
                activeTab === 'applications' ? 'bg-red-50 text-red-600 border-r-2 border-red-600' : 'text-gray-700'
              }`}
            >
              <FileText className="h-5 w-5" />
              Applications
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`w-full text-left px-6 py-3 hover:bg-red-50 flex items-center gap-3 ${
                activeTab === 'announcements' ? 'bg-red-50 text-red-600 border-r-2 border-red-600' : 'text-gray-700'
              }`}
            >
              <FileText className="h-5 w-5" />
              Announcements
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full text-left px-6 py-3 hover:bg-red-50 flex items-center gap-3 ${
                activeTab === 'gallery' ? 'bg-red-50 text-red-600 border-r-2 border-red-600' : 'text-gray-700'
              }`}
            >
              <Image className="h-5 w-5" />
              Gallery
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Courses</p>
                      <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Applications</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Announcements</p>
                      <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <Image className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Gallery Images</p>
                      <p className="text-2xl font-bold text-gray-900">{galleryImages.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Courses</h2>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Course
                </Button>
              </div>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {course.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">Student Applications</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'John Doe', email: 'john@example.com', course: 'Web Development', status: 'pending' },
                      { name: 'Jane Smith', email: 'jane@example.com', course: 'Professional Driving', status: 'approved' },
                      { name: 'Mike Johnson', email: 'mike@example.com', course: 'Business Management', status: 'pending' }
                    ].map((app, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {app.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.course}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            app.status === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Announcements</h2>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Announcement
                </Button>
              </div>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
                        <p className="text-gray-600 mb-2">{announcement.content}</p>
                        <p className="text-sm text-gray-500">
                          {announcement.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Gallery</h2>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Image
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image) => (
                  <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="h-48 bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600">{image.title}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{image.title}</h3>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
