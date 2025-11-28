// filterBooks.jsx

/**
 * @typedef {object} Book
 * @property {string} title
 * @property {string} author
 * @property {'okundu' | 'okunacak'} status
 * @property {string} category // 💥 YENİ: Kategori alanı eklendi
 * // ... diğer kitap özellikleri
 */

/**
 * Kitap listesini arama metnine, okuma durumuna ve kategoriye göre filtreler.
 *
 * @param {{ 
 * books: Book[], 
 * searchText: string, 
 * status: 'hepsi' | 'okundu' | 'okunacak',
 * category: 'all' | string // 💥 YENİ: Kategori filtresi eklendi
 * }} options
 * @returns {Book[]} - Filtrelenmiş kitapların dizisi.
 */
export function filterBooks({ books, searchText, status, category }) { // 💥 category burada parçalandı
    
    // Arama Metnini Standartlaştırma
    const normalizedSearch = searchText.trim().toLowerCase();

    return books.filter((book) => {
        
        // --- 1. Durum (Status) Filtresi ---
        // Eğer durum "hepsi" değilse VE kitabın durumu seçilen durumla eşleşmiyorsa FALSE döndür
        const passesStatusFilter = 
            status === "hepsi" || book.status === status;

        if (!passesStatusFilter) {
            return false;
        }

        // 💥 2. YENİ: Kategori Filtresi ---
        // Eğer kategori "all" (hepsi) değilse VE kitabın kategorisi seçilen kategoriyle eşleşmiyorsa FALSE döndür
        const passesCategoryFilter = 
            category === "all" || book.category === category; 

        if (!passesCategoryFilter) {
            return false;
        }

        // --- 3. Arama (Search) Filtresi ---
        // Eğer arama metni boşsa, bu filtre zincirini geçer (TRUE döndürür).
        if (!normalizedSearch) {
            return true;
        }

        // Başlık ve yazar alanlarını arama için birleştirme ve küçük harfe çevirme
        const searchTarget = `${book.title} ${book.author}`.toLowerCase();
        
        // Arama metni, birleştirilmiş metin içinde var mı?
        return searchTarget.includes(normalizedSearch);
    });
}