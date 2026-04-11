import { useState, useCallback } from 'react';
import { bookService } from '../services/bookService';
import type { Book, PageResponse } from '../types';
import { useAppStore } from '../store/appStore';

export function useBooks() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<PageResponse<Book> | null>(null);
  const { setBooks, addToast } = useAppStore();

  const fetchBooks = useCallback(async (pageNum = 0, size = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getAll(pageNum, size);
      setPage(data);
      setBooks(data.content);
    } catch {
      setError('Erro ao carregar livros.');
      addToast('Erro ao carregar livros.', 'error');
    } finally {
      setLoading(false);
    }
  }, [setBooks, addToast]);

  const deleteBook = useCallback(async (id: number) => {
    try {
      await bookService.delete(id);
      addToast('Livro removido com sucesso!');
    } catch {
      addToast('Erro ao remover livro.', 'error');
      throw new Error('delete failed');
    }
  }, [addToast]);

  return { loading, error, page, fetchBooks, deleteBook };
}
