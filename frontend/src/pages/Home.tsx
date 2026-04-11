import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Compass, PlusCircle } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import { useAppStore } from '../store/appStore';

export function Home() {
  const { fetchBooks, page } = useBooks();
  const loans = useAppStore((s) => s.loans);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  const activeLoans = loans.filter((l) => !l.returned).length;

  const stats = [
    { label: 'Livros no Acervo', value: page?.totalElements ?? '—', icon: BookOpen, color: 'bg-amber-100 text-amber-700' },
    { label: 'Empréstimos Ativos', value: activeLoans, icon: Users, color: 'bg-blue-100 text-blue-700' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Bem-vindo ao Alexandria 📚</h1>
        <p className="text-gray-500 mt-1">Sua biblioteca pessoal digital</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/books/add" className="flex items-center gap-3 bg-amber-700 text-white px-5 py-4 rounded-xl hover:bg-amber-800 transition-colors">
          <PlusCircle size={22} />
          <div>
            <p className="font-semibold">Adicionar Livro</p>
            <p className="text-sm text-amber-200">Cadastrar novo título</p>
          </div>
        </Link>
        <Link to="/explore" className="flex items-center gap-3 bg-white border border-amber-300 text-amber-800 px-5 py-4 rounded-xl hover:bg-amber-50 transition-colors">
          <Compass size={22} />
          <div>
            <p className="font-semibold">Explorar Títulos</p>
            <p className="text-sm text-amber-600">Descobrir novos livros</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
