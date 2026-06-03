'use client';

import { useState, useCallback } from 'react';
import BackButton from '../../components/BackButton';
import SpeakButton from '../../components/SpeakButton';
import ProgressBar from '../../components/ProgressBar';
import Confetti from '../../components/Confetti';
import { KID_NAME, MESSAGES, getRandomMessage } from '../config';

interface Forma {
  nome: string;
  emoji: string;
  cor: string;
  bgCor: string;
  lados: number;
}

const formas: Forma[] = [
  { nome: 'Círculo', emoji: '🔴', cor: 'bg-red-400', bgCor: 'from-red-400 to-rose-500', lados: 0 },
  { nome: 'Quadrado', emoji: '🟦', cor: 'bg-blue-400', bgCor: 'from-blue-400 to-indigo-500', lados: 4 },
  { nome: 'Triângulo', emoji: '🔺', cor: 'bg-yellow-400', bgCor: 'from-yellow-400 to-amber-500', lados: 3 },
  { nome: 'Estrela', emoji: '⭐', cor: 'bg-amber-400', bgCor: 'from-amber-400 to-orange-500', lados: 10 },
  { nome: 'Coração', emoji: '❤️', cor: 'bg-pink-400', bgCor: 'from-pink-400 to-rose-500', lados: 0 },
];

function ShapeVisual({ forma }: { forma: Forma }) {
  if (forma.nome === 'Círculo') {
    return <div className={`w-32 h-32 ${forma.cor} rounded-full shape mx-auto`} />;
  }
  if (forma.nome === 'Quadrado') {
    return <div className={`w-32 h-32 ${forma.cor} rounded-xl shape mx-auto`} />;
  }
  if (forma.nome === 'Triângulo') {
    return (
      <div className="mx-auto w-0 h-0 shape" 
        style={{ 
          borderLeft: '60px solid transparent',
          borderRight: '60px solid transparent',
          borderBottom: `104px solid ${forma.nome === 'Triângulo' ? '#FACC15' : '#ccc'}`
        }} 
      />
    );
  }
  return <div className="text-8xl animate-float">{forma.emoji}</div>;
}

export default function FormasPage() {
  const [index, setIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);

  const atual = formas[index];

  const next = useCallback(() => {
    if (index < formas.length - 1) {
      setIndex(index + 1);
    } else {
      setShowConfetti(true);
      setCompleted(true);
      localStorage.setItem('stars_formas', '3');
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
          <h1 className="text-3xl font-bold text-white drop-shadow">🔷 Formas</h1>
          <div className="w-20" />
        </div>

        <ProgressBar current={index + (completed ? 1 : 0)} total={formas.length} />

        <div className={`bg-gradient-to-br ${atual.bgCor} rounded-3xl p-8 md:p-12 text-center card-hover`}>
          <div className="mb-6">
            <ShapeVisual forma={atual} />
          </div>

          <h2 className="text-4xl font-black text-white drop-shadow-lg mb-2">
            {atual.nome}
          </h2>

          <p className="text-white/90 text-lg mb-2">
            {atual.lados > 0 ? `${atual.lados} lados` : 'Sem lados'}
          </p>

          <p className="text-white/70 text-sm mb-6">
            {getRandomMessage('hints')}
          </p>

          <div className="flex justify-center">
            <SpeakButton text={atual.nome} label={`Falar forma ${atual.nome}`} />
          </div>
        </div>

        {completed ? (
          <div className="mt-8 text-center animate-pop">
            <div className="text-6xl mb-2">🎉🏆🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {MESSAGES.levelComplete('as formas')}
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
              className="bg-white text-blue-600 hover:bg-white/90 rounded-full px-8 py-3 font-bold text-lg transition-all shadow-lg"
            >
              {index === formas.length - 1 ? `Finalizar, ${KID_NAME}!` : 'Próxima →'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
