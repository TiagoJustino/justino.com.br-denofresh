import { Board } from "./board.ts";

export const bishopCanMove = (
  originCoords: number[],
  targetCoords: number[],
  currentBoardState: Board,
  isWhite: boolean,
) => {
  const [originY, originX] = originCoords;
  const [targetY, targetX] = targetCoords;
  const dx = Math.abs(originX - targetX);
  const dy = Math.abs(originY - targetY);
  if (dx !== dy) {
    return false;
  }
  const dxSign = originX < targetX ? 1 : -1;
  const dySign = originY < targetY ? 1 : -1;
  for (let i = 1; i < dx; i++) {
    const x = originX + i * dxSign;
    const y = originY + i * dySign;
    if (currentBoardState[y][x] !== " ") {
      return false;
    }
  }
  return true;
};
