'use client';

import { useState, useCallback } from 'react';
import BackButton from '../../components/BackButton';
import VoiceExercise from '../../components/VoiceExercise';
import ProgressBar from '../../components/ProgressBar';
import Confetti from '../../components/Confetti';
import { KID_NAME, MESSAGES } from '../config';

const exercicios = [
  { target: 'A', hint: 'Fale a vogal: "A"', tipo: 'vogal' },
  { target: 'E', hint: 'Fale a vogal: "E"', tipo: 'vogal' },
  { target: 'I', hint: 'Fale a vogal: "I"', tipo: 'vogal' },
  { target: 'O', hint: 'Fale a vogal: "O"', tipo: 'vogal' },
  { target: 'U', hint: 'Fale a vogal: "U"', tipo: 'vogal' },
  { target: '1', hint: 'Fale o número: "Um"', tipo: 'numero' },
  { target: '5', hint: 'Fale o número: "Cinco"', tipo: 'numero' },
  { target: '10', hint: 'Fale o número: "Dez"', tipo: 'numero' },
  { target: 'círculo', hint: 'Fale a forma: "Círculo"', tipo: 'forma' },
  { target: 'triângulo', hint: 'Fale a forma: "Triângulo"', tipo: 'forma' },
];

export default function FalaPage() {
  const [index, setIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [successCount, setSuccessCount] = useState(0);

  const atual = exercicios[index];

  const handleSuccess = useCallback(() => {
    setSuccessCount(prev => prev + 1);
    setTimeout(() => {
      if (index < exercicios.length - 1) {
        setIndex(index + 1);
      } else {
        setShowConfetti(true);
        setCompleted(true);
        localStorage.setItem('stars_fala', '3');
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }, 1500);
  }, [index]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {showConfetti && <Confetti />}

      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <BackButton />
          <h1 className="text-3xl font-bold text-white drop-shadow">🎤 Fala e Pronúncia</h1>
          <div className="w-20" />
        </div>

        <ProgressBar current={index + (completed ? 1 : 0)} total={exercicios.length} />

        {!completed ? (
          <>
            <div className="text-center mb-4">
              <span className="inline-block bg-white/20 text-white rounded-full px-4 py-1 text-sm font-bold">
                Exercício {index + 1} de {exercicios.length}
              </span>
            </div>

            <VoiceExercise 
              target={atual.target} 
              hint={atual.hint}
              onSuccess={handleSuccess}
            />

            <p className="text-center text-white/60 text-sm mt-4">
              Dica: Clique no microfone e fale bem pertinho, {KID_NAME}!
            </p>
          </>
        ) : (
          <div className="text-center animate-pop">
            <div className="text-6xl mb-2">🎉🏆🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {MESSAGES.allComplete}
            </h2>
            <p className="text-white/90 text-lg mb-2">
              {KID_NAME}, acertou {successCount} de {exercicios.length} exercícios!
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {[1,2,3].map(s => <span key={s} className="text-4xl star">⭐</span>)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
