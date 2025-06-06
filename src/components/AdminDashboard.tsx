import { useState } from 'react';
import { usePrograms, useInvoices } from '../hooks/useStorage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Plus, FileText, School, BarChart3, Eye, Check, X, Trash2, Download, Settings } from 'lucide-react';
import { schools } from '../data/schools';
import { StatsCards } from './StatsCards';
import { InvoiceChart } from './InvoiceChart';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';

export function AdminDashboard() {
  const { programs, addProgram, deleteProgram } = usePrograms();
  const { invoices, updateInvoiceStatus } = useInvoices();
  const [newProgram, setNewProgram] = useState({ name: '', description: '' });
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const handleAddProgram = () => {
    if (!newProgram.name) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم البرنامج",
        variant: "destructive",
      });
      return;
    }
    
    addProgram(newProgram);
    setNewProgram({ name: '', description: '' });
    toast({
      title: "تم إضافة البرنامج",
      description: "تم إضافة البرنامج بنجاح",
    });
  };

  const handleReviewInvoice = (action: 'approved' | 'rejected') => {
    if (!selectedInvoice) return;
    
    updateInvoiceStatus(selectedInvoice.id, action, reviewNotes);
    setSelectedInvoice(null);
    setReviewNotes('');
    
    toast({
      title: action === 'approved' ? "تم قبول الفاتورة" : "تم رفض الفاتورة",
      description: `تم ${action === 'approved' ? 'قبول' : 'رفض'} الفاتورة بنجاح`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "تم بدء التصدير",
      description: "سيتم تحميل الملف قريباً",
    });
  };

  // إحصائيات متقدمة
  const stats = {
    totalInvoices: invoices.length,
    totalSchools: schools.length,
    totalAmount: invoices.reduce((sum, inv) => sum + (inv.amount || 2500), 0),
    pendingInvoices: invoices.filter(inv => inv.status === 'pending').length,
    approvedInvoices: invoices.filter(inv => inv.status === 'approved').length,
    rejectedInvoices: invoices.filter(inv => inv.status === 'rejected').length,
  };

  // الأنشطة الحديثة (محاكاة)
  const recentActivities = [
    {
      id: '1',
      type: 'invoice_created' as const,
      description: 'تم إنشاء فاتورة جديدة من مدرسة النور',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      school: 'النور'
    },
    {
      id: '2',
      type: 'invoice_approved' as const,
      description: 'تم قبول فاتورة مدرسة أسماء بنت أبي بكر',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      school: 'أسماء بنت أبي بكر'
    },
    {
      id: '3',
      type: 'invoice_rejected' as const,
      description: 'تم رفض فاتورة مدرسة آسيا بنت مزاحم',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      school: 'آسيا بنت مزاحم'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">لوحة التحكم</h1>
        <p className="text-purple-600">نظرة عامة على فواتير البرامج القرآنية</p>
      </div>

      {/* بطاقات الإحصائيات */}
      <StatsCards {...stats} />

      {/* الرسوم البيانية */}
      <InvoiceChart invoices={invoices} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* الأنشطة الحديثة */}
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivities} />
        </div>

        {/* الإجراءات السريعة */}
        <div>
          <QuickActions
            onAddProgram={() => {
              toast({
                title: "إضافة برنامج",
                description: "انتقل إلى تبويب 'إدارة البرامج' لإضافة برنامج جديد",
              });
            }}
            onViewReports={() => {
              toast({
                title: "التقارير",
                description: "ميزة التقارير المتقدمة قريباً",
              });
            }}
            onExportData={handleExportData}
            onSystemSettings={() => {
              toast({
                title: "الإعدادات",
                description: "ميزة الإعدادات قريباً",
              });
            }}
          />
        </div>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="invoices">مراجعة الفواتير</TabsTrigger>
          <TabsTrigger value="programs">إدارة البرامج</TabsTrigger>
          <TabsTrigger value="schools">المدارس المسجلة</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                الفواتير المرفوعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-purple-800">{invoice.title}</h3>
                        <p className="text-sm text-gray-600">{invoice.schoolName} - {invoice.programName}</p>
                        <p className="text-xs text-gray-500">
                          {invoice.startDate} إلى {invoice.endDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={
                            invoice.status === 'approved' ? 'default' : 
                            invoice.status === 'rejected' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {invoice.status === 'pending' ? 'بانتظار المراجعة' :
                           invoice.status === 'approved' ? 'مقبولة' : 'مرفوضة'}
                        </Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedInvoice(invoice)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>مراجعة الفاتورة</DialogTitle>
                              <DialogDescription>
                                مراجعة تفاصيل الفاتورة واتخاذ إجراء
                              </DialogDescription>
                            </DialogHeader>
                            {selectedInvoice && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">المدرسة</label>
                                    <p className="text-sm">{selectedInvoice.schoolName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">البرنامج</label>
                                    <p className="text-sm">{selectedInvoice.programName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">العنوان</label>
                                    <p className="text-sm">{selectedInvoice.title}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">المدة</label>
                                    <p className="text-sm">{selectedInvoice.startDate} - {selectedInvoice.endDate}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">الوصف</label>
                                  <p className="text-sm">{selectedInvoice.description}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">الملف المرفق</label>
                                  <p className="text-sm text-blue-600">{selectedInvoice.fileName}</p>
                                </div>
                                
                                {selectedInvoice.status === 'pending' && (
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">ملاحظات (اختياري)</label>
                                      <Textarea
                                        value={reviewNotes}
                                        onChange={(e) => setReviewNotes(e.target.value)}
                                        placeholder="أضف ملاحظات للمدرسة..."
                                        className="mt-1"
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() => handleReviewInvoice('approved')}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <Check className="h-4 w-4 mr-2" />
                                        قبول
                                      </Button>
                                      <Button
                                        onClick={() => handleReviewInvoice('rejected')}
                                        variant="destructive"
                                      >
                                        <X className="h-4 w-4 mr-2" />
                                        رفض
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
                {invoices.length === 0 && (
                  <p className="text-center text-gray-500 py-8">لا توجد فواتير مرفوعة حتى الآن</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                إضافة برنامج جديد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">اسم البرنامج</label>
                  <Input
                    value={newProgram.name}
                    onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                    placeholder="مثال: حلقات التحفيظ الصباحية"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">الوصف (اختياري)</label>
                  <Textarea
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                    placeholder="وصف البرنامج..."
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleAddProgram} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة البرنامج
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>البرامج الحالية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {programs.map((program) => (
                  <div key={program.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{program.name}</h3>
                      {program.description && (
                        <p className="text-sm text-gray-600">{program.description}</p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        deleteProgram(program.id);
                        toast({
                          title: "تم حذف البرنامج",
                          description: "تم حذف البرنامج بنجاح",
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5" />
                المدارس المسجلة
              </CardTitle>
              <CardDescription>
                قائمة بجميع المدارس المسجلة في النظام
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schools.map((school) => (
                  <div key={school.id} className="border rounded-lg p-4">
                    <h3 className="font-medium text-purple-800">{school.name}</h3>
                    <p className="text-sm text-gray-600">الرمز: {school.code}</p>
                    <div className="mt-2">
                      <Badge variant="outline">
                        {invoices.filter(inv => inv.schoolId === school.id).length} فاتورة
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
