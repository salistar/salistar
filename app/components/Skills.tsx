const groups = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Bash', 'Java', 'Kotlin'],
  },
  {
    title: 'Frontend',
    items: ['React', 'React Native', 'Next.js 15', 'Expo SDK 52', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    items: ['NestJS 11', 'Node.js', 'Express', 'Socket.IO', 'tRPC', 'GraphQL'],
  },
  {
    title: 'Databases',
    items: ['MongoDB 7', 'PostgreSQL', 'Redis 7', 'Prisma', 'Mongoose'],
  },
  {
    title: 'Infrastructure',
    items: ['Docker', 'Docker Compose', 'GitHub Actions', 'Hetzner Cloud', 'Cloudflare', 'Cloudflare Tunnel', 'Cloudflare Workers', 'Linux'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'gh CLI', 'pnpm', 'Nx monorepo', 'EAS Build', 'adb', 'gradle'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <span className="tag mb-4">Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            My <span className="gradient-text">tech stack</span>.
          </h2>
          <p className="text-lg text-[#97a0b4] leading-relaxed">
            Tools and technologies I use day-to-day. I&apos;m language-agnostic — what matters is choosing the right tool
            for the job.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g) => (
            <div key={g.title} className="gradient-border p-6">
              <h3 className="font-semibold mb-4 text-[#f5b13a]">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <span key={i} className="tag">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
