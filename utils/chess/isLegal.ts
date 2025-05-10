import { Board } from './board.ts';
import { pawnCanMove } from './pawnCanMove.ts';
import { kingCanMove } from './kingCanMove.ts';
import { queenCanMove } from './queenCanMove.ts';
import { knightCanMove } from './knightCanMove.ts';
import { rookCanMove } from './rookCanMove.ts';
import { bishopCanMove } from './bishopCanMove.ts';

export const isLegal = (
  origin: number[],
  target: number[],
  board: Board,
  piece: string,
  white: boolean,
) => {
  switch (piece.toLowerCase()) {
    case 'p':
      return pawnCanMove(origin, target, board, white);
    case 'k':
      return kingCanMove(origin, target, board, white);
    case 'q':
      return queenCanMove(origin, target, board, white);
    case 'n':
      return knightCanMove(origin, target, board, white);
    case 'r':
      return rookCanMove(origin, target, board, white);
    case 'b':
      return bishopCanMove(origin, target, board, white);
  }
};
