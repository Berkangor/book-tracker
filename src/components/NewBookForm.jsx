// NewBookForm.jsx
import { useState } from "react";

/**
 * @typedef {object} NewBookPayload
 * @property {string} title
 * @property {string} author
 * @property {'okundu' | 'okunacak'} status
 * @property {string} category - Kitabın türü
 * @property {string | undefined} endDate
 * @property {number | undefined} rating
 */

/**
 * Yeni kitap ekleme formu.
 * @param {{ onSubmit: (payload: NewBookPayload) => void }} props
 */
export function NewBookForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("okunacak"); // "okundu" | "okunacak"
  const [category, setCategory] = useState("roman"); // 💥 YENİ: Kategori state'i
  const [endDate, setEndDate] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState(null); 

  const isRead = status === "okundu";

  // Durum (status) değiştiğinde Bitiş Tarihi ve Puanı temizler.
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    
    // Mantıksal tutarlılık için, okunacak duruma geçtiyse tarih/puan temizlenir.
    if (newStatus === 'okunacak') {
        setEndDate('');
        setRating('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); 

    // 1. Temel Validasyon: Başlık ve Yazar Kontrolü
    if (!title.trim() || !author.trim()) {
      setError("Lütfen Kitap Adı ve Yazar alanlarını doldurun.");
      return;
    }

    // 2. Gelişmiş Validasyon: Puan ve Durum Kontrolü
    const isRated = rating && Number(rating) >= 1;
    if (isRated && status !== "okundu") {
      setError("Puanlama sadece 'Okundu' durumundaki kitaplar için yapılabilir.");
      return;
    }
    
    // 3. Payload Oluşturma
    const payload = {
      title: title.trim(),
      author: author.trim(),
      status,
      category, // 💥 YENİ ALAN EKLENDİ
      // Tarih ve puan sadece isRead true ise ve değerleri varsa payload'a eklenir.
      endDate: isRead && endDate ? endDate : undefined,
      rating: isRead && isRated ? Number(rating) : undefined,
    };

    onSubmit(payload);
    
    // 4. Formu Sıfırlama
    setTitle("");
    setAuthor("");
    setEndDate("");
    setRating("");
    setCategory("roman"); // 💥 Kategori de sıfırlandı
    setStatus("okunacak");
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2 className="card-title">Yeni Kitap Ekle</h2>

      {error && (
        <div className="badge danger" role="alert" style={{ padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <div className="form-grid">
        {/* Satır 1: Başlık */}
        <div className="form-group">
          <label htmlFor="title">Kitap Adı</label>
          <input
            id="title"
            type="text"
            placeholder="Örn: Suç ve Ceza"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Satır 2: Yazar */}
        <div className="form-group">
          <label htmlFor="author">Yazar</label>
          <input
            id="author"
            type="text"
            placeholder="Örn: Dostoyevski"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        {/* Satır 3: Okuma Durumu */}
        <div className="form-group">
          <label htmlFor="status">Okuma Durumu</label>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange} 
          >
            <option value="okunacak">Okunacak</option>
            <option value="okundu">Okundu</option>
          </select>
        </div>
        
        {/* Satır 4: Kategori (YENİ ALAN) */}
        <div className="form-group">
            <label htmlFor="category">Kategori</label>
            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="roman">📖 Roman</option>
                <option value="selfhelp">🌱 Kişisel Gelişim</option>
                <option value="science">🔬 Bilim/Teknoloji</option>
                <option value="history">🏰 Tarih</option>
                <option value="thriller">🔎 Polisiye/Gerilim</option>
                <option value="unknown">🔖 Diğer</option>
            </select>
        </div>

        {/* Satır 5: Bitiş Tarihi (Okundu ise Etkin) */}
        <div className="form-group">
          <label htmlFor="endDate">Bitiş Tarihi {isRead ? "" : "(Sadece Okundu İçin)"}</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={!isRead} 
          />
        </div>

        {/* Satır 6: Puan (Okundu ise Etkin) */}
        <div className="form-group">
          <label htmlFor="rating">Puan (1-5)</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value || "")}
            disabled={!isRead} 
          >
            <option value="">Seçilmedi</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn primary">
        Ekle
      </button>
    </form>
  );
}