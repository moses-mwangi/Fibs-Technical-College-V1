// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function HomePage() {
//   const router = useRouter();

//   useEffect(() => {
//     // Redirect directly to dashboard without authentication
//     router.push('/dashboard');
//   }, [router]);

//   // Show loading state while redirecting
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="text-center">
//         <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
//           <div className="h-10 w-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//         </div>
//         <p className="text-gray-600">Loading...kkk</p>
//       </div>
//     </div>
//   );
// }
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [animationStage, setAnimationStage] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animation sequence
    const stage1 = setTimeout(() => setAnimationStage(1), 500);  // Logo appears
    const stage2 = setTimeout(() => setAnimationStage(2), 1500); // Text appears
    const stage3 = setTimeout(() => setShowContent(true), 2500); // Content appears
    const redirect = setTimeout(() => {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }, 3800);

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo Container with Animation */}
        <div className={`transform transition-all duration-1000 ${
          animationStage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="relative">
            {/* Outer ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-75 animate-pulse"></div>
            
            {/* Logo Circle */}
            <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-full p-8 shadow-2xl">
              <div className="w-32 h-32 relative">
                {/* Animated rotating ring */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin-slow"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-indigo-500 border-l-pink-500 animate-spin-slow animation-delay-1000"></div>
                
                {/* Logo Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* College Name with Animation */}
        <div className={`mt-8 text-center transform transition-all duration-1000 delay-300 ${
          animationStage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-clip-text text-transparent">
            FIBS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-2 font-light">
            Technical College
          </p>
          <div className="mt-3 flex justify-center space-x-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
          </div>
        </div>

        {/* Motto / Tagline with Animation */}
        <div className={`mt-6 text-center transform transition-all duration-1000 delay-500 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto">
            Empowering Dreams, Building Futures
          </p>
        </div>

        {/* Loading Indicator with Animation */}
        <div className={`mt-12 transform transition-all duration-1000 delay-700 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col items-center space-y-3">
            {/* Animated dots */}
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-gray-400 text-sm">Preparing your dashboard...</p>
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative w-full h-32 text-white opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.52,157.56,122.18,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}