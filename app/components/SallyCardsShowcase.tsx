import { Globe, Server, Database, Smartphone, Zap, Shield, ExternalLink } from 'lucide-react';

const games = [
  { name: 'Belote', pkg: 'com.sallycards.belote', desc: 'Belote française + Coinche, multi-joueur online + voice WebRTC' },
  { name: 'Concentration', pkg: 'com.sallycards.concentration', desc: 'Memory 3 niveaux, hot-seat 2 joueurs' },
  { name: 'Kant Copy', pkg: 'com.sallycards.kantcopy', desc: 'Kant Copy marocain, multi WebRTC + bots' },
  { name: 'Kdoub', pkg: 'com.sallycards.kdoub', desc: 'Kdoub traditionnel, tournois locaux + online' },
  { name: 'Okey', pkg: 'com.sallycards.okey', desc: 'Okey turc 4 joueurs + tuiles + jokers' },
  { name: 'Poker', pkg: 'com.sallycards.poker', desc: "Texas Hold'em No Limit + tournois Sit & Go" },
  { name: 'Qui Est-Ce ?', pkg: 'com.sallycards.quiestce', desc: 'Guess Who 1v1 local/online + bot heuristique' },
  { name: 'Ronda', pkg: 'com.sallycards.ronda', desc: 'Ronda marocaine 2-4 joueurs, chkobba/sietta' },
  { name: 'Scopa', pkg: 'com.sallycards.scopa', desc: 'Scopa italien + Scopone scientifico 4 joueurs' },
  { name: 'Solitaire', pkg: 'com.sallycards.solitaire', desc: 'Klondike + Spider + FreeCell, solo only' },
  { name: 'Tarot', pkg: 'com.sallycards.tarot', desc: 'Tarot français 78 cartes, Petite/Garde/Chelem' },
];

const urls = [
  { label: 'Web app', url: 'https://sallycards.salistar.com', desc: 'Next.js 15 + React 19 — landing & web client' },
  { label: 'API REST', url: 'https://api.salistar.com/api/v1', desc: 'NestJS 11 + MongoDB + JWT' },
  { label: 'WebSocket', url: 'https://ws.salistar.com', desc: 'Socket.IO 4 + Redis adapter — real-time multiplayer' },
  { label: 'MongoDB admin', url: 'https://mongo.salistar.com', desc: 'mongo-express UI (Basic Auth)' },
  { label: 'Redis admin', url: 'https://redis.salistar.com', desc: 'redis-commander UI (Basic Auth, nginx sidecar)' },
  { label: 'TURN/STUN', url: 'turn.salistar.com', desc: 'WebRTC media relay (separate VPS)' },
];

const containers = [
  { name: 'sallycards-api', img: 'ghcr.io/.../sallycards-api', kind: 'build' },
  { name: 'sallycards-socket', img: 'ghcr.io/.../sallycards-socket', kind: 'build' },
  { name: 'sallycards-web', img: 'ghcr.io/.../sallycards-web', kind: 'build' },
  { name: 'sallycards-mongo', img: 'mongo:7.0', kind: 'pull' },
  { name: 'sallycards-redis', img: 'redis:7.2-alpine', kind: 'pull' },
  { name: 'mongo-express', img: 'mongo-express:1.0', kind: 'pull' },
  { name: 'redis-commander', img: 'rediscommander/redis-commander', kind: 'pull' },
  { name: 'redis-auth-proxy', img: 'ghcr.io/.../sallycards-redis-auth-proxy', kind: 'build' },
];

const features = [
  { icon: Smartphone, title: '11 mobile games', desc: 'React Native + Expo SDK 52, native Android & iOS via EAS Build' },
  { icon: Server, title: '8 prod containers', desc: 'NestJS API, Socket.IO server, Next.js web, Mongo, Redis, admin UIs' },
  { icon: Database, title: 'Real-time multiplayer', desc: 'Socket.IO over TLS, Redis pub/sub, optimistic UI, cross-device sync' },
  { icon: Globe, title: 'Cloudflare Tunnel', desc: 'Zero public ports on the VPS — DDoS protection + SSL handled by Cloudflare' },
  { icon: Zap, title: '5-min CI/CD', desc: 'GitHub Actions builds 4 Docker images + deploys via SSH every push to main' },
  { icon: Shield, title: 'Hardened by default', desc: 'fail2ban, UFW, key-only SSH, .env.production chmod 600, JWT rotation' },
];

export function SallyCardsShowcase() {
  return (
    <section
      id="sallycards"
      className="relative py-32 px-6 border-y border-white/5 bg-gradient-to-b from-transparent via-[#1a2236]/30 to-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <span className="tag mb-4">Featured project</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">SallyCards</span> — a complete suite of card games for MENA.
          </h2>
          <p className="text-lg text-[#97a0b4] leading-relaxed">
            11 mobile games sharing a single backend — REST API, WebSocket multiplayer, MongoDB persistence, Redis cache.
            Deployed on a single Hetzner VPS (€10/month total) with full CI/CD via GitHub Actions, exposed through
            Cloudflare Tunnel with zero open ports on the server.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="gradient-border p-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f5b13a]/20 to-[#5cd2c4]/20 flex items-center justify-center text-[#5cd2c4] mb-3">
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-[#97a0b4] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Globe size={22} className="text-[#f5b13a]" /> Production URLs
            </h3>
            <div className="space-y-3">
              {urls.map((u) => (
                <a
                  key={u.url}
                  href={u.url.startsWith('http') ? u.url : undefined}
                  target={u.url.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="block gradient-border p-4 transition hover:-translate-x-1"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{u.label}</span>
                        {u.url.startsWith('http') && <ExternalLink size={12} className="text-[#97a0b4]" />}
                      </div>
                      <code className="text-xs text-[#5cd2c4] break-all block mb-1">{u.url}</code>
                      <p className="text-xs text-[#97a0b4]">{u.desc}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Server size={22} className="text-[#5cd2c4]" /> 8 production containers
            </h3>
            <div className="space-y-2">
              {containers.map((c) => (
                <div key={c.name} className="gradient-border p-4 flex items-center gap-4">
                  <div
                    className={`px-2 py-1 rounded text-xs font-bold tracking-wide ${
                      c.kind === 'build'
                        ? 'bg-[#f5b13a]/20 text-[#f5b13a] border border-[#f5b13a]/30'
                        : 'bg-[#5cd2c4]/20 text-[#5cd2c4] border border-[#5cd2c4]/30'
                    }`}
                  >
                    {c.kind === 'build' ? 'BUILD' : 'PULL'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono font-semibold text-sm">{c.name}</div>
                    <code className="text-xs text-[#97a0b4] break-all">{c.img}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Smartphone size={22} className="text-[#ec5990]" /> 11 mobile games
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {games.map((g) => (
              <div key={g.pkg} className="gradient-border p-4">
                <div className="font-semibold mb-1">{g.name}</div>
                <code className="text-[10px] text-[#5cd2c4] block mb-2 break-all">{g.pkg}</code>
                <p className="text-xs text-[#97a0b4] leading-snug">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          <a
            href="https://github.com/salistar/sallycards-backoffice"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Github size={18} /> SallyCards Backoffice repo
          </a>
          <a href="https://sallycards.salistar.com" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <ExternalLink size={18} /> Visit sallycards.salistar.com
          </a>
        </div>
      </div>
    </section>
  );
}

function Github(props: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 18}
      height={props.size ?? 18}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={props.className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.69-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.17a10.94 10.94 0 0 1 5.76 0c2.2-1.48 3.16-1.17 3.16-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.35.78 1.04.78 2.1v3.11c0 .31.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
