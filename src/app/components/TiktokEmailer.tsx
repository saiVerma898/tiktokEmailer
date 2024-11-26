// src/app/components/TiktokEmailer.tsx
'use client';

import { useState } from 'react';
import { useTikTokAuth } from '../../context/TikTokAuthContext';

export default function TiktokEmailer() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, logout, error } = useTikTokAuth();

  const handleTikTokLogin = () => {
    setIsLoading(true);
    window.location.href = '/api/auth/tiktok';
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">TikTok Emailer</h1>
      
      {user ? (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={user.avatar_url}
            alt={user.display_name}
            className="w-16 h-16 rounded-full"
          />
          <p className="font-medium">Welcome, {user.display_name}!</p>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleTikTokLogin}
          disabled={isLoading}
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 disabled:opacity-50"
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <span>Continue with TikTok</span>
          )}
        </button>
      )}
    </div>
  );
}