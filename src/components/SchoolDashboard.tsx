
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function SchoolDashboard() {
  const { user } = useAuth();

  // Mock data for demonstration
  const invoices = [
    { id: '1', title: 'برنامج تحفيظ القرآن الكريم', status: 'pending', date: '2024-01-15' },
    { id: '2', title: 'دورة التجويد المتقدمة', status: 'approved', date: '2024-01-10' },
    { id: '3', title: 'برنامج القراءات العشر', status: 'rejected', date: '2024-01-05' },
  ];

  const handleCreateInvoice = () => {
    toast({
      title: "فاتورة جديدة",
      description: "تم فتح نموذج إنشاء فاتورة جديدة",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'قيد المراجعة';
      case 'approved':
        return 'مُعتمدة';
      case 'rejected':
        return 'مرفوضة';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">مرحباً بك، {user?.schoolName}</h1>
        <p className="text-purple-600">إدارة فواتير البرامج القرآنية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">إجمالي الفواتير</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{invoices.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">قيد المراجعة</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {invoices.filter(inv => inv.status === 'pending').length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">مُعتمدة</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {invoices.filter(inv => inv.status === 'approved').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-purple-800">فواتيرك</CardTitle>
                <CardDescription>جميع الفواتير المرسلة</CardDescription>
              </div>
              <Button 
                onClick={handleCreateInvoice}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="h-4 w-4 ml-2" />
                فاتورة جديدة
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      {getStatusIcon(invoice.status)}
                      <div>
                        <p className="font-medium text-purple-900">{invoice.title}</p>
                        <p className="text-sm text-purple-600">{invoice.date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-800">إرشادات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">إنشاء فاتورة جديدة</h4>
                  <p className="text-sm text-blue-700">انقر على "فاتورة جديدة" لبدء إنشاء فاتورة برنامج قرآني</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-1">تتبع الحالة</h4>
                  <p className="text-sm text-green-700">يمكنك متابعة حالة فواتيرك من خلال الألوان والرموز</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-1">تحديث البيانات</h4>
                  <p className="text-sm text-purple-700">تأكد من دقة جميع البيانات قبل الإرسال</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
