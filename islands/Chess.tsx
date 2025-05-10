import { useEffect, useState } from "preact/hooks";
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

class Drawer implements IDrawer {
  squareSize: number = 0;

  constructor(private boards: Board[], private boardIdx: number) {
  }

  async setup(ctx: CanvasRenderingContext2D) {
  }

  async loop(ctx: CanvasRenderingContext2D) {
    const board = this.boards[this.boardIdx];
    if (!board) {
      return;
    }

    this.squareSize = Math.min(ctx.canvas.width, ctx.canvas.height) / 8;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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
  const [moveIndex, setMoveIndex] = useState<number>(0);
  const [originalMoves, setOriginalMoves] = useState<string[]>([]);
  const [boards, setBoards] = useState<Board[]>([initialBoard()]);
  const [boardIdx, setBoardIdx] = useState<number>(0);
  const [drawer, setDrawer] = useState<Drawer>(new Drawer(boards, boardIdx));

  useEffect(() => {
    setDrawer(new Drawer(boards, boardIdx));
  }, [boards, boardIdx]);

  const handlePrevMove = () => {
    setMoveIndex(moveIndex - 1);
    setBoardIdx(boardIdx - 1);
  };

  const handleNextMove = () => {
    setMoveIndex(moveIndex + 1);
    setBoardIdx(boardIdx + 1);
  };

  const loadFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pgn";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const pgnLines = content.split("\n");
        const games = [];
        let localMoves: string[] = [];
        let gameStarted = false;
        for (const _line of pgnLines) {
          const line = _line.trim();
          if (line.startsWith("[")) {
            continue;
          }
          if (line == "") {
            if (gameStarted) {
              localMoves.pop(); // remove game winner from moves
              games.push([...localMoves]);
            }
            localMoves = [];
            gameStarted = false;
            continue;
          }
          if (/^[1-9][0-9]*\./.test(line)) {
            gameStarted = true;
            const innerMoves = line.replace(/  */g, " ").split(" ");
            localMoves = localMoves.concat(innerMoves);
          }
        }

        const newOriginalMoves = games[0] || [];
        setOriginalMoves(newOriginalMoves);
        setMoveIndex(0);
        setBoardIdx(0);
        const localBoards = [initialBoard()];
        for (const move of newOriginalMoves) {
          const lastIdx = localBoards.length - 1;
          const lastBoard = localBoards[lastIdx];
          if (lastBoard) {
            const newBoard = applyMove(lastBoard, move);
            localBoards.push(newBoard);
          } else if (localBoards.length === 0 && move) {
            console.error(
              "Attempting to apply a move with no preceding board state.",
            );
          }
        }
        setBoards(localBoards);
      };
      reader.readAsText(file);
    };
    input.click();
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
        <Button onClick={loadFile}>Load File</Button>
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
