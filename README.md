📚 Basit Kitap Okuma Takipçisi (Book Tracker)
Basit Kitap Okuma Takipçisi, okuma alışkanlıklarınızı düzenlemenize, ilerlemenizi kaydetmenize ve okuma listenizi yönetmenize yardımcı olan minimal bir Tek Sayfalı Uygulamadır (SPA). Tüm verileriniz tarayıcınızın yerel depolamasında (localStorage) saklanır, böylece kişisel bilgileriniz güvende kalır ve sayfa yenilense bile kaybolmaz.

✨ Özellikler
Veri Kalıcılığı: Tüm kitaplar ve puanlar yerel tarayıcı belleğinde saklanır.

Kategori Bazlı Filtreleme: Roman, Bilim, Tarih gibi kategorilere ait ikonlara tıklayarak listeyi anında filtreleme.

Akıllı Filtreler: Kitap adı ve yazara göre anlık arama ile okuma durumu filtresi.

Durum Yönetimi: Kitapları "Okundu" ve "Okunacak" olarak işaretleme.

Kullanıcı Dostu Form: Duruma göre (Okundu/Okunacak) Bitiş Tarihi ve Puanlama alanlarının dinamik olarak etkinleştirilmesi.

Okuma Önerileri: Son okuma geçmişinize göre kişiselleştirilmiş motivasyon ve strateji önerileri.

Tema Desteği: Tek tuşla Karanlık (Dark) ve Aydınlık (Light) modlar arasında geçiş yapabilme.

💻 Teknolojik Yapı
Bu proje, modern web geliştirme standartları kullanılarak oluşturulmuştur:

Frontend: React

Geliştirme Ortamı: Vite

Durum Yönetimi: React useState ve useReducer Hook'ları

Kalıcılık: Özel useLocalStorage Hook'u

Stil: Saf CSS ve CSS Değişkenleri (--var) ile Dark Mode desteği

🚀 Kurulum ve Başlatma
Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları takip edin.

Ön Koşullar
Projenin çalışması için bilgisayarınızda Node.js (ve npm) kurulu olmalıdır.

1. Depoyu Klonlama
git clone https://github.com/Berkangor/book-tracker.git

cd book-tracker

3. Bağımlılıkları Yükleme
Projenin bağımlılıklarını ve ID oluşturma kütüphanesini (uuid) yükleyin:

npm install

# Veya: npm install --legacy-peer-deps

3. Geliştirme Sunucusunu Başlatma
Projenizi yerel ortamda çalıştırmak için:

npm run dev

📝 Kullanım
Kitap Ekleme
Sol taraftaki "Yeni Kitap Ekle" formunu kullanın.

**"Okuma Durumu"**nu "Okundu" olarak seçtiğinizde, Bitiş Tarihi ve Puan alanları otomatik olarak aktif olacaktır.

Eksik bilgi (Kitap Adı veya Yazar) girilmesi durumunda anlık hata mesajı alırsınız.

Filtreleme
Hızlı Filtre: Kitaplarım listesinin hemen üzerindeki ikonlara (📖, 🌱, 🔬 vb.) tıklayarak kategorilere göre filtreleme yapabilirsiniz.

Arama/Durum: Sol sütundaki Filtreler bölümünde kitap adı/yazara göre arama yapabilir veya okuma durumuna göre (Okundu/Okunacak) filtre uygulayabilirsiniz.

Veri Yönetimi
Eklenen tüm veriler, tarayıcınızın Geliştirici Araçları > Application > Local Storage sekmesinde books anahtarı altında JSON formatında saklanır.
