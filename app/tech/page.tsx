/**
 * @file app/tech/page.tsx
 * @description Index de la bibliotheque technique : ~40 technologies groupees
 * par categorie, 5 articles approfondis chacune + resume de commandes.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { catalog } from '../lib/library';
import { ContentShell } from '../components/ContentShell';
import { ContentFooter } from '../components/ContentFooter';

export const metadata: Metadata = {
  title: 'Bibliotheque technique — DevOps, Cloud, CI/CD | Idriss Kriouile',
  description:
    '40 technologies DevOps/Cloud expliquees : role, resume de commandes et 5 articles approfondis chacune. Par Idriss Kriouile.',
};

export default function TechIndex() {
  const c = catalog.counts;
  return (
    <ContentShell back={{ href: '/', label: 'Accueil' }}>
      <header className="mb-10">
        <span className="tag">Bibliotheque technique</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-3 gradient-text">
          Technologies DevOps &amp; Cloud
        </h1>
        <p className="text-lg" style={{ color: '#93C5FD' }}>
          {c.technologies} technologies · {c.techArticles} articles approfondis ·
          resume de commandes par technologie. Chaque technologie precise son role
          et propose 5 articles (fondamentaux, installation, CI/CD, production, depannage).
        </p>
      </header>

      {catalog.categories.map((cat) => (
        <section key={cat.name} className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {cat.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {cat.techs.map((t) => (
              <Link key={t.slug} href={`/tech/${t.slug}`}
                className="gradient-border p-5 block transition hover:scale-[1.01]">
                <p className="font-bold text-lg" style={{ color: '#FCD34D' }}>{t.name}</p>
                <p className="text-sm mt-1 line-clamp-3" style={{ color: 'rgba(248,250,252,0.78)' }}>
                  {t.role.slice(0, 180)}…
                </p>
                <p className="text-xs mt-3" style={{ color: '#60A5FA' }}>
                  5 articles + resume des commandes →
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <ContentFooter />
    </ContentShell>
  );
}
