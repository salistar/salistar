import { ArrowRight, Github, Mail, MapPin } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-start max-w-4xl section-fade">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#5cd2c4] animate-glow" />
            <span className="text-[#97a0b4]">Available for new opportunities</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mb-6">
            Hi, I&apos;m <span className="gradient-text">Idriss</span>.
            <br />
            <span className="text-[#97a0b4] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
              Tech Entrepreneur &amp; Full-Stack Developer.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#97a0b4] max-w-2xl mb-8 leading-relaxed">
            Founder of <span className="text-[#f5b13a] font-semibold">SallyStar</span>. I design and build mobile
            games, real-time distributed systems, and product platforms — from the database all the way to the
            App Store. Currently shipping{' '}
            <a href="#sallycards" className="text-[#5cd2c4] hover:underline">
              SallyCards
            </a>
            , a suite of 11 card games for the MENA region.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
            <a href="#projects" className="btn-primary">
              View my work <ArrowRight size={18} />
            </a>
            <a href="mailto:salistarcompany@gmail.com" className="btn-ghost">
              <Mail size={18} /> Contact me
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#97a0b4]">
            <a
              href="https://github.com/salistar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[#e7e9ee] transition"
            >
              <Github size={16} /> github.com/salistar
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} /> Morocco · Remote-friendly
            </span>
            <a
              href="mailto:salistarcompany@gmail.com"
              className="inline-flex items-center gap-2 hover:text-[#e7e9ee] transition"
            >
              <Mail size={16} /> salistarcompany@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '11', label: 'Mobile games shipped' },
            { value: '8', label: 'Production containers' },
            { value: '5+', label: 'Years building products' },
            { value: '24/7', label: 'Cloud uptime' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="gradient-border p-6 transition hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-[#97a0b4] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
