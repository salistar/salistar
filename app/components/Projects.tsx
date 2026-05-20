'use client';
/**
 * @file app/components/Projects.tsx
 * @description Section Projets (trilingue) — compilee depuis l'historique :
 * SallyCards, GoWithSally, Salorie, Salistar, Sally Suite, Infra DevOps.
 * Captures d'ecran reelles + flux Local -> GitHub -> CI/CD -> Cloud.
 */
import { ExternalLink } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { catalog } from '../lib/library';
import { Pipeline } from './Pipeline';

export function Projects() {
  const { lang, t, dir } = useLang();
  return (
    <section id="projects" className="px-6 py-20" style={{ direction: dir }}>
      <div className="max-w-6xl mx-auto">
        <span className="tag">{t('home.projects.title')}</span>
        <h2
          className="text-3xl md:text-4xl font-bold mt-3 mb-2 gradient-text"
          style={{ fontFamily: "'Playfair Display','Cairo',Georgia,serif" }}
        >
          {t('home.projects.title')}
        </h2>
        <p className="text-lg mb-10" style={{ color: 'rgba(248,250,252,0.75)' }}>
          {t('home.projects.sub')}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {catalog.projects.map((p) => (
            <div key={p.slug} className="gradient-border overflow-hidden flex flex-col">
              <div className={`h-44 bg-gradient-to-br ${p.color} relative overflow-hidden`}>
                {p.shot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.shot}
                    alt={p.name}
                    className="w-full h-full object-cover object-top opacity-90"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black text-white/90" style={{ fontFamily: "'Playfair Display',serif" }}>
                      {p.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs inline-flex items-center gap-1" style={{ color: '#60A5FA' }}>
                      <ExternalLink size={13} /> {p.url.replace('https://', '')}
                    </a>
                  )}
                </div>
                <p className="text-sm mt-1 mb-2" style={{ color: '#FCD34D' }}>{p.tag[lang]}</p>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(248,250,252,0.8)' }}>
                  {p.desc[lang]}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.stack.map((s) => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3
            className="text-2xl md:text-3xl font-bold mb-2 text-center gradient-text"
            style={{ fontFamily: "'Playfair Display','Cairo',Georgia,serif" }}
          >
            {t('home.pipeline.title')}
          </h3>
          <p className="text-center mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(248,250,252,0.72)' }}>
            {t('home.pipeline.sub')}
          </p>
          <Pipeline />
        </div>
      </div>
    </section>
  );
}
