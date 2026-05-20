'use client';
/**
 * @file app/components/ArticlesHub.tsx
 * @description Hub unique : TOUS les articles (40 technos x 5 + 20 IA),
 * recherche + filtre par categorie, trilingue.
 */
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { catalog } from '../lib/library';
import { useLang } from '../lib/i18n';
import { CategoryVisual } from './CategoryVisual';
import testingJson from '../lib/testing-articles.json';

interface TestArticle { n: number; category: string; title: string; summary: string }
const testing = testingJson as TestArticle[];

interface Row {
  href: string;
  title: string;
  subtitle: string;
  category: string;
  tech: string;
}

export function ArticlesHub() {
  const { t, dir } = useLang();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('*');

  const rows: Row[] = useMemo(() => {
    const r: Row[] = [];
    for (const tch of catalog.techIndex) {
      for (const a of tch.articles) {
        r.push({
          href: `/tech/${tch.slug}/${a.slug}`,
          title: a.title,
          subtitle: a.subtitle,
          category: tch.category,
          tech: tch.name,
        });
      }
    }
    for (const a of catalog.ai) {
      r.push({
        href: `/ia/${a.slug}`,
        title: a.title,
        subtitle: a.subtitle,
        category: 'IA',
        tech: 'IA',
      });
    }
    for (const a of testing) {
      r.push({
        href: `/testing/${a.n}`,
        title: a.title,
        subtitle: a.summary,
        category: 'Testing / QA',
        tech: a.category[0].toUpperCase() + a.category.slice(1),
      });
    }
    return r;
  }, []);

  const cats = useMemo(
    () => ['*', ...Array.from(new Set(rows.map((x) => x.category)))],
    [rows]
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return rows.filter((x) => {
      if (cat !== '*' && x.category !== cat) return false;
      if (!s) return true;
      return (
        x.title.toLowerCase().includes(s) ||
        x.subtitle.toLowerCase().includes(s) ||
        x.tech.toLowerCase().includes(s)
      );
    });
  }, [rows, q, cat, ]);

  return (
    <div style={{ direction: dir }}>
      <header className="mb-8">
        <span className="tag">{t('nav.articles')}</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-3 gradient-text">
          {t('articles.title')}
        </h1>
        <p className="text-lg" style={{ color: '#93C5FD' }}>{t('articles.sub')}</p>
      </header>

      <div className="sticky top-20 z-30 py-3 mb-6"
        style={{ background: 'rgba(10,31,68,0.85)', backdropFilter: 'blur(8px)' }}>
        <div className="relative mb-3">
          <Search size={18} className="absolute top-3.5 left-3" style={{ color: '#93C5FD' }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('articles.search')}
            className="w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
            style={{ background: '#102D5C', color: '#F8FAFC', border: '1px solid rgba(255,255,255,0.12)' }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
              style={
                cat === c
                  ? { background: '#FCD34D', color: '#0A1F44' }
                  : { background: 'rgba(255,255,255,0.06)', color: 'rgba(248,250,252,0.8)' }
              }
            >
              {c === '*' ? t('articles.all') : c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm mb-4" style={{ color: '#93C5FD' }}>
        {filtered.length} / {rows.length}
      </p>

      {filtered.length === 0 ? (
        <p style={{ color: 'rgba(248,250,252,0.7)' }}>{t('articles.none')}</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.slice(0, 400).map((x, i) => (
            <Link key={i} href={x.href} className="gradient-border p-5 block transition hover:scale-[1.01]">
              <div className="flex items-center gap-2 mb-2">
                <span className="tag">{x.category}</span>
                <span className="text-xs" style={{ color: '#60A5FA' }}>{x.tech}</span>
              </div>
              <p className="font-bold text-white leading-snug">{x.title}</p>
              <p className="text-sm mt-1" style={{ color: '#93C5FD' }}>{x.subtitle}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12">
        <CategoryVisual category="IA" />
      </div>
    </div>
  );
}
