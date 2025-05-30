
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Users, Settings, BarChart3, Download } from 'lucide-react';

interface QuickActionsProps {
  onAddSchool?: () => void;
  onAddProgram?: () => void;
  onViewReports?: () => void;
  onExportData?: () => void;
  onSystemSettings?: () => void;
}

export function QuickActions({ 
  onAddSchool, 
  onAddProgram, 
  onViewReports, 
  onExportData, 
  onSystemSettings 
}: QuickActionsProps) {
  const actions = [
    {
      title: 'إضافة برنامج جديد',
      description: 'إنشاء برنامج قرآني جديد',
      icon: Plus,
      onClick: onAddProgram,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
    },
    {
      title: 'عرض التقارير',
      description: 'إحصائيات وتقارير شاملة',
      icon: BarChart3,
      onClick: onViewReports,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
    },
    {
      title: 'تصدير البيانات',
      description: 'تحميل البيانات كملف Excel',
      icon: Download,
      onClick: onExportData,
      color: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
    },
    {
      title: 'إعدادات النظام',
      description: 'إدارة إعدادات النظام',
      icon: Settings,
      onClick: onSystemSettings,
      color: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          الإجراءات السريعة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              className={`${action.color} text-white p-4 h-auto flex-col items-start text-left`}
              variant="default"
            >
              <div className="flex items-center gap-2 mb-2">
                <action.icon className="h-5 w-5" />
                <span className="font-medium">{action.title}</span>
              </div>
              <span className="text-xs opacity-90">{action.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
