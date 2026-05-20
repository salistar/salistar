'use client';
/**
 * @file app/components/Pipeline.tsx
 * @description Schema anime "Local -> GitHub -> CI/CD -> Cloud" (trilingue).
 */
import { Laptop, Github, Cog, Cloud, ChevronRight } from 'lucide-react';
import { useLang } from '../lib/i18n';

const STEPS = [
  { key: 'local', icon: Laptop, color: '#60A5FA' },
  { key: 'github', icon: Github, color: '#F8FAFC' },
  { key: 'cicd', icon: Cog, color: '#FCD34D' },
  { key: 'cloud', icon: Cloud, color: '#34d399' },
] as const;

export function Pipeline({ compact = false }: { compact?: boolean }) {
  const { t, dir } = useLang();
  return (
    <div
      className={`flex flex-wrap items-stretch justify-center gap-3 ${compact ? '' : 'gap-4'}`}
      style={{ direction: dir }}
    >
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={s.key} className="flex items-stretch gap-3">
            <div
              className="gradient-border p-5 flex flex-col items-center text-center min-w-[140px] transition hover:-translate-y-1"
              style={{ animation: `pl-pulse 3s ${i * 0.4}s ease-in-out infinite` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${s.color}22`, border: `1px solid ${s.color}55` }}
              >
                <Icon size={24} style={{ color: s.color }} />
              </div>
              <p className="font-bold text-white text-sm">{t(`pipeline.${s.key}`)}</p>
              {!compact && (
                <p className="text-[11px] mt-1 leading-snug" style={{ color: 'rgba(248,250,252,0.65)' }}>
                  {t(`pipeline.${s.key}.d`)}
                </p>
              )}
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex items-center" style={{ color: '#FCD34D' }}>
                <ChevronRight
                  size={22}
                  style={{
                    transform: dir === 'rtl' ? 'scaleX(-1)' : 'none',
                    animation: 'pl-slide 1.8s ease-in-out infinite',
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
