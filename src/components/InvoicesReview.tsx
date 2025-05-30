
import { useState } from 'react';
import { Search, Filter, Download, Eye, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Invoice {
  id: string;
  schoolName: string;
  programName: string;
  title: string;
  amount: number;
  submitDate: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  fileName: string;
}

const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    schoolName: 'مدرسة النور القرآنية',
    programName: 'برنامج تحفيظ القرآن الكريم',
    title: 'فاتورة شهر يناير 2024',
    amount: 15000,
    submitDate: '2024-01-28',
    status: 'pending',
    description: 'فاتورة خدمات التحفيظ لشهر يناير',
    fileName: 'invoice_jan_2024.pdf'
  },
  {
    id: 'INV-002',
    schoolName: 'أكاديمية الهدى',
    programName: 'برنامج التجويد المتقدم',
    title: 'فاتورة شهر يناير 2024',
    amount: 12000,
    submitDate: '2024-01-25',
    status: 'approved',
    description: 'فاتورة دورة التجويد المتقدم',
    fileName: 'invoice_tajweed_jan.pdf'
  },
  {
    id: 'INV-003',
    schoolName: 'معهد الفرقان',
    programName: 'برنامج تحفيظ القرآن الكريم',
    title: 'فاتورة شهر ديسمبر 2023',
    amount: 8000,
    submitDate: '2024-01-20',
    status: 'rejected',
    description: 'فاتورة خدمات ديسمبر - مرفوضة لعدم اكتمال البيانات',
    fileName: 'invoice_dec_2023.pdf'
  }
];

export function InvoicesReview() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد المراجعة';
      case 'approved': return 'مقبول';
      case 'rejected': return 'مرفوض';
      default: return 'غير محدد';
    }
  };

  const handleApprove = (invoiceId: string) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === invoiceId ? { ...inv, status: 'approved' as const } : inv
    ));
  };

  const handleReject = (invoiceId: string) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === invoiceId ? { ...inv, status: 'rejected' as const } : inv
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-800">مراجعة الفواتير</h1>
          <p className="text-purple-600 mt-2">مراجعة وإدارة فواتير المدارس المقدمة</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 ml-2" />
          تصدير التقرير
        </Button>
      </div>

      {/* الفلاتر والبحث */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في الفواتير..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فلترة حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد المراجعة</SelectItem>
                <SelectItem value="approved">مقبول</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{invoices.length}</div>
              <div className="text-sm text-gray-600">إجمالي الفواتير</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {invoices.filter(i => i.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">قيد المراجعة</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {invoices.filter(i => i.status === 'approved').length}
              </div>
              <div className="text-sm text-gray-600">مقبول</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {invoices.filter(i => i.status === 'approved').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">المبلغ المقبول (ريال)</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة الفواتير */}
      <Card>
        <CardHeader>
          <CardTitle>الفواتير المقدمة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-purple-800">{invoice.title}</h3>
                      <Badge className={getStatusColor(invoice.status)}>
                        {getStatusText(invoice.status)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div>رقم الفاتورة: {invoice.id}</div>
                      <div>المدرسة: {invoice.schoolName}</div>
                      <div>البرنامج: {invoice.programName}</div>
                      <div>تاريخ التقديم: {new Date(invoice.submitDate).toLocaleDateString('ar-SA')}</div>
                      <div>المبلغ: {invoice.amount.toLocaleString()} ريال</div>
                      <div>اسم الملف: {invoice.fileName}</div>
                    </div>
                    <p className="text-sm text-gray-700">{invoice.description}</p>
                  </div>
                  <div className="flex gap-2 mr-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    {invoice.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleApprove(invoice.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleReject(invoice.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
