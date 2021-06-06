/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  if (!board || board.length === 0) return;

  let numRows = board.length;
  let numCols = board[0].length;

  // Step 1: getting all the border nodes
  let borders = [];
  for (let r = 0; r < numRows; r++) {
    borders.push([r, 0]);
    borders.push([r, numCols - 1]);
  }

  for (let c = 0; c < numCols; c++) {
    borders.push([0, c]);
    borders.push([numRows - 1, c]);
  }

  // Step 2: marking the escaped cells - DFS
  for (let pair of borders) {
    dfs(board, pair);
  }

  // step 3: changing the board state to its final state
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (board[r][c] === "O") board[r][c] = "X";
      if (board[r][c] === "E") board[r][c] = "O";
    }
  }
};

const dfs = function (board, pair) {
  let numRows = board.length;
  let numCols = board[0].length;

  let stack = [];
  stack.push(pair);
  while (stack.length > 0) {
    const [row, col] = stack.pop();
    if (board[row][col] !== "O") continue;

    board[row][col] = "E";
    if (col < numCols - 1) {
      stack.push([row, col + 1]);
    }
    if (row < numRows - 1) {
      stack.push([row + 1, col]);
    }
    if (row > 0) {
      stack.push([row - 1, col]);
    }
    if (col > 0) {
      stack.push([row, col - 1]);
    }
  }
};
