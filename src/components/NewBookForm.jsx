import { useState } from "react";

export function NewBookForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("okunacak"); // "okundu" | "okunacak"
  const [endDate, setEndDate] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const payload = {
      title: title.trim(),
      author: author.trim(),
      status,
      endDate: endDate || undefined,
      rating: rating ? Number(rating) : undefined,
    };

    onSubmit(payload);

    setTitle("");
    setAuthor("");
    setEndDate("");
    setRating("");
    setStatus("okunacak");
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2 className="card-title">Yeni Kitap Ekle</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Kitap Adı</label>
          <input
            type="text"
            placeholder="Örn: Suç ve Ceza"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Yazar</label>
          <input
            type="text"
            placeholder="Örn: Dostoyevski"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Okuma Durumu</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="okunacak">Okunacak</option>
            <option value="okundu">Okundu</option>
          </select>
        </div>

        <div className="form-group">
          <label>Bitiş Tarihi (opsiyonel)</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Puan (1-5, opsiyonel)</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value || "")}
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
