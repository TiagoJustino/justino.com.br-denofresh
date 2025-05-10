import { Board } from './board.ts';
import { findKingCoords } from './findKingCoords.ts';
import { getSquareAttackers } from './getSquareAttackers.ts';

export const isBlackInCheck = (board: Board) => {
  const kingCoords = findKingCoords(board, false);
  const attackers = getSquareAttackers(board, kingCoords as number[], false);
  return attackers.length > 0;
};
