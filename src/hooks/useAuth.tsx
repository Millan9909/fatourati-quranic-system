
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { schools } from '../data/schools';

interface AuthContextType {
  user: User | null;
  login: (code: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('quranic-invoice-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (code: string, password: string): boolean => {
    // Check if admin
    if (code === 'ADMIN' && password === '9909') {
      const adminUser: User = {
        id: 'admin',
        type: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('quranic-invoice-user', JSON.stringify(adminUser));
      return true;
    }

    // Check if school
    const school = schools.find(s => s.code === code && s.password === password);
    if (school) {
      const schoolUser: User = {
        id: school.id,
        type: 'school',
        schoolId: school.id,
        schoolName: school.name
      };
      setUser(schoolUser);
      localStorage.setItem('quranic-invoice-user', JSON.stringify(schoolUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quranic-invoice-user');
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
