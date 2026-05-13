/**
 * @file app/components/Monitoring.tsx
 * @description Dashboard de monitoring temps réel pour l'infrastructure
 * SallyCards. Affiche le statut courant des 4 services (API, Socket, TURN,
 * Mongo) + uptime % sur 30 jours, avec un bouton "Vérifier maintenant".
 *
 * Source des données :
 *   - GET /api/v1/infra-monitoring/heartbeat/latest
 *   - GET /api/v1/infra-monitoring/uptime?days=30
 *
 * Le bouton "Vérifier maintenant" déclenche un check côté front via fetch
 * direct vers les endpoints /health (pas de POST heartbeat — ça reste
 * réservé au cron VPS).
 *
 * Intégré dans le portfolio salistar (app/page.tsx) en tant que section.
 */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { Activity, Server, Radio, Database, Zap, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

const API_BASE = 'https://api.salistar.com/api/v1';

interface ServiceCheck {
  service: 'api' | 'socket' | 'turn' | 'mongo' | 'redis';
  ok: boolean;
  latencyMs: number;
  status?: number;
  error?: string;
  url: string;
}

interface Heartbeat {
  source: 'cron' | 'manual' | 'health-test';
  checkedAt: string;
  results: ServiceCheck[];
  allOk: boolean;
  createdAt: string;
}

interface UptimeStats {
  [service: string]: { ok: number; total: number; uptimePct: number };
}

const SERVICE_META: Record<string, { label: string; icon: typeof Server; color: string }> = {
  api: { label: 'API REST', icon: Server, color: '#0EA5E9' },
  socket: { label: 'WebSocket', icon: Radio, color: '#7C3AED' },
  turn: { label: 'TURN / STUN', icon: Activity, color: '#EC4899' },
  mongo: { label: 'MongoDB', icon: Database, color: '#10B981' },
  redis: { label: 'Redis', icon: Zap, color: '#DC2626' },
};

export default function Monitoring() {
  const [latest, setLatest] = useState<Heartbeat | null>(null);
  const [uptime, setUptime] = useState<UptimeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [manualCheck, setManualCheck] = useState<ServiceCheck[] | null>(null);
  const [manualChecking, setManualChecking] = useState(false);

  /**
   * The backend wraps controller results twice ({ success, data: { success, data: ... } })
   * because of NestJS' global TransformInterceptor. This helper digs through
   * any number of nested `data` envelopes until it finds the actual payload.
   */
  const unwrap = (raw: any): any => {
    let cur = raw;
    while (cur && typeof cur === 'object' && 'success' in cur && 'data' in cur) {
      cur = cur.data;
    }
    return cur;
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [latestRes, uptimeRes] = await Promise.all([
        fetch(`${API_BASE}/infra-monitoring/heartbeat/latest`, { cache: 'no-store' }).then((r) => r.json()).catch(() => null),
        fetch(`${API_BASE}/infra-monitoring/uptime?days=30`, { cache: 'no-store' }).then((r) => r.json()).catch(() => null),
      ]);
      const latestPayload = unwrap(latestRes);
      const uptimePayload = unwrap(uptimeRes);
      if (latestPayload && Array.isArray(latestPayload?.results)) {
        setLatest(latestPayload);
      }
      if (uptimePayload && typeof uptimePayload === 'object' && !Array.isArray(uptimePayload)) {
        // Strip the meta key if present.
        const { meta: _meta, ...stats } = uptimePayload as any;
        setUptime(stats as UptimeStats);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // Auto-refresh toutes les 60 s
    const id = setInterval(loadData, 60_000);
    return () => clearInterval(id);
  }, [loadData]);

  /**
   * Manual check — calls the BACKEND endpoint that returns the latest
   * cron heartbeat. The backend's VPS cron is the only thing that can
   * actually probe the 4 services correctly (TURN is UDP, Mongo is
   * internal — neither is reachable from the browser).
   *
   * If you want a fresh snapshot, this endpoint also computes a live
   * server-side probe for the 3 HTTP services on demand.
   */
  const runManualCheck = useCallback(async () => {
    setManualChecking(true);
    setManualCheck(null);
    const t0 = Date.now();
    try {
      // Try the on-demand check endpoint first; if absent, fall back to latest.
      let probes: ServiceCheck[] | null = null;
      try {
        const r = await fetch(`${API_BASE}/infra-monitoring/check-now`, { cache: 'no-store' });
        if (r.ok) {
          const j = await r.json();
          const payload = unwrap(j);
          if (payload && Array.isArray(payload?.results)) probes = payload.results;
        }
      } catch {
        /* fall through */
      }
      if (!probes) {
        const r = await fetch(`${API_BASE}/infra-monitoring/heartbeat/latest`, { cache: 'no-store' });
        const j = await r.json();
        const payload = unwrap(j);
        if (payload && Array.isArray(payload?.results)) {
          probes = payload.results;
          setLatest(payload);
        }
      }
      setManualCheck(probes ?? []);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[Monitoring] manual check failed', e);
      setManualCheck([]);
    } finally {
      setManualChecking(false);
      // eslint-disable-next-line no-console
      console.log(`[Monitoring] Manual check completed in ${Date.now() - t0}ms`);
    }
    // Also refresh the auto data so cards update.
    loadData();
    // unwrap is stable across renders; loadData is the only real dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData]);

  return (
    <section id="monitoring" className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
            Infra <span className="text-emerald-400">Monitoring</span>
          </h2>
          <p className="text-slate-400 text-lg">
            État temps réel de l'infrastructure SallyCards
            <span className="text-slate-600"> · auto-refresh 60 s · cron VPS minuit UTC</span>
          </p>
        </div>

        {/* Bouton de check manuel */}
        <div className="flex justify-center mb-8">
          <button
            onClick={runManualCheck}
            disabled={manualChecking}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full shadow-lg shadow-emerald-500/30 transition-all"
          >
            <RefreshCw size={18} className={manualChecking ? 'animate-spin' : ''} />
            {manualChecking ? 'Vérification…' : 'Vérifier maintenant'}
          </button>
        </div>

        {/* Manual check results (priorité sur dernier heartbeat) */}
        {manualCheck && manualCheck.length > 0 && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <h3 className="text-emerald-400 font-bold text-sm mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} /> Vérification manuelle (depuis le VPS)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {manualCheck.map((c) => (
                <CheckRow key={c.service} check={c} />
              ))}
            </div>
          </div>
        )}
        {manualCheck && manualCheck.length === 0 && (
          <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center">
            <p className="text-amber-300 text-sm">
              Aucun heartbeat reçu pour l'instant — attends le prochain run du cron VPS (minuit UTC).
            </p>
          </div>
        )}

        {/* Grille de services — statut courant */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {(['api', 'socket', 'turn', 'mongo', 'redis'] as const).map((svc) => {
            const meta = SERVICE_META[svc];
            const Icon = meta.icon;
            const lastResult = latest?.results.find((r) => r.service === svc);
            const stats = uptime?.[svc];
            const ok = lastResult?.ok ?? false;
            return (
              <div
                key={svc}
                className={`relative p-5 rounded-2xl border ${
                  ok
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : 'bg-red-500/5 border-red-500/30'
                } transition-colors`}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon size={28} color={meta.color} />
                  {ok ? (
                    <CheckCircle2 size={20} className="text-emerald-400" />
                  ) : (
                    <XCircle size={20} className="text-red-400" />
                  )}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{meta.label}</h3>
                <p className={`text-xs font-mono ${ok ? 'text-emerald-400' : 'text-red-400'}`}>
                  {ok ? `✓ ${lastResult?.latencyMs ?? 0}ms` : lastResult?.error ?? '✗ DOWN'}
                </p>
                {stats && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-slate-500 text-[10px] font-bold tracking-wider">UPTIME 30J</p>
                    <p className="text-white text-2xl font-black mt-1">
                      {stats.uptimePct.toFixed(2)}
                      <span className="text-slate-500 text-sm">%</span>
                    </p>
                    <p className="text-slate-600 text-[10px]">
                      {stats.ok} / {stats.total} checks OK
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Liste des URLs surveillées */}
        <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h3 className="text-slate-300 font-bold text-sm mb-3 flex items-center gap-2">
            URLs surveillées
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400 font-mono">
            <li>🌐 <a href="https://api.salistar.com/api/v1/health" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">api.salistar.com/api/v1/health</a></li>
            <li>🔌 <a href="https://ws.salistar.com/health" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">ws.salistar.com/health</a></li>
            <li>📞 turn.salistar.com:3478 (TCP/UDP)</li>
            <li>🗄 <a href="https://mongo.salistar.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">mongo.salistar.com</a> (auth)</li>
            <li>⚡ <a href="https://redis.salistar.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">redis.salistar.com</a> (auth)</li>
            <li>🌍 <a href="https://sallycards.salistar.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">sallycards.salistar.com</a></li>
            <li>⚙ <a href="https://backoffice.salistar.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">backoffice.salistar.com</a></li>
            <li>📺 <a href="https://salistar.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">salistar.com</a></li>
            <li>🛠 <a href="https://api.salistar.com/api/docs" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">api.salistar.com/api/docs</a></li>
          </ul>
        </div>

        {latest && (
          <p className="text-center text-slate-600 text-xs mt-6">
            Dernier check : {new Date(latest.checkedAt).toLocaleString('fr-FR')} ·
            Source : <span className="text-slate-400 font-mono">{latest.source}</span>
          </p>
        )}

        {loading && !latest && (
          <p className="text-center text-slate-500 text-sm">Chargement…</p>
        )}
      </div>
    </section>
  );
}

function CheckRow({ check }: { check: ServiceCheck }) {
  const meta = SERVICE_META[check.service];
  return (
    <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-lg">
      {check.ok ? (
        <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
      ) : (
        <XCircle size={18} className="text-red-400 flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-bold">{meta?.label ?? check.service}</p>
        <p className={`text-xs font-mono truncate ${check.ok ? 'text-emerald-400' : 'text-red-400'}`}>
          {check.ok ? `${check.latencyMs}ms` : check.error ?? 'ERROR'}
        </p>
      </div>
    </div>
  );
}

// probeHttp() removed: browser-side cross-origin probes for TURN (UDP) and
// internal Mongo are impossible. We now defer ALL real probes to the VPS
// cron + the on-demand /infra-monitoring/check-now backend endpoint.
