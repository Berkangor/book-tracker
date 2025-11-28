// components/ThemeToggle.jsx
import { useState, useEffect } from 'react';

// İkonlar için basit semboller kullanıyoruz
const SunIcon = '☀️';
const MoonIcon = '🌙';

export function ThemeToggle() {
    // Tema durumunu localStorage'dan alarak başlatır
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return false; // Sunucu tarafı kontrolü
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    // Tema durumu değiştiğinde çalışır
    useEffect(() => {
        const body = document.body;
        
        if (isDark) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <button 
            className="btn outline small" 
            onClick={toggleTheme}
            aria-label={isDark ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
            style={{ marginLeft: '1rem', alignSelf: 'center', fontWeight: 'bold' }}
        >
            {isDark ? SunIcon : MoonIcon}
            <span style={{ marginLeft: '5px' }}>{isDark ? 'Aydınlık' : 'Karanlık'}</span>
        </button>
    );
}