// https://leetcode.com/problems/rotting-oranges/

/**
 * Standard BFS - start from the rotting orange,
 * If there are fresh oranges remaining in the end, return -1
 * else return the no. of levels traversed by the BFS
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  let queue = [];
  let freshOranges = 0;
  let rows = grid.length;
  let cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) {
        queue.unshift([r, c]);
      }
      if (grid[r][c] === 1) {
        freshOranges++;
      }
    }
  }

  // level marker
  queue.unshift([-1, -1]);

  let minutesElapsed = -1;
  let dirs = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1]
  ];

  while (queue.length > 0) {
    let p = queue.pop();
    let row = p[0];
    let col = p[1];
    if (row === -1) {
      minutesElapsed++;
      if (queue.length > 0) queue.unshift([-1, -1]);
    } else {
      // this is a rotten orange it will contaminate neighbots
      for (let d of dirs) {
        let neighborRow = row + d[0];
        let neighborCol = col + d[1];
        if (neighborRow >= 0 && neighborRow < rows && neighborCol >= 0 && neighborCol < cols) {
          if (grid[neighborRow][neighborCol] === 1) {
            // this will be contaminated
            grid[neighborRow][neighborCol] = 2;
            freshOranges--;
            queue.unshift([neighborRow, neighborCol]);
          }
        }
      }
    }
  }

  return freshOranges === 0 ? minutesElapsed : -1;
};
