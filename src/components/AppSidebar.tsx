
import { useState } from 'react';
import { 
  Home, 
  GraduationCap, 
  FileText, 
  Monitor, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: 'لوحة التحكم',
    icon: Home,
    url: '/',
    id: 'dashboard'
  },
  {
    title: 'إدارة المدارس',
    icon: GraduationCap,
    url: '/schools',
    id: 'schools'
  },
  {
    title: 'إدارة البرامج',
    icon: FileText,
    url: '/programs',
    id: 'programs'
  },
  {
    title: 'مراجعة الفواتير',
    icon: Monitor,
    url: '/invoices',
    id: 'invoices'
  },
  {
    title: 'التقارير والإحصائيات',
    icon: BarChart3,
    url: '/reports',
    id: 'reports'
  },
  {
    title: 'إعدادات النظام',
    icon: Settings,
    url: '/settings',
    id: 'settings'
  }
];

interface AppSidebarProps {
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

export function AppSidebar({ activeItem = 'dashboard', onItemClick }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const handleItemClick = (id: string) => {
    if (onItemClick) {
      onItemClick(id);
    }
  };

  return (
    <Sidebar 
      side="right" 
      className="border-l border-purple-200 bg-gradient-to-b from-purple-50 to-pink-50"
    >
      <SidebarHeader className="p-6 border-b border-purple-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-purple-800">نظام الفواتير</h2>
              <p className="text-sm text-purple-600">البرامج القرآنية</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full justify-start px-4 py-3 rounded-lg transition-all duration-200
                      ${activeItem === item.id 
                        ? 'bg-purple-600 text-white shadow-lg' 
                        : 'text-purple-700 hover:bg-purple-100 hover:text-purple-800'
                      }
                      ${isCollapsed ? 'justify-center px-2' : ''}
                    `}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                    {!isCollapsed && (
                      <span className="font-medium text-right flex-1">{item.title}</span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
