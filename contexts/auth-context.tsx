"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, profileImage: string) => void;
  logout: () => void;
  user: {
    id: string;
    username: string;
    email: string;
    profileImage: string;
  } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthContextType['user']>(null);

  const login = (username: string, profileImage: string) => {
    setIsAuthenticated(true);
    setUser({
      id: '1',
      username: username,
      email: `${username.toLowerCase()}@example.com`,
      profileImage: profileImage
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};