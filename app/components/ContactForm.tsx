'use client';

import { useState } from 'react';
import { Send, LoaderCircle, CheckCircle2 } from 'lucide-react';

/**
 * Formulaire de contact. Poste sur /api/contact, qui enregistre le message
 * puis notifie par email.
 *
 * Le meme composant sert sur salorie.com : la prop `site` indique d'ou vient
 * le message, et `action` permet d'y viser l'API de salistar (les deux sites
 * partagent un seul tableau de bord — un seul endroit a consulter).
 */
export function ContactForm({
  site = 'salistar.com',
  action = '/api/contact',
  langue = 'fr',
}: {
  site?: string;
  action?: string;
  langue?: 'fr' | 'en';
}) {
  const [envoi, setEnvoi] = useState(false);
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState('');

  const t =
    langue === 'en'
      ? {
          nom: 'Name',
          email: 'Email',
          sujet: 'Subject',
          message: 'Message',
          envoyer: 'Send message',
          envoiEnCours: 'Sending…',
          merci: 'Message sent. I usually reply within 24 hours.',
          autre: 'Send another',
        }
      : {
          nom: 'Nom',
          email: 'Email',
          sujet: 'Sujet',
          message: 'Message',
          envoyer: 'Envoyer le message',
          envoiEnCours: 'Envoi…',
          merci: 'Message envoyé. Je réponds généralement sous 24 h.',
          autre: 'Envoyer un autre message',
        };

  async function soumettre(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur('');
    setEnvoi(true);

    const donnees = new FormData(e.currentTarget);
    try {
      const r = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: donnees.get('name'),
          email: donnees.get('email'),
          subject: donnees.get('subject'),
          message: donnees.get('message'),
          website: donnees.get('website'), // piege a robots
          site,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        setErreur(data.error || 'Envoi impossible. Réessaie dans un instant.');
        return;
      }
      setEnvoye(true);
    } catch {
      setErreur('Serveur injoignable.');
    } finally {
      setEnvoi(false);
    }
  }

  if (envoye) {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{ background: 'rgba(37, 99, 235, 0.12)', border: '1px solid rgba(252,211,77,0.35)' }}
      >
        <CheckCircle2 size={32} style={{ color: '#FCD34D', margin: '0 auto 12px' }} />
        <p style={{ color: '#F8FAFC' }}>{t.merci}</p>
        <button
          onClick={() => setEnvoye(false)}
          className="mt-4 text-sm underline"
          style={{ color: '#97a0b4' }}
        >
          {t.autre}
        </button>
      </div>
    );
  }

  const champ: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#F8FAFC',
  };

  return (
    <form onSubmit={soumettre} className="text-left max-w-2xl mx-auto">
      {/* Champ piege : cache aux humains, rempli par les robots. `aria-hidden`
          et `tabIndex={-1}` pour qu'un lecteur d'ecran ne le propose jamais. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
      />

      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <input
          name="name"
          placeholder={t.nom}
          className="rounded-lg px-4 py-3 text-sm outline-none"
          style={champ}
        />
        <input
          name="email"
          type="email"
          required
          placeholder={t.email}
          className="rounded-lg px-4 py-3 text-sm outline-none"
          style={champ}
        />
      </div>

      <input
        name="subject"
        placeholder={t.sujet}
        className="w-full rounded-lg px-4 py-3 text-sm outline-none mb-4"
        style={champ}
      />

      <textarea
        name="message"
        required
        rows={5}
        minLength={10}
        placeholder={t.message}
        className="w-full rounded-lg px-4 py-3 text-sm outline-none mb-4 resize-y"
        style={champ}
      />

      {erreur && (
        <p className="text-sm mb-4" style={{ color: '#FCA5A5' }} role="alert">
          {erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={envoi}
        className="btn-primary w-full justify-center"
        style={{ opacity: envoi ? 0.6 : 1 }}
      >
        {envoi ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}
        {envoi ? t.envoiEnCours : t.envoyer}
      </button>
    </form>
  );
}
