export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];

export interface GameState {
  board: Board;
  current: Player;
  winner: Player | 'Draw' | null;
  winLine: number[] | null;
  scores: Record<Player | 'Draw', number>;
}
