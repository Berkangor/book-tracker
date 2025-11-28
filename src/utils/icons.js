// utils/icons.js (veya BookCard'ın hemen üstüne)

export const CATEGORY_ICONS = {
  roman: '📖',
  selfhelp: '🌱',
  science: '🔬',
  history: '🏰',
  thriller: '🔎',
  unknown: '🔖',
};

export function getCategoryIcon(categoryCode) {
    const code = categoryCode ? categoryCode.toLowerCase() : 'unknown';
    return CATEGORY_ICONS[code] || CATEGORY_ICONS.unknown;
}