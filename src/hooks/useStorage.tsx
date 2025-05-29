
import { useState, useEffect } from 'react';
import { Program, Invoice } from '../types';

// Mock storage hooks for demo purposes
export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>(() => {
    const saved = localStorage.getItem('quranic-programs');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'حلقات التحفيظ الصباحية', description: 'برنامج التحفيظ في الفترة الصباحية', createdAt: new Date() },
      { id: '2', name: 'حلقات التحفيظ المسائية', description: 'برنامج التحفيظ في الفترة المسائية', createdAt: new Date() },
      { id: '3', name: 'الدورة الصيفية المكثفة', description: 'برنامج صيفي مكثف للحفظ والمراجعة', createdAt: new Date() },
      { id: '4', name: 'برنامج تجويد القرآن', description: 'دورات متخصصة في أحكام التجويد', createdAt: new Date() },
    ];
  });

  const addProgram = (program: Omit<Program, 'id' | 'createdAt'>) => {
    const newProgram: Program = {
      ...program,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const updated = [...programs, newProgram];
    setPrograms(updated);
    localStorage.setItem('quranic-programs', JSON.stringify(updated));
  };

  const deleteProgram = (id: string) => {
    const updated = programs.filter(p => p.id !== id);
    setPrograms(updated);
    localStorage.setItem('quranic-programs', JSON.stringify(updated));
  };

  return { programs, addProgram, deleteProgram };
}

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('quranic-invoices');
    return saved ? JSON.parse(saved).map((inv: any) => ({
      ...inv,
      createdAt: new Date(inv.createdAt),
      updatedAt: new Date(inv.updatedAt),
    })) : [];
  });

  const addInvoice = (invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updated = [...invoices, newInvoice];
    setInvoices(updated);
    localStorage.setItem('quranic-invoices', JSON.stringify(updated));
  };

  const updateInvoiceStatus = (id: string, status: Invoice['status'], notes?: string) => {
    const updated = invoices.map(inv => 
      inv.id === id 
        ? { ...inv, status, notes, updatedAt: new Date() }
        : inv
    );
    setInvoices(updated);
    localStorage.setItem('quranic-invoices', JSON.stringify(updated));
  };

  return { invoices, addInvoice, updateInvoiceStatus };
}
