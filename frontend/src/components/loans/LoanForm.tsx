import { useState } from 'react';
import type { LoanFormData } from '../../types';

interface LoanFormProps {
  bookId: number;
  bookTitle: string;
  onSubmit: (data: LoanFormData & { bookTitle: string }) => void;
  onCancel: () => void;
}

export function LoanForm({ bookId, bookTitle, onSubmit, onCancel }: LoanFormProps) {
  const [form, setForm] = useState({
    borrowerName: '',
    loanDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, bookId, bookTitle });
  };

  const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Livro</label>
        <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{bookTitle}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Destinatário *</label>
        <input
          value={form.borrowerName}
          onChange={(e) => setForm((p) => ({ ...p, borrowerName: e.target.value }))}
          required
          className={inputCls}
          placeholder="Ex: João Silva"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Data do Empréstimo *</label>
        <input
          type="date"
          value={form.loanDate}
          onChange={(e) => setForm((p) => ({ ...p, loanDate: e.target.value }))}
          required
          className={inputCls}
        />
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onCancel} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
          Cancelar
        </button>
        <button type="submit" className="flex-1 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800">
          Registrar
        </button>
      </div>
    </form>
  );
}
