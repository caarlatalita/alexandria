import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, BookOpen } from 'lucide-react';
import { bookService } from '../services/bookService';
import type { Book, BookDetail } from '../types';
import { useAppStore } from '../store/appStore';
import { LoanForm } from '../components/loans/LoanForm';
import { useLoans } from '../hooks/useLoans';

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const { createLoan } = useLoans();
  const [book, setBook] = useState<Book | null>(null);
  const [detail, setDetail] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoanForm, setShowLoanForm] = useState(false);

  useEffect(() => {
    if (!id) return;
    const bookId = Number(id);
    setLoading(true);
    Promise.all([
      bookService.getById(bookId),
      bookService.getDetail(bookId).catch(() => null),
    ]).then(([b, d]) => {
      setBook(b);
      setDetail(d);
    }).catch(() => {
      addToast('Erro ao carregar livro.', 'error');
    }).finally(() => setLoading(false));
  }, [id, addToast]);

  const handleDelete = async () => {
    if (!book || !window.confirm('Remover este livro?')) return;
    try {
      await bookService.delete(book.id);
      addToast('Livro removido!');
      navigate('/books');
    } catch {
      addToast('Erro ao remover.', 'error');
    }
  };

  if (loading) return <div className="flex justify-center py-16"><div className="animate-spin h-8 w-8 border-b-2 border-amber-700 rounded-full" /></div>;
  if (!book) return <div className="text-center py-16 text-gray-400">Livro não encontrado</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-2">
          <Link to={`/books/${book.id}/edit`} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Edit2 size={16} />
          </Link>
          <button onClick={handleDelete} className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-4 bg-amber-100 rounded-xl">
            <BookOpen size={32} className="text-amber-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-gray-500 mt-1">{book.genre}</p>
            {book.publisher && <p className="text-sm text-gray-400 mt-1">Editora: {book.publisher.name}</p>}
          </div>
        </div>

        {detail && (
          <div className="mt-6 border-t pt-4 space-y-3">
            <h2 className="font-semibold text-gray-700">Detalhes</h2>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {detail.year && <div><p className="text-gray-400">Ano</p><p className="font-medium">{detail.year}</p></div>}
              {detail.pageCount > 0 && <div><p className="text-gray-400">Páginas</p><p className="font-medium">{detail.pageCount}</p></div>}
              {detail.isbn && <div><p className="text-gray-400">ISBN</p><p className="font-medium">{detail.isbn}</p></div>}
            </div>
            {detail.summary && <div><p className="text-gray-400 text-sm">Resumo</p><p className="text-sm mt-1">{detail.summary}</p></div>}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700">Empréstimo</h2>
          {!showLoanForm && (
            <button
              onClick={() => setShowLoanForm(true)}
              className="text-sm bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800"
            >
              Registrar Empréstimo
            </button>
          )}
        </div>
        {showLoanForm && (
          <LoanForm
            bookId={book.id}
            bookTitle={book.title}
            onSubmit={(data) => { createLoan(data); setShowLoanForm(false); }}
            onCancel={() => setShowLoanForm(false)}
          />
        )}
      </div>
    </div>
  );
}
