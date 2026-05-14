import { ArrowRight, Github, Mail, MapPin } from 'lucide-react';

/**
 * Hero — premium identity. Playfair Display headline with shimmering gold
 * accent, royal-blue subtitle pill, glassmorphism stat cards, gold CTA.
 */
export function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-start max-w-4xl section-fade">
          {/* Availability badge */}
          <div
            className="inline-flex items-center gap-2.5 mb-8 px-5 py-2.5 rounded-full border"
            style={{
              backgroundColor: 'rgba(252,211,77,0.12)',
              borderColor: 'rgba(252,211,77,0.4)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: '#FCD34D' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#FCD34D' }} />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#FCD34D' }}>
              Available for new opportunities
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-black tracking-tighter leading-[0.95] mb-6"
            style={{
              fontFamily: "'Playfair Display', 'Cairo', Georgia, serif",
              fontSize: 'clamp(3.25rem, 7vw, 6rem)',
              color: '#F8FAFC',
            }}
          >
            Hi, I&apos;m <span className="gradient-text">Idriss</span>.
            <br />
            <span
              className="font-medium block mt-2"
              style={{
                color: 'rgba(248,250,252,0.78)',
                fontSize: 'clamp(1.5rem, 3.2vw, 2.75rem)',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
              }}
            >
              Tech Entrepreneur &amp; Full-Stack Developer.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            style={{ color: 'rgba(248,250,252,0.78)' }}
          >
            Founder of <span className="font-bold" style={{ color: '#FCD34D' }}>SallyStar</span>. I design and build mobile
            games, real-time distributed systems, and product platforms — from the database all the way to the
            App Store. Currently shipping{' '}
            <a
              href="#sallycards"
              className="font-bold underline-offset-4 hover:underline"
              style={{ color: '#60A5FA' }}
            >
              SallyCards
            </a>
            , a suite of 11 card games for the MENA region.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
            <a href="#projects" className="btn-primary">
              View my work <ArrowRight size={18} />
            </a>
            <a href="mailto:salistarcompany@gmail.com" className="btn-ghost">
              <Mail size={18} /> Contact me
            </a>
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: 'rgba(248,250,252,0.65)' }}>
            <a
              href="https://github.com/salistar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition"
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FCD34D')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,250,252,0.65)')}
            >
              <Github size={16} /> github.com/salistar
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} /> Morocco · Remote-friendly
            </span>
            <a
              href="mailto:salistarcompany@gmail.com"
              className="inline-flex items-center gap-2 transition"
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FCD34D')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,250,252,0.65)')}
            >
              <Mail size={16} /> salistarcompany@gmail.com
            </a>
          </div>
        </div>

        {/* Stats — 4 premium glassmorphism cards */}
        <div className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '11', label: 'Mobile games shipped' },
            { value: '8', label: 'Production containers' },
            { value: '5+', label: 'Years building products' },
            { value: '24/7', label: 'Cloud uptime' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="gradient-border p-7 transition hover:scale-[1.03] hover:-translate-y-1"
            >
              <div
                className="text-4xl md:text-5xl font-black gradient-text mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1 }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(248,250,252,0.75)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
