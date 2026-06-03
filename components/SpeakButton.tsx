'use client';

import { useCallback } from 'react';

interface SpeakButtonProps {
  text: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function SpeakButton({ text, label, className = '', children }: SpeakButtonProps) {
  const speak = useCallback(() => {
    if (typeof window === 'undefined') return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.85;
    utterance.pitch = 1.2;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [text]);

  return (
    <button
      onClick={speak}
      className={`speak-btn rounded-2xl px-6 py-3 text-white font-bold text-lg ${className}`}
      aria-label={label || `Falar ${text}`}
    >
      {children || (
        <span className="flex items-center gap-2">
          🔊 {text}
        </span>
      )}
    </button>
  );
}
