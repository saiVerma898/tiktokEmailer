import React, { useState, useEffect } from 'react';

interface TikTokUser {
  open_id: string;
  union_id: string;
  avatar_url: string;
  display_name: string;
  bio?: string;
}

export default function TikTokDashboard() {
  const [user, setUser] = useState<TikTokUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/tiktok/user');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError('Could not load user information');
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="p-6">No user data available</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-100 border-b">
          <h2 className="text-xl font-bold text-gray-800">TikTok Profile</h2>
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            {user.avatar_url && (
              <img 
                src={user.avatar_url} 
                alt={`${user.display_name}'s avatar`} 
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold">{user.display_name}</h3>
              {user.bio && <p className="text-gray-600">{user.bio}</p>}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div>
              <strong className="text-gray-700">TikTok ID:</strong> {user.open_id}
            </div>
            <div>
              <strong className="text-gray-700">Union ID:</strong> {user.union_id}
            </div>
          </div>

          <button 
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            onClick={() => {
              fetch('/api/auth/logout', { method: 'POST' })
                .then(() => window.location.href = '/login');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}