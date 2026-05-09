import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { SallyCardsShowcase } from './components/SallyCardsShowcase';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <div className="grid-pattern fixed inset-0 -z-10 opacity-60" aria-hidden />
      <div
        className="glow-orb -z-10"
        style={{ top: '-20%', left: '-10%', width: '500px', height: '500px', background: '#f5b13a' }}
        aria-hidden
      />
      <div
        className="glow-orb -z-10"
        style={{ top: '40%', right: '-10%', width: '600px', height: '600px', background: '#ec5990' }}
        aria-hidden
      />
      <div
        className="glow-orb -z-10"
        style={{ bottom: '-10%', left: '20%', width: '500px', height: '500px', background: '#5cd2c4' }}
        aria-hidden
      />

      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <SallyCardsShowcase />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
