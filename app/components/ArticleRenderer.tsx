/**
 * @file app/components/ArticleRenderer.tsx
 * @description Rend une liste de blocs de contenu (lead/h2/p/li/code/cmds)
 * dans le theme du site. Composant serveur pur.
 */
import type { Block } from '../lib/library';

export function ArticleRenderer({ blocks }: { blocks: Block[] }) {
  const out: React.ReactNode[] = [];
  let liBuffer: string[] = [];

  const flushLi = (key: string) => {
    if (liBuffer.length === 0) return;
    out.push(
      <ul key={key} className="list-disc pl-6 space-y-2 my-4" style={{ color: 'rgba(248,250,252,0.88)' }}>
        {liBuffer.map((t, i) => (
          <li key={i} className="leading-relaxed">{t}</li>
        ))}
      </ul>
    );
    liBuffer = [];
  };

  blocks.forEach((b, i) => {
    if (b.type === 'li') {
      liBuffer.push(b.text);
      return;
    }
    flushLi(`ul-${i}`);
    if (b.type === 'lead') {
      out.push(
        <p key={i} className="text-lg leading-relaxed mb-8" style={{ color: '#93C5FD' }}>
          {b.text}
        </p>
      );
    } else if (b.type === 'h2') {
      out.push(
        <h2 key={i} className="text-2xl md:text-3xl font-bold mt-12 mb-4 text-white"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {b.text}
        </h2>
      );
    } else if (b.type === 'p') {
      out.push(
        <p key={i} className="leading-relaxed mb-5" style={{ color: 'rgba(248,250,252,0.88)' }}>
          {b.text}
        </p>
      );
    } else if (b.type === 'code') {
      out.push(
        <pre key={i} className="rounded-xl p-4 my-5 overflow-x-auto text-sm"
          style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)', color: '#60A5FA' }}>
          <code>{b.lines.join('\n')}</code>
        </pre>
      );
    } else if (b.type === 'cmds') {
      out.push(
        <div key={i} className="my-6 space-y-2">
          {b.items.map((it, j) => (
            <div key={j} className="gradient-border p-4 flex flex-col md:flex-row md:items-center gap-2">
              <code className="text-sm font-mono whitespace-pre-wrap md:flex-1" style={{ color: '#FCD34D' }}>
                {it.cmd}
              </code>
              <span className="text-sm md:flex-1" style={{ color: 'rgba(248,250,252,0.8)' }}>
                {it.desc}
              </span>
            </div>
          ))}
        </div>
      );
    }
  });
  flushLi('ul-end');
  return <>{out}</>;
}
