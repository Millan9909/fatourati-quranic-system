
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User, School } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "تم تسجيل الخروج",
      description: "شكراً لاستخدام فاتورتي القرآنية",
    });
  };

  return (
    <header className="bg-white shadow-sm border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="https://www.qksh.org.sa/rafed/uploads/system/67a8c3fc404e25.53027719.png" 
              alt="شعار المنصة" 
              className="h-10 w-auto"
            />
            <h1 className="mr-3 text-xl font-bold text-purple-800">فاتورتي القرآنية</h1>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center text-purple-700">
              {user?.type === 'admin' ? (
                <User className="h-5 w-5 ml-2" />
              ) : (
                <School className="h-5 w-5 ml-2" />
              )}
              <span className="font-medium">
                {user?.type === 'admin' ? 'الإدارة العامة' : user?.schoolName}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <LogOut className="h-4 w-4 ml-2" />
              خروج
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
