import type { Loan, LoanFormData } from '../types';

// Mock loan service (no backend endpoint yet)
const STORAGE_KEY = 'alexandria_loans';

function getLoans(): Loan[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLoans(loans: Loan[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(loans));
}

export const loanService = {
  getAll(): Loan[] {
    return getLoans();
  },

  getActive(): Loan[] {
    return getLoans().filter((l) => !l.returned);
  },

  create(data: LoanFormData & { bookTitle: string }): Loan {
    const loans = getLoans();
    const newLoan: Loan = {
      id: Date.now(),
      bookId: data.bookId,
      bookTitle: data.bookTitle,
      borrowerName: data.borrowerName,
      loanDate: data.loanDate,
      returned: false,
    };
    loans.push(newLoan);
    saveLoans(loans);
    return newLoan;
  },

  returnLoan(id: number): Loan {
    const loans = getLoans();
    const idx = loans.findIndex((l) => l.id === id);
    if (idx === -1) throw new Error('Loan not found');
    loans[idx] = { ...loans[idx], returned: true, returnDate: new Date().toISOString().split('T')[0] };
    saveLoans(loans);
    return loans[idx];
  },

  delete(id: number): void {
    const loans = getLoans().filter((l) => l.id !== id);
    saveLoans(loans);
  },
};
