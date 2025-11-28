
import { useState, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid'; 

import { useLocalStorage } from "./hooks/useLocalStorage";
import { filterBooks } from "./utils/filterBooks";
import { NewBookForm } from "./components/NewBookForm";
import { BookList } from "./components/BookList";
import { Recommendations } from "./components/Recommendations";
import { CategoryFilterButtons } from "./components/CategoryFilterButtons"; 
import { ThemeToggle } from "./components/ThemeToggle"; 

import "./styles.css";

export default function App() {
    // --- STATE VE LOKAL DEPOLAMA ---
    const [books, setBooks] = useLocalStorage("books", []);
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("hepsi");
    const [categoryFilter, setCategoryFilter] = useState('all'); 


    // --- EYLEM YÖNETİCİLERİ (CALLBACKS) ---

    // 1. Kitap Ekleme (useCallback)
    const handleAddBook = useCallback((book) => {
        const newBook = {
            id: uuidv4(), // Benzersiz ID oluşturma standardı
            ...book,
        };
        setBooks((prev) => [newBook, ...prev]); 
    }, [setBooks]);

    // 2. Durum Değiştirme (useCallback)
    const handleToggleStatus = useCallback((id) => {
        setBooks((prev) =>
            prev.map((book) => {
                if (book.id !== id) return book;
                
                const newStatus = book.status === "okundu" ? "okunacak" : "okundu";
                
                // Durum 'okunacak' olduğunda, bitiş tarihi ve puanı temizle.
                return {
                    ...book,
                    status: newStatus,
                    endDate: newStatus === 'okunacak' ? undefined : book.endDate,
                    rating: newStatus === 'okunacak' ? undefined : book.rating,
                };
            })
        );
    }, [setBooks]);

    // 3. Kitap Silme (useCallback)
    const handleDeleteBook = useCallback((id) => {
        if (!window.confirm("Bu kitabı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) return;
        setBooks((prev) => prev.filter((b) => b.id !== id));
    }, [setBooks]);


    // --- HESAPLANMIŞ DEĞERLER (MEMOIZATION) ---

    // Filtrelenmiş listeyi sadece durumlar değiştiğinde hesapla.
    const filteredBooks = useMemo(() => {
        return filterBooks({
            books,
            searchText,
            status: statusFilter,
            category: categoryFilter, 
        });
    }, [books, searchText, statusFilter, categoryFilter]); 


    return (
        <div className="app">
            <header className="app-header">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <h1>📚 Basit Kitap Okuma Takipçisi</h1>
                    <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                        <ThemeToggle />
                    </div>
                </div>
                
                <p className="muted">
                    Okuduklarınızı, okuyacaklarınızı ve puanlarınızı tek yerden takip edin.
                </p>
            </header>

            <main className="app-main">
                <div className="layout-grid">
                    
                    {/* SOL SÜTUN */}
                    <div className="left-column">
                        <NewBookForm onSubmit={handleAddBook} />
                        
                        {/* Arama/Durum Filtreleme Alanı */}
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
                        
                        {/* Kategori Hızlı Filtre Butonları */}
                        <CategoryFilterButtons 
                            activeCategory={categoryFilter}
                            onSelectCategory={setCategoryFilter}
                        />

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