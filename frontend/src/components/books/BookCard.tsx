import { BookOpen } from 'lucide-react';
import { Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Book as BookType, ReadingStatus } from '../../types';
import { useAppStore } from '../../store/appStore';

const STATUS_LABELS: Record<ReadingStatus, string> = {
  WANT_TO_READ: 'Quero Ler',
  READING: 'Lendo',
  FINISHED: 'Finalizado',
};

const STATUS_COLORS: Record<ReadingStatus, string> = {
  WANT_TO_READ: 'bg-gray-100 text-gray-700',
  READING: 'bg-blue-100 text-blue-700',
  FINISHED: 'bg-green-100 text-green-700',
};

interface BookCardProps {
  book: BookType;
  onDelete?: (id: number) => void;
}

export function BookCard({ book, onDelete }: BookCardProps) {
  const { readingStatuses, setReadingStatus } = useAppStore();
  const status = readingStatuses[book.id] || 'WANT_TO_READ';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <BookOpen size={20} className="text-amber-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 line-clamp-2">{book.title}</h3>
            <p className="text-sm text-gray-500">{book.genre}</p>
          </div>
        </div>
      </div>

      <select
        value={status}
        onChange={(e) => setReadingStatus(book.id, e.target.value as ReadingStatus)}
        className={`text-xs font-medium px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_COLORS[status]}`}
      >
        {Object.entries(STATUS_LABELS).map(([val, label]) => (
          <option key={val} value={val}>{label}</option>
        ))}
      </select>

      <div className="flex items-center gap-2 mt-auto">
        <Link
          to={`/books/${book.id}`}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm text-amber-700 border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors"
        >
          <Eye size={14} /> Ver
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(book.id)}
            className="p-1.5 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
