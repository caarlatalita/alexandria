import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { Home } from './pages/Home';
import { BooksPage } from './pages/BooksPage';
import { AddBookPage } from './pages/AddBookPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { EditBookPage } from './pages/EditBookPage';
import { LoansPage } from './pages/LoansPage';
import { ExplorePage } from './pages/ExplorePage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header onMenuToggle={() => setSidebarOpen((o) => !o)} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/books/add" element={<AddBookPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/books/:id/edit" element={<EditBookPage />} />
              <Route path="/loans" element={<LoansPage />} />
              <Route path="/explore" element={<ExplorePage />} />
            </Routes>
          </main>
        </div>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
