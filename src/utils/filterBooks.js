// filterBooks.jsx

/**
 * @typedef {object} Book
 * @property {string} title
 * @property {string} author
 * @property {'okundu' | 'okunacak'} status
 * // ... diğer kitap özellikleri
 */

/**
 * Kitap listesini arama metnine ve okuma durumuna göre filtreler.
 *
 * @param {{ 
 * books: Book[], 
 * searchText: string, 
 * status: 'hepsi' | 'okundu' | 'okunacak' 
 * }} options
 * @returns {Book[]} - Filtrelenmiş kitapların dizisi.
 */
export function filterBooks({ books, searchText, status }) {
    
    // 1. Arama Metnini Standartlaştırma
    const normalizedSearch = searchText.trim().toLowerCase();

    // 2. Filtreleme İşlemi
    return books.filter((book) => {
        
        // --- Durum (Status) Filtresi ---
        // Eğer durum "hepsi" değilse VE kitabın durumu seçilen durumla eşleşmiyorsa FALSE döndür
        const passesStatusFilter = 
            status === "hepsi" || book.status === status;

        if (!passesStatusFilter) {
            return false;
        }

        // --- Arama (Search) Filtresi ---
        // Eğer arama metni boşsa, bu filtreyi geçer (TRUE döndürür).
        if (!normalizedSearch) {
            return true;
        }

        // Başlık ve yazar alanlarını arama için birleştirme ve küçük harfe çevirme
        const searchTarget = `${book.title} ${book.author}`.toLowerCase();
        
        // Arama metni, birleştirilmiş metin içinde var mı?
        return searchTarget.includes(normalizedSearch);
    });
}