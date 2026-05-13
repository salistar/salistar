/**
 * @file app/projects/[slug]/page.tsx
 * @description Page détail bilingue (FR/EN) pour un projet du portfolio.
 * Le toggle FR/EN est géré côté client via useState — pas de re-render
 * SSR, pas d'URL différente : on charge les deux langues en SSG et on
 * affiche celle choisie. Format ~2 pages A4 par langue.
 */
'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Sparkles } from 'lucide-react';
import { PROJECTS, type Locale } from '../../lib/content';
import { notFound } from 'next/navigation';

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = PROJECTS.find((p) => p.slug === slug);
  const [locale, setLocale] = useState<Locale>('fr');

  if (!project) return notFound();

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <div className="grid-pattern fixed inset-0 -z-10 opacity-60" aria-hidden />
      <div
        className="glow-orb -z-10"
        style={{ top: '-20%', left: '-10%', width: '500px', height: '500px', background: '#f5b13a' }}
        aria-hidden
      />
      <div
        className="glow-orb -z-10"
        style={{ top: '50%', right: '-10%', width: '600px', height: '600px', background: '#ec5990' }}
        aria-hidden
      />

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#97a0b4] hover:text-[#e7e9ee] transition">
            <ArrowLeft size={16} /> {locale === 'fr' ? 'Retour' : 'Back'}
          </Link>
          <LocaleToggle locale={locale} onChange={setLocale} />
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pt-32 pb-32">
        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
              <Sparkles size={20} className="text-[#0a0e1a]" />
            </div>
            <span className="tag">Project</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            <span className="gradient-text">{project.name}</span>
          </h1>
          <p className="text-xl text-[#97a0b4] mb-6">{project.tagline[locale]}</p>
          <p className="text-lg text-[#e7e9ee]/90 leading-relaxed mb-6">{project.hero[locale]}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {project.metrics.map((m) => (
              <div key={m.label.en} className="gradient-border p-5 text-center">
                <p className="text-3xl font-bold gradient-text">{m.value}</p>
                <p className="text-xs text-[#97a0b4] mt-2">{m.label[locale]}</p>
              </div>
            ))}
          </div>
        )}

        {/* Sections */}
        <div className="space-y-10">
          {project.sections.map((s, i) => (
            <section key={i} className="gradient-border p-7">
              <h2 className="text-2xl font-bold mb-4 text-white">{s.title[locale]}</h2>
              <div className="text-[#e7e9ee]/90 leading-relaxed whitespace-pre-wrap">
                {s.body[locale]}
              </div>
            </section>
          ))}
        </div>

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                <ExternalLink size={16} /> {l.label}
              </a>
            ))}
          </div>
        )}

        {/* Author signature */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-[#5cd2c4]/10 via-transparent to-[#ec5990]/10 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f5b13a] via-[#ec5990] to-[#5cd2c4] flex items-center justify-center font-black text-[#0a0e1a] text-xl shadow-lg flex-shrink-0">
              IK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#97a0b4] font-mono tracking-wider mb-1">
                {locale === 'fr' ? 'CONÇU & DÉVELOPPÉ PAR' : 'DESIGNED & BUILT BY'}
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
        <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
          <Link href="/" className="text-sm text-[#97a0b4] hover:text-[#5cd2c4] inline-flex items-center gap-2">
            <ArrowLeft size={14} /> {locale === 'fr' ? 'Tous les projets' : 'All projects'}
          </Link>
          <a href="https://github.com/salistar" target="_blank" rel="noopener noreferrer" className="text-sm text-[#97a0b4] hover:text-[#5cd2c4] inline-flex items-center gap-2">
            <Github size={14} /> @salistar
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

// Note: generateStaticParams cannot live in a 'use client' file. The route
// is rendered on demand and cached at the CDN level by Cloudflare.
