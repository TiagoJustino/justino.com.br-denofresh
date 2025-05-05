import { useState } from "preact/hooks";
import { applyMove } from "../utils/chess/applyMove.ts";
import { Board } from "../utils/chess/board.ts";
import { initialBoard } from "../utils/chess/initialBoard.ts";
import Canvas, { IDrawer } from "./Canvas.tsx";
import { Button } from "../components/Button.tsx";

const pieceToUnicode: Record<string, string> = {
  "p": "♟︎",
  "r": "♜",
  "n": "♞",
  "b": "♝",
  "q": "♛",
  "k": "♚",
};

const originalMoves = [
  "1.e4",
  "c5",
  "2.Nf3",
  "a6",
  "3.d3",
  "g6",
  "4.g3",
  "Bg7",
  "5.Bg2",
  "b5",
  "6.O-O",
  "Bb7",
  "7.c3",
  "e5",
  "8.a3",
  "Ne7",
  "9.b4",
  "d6",
  "10.Nbd2",
  "O-O",
  "11.Nb3",
  "Nd7",
  "12.Be3",
  "Rc8",
  "13.Rc1",
  "h6",
  "14.Nfd2",
  "f5",
  "15.f4",
  "Kh7",
  "16.Qe2",
  "cxb4",
  "17.axb4",
  "exf4",
  "18.Bxf4",
  "Rxc3",
  "19.Rxc3",
  "Bxc3",
  "20.Bxd6",
  "Qb6+",
  "21.Bc5",
  "Nxc5",
  "22.bxc5",
  "Qe6",
  "23.d4",
  "Rd8",
  "24.Qd3",
  "Bxd2",
  "25.Nxd2",
  "fxe4",
  "26.Nxe4",
  "Nf5",
  "27.d5",
  "Qe5",
  "28.g4",
  "Ne7",
  "29.Rf7+",
  "Kg8",
  "30.Qf1",
  "Nxd5",
  "31.Rxb7",
  "Qd4+",
  "32.Kh1",
  "Rf8",
  "33.Qg1",
  "Ne3",
  "34.Re7",
  "a5",
  "35.c6",
  "a4",
  "36.Qxe3",
  "Qxe3",
  "37.Nf6+",
  "Rxf6",
  "38.Rxe3",
  "Rd6",
  "39.h4",
  "Rd1+",
  "40.Kh2",
  "b4",
  "41.c7",
];

const boardToString = (b: Board): string => {
  let result = "";
  for (let rowIdx = 0; rowIdx < b.length; rowIdx++) {
    for (let colIdx = 0; colIdx < b[rowIdx].length; colIdx++) {
      result += b[rowIdx][colIdx];
    }
  }
  return result;
};

const boards = [initialBoard()];
for (const move of originalMoves) {
  const lastIdx = boards.length - 1;
  const lastBoard = boards[lastIdx];
  const newBoard = applyMove(lastBoard, move);
  boards.push(newBoard);
}

let boardIdx = 0;

class Drawer implements IDrawer {
  squareSize: number = 0;

  constructor() {
    console.log("drawer constructor");
  }

  async setup(ctx: CanvasRenderingContext2D) {
    console.log("drawer setup");
  }

  async loop(ctx: CanvasRenderingContext2D) {
    console.log("drawer loop");
    this.squareSize = Math.min(ctx.canvas.width, ctx.canvas.height) / 8;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const board = boards[boardIdx];

    for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
      for (let colIdx = 0; colIdx < board[rowIdx].length; colIdx++) {
        const x = colIdx * this.squareSize;
        const y = rowIdx * this.squareSize;

        if ((rowIdx + colIdx) % 2 === 0) {
          ctx.fillStyle = "#f0d9b5";
        } else {
          ctx.fillStyle = "#b58863";
        }

        ctx.fillRect(x, y, this.squareSize, this.squareSize);

        const piece = board[rowIdx][colIdx];
        if (piece !== " ") {
          const unicodePiece = pieceToUnicode[piece.toLocaleLowerCase()];
          if (unicodePiece) {
            const isWhite = piece === piece.toUpperCase();
            ctx.fillStyle = isWhite ? "#FFFFFF" : "#000000";
            ctx.font = `${this.squareSize * 0.75}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(
              unicodePiece,
              x + this.squareSize / 2,
              y + this.squareSize / 2,
            );
          }
        }
      }
    }
  }
}

export default function Chess() {
  const [moveIndex, setMoveIndex] = useState<number>(0); // Start before the first move
  const drawer = new Drawer();

  const handlePrevMove = () => {
    setMoveIndex(moveIndex - 1);
    boardIdx -= 1;
  };

  const handleNextMove = () => {
    setMoveIndex(moveIndex + 1);
    boardIdx += 1;
  };

  return (
    <Canvas key="canvas" drawer={drawer}>
      <div id="controls" class="flex flex-col">
        <div id="movesList" class="grid grid-cols-2 gap-x-4">
          {originalMoves.map((move, index) => (
            <div
              className={index == (moveIndex - 1) ? "bg-gray-300" : ""}
              key={index}
            >
              {move}
            </div>
          ))}
        </div>
        <Button onClick={handlePrevMove} disabled={moveIndex < 1}>Prev</Button>
        <Button
          onClick={handleNextMove}
          disabled={moveIndex >= originalMoves.length}
        >
          Next
        </Button>
      </div>
    </Canvas>
  );
}
