/** Pure game model. DOM and presentation must never be the source of game state. */
export const WINNING_LINES = Object.freeze([
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
].map(Object.freeze));

export function createGame() {
  return { cells: Array(9).fill(null), turn: 'X', gameOver: false,
    winner: null, winningLine: [], moves: 0 };
}

export function play(state, index) {
  if (state.gameOver || !Number.isInteger(index) || index < 0 || index > 8 || state.cells[index]) {
    return state;
  }
  const cells = [...state.cells];
  cells[index] = state.turn;
  const winningLine = WINNING_LINES.find(line => line.every(i => cells[i] === state.turn)) || [];
  const moves = state.moves + 1;
  const gameOver = winningLine.length > 0 || moves === 9;
  return { cells, turn: gameOver ? state.turn : state.turn === 'X' ? 'O' : 'X',
    gameOver, winner: winningLine.length ? state.turn : null, winningLine: [...winningLine], moves };
}
