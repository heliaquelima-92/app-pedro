'use client';

import { useState, useCallback } from 'react';
import BackButton from '../../components/BackButton';
import SpeakButton from '../../components/SpeakButton';
import ProgressBar from '../../components/ProgressBar';
import Confetti from '../../components/Confetti';
import { KID_NAME, MESSAGES, getRandomMessage } from '../config';

const vogais = [
  { letra: 'A', palavra: 'Abacaxi', emoji: '🍍', cor: 'from-red-400 to-pink-500' },
  { letra: 'E', palavra: 'Elefante', emoji: '🐘', cor: 'from-blue-400 to-indigo-500' },
  { letra: 'I', palavra: 'Iglu', emoji: '🧊', cor: 'from-cyan-400 to-teal-500' },
  { letra: 'O', palavra: 'Ovo', emoji: '🥚', cor: 'from-orange-400 to-amber-500' },
  { letra: 'U', palavra: 'Uva', emoji: '🍇', cor: 'from-purple-400 to-violet-500' },
];

export default function VogaisPage() {
  const [index, setIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);

  const atual = vogais[index];

  const next = useCallback(() => {
    if (index < vogais.length - 1) {
      setIndex(index + 1);
    } else {
      setShowConfetti(true);
      setCompleted(true);
      localStorage.setItem('stars_vogais', '3');
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [index]);

  const prev = useCallback(() => {
    if (index > 0) setIndex(index - 1);
  }, [index]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {showConfetti && <Confetti />}

      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <BackButton />
          <h1 className="text-3xl font-bold text-white drop-shadow">🔤 Vogais</h1>
          <div className="w-20" />
        </div>

        <ProgressBar current={index + (completed ? 1 : 0)} total={vogais.length} />

        <div className={`bg-gradient-to-br ${atual.cor} rounded-3xl p-8 md:p-12 text-center card-hover relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/10 rounded-3xl animate-pulse-slow" />

          <div className="relative z-10">
            <div className="text-8xl md:text-9xl font-black text-white drop-shadow-lg mb-4 animate-float">
              {atual.letra}
            </div>

            <div className="text-6xl mb-4 animate-bounce-slow">{atual.emoji}</div>

            <p className="text-2xl text-white font-bold mb-2">
              {atual.letra} de {atual.palavra}
            </p>

            <p className="text-white/80 text-sm mb-4">
              {getRandomMessage('hints')}
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <SpeakButton text={atual.letra} label={`Falar vogal ${atual.letra}`} />
              <SpeakButton text={atual.palavra} label={`Falar palavra ${atual.palavra}`} />
            </div>
          </div>
        </div>

        {completed ? (
          <div className="mt-8 text-center animate-pop">
            <div className="text-6xl mb-2">🎉🏆🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {MESSAGES.levelComplete('as vogais')}
            </h2>
            <p className="text-white/90 text-lg">{getRandomMessage('success')}</p>
            <div className="flex justify-center gap-2 mt-4">
              {[1,2,3].map(s => <span key={s} className="text-4xl star">⭐</span>)}
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={index === 0}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-30 text-white rounded-full px-6 py-3 font-bold transition-all"
            >
              ← Anterior
            </button>
            <button
              onClick={next}
              className="bg-white text-purple-600 hover:bg-white/90 rounded-full px-8 py-3 font-bold text-lg transition-all shadow-lg"
            >
              {index === vogais.length - 1 ? `Finalizar, ${KID_NAME}!` : 'Próxima →'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
