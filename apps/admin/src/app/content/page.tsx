"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Calendar,
  Eye,
  Image,
  Newspaper,
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

interface Content {
  id: string;
  title: string;
  type: "news" | "blog" | "announcement" | "event";
  content: string;
  excerpt: string;
  author: string;
  status: "draft" | "published" | "archived";
  publishedDate?: string;
  views: number;
  category: string;
  tags: string[];
  featured: boolean;
}

const ContentManagement: React.FC = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [filteredContent, setFilteredContent] = useState<Content[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const types = [
    { value: "all", label: "All Content" },
    { value: "news", label: "News" },
    { value: "blog", label: "Blog Posts" },
    { value: "announcement", label: "Announcements" },
    { value: "event", label: "Events" }
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "academic", label: "Academic" },
    { value: "admissions", label: "Admissions" },
    { value: "events", label: "Events" },
    { value: "students", label: "Student Life" },
    { value: "general", label: "General" }
  ];

  // Demo data
  useEffect(() => {
    const timer = setTimeout(() => {
      const demoContent: Content[] = [
        {
          id: "1",
          title: "FIBS College Launches New Computer Science Program",
          type: "news",
          content: "FIBS College is excited to announce the launch of our new Bachelor of Science in Computer Science program. This comprehensive program will equip students with the latest skills in software development, artificial intelligence, and cybersecurity...",
          excerpt: "New Computer Science program with focus on modern technologies and industry partnerships...",
          author: "Admin",
          status: "published",
          publishedDate: "2024-03-15",
          views: 1250,
          category: "academic",
          tags: ["computer-science", "new-program", "technology"],
          featured: true
        },
        {
          id: "2",
          title: "Tips for Successful Online Learning",
          type: "blog",
          content: "With the rise of online education, it's important to develop effective study habits. In this blog post, we share proven strategies for online learning success...",
          excerpt: "Discover proven strategies for effective online learning and academic success...",
          author: "Dr. Mary Johnson",
          status: "published",
          publishedDate: "2024-03-12",
          views: 890,
          category: "students",
          tags: ["online-learning", "study-tips", "success"],
          featured: false
        },
        {
          id: "3",
          title: "Student Registration Deadline Extension",
          type: "announcement",
          content: "Due to overwhelming demand, the student registration deadline for the May 2024 intake has been extended by two weeks. New students can now apply until May 31st, 2024...",
          excerpt: "Registration deadline extended to May 31st for May 2024 intake...",
          author: "Admissions Office",
          status: "published",
          publishedDate: "2024-03-10",
          views: 2100,
          category: "admissions",
          tags: ["deadline", "registration", "extension"],
          featured: true
        },
        {
          id: "4",
          title: "Annual Cultural Festival 2024",
          type: "event",
          content: "Join us for our biggest cultural event of the year! The Annual Cultural Festival will showcase student talents, cultural diversity, and community spirit...",
          excerpt: "Annual celebration of culture, talent, and community at FIBS College...",
          author: "Student Affairs",
          status: "published",
          publishedDate: "2024-03-08",
          views: 1800,
          category: "events",
          tags: ["cultural-festival", "events", "student-activities"],
          featured: true
        },
        {
          id: "5",
          title: "New Library Resources Available",
          type: "news",
          content: "Our library has been updated with new digital resources including e-books, research databases, and online journals. Students can now access these resources 24/7...",
          excerpt: "Library now offers extensive digital resources for student research...",
          author: "Library Staff",
          status: "draft",
          publishedDate: "2024-03-14",
          views: 0,
          category: "academic",
          tags: ["library", "resources", "digital"],
          featured: false
        }
      ];

      setContent(demoContent);
      setFilteredContent(demoContent);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter content
  useEffect(() => {
    let filtered = content;

    if (selectedType !== "all") {
      filtered = filtered.filter(c => c.type === selectedType);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(c => c.status === selectedStatus);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredContent(filtered);
  }, [content, selectedType, selectedStatus, selectedCategory, searchTerm]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "news": return "bg-blue-100 text-blue-800";
      case "blog": return "bg-green-100 text-green-800";
      case "announcement": return "bg-yellow-100 text-yellow-800";
      case "event": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-gray-100 text-gray-800";
      case "archived": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const contentPerPage = 10;
  const totalPages = Math.ceil(filteredContent.length / contentPerPage);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * contentPerPage,
    currentPage * contentPerPage
  );

  const handleEditContent = (contentItem: Content) => {
    setSelectedContent(contentItem);
    setShowEditModal(true);
  };

  const handleDeleteContent = (contentId: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      setContent(content.filter(c => c.id !== contentId));
    }
  };

  const handlePublishContent = (contentId: string) => {
    setContent(content.map(c => 
      c.id === contentId ? { ...c, status: "published" } : c
    ));
  };

  const handleArchiveContent = (contentId: string) => {
    setContent(content.map(c => 
      c.id === contentId ? { ...c, status: "archived" } : c
    ));
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            <p className="text-gray-600">Manage news, blogs, announcements, and events</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{content.length}</p>
              <p className="text-sm text-gray-600">Total Content</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {content.filter(c => c.status === "published").length}
              </p>
              <p className="text-sm text-gray-600">Published</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {content.filter(c => c.status === "draft").length}
              </p>
              <p className="text-sm text-gray-600">Drafts</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {content.reduce((sum, c) => sum + c.views, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Views</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading content...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedContent.map((contentItem) => (
                    <tr key={contentItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-start space-x-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(contentItem.type)}`}>
                            {contentItem.type}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">{contentItem.title}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {contentItem.excerpt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contentItem.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contentItem.status)}`}>
                          {contentItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contentItem.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {contentItem.featured ? (
                          <span className="text-yellow-500">⭐</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditContent(contentItem)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Content"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditContent(contentItem)}
                            className="text-green-600 hover:text-green-900"
                            title="View Content"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {contentItem.status === "draft" && (
                            <button
                              onClick={() => handlePublishContent(contentItem.id)}
                              className="text-purple-600 hover:text-purple-900"
                              title="Publish Content"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          {contentItem.status === "published" && (
                            <button
                              onClick={() => handleArchiveContent(contentItem.id)}
                              className="text-orange-600 hover:text-orange-900"
                              title="Archive Content"
                            >
                              <AlertCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteContent(contentItem.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Content"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-700">
                <span>
                  Showing {((currentPage - 1) * contentPerPage) + 1} to{" "}
                  {Math.min(currentPage * contentPerPage, filteredContent.length)} of{" "}
                  {filteredContent.length} items
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
