import { Board } from "./board.ts";

export const rookCanMove = (
  originCoords: number[],
  targetCoords: number[],
  currentBoardState: Board,
  isWhite: boolean,
) => {
  const [originY, originX] = originCoords;
  const [targetY, targetX] = targetCoords;
  const dx = Math.abs(originX - targetX);
  const dy = Math.abs(originY - targetY);
  if (dx === 0 && dy === 0) {
    return false;
  }
  if (dx !== 0 && dy !== 0) {
    return false;
  }
  const dxSign = originX == targetX ? 0 : (originX < targetX ? 1 : -1);
  const dySign = originY == targetY ? 0 : (originY < targetY ? 1 : -1);
  for (let i = 1; i < Math.max(dx, dy); i++) {
    const x = originX + i * dxSign;
    const y = originY + i * dySign;
    if (currentBoardState[y][x] !== " ") {
      return false;
    }
  }
  return true;
};
