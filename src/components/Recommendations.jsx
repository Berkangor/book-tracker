function getRecommendations(books) {
  const readBooks = books
    .filter((b) => b.status === "okundu" && typeof b.rating === "number")
    .sort((a, b) => {
      const ad = a.endDate ? new Date(a.endDate).getTime() : 0;
      const bd = b.endDate ? new Date(b.endDate).getTime() : 0;
      return bd - ad;
    })
    .slice(0, 5);

  if (!readBooks.length) {
    return [
      "Kısa, akıcı bir romanla başlayın: Örneğin, modern çağdaş bir Türk romanı seçebilirsiniz.",
      "İlgi alanınıza göre (kişisel gelişim, tarih veya bilim), ince bir kitap seçip günlük 10-15 sayfa okuyun.",
      "Okuma alışkanlığını oturtmak için, her gün aynı saat aralığını kendinize 'okuma saati' ilan edin.",
    ];
  }

  const avgRating =
    readBooks.reduce((sum, b) => sum + (b.rating || 0), 0) /
    readBooks.length;

  if (avgRating >= 4) {
    return [
      "Son okuduğunuz ve yüksek puan verdiğiniz türde bir kitap daha seçin; beğendiğiniz yazarlardan devam etmek motivasyon sağlar.",
      "Sevdiğiniz türdeki kitaplar için bir seri veya üçleme (trilogy) bulun ve ilk kitabı listenize ekleyin.",
      "Okuma listenize, klasikler arasından yüksek puanlı bir roman ekleyin; sevdiğiniz türle harmanlanmış bir klasik seçebilirsiniz.",
    ];
  }

  if (avgRating >= 3) {
    return [
      "Farklı türler deneyin: Eğer hep roman okuyorsanız, bu kez kişisel gelişim veya biyografi deneyebilirsiniz.",
      "Kitap seçerken, birkaç sayfasını önceden okuyarak dil ve anlatımın size hitap edip etmediğini test edin.",
      "Ortalama beğendiğiniz kitapları, okuma önceliğini düşürerek daha çok merak uyandıran kitapları listenin başına alın.",
    ];
  }

  return [
    "Okumayı keyifli hale getirmek için, uzun ve ağır kitaplar yerine kısa öykü derlemeleriyle başlayın.",
    "Arkadaşlarınızdan veya çevrimiçi topluluklardan, sizi içine çeken ve sürükleyici kitap önerileri isteyin.",
    "Daha önce yarım bırakıp ama potansiyel gördüğünüz bir kitabı tekrar deneyin; belki doğru zamanı şimdi gelmiştir.",
  ];
}

export function Recommendations({ books }) {
  const suggestions = getRecommendations(books);

  return (
    <section className="card recommendations">
      <h2 className="card-title">Sizin İçin Önerilenler</h2>
      <ul className="recommendation-list">
        {suggestions.map((text, idx) => (
          <li key={idx}>{text}</li>
        ))}
      </ul>
      <p className="muted small">
        Öneriler, okuma geçmişinizdeki son kitapların puan ortalamasına göre
        otomatik oluşturulur.
      </p>
    </section>
  );
}
