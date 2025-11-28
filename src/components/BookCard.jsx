// BookCard.jsx
/**
 * @typedef {object} Book
 * @property {string} id - Kitabın benzersiz kimliği.
 * @property {string} title - Kitabın başlığı.
 * @property {string} author - Kitabın yazarı.
 * @property {'okundu' | 'okunacak'} status - Kitabın okuma durumu.
 * @property {number | null} rating - 1 ile 5 arasında puan.
 * @property {string | null} endDate - Okuma bitiş tarihi (ISO formatı).
 */

/**
 * Kitap kartı bileşeni.
 * @param {{ book: Book, onToggleStatus: (id: string) => void, onDelete: (id: string) => void }} props
 */
export function BookCard({ book, onToggleStatus, onDelete }) {
  const { id, title, author, status, rating, endDate } = book;
  
  // Unicode Yıldız Karakteri (Daha güvenilir)
  const STAR_CHAR = '\u2605'; 
  
  const isRead = status === "okundu";

  const renderStars = () => {
    if (!rating || rating < 1) return <span className="muted small">Puanlanmadı</span>;
    
    const stars = Array.from({ length: 5 }, (_, i) => i < rating);
    
    return (
      <span className="stars" aria-label={`${rating} yıldız`}>
        {stars.map((active, idx) => (
          <span key={idx} className={active ? "star active" : "star"}>
            {STAR_CHAR}
          </span>
        ))}
      </span>
    );
  };

  const formattedDate = endDate ? new Date(endDate).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) : null;

  return (
    <article className="book-card card">
      
      {/* BAŞLIK VE YAZAR */}
      <div className="book-main">
        <h3 className="book-title">{title}</h3>
        <p className="book-author muted">{author}</p>
      </div>

      {/* META BİLGİLERİ (DURUM VE PUAN) */}
      <div className="book-meta">
        <div className="book-status">
          <span
            className={
              isRead ? "badge badge-success" : "badge badge-info"
            }
          >
            {isRead ? "Okundu" : "Okunacak"}
          </span>
          {formattedDate && (
            <span className="muted small" title={`Bitiş tarihi: ${formattedDate}`}>
              Bitiş: {formattedDate}
            </span>
          )}
        </div>
        
        <div className="book-rating">{renderStars()}</div>
      </div>

      {/* EYLEMLER (BUTONLAR) */}
      <div className="book-actions">
        <button
          className="btn outline small"
          onClick={() => onToggleStatus(id)}
        >
          {isRead ? "Tekrar Okunacak" : "Okundu İşaretle"}
        </button>
        <button className="btn danger small" onClick={() => onDelete(id)}>
          Sil
        </button>
      </div>
    </article>
  );
}