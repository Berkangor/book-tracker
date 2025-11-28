import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { filterBooks } from "./utils/filterBooks";
import { NewBookForm } from "./components/NewBookForm";
import { BookList } from "./components/BookList";
import { Recommendations } from "./components/Recommendations";
import "./styles.css";

export default function App() {
  const [books, setBooks] = useLocalStorage("books", []);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("hepsi");

  const handleAddBook = (book) => {
    const newBook = {
      id: Date.now().toString(),
      ...book,
    };
    setBooks((prev) => [newBook, ...prev]);
  };

  const handleToggleStatus = (id) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id
          ? {
              ...book,
              status: book.status === "okundu" ? "okunacak" : "okundu",
            }
          : book
      )
    );
  };

  const handleDeleteBook = (id) => {
    if (!window.confirm("Bu kitabı silmek istediğinize emin misiniz?")) return;
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const filteredBooks = filterBooks({
    books,
    searchText,
    status: statusFilter,
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Basit Kitap Okuma Takipçisi</h1>
        <p className="muted">
          Okuduklarınızı, okuyacaklarınızı ve puanlarınızı tek yerden takip
          edin.
        </p>
      </header>

      <main className="app-main">
        <div className="layout-grid">
          <div className="left-column">
            <NewBookForm onSubmit={handleAddBook} />

            <section className="card filters">
              <h2 className="card-title">Filtreler</h2>
              <div className="filters-grid">
                <div className="form-group">
                  <label>Arama</label>
                  <input
                    type="text"
                    placeholder="Kitap adı veya yazar..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Durum</label>
                  <select
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

            <Recommendations books={books} />
          </div>

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
