import api from './api';
import type { Book, BookDetail, PageResponse } from '../types';

export const bookService = {
  async getAll(page = 0, size = 10): Promise<PageResponse<Book>> {
    const { data } = await api.get('/books', { params: { page, size } });
    return data;
  },

  async getById(id: number): Promise<Book> {
    const { data } = await api.get(`/books/${id}`);
    return data;
  },

  async create(book: { title: string; genre: string; publisherId?: number }): Promise<Book> {
    const { data } = await api.post('/books', book);
    return data;
  },

  async update(id: number, book: { title: string; genre: string; publisherId?: number }): Promise<Book> {
    const { data } = await api.put(`/books/${id}`, book);
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/books/${id}`);
  },

  async getDetail(bookId: number): Promise<BookDetail> {
    const { data } = await api.get(`/books/${bookId}/detail`);
    return data;
  },

  async createDetail(bookId: number, detail: Omit<BookDetail, 'bookId'>): Promise<BookDetail> {
    const { data } = await api.post(`/books/${bookId}/detail`, detail);
    return data;
  },

  async updateDetail(bookId: number, detail: Omit<BookDetail, 'bookId'>): Promise<BookDetail> {
    const { data } = await api.put(`/books/${bookId}/detail`, detail);
    return data;
  },
};
