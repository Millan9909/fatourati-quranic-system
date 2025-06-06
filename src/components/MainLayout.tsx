
import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AdminDashboard } from './AdminDashboard';
import { SchoolsManagement } from './SchoolsManagement';
import { ProgramsManagement } from './ProgramsManagement';
import { InvoicesReview } from './InvoicesReview';
import { ReportsStatistics } from './ReportsStatistics';
import { SystemSettings } from './SystemSettings';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, User } from 'lucide-react';

export function MainLayout() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const { user, logout } = useAuth();

  const handleItemClick = (id: string) => {
    setActiveItem(id);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'schools':
        return <SchoolsManagement />;
      case 'programs':
        return <ProgramsManagement />;
      case 'invoices':
        return <InvoicesReview />;
      case 'reports':
        return <ReportsStatistics />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100" dir="rtl">
        
        <div className="flex-1 flex flex-col">
          {/* Header with sidebar trigger and logout */}
          <header className="h-16 border-b border-purple-200 bg-white/80 backdrop-blur-sm flex items-center px-6 gap-4">
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-purple-800">
                نظام إدارة فواتير البرامج القرآنية
              </h1>
            </div>

            {/* User info and logout */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-purple-700">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {user?.type === 'admin' ? 'الإدارة العامة' : user?.schoolName}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="text-purple-700 border-purple-200 hover:bg-purple-50"
              >
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
            
            <SidebarTrigger className="text-purple-600 hover:bg-purple-100 p-2 rounded-md transition-colors">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>

        <AppSidebar activeItem={activeItem} onItemClick={handleItemClick} />
      </div>
    </SidebarProvider>
  );
}
