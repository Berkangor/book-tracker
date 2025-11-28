import { BookCard } from "./BookCard";

export function BookList({ books, onToggleStatus, onDelete }) {
  if (!books.length) {
    return (
      <div className="card empty">
        <p className="muted">Henüz hiç kitap eklenmemiş.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
