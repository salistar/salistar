/**
 * @file app/ia/[slug]/page.tsx
 * @description Un article IA detaille (1 article = 1 page).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAi, catalog } from '../../lib/library';
import { ContentShell } from '../../components/ContentShell';
import { ContentFooter } from '../../components/ContentFooter';
import { ArticleRenderer } from '../../components/ArticleRenderer';
import { CategoryVisual } from '../../components/CategoryVisual';
import { CategoryPhoto } from '../../components/CategoryPhoto';
import { ArticleDiagram } from '../../components/ArticleDiagram';
import { MetricsChart } from '../../components/MetricsChart';
import { SparklineChart } from '../../components/SparklineChart';
import { GaugeChart } from '../../components/GaugeChart';
import { VideoLink } from '../../components/VideoLink';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const a = catalog.ai.find((x) => x.slug === slug);
  if (!a) return { title: 'Article introuvable' };
  return { title: `${a.title} | Idriss Kriouile`, description: a.subtitle };
}

export default async function AiArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const a = await getAi(slug);
  if (!a) return notFound();
  const idx = catalog.ai.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? catalog.ai[idx - 1] : null;
  const next = idx >= 0 && idx < catalog.ai.length - 1 ? catalog.ai[idx + 1] : null;

  return (
    <ContentShell back={{ href: '/ia', label: 'Articles IA' }}>
      <article>
        <CategoryVisual category="IA" title={a.title} subtitle={a.subtitle} />
        <CategoryPhoto category="IA" />
        <ArticleDiagram slug="fondamentaux" name="IA" />
        <MetricsChart title="Repères industrialisation IA / DevOps (en %)" />
        <SparklineChart title="Coût par requete LLM (cts) — 12 sprints d'optimisation" />
        <GaugeChart title="Qualite / sécurité / fiabilite des systemes IA" />
        <ArticleRenderer blocks={a.blocks} />
        <div className="mt-8 text-center">
          <VideoLink query={a.title} />
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3">
          {prev ? (
            <Link href={`/ia/${prev.slug}`} className="btn-ghost text-sm">← {prev.title}</Link>
          ) : <span />}
          {next ? (
            <Link href={`/ia/${next.slug}`} className="btn-ghost text-sm">{next.title} →</Link>
          ) : <span />}
        </div>

        <ContentFooter />
      </article>
    </ContentShell>
  );
}
