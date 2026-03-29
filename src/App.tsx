import { useGame } from './hooks/useGame';
import Square from './components/Square';

export default function App() {
  const { state, move, reset } = useGame();
  const { board, current, winner, winLine, scores } = state;

  const statusText =
    winner === 'Draw'
      ? "It's a draw!"
      : winner
      ? `${winner} wins! 🎉`
      : `${current}'s turn`;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-4xl font-bold tracking-widest text-white uppercase">
        Tic Tac Toe
      </h1>

      {/* Scoreboard */}
      <div className="flex gap-6">
        {(['X', 'Draw', 'O'] as const).map(key => (
          <div key={key} className="bg-slate-800 rounded-xl px-6 py-3 text-center min-w-[80px]">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">
              {key === 'Draw' ? 'Draws' : `Player ${key}`}
            </p>
            <p className={
              key === 'X' ? 'text-2xl font-bold text-rose-400'
              : key === 'O' ? 'text-2xl font-bold text-sky-400'
              : 'text-2xl font-bold text-yellow-400'
            }>
              {scores[key]}
            </p>
          </div>
        ))}
      </div>

      {/* Status */}
      <p className={[
        'text-xl font-semibold',
        winner === 'Draw' ? 'text-yellow-400'
        : winner ? 'text-green-400'
        : current === 'X' ? 'text-rose-400'
        : 'text-sky-400',
      ].join(' ')}>
        {statusText}
      </p>

      {/* Board */}
      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, i) => (
          <Square
            key={i}
            value={cell}
            onClick={() => move(i)}
            isWin={winLine?.includes(i) ?? false}
          />
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={reset}
        className="mt-2 px-8 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-full tracking-wide transition-all duration-150 hover:scale-105 cursor-pointer"
      >
        New Game
      </button>
    </div>
  );
}
