import { Calendar, User, RotateCcw, Trash2 } from 'lucide-react';
import type { Loan } from '../../types';

interface LoanCardProps {
  loan: Loan;
  onReturn: (id: number) => void;
  onDelete: (id: number) => void;
}

export function LoanCard({ loan, onReturn, onDelete }: LoanCardProps) {
  const isOverdue = !loan.returned && new Date(loan.loanDate) < new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  return (
    <div className={`bg-white rounded-xl border p-4 flex flex-col gap-2 ${isOverdue ? 'border-red-300' : 'border-gray-100'}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-gray-800">{loan.bookTitle}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <User size={13} /> {loan.borrowerName}
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${loan.returned ? 'bg-green-100 text-green-700' : isOverdue ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
          {loan.returned ? 'Devolvido' : isOverdue ? 'Atrasado' : 'Ativo'}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Calendar size={12} />
        Emprestado em {new Date(loan.loanDate).toLocaleDateString('pt-BR')}
        {loan.returnDate && ` • Devolvido em ${new Date(loan.returnDate).toLocaleDateString('pt-BR')}`}
      </div>
      {!loan.returned && (
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => onReturn(loan.id)}
            className="flex-1 flex items-center justify-center gap-1 text-xs border border-green-300 text-green-700 py-1.5 rounded-lg hover:bg-green-50"
          >
            <RotateCcw size={12} /> Devolvido
          </button>
          <button
            onClick={() => onDelete(loan.id)}
            className="p-1.5 text-red-400 border border-red-200 rounded-lg hover:bg-red-50"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
