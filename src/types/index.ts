
export interface School {
  id: string;
  name: string;
  code: string;
  password: string;
}

export interface Program {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  schoolId: string;
  schoolName: string;
  programId: string;
  programName: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  fileUrl: string;
  fileName: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  amount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  type: 'school' | 'admin';
  schoolId?: string;
  schoolName?: string;
}

export interface Activity {
  id: string;
  type: 'invoice_created' | 'invoice_approved' | 'invoice_rejected' | 'school_registered';
  description: string;
  timestamp: Date;
  user?: string;
  school?: string;
}
