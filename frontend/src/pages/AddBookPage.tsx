import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BookForm } from '../components/books/BookForm';
import { bookService } from '../services/bookService';
import { useAppStore } from '../store/appStore';
import type { BookFormData } from '../types';

export function AddBookPage() {
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: BookFormData) => {
    setLoading(true);
    try {
      const book = await bookService.create({ title: data.title, genre: data.genre, publisherId: data.publisherId });
      if (data.summary || data.pageCount || data.year || data.isbn) {
        await bookService.createDetail(book.id, {
          summary: data.summary || '',
          pageCount: data.pageCount || 0,
          year: data.year || '',
          isbn: data.isbn || '',
        });
      }
      addToast('Livro adicionado com sucesso!');
      navigate('/books');
    } catch {
      addToast('Erro ao adicionar livro.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Adicionar Livro</h1>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <BookForm onSubmit={handleSubmit} submitLabel="Adicionar Livro" loading={loading} />
      </div>
    </div>
  );
}
