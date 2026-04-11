import { useEffect, useState } from 'react';
import { useLoans } from '../hooks/useLoans';
import { useAppStore } from '../store/appStore';
import { LoanCard } from '../components/loans/LoanCard';

export function LoansPage() {
  const { fetchLoans, returnLoan, removeLoan } = useLoans();
  const loans = useAppStore((s) => s.loans);
  const [filter, setFilter] = useState<'all' | 'active' | 'returned'>('all');

  useEffect(() => { fetchLoans(); }, [fetchLoans]);

  const filtered = loans.filter((l) => {
    if (filter === 'active') return !l.returned;
    if (filter === 'returned') return l.returned;
    return true;
  });

  const activeCount = loans.filter((l) => !l.returned).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Empréstimos</h1>
        {activeCount > 0 && (
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
            {activeCount} ativo{activeCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {(['all', 'active', 'returned'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f ? 'bg-amber-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? 'Todos' : f === 'active' ? 'Ativos' : 'Devolvidos'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">Nenhum empréstimo</p>
          <p className="text-sm mt-1">Registre empréstimos na tela de detalhe do livro</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((loan) => (
            <LoanCard key={loan.id} loan={loan} onReturn={returnLoan} onDelete={removeLoan} />
          ))}
        </div>
      )}
    </div>
  );
}
