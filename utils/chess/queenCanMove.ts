import { Board } from "./board.ts";

export const queenCanMove = (
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
  if (dx === 0 || dy === 0 || dx === dy) {
    const stepX = targetX == originX ? 0 : (targetX > originX ? 1 : -1);
    const stepY = targetY == originY ? 0 : (targetY > originY ? 1 : -1);
    let x = originX + stepX;
    let y = originY + stepY;
    while (x !== targetX || y !== targetY) {
      if (currentBoardState[y][x] !== " ") {
        return false;
      }
      x += stepX;
      y += stepY;
    }
    return true;
  }
  return false;
};
