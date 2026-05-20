/**
 * @file app/components/CategoryPhoto.tsx
 * @description Photo illustrative par categorie (depuis /public/photos),
 * affichee en bandeau au-dessus de l'article.
 */
const SLUGS: Record<string, string> = {
  'CI/CD': 'cicd',
  'GitOps': 'gitops',
  'Conteneurisation': 'containers',
  'IaC & Config': 'iac',
  'Langages / Scripting': 'languages',
  'Cloud': 'cloud',
  'Monitoring / Observ.': 'observability',
  'Securite DevSecOps': 'security',
  'Tests automatises': 'tests',
  'IA': 'ai',
};

export function CategoryPhoto({ category }: { category: string }) {
  const slug = SLUGS[category] ?? 'cloud';
  return (
    <figure className="my-6 rounded-2xl overflow-hidden relative" style={{ aspectRatio: '1200/360', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/photos/${slug}.jpg`} alt={`${category} — illustration`} className="w-full h-full object-cover" loading="lazy" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(10,31,68,0) 40%, rgba(10,31,68,0.78))' }}
      />
      <figcaption className="absolute bottom-3 left-4 right-4 text-xs" style={{ color: 'rgba(248,250,252,0.85)' }}>
        Illustration — <span className="font-bold" style={{ color: '#FCD34D' }}>{category}</span>
      </figcaption>
    </figure>
  );
}
