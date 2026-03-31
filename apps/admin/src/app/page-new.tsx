'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Login</h1>
          <p className="text-gray-600 mb-8">Please log in to access the admin dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
