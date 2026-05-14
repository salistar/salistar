import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { SallyCardsShowcase } from './components/SallyCardsShowcase';
import { Testing } from './components/Testing';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import Monitoring from './components/Monitoring';

/**
 * Salistar portfolio home — premium blue identity aligned with
 * sallycards.salistar.com. Vertical 4-stop gradient navy→royal→electric→royal,
 * card-suit watermarks at 5% opacity, gold accents, Playfair Display titles.
 */
export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Subtle grid pattern */}
      <div className="grid-pattern fixed inset-0 -z-10 opacity-50" aria-hidden />

      {/* Blue glow orbs — navy, electric, gold */}
      <div
        className="glow-orb -z-10"
        style={{ top: '-15%', left: '-10%', width: '600px', height: '600px', background: '#2563EB' }}
        aria-hidden
      />
      <div
        className="glow-orb -z-10"
        style={{ top: '40%', right: '-15%', width: '700px', height: '700px', background: '#60A5FA' }}
        aria-hidden
      />
      <div
        className="glow-orb -z-10"
        style={{ bottom: '-10%', left: '20%', width: '550px', height: '550px', background: '#FCD34D', opacity: 0.18 }}
        aria-hidden
      />

      {/* Card-suit watermarks — decorative, sit behind everything */}
      <span className="suit-watermark -z-10" style={{ top: '8%', right: '4%', fontSize: '22rem' }} aria-hidden>♠</span>
      <span className="suit-watermark -z-10" style={{ top: '40%', left: '-2%', fontSize: '20rem' }} aria-hidden>♥</span>
      <span className="suit-watermark -z-10" style={{ top: '72%', right: '-2%', fontSize: '24rem' }} aria-hidden>♦</span>
      <span className="suit-watermark -z-10" style={{ bottom: '-5%', left: '40%', fontSize: '18rem' }} aria-hidden>♣</span>

      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <SallyCardsShowcase />
      <Testing />
      <Monitoring />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
