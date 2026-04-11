import { useState } from 'react';
import { PlusCircle, Star } from 'lucide-react';
import { bookService } from '../services/bookService';
import { useAppStore } from '../store/appStore';

const MOCK_BOOKS = [
  { id: 'm1', title: 'O Nome do Vento', author: 'Patrick Rothfuss', genre: 'Fantasia', rating: 4.8 },
  { id: 'm2', title: '1984', author: 'George Orwell', genre: 'Distopia', rating: 4.9 },
  { id: 'm3', title: 'Duna', author: 'Frank Herbert', genre: 'Ficção Científica', rating: 4.7 },
  { id: 'm4', title: 'O Alquimista', author: 'Paulo Coelho', genre: 'Ficção', rating: 4.5 },
  { id: 'm5', title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'História', rating: 4.6 },
  { id: 'm6', title: 'O Poder do Hábito', author: 'Charles Duhigg', genre: 'Autoajuda', rating: 4.4 },
  { id: 'm7', title: 'Clean Code', author: 'Robert C. Martin', genre: 'Tecnologia', rating: 4.7 },
  { id: 'm8', title: 'Dom Casmurro', author: 'Machado de Assis', genre: 'Literatura Brasileira', rating: 4.3 },
  { id: 'm9', title: 'A Revolução dos Bichos', author: 'George Orwell', genre: 'Fábula', rating: 4.7 },
  { id: 'm10', title: 'Harry Potter e a Pedra Filosofal', author: 'J.K. Rowling', genre: 'Fantasia', rating: 4.9 },
  { id: 'm11', title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', genre: 'Clássico', rating: 4.8 },
  { id: 'm12', title: 'Fundação', author: 'Isaac Asimov', genre: 'Ficção Científica', rating: 4.6 },
];

export function ExplorePage() {
  const { addToast } = useAppStore();
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const handleAdd = async (book: typeof MOCK_BOOKS[0]) => {
    try {
      await bookService.create({ title: book.title, genre: book.genre });
      setAdded((prev) => new Set(prev).add(book.id));
      addToast(`"${book.title}" adicionado ao seu acervo!`);
    } catch {
      addToast('Erro ao adicionar livro.', 'error');
    }
  };

  const filtered = search
    ? MOCK_BOOKS.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.genre.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      )
    : MOCK_BOOKS;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Explorar Títulos</h1>
        <p className="text-sm text-gray-500 mt-1">Descubra novos livros para o seu acervo</p>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar títulos, autores ou gêneros..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((book) => (
          <div key={book.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col gap-3">
            <div>
              <p className="font-semibold text-gray-800">{book.title}</p>
              <p className="text-sm text-gray-500">{book.author}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-xs text-gray-500">{book.rating}</span>
                <span className="text-xs text-gray-400 ml-2 px-2 py-0.5 bg-gray-100 rounded-full">{book.genre}</span>
              </div>
            </div>
            <button
              onClick={() => handleAdd(book)}
              disabled={added.has(book.id)}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                added.has(book.id) ? 'bg-green-100 text-green-700' : 'bg-amber-700 text-white hover:bg-amber-800'
              }`}
            >
              <PlusCircle size={14} />
              {added.has(book.id) ? 'Adicionado!' : 'Adicionar ao Acervo'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
