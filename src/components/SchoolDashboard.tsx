
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePrograms, useInvoices } from '../hooks/useStorage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Plus, FileText, Upload, Calendar, Eye } from 'lucide-react';

export function SchoolDashboard() {
  const { user } = useAuth();
  const { programs } = usePrograms();
  const { invoices, addInvoice } = useInvoices();
  const [newInvoice, setNewInvoice] = useState({
    programId: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    fileName: '',
  });
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const schoolInvoices = invoices.filter(inv => inv.schoolId === user?.schoolId);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      setNewInvoice({...newInvoice, fileName: file.name});
      toast({
        title: "تم رفع الملف",
        description: `تم رفع الملف: ${file.name}`,
      });
    }
  };

  const handleSubmitInvoice = () => {
    if (!newInvoice.programId || !newInvoice.title || !newInvoice.startDate || !newInvoice.endDate || !newInvoice.fileName) {
      toast({
        title: "خطأ",
        description: "يرجى تعبئة جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const selectedProgram = programs.find(p => p.id === newInvoice.programId);
    if (!selectedProgram) return;

    addInvoice({
      schoolId: user!.schoolId!,
      schoolName: user!.schoolName!,
      programId: newInvoice.programId,
      programName: selectedProgram.name,
      title: newInvoice.title,
      description: newInvoice.description,
      startDate: newInvoice.startDate,
      endDate: newInvoice.endDate,
      fileUrl: `/uploads/${newInvoice.fileName}`, // Mock URL
      fileName: newInvoice.fileName,
      status: 'pending',
    });

    setNewInvoice({
      programId: '',
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      fileName: '',
    });
    setShowUploadDialog(false);

    toast({
      title: "تم إرسال الفاتورة",
      description: "تم إرسال الفاتورة للمراجعة بنجاح",
    });
  };

  const stats = {
    totalInvoices: schoolInvoices.length,
    pendingInvoices: schoolInvoices.filter(inv => inv.status === 'pending').length,
    approvedInvoices: schoolInvoices.filter(inv => inv.status === 'approved').length,
    rejectedInvoices: schoolInvoices.filter(inv => inv.status === 'rejected').length,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">مرحباً بك، {user?.schoolName}</h1>
        <p className="text-purple-600">إدارة فواتير البرامج القرآنية</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">إجمالي الفواتير</p>
                <p className="text-2xl font-bold text-blue-800">{stats.totalInvoices}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">قيد المراجعة</p>
                <p className="text-2xl font-bold text-yellow-800">{stats.pendingInvoices}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">مقبولة</p>
                <p className="text-2xl font-bold text-green-800">{stats.approvedInvoices}</p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">مرفوضة</p>
                <p className="text-2xl font-bold text-red-800">{stats.rejectedInvoices}</p>
              </div>
              <FileText className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="invoices">فواتيري</TabsTrigger>
          <TabsTrigger value="upload">رفع فاتورة جديدة</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                فواتيري
              </CardTitle>
              <CardDescription>
                قائمة بجميع الفواتير المرفوعة من مدرستك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schoolInvoices.map((invoice) => (
                  <div key={invoice.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-purple-800">{invoice.title}</h3>
                        <p className="text-sm text-gray-600">{invoice.programName}</p>
                        <p className="text-xs text-gray-500">
                          {invoice.startDate} إلى {invoice.endDate}
                        </p>
                        <p className="text-xs text-gray-500">
                          تم الرفع: {invoice.createdAt.toLocaleDateString('ar')}
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
                          {invoice.status === 'pending' ? 'قيد المراجعة' :
                           invoice.status === 'approved' ? 'مقبولة' : 'مرفوضة'}
                        </Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>تفاصيل الفاتورة</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">العنوان</label>
                                <p className="text-sm">{invoice.title}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">البرنامج</label>
                                <p className="text-sm">{invoice.programName}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">المدة</label>
                                <p className="text-sm">{invoice.startDate} - {invoice.endDate}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">الوصف</label>
                                <p className="text-sm">{invoice.description}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">الحالة</label>
                                <p className="text-sm">
                                  <Badge 
                                    variant={
                                      invoice.status === 'approved' ? 'default' : 
                                      invoice.status === 'rejected' ? 'destructive' : 
                                      'secondary'
                                    }
                                  >
                                    {invoice.status === 'pending' ? 'قيد المراجعة' :
                                     invoice.status === 'approved' ? 'مقبولة' : 'مرفوضة'}
                                  </Badge>
                                </p>
                              </div>
                              {invoice.notes && (
                                <div>
                                  <label className="text-sm font-medium">ملاحظات الإدارة</label>
                                  <p className="text-sm bg-gray-50 p-2 rounded">{invoice.notes}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
                {schoolInvoices.length === 0 && (
                  <p className="text-center text-gray-500 py-8">لا توجد فواتير مرفوعة حتى الآن</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                رفع فاتورة جديدة
              </CardTitle>
              <CardDescription>
                قم برفع فاتورة برنامج قرآني جديد
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">البرنامج *</label>
                  <Select value={newInvoice.programId} onValueChange={(value) => setNewInvoice({...newInvoice, programId: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="اختر البرنامج" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">عنوان الفاتورة *</label>
                  <Input
                    value={newInvoice.title}
                    onChange={(e) => setNewInvoice({...newInvoice, title: e.target.value})}
                    placeholder="مثال: شهر رمضان - مدرسة النور"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">تاريخ البداية *</label>
                  <Input
                    type="date"
                    value={newInvoice.startDate}
                    onChange={(e) => setNewInvoice({...newInvoice, startDate: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">تاريخ النهاية *</label>
                  <Input
                    type="date"
                    value={newInvoice.endDate}
                    onChange={(e) => setNewInvoice({...newInvoice, endDate: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">وصف مختصر</label>
                <Textarea
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                  placeholder="وصف مختصر للفاتورة..."
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">رفع ملف الفاتورة *</label>
                <div className="mt-1 border-2 border-dashed border-purple-200 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">اضغط لرفع الملف أو اسحب الملف هنا</p>
                  <p className="text-xs text-gray-500 mb-4">PDF أو صورة (حتى 10 ميجابايت)</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button type="button" variant="outline" className="cursor-pointer">
                      اختيار ملف
                    </Button>
                  </label>
                  {newInvoice.fileName && (
                    <p className="text-sm text-green-600 mt-2">تم رفع: {newInvoice.fileName}</p>
                  )}
                </div>
              </div>

              <Button 
                onClick={handleSubmitInvoice}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Upload className="h-4 w-4 mr-2" />
                إرسال الفاتورة
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
