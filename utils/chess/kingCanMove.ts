import { Board } from "./board.ts";

export const kingCanMove = (
  originCoords: number[],
  targetCoords: number[],
  currentBoardState: Board,
  isWhite: boolean,
) => {
  const [originY, originX] = originCoords;
  const [targetY, targetX] = targetCoords;
  const dx = Math.abs(originX - targetX);
  const dy = Math.abs(originY - targetY);
  if (dx > 1 || dy > 1) {
    return false;
  }
  if (dx < 1 && dy < 1) {
    return false;
  }
  return true;
};
