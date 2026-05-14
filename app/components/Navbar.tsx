'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#sallycards', label: 'SallyCards' },
  { href: '#testing', label: 'Testing' },
  { href: '#monitoring', label: 'Monitoring' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

/**
 * Premium navbar — transparent at top, navy + backdrop-blur after 50px
 * of scroll. Brand mark on the left (gold-edged "IK" with electric-blue
 * gradient fill), gold CTA button on the right.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
      style={{
        height: '80px',
        backgroundColor: scrolled ? 'rgba(10, 31, 68, 0.95)' : 'rgba(10, 31, 68, 0.45)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
        borderBottomColor: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
        boxShadow: scrolled ? '0 4px 30px rgba(10,31,68,0.4)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group flex-shrink-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #60A5FA)',
              color: '#F8FAFC',
              boxShadow: '0 4px 16px rgba(96,165,250,0.4)',
              border: '1.5px solid rgba(252,211,77,0.45)',
            }}
          >
            IK
          </div>
          <span
            className="font-bold tracking-tight text-lg hidden sm:block"
            style={{ color: '#F8FAFC', fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Idriss <span style={{ color: '#FCD34D' }}>Kriouile</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 text-sm font-medium rounded-lg transition"
                style={{ color: 'rgba(248,250,252,0.8)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FCD34D';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(248,250,252,0.8)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5"
        >
          Get in touch →
        </a>

        <button
          aria-label="Menu"
          className="md:hidden p-2 rounded-lg"
          style={{ color: '#F8FAFC', background: 'rgba(255,255,255,0.06)' }}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden border-t px-6 py-4 space-y-1"
          style={{
            backgroundColor: 'rgba(10, 31, 68, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTopColor: 'rgba(255,255,255,0.08)',
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium"
              style={{ color: 'rgba(248,250,252,0.85)' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block btn-primary text-sm mt-3 text-center"
          >
            Get in touch →
          </a>
        </div>
      )}
    </nav>
  );
}
