
export interface User {
  id: string;
  type: 'admin' | 'school';
  schoolName?: string;
  schoolCode?: string;
}

export interface Invoice {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  schoolId: string;
  schoolName: string;
  createdAt: string;
  updatedAt: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
  totalInvoices: number;
  pendingInvoices: number;
  approvedInvoices: number;
}
