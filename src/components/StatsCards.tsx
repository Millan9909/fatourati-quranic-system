
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Users, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';

interface StatsCardsProps {
  totalInvoices: number;
  totalSchools: number;
  totalAmount: number;
  pendingInvoices: number;
  approvedInvoices: number;
  rejectedInvoices: number;
}

export function StatsCards({ 
  totalInvoices, 
  totalSchools, 
  totalAmount, 
  pendingInvoices, 
  approvedInvoices, 
  rejectedInvoices 
}: StatsCardsProps) {
  const stats = [
    {
      title: 'إجمالي الفواتير',
      value: totalInvoices,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      title: 'المدارس النشطة',
      value: totalSchools,
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      borderColor: 'border-green-200'
    },
    {
      title: 'إجمالي المبلغ',
      value: `${totalAmount.toLocaleString()} ريال`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200'
    },
    {
      title: 'بانتظار المراجعة',
      value: pendingInvoices,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'فواتير مقبولة',
      value: approvedInvoices,
      icon: CheckCircle,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200'
    },
    {
      title: 'فواتير مرفوضة',
      value: rejectedInvoices,
      icon: XCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100',
      borderColor: 'border-red-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-gradient-to-br ${stat.bgColor} ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
