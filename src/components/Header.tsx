
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-white border-b border-purple-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="https://www.qksh.org.sa/rafed/uploads/system/67a8c3fc404e25.53027719.png" 
              alt="شعار المنصة" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-purple-800">فاتورتي القرآنية</h1>
              <p className="text-sm text-purple-600">نظام إدارة فواتير البرامج القرآنية</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-700">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">
                {user.type === 'admin' ? 'الإدارة العامة' : user.schoolName}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="text-purple-700 border-purple-200 hover:bg-purple-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
