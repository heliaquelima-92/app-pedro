'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Confetti from './Confetti';
import { KID_NAME, getRandomMessage } from '../app/config';

interface VoiceExerciseProps {
  target: string;
  onSuccess?: () => void;
  hint?: string;
}

export default function VoiceExercise({ target, onSuccess, hint }: VoiceExerciseProps) {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [successMsg, setSuccessMsg] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'pt-BR';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setResult(transcript);
        const normalizedTarget = target.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const normalizedTranscript = transcript.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if (normalizedTranscript.includes(normalizedTarget)) {
          setStatus('success');
          setSuccessMsg(getRandomMessage('success'));
          onSuccess?.();
        } else {
          setStatus('error');
        }
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setStatus('error');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [target, onSuccess]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      alert('Seu navegador não suporta reconhecimento de voz. Use Chrome no computador ou Android.');
      return;
    }
    setResult('');
    setStatus('idle');
    setSuccessMsg('');
    setIsListening(true);
    recognitionRef.current.start();
  }, []);

  const speakTarget = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(target);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }, [target]);

  return (
    <div className="bg-white/10 backdrop-blur rounded-3xl p-6 text-center">
      {status === 'success' && <Confetti />}

      <div className="text-6xl mb-4 animate-bounce-slow">🎯</div>

      <p className="text-white text-lg mb-2">
        {hint || `Fale: "${target}"`}
      </p>

      <button
        onClick={speakTarget}
        className="mb-4 text-white/80 hover:text-white underline text-sm"
      >
        🔊 Ouvir como fica
      </button>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={startListening}
          disabled={isListening}
          className={`mic-btn rounded-full w-20 h-20 flex items-center justify-center text-3xl ${
            isListening ? 'mic-listening' : ''
          }`}
        >
          {isListening ? '🎙️' : '🎤'}
        </button>
      </div>

      {isListening && (
        <p className="text-white/80 animate-pulse mb-2">Ouvindo... fale agora, {KID_NAME}!</p>
      )}

      {result && (
        <div className={`rounded-xl p-3 mb-2 ${
          status === 'success' ? 'bg-green-500/30 text-green-100' :
          status === 'error' ? 'bg-red-500/30 text-red-100' :
          'bg-white/10 text-white'
        }`}>
          <p className="font-bold">Você disse: "{result}"</p>
          {status === 'success' && (
            <p className="text-lg mt-1 font-bold">{successMsg}</p>
          )}
          {status === 'error' && (
            <p className="text-sm mt-1">{getRandomMessage('hints')}</p>
          )}
        </div>
      )}

      {!recognitionRef.current && (
        <p className="text-yellow-200 text-sm mt-2">
          ⚠️ Reconhecimento de voz não disponível neste dispositivo.
        </p>
      )}
    </div>
  );
}
