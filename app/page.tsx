'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { KID_NAME, MESSAGES } from './config';

const levels = [
  {
    id: 'vogais',
    title: 'Vogais',
    emoji: '🔤',
    color: 'from-pink-400 to-rose-500',
    desc: `A, E, I, O, U com sons e animações!`,
  },
  {
    id: 'formas',
    title: 'Formas',
    emoji: '🔷',
    color: 'from-cyan-400 to-blue-500',
    desc: 'Quadrado, círculo, triângulo e mais!',
  },
  {
    id: 'numeros',
    title: 'Números',
    emoji: '🔢',
    color: 'from-amber-400 to-orange-500',
    desc: 'Conte de 1 a 10 de forma divertida!',
  },
  {
    id: 'fala',
    title: 'Fala e Pronúncia',
    emoji: '🎤',
    color: 'from-emerald-400 to-green-500',
    desc: 'Pratique falando com o microfone!',
  },
];

export default function Home() {
  const [stars, setStars] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const total = levels.reduce((acc, lvl) => {
      const s = localStorage.getItem(`stars_${lvl.id}`);
      return acc + (s ? parseInt(s) : 0);
    }, 0);
    setStars(total);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8 animate-pop">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-2">
          🌟 EduKids
        </h1>
        <p className="text-xl text-white/90 drop-shadow">
          {MESSAGES.welcome}
        </p>
        {mounted && stars > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-6 py-2">
            <span className="text-2xl">⭐</span>
            <span className="text-white font-bold text-lg">{stars} estrelas conquistadas!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full">
        {levels.map((level, idx) => (
          <Link
            key={level.id}
            href={`/${level.id}`}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${level.color} p-6 card-hover`}
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="text-5xl mb-3 animate-float">{level.emoji}</div>
              <h2 className="text-2xl font-bold text-white mb-1">{level.title}</h2>
              <p className="text-white/90 text-sm">{level.desc}</p>
              {mounted && (
                <div className="mt-4 flex items-center gap-1">
                  {[1, 2, 3].map((s) => (
                    <span
                      key={s}
                      className={`text-xl ${
                        parseInt(localStorage.getItem(`stars_${level.id}`) || '0') >= s
                          ? 'star'
                          : 'text-white/30'
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-12 text-white/60 text-sm">
        Feito com 💜 para {KID_NAME}
      </footer>
    </main>
  );
}
