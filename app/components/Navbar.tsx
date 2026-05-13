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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${
        scrolled
          ? 'bg-[#0a0e1a]/95 border-white/10 shadow-lg shadow-black/40'
          : 'bg-[#0a0e1a]/80 border-white/5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f5b13a] via-[#ec5990] to-[#5cd2c4] flex items-center justify-center font-bold text-[#0a0e1a] text-lg shadow-lg group-hover:scale-110 transition">
            ik
          </div>
          <span className="font-semibold tracking-tight text-lg hidden sm:block">
            Idriss <span className="text-[#97a0b4]">Kriouile</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-[#97a0b4] hover:text-[#e7e9ee] transition-colors rounded-lg hover:bg-white/5"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex btn-primary text-sm px-4 py-2"
        >
          Get in touch
        </a>

        <button
          aria-label="Menu"
          className="md:hidden p-2 rounded-lg hover:bg-white/5"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a0e1a]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-[#97a0b4] hover:text-[#e7e9ee]"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block btn-primary text-sm mt-3 text-center">
            Get in touch
          </a>
        </div>
      )}
    </nav>
  );
}
