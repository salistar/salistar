'use client';
/**
 * Hero — identite DevOps / Test QA Manager / Tech Lead, trilingue FR/EN/AR,
 * photo pro, telechargement du CV (PDF par langue) depuis le home.
 */
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Github, Download, FileText } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { catalog } from '../lib/library';

export function Hero() {
  const { lang, t, dir } = useLang();
  const cv = catalog.cvI18n[lang];

  const stats = [
    { value: '8+', label: { fr: "Ans d'experience", en: 'Years of experience', ar: 'سنوات خبرة' } },
    { value: '40', label: { fr: 'Technologies maitrisees', en: 'Technologies mastered', ar: 'تقنية متقنة' } },
    { value: '-70%', label: { fr: 'Interventions manuelles', en: 'Manual work', ar: 'تدخل يدوي' } },
    { value: '-60%', label: { fr: 'Bugs en production', en: 'Production bugs', ar: 'أخطاء الإنتاج' } },
  ];

  return (
    <section id="top" className="relative pt-36 pb-24 px-6" style={{ direction: dir }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="section-fade">
            <div
              className="inline-flex items-center gap-2.5 mb-7 px-5 py-2.5 rounded-full border"
              style={{ backgroundColor: 'rgba(252,211,77,0.12)', borderColor: 'rgba(252,211,77,0.4)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: '#FCD34D' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#FCD34D' }} />
              </span>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#FCD34D' }}>
                {t('hero.badge')}
              </span>
            </div>

            <h1
              className="font-black tracking-tighter leading-[0.98] mb-5"
              style={{ fontFamily: "'Playfair Display','Cairo',Georgia,serif", fontSize: 'clamp(2.6rem,6vw,5rem)', color: '#F8FAFC' }}
            >
              {t('hero.hi')} <span className="gradient-text">{cv.name}</span>.
              <span
                className="font-medium block mt-3"
                style={{ color: 'rgba(248,250,252,0.82)', fontSize: 'clamp(1.15rem,2.6vw,2rem)', fontFamily: "'Playfair Display','Cairo',Georgia,serif", fontStyle: 'italic' }}
              >
                {t('hero.tagline')}
              </span>
            </h1>

            <p className="text-lg max-w-2xl mb-8 leading-relaxed" style={{ color: 'rgba(248,250,252,0.78)' }}>
              {t('hero.intro')}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link href="/cv" className="btn-primary">
                <FileText size={18} /> {t('hero.viewcv')} <ArrowRight size={16} />
              </Link>
              <a href={catalog.cvPdf[lang]} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Download size={18} /> {cv.labels.download}
              </a>
              <a href="mailto:Idriss.kriouile.pro@gmail.com" className="btn-ghost">
                <Mail size={18} /> {t('hero.contact')}
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: 'rgba(248,250,252,0.65)' }}>
              <a href="https://github.com/idriss-kriouile" target="_blank" rel="noopener noreferrer" className="hero-link inline-flex items-center gap-2">
                <Github size={16} /> github.com/idriss-kriouile
              </a>
              <span className="inline-flex items-center gap-2"><MapPin size={16} /> {cv.contact.location}</span>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="photo-ring">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={catalog.photo}
                alt={cv.name}
                width={250}
                height={250}
                className="rounded-full object-cover"
                style={{ width: 250, height: 250, border: '3px solid rgba(252,211,77,0.55)' }}
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.value} className="gradient-border p-6 text-center transition hover:scale-[1.03] hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2" style={{ fontFamily: "'Playfair Display',Georgia,serif", lineHeight: 1 }}>
                {s.value}
              </div>
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(248,250,252,0.75)' }}>
                {s.label[lang]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
