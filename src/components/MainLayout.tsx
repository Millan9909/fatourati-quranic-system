
import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AdminDashboard } from './AdminDashboard';
import { Menu } from 'lucide-react';

export function MainLayout() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (id: string) => {
    setActiveItem(id);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'schools':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-purple-800 mb-4">إدارة المدارس</h1>
            <p className="text-purple-600">هذا القسم قيد التطوير...</p>
          </div>
        );
      case 'programs':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-purple-800 mb-4">إدارة البرامج</h1>
            <p className="text-purple-600">هذا القسم قيد التطوير...</p>
          </div>
        );
      case 'invoices':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-purple-800 mb-4">مراجعة الفواتير</h1>
            <p className="text-purple-600">هذا القسم قيد التطوير...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-purple-800 mb-4">التقارير والإحصائيات</h1>
            <p className="text-purple-600">هذا القسم قيد التطوير...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-purple-800 mb-4">إعدادات النظام</h1>
            <p className="text-purple-600">هذا القسم قيد التطوير...</p>
          </div>
        );
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
        <AppSidebar activeItem={activeItem} onItemClick={handleItemClick} />
        
        <div className="flex-1 flex flex-col">
          {/* Header with sidebar trigger */}
          <header className="h-16 border-b border-purple-200 bg-white/80 backdrop-blur-sm flex items-center px-6 gap-4">
            <SidebarTrigger className="text-purple-600 hover:bg-purple-100 p-2 rounded-md">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-purple-800">
                نظام إدارة فواتير البرامج القرآنية
              </h1>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
