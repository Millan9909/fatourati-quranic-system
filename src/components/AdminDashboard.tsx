
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { School, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

export function AdminDashboard() {
  // Mock data for demonstration
  const stats = {
    totalSchools: 19,
    totalInvoices: 45,
    pendingInvoices: 12,
    approvedInvoices: 28,
    rejectedInvoices: 5
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">لوحة تحكم الإدارة</h1>
        <p className="text-purple-600">مرحباً بك في نظام إدارة فواتير البرامج القرآنية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.pendingInvoices}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">مُعتمدة</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.approvedInvoices}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">مرفوضة</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{stats.rejectedInvoices}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-800">الفواتير الحديثة</CardTitle>
            <CardDescription>آخر الفواتير المرسلة من المدارس</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-900">برنامج تحفيظ القرآن الكريم</p>
                  <p className="text-sm text-purple-600">مدرسة النور</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">قيد المراجعة</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-900">دورة التجويد المتقدمة</p>
                  <p className="text-sm text-purple-600">أسماء بنت أبي بكر</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">مُعتمدة</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-900">برنامج القراءات العشر</p>
                  <p className="text-sm text-purple-600">آسيا بنت مزاحم</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">قيد المراجعة</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-purple-800">المدارس النشطة</CardTitle>
            <CardDescription>المدارس التي أرسلت فواتير حديثاً</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <School className="h-8 w-8 text-blue-600 ml-3" />
                  <div>
                    <p className="font-medium text-blue-900">مدرسة النور</p>
                    <p className="text-sm text-blue-600">3 فواتير هذا الشهر</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <School className="h-8 w-8 text-blue-600 ml-3" />
                  <div>
                    <p className="font-medium text-blue-900">أسماء بنت أبي بكر</p>
                    <p className="text-sm text-blue-600">2 فواتير هذا الشهر</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <School className="h-8 w-8 text-blue-600 ml-3" />
                  <div>
                    <p className="font-medium text-blue-900">آسيا بنت مزاحم</p>
                    <p className="text-sm text-blue-600">1 فاتورة هذا الشهر</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
