'use client';
import { Youtube } from 'lucide-react';
import { useLang } from '../lib/i18n';

export function VideoLink({ query }: { query: string }) {
  const { t, lang } = useLang();
  const q = encodeURIComponent(`${query} tutorial ${lang === 'fr' ? 'francais' : lang}`);
  const href = `https://www.youtube.com/results?search_query=${q}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm inline-flex items-center gap-2">
      <Youtube size={16} style={{ color: '#FF0033' }} /> {t('articles.video')}
    </a>
  );
}
