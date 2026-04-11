import { create } from 'zustand';
import type { Book, Loan, ReadingStatus } from '../types';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppState {
  books: Book[];
  loans: Loan[];
  readingStatuses: Record<number, ReadingStatus>;
  toasts: Toast[];
  setBooks: (books: Book[]) => void;
  setLoans: (loans: Loan[]) => void;
  setReadingStatus: (bookId: number, status: ReadingStatus) => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  books: [],
  loans: [],
  readingStatuses: JSON.parse(localStorage.getItem('alexandria_statuses') || '{}'),
  toasts: [],
  setBooks: (books) => set({ books }),
  setLoans: (loans) => set({ loans }),
  setReadingStatus: (bookId, status) =>
    set((state) => {
      const updated = { ...state.readingStatuses, [bookId]: status };
      localStorage.setItem('alexandria_statuses', JSON.stringify(updated));
      return { readingStatuses: updated };
    }),
  addToast: (message, type = 'success') =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), message, type }],
    })),
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
