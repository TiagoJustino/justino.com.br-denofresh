import { Board } from './board.ts';
import { isPieceBlack } from './isPieceBlack.ts';
import { isPieceWhite } from './isPieceWhite.ts';
import { isLegal } from './isLegal.ts';

export const getSquareAttackers = (
  board: Board,
  coords: number[],
  blackAttacker: boolean,
) => {
  const attackers = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (
        (blackAttacker && isPieceBlack(board, [i, j])) ||
        (!blackAttacker && isPieceWhite(board, [i, j]))
      ) {
        if (isLegal([i, j], coords, board, board[i][j], !blackAttacker)) {
          attackers.push([i, j]);
        }
      }
    }
  }
  return attackers;
};
