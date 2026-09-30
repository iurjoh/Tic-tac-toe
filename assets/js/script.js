import { createGame, play } from './engine.js';

const cells = [...document.querySelectorAll('[data-cell]')];
const board = document.querySelector('[data-board]');
const status = document.querySelector('[data-status]');
const resultPanel = document.querySelector('[data-result-panel]');
const resultText = document.querySelector('[data-result-text]');
const restart = document.querySelector('[data-restart]');
const confirmDialog = document.querySelector('[data-confirm]');
const cancelRestart = document.querySelector('[data-cancel-restart]');
const confirmRestart = document.querySelector('[data-confirm-restart]');
let state = createGame();

function render() {
  board.dataset.turn = state.turn;
  board.dataset.gameOver = String(state.gameOver);
  cells.forEach((cell, i) => {
    const mark = state.cells[i];
    cell.classList.toggle('x', mark === 'X');
    cell.classList.toggle('circle', mark === 'O');
    cell.classList.toggle('winner', state.winningLine.includes(i));
    cell.setAttribute('aria-label', `Linha ${Math.floor(i / 3) + 1}, coluna ${i % 3 + 1}, ${mark || 'vazia'}${state.winningLine.includes(i) ? ', linha vencedora' : ''}`);
    // Keep filled cells in the keyboard order so screen-reader users can inspect them.
    cell.setAttribute('aria-disabled', String(Boolean(mark) || state.gameOver));
  });
}

function bindInput() {
  cells.forEach(cell => cell.addEventListener('click', handleMove));
}

function unbindInput() {
  cells.forEach(cell => cell.removeEventListener('click', handleMove));
}

function handleMove(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);
  if (state.gameOver || state.cells[index]) return;
  const player = state.turn;
  state = play(state, index);
  render();
  const move = `${player} jogou na linha ${Math.floor(index / 3) + 1}, coluna ${index % 3 + 1}.`;
  if (state.gameOver) {
    unbindInput();
    const result = state.winner ? `${state.winner} venceu!` : 'Empate!';
    // This live region exists before the first move and is never hidden.
    status.textContent = `${move} ${result} Partida encerrada.`;
    resultText.textContent = result;
    resultPanel.hidden = false;
    restart.textContent = 'Jogar novamente';
    // A non-modal result keeps the winning board visible, with a predictable next action.
    restart.focus();
  } else {
    status.textContent = `${move} Vez de ${state.turn}.`;
  }
}

function resetGame() {
  unbindInput();
  state = createGame();
  resultPanel.hidden = true;
  resultText.textContent = '';
  restart.textContent = 'Reiniciar partida';
  render();
  bindInput();
  status.textContent = 'Nova partida. Vez de X.';
  cells[0].focus();
}

restart.addEventListener('click', () => {
  if (!state.gameOver && state.moves > 0) {
    confirmDialog.showModal();
    cancelRestart.focus();
  } else {
    resetGame();
  }
});
cancelRestart.addEventListener('click', () => confirmDialog.close('cancel'));
confirmRestart.addEventListener('click', () => confirmDialog.close('restart'));
confirmDialog.addEventListener('close', () => {
  if (confirmDialog.returnValue === 'restart') resetGame();
  else restart.focus();
});

render();
bindInput();
