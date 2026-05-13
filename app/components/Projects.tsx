import Link from 'next/link';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

const projects = [
  {
    slug: 'sallycards',
    name: 'SallyCards',
    summary:
      '11 mobile card games for the MENA region (Solitaire, Belote, Ronda, Tarot, Scopa, Poker, Okey, Kdoub, Memory, Qui-Est-Ce?) with real-time multiplayer.',
    stack: ['React Native', 'NestJS', 'WebRTC', 'MongoDB'],
    color: 'from-[#5cd2c4] to-[#0a8aa8]',
  },
  {
    slug: 'sallyrecruit',
    name: 'SallyRecruit',
    summary:
      'Modern recruitment platform — candidate sourcing, applicant tracking, and structured interview workflows for MENA companies.',
    stack: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind'],
    color: 'from-[#5cd2c4] to-[#0a8aa8]',
  },
  {
    slug: 'sallyescapegeo',
    name: 'Sallyescapegeo',
    summary:
      'Geo-tracking and outdoor adventure logging — GPS trace recording, waypoint sharing, and route discovery, packaged as a mobile app.',
    stack: ['React Native', 'Expo', 'Mapbox', 'PostGIS'],
    color: 'from-[#ec5990] to-[#7e2d6f]',
  },
  {
    slug: 'darijabot',
    name: 'Darijabot',
    summary:
      'Conversational AI in Moroccan Darija — fine-tuned dialogue with retrieval-augmented context, custom dataset, and content moderation.',
    stack: ['OpenAI', 'Pinecone', 'Python', 'Next.js'],
    color: 'from-[#f5b13a] to-[#a8541a]',
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <span className="tag mb-4">Projects</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            What I&apos;m <span className="gradient-text">working on</span>.
          </h2>
          <p className="text-lg text-[#97a0b4] leading-relaxed">
            A selection of products from the SallyStar portfolio. The flagship project (SallyCards) has its own
            dedicated section below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="gradient-border p-7 group transition hover:-translate-y-1 block"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg`}
                >
                  <Sparkles size={20} className="text-[#0a0e1a]" />
                </div>
                <ExternalLink
                  size={18}
                  className="text-[#97a0b4] opacity-0 group-hover:opacity-100 transition"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-sm text-[#97a0b4] leading-relaxed mb-4">{p.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.stack.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
              <span className="text-xs text-[#5cd2c4] font-semibold inline-flex items-center gap-1">
                Read more <ExternalLink size={12} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/salistar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <Github size={18} /> See all projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
