export interface Book {
  id: number;
  title: string;
  genre: string;
  status?: ReadingStatus;
  publisher?: Publisher;
  details?: BookDetail;
}

export interface BookDetail {
  bookId: number;
  summary: string;
  pageCount: number;
  year: string;
  isbn: string;
}

export interface Publisher {
  id: number;
  name: string;
  address?: string;
}

export interface Author {
  id: number;
  name: string;
  nationality?: string;
}

export interface Loan {
  id: number;
  bookId: number;
  bookTitle: string;
  borrowerName: string;
  loanDate: string;
  returnDate?: string;
  returned: boolean;
}

export type ReadingStatus = 'WANT_TO_READ' | 'READING' | 'FINISHED';

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface BookFormData {
  title: string;
  genre: string;
  publisherId?: number;
  summary?: string;
  pageCount?: number;
  year?: string;
  isbn?: string;
}

export interface LoanFormData {
  bookId: number;
  borrowerName: string;
  loanDate: string;
}
