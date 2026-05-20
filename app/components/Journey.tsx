'use client';
/**
 * @file app/components/Journey.tsx
 * @description Parcours unifie (CV + timeline + pipeline) : du local au VPS,
 * trilingue, avec logos des entreprises (ALTEN/Worldline/SG, VISEO/Rocher,
 * Sylob/FORTERRO, HPS, Orange, Lafarge).
 */
import Link from 'next/link';
import { Download, ArrowRight, MapPin, Briefcase } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { catalog } from '../lib/library';
import { Pipeline } from './Pipeline';

// (sous-)logos a afficher selon le prefixe d'entreprise dans le CV
const COMPANY_LOGOS: { match: RegExp; logos: { src: string; label: string }[] }[] = [
  { match: /^ALTEN/i, logos: [
      { src: '/logos/alten.svg', label: 'ALTEN' },
      { src: '/logos/worldline.svg', label: 'Worldline' },
      { src: '/logos/societegenerale.svg', label: 'Société Générale' },
  ]},
  { match: /^VISEO/i, logos: [
      { src: '/logos/viseo.svg', label: 'VISEO' },
      { src: '/logos/rocher.svg', label: 'Groupe Rocher' },
  ]},
  { match: /^SYLOB|^FORTERRO/i, logos: [
      { src: '/logos/forterro.svg', label: 'FORTERRO / Sylob' },
  ]},
  { match: /^HPS/i, logos: [
      { src: '/logos/hps.svg', label: 'HPS' },
  ]},
  { match: /anterieures|earlier|previous/i, logos: [
      { src: '/logos/orange.svg', label: 'Orange Business' },
      { src: '/logos/lafarge.svg', label: 'Lafarge Maroc' },
  ]},
];

const STAGE_FOR = (idx: number, total: number) => {
  // 0 = VPS (prod), older roles map back to GitHub / Local
  const map = ['vps', 'cicd', 'github', 'local'] as const;
  return map[Math.min(idx, map.length - 1)];
};

const STAGE_COLOR: Record<string, string> = {
  local: '#60A5FA', github: '#F8FAFC', cicd: '#FCD34D', vps: '#34d399',
};

export function Journey() {
  const { lang, t, dir } = useLang();
  const cv = catalog.cvI18n[lang];

  return (
    <section id="journey" className="px-6 py-20" style={{ direction: dir }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="min-w-0">
            <span className="tag">{t('home.journey.title')}</span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-3 gradient-text"
              style={{ fontFamily: "'Playfair Display','Cairo',Georgia,serif" }}
            >
              {t('home.journey.title')}
            </h2>
            <p className="text-lg mt-1" style={{ color: 'rgba(248,250,252,0.78)' }}>{t('home.journey.sub')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['fr', 'en', 'ar'] as const).map((l) => (
              <a key={l} href={catalog.cvPdf[l]} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
                <Download size={14} /> PDF {l.toUpperCase()}
              </a>
            ))}
            <Link href="/cv" className="btn-primary text-sm">
              {t('home.cv.see')} <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Pipeline header */}
        <div className="mb-10">
          <Pipeline />
        </div>

        {/* Profil */}
        <div className="gradient-border p-7 mb-8 cv-rise">
          <h3 className="text-xl font-bold mb-3 text-white">{cv.labels.profile}</h3>
          <p className="leading-relaxed" style={{ color: 'rgba(248,250,252,0.86)' }}>{cv.profile}</p>
          <p className="text-sm mt-3" style={{ color: '#93C5FD' }}><MapPin size={14} className="inline mr-1" /> {cv.contact.location}</p>
        </div>

        {/* Skills compact */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {cv.skills.map((s) => (
            <div key={s.cat} className="gradient-border p-4">
              <p className="font-bold mb-1 text-sm" style={{ color: '#FCD34D' }}>{s.cat}</p>
              <p className="text-xs" style={{ color: 'rgba(248,250,252,0.78)' }}>{s.items}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute top-2 bottom-2 w-[3px] rounded-full"
            style={{
              left: dir === 'rtl' ? 'auto' : '17px',
              right: dir === 'rtl' ? '17px' : 'auto',
              background: 'linear-gradient(to bottom, #34d399, #FCD34D, #F8FAFC, #60A5FA)',
            }}
            aria-hidden
          />

          <div className="space-y-6">
            {cv.experience.map((e, i) => {
              const stage = STAGE_FOR(i, cv.experience.length);
              const stageColor = STAGE_COLOR[stage];
              const logos = COMPANY_LOGOS.find((c) => c.match.test(e.company))?.logos ?? [];
              return (
                <div key={i} className="relative" style={{ paddingLeft: dir === 'rtl' ? 0 : '50px', paddingRight: dir === 'rtl' ? '50px' : 0 }}>
                  {/* Stage badge dot */}
                  <div
                    className="absolute w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      top: '8px',
                      [dir === 'rtl' ? 'right' : 'left']: 0,
                      background: stageColor + '22',
                      border: `2px solid ${stageColor}`,
                      boxShadow: `0 0 18px ${stageColor}44`,
                    }}
                  >
                    <Briefcase size={16} style={{ color: stageColor }} />
                  </div>

                  <div className="gradient-border p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="min-w-0">
                        <p className="font-bold text-white text-lg leading-tight">{e.company}</p>
                        <p className="text-sm mt-0.5" style={{ color: '#FCD34D' }}>{e.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                          style={{ background: stageColor + '22', color: stageColor, border: `1px solid ${stageColor}55` }}
                        >
                          {t('pipeline.' + stage)}
                        </span>
                        <p className="text-sm" style={{ color: '#93C5FD' }}>{e.period}</p>
                      </div>
                    </div>

                    {logos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {logos.map((l) => (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img key={l.src} src={l.src} alt={l.label} title={l.label}
                            className="h-9 rounded-md" style={{ background: 'rgba(255,255,255,0.04)' }} />
                        ))}
                      </div>
                    )}

                    <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed" style={{ color: 'rgba(248,250,252,0.85)' }}>
                      {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education + langues */}
        <div className="grid md:grid-cols-2 gap-4 mt-10">
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
