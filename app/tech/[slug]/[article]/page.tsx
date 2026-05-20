/**
 * @file app/tech/[slug]/[article]/page.tsx
 * @description Article approfondi d'une technologie (1 article = 1 page).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTech } from '../../../lib/library';
import { ContentShell } from '../../../components/ContentShell';
import { ContentFooter } from '../../../components/ContentFooter';
import { ArticleRenderer } from '../../../components/ArticleRenderer';
import { CategoryVisual } from '../../../components/CategoryVisual';
import { Pipeline } from '../../../components/Pipeline';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; article: string }> }
): Promise<Metadata> {
  const { slug, article } = await params;
  const tech = await getTech(slug);
  const a = tech?.articles.find((x) => x.slug === article);
  if (!a) return { title: 'Article introuvable' };
  return { title: `${a.title} | Idriss Kriouile`, description: a.subtitle };
}

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string; article: string }> }
) {
  const { slug, article } = await params;
  const tech = await getTech(slug);
  if (!tech) return notFound();
  const idx = tech.articles.findIndex((x) => x.slug === article);
  if (idx < 0) return notFound();
  const a = tech.articles[idx];
  const prev = tech.articles[idx - 1];
  const next = tech.articles[idx + 1];

  return (
    <ContentShell back={{ href: `/tech/${slug}`, label: tech.name }}>
      <article>
        <CategoryVisual category={tech.category} title={a.title} subtitle={`${tech.name} · ${a.subtitle}`} />

        <ArticleRenderer blocks={a.blocks} />

        <div className="mt-12 gradient-border p-6">
          <p className="text-sm font-semibold mb-4 text-center" style={{ color: '#FCD34D' }}>
            Local → GitHub → CI/CD → Cloud
          </p>
          <Pipeline />
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3">
          {prev ? (
            <Link href={`/tech/${slug}/${prev.slug}`} className="btn-ghost text-sm">
              ← {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/tech/${slug}/${next.slug}`} className="btn-ghost text-sm">
              {next.title} →
            </Link>
          ) : <span />}
        </div>

        <ContentFooter />
      </article>
    </ContentShell>
  );
}
