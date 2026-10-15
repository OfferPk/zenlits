const test = require('node:test');
const assert = require('node:assert/strict');
const {
  TETRO_MAP,
  CELL_STATE,
  getTetrominoType,
  getValidRoomTetrominoes,
  validateBoard,
  solveLITS,
  getHint
} = require('../src/lits-engine.js');

test('LITS Engine - Tetromino Classification (L, I, T, S)', () => {
  // L shape (3x2 corner)
  const lShape = [[0, 0], [1, 0], [2, 0], [2, 1]];
  assert.equal(getTetrominoType(lShape), 'L');

  // I shape (1x4 or 4x1 line)
  const iShape = [[0, 0], [0, 1], [0, 2], [0, 3]];
  assert.equal(getTetrominoType(iShape), 'I');

  // T shape
  const tShape = [[0, 0], [0, 1], [0, 2], [1, 1]];
  assert.equal(getTetrominoType(tShape), 'T');

  // S shape (skew / snake)
  const sShape = [[0, 1], [0, 2], [1, 0], [1, 1]];
  assert.equal(getTetrominoType(sShape), 'S');

  // 2x2 O square (strictly forbidden in LITS)
  const oShape = [[0, 0], [0, 1], [1, 0], [1, 1]];
  assert.equal(getTetrominoType(oShape), null, 'O tetromino must be forbidden');

  // Less or more than 4 cells
  assert.equal(getTetrominoType([[0, 0], [0, 1]]), null);
  assert.equal(getTetrominoType([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]), null);
});

test('LITS Engine - Valid Room Tetromino Options', () => {
  // A 5-cell cross/plus room
  const plusRoom = [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]];
  const options = getValidRoomTetrominoes(plusRoom);
  assert.ok(options.length > 0);
  assert.ok(options.every(opt => ['L', 'I', 'T', 'S'].includes(opt.type)));
});

test('LITS Engine - 2x2 Solid Shaded Violation', () => {
  const rows = 4, cols = 4;
  const rooms = [
    { id: 0, cells: [[0, 0], [0, 1], [1, 0], [1, 1], [0, 2]] },
    { id: 1, cells: [[2, 0], [2, 1], [3, 0], [3, 1], [2, 2]] }
  ];
  const grid = Array.from({ length: rows }, () => Array(cols).fill(CELL_STATE.EMPTY));
  grid[0][0] = CELL_STATE.SHADED;
  grid[0][1] = CELL_STATE.SHADED;
  grid[1][0] = CELL_STATE.SHADED;
  grid[1][1] = CELL_STATE.SHADED;

  const res = validateBoard(grid, rows, cols, rooms);
  assert.equal(res.isComplete, false);
  assert.ok(res.violations2x2.length > 0);
});

test('LITS Engine - Touching Identical Tetrominoes Violation', () => {
  const rows = 4, cols = 4;
  // Two adjacent rooms each with an I tetromino touching orthogonally
  const rooms = [
    { id: 0, cells: [[0, 0], [1, 0], [2, 0], [3, 0]] },
    { id: 1, cells: [[0, 1], [1, 1], [2, 1], [3, 1]] }
  ];
  const grid = Array.from({ length: rows }, () => Array(cols).fill(CELL_STATE.SHADED));

  const res = validateBoard(grid, rows, cols, rooms);
  assert.equal(res.isComplete, false);
  assert.ok(res.identicalTouches.length > 0, 'Identical adjacent I tetrominoes must violate rule');
});

test('LITS Engine - Connectivity Validation', () => {
  const rows = 4, cols = 6;
  const rooms = [
    { id: 0, cells: [[0, 0], [1, 0], [2, 0], [3, 0]] }, // I on left
    { id: 1, cells: [[0, 5], [1, 5], [2, 5], [3, 5]] }  // I on right (disconnected)
  ];
  const grid = Array.from({ length: rows }, () => Array(cols).fill(CELL_STATE.EMPTY));
  // Shade room 0
  rooms[0].cells.forEach(([r, c]) => { grid[r][c] = CELL_STATE.SHADED; });
  // Shade room 1
  rooms[1].cells.forEach(([r, c]) => { grid[r][c] = CELL_STATE.SHADED; });

  const res = validateBoard(grid, rows, cols, rooms);
  assert.equal(res.isConnected, false);
  assert.equal(res.isComplete, false);
});

test('LITS Engine - Deductive Hint Engine', () => {
  const rows = 3, cols = 3;
  const rooms = [
    { id: 0, cells: [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0]] }
  ];
  const grid = Array.from({ length: rows }, () => Array(cols).fill(CELL_STATE.EMPTY));

  // If 3 cells of a 2x2 are shaded, hint must suggest Dot for the 4th cell
  grid[0][0] = CELL_STATE.SHADED;
  grid[0][1] = CELL_STATE.SHADED;
  grid[1][0] = CELL_STATE.SHADED;

  const hint = getHint(grid, rows, cols, rooms, null);
  assert.ok(hint);
  assert.equal(hint.row, 1);
  assert.equal(hint.col, 1);
  assert.equal(hint.targetState, CELL_STATE.DOT);
  assert.ok(hint.message.includes('2×2'));
});
