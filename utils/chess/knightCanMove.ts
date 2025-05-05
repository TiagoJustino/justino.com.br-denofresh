import { Board } from "./board.ts";

export const knightCanMove = (
  originCoords: number[],
  targetCoords: number[],
  currentBoardState: Board,
  isWhite: boolean,
) => {
  const [originY, originX] = originCoords;
  const [targetY, targetX] = targetCoords;
  const dx = Math.abs(originX - targetX);
  const dy = Math.abs(originY - targetY);
  if (dx === 1 && dy === 2) {
    return true;
  }
  if (dx === 2 && dy === 1) {
    return true;
  }
  return false;
};
