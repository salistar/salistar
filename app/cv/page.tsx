/**
 * @file app/cv/page.tsx
 * @description CV en ligne d'Idriss Kriouile (Senior DevOps Engineer).
 */
import type { Metadata } from 'next';
import { Download } from 'lucide-react';
import { catalog } from '../lib/library';
import { ContentShell } from '../components/ContentShell';
import { ContentFooter } from '../components/ContentFooter';

export const metadata: Metadata = {
  title: 'CV — Idriss Kriouile · Senior DevOps Engineer / Tech Lead',
  description:
    'CV en ligne d\'Idriss Kriouile : +8 ans en CI/CD, Kubernetes, GitOps, IaC, cloud et DevSecOps pour environnements bancaires et grands comptes.',
};

export default function CvPage() {
  const cv = catalog.cv;
  return (
    <ContentShell back={{ href: '/', label: 'Accueil' }}>
      <header className="mb-10">
        <span className="tag">Curriculum Vitae</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-2 gradient-text">
          {cv.name}
        </h1>
        <p className="text-xl" style={{ color: '#FCD34D' }}>{cv.title}</p>
        <p className="text-sm mt-2" style={{ color: '#93C5FD' }}>
          {cv.contact.location} · {cv.contact.phone} · {cv.contact.email}
        </p>
        <p className="text-sm" style={{ color: '#93C5FD' }}>
          {cv.contact.linkedin} · {cv.contact.github} · {cv.contact.site}
        </p>
        <div className="mt-5">
          <a href="/cv-idriss-kriouile.pdf" target="_blank" rel="noopener noreferrer"
            className="btn-primary text-sm inline-flex items-center gap-2">
            <Download size={16} /> Telecharger le CV (PDF)
          </a>
        </div>
      </header>

      <section className="gradient-border p-7 mb-8">
        <h2 className="text-2xl font-bold mb-3 text-white">Profil</h2>
        <p className="leading-relaxed" style={{ color: 'rgba(248,250,252,0.88)' }}>{cv.profile}</p>
        <p className="text-sm mt-3" style={{ color: '#93C5FD' }}>Statut : {cv.status}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Competences techniques</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {cv.skills.map(([k, v]) => (
            <div key={k} className="gradient-border p-5">
              <p className="font-bold mb-1" style={{ color: '#FCD34D' }}>{k}</p>
              <p className="text-sm" style={{ color: 'rgba(248,250,252,0.82)' }}>{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Experiences professionnelles</h2>
        <div className="space-y-5">
          {cv.experience.map((e) => (
            <div key={e.company} className="gradient-border p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-bold text-white text-lg">{e.company}</p>
                <p className="text-sm" style={{ color: '#93C5FD' }}>{e.period}</p>
              </div>
              <p className="text-sm mb-3" style={{ color: '#FCD34D' }}>{e.role}</p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm" style={{ color: 'rgba(248,250,252,0.85)' }}>
                {e.bullets.map((b, i) => <li key={i} className="leading-relaxed">{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 grid md:grid-cols-2 gap-4">
        <div className="gradient-border p-6">
          <h2 className="text-xl font-bold mb-3 text-white">Formation</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm" style={{ color: 'rgba(248,250,252,0.85)' }}>
            {cv.education.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
        <div className="gradient-border p-6">
          <h2 className="text-xl font-bold mb-3 text-white">Langues</h2>
          <p className="text-sm" style={{ color: 'rgba(248,250,252,0.85)' }}>{cv.languages}</p>
        </div>
      </section>

      <ContentFooter />
    </ContentShell>
  );
}
