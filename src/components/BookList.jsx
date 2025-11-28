// BookList.jsx
import { BookCard } from "./BookCard";

/**
 * @typedef {object} Book - Kitap nesnesinin tipi
 * @property {string} id
 * @property {string} title
 * // ... diğer kitap özellikleri
 */

/**
 * Kitap listesi bileşeni.
 * @param {{ 
 * books: Book[], 
 * onToggleStatus: (id: string) => void, 
 * onDelete: (id: string) => void 
 * }} props
 */
export function BookList({ books, onToggleStatus, onDelete }) { // Destructuring kullanıldı
  
  // 📚 Liste boşsa erken dönüş (Early Return)
  if (!books || books.length === 0) {
    return (
      <div className="card empty">
        <p className="muted">Henüz hiç kitap eklenmemiş. Hemen sağdaki formu kullanarak ilk kitabınızı ekleyin!</p>
      </div>
    );
  }

  // 📖 Kitapları listeleme
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          // 🔑 Her zaman listenin öğesi için benzersiz bir 'key' kullanılmalıdır.
          key={book.id} 
          book={book}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}