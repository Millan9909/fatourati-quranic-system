
export interface School {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
  totalInvoices: number;
  pendingInvoices: number;
  approvedInvoices: number;
}

export const schools: School[] = [
  {
    id: '1',
    name: 'مدرسة النور لتحفيظ القرآن',
    code: 'NOOR004',
    status: 'active',
    totalInvoices: 15,
    pendingInvoices: 3,
    approvedInvoices: 12
  },
  {
    id: '2',
    name: 'مدرسة أسماء لتحفيظ القرآن',
    code: 'ASMA002',
    status: 'active',
    totalInvoices: 8,
    pendingInvoices: 2,
    approvedInvoices: 6
  },
  {
    id: '3',
    name: 'مدرسة آسيا لتحفيظ القرآن',
    code: 'ASIA003',
    status: 'active',
    totalInvoices: 22,
    pendingInvoices: 3,
    approvedInvoices: 19
  }
];
