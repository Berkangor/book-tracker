// Recommendations.jsx

// --- Mantık Fonksiyonu (Dışarıda Tutulur) ---

/**
 * Kitap listesinden son okunan 5 kitabın ortalama puanına göre 
 * okuma stratejileri önerir.
 * @param {Array<Object>} books - Tüm kitapların listesi.
 * @returns {Array<string>} - Kullanıcıya özel tavsiyeler listesi.
 */
function getRecommendations(books) {
  // 1. Filtreleme ve Sıralama: Sadece Puanlanmış Okunmuş Kitaplar ve En Yeniler
  const readAndRatedBooks = books
    .filter((b) => b.status === "okundu" && b.rating >= 1 && typeof b.rating === "number");

  const latestReadBooks = readAndRatedBooks
    .sort((a, b) => {
      // Tarih karşılaştırması için basit matematiksel yöntem (ms cinsinden)
      const ad = a.endDate ? new Date(a.endDate).getTime() : 0;
      const bd = b.endDate ? new Date(b.endDate).getTime() : 0;
      return bd - ad; // En yeni tarihi en başa getirir
    })
    .slice(0, 5); // Son 5 kitabı alır

  // 2. Erken Dönüş: Hiç Puanlanmış Kitap Yoksa
  if (latestReadBooks.length === 0) {
    return [
      "Kısa, akıcı bir romanla başlayın: Örneğin, modern çağdaş bir Türk romanı seçebilirsiniz.",
      "İlginizi çeken türden, ince bir kitap seçip günlük 10-15 sayfa okumayı hedefleyin.",
      "Okuma alışkanlığını oturtmak için, her gün aynı saat aralığını kendinize 'okuma saati' ilan edin.",
    ];
  }

  // 3. Puan Ortalamasını Hesaplama
  const totalRating = latestReadBooks.reduce((sum, b) => sum + (b.rating || 0), 0);
  const avgRating = totalRating / latestReadBooks.length;
  
  // Tavsiye Setleri
  if (avgRating >= 4) {
    return [
      "Son okuduğunuz ve yüksek puan verdiğiniz türde bir kitap daha seçin; beğendiğiniz yazarlardan devam etmek motivasyon sağlar.",
      "Sevdiğiniz türdeki kitaplar için bir seri veya üçleme (trilogy) bulun ve ilk kitabı listenize ekleyin.",
      "Okuma listenize, klasikler arasından yüksek puanlı, sevdiğiniz türle harmanlanmış bir roman ekleyin.",
    ];
  }

  if (avgRating >= 3) {
    return [
      "Farklı türler deneyin: Eğer hep roman okuyorsanız, bu kez kişisel gelişim veya biyografi deneyebilirsiniz.",
      "Kitap seçerken, birkaç sayfasını önceden okuyarak dil ve anlatımın size hitap edip etmediğini test edin.",
      "Ortalama beğendiğiniz kitapları, okuma önceliğini düşürerek daha çok merak uyandıran kitapları listenin başına alın.",
    ];
  }

  // Ortalamanın 3'ün altında olduğu durum
  return [
    "Okumayı keyifli hale getirmek için, uzun ve ağır kitaplar yerine kısa öykü derlemeleriyle başlayın.",
    "Arkadaşlarınızdan veya çevrimiçi topluluklardan, sizi içine çeken ve sürükleyici kitap önerileri isteyin.",
    "Daha önce yarım bırakıp ama potansiyel gördüğünüz bir kitabı tekrar deneyin; belki doğru zamanı şimdi gelmiştir.",
  ];
}


// --- Bileşen ---

/**
 * Kullanıcının okuma geçmişine dayalı önerileri gösteren bileşen.
 * @param {{ books: Array<Object> }} props
 */
export function Recommendations({ books }) {
  // Mantık tamamen getRecommendations fonksiyonunda olduğu için bileşen temiz kalır.
  const suggestions = getRecommendations(books);

  return (
    <section className="card recommendations">
      <h2 className="card-title">Sizin İçin Önerilenler</h2>
      
      {/* Listeyi gösterme */}
      <ul className="recommendation-list">
        {suggestions.map((text, idx) => (
          <li key={idx}>{text}</li>
        ))}
      </ul>
      
      {/* Açıklama metni */}
      <p className="muted small">
        Öneriler, okuma geçmişinizdeki son {suggestions.length > 0 ? 5 : 0} kitabın puan ortalamasına göre otomatik oluşturulur.
      </p>
    </section>
  );
}