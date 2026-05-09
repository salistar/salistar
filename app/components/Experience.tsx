import { Building2 } from 'lucide-react';

const items = [
  {
    period: '2024 — Present',
    role: 'Founder & Lead Developer',
    company: 'SallyStar (salistar.com)',
    desc: 'Founded SallyStar to ship digital products for the MENA region. Built and operate the entire stack: 11 mobile games (React Native + Expo), a NestJS backend with WebSocket multiplayer (Socket.IO + Redis), Next.js web apps, MongoDB persistence, and a single-VPS Docker deployment with full CI/CD via GitHub Actions and Cloudflare Tunnel.',
    tags: ['React Native', 'Expo', 'NestJS', 'Socket.IO', 'MongoDB', 'Redis', 'Docker', 'GitHub Actions', 'Cloudflare'],
  },
  {
    period: '2023 — 2024',
    role: 'Full-Stack Developer',
    company: 'Independent',
    desc: 'Designed and shipped a recruitment platform (SallyRecruit) and a geo-tracking application (Sallyescapegeo). Built a Darija (Moroccan Arabic) chatbot powered by an LLM with custom retrieval. Owned the full lifecycle: product spec, UI/UX, code, deployment, and post-launch support.',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'OpenAI', 'Tailwind'],
  },
  {
    period: '2022 — 2023',
    role: 'Software Engineer',
    company: 'Earlier projects',
    desc: 'Worked on internal tools and prototypes covering Android native development, e-commerce integrations, and data pipelines. Established a personal devops workflow centered on Docker, Linux servers, and reproducible deployments.',
    tags: ['Java', 'Kotlin', 'Python', 'Docker', 'Linux'],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <span className="tag mb-4">Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            A timeline of <span className="gradient-text">building &amp; shipping</span>.
          </h2>
          <p className="text-lg text-[#97a0b4] leading-relaxed">
            Five years of writing code that runs in production — from solo experiments to founding a company.
          </p>
        </div>

        <div className="relative pl-12 space-y-10">
          <div className="timeline-line" />
          {items.map((item, i) => (
            <article key={i} className="relative">
              <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#f5b13a] to-[#ec5990] flex items-center justify-center shadow-lg ring-4 ring-[#0a0e1a]">
                <Building2 size={16} className="text-[#0a0e1a]" />
              </div>
              <div className="gradient-border p-7">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <span className="text-[#97a0b4]">·</span>
                  <span className="text-[#5cd2c4] font-medium">{item.company}</span>
                </div>
                <p className="text-sm text-[#97a0b4] mb-4">{item.period}</p>
                <p className="text-[#e7e9ee]/90 leading-relaxed mb-4">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
