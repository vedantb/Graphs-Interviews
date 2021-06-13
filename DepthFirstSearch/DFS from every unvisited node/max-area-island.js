// https://leetcode.com/problems/max-area-of-island/

/**
 * Same problem as number of islands. Instead of always returning 1 for every island found
 * from the dfs, we calculate how many 1s were flipped to 0s and return that number.
 * MaxArea stores the max count recieved from the dfs
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  if (!grid || grid.length === 0) return 0;
  let maxArea = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        maxArea = Math.max(maxArea, dfs(grid, i, j));
      }
    }
  }
  return maxArea;
};

var dfs = function (grid, row, col) {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] === 0) {
    return 0;
  }
  grid[row][col] = 0;
  let count = 1;
  count += dfs(grid, row + 1, col);
  count += dfs(grid, row - 1, col);
  count += dfs(grid, row, col - 1);
  count += dfs(grid, row, col + 1);
  return count;
};
