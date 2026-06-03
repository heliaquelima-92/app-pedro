'use client';

import Link from 'next/link';

export default function BackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur text-white rounded-full px-5 py-2 transition-all font-bold"
    >
      ← Voltar
    </Link>
  );
}
