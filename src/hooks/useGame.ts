import { useState, useCallback } from 'react';
import type { Board, Cell, GameState, Player } from '../types';

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWin(board: Board, player: Player): number[] | null {
  return WIN_LINES.find(line => line.every(i => board[i] === player)) ?? null;
}

const initialState = (): GameState => ({
  board: Array<Cell>(9).fill(null),
  current: 'X',
  winner: null,
  winLine: null,
  scores: { X: 0, O: 0, Draw: 0 },
});

export function useGame() {
  const [state, setState] = useState<GameState>(initialState);

  const move = useCallback((index: number) => {
    setState(prev => {
      if (prev.winner || prev.board[index]) return prev;

      const board: Board = [...prev.board];
      board[index] = prev.current;

      const winLine = checkWin(board, prev.current);

      if (winLine) {
        return {
          ...prev,
          board,
          winner: prev.current,
          winLine,
          scores: { ...prev.scores, [prev.current]: prev.scores[prev.current] + 1 },
        };
      }

      if (board.every(c => c !== null)) {
        return {
          ...prev,
          board,
          winner: 'Draw',
          winLine: null,
          scores: { ...prev.scores, Draw: prev.scores.Draw + 1 },
        };
      }

      return {
        ...prev,
        board,
        current: prev.current === 'X' ? 'O' : 'X',
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState(prev => ({
      ...initialState(),
      scores: prev.scores,
    }));
  }, []);

  return { state, move, reset };
}
