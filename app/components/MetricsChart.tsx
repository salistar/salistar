/**
 * @file app/components/MetricsChart.tsx
 * @description Graphe SVG anime des metriques DevOps standards constatees
 * sur les projets (extraites du CV).
 */
const METRICS = [
  { k: 'Lead time', v: 40, color: '#FCD34D' },     // -40% deploy time
  { k: 'Manuel', v: 70, color: '#60A5FA' },        // -70% interventions
  { k: 'Bugs prod', v: 60, color: '#34d399' },     // -60% bugs
  { k: 'MTTR', v: 70, color: '#a78bfa' },          // -70% detection time
  { k: 'Couverture', v: 85, color: '#ec5990' },    // 85% coverage (positive)
  { k: 'Visibilite', v: 80, color: '#0EA5E9' },    // +80% visibility
];

export function MetricsChart({ title = 'Impact mesure (en %)' }: { title?: string }) {
  const W = 600;
  const H = 220;
  const bw = 60;
  const gap = 18;
  const startX = (W - METRICS.length * (bw + gap) + gap) / 2;
  const maxH = H - 60;
  return (
    <figure className="my-6">
      <div
        className="rounded-2xl p-4 cat-banner"
        style={{ background: 'linear-gradient(120deg,#0A1F44,#102D5C,#0A1F44)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={title}>
          {/* baseline */}
          <line x1="20" y1={H - 28} x2={W - 20} y2={H - 28} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          {METRICS.map((m, i) => {
            const x = startX + i * (bw + gap);
            const h = (m.v / 100) * maxH;
            const y = H - 28 - h;
            return (
              <g key={m.k}>
                <rect x={x} y={y} width={bw} height={h} rx="6" fill={m.color} opacity="0.92">
                  <animate attributeName="height" from="0" to={h} dur="1.4s" fill="freeze" begin={`${i * 0.12}s`} />
                  <animate attributeName="y" from={H - 28} to={y} dur="1.4s" fill="freeze" begin={`${i * 0.12}s`} />
                </rect>
                <text x={x + bw / 2} y={y - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">
                  {m.v}%
                </text>
                <text x={x + bw / 2} y={H - 10} textAnchor="middle" fontSize="11" fill="rgba(248,250,252,0.75)">
                  {m.k}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="text-xs mt-2 text-center" style={{ color: '#93C5FD' }}>
        {title} — chiffres constates sur les projets du CV (sources : ALTEN/Worldline, VISEO/Rocher, Sylob, HPS).
      </figcaption>
    </figure>
  );
}
