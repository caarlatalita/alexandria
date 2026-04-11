import { BookOpen, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-amber-800 text-white shadow-md sticky top-0 z-20">
      <div className="flex items-center gap-4 px-4 py-3">
        <button onClick={onMenuToggle} className="p-1 rounded hover:bg-amber-700 lg:hidden">
          <Menu size={22} />
        </button>
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-wide">
          <BookOpen size={24} />
          Alexandria
        </Link>
      </div>
    </header>
  );
}
