'use client';
/**
 * @file app/components/HomeCV.tsx
 * @description CV synchronise sur le home (trilingue) + telechargement PDF
 * FR/EN/AR + lien vers le CV complet.
 */
import Link from 'next/link';
import { Download, ArrowRight } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { catalog } from '../lib/library';

export function HomeCV() {
  const { lang, t, dir } = useLang();
  const cv = catalog.cvI18n[lang];

  return (
    <section id="cv" className="px-6 py-20" style={{ direction: dir }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="tag">{t('home.cv.title')}</span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-3 gradient-text"
              style={{ fontFamily: "'Playfair Display','Cairo',Georgia,serif" }}
            >
              {cv.name}
            </h2>
            <p className="text-lg mt-1" style={{ color: '#FCD34D' }}>{cv.title}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['fr', 'en', 'ar'] as const).map((l) => (
              <a
                key={l}
                href={catalog.cvPdf[l]}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                <Download size={15} /> PDF {l.toUpperCase()}
              </a>
            ))}
            <Link href="/cv" className="btn-primary text-sm">
              {t('home.cv.see')} <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className="gradient-border p-7 mb-6">
          <h3 className="text-xl font-bold mb-3 text-white">{cv.labels.profile}</h3>
          <p className="leading-relaxed" style={{ color: 'rgba(248,250,252,0.85)' }}>{cv.profile}</p>
          <p className="text-sm mt-3" style={{ color: '#93C5FD' }}>
            {cv.labels.status} : {cv.status}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {cv.skills.map((s) => (
            <div key={s.cat} className="gradient-border p-5">
              <p className="font-bold mb-1" style={{ color: '#FCD34D' }}>{s.cat}</p>
              <p className="text-sm" style={{ color: 'rgba(248,250,252,0.82)' }}>{s.items}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {cv.experience.map((e) => (
            <div key={e.company} className="gradient-border p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-bold text-white text-lg">{e.company}</p>
                <p className="text-sm" style={{ color: '#93C5FD' }}>{e.period}</p>
              </div>
              <p className="text-sm mb-3" style={{ color: '#FCD34D' }}>{e.role}</p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm" style={{ color: 'rgba(248,250,252,0.85)' }}>
                {e.bullets.map((b, i) => <li key={i} className="leading-relaxed">{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="gradient-border p-6">
            <h3 className="text-lg font-bold mb-3 text-white">{cv.labels.education}</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-sm" style={{ color: 'rgba(248,250,252,0.85)' }}>
              {cv.education.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
          <div className="gradient-border p-6">
            <h3 className="text-lg font-bold mb-3 text-white">{cv.labels.languages}</h3>
            <p className="text-sm" style={{ color: 'rgba(248,250,252,0.85)' }}>{cv.languages}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
