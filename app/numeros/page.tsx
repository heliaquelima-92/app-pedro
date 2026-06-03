'use client';

import { useState, useCallback } from 'react';
import BackButton from '@/components/BackButton';
import SpeakButton from '@/components/SpeakButton';
import ProgressBar from '@/components/ProgressBar';
import Confetti from '@/components/Confetti';
import { KID_NAME, MESSAGES, getRandomMessage } from '../config';

const numeros = [
  { num: 1, emoji: '🍎', cor: 'from-red-400 to-rose-500' },
  { num: 2, emoji: '🍌', cor: 'from-yellow-400 to-amber-500' },
  { num: 3, emoji: '🍇', cor: 'from-purple-400 to-violet-500' },
  { num: 4, emoji: '🍊', cor: 'from-orange-400 to-amber-500' },
  { num: 5, emoji: '🍓', cor: 'from-pink-400 to-rose-500' },
  { num: 6, emoji: '🍒', cor: 'from-red-400 to-pink-500' },
  { num: 7, emoji: '🍑', cor: 'from-orange-300 to-amber-400' },
  { num: 8, emoji: '🍍', cor: 'from-yellow-300 to-amber-400' },
  { num: 9, emoji: '🥝', cor: 'from-green-400 to-emerald-500' },
  { num: 10, emoji: '🍉', cor: 'from-green-500 to-teal-500' },
];

function ContagemVisual({ num, emoji }: { num: number; emoji: string }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
      {Array.from({ length: num }).map((_, i) => (
        <span key={i} className="text-3xl animate-pop" style={{ animationDelay: `${i * 100}ms` }}>
          {emoji}
        </span>
      ))}
    </div>
  );
}

export default function NumerosPage() {
  const [index, setIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);

  const atual = numeros[index];

  const next = useCallback(() => {
    if (index < numeros.length - 1) {
      setIndex(index + 1);
    } else {
      setShowConfetti(true);
      setCompleted(true);
      localStorage.setItem('stars_numeros', '3');
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
          <h1 className="text-3xl font-bold text-white drop-shadow">🔢 Números</h1>
          <div className="w-20" />
        </div>

        <ProgressBar current={index + (completed ? 1 : 0)} total={numeros.length} />

        <div className={`bg-gradient-to-br ${atual.cor} rounded-3xl p-8 md:p-12 text-center card-hover`}>
          <div className="text-8xl md:text-9xl font-black text-white drop-shadow-lg mb-4 animate-float">
            {atual.num}
          </div>

          <div className="mb-6">
            <ContagemVisual num={atual.num} emoji={atual.emoji} />
          </div>

          <p className="text-white/90 text-xl mb-2 font-bold">
            {atual.num} {atual.num === 1 ? 'fruta' : 'frutas'}
          </p>

          <p className="text-white/70 text-sm mb-6">
            {getRandomMessage('hints')}
          </p>

          <div className="flex justify-center gap-4">
            <SpeakButton text={String(atual.num)} label={`Falar número ${atual.num}`} />
            <SpeakButton 
              text={`${atual.num} ${atual.emoji}`} 
              label={`Contar ${atual.num}`}
            >
              🔊 Contar
            </SpeakButton>
          </div>
        </div>

        {completed ? (
          <div className="mt-8 text-center animate-pop">
            <div className="text-6xl mb-2">🎉🏆🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {MESSAGES.levelComplete('os números')}
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
              className="bg-white text-orange-600 hover:bg-white/90 rounded-full px-8 py-3 font-bold text-lg transition-all shadow-lg"
            >
              {index === numeros.length - 1 ? `Finalizar, ${KID_NAME}!` : 'Próximo →'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
