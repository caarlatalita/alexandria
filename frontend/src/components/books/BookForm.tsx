import { useState } from 'react';
import type { BookFormData } from '../../types';

interface BookFormProps {
  initialData?: Partial<BookFormData>;
  onSubmit: (data: BookFormData) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
}

export function BookForm({ initialData = {}, onSubmit, submitLabel = 'Salvar', loading }: BookFormProps) {
  const [form, setForm] = useState<BookFormData>({
    title: initialData.title || '',
    genre: initialData.genre || '',
    publisherId: initialData.publisherId,
    summary: initialData.summary || '',
    pageCount: initialData.pageCount,
    year: initialData.year || '',
    isbn: initialData.isbn || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
        <input name="title" value={form.title} onChange={handleChange} required className={inputCls} placeholder="Ex: O Senhor dos Anéis" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gênero *</label>
        <input name="genre" value={form.genre} onChange={handleChange} required className={inputCls} placeholder="Ex: Fantasia" />
      </div>
      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Detalhes (opcional)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
            <input name="year" value={form.year} onChange={handleChange} className={inputCls} placeholder="Ex: 1954" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Páginas</label>
            <input name="pageCount" type="number" value={form.pageCount || ''} onChange={handleChange} className={inputCls} placeholder="Ex: 500" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
          <input name="isbn" value={form.isbn} onChange={handleChange} className={inputCls} placeholder="Ex: 978-0-00-712944-3" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Resumo</label>
          <textarea name="summary" value={form.summary} onChange={handleChange} rows={3} className={inputCls} placeholder="Escreva um resumo..." />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-700 text-white py-2.5 rounded-lg font-medium hover:bg-amber-800 disabled:opacity-60 transition-colors"
      >
        {loading ? 'Salvando...' : submitLabel}
      </button>
    </form>
  );
}
