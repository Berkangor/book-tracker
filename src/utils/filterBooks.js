// status: "hepsi" | "okundu" | "okunacak"
export function filterBooks({ books, searchText, status }) {
  const normalizedSearch = searchText.trim().toLowerCase();

  return books.filter((book) => {
    if (status !== "hepsi" && book.status !== status) {
      return false;
    }

    if (!normalizedSearch) return true;

    const haystack = `${book.title} ${book.author}`.toLowerCase();
    return haystack.includes(normalizedSearch);
  });
}
