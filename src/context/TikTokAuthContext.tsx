'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { TikTokUserInfo } from '../types';

interface TikTokAuthContextType {
  user: TikTokUserInfo | null;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
}

const TikTokAuthContext = createContext<TikTokAuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  logout: () => {},
});

export function TikTokAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TikTokUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();

      if (data.user) {
        setUser(data.user);
      }
    } catch {
      setError('Failed to load user session'); // No need for 'err' variable
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch {
      setError('Failed to logout'); // No need for 'err' variable
    }
  };

  return (
    <TikTokAuthContext.Provider value={{ user, isLoading, error, logout }}>
      {children}
    </TikTokAuthContext.Provider>
  );
}

export const useTikTokAuth = () => useContext(TikTokAuthContext);