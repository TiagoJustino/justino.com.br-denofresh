import { Board } from './board.ts';
import { findKingCoords } from './findKingCoords.ts';
import { getSquareAttackers } from './getSquareAttackers.ts';
import { printBoard } from './printBoard.ts';

export const isWhiteInCheck = (board: Board) => {
  const kingCoords = findKingCoords(board, true);
  const attackers = getSquareAttackers(board, kingCoords as number[], true);
  printBoard(board);
  console.log(
    `isWhiteInCheck kingCoords: ${JSON.stringify(kingCoords)} attackers: ${JSON.stringify(attackers)}`,
  );
  return attackers.length > 0;
};
