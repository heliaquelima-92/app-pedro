'use client';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between text-white text-sm font-bold mb-1">
        <span>Progresso</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-300 to-amber-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
