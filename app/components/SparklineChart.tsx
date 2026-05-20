/**
 * @file app/components/SparklineChart.tsx
 * @description Courbe SVG animee : evolution de la duree d'un pipeline
 * (minutes) sur 12 sprints. Symbolise la reduction du lead time apportee
 * par l'industrialisation CI/CD.
 */
const POINTS = [42, 39, 41, 35, 30, 27, 28, 22, 19, 17, 14, 12];
const W = 600;
const H = 220;
const PAD = 30;

export function SparklineChart({ title = 'Lead time du pipeline (min) sur 12 sprints' }: { title?: string }) {
  const min = Math.min(...POINTS);
  const max = Math.max(...POINTS);
  const xStep = (W - PAD * 2) / (POINTS.length - 1);
  const yScale = (v: number) => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2);
  const pts = POINTS.map((v, i) => `${PAD + i * xStep},${yScale(v)}`).join(' ');
  const dPath = POINTS.map((v, i) => `${i === 0 ? 'M' : 'L'} ${PAD + i * xStep} ${yScale(v)}`).join(' ');
  return (
    <figure className="my-6">
      <div className="rounded-2xl p-4 cat-banner"
        style={{ background: 'linear-gradient(120deg,#0A1F44,#102D5C,#0A1F44)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-label={title}>
          {/* grid */}
          {[0, 1, 2, 3, 4].map((g) => {
            const y = PAD + (g * (H - PAD * 2)) / 4;
            return <line key={g} x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
          })}
          {/* area */}
          <path d={`${dPath} L ${W - PAD} ${H - PAD} L ${PAD} ${H - PAD} Z`} fill="url(#sparkArea)" opacity="0.55" />
          <defs>
            <linearGradient id="sparkArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* line */}
          <polyline points={pts} fill="none" stroke="#34d399" strokeWidth="2.5"
            strokeLinejoin="round" strokeLinecap="round"
            style={{ strokeDasharray: 1400, strokeDashoffset: 1400 }}>
            <animate attributeName="stroke-dashoffset" from="1400" to="0" dur="1.6s" fill="freeze" />
          </polyline>
          {/* dots + labels */}
          {POINTS.map((v, i) => {
            const x = PAD + i * xStep, y = yScale(v);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="4" fill="#FCD34D">
                  <animate attributeName="r" from="0" to="4" dur="0.6s" begin={`${0.4 + i * 0.08}s`} fill="freeze" />
                </circle>
                {(i === 0 || i === POINTS.length - 1) && (
                  <text x={x} y={y - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{v}</text>
                )}
              </g>
            );
          })}
          {/* axis labels */}
          <text x={PAD} y={H - 8} fontSize="10" fill="rgba(248,250,252,0.6)">Sprint 1</text>
          <text x={W - PAD} y={H - 8} textAnchor="end" fontSize="10" fill="rgba(248,250,252,0.6)">Sprint 12</text>
        </svg>
      </div>
      <figcaption className="text-xs mt-2 text-center" style={{ color: '#93C5FD' }}>{title}</figcaption>
    </figure>
  );
}
