
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  type: 'admin' | 'school';
  schoolName?: string;
  schoolCode?: string;
}

interface AuthContextType {
  user: User | null;
  login: (code: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user data on mount
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (code: string): boolean => {
    const upperCode = code.toUpperCase();
    
    // Admin login
    if (upperCode === 'ADMIN') {
      const adminUser: User = {
        id: 'admin',
        type: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('auth_user', JSON.stringify(adminUser));
      return true;
    }

    // School login
    const schoolMap: Record<string, string> = {
      'NOOR004': 'مدرسة النور لتحفيظ القرآن',
      'ASMA002': 'مدرسة أسماء لتحفيظ القرآن',
      'ASIA003': 'مدرسة آسيا لتحفيظ القرآن'
    };

    if (schoolMap[upperCode]) {
      const schoolUser: User = {
        id: upperCode,
        type: 'school',
        schoolName: schoolMap[upperCode],
        schoolCode: upperCode
      };
      setUser(schoolUser);
      localStorage.setItem('auth_user', JSON.stringify(schoolUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
