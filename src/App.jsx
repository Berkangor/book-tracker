// App.jsx (Geliştirilmiş Sürüm)

import { useState, useMemo, useCallback } from "react";
// Projenize 'npm install uuid' ile eklemeyi unutmayın
import { v4 as uuidv4 } from 'uuid'; 

import { useLocalStorage } from "./hooks/useLocalStorage";
import { filterBooks } from "./utils/filterBooks";
import { NewBookForm } from "./components/NewBookForm";
import { BookList } from "./components/BookList";
import { Recommendations } from "./components/Recommendations";
import "./styles.css";

export default function App() {
  // --- STATE VE LOKAL DEPOLAMA ---
  const [books, setBooks] = useLocalStorage("books", []);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("hepsi");

  // --- EYLEM YÖNETİCİLERİ (CALLBACKS) ---

  // 1. Kitap Ekleme: Performansı artırmak için useCallback kullanılır
  const handleAddBook = useCallback((book) => {
    const newBook = {
      id: uuidv4(), // Benzersiz ID oluşturma standardı
      ...book,
    };
    // Yeni kitapları listenin başına ekle
    setBooks((prev) => [newBook, ...prev]); 
  }, [setBooks]);

  // 2. Durum Değiştirme: useCallback kullanılır
  const handleToggleStatus = useCallback((id) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== id) return book;
        
        // Durumu değiştir
        const newStatus = book.status === "okundu" ? "okunacak" : "okundu";
        
        // Durum 'okunacak' olduğunda, bitiş tarihi ve puanı temizle.
        // Durum 'okundu' olduğunda, mevcut tarih ve puan bilgisini koru.
        return {
          ...book,
          status: newStatus,
          endDate: newStatus === 'okunacak' ? undefined : book.endDate,
          rating: newStatus === 'okunacak' ? undefined : book.rating,
        };
      })
    );
  }, [setBooks]);

  // 3. Kitap Silme: useCallback kullanılır
  const handleDeleteBook = useCallback((id) => {
    if (!window.confirm("Bu kitabı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) return;
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, [setBooks]);

  // --- HESAPLANMIŞ DEĞERLER (MEMOIZATION) ---

  // Filtrelenmiş listeyi sadece 'books', 'searchText' veya 'statusFilter' değiştiğinde hesapla.
  const filteredBooks = useMemo(() => {
    return filterBooks({
      books,
      searchText,
      status: statusFilter,
    });
  }, [books, searchText, statusFilter]);


  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Basit Kitap Okuma Takipçisi</h1>
        <p className="muted">
          Okuduklarınızı, okuyacaklarınızı ve puanlarınızı tek yerden takip edin.
        </p>
      </header>

      <main className="app-main">
        <div className="layout-grid">
          
          {/* SOL SÜTUN */}
          <div className="left-column">
            <NewBookForm onSubmit={handleAddBook} />
            
            {/* Filtreleme Arayüzü */}
            <section className="card filters">
              <h2 className="card-title">Filtreler</h2>
              <div className="filters-grid">
                <div className="form-group">
                  <label htmlFor="search-input">Arama</label>
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Kitap adı veya yazar..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status-filter">Durum</label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="hepsi">Hepsi</option>
                    <option value="okunacak">Okunacak</option>
                    <option value="okundu">Okundu</option>
                  </select>
                </div>
              </div>
            </section>
            
            {/* Tavsiyeler Bileşeni */}
            <Recommendations books={books} />
          </div>

          {/* SAĞ SÜTUN: KİTAP LİSTESİ */}
          <div className="right-column">
            <section className="card">
              <div className="card-header">
                <h2 className="card-title">Kitaplarım</h2>
                <span className="muted small">
                  Toplam: {books.length} | Gösterilen: {filteredBooks.length}
                </span>
              </div>
              <BookList
                books={filteredBooks}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteBook}
              />
            </section>
          </div>
        </div>
      </main>

      <footer className="app-footer muted small">
        Verileriniz tarayıcınızın <code>localStorage</code>'ında saklanır. Sayfa
        yenilense bile kaybolmaz.
      </footer>
    </div>
  );
}