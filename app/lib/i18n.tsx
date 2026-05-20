'use client';
/**
 * @file app/lib/i18n.tsx
 * @description Contexte de langue FR/EN/AR (avec RTL pour l'arabe).
 * Persistance localStorage, mise a jour de <html lang/dir>.
 */
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Lang } from './library';
import { tr } from './library';

interface Ctx {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<Ctx>({
  lang: 'fr',
  dir: 'ltr',
  setLang: () => {},
  t: (k) => k,
});

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('salistar-lang') as Lang | null;
      if (saved && ['fr', 'en', 'ar'].includes(saved)) setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem('salistar-lang', lang);
    } catch {}
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const t = useCallback((k: string) => tr(k, lang), [lang]);
  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LangContext.Provider value={{ lang, dir, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
