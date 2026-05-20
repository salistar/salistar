/**
 * @file app/components/ArticleDiagram.tsx
 * @description Schema SVG anime adapte a chaque angle d'article :
 *   fondamentaux | installation | cicd | production | depannage
 * Aucun fichier video : animations CSS/SVG natives, server-safe.
 */
type Angle = 'fondamentaux' | 'installation' | 'cicd' | 'production' | 'depannage';

function pick(slug: string): Angle {
  const s = slug.toLowerCase();
  if (s.includes('install')) return 'installation';
  if (s.includes('cicd') || s.includes('ci')) return 'cicd';
  if (s.includes('prod')) return 'production';
  if (s.includes('depan') || s.includes('trouble')) return 'depannage';
  return 'fondamentaux';
}

const ROLE: Record<Angle, string> = {
  fondamentaux: 'Architecture & concepts',
  installation: 'Stack d’installation',
  cicd: 'Pipeline CI/CD',
  production: 'Cluster production',
  depannage: 'Boucle observabilite -> remediation',
};

export function ArticleDiagram({ slug, name }: { slug: string; name: string }) {
  const angle = pick(slug);
  return (
    <figure className="my-6">
      <div
        className="rounded-2xl overflow-hidden relative cat-banner"
        style={{
          background: 'linear-gradient(120deg,#0A1F44,#102D5C,#0A1F44)',
          border: '1px solid rgba(255,255,255,0.10)',
          padding: '12px',
        }}
      >
        <Svg angle={angle} name={name} />
      </div>
      <figcaption className="text-xs mt-2 text-center" style={{ color: '#93C5FD' }}>
        {ROLE[angle]} — {name}
      </figcaption>
    </figure>
  );
}

function Svg({ angle, name }: { angle: Angle; name: string }) {
  if (angle === 'fondamentaux')
    return (
      <svg viewBox="0 0 600 220" className="w-full h-auto" aria-label={`Architecture ${name}`}>
        {/* central node */}
        <circle cx="300" cy="110" r="34" fill="#FCD34D" />
        <text x="300" y="115" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="14" fontWeight="800" fill="#0A1F44">{name.slice(0, 10)}</text>
        {/* satellites */}
        {[
          [100, 50], [500, 50], [100, 170], [500, 170], [300, 20], [300, 200],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1={300} y1={110} x2={x} y2={y} stroke="#60A5FA" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </line>
            <circle cx={x} cy={y} r="14" fill="#102D5C" stroke="#60A5FA" strokeWidth="2">
              <animate attributeName="r" values="12;16;12" dur="3s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
    );

  if (angle === 'installation')
    return (
      <svg viewBox="0 0 600 220" className="w-full h-auto" aria-label="Installation stack">
        {['Base OS', 'Runtime', 'Dépendances', 'Config', 'Service'].map((lbl, i) => (
          <g key={i}>
            <rect x="180" y={20 + i * 36} width="240" height="30" rx="6"
              fill={['#60A5FA', '#34d399', '#FCD34D', '#a78bfa', '#ec5990'][i]} opacity="0.85">
              <animate attributeName="opacity" values="0.4;0.95;0.4" dur="4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </rect>
            <text x="300" y={40 + i * 36} textAnchor="middle" fontFamily="Inter,Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0A1F44">{lbl}</text>
          </g>
        ))}
      </svg>
    );

  if (angle === 'cicd')
    return (
      <svg viewBox="0 0 600 220" className="w-full h-auto" aria-label="CI/CD pipeline">
        <line x1="40" y1="110" x2="560" y2="110" stroke="#FCD34D" strokeWidth="2" opacity="0.4" />
        {['Lint', 'Build', 'Tests', 'Scan', 'Deploy'].map((lbl, i) => {
          const x = 60 + i * 120;
          return (
            <g key={i}>
              <circle cx={x} cy="110" r="22" fill="#102D5C" stroke="#FCD34D" strokeWidth="2">
                <animate attributeName="r" values="18;26;18" dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
              <text x={x} y="115" textAnchor="middle" fontFamily="Inter,Arial,sans-serif" fontSize="11" fontWeight="700" fill="#F8FAFC">{lbl}</text>
            </g>
          );
        })}
        {/* travelling dot */}
        <circle r="6" fill="#34d399">
          <animate attributeName="cx" values="40;560;40" dur="6s" repeatCount="indefinite" />
          <animate attributeName="cy" values="110;110;110" dur="6s" repeatCount="indefinite" />
        </circle>
      </svg>
    );

  if (angle === 'production')
    return (
      <svg viewBox="0 0 600 220" className="w-full h-auto" aria-label="Cluster production">
        {/* load balancer */}
        <rect x="260" y="20" width="80" height="32" rx="4" fill="#FCD34D" />
        <text x="300" y="40" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0A1F44">LB</text>
        {/* replicas */}
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 80 + i * 110;
          return (
            <g key={i}>
              <line x1="300" y1="52" x2={x + 30} y2="110" stroke="#60A5FA" strokeWidth="1.3" opacity="0.6" />
              <rect x={x} y="110" width="60" height="80" rx="6" fill="#102D5C" stroke="#60A5FA" strokeWidth="1.5">
                <animate attributeName="stroke" values="#60A5FA;#34d399;#60A5FA" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </rect>
              <circle cx={x + 30} cy="170" r="4" fill="#34d399">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>
    );

  // depannage
  return (
    <svg viewBox="0 0 600 220" className="w-full h-auto" aria-label="Boucle observabilite/remediation">
      {/* circular loop */}
      <circle cx="300" cy="110" r="80" fill="none" stroke="#FCD34D" strokeWidth="2" strokeDasharray="6 8">
        <animateTransform attributeName="transform" type="rotate" from="0 300 110" to="360 300 110" dur="8s" repeatCount="indefinite" />
      </circle>
      {['Detecter', 'Diagnostiquer', 'Corriger', 'Verifier'].map((lbl, i) => {
        const ang = (i / 4) * 2 * Math.PI - Math.PI / 2;
        const x = 300 + Math.cos(ang) * 80;
        const y = 110 + Math.sin(ang) * 80;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="16" fill="#102D5C" stroke="#FCD34D" strokeWidth="2" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#FCD34D">{lbl.slice(0, 4)}</text>
          </g>
        );
      })}
      <text x="300" y="115" textAnchor="middle" fontSize="13" fontWeight="700" fill="#F8FAFC">{name}</text>
    </svg>
  );
}
