'use client';

import { useEffect } from 'react';

export default function Confetti() {
  useEffect(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8E53', '#C44569', '#A8E6CF'];
    for (let i = 0; i < 50; i++) {
      const el = document.createElement('div');
      el.className = 'confetti';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDuration = (Math.random() * 2 + 2) + 's';
      el.style.animationDelay = (Math.random() * 0.5) + 's';
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }
  }, []);

  return null;
}
