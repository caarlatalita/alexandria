import { useState, useCallback } from 'react';
import { loanService } from '../services/loanService';
import type { LoanFormData } from '../types';
import { useAppStore } from '../store/appStore';

export function useLoans() {
  const [loading, setLoading] = useState(false);
  const { setLoans, addToast } = useAppStore();

  const fetchLoans = useCallback(() => {
    const loans = loanService.getAll();
    setLoans(loans);
  }, [setLoans]);

  const createLoan = useCallback(async (data: LoanFormData & { bookTitle: string }) => {
    setLoading(true);
    try {
      const loan = loanService.create(data);
      fetchLoans();
      addToast('Empréstimo registrado com sucesso!');
      return loan;
    } catch {
      addToast('Erro ao registrar empréstimo.', 'error');
    } finally {
      setLoading(false);
    }
  }, [fetchLoans, addToast]);

  const returnLoan = useCallback((id: number) => {
    try {
      loanService.returnLoan(id);
      fetchLoans();
      addToast('Devolução registrada!');
    } catch {
      addToast('Erro ao registrar devolução.', 'error');
    }
  }, [fetchLoans, addToast]);

  const removeLoan = useCallback((id: number) => {
    loanService.delete(id);
    fetchLoans();
    addToast('Empréstimo removido.');
  }, [fetchLoans, addToast]);

  return { loading, fetchLoans, createLoan, returnLoan, removeLoan };
}
