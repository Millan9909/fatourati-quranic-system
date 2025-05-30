
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface InvoiceChartProps {
  invoices: any[];
}

export function InvoiceChart({ invoices }: InvoiceChartProps) {
  // إعداد بيانات الرسم البياني الخطي للفواتير حسب الشهر
  const monthlyData = invoices.reduce((acc, invoice) => {
    const month = new Date(invoice.createdAt).toLocaleDateString('ar', { month: 'long' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const lineChartData = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    invoices: count
  }));

  // بيانات الدائرة للحالات
  const statusData = [
    { name: 'مقبولة', value: invoices.filter(inv => inv.status === 'approved').length, color: '#10b981' },
    { name: 'قيد المراجعة', value: invoices.filter(inv => inv.status === 'pending').length, color: '#f59e0b' },
    { name: 'مرفوضة', value: invoices.filter(inv => inv.status === 'rejected').length, color: '#ef4444' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* رسم بياني خطي للفواتير الشهرية */}
      <Card>
        <CardHeader>
          <CardTitle>حالة الفواتير</CardTitle>
          <CardDescription>الاتجاه الشهري للفواتير المرفوعة</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="invoices" 
                stroke="#8b5cf6" 
                fill="url(#colorGradient)" 
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* رسم دائري لحالات الفواتير */}
      <Card>
        <CardHeader>
          <CardTitle>الفواتير حسب الحالة</CardTitle>
          <CardDescription>توزيع الفواتير حسب حالة المراجعة</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
