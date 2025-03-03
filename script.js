// script.js
const cells = document.querySelectorAll('.cell');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const powerups = document.querySelectorAll('.powerups button');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let scores = { X: 0, O: 0 };
let powerupUsed = false;

// Initialize the game
function init() {
  board.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('disabled');
  });
  currentPlayer = 'X';
  powerupUsed = false;
  powerups.forEach(button => button.disabled = false);
}

// Check for a win or draw
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (!board.includes('')) return 'draw';
  return null;
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (board[index] !== '') return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('disabled');

  const winner = checkWin();
  if (winner) {
    if (winner === 'draw') {
      alert('It\'s a draw!');
    } else {
      scores[winner]++;
      updateScore();
      alert(`Player ${winner} wins!`);
    }
    init();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Update scoreboard
function updateScore() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

// Power-Up: Swap
function swap() {
  const emptyCells = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
  if (emptyCells.length < 2) return;

  const [cell1, cell2] = emptyCells.sort(() => Math.random() - 0.5);
  [board[cell1], board[cell2]] = [board[cell2], board[cell1]];

  cells[cell1].textContent = board[cell1];
  cells[cell2].textContent = board[cell2];
  powerupUsed = true;
  this.disabled = true;
}

// Power-Up: Blocker
function blocker() {
  const emptyCells = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
  if (emptyCells.length === 0) return;

  const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  cells[cell].classList.add('disabled');
  powerupUsed = true;
  this.disabled = true;
}

// Power-Up: Double Move
function doubleMove() {
  const emptyCells = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
  if (emptyCells.length < 2) return;

  const [cell1, cell2] = emptyCells.sort(() => Math.random() - 0.5);
  board[cell1] = currentPlayer;
  board[cell2] = currentPlayer;

  cells[cell1].textContent = currentPlayer;
  cells[cell2].textContent = currentPlayer;
  powerupUsed = true;
  this.disabled = true;
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
powerups[0].addEventListener('click', swap);
powerups[1].addEventListener('click', blocker);
powerups[2].addEventListener('click', doubleMove);
resetButton.addEventListener('click', init);

// Initialize the game on load
init();
