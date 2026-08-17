'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, LoaderCircle } from 'lucide-react';
import { Suspense } from 'react';

function Formulaire() {
  const router = useRouter();
  const params = useSearchParams();
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [envoi, setEnvoi] = useState(false);

  const suite = params.get('suite') || '/dashboard';

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    setErreur('');
    setEnvoi(true);
    try {
      const r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: motDePasse }),
      });
      const data = await r.json();
      if (!r.ok || !data.ok) {
        setErreur(data.error || 'Connexion impossible.');
        return;
      }
      // `refresh` avant `push` : sans lui, le middleware peut encore lire
      // l'ancien etat de cookie et renvoyer aussitot vers /login.
      router.refresh();
      router.push(suite);
    } catch {
      setErreur('Serveur injoignable.');
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form onSubmit={soumettre} className="w-full max-w-sm">
      <div
        className="rounded-2xl p-8 border"
        style={{
          background: 'rgba(10, 31, 68, 0.75)',
          borderColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{
            background: 'linear-gradient(135deg, #2563EB, #60A5FA)',
            border: '1.5px solid rgba(252,211,77,0.45)',
          }}
        >
          <Lock size={20} color="#F8FAFC" />
        </div>

        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: '#F8FAFC', fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Espace privé
        </h1>
        <p className="text-sm mb-6" style={{ color: '#97a0b4' }}>
          Messages reçus depuis salistar.com et salorie.com.
        </p>

        <label className="block text-sm mb-2" style={{ color: 'rgba(248,250,252,0.85)' }}>
          Mot de passe
        </label>
        <input
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-lg px-4 py-3 text-sm outline-none mb-4"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#F8FAFC',
          }}
        />

        {erreur && (
          <p className="text-sm mb-4" style={{ color: '#FCA5A5' }} role="alert">
            {erreur}
          </p>
        )}

        <button
          type="submit"
          disabled={envoi || !motDePasse}
          className="btn-primary w-full justify-center"
          style={{ opacity: envoi || !motDePasse ? 0.6 : 1 }}
        >
          {envoi ? <LoaderCircle size={18} className="animate-spin" /> : <Lock size={18} />}
          {envoi ? 'Connexion…' : 'Se connecter'}
        </button>
      </div>
    </form>
  );
}

export default function PageConnexion() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="grid-pattern fixed inset-0 -z-10 opacity-50" aria-hidden />
      <Suspense fallback={null}>
        <Formulaire />
      </Suspense>
    </main>
  );
}
