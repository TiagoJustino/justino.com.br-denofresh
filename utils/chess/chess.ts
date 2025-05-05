import { initialBoard } from "./initialBoard.ts";
import { printBoard } from "./printBoard.ts";
import { applyMove } from "./applyMove.ts";

const pgnTextFile = Deno.readTextFileSync("Abdusattorov.pgn").trim();

const pgnLines = pgnTextFile.split("\n");

let moves: string[] = [];
const games = [];
let gameStarted = false;

for (const _line of pgnLines) {
  const line = _line.trim();
  if (line.startsWith("[")) {
    continue;
  }
  if (line == "") {
    if (gameStarted) {
      moves.pop(); // remove game winner from moves
      games.push([...moves]);
    }
    moves = [];
    gameStarted = false;
    continue;
  }
  if (/^[1-9][0-9]*\./.test(line)) {
    gameStarted = true;
    const localMoves = line.replace(/  */g, " ").split(" ");
    moves = moves.concat(localMoves);
  }
}

for (const game of games) {
  let board = initialBoard();
  for (const move of game) {
    console.log(move);
    board = applyMove(board, move);
    printBoard(board);
  }
  console.log("=================");
}
