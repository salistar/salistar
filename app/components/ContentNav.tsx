'use client';
/**
 * @file app/components/ContentNav.tsx
 * @description Barre de navigation superieure des pages de contenu, trilingue,
 * avec selecteur de langue.
 */
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { LangSwitch } from './LangSwitch';

export function ContentNav({ back }: { back?: { href: string; label?: string } }) {
  const { t, dir } = useLang();
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      style={{ backgroundColor: 'rgba(10,31,68,0.95)', backdropFilter: 'blur(20px)', direction: dir }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
        <Link
          href={back?.href ?? '/'}
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: '#93C5FD' }}
        >
          <ArrowLeft size={16} style={{ transform: dir === 'rtl' ? 'scaleX(-1)' : 'none' }} />
          {back?.label ?? t('nav.home')}
        </Link>
        <div className="flex items-center gap-1 text-sm flex-wrap justify-end">
          <Link href="/cv" className="px-3 py-1.5 rounded-lg hover:bg-white/5" style={{ color: 'rgba(248,250,252,0.85)' }}>
            {t('nav.cv')}
          </Link>
          <Link href="/articles" className="px-3 py-1.5 rounded-lg hover:bg-white/5" style={{ color: 'rgba(248,250,252,0.85)' }}>
            {t('nav.articles')}
          </Link>
          <Link href="/tech" className="px-3 py-1.5 rounded-lg hover:bg-white/5" style={{ color: 'rgba(248,250,252,0.85)' }}>
            {t('nav.library')}
          </Link>
          <Link href="/ia" className="px-3 py-1.5 rounded-lg hover:bg-white/5" style={{ color: 'rgba(248,250,252,0.85)' }}>
            {t('nav.ia')}
          </Link>
          <span className="ml-2"><LangSwitch /></span>
        </div>
      </div>
    </nav>
  );
}
