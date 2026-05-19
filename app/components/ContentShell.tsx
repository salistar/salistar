/**
 * @file app/components/ContentShell.tsx
 * @description Habillage commun (fond, halos, nav) des pages de contenu.
 */
import { ContentNav } from './ContentNav';

export function ContentShell({
  children,
  back,
}: {
  children: React.ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <div className="grid-pattern fixed inset-0 -z-10 opacity-60" aria-hidden />
      <div className="glow-orb -z-10" aria-hidden
        style={{ top: '-20%', left: '-10%', width: '500px', height: '500px', background: '#FCD34D' }} />
      <div className="glow-orb -z-10" aria-hidden
        style={{ top: '55%', right: '-10%', width: '600px', height: '600px', background: '#2563EB' }} />
      <ContentNav back={back} />
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">{children}</div>
    </main>
  );
}
