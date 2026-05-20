/**
 * @file app/components/GaugeChart.tsx
 * @description Jauge SVG animee — affiche 2 indicateurs cles (couverture
 * de tests, taux d'automatisation).
 */
function Gauge({ value, label, color }: { value: number; label: string; color: string }) {
  const R = 80;
  const C = 2 * Math.PI * R;
  const dash = (value / 100) * (C * 0.75); // demi-cercle ouvert (3/4)
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 130" width="180" height="118">
        <circle cx="100" cy="100" r={R} fill="none"
          stroke="rgba(255,255,255,0.12)" strokeWidth="14"
          strokeDasharray={`${C * 0.75} ${C}`} strokeDashoffset={C * 0.125}
          transform="rotate(135 100 100)" strokeLinecap="round" />
        <circle cx="100" cy="100" r={R} fill="none"
          stroke={color} strokeWidth="14"
          strokeDasharray={`${dash} ${C}`} strokeDashoffset={C * 0.125}
          transform="rotate(135 100 100)" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" from={`0 ${C}`} to={`${dash} ${C}`} dur="1.4s" fill="freeze" />
        </circle>
        <text x="100" y="92" textAnchor="middle" fontSize="34" fontWeight="900" fill={color}>{value}%</text>
        <text x="100" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="rgba(248,250,252,0.78)" letterSpacing="1">{label}</text>
      </svg>
    </div>
  );
}

export function GaugeChart({ title = 'Couverture & automatisation' }: { title?: string }) {
  return (
    <figure className="my-6">
      <div className="rounded-2xl p-4 cat-banner flex flex-wrap gap-4 items-center justify-around"
        style={{ background: 'linear-gradient(120deg,#0A1F44,#102D5C,#0A1F44)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <Gauge value={85} label="Couverture tests" color="#34d399" />
        <Gauge value={90} label="Flux automatises" color="#FCD34D" />
        <Gauge value={98} label="SLA respecte" color="#60A5FA" />
      </div>
      <figcaption className="text-xs mt-2 text-center" style={{ color: '#93C5FD' }}>{title}</figcaption>
    </figure>
  );
}
