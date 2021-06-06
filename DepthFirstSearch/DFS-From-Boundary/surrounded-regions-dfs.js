/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function (grid) {
  if (!grid || grid.length === 0) return 0;

  const numRows = grid.length;
  const numCols = grid[0].length;

  const borders = [];
  for (let r = 0; r < numRows; r++) {
    borders.push([r, 0]);
    borders.push([r, numCols - 1]);
  }

  for (let c = 0; c < numCols; c++) {
    borders.push([0, c]);
    borders.push([numRows - 1, c]);
  }

  for (let [row, col] of borders) {
    dfs(grid, row, col);
  }

  let count = 0;
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (grid[r][c] === 1) count++;
      if (grid[r][c] === "E") grid[r][c] = 1;
    }
  }
  return count;
};

const dfs = function (grid, row, col) {
  if (grid[row][col] !== 1) return;

  const numRows = grid.length;
  const numCols = grid[0].length;

  grid[row][col] = "E";
  if (row < numRows - 1) dfs(grid, row + 1, col);
  if (col < numCols - 1) dfs(grid, row, col + 1);
  if (row > 0) dfs(grid, row - 1, col);
  if (col > 0) dfs(grid, row, col - 1);
};
