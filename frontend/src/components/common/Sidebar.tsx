import { BookOpen, BookMarked, PlusCircle, Users, Compass, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { to: '/', label: 'Início', icon: BookOpen, end: true },
  { to: '/books', label: 'Meus Livros', icon: BookMarked, end: false },
  { to: '/books/add', label: 'Adicionar Livro', icon: PlusCircle, end: false },
  { to: '/loans', label: 'Empréstimos', icon: Users, end: false },
  { to: '/explore', label: 'Explorar', icon: Compass, end: false },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-amber-900 text-amber-50 z-30 transform transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-amber-700">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <nav className="p-4 space-y-1 mt-4 lg:mt-8">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-amber-700 text-white' : 'hover:bg-amber-800'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
