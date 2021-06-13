// https://leetcode.com/problems/shortest-path-in-binary-matrix/

// Standard BFS. Should know that this problem is also solvable by A*

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  if (
    !grid ||
    grid.length === 0 ||
    grid[0].length === 0 ||
    grid[0][0] === 1 ||
    grid[grid.length - 1][grid[0].length - 1]
  )
    return -1;
  let queue = [];
  grid[0][0] = 1;
  queue.unshift([0, 0]);

  while (queue.length > 0) {
    let cell = queue.pop();
    let row = cell[0];
    let col = cell[1];
    let distance = grid[row][col];
    if (row === grid.length - 1 && col === grid.length - 1) return distance;
    for (let neighbor of getNeighbors(row, col, grid)) {
      let neighborRow = neighbor[0];
      let neighborCol = neighbor[1];
      queue.unshift([neighborRow, neighborCol]);
      grid[neighborRow][neighborCol] = distance + 1;
    }
  }

  return -1;
};

function getNeighbors(row, col, grid) {
  let dirs = [
    [-1, 0],
    [1, 0],
    [-1, 1],
    [1, 1],
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, -1]
  ];

  let neighbors = [];
  for (let i = 0; i < dirs.length; i++) {
    let newRow = row + dirs[i][0];
    let newCol = col + dirs[i][1];
    if (newRow < 0 || newCol < 0 || newRow >= grid.length || newCol >= grid[0].length || grid[newRow][newCol] !== 0)
      continue;

    neighbors.push([newRow, newCol]);
  }
  return neighbors;
}
