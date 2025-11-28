export function BookCard({ book, onToggleStatus, onDelete }) {
  const { id, title, author, status, rating, endDate } = book;

  const renderStars = () => {
    if (!rating) return <span className="muted">Puan yok</span>;
    const stars = Array.from({ length: 5 }, (_, i) => i < rating);
    return (
      <span className="stars">
        {stars.map((active, idx) => (
          <span key={idx} className={active ? "star active" : "star"}>
            ★
          </span>
        ))}
      </span>
    );
  };

  return (
    <article className="book-card card">
      <div className="book-main">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">{author}</p>
      </div>

      <div className="book-meta">
        <div className="book-status">
          <span
            className={
              status === "okundu" ? "badge badge-success" : "badge badge-info"
            }
          >
            {status === "okundu" ? "Okundu" : "Okunacak"}
          </span>
          {endDate && (
            <span className="muted small">
              Bitiş: {new Date(endDate).toLocaleDateString()}
            </span>
          )}
        </div>
        <div className="book-rating">{renderStars()}</div>
      </div>

      <div className="book-actions">
        <button
          className="btn outline small"
          onClick={() => onToggleStatus(id)}
        >
          {status === "okundu" ? "Tekrar Okunacak" : "Okundu İşaretle"}
        </button>
        <button className="btn danger small" onClick={() => onDelete(id)}>
          Sil
        </button>
      </div>
    </article>
  );
}
