/**
 * @file app/components/ContentFooter.tsx
 * @description Signature nominative affichee a la fin de CHAQUE page de la
 * bibliotheque technique (exigence : nom, prenom, statut et profil en pied
 * de chaque page).
 */
import { SIGNATURE } from '../lib/library';

export function ContentFooter() {
  return (
    <footer className="mt-16 pt-8 border-t border-white/10">
      <div className="gradient-border p-7">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg,#2563EB,#60A5FA)',
              color: '#0A1F44',
              border: '1.5px solid rgba(252,211,77,0.5)',
            }}
          >
            IK
          </div>
          <div className="min-w-0">
            <p className="text-xs font-mono tracking-wider mb-1" style={{ color: '#93C5FD' }}>
              REDIGE PAR
            </p>
            <p className="text-lg font-bold text-white">
              {SIGNATURE.first} {SIGNATURE.last}
            </p>
            <p className="text-sm" style={{ color: '#FCD34D' }}>{SIGNATURE.title}</p>
            <p className="text-xs mt-0.5" style={{ color: '#93C5FD' }}>
              Statut : {SIGNATURE.status}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,250,252,0.75)' }}>
          <span className="font-semibold text-white">Profil — </span>
          {SIGNATURE.profile}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs" style={{ color: '#93C5FD' }}>
          <span className="tag">salistar.com</span>
          <span className="tag">github.com/salistar</span>
          <a href="mailto:Idriss.kriouile.pro@gmail.com" className="tag">
            Idriss.kriouile.pro@gmail.com
          </a>
        </div>
      </div>
      <p className="text-center text-xs mt-6" style={{ color: 'rgba(147,197,253,0.6)' }}>
        &copy; {new Date().getFullYear()} {SIGNATURE.name} — Tous droits reserves.
      </p>
    </footer>
  );
}
