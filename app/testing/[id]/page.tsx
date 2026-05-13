/**
 * @file app/testing/[id]/page.tsx
 * @description Page détail bilingue (FR/EN) pour un article de testing.
 * Format ~2-3 pages A4 par langue. Toggle FR/EN côté client.
 */
'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Github } from 'lucide-react';
import { ARTICLES_DETAIL, type Locale } from '../../lib/content';
import { notFound } from 'next/navigation';

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  // Accept both numeric id and slug
  const article = ARTICLES_DETAIL.find(
    (a) => a.slug === id || String(a.id) === id || String(a.id).padStart(2, '0') === id,
  );
  const [locale, setLocale] = useState<Locale>('fr');

  if (!article) return notFound();

  // Estimate word count (rough — for the reading-time pill)
  const text = (article.body?.[locale] ?? article.summary[locale]) ?? '';
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 230));

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <div className="grid-pattern fixed inset-0 -z-10 opacity-60" aria-hidden />
      <div
        className="glow-orb -z-10"
        style={{ top: '-20%', left: '-10%', width: '500px', height: '500px', background: '#5cd2c4' }}
        aria-hidden
      />

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/#testing" className="inline-flex items-center gap-2 text-sm text-[#97a0b4] hover:text-[#e7e9ee] transition">
            <ArrowLeft size={16} /> {locale === 'fr' ? 'Tous les articles' : 'All articles'}
          </Link>
          <LocaleToggle locale={locale} onChange={setLocale} />
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pt-32 pb-32">
        {/* Header meta */}
        <div className="flex items-center gap-3 mb-6 text-xs font-mono text-[#97a0b4] flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen size={14} />
            Article {String(article.id).padStart(2, '0')}
          </span>
          <span>·</span>
          <span className="capitalize">{article.category}</span>
          <span>·</span>
          <span>{minutes} min {locale === 'fr' ? 'de lecture' : 'read'}</span>
          {article.body === null && (
            <>
              <span>·</span>
              <span className="text-amber-400">
                {locale === 'fr' ? 'Version complète à venir' : 'Full version coming soon'}
              </span>
            </>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
          {article.title[locale]}
        </h1>
        <p className="text-xl text-[#5cd2c4] mb-8">{article.summary[locale]}</p>

        {/* Body */}
        <div className="prose prose-invert max-w-none">
          {article.body ? (
            <div className="text-[#e7e9ee]/90 leading-relaxed whitespace-pre-wrap text-[16px]">
              {article.body[locale]}
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm">
              {locale === 'fr'
                ? "La version longue de cet article est en cours de rédaction. Pour l'instant, le résumé ci-dessus + les notes courtes dans la grille principale couvrent les points clés."
                : 'The long-form version of this article is being written. For now, the summary above + the short notes in the main grid cover the key points.'}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {article.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* Author signature */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-[#5cd2c4]/10 via-transparent to-[#ec5990]/10 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f5b13a] via-[#ec5990] to-[#5cd2c4] flex items-center justify-center font-black text-[#0a0e1a] text-xl shadow-lg flex-shrink-0">
              IK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#97a0b4] font-mono tracking-wider mb-1">
                {locale === 'fr' ? 'ÉCRIT PAR' : 'WRITTEN BY'}
              </p>
              <p className="text-lg font-bold text-white">Idriss Kriouile</p>
              <p className="text-sm text-[#97a0b4]">
                {locale === 'fr'
                  ? 'Fondateur de SallyStar · Full-stack engineer · Morocco'
                  : 'Founder of SallyStar · Full-stack engineer · Morocco'}
              </p>
            </div>
            <a
              href="mailto:salistarcompany@gmail.com"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#5cd2c4] bg-[#5cd2c4]/10 border border-[#5cd2c4]/30 hover:bg-[#5cd2c4]/20 transition flex-shrink-0"
            >
              {locale === 'fr' ? 'Contact' : 'Get in touch'}
            </a>
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between flex-wrap gap-3">
          <Link href="/#testing" className="text-sm text-[#97a0b4] hover:text-[#5cd2c4] inline-flex items-center gap-2">
            <ArrowLeft size={14} /> {locale === 'fr' ? 'Retour aux 50 articles' : 'Back to the 50 articles'}
          </Link>
          <a
            href="https://github.com/salistar/SallyCards/blob/main/docs/TESTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#97a0b4] hover:text-[#5cd2c4] inline-flex items-center gap-2"
          >
            <Github size={14} /> {locale === 'fr' ? 'Source repo' : 'Source repo'}
          </a>
        </div>
      </article>
    </main>
  );
}

function LocaleToggle({ locale, onChange }: { locale: Locale; onChange: (l: Locale) => void }) {
  return (
    <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/10">
      {(['fr', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
            locale === l ? 'bg-white text-[#0a0e1a]' : 'text-[#97a0b4] hover:text-white'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
