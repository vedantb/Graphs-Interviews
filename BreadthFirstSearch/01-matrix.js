/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  if (!mat || mat.length === 0) return mat;
  let rows = mat.length;
  let cols = mat[0].length;
  let queue = [];
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
