/**
 * @file app/components/ContentNav.tsx
 * @description Barre de navigation superieure pour les pages de contenu
 * (CV, bibliotheque technique, articles IA).
 */
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function ContentNav({ back }: { back?: { href: string; label: string } }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      style={{ backgroundColor: 'rgba(10,31,68,0.95)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={back?.href ?? '/'}
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: '#93C5FD' }}
        >
          <ArrowLeft size={16} /> {back?.label ?? 'Accueil'}
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <Link href="/cv" className="px-3 py-1.5 rounded-lg hover:bg-white/5" style={{ color: 'rgba(248,250,252,0.85)' }}>
            CV
          </Link>
          <Link href="/tech" className="px-3 py-1.5 rounded-lg hover:bg-white/5" style={{ color: 'rgba(248,250,252,0.85)' }}>
            Bibliotheque
          </Link>
          <Link href="/ia" className="px-3 py-1.5 rounded-lg hover:bg-white/5" style={{ color: 'rgba(248,250,252,0.85)' }}>
            IA
          </Link>
        </div>
      </div>
    </nav>
  );
}
