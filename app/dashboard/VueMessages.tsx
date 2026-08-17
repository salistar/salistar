'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Globe, Trash2, LogOut, Inbox, CheckCheck, RefreshCw } from 'lucide-react';
import type { Message } from '../lib/messages';

const OR = '#FCD34D';
const CLAIR = '#F8FAFC';
const GRIS = '#97a0b4';

function dateLisible(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function VueMessages({ initiaux }: { initiaux: Message[] }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initiaux);
  const [selection, setSelection] = useState<Message | null>(initiaux[0] || null);
  const [filtre, setFiltre] = useState<'tous' | 'non-lus'>('tous');
  const [rafraichit, setRafraichit] = useState(false);

  const visibles = useMemo(
    () => (filtre === 'non-lus' ? messages.filter((m) => !m.read) : messages),
    [messages, filtre],
  );
  const nonLus = messages.filter((m) => !m.read).length;

  async function ouvrir(m: Message) {
    setSelection(m);
    if (m.read) return;
    setMessages((liste) => liste.map((x) => (x.id === m.id ? { ...x, read: true } : x)));
    await fetch('/api/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: m.id, read: true }),
    }).catch(() => {});
  }

  async function supprimer(id: string) {
    // Optimiste : la liste se vide tout de suite. En cas d'echec reseau, le
    // rafraichissement suivant remet le message — pas de suppression fantome
    // cote serveur.
    setMessages((liste) => liste.filter((m) => m.id !== id));
    setSelection((s) => (s?.id === id ? null : s));
    await fetch('/api/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  }

  async function rafraichir() {
    setRafraichit(true);
    try {
      const r = await fetch('/api/messages');
      const data = await r.json();
      if (data.ok) setMessages(data.messages);
    } catch {
      /* silencieux : le bouton reprend son etat normal */
    } finally {
      setRafraichit(false);
    }
  }

  async function deconnexion() {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    router.refresh();
    router.push('/');
  }

  return (
    <main className="min-h-screen">
      <div className="grid-pattern fixed inset-0 -z-10 opacity-50" aria-hidden />

      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: 'rgba(10, 31, 68, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottomColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Inbox size={20} color={OR} />
            <h1
              className="text-lg font-bold"
              style={{ color: CLAIR, fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Messages
            </h1>
            {nonLus > 0 && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: OR, color: '#0A1F44' }}
              >
                {nonLus}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFiltre((f) => (f === 'tous' ? 'non-lus' : 'tous'))}
              className="text-xs px-3 py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.06)', color: CLAIR }}
            >
              {filtre === 'tous' ? 'Non lus' : 'Tous'}
            </button>
            <button
              onClick={rafraichir}
              aria-label="Rafraîchir"
              className="p-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.06)', color: CLAIR }}
            >
              <RefreshCw size={16} className={rafraichit ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={deconnexion}
              className="text-xs px-3 py-2 rounded-lg inline-flex items-center gap-2"
              style={{ background: 'rgba(255,255,255,0.06)', color: CLAIR }}
            >
              <LogOut size={14} /> Quitter
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <section className="space-y-2">
          {visibles.length === 0 && (
            <p className="text-sm py-8 text-center" style={{ color: GRIS }}>
              {filtre === 'non-lus' ? 'Aucun message non lu.' : 'Aucun message pour le moment.'}
            </p>
          )}

          {visibles.map((m) => (
            <button
              key={m.id}
              onClick={() => ouvrir(m)}
              className="w-full text-left rounded-xl p-4 border transition"
              style={{
                background:
                  selection?.id === m.id ? 'rgba(37, 99, 235, 0.18)' : 'rgba(10, 31, 68, 0.6)',
                borderColor:
                  selection?.id === m.id ? 'rgba(252,211,77,0.45)' : 'rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="inline-flex items-center gap-2 text-xs" style={{ color: GRIS }}>
                  {m.source === 'email' ? <Mail size={13} /> : <Globe size={13} />}
                  {m.source === 'email' ? 'Email' : m.site}
                </span>
                <span className="text-xs" style={{ color: GRIS }}>
                  {dateLisible(m.receivedAt)}
                </span>
              </div>
              <p
                className="text-sm truncate"
                style={{ color: CLAIR, fontWeight: m.read ? 500 : 700 }}
              >
                {m.subject}
              </p>
              <p className="text-xs truncate" style={{ color: GRIS }}>
                {m.fromName ? `${m.fromName} · ` : ''}
                {m.from}
              </p>
            </button>
          ))}
        </section>

        <section
          className="rounded-2xl p-6 border min-h-[50vh]"
          style={{ background: 'rgba(10, 31, 68, 0.6)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {!selection ? (
            <p className="text-sm" style={{ color: GRIS }}>
              Sélectionne un message.
            </p>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <h2 className="text-xl font-bold mb-1" style={{ color: CLAIR }}>
                    {selection.subject}
                  </h2>
                  <p className="text-sm" style={{ color: GRIS }}>
                    {selection.fromName ? `${selection.fromName} · ` : ''}
                    <a href={`mailto:${selection.from}`} style={{ color: '#93C5FD' }}>
                      {selection.from}
                    </a>
                    {' · '}
                    {dateLisible(selection.receivedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={`mailto:${selection.from}?subject=${encodeURIComponent(`Re: ${selection.subject}`)}`}
                    className="text-xs px-3 py-2 rounded-lg inline-flex items-center gap-2"
                    style={{ background: OR, color: '#0A1F44', fontWeight: 700 }}
                  >
                    <CheckCheck size={14} /> Répondre
                  </a>
                  <button
                    onClick={() => supprimer(selection.id)}
                    aria-label="Supprimer"
                    className="p-2 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#FCA5A5' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Rendu en TEXTE, jamais en HTML : un email est du contenu
                  hostile par defaut, et `dangerouslySetInnerHTML` ici serait
                  une faille XSS offerte a quiconque connait l adresse. */}
              <pre
                className="text-sm whitespace-pre-wrap break-words leading-relaxed"
                style={{ color: 'rgba(248,250,252,0.9)', fontFamily: 'inherit' }}
              >
                {selection.text}
              </pre>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
