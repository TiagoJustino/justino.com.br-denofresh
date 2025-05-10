import { Board } from './board.ts';

export const findKingCoords = (board: Board, white: boolean) => {
  const king = white ? 'K' : 'k';
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === king) {
        return [i, j];
      }
    }
  }
  return null;
};
