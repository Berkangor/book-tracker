// useLocalStorage.jsx

import { useEffect, useState } from "react";

/**
 * React state'ini tarayıcının localStorage'ı ile senkronize eden özel bir hook.
 *
 * @param {string} key - localStorage anahtarı.
 * @param {any} initialValue - Başlangıç değeri.
 * @returns {[any, (value: any | (value: any) => any) => void]} - [mevcut değer, değeri ayarlama fonksiyonu]
 */
export function useLocalStorage(key, initialValue) {
  
  // 1. Durumu Başlatma (İlk Yükleme)
  const [value, setValue] = useState(() => {
    // Sunucu Tarafı İşleme (SSR/Next.js) kontrolü
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const stored = window.localStorage.getItem(key);
      // Depolamada veri varsa JSON'dan çöz, yoksa başlangıç değerini kullan
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error("useLocalStorage okuma hatası:", error);
      // Hata durumunda bile başlangıç değerini döndür
      return initialValue;
    }
  });

  // 2. Durumu localStorage'a Yazma (Değer veya Anahtar Değiştiğinde)
  useEffect(() => {
    // Sunucu Tarafı İşleme kontrolü
    if (typeof window === "undefined") {
      return;
    }
    
    try {
      // Değeri JSON string'e çevirip kaydet
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("useLocalStorage yazma hatası:", error);
    }
  }, [key, value]);


  // 3. Değer Güncelleme Fonksiyonunu Özelleştirme (Geliştirme)
  // Bu, React'teki setValue(prev => ...) kullanımını destekler.
  const setPersistedValue = (newValue) => {
    // Eğer newValue bir fonksiyon ise, mevcut değeri alarak yeni değeri hesapla
    const finalValue = 
      newValue instanceof Function ? newValue(value) : newValue;

    // React durumunu güncelle
    setValue(finalValue); 
    
    // Not: useEffect, React durum güncellemesi sonrası devreye girecek ve localStorage'a yazacaktır.
  };

  return [value, setPersistedValue];
}