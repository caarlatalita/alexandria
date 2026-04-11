import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="p-2 rounded-lg border border-amber-300 disabled:opacity-40 hover:bg-amber-50"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-sm text-gray-600">
        Página {currentPage + 1} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="p-2 rounded-lg border border-amber-300 disabled:opacity-40 hover:bg-amber-50"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
