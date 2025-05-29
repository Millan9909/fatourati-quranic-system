
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  type: 'admin' | 'school';
  schoolId?: string;
  schoolName?: string;
}

interface School {
  id: string;
  name: string;
  code: string;
  password: string;
}

const schools: School[] = [
  { id: '1', name: 'الإشراف التربوي', code: 'ISHR001', password: '' },
  { id: '2', name: 'أسماء بنت أبي بكر', code: 'ASMA002', password: '' },
  { id: '3', name: 'آسيا بنت مزاحم', code: 'ASIA003', password: '' },
  { id: '4', name: 'النور', code: 'NOOR004', password: '' },
  { id: '5', name: 'أم سلمة الصباح', code: 'UMSA005', password: '' },
  { id: '6', name: 'أم سلمة العصر', code: 'UMSE006', password: '' },
  { id: '7', name: 'حفصة بنت عمر', code: 'HAFS007', password: '' },
  { id: '8', name: 'رقية', code: 'RUQA008', password: '' },
  { id: '9', name: 'صفيه بنت حيي صباحي', code: 'SAFS009', password: '' },
  { id: '10', name: 'صفيه بنت حيي مسائي', code: 'SAFM010', password: '' },
  { id: '11', name: 'عائشة بنت أبي بكر', code: 'AISH011', password: '' },
  { id: '12', name: 'فاطمة الزهراء', code: 'FATI012', password: '' },
  { id: '13', name: 'خديجة بنت خويلد صباحي', code: 'KHADS013', password: '' },
  { id: '14', name: 'خديجة بنت خويلد مسائي', code: 'KHADM014', password: '' },
  { id: '15', name: 'ميمونة بنت الحارث', code: 'MAIM015', password: '' },
  { id: '16', name: 'مريم بنت عمران صباحي', code: 'MARS016', password: '' },
  { id: '17', name: 'مريم بنت عمران مسائي', code: 'MARM017', password: '' },
  { id: '18', name: 'مركز بينات', code: 'BAIN018', password: '' },
  { id: '19', name: 'جويرية بنت الحارث', code: 'JUWI019', password: '' },
];

interface AuthContextType {
  user: User | null;
  login: (code: string) => boolean;
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

  const login = (code: string): boolean => {
    // Check if admin
    if (code === 'ADMIN') {
      const adminUser: User = {
        id: 'admin',
        type: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('quranic-invoice-user', JSON.stringify(adminUser));
      return true;
    }

    // Check if school
    const school = schools.find(s => s.code === code);
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
