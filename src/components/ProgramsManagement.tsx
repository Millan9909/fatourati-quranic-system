
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  startDate: string;
  endDate: string;
  enrolledSchools: number;
  maxCapacity: number;
  status: 'active' | 'completed' | 'upcoming';
  price: number;
}

const mockPrograms: Program[] = [
  {
    id: '1',
    name: 'برنامج تحفيظ القرآن الكريم',
    description: 'برنامج شامل لتحفيظ القرآن الكريم للطلاب',
    duration: '6 أشهر',
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    enrolledSchools: 12,
    maxCapacity: 20,
    status: 'active',
    price: 5000
  },
  {
    id: '2',
    name: 'برنامج التجويد المتقدم',
    description: 'برنامج متخصص في أحكام التجويد وتطبيقها',
    duration: '3 أشهر',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    enrolledSchools: 8,
    maxCapacity: 15,
    status: 'active',
    price: 3000
  },
  {
    id: '3',
    name: 'برنامج التفسير والدراسات القرآنية',
    description: 'برنامج لدراسة تفسير القرآن والعلوم القرآنية',
    duration: '4 أشهر',
    startDate: '2024-06-01',
    endDate: '2024-10-01',
    enrolledSchools: 0,
    maxCapacity: 25,
    status: 'upcoming',
    price: 4000
  }
];

export function ProgramsManagement() {
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'completed': return 'مكتمل';
      case 'upcoming': return 'قادم';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-800">إدارة البرامج</h1>
          <p className="text-purple-600 mt-2">إدارة البرامج القرآنية والتعليمية</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 ml-2" />
          إضافة برنامج جديد
        </Button>
      </div>

      {/* البحث */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث عن برنامج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{programs.length}</div>
              <div className="text-sm text-gray-600">إجمالي البرامج</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {programs.filter(p => p.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">البرامج النشطة</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {programs.reduce((sum, p) => sum + p.enrolledSchools, 0)}
              </div>
              <div className="text-sm text-gray-600">المدارس المسجلة</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {programs.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">إجمالي الإيرادات المتوقعة</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة البرامج */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-purple-800">{program.name}</CardTitle>
                <Badge className={getStatusColor(program.status)}>
                  {getStatusText(program.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{program.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>المدة: {program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>المسجلين: {program.enrolledSchools}/{program.maxCapacity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 font-semibold">السعر: {program.price.toLocaleString()} ريال</span>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <div>تاريخ البداية: {new Date(program.startDate).toLocaleDateString('ar-SA')}</div>
                <div>تاريخ النهاية: {new Date(program.endDate).toLocaleDateString('ar-SA')}</div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 ml-1" />
                  تعديل
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
