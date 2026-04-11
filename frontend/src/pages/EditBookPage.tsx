import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BookForm } from '../components/books/BookForm';
import { bookService } from '../services/bookService';
import { useAppStore } from '../store/appStore';
import type { BookFormData, Book, BookDetail } from '../types';

export function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const [book, setBook] = useState<Book | null>(null);
  const [detail, setDetail] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const bookId = Number(id);
    Promise.all([bookService.getById(bookId), bookService.getDetail(bookId).catch(() => null)]).then(([b, d]) => {
      setBook(b);
      setDetail(d);
    });
  }, [id]);

  const handleSubmit = async (data: BookFormData) => {
    if (!book) return;
    setLoading(true);
    try {
      await bookService.update(book.id, { title: data.title, genre: data.genre, publisherId: data.publisherId });
      const detailPayload = {
        summary: data.summary || '',
        pageCount: data.pageCount || 0,
        year: data.year || '',
        isbn: data.isbn || '',
      };
      if (detail) {
        await bookService.updateDetail(book.id, detailPayload);
      } else if (data.summary || data.pageCount || data.year || data.isbn) {
        await bookService.createDetail(book.id, detailPayload);
      }
      addToast('Livro atualizado com sucesso!');
      navigate(`/books/${book.id}`);
    } catch {
      addToast('Erro ao atualizar livro.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!book) return <div className="flex justify-center py-16"><div className="animate-spin h-8 w-8 border-b-2 border-amber-700 rounded-full" /></div>;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Editar Livro</h1>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <BookForm
          initialData={{
            title: book.title,
            genre: book.genre,
            summary: detail?.summary,
            pageCount: detail?.pageCount,
            year: detail?.year,
            isbn: detail?.isbn,
          }}
          onSubmit={handleSubmit}
          submitLabel="Salvar Alterações"
          loading={loading}
        />
      </div>
    </div>
  );
}
