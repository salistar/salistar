import { Lightbulb, Rocket, Layers } from 'lucide-react';

const pillars = [
  {
    icon: Lightbulb,
    title: 'Product mindset',
    desc: 'I build with users in mind. Every feature ships with a measurable goal — retention, conversion, or speed.',
  },
  {
    icon: Layers,
    title: 'Full-stack ownership',
    desc: 'From Postgres queries to React Native gestures, I write code across the entire stack and ship it to production.',
  },
  {
    icon: Rocket,
    title: 'Ship fast, iterate faster',
    desc: 'CI/CD is non-negotiable. Every commit goes through tests, builds, and deploys automatically — in under 5 minutes.',
  },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <span className="tag mb-4">About</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            I turn ideas into <span className="gradient-text">production-ready</span> products.
          </h2>
          <p className="text-lg text-[#97a0b4] leading-relaxed">
            I&apos;m a self-taught full-stack engineer and entrepreneur based in Morocco. I founded{' '}
            <span className="text-[#f5b13a] font-semibold">SallyStar</span> to build digital products that solve real
            problems for the MENA region — starting with mobile gaming and expanding into hiring, geo-services, and AI
            tooling. I love systems that scale gracefully, codebases that are pleasant to read, and infrastructure that
            costs less than a coffee per day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="gradient-border p-7 transition hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#f5b13a]/20 to-[#ec5990]/20 flex items-center justify-center text-[#f5b13a] mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-[#97a0b4] leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
