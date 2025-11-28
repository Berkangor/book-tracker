// components/CategoryFilterButtons.jsx

import { CATEGORY_ICONS } from "../utils/constants";
import style from './CategoryFilterButtons.module.css'; // Yeni CSS modülü kullanın

export function CategoryFilterButtons({ activeCategory, onSelectCategory }) {
    
    // İkon verilerini diziye çevirme
    const categories = Object.entries(CATEGORY_ICONS); 

    return (
        <div className={style.categoryContainer}>
            {categories.map(([code, data]) => (
                <button
                    key={code}
                    className={
                        // Stil için clsx kullanabilirsiniz, ya da basitçe:
                        code === activeCategory 
                            ? `${style.button} ${style.active}` 
                            : style.button
                    }
                    onClick={() => onSelectCategory(code)}
                    title={data.label}
                >
                    {/* İkon */}
                    <span role="img" aria-label={data.label} style={{ marginRight: '5px' }}>
                        {data.icon}
                    </span>
                    {/* Metin (Sadece 'Hepsi' butonu için gösterebilirsiniz) */}
                    {code === 'all' && <span className={style.buttonText}>{data.label}</span>}
                </button>
            ))}
        </div>
    );
}