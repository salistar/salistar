'use client';
/**
 * @file app/components/ContentFooter.tsx
 * @description Signature nominative (nom, prenom, statut, profil) trilingue
 * en pied de CHAQUE page de la bibliotheque (web).
 */
import { useLang } from '../lib/i18n';
import { catalog } from '../lib/library';

export function ContentFooter() {
  const { lang, t, dir } = useLang();
  const cv = catalog.cvI18n[lang];
  return (
    <footer className="mt-16 pt-8 border-t border-white/10" style={{ direction: dir }}>
      <div className="gradient-border p-7">
        <div className="flex items-center gap-4 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={catalog.photoSm}
            alt={cv.name}
            width={56}
            height={56}
            className="rounded-full flex-shrink-0"
            style={{ width: 56, height: 56, border: '2px solid rgba(252,211,77,0.45)' }}
          />
          <div className="min-w-0">
            <p className="text-xs font-mono tracking-wider mb-1" style={{ color: '#93C5FD' }}>
              {t('footer.written')}
            </p>
            <p className="text-lg font-bold text-white">{cv.name}</p>
            <p className="text-sm" style={{ color: '#FCD34D' }}>{cv.title}</p>
            <p className="text-xs mt-0.5" style={{ color: '#93C5FD' }}>
              {cv.labels.status} : {cv.status}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,250,252,0.78)' }}>
          <span className="font-semibold text-white">{t('footer.profile')} — </span>
          {cv.profile}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="tag">salistar.com</span>
          <span className="tag">github.com/idriss-kriouile</span>
          <a href={`mailto:${cv.contact.email}`} className="tag">{cv.contact.email}</a>
        </div>
      </div>
      <p className="text-center text-xs mt-6" style={{ color: 'rgba(147,197,253,0.6)' }}>
        &copy; {new Date().getFullYear()} {cv.name} — Tous droits reserves.
      </p>
    </footer>
  );
}
