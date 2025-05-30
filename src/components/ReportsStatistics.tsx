
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, Calendar, TrendingUp, DollarSign, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const monthlyData = [
  { month: 'يناير', invoices: 45, amount: 125000, schools: 12 },
  { month: 'فبراير', invoices: 52, amount: 140000, schools: 15 },
  { month: 'مارس', invoices: 38, amount: 95000, schools: 10 },
  { month: 'أبريل', invoices: 61, amount: 180000, schools: 18 },
  { month: 'مايو', invoices: 49, amount: 135000, schools: 14 },
  { month: 'يونيو', invoices: 55, amount: 165000, schools: 16 }
];

const programsData = [
  { name: 'تحفيظ القرآن', value: 45, color: '#8B5CF6' },
  { name: 'التجويد', value: 30, color: '#06B6D4' },
  { name: 'التفسير', value: 15, color: '#10B981' },
  { name: 'القراءات', value: 10, color: '#F59E0B' }
];

const statusData = [
  { name: 'مقبول', value: 70, color: '#10B981' },
  { name: 'قيد المراجعة', value: 20, color: '#F59E0B' },
  { name: 'مرفوض', value: 10, color: '#EF4444' }
];

export function ReportsStatistics() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-800">التقارير والإحصائيات</h1>
          <p className="text-purple-600 mt-2">تحليل شامل لبيانات النظام والأداء</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">آخر 3 أشهر</SelectItem>
              <SelectItem value="6months">آخر 6 أشهر</SelectItem>
              <SelectItem value="year">السنة الحالية</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* المؤشرات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الفواتير</p>
                <p className="text-2xl font-bold text-purple-600">300</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +12% من الشهر الماضي
                </p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المبالغ</p>
                <p className="text-2xl font-bold text-green-600">840,000</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +8% من الشهر الماضي
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المدارس النشطة</p>
                <p className="text-2xl font-bold text-blue-600">85</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +5% من الشهر الماضي
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل القبول</p>
                <p className="text-2xl font-bold text-orange-600">87%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +3% من الشهر الماضي
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* رسم بياني للفواتير الشهرية */}
        <Card>
          <CardHeader>
            <CardTitle>الفواتير والمبالغ الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'invoices' ? `${value} فاتورة` : `${value} ريال`,
                    name === 'invoices' ? 'عدد الفواتير' : 'المبلغ'
                  ]}
                />
                <Bar dataKey="invoices" fill="#8B5CF6" name="invoices" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* رسم بياني للبرامج */}
        <Card>
          <CardHeader>
            <CardTitle>توزيع البرامج</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={programsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {programsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'النسبة']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* رسم بياني خطي للاتجاه */}
        <Card>
          <CardHeader>
            <CardTitle>اتجاه الإيرادات</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} ريال`, 'المبلغ']} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* رسم بياني لحالة الفواتير */}
        <Card>
          <CardHeader>
            <CardTitle>حالة الفواتير</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'النسبة']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* جدول التفاصيل */}
      <Card>
        <CardHeader>
          <CardTitle>ملخص الأداء الشهري</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-3">الشهر</th>
                  <th className="text-right p-3">عدد الفواتير</th>
                  <th className="text-right p-3">المبلغ الإجمالي</th>
                  <th className="text-right p-3">عدد المدارس</th>
                  <th className="text-right p-3">متوسط الفاتورة</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((month, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{month.month}</td>
                    <td className="p-3">{month.invoices}</td>
                    <td className="p-3">{month.amount.toLocaleString()} ريال</td>
                    <td className="p-3">{month.schools}</td>
                    <td className="p-3">{Math.round(month.amount / month.invoices).toLocaleString()} ريال</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
