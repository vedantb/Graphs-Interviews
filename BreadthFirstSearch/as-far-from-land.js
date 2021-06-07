//leetcode.com/problems/as-far-from-land-as-possible/

/**
 * BFS with a small twist. Here we add all land (1) cells to the queue.
 * We need to start the BFS from all 1 cells simultaneously. Mark the visited cells
 * as 1 and then add them to the queue to process the next level.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function (grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) return -1;
  let queue = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        queue.unshift([i, j]);
      }
    }
  }

  let dirs = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1]
  ];

  let level = -1;
  while (queue.length > 0) {
    // !!!! VERY IMPORTANT - Computer the length of the queue before and not as part of the for loop.
    // We want to iterate only over elements currently in the queue.
    // We will be adding more elements to the queue as part of this for but they should be processed in
    // the next while cycle since they're at the next BFS level.
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let start = queue.pop();
      let x = start[0];
      let y = start[1];
      for (let dir of dirs) {
        let newX = x + dir[0];
        let newY = y + dir[1];
        if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length && grid[newX][newY] === 0) {
          queue.unshift([newX, newY]);
          grid[newX][newY] = 1;
        }
      }
    }
    level++;
  }
  return level <= 0 ? -1 : level;
};
