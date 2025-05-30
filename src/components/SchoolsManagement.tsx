
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface School {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  programsCount: number;
  invoicesCount: number;
}

const mockSchools: School[] = [
  {
    id: '1',
    name: 'مدرسة النور القرآنية',
    code: 'SCH001',
    contactPerson: 'أحمد محمد',
    phone: '0501234567',
    email: 'contact@alnoor.edu.sa',
    status: 'active',
    programsCount: 5,
    invoicesCount: 12
  },
  {
    id: '2',
    name: 'أكاديمية الهدى',
    code: 'SCH002',
    contactPerson: 'فاطمة علي',
    phone: '0509876543',
    email: 'info@alhuda.edu.sa',
    status: 'active',
    programsCount: 3,
    invoicesCount: 8
  },
  {
    id: '3',
    name: 'معهد الفرقان',
    code: 'SCH003',
    contactPerson: 'محمد خالد',
    phone: '0551122334',
    email: 'admin@furqan.edu.sa',
    status: 'inactive',
    programsCount: 2,
    invoicesCount: 4
  }
];

export function SchoolsManagement() {
  const [schools, setSchools] = useState<School[]>(mockSchools);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-800">إدارة المدارس</h1>
          <p className="text-purple-600 mt-2">إدارة وتتبع المدارس المسجلة في النظام</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 ml-2" />
          إضافة مدرسة جديدة
        </Button>
      </div>

      {/* البحث والفلاتر */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث عن مدرسة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Button variant="outline">
              تصفية
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{schools.length}</div>
              <div className="text-sm text-gray-600">إجمالي المدارس</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {schools.filter(s => s.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">المدارس النشطة</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {schools.reduce((sum, s) => sum + s.programsCount, 0)}
              </div>
              <div className="text-sm text-gray-600">إجمالي البرامج</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {schools.reduce((sum, s) => sum + s.invoicesCount, 0)}
              </div>
              <div className="text-sm text-gray-600">إجمالي الفواتير</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة المدارس */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المدارس</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSchools.map((school) => (
              <div key={school.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-purple-800">{school.name}</h3>
                      <Badge variant={school.status === 'active' ? 'default' : 'secondary'}>
                        {school.status === 'active' ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div>كود المدرسة: {school.code}</div>
                      <div>المسؤول: {school.contactPerson}</div>
                      <div>الهاتف: {school.phone}</div>
                      <div>البريد الإلكتروني: {school.email}</div>
                      <div>عدد البرامج: {school.programsCount}</div>
                      <div>عدد الفواتير: {school.invoicesCount}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
