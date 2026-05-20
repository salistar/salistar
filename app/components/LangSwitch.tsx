'use client';
import { useLang, LANGS } from '../lib/i18n';

export function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className="inline-flex rounded-full p-1 border"
      style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2.5 py-1 rounded-full font-bold transition ${compact ? 'text-[11px]' : 'text-xs'}`}
          style={
            lang === l.code
              ? { background: '#FCD34D', color: '#0A1F44' }
              : { color: 'rgba(248,250,252,0.75)' }
          }
          aria-pressed={lang === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
