
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, School, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function AdminDashboard() {
  const { user } = useAuth();

  // Mock data for demonstration
  const stats = {
    totalSchools: 12,
    totalInvoices: 45,
    pendingInvoices: 8,
    approvedInvoices: 32
  };

  const schools = [
    { id: '1', name: 'مدرسة النور لتحفيظ القرآن', code: 'NOOR004', invoices: 5 },
    { id: '2', name: 'مدرسة أسماء لتحفيظ القرآن', code: 'ASMA002', invoices: 3 },
    { id: '3', name: 'مدرسة آسيا لتحفيظ القرآن', code: 'ASIA003', invoices: 7 }
  ];

  const handlePendingInvoices = () => {
    toast({
      title: "مراجعة الفواتير",
      description: "تم فتح صفحة مراجعة الفواتير المعلقة",
    });
  };

  const handleAddSchool = () => {
    toast({
      title: "إضافة مدرسة",
      description: "تم فتح نموذج إضافة مدرسة جديدة",
    });
  };

  const handleMonthlyReport = () => {
    toast({
      title: "التقرير الشهري",
      description: "تم إنشاء التقرير الشهري بنجاح",
    });
  };

  const handleSystemSettings = () => {
    toast({
      title: "إعدادات النظام",
      description: "تم فتح صفحة إعدادات النظام",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">لوحة تحكم الإدارة</h1>
        <p className="text-purple-600">إدارة ومراقبة جميع فواتير المدارس القرآنية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">إجمالي المدارس</CardTitle>
            <School className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.totalSchools}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">إجمالي الفواتير</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.totalInvoices}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">قيد المراجعة</CardTitle>
            <Users className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.pendingInvoices}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">مُعتمدة</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.approvedInvoices}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-800">المدارس المسجلة</CardTitle>
            <CardDescription>قائمة بجميع المدارس وأنشطتها</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schools.map((school) => (
                <div key={school.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-purple-900">{school.name}</p>
                    <p className="text-sm text-purple-600">رمز المدرسة: {school.code}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-purple-600">الفواتير</p>
                    <p className="font-bold text-purple-900">{school.invoices}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-purple-800">إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                onClick={handlePendingInvoices}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                مراجعة الفواتير المعلقة
              </Button>
              <Button 
                onClick={handleAddSchool}
                variant="outline" 
                className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                إضافة مدرسة جديدة
              </Button>
              <Button 
                onClick={handleMonthlyReport}
                variant="outline" 
                className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                تقرير شهري
              </Button>
              <Button 
                onClick={handleSystemSettings}
                variant="outline" 
                className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                إعدادات النظام
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
