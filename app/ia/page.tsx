/**
 * @file app/ia/page.tsx
 * @description Index des 20 articles detailles sur l'Intelligence Artificielle.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { catalog } from '../lib/library';
import { ContentShell } from '../components/ContentShell';
import { ContentFooter } from '../components/ContentFooter';

export const metadata: Metadata = {
  title: 'Intelligence Artificielle — 20 articles detailles | Idriss Kriouile',
  description:
    'LLM, Transformers, RAG, fine-tuning, agents, LLMOps, securite IA, MLOps : 20 analyses approfondies orientees ingenierie et production.',
};

export default function IaIndex() {
  return (
    <ContentShell back={{ href: '/', label: 'Accueil' }}>
      <header className="mb-10">
        <span className="tag">Intelligence Artificielle</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-3 gradient-text">
          20 articles detailles sur l&apos;IA
        </h1>
        <p className="text-lg" style={{ color: '#93C5FD' }}>
          Des fondamentaux des LLM a l&apos;industrialisation (LLMOps, securite,
          MLOps, IA responsable) : une serie orientee ingenierie et production.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        {catalog.ai.map((a, i) => (
          <Link key={a.slug} href={`/ia/${a.slug}`}
            className="gradient-border p-5 block transition hover:scale-[1.01]">
            <p className="text-xs mb-1" style={{ color: '#60A5FA' }}>
              Article {String(i + 1).padStart(2, '0')} / 20
            </p>
            <p className="font-bold text-lg text-white">{a.title}</p>
            <p className="text-sm mt-1" style={{ color: '#93C5FD' }}>{a.subtitle}</p>
          </Link>
        ))}
      </div>

      <ContentFooter />
    </ContentShell>
  );
}
