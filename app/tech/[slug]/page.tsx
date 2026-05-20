/**
 * @file app/tech/[slug]/page.tsx
 * @description Page d'une technologie : role, resume des commandes, et liste
 * des 5 articles approfondis (chacun sur sa propre page).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTech, findTechMeta, catalog } from '../../lib/library';
import { ContentShell } from '../../components/ContentShell';
import { ContentFooter } from '../../components/ContentFooter';
import { CategoryVisual } from '../../components/CategoryVisual';
import { Pipeline } from '../../components/Pipeline';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const m = findTechMeta(slug);
  if (!m) return { title: 'Technologie introuvable' };
  return {
    title: `${m.name} — role, commandes & 5 articles | Idriss Kriouile`,
    description: m.role.slice(0, 155),
  };
}

export default async function TechPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tech = await getTech(slug);
  if (!tech) return notFound();

  return (
    <ContentShell back={{ href: '/tech', label: 'Bibliotheque' }}>
      <CategoryVisual category={tech.category} title={tech.name} subtitle={tech.role.slice(0, 130) + '…'} />
      <header className="mb-8">
        <p className="text-lg leading-relaxed" style={{ color: 'rgba(248,250,252,0.9)' }}>
          {tech.role}
        </p>
      </header>

      <div className="mb-10 gradient-border p-6">
        <p className="text-sm font-semibold mb-4 text-center" style={{ color: '#FCD34D' }}>
          Cycle de livraison : Local → GitHub → CI/CD → Cloud
        </p>
        <Pipeline compact />
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-white">Articles approfondis</h2>
        <div className="space-y-3">
          {tech.articles.map((a, i) => (
            <Link key={a.slug} href={`/tech/${slug}/${a.slug}`}
              className="gradient-border p-5 block transition hover:scale-[1.01]">
              <p className="text-xs mb-1" style={{ color: '#60A5FA' }}>Article {i + 1} / 5</p>
              <p className="font-bold text-lg text-white">{a.title}</p>
              <p className="text-sm mt-1" style={{ color: '#93C5FD' }}>{a.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Resume des commandes essentielles</h2>
        <div className="space-y-2">
          {tech.commands.map((it, j) => (
            <div key={j} className="gradient-border p-4 flex flex-col md:flex-row md:items-center gap-2">
              <code className="text-sm font-mono whitespace-pre-wrap md:flex-1" style={{ color: '#FCD34D' }}>
                {it.cmd}
              </code>
              <span className="text-sm md:flex-1" style={{ color: 'rgba(248,250,252,0.8)' }}>
                {it.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      <ContentFooter />
    </ContentShell>
  );
}
