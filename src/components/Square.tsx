import type { Cell } from '../types';

interface SquareProps {
  value: Cell;
  onClick: () => void;
  isWin: boolean;
}

export default function Square({ value, onClick, isWin }: SquareProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'w-28 h-28 rounded-2xl text-5xl font-bold transition-all duration-150',
        'flex items-center justify-center select-none',
        isWin
          ? 'bg-indigo-600 scale-105 shadow-lg shadow-indigo-500/40 cursor-default'
          : value
          ? 'bg-slate-700 cursor-default'
          : 'bg-slate-700 hover:bg-slate-600 hover:scale-105 cursor-pointer',
        value === 'X' ? 'text-rose-400' : 'text-sky-400',
      ].join(' ')}
    >
      {value ?? ''}
    </button>
  );
}
