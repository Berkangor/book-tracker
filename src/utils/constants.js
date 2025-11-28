// utils/constants.js
export const CATEGORY_ICONS = {
    // Kategori Kodu : { icon: Sembol, label: Türkçe Adı }
    all: { icon: '📚', label: 'Hepsi' },
    roman: { icon: '📖', label: 'Roman' },
    selfhelp: { icon: '🌱', label: 'Kişisel Gelişim' },
    science: { icon: '🔬', label: 'Bilim/Teknoloji' },
    history: { icon: '🏰', label: 'Tarih' },
    thriller: { icon: '🔎', label: 'Polisiye/Gerilim' },
    unknown: { icon: '🔖', label: 'Diğer' }
};

export const CATEGORIES_ARRAY = Object.keys(CATEGORY_ICONS);