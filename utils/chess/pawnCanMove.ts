import { Board } from './board.ts';
import { isPieceWhite } from './isPieceWhite.ts';
import { isPieceBlack } from './isPieceBlack.ts';

export const pawnCanMove = (
  originCoords: number[],
  targetCoords: number[],
  currentBoardState: Board,
  isWhite: boolean,
) => {
  const [originY, originX] = originCoords;
  const [targetY, targetX] = targetCoords;
  const dx = Math.abs(originX - targetX);
  const dy = Math.abs(originY - targetY);
  if (isWhite && targetY > originY) {
    return false;
  }
  if (!isWhite && targetY < originY) {
    return false;
  }
  if (dx === 0 && dy === 1 && currentBoardState[targetY][targetX] === ' ') {
    return true;
  }
  if (
    dx === 0 && dy === 2 && currentBoardState[targetY][targetX] === ' ' &&
    currentBoardState[Math.floor((targetY + originY) / 2)][targetX] === ' '
  ) {
    return true;
  }
  if (dx === 1 && dy === 1 && currentBoardState[targetY][targetX] !== ' ') {
    return true;
  }
  // Check if the pawn is attacking a piece en passant

  if (
    dx === 1 &&
    dy === 1 &&
    currentBoardState[targetY][targetX] === ' ' &&
    (
      isWhite
        ? isPieceBlack(currentBoardState, [originY, targetX])
        : isPieceWhite(currentBoardState, [originY, targetX])
    )
  ) {
    return true;
  }
  return false;
};
