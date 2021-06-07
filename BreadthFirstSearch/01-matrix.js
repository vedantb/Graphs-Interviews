// https://leetcode.com/problems/01-matrix/

/**
 * BFS can be used to search for the nearest 0 for each 1. As soon as 0 appears we know that 0 is nearest, and we move to the next 1.
 * However, with this approach we will only be able to update the distance of one 1 with the BFS. This can be optimized if we start BFS from
 * 0s and update the 1s in their path.
 *
 * 1. Keep a queue to maintain a queue of cells to be examined
 * 2. Start by adding 0s to the queue
 * 3. Initially, distance of each 0 cell is 0 and distance of each 1 cell is Infinity which will be updated by BFS
 * 4. Pop the cell from the queue and examine it's neighbors. If the new calculated distance for neighbor {i,j} is smaller,
 *    we add {i,j} to q and update dist[i][j]
 */

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  if (!mat || mat.length === 0) return mat;
  let rows = mat.length;
  let cols = mat[0].length;
  let queue = []; // Step 1: Initializing a queue
  // Step 2 and 3: We add 0s to the queue and change the initial value of all 1 cells to Infinity
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i][j] === 0) queue.unshift([i, j]);
      else mat[i][j] = Infinity;
    }
  }

  let dirs = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1]
  ];

  //Step 4: Pop from the queue. If it's neighbor is a valid cell and it's distance is less we add it to the queue
  // and update the distance
  while (queue.length > 0) {
    let cell = queue.pop();
    for (let d of dirs) {
      let r = cell[0] + d[0];
      let c = cell[1] + d[1];
      if (r < 0 || r >= rows || c < 0 || c >= cols || mat[r][c] <= mat[cell[0]][cell[1]] + 1) continue;
      queue.unshift([r, c]);
      mat[r][c] = mat[cell[0]][cell[1]] + 1;
    }
  }

  return mat;
};
