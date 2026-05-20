/**
 * @file app/components/CategoryVisual.tsx
 * @description Banniere illustree animee + icone par categorie (server-safe).
 */
import {
  GitBranch, GitMerge, Boxes, Layers, Terminal, Cloud,
  Activity, ShieldCheck, FlaskConical, Cpu, Sparkles,
} from 'lucide-react';

const MAP: Record<string, { grad: string; Icon: typeof Cloud }> = {
  'CI/CD': { grad: 'linear-gradient(120deg,#2563EB,#0A1F44,#60A5FA)', Icon: GitBranch },
  GitOps: { grad: 'linear-gradient(120deg,#7c3aed,#0A1F44,#a78bfa)', Icon: GitMerge },
  Conteneurisation: { grad: 'linear-gradient(120deg,#0a8aa8,#0A1F44,#5cd2c4)', Icon: Boxes },
  'IaC & Config': { grad: 'linear-gradient(120deg,#c8861f,#0A1F44,#f5b13a)', Icon: Layers },
  'Langages / Scripting': { grad: 'linear-gradient(120deg,#2563EB,#0A1F44,#34d399)', Icon: Terminal },
  Cloud: { grad: 'linear-gradient(120deg,#0369a1,#0A1F44,#60A5FA)', Icon: Cloud },
  'Monitoring / Observ.': { grad: 'linear-gradient(120deg,#059669,#0A1F44,#34d399)', Icon: Activity },
  'Securite DevSecOps': { grad: 'linear-gradient(120deg,#b13a6f,#0A1F44,#ec5990)', Icon: ShieldCheck },
  'Tests automatises': { grad: 'linear-gradient(120deg,#7c3aed,#0A1F44,#60A5FA)', Icon: FlaskConical },
  IA: { grad: 'linear-gradient(120deg,#2563EB,#0A1F44,#a78bfa)', Icon: Cpu },
};

export function CategoryVisual({
  category,
  title,
  subtitle,
  height = 150,
}: {
  category: string;
  title?: string;
  subtitle?: string;
  height?: number;
}) {
  const cfg = MAP[category] ?? { grad: 'linear-gradient(120deg,#2563EB,#0A1F44,#60A5FA)', Icon: Sparkles };
  const Icon = cfg.Icon;
  return (
    <div
      className="cat-banner rounded-2xl relative overflow-hidden flex items-center px-6 mb-8"
      style={{ background: cfg.grad, minHeight: height }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #fff2 0 2px, transparent 2px), radial-gradient(circle at 70% 60%, #fff2 0 2px, transparent 2px)',
          backgroundSize: '46px 46px',
        }}
        aria-hidden
      />
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)' }}
      >
        <Icon size={32} className="text-white" />
      </div>
      <div className="ms-5 ml-5 min-w-0 relative">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {category}
        </p>
        {title && (
          <p className="text-xl md:text-2xl font-bold text-white leading-tight mt-1 line-clamp-3">
            {title}
          </p>
        )}
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
