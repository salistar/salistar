'use client';
/**
 * @file app/components/CvBody.tsx
 * @description Page CV trilingue (FR/EN/AR) avec 3 telechargements PDF.
 */
import { Download } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { catalog } from '../lib/library';

export function CvBody() {
  const { lang, dir } = useLang();
  const cv = catalog.cvI18n[lang];
  return (
    <div style={{ direction: dir }}>
      <header className="mb-10 flex flex-col md:flex-row md:items-center gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={catalog.photo}
          alt={cv.name}
          width={160}
          height={160}
          className="rounded-full flex-shrink-0"
          style={{ width: 160, height: 160, border: '3px solid rgba(252,211,77,0.55)' }}
        />
        <div className="flex-1 min-w-0">
          <span className="tag">CV</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-3 mb-1 gradient-text">{cv.name}</h1>
          <p className="text-lg" style={{ color: '#FCD34D' }}>{cv.title}</p>
          <p className="text-sm mt-2" style={{ color: '#93C5FD' }}>
            {cv.contact.location} · {cv.contact.phone} · {cv.contact.email}
          </p>
          <p className="text-sm" style={{ color: '#93C5FD' }}>
            {cv.contact.linkedin} · {cv.contact.github} · {cv.contact.site}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(['fr', 'en', 'ar'] as const).map((l) => (
              <a
                key={l}
                href={catalog.cvPdf[l]}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <Download size={15} /> PDF {l.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className="gradient-border p-7 mb-8 cv-rise">
        <h2 className="text-2xl font-bold mb-3 text-white">{cv.labels.profile}</h2>
        <p className="leading-relaxed" style={{ color: 'rgba(248,250,252,0.88)' }}>{cv.profile}</p>
        <p className="text-sm mt-3" style={{ color: '#93C5FD' }}>{cv.labels.status} : {cv.status}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">{cv.labels.skills}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {cv.skills.map((s) => (
            <div key={s.cat} className="gradient-border p-5">
              <p className="font-bold mb-1" style={{ color: '#FCD34D' }}>{s.cat}</p>
              <p className="text-sm" style={{ color: 'rgba(248,250,252,0.82)' }}>{s.items}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">{cv.labels.experience}</h2>
        <div className="space-y-5">
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
      </section>

      <section className="mb-8 grid md:grid-cols-2 gap-4">
        <div className="gradient-border p-6">
          <h2 className="text-xl font-bold mb-3 text-white">{cv.labels.education}</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm" style={{ color: 'rgba(248,250,252,0.85)' }}>
            {cv.education.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
        <div className="gradient-border p-6">
          <h2 className="text-xl font-bold mb-3 text-white">{cv.labels.languages}</h2>
          <p className="text-sm" style={{ color: 'rgba(248,250,252,0.85)' }}>{cv.languages}</p>
        </div>
      </section>
    </div>
  );
}
