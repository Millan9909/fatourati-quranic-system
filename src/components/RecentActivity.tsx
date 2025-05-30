
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, FileText, User, School } from 'lucide-react';

interface Activity {
  id: string;
  type: 'invoice_created' | 'invoice_approved' | 'invoice_rejected' | 'school_registered';
  description: string;
  timestamp: Date;
  user?: string;
  school?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'invoice_created':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'invoice_approved':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'invoice_rejected':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'school_registered':
        return <School className="h-4 w-4 text-purple-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityBadge = (type: Activity['type']) => {
    switch (type) {
      case 'invoice_created':
        return <Badge variant="outline" className="text-blue-600 border-blue-200">فاتورة جديدة</Badge>;
      case 'invoice_approved':
        return <Badge variant="outline" className="text-green-600 border-green-200">تم القبول</Badge>;
      case 'invoice_rejected':
        return <Badge variant="outline" className="text-red-600 border-red-200">تم الرفض</Badge>;
      case 'school_registered':
        return <Badge variant="outline" className="text-purple-600 border-purple-200">مدرسة جديدة</Badge>;
      default:
        return <Badge variant="outline">نشاط</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          الأنشطة الحديثة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.slice(0, 10).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-white">
                  {getActivityIcon(activity.type)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  {getActivityBadge(activity.type)}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {activity.school && (
                    <span className="flex items-center gap-1">
                      <School className="h-3 w-3" />
                      {activity.school}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.timestamp.toLocaleDateString('ar')} {activity.timestamp.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>لا توجد أنشطة حديثة</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
