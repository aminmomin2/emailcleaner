import Link from 'next/link';
import React from 'react';

const AuthHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">OmniDo</h1>
              <p className="text-sm text-gray-500">Your Personal Knowledge Graph</p>
            </div>
          </div>
          
          {/* Right side - could be used for additional elements */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader; 