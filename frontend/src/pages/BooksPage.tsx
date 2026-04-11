import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import { BookCard } from '../components/books/BookCard';
import { Pagination } from '../components/common/Pagination';
import { useAppStore } from '../store/appStore';

export function BooksPage() {
  const { fetchBooks, page, loading, deleteBook } = useBooks();
  const books = useAppStore((s) => s.books);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchBooks(currentPage); }, [fetchBooks, currentPage]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja remover este livro?')) return;
    await deleteBook(id);
    fetchBooks(currentPage);
  };

  const filtered = search
    ? books.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()) || b.genre.toLowerCase().includes(search.toLowerCase()))
    : books;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Meus Livros</h1>
        <span className="text-sm text-gray-500">{page?.totalElements ?? 0} livros</span>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por título ou gênero..."
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">Nenhum livro encontrado</p>
          <p className="text-sm mt-1">Adicione seu primeiro livro!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {page && (
        <Pagination
          currentPage={currentPage}
          totalPages={page.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
