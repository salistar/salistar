/**
 * @file app/articles/page.tsx
 * @description Hub unique regroupant tous les articles (tech + IA).
 */
import type { Metadata } from 'next';
import { ContentShell } from '../components/ContentShell';
import { ContentFooter } from '../components/ContentFooter';
import { ArticlesHub } from '../components/ArticlesHub';

export const metadata: Metadata = {
  title: 'Tous les articles — bibliotheque technique & IA | Idriss Kriouile',
  description:
    '220 articles techniques (40 technologies x 5) + 20 articles IA, regroupes avec recherche et filtre par categorie.',
};

export default function ArticlesPage() {
  return (
    <ContentShell back={{ href: '/', label: 'Accueil' }}>
      <ArticlesHub />
      <ContentFooter />
    </ContentShell>
  );
}
