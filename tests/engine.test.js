import test from 'node:test';
import assert from 'node:assert/strict';
import { createGame, play, WINNING_LINES } from '../assets/js/engine.js';

for (const [i, line] of WINNING_LINES.entries()) {
  for (const player of ['X', 'O']) {
    test(`${player} wins on line ${i + 1}`, () => {
      const cells = Array(9).fill(null);
      cells[line[0]] = player;
      cells[line[1]] = player;
      const state = { ...createGame(), cells, turn: player, moves: 2 };
      const next = play(state, line[2]);
      assert.equal(next.winner, player);
      assert.equal(next.gameOver, true);
      assert.deepEqual(next.winningLine, line);
      assert.equal(state.cells[line[2]], null);
    });
  }
}
test('draw, post-game guard and reset', () => {
  let state = createGame();
  for (const index of [0, 1, 2, 4, 3, 5, 7, 6, 8]) state = play(state, index);
  assert.equal(state.gameOver, true);
  assert.equal(state.winner, null);
  assert.equal(play(state, 0), state);
  assert.deepEqual(createGame().cells, Array(9).fill(null));
  assert.equal(createGame().turn, 'X');
});
test('occupied and invalid cells do not change the model', () => {
  const state = play(createGame(), 0);
  for (const i of [0, -1, 9, 1.5, '1', undefined]) assert.equal(play(state, i), state);
});
test('win guard ignores even an empty cell', () => {
  let state = createGame();
  for (const i of [0, 3, 1, 4, 2]) state = play(state, i);
  const before = structuredClone(state);
  assert.equal(play(state, 8), state);
  assert.deepEqual(state, before);
});
test('all 255168 complete legal games match independent row/column/diagonal oracle', () => {
  let games = 0, winsX = 0, winsO = 0, draws = 0;
  function oracle(cells) {
    const a = [cells.slice(0,3), cells.slice(3,6), cells.slice(6,9),
      [cells[0],cells[3],cells[6]], [cells[1],cells[4],cells[7]], [cells[2],cells[5],cells[8]],
      [cells[0],cells[4],cells[8]], [cells[2],cells[4],cells[6]]];
    return a.find(row => row[0] && row.every(value => value === row[0]))?.[0] || null;
  }
  function visit(state) {
    const winner = oracle(state.cells);
    assert.equal(state.winner, winner);
    assert.equal(state.gameOver, Boolean(winner) || state.cells.every(Boolean));
    if (state.gameOver) {
      games++;
      if (winner === 'X') winsX++; else if (winner === 'O') winsO++; else draws++;
      for (let i=0; i<9; i++) assert.equal(play(state, i), state);
      return;
    }
    for (let i=0; i<9; i++) if (!state.cells[i]) visit(play(state, i));
  }
  visit(createGame());
  assert.deepEqual({games,winsX,winsO,draws}, {games:255168,winsX:131184,winsO:77904,draws:46080});
});
