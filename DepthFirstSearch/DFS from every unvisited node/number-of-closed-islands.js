/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function (grid) {
  if (!grid || grid.length === 0) return 0;

  let numIslands = 0;

  // This step is the key. Starting dfs from the borders first and
  // not counting the flipped tiles since those islands are not closed
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (i === 0 || j === 0 || i === grid.length - 1 || j === grid[0].length - 1) {
        dfs(grid, i, j);
      }
    }
  }

  // Once the dfs from borders has been taken care of we can find the number
  // of islands using a normal dfs
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 0) {
        numIslands++;
        dfs(grid, i, j);
      }
    }
  }
  return numIslands;
};

var dfs = function (grid, row, col) {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] === 1) return;

  grid[row][col] = 1;
  dfs(grid, row + 1, col);
  dfs(grid, row - 1, col);
  dfs(grid, row, col + 1);
  dfs(grid, row, col - 1);
};

// ------- TESTS -----------

let grid1 = [
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0]
];
console.log(closedIsland(grid1));

let grid2 = [
  [0, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0]
];
console.log(closedIsland(grid2));

let grid3 = [
  [0, 0, 1, 1, 0, 1, 0, 0, 1, 0],
  [1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
  [1, 0, 1, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0]
];
console.log(closedIsland(grid3));
