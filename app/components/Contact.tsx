import { Mail, Github, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="gradient-border p-10 md:p-16 text-center">
          <span className="tag mb-4">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
            Have a project in mind? <span className="gradient-text">Let&apos;s talk.</span>
          </h2>
          <p className="text-lg text-[#97a0b4] leading-relaxed max-w-2xl mx-auto mb-10">
            Open to freelance work, full-time roles, technical co-founder roles, and interesting collaborations.
            I usually reply within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-2xl mx-auto mb-10">
            <a href="mailto:salistarcompany@gmail.com" className="btn-primary flex-1">
              <Send size={18} /> salistarcompany@gmail.com
            </a>
            <a
              href="https://github.com/salistar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost flex-1"
            >
              <Github size={18} /> github.com/salistar
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#97a0b4]">
            <span className="inline-flex items-center gap-2">
              <Mail size={14} /> salistarcompany@gmail.com
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} /> Morocco · Open to remote
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
