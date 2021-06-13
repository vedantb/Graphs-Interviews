// https://leetcode.com/problems/coloring-a-border/

// !!!! Come back to this problem

/**
 * We start a DFS from r0, c0 and mark all nodes as visited by doing -oldColor (inverting them)
 * Then in the dfs loop, we check if the cell is at a border of the grid or if none
 * of it's adjacent cells have have -oldColor/oldColor and if they do we revert the value
 * of this cell back to oldColor since we don't need to change this.
 *
 * Once dfs is dn
 */

/**
 * @param {number[][]} grid
 * @param {number} r0
 * @param {number} c0
 * @param {number} color
 * @return {number[][]}
 */
var colorBorder = function (grid, r0, c0, color) {
    if (!grid || grid.length === 0) return grid;
    let oldColor = grid[r0][c0];

    dfs(grid, r0, c0, oldColor);
    console.log(grid);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] < 0) grid[i][j] = color;
        }
    }
    return grid;
};

var dfs = function (grid, r, c, oldColor) {
    // Out of bounds check
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== oldColor) return;

    grid[r][c] = -oldColor;

    dfs(grid, r + 1, c, oldColor);
    dfs(grid, r - 1, c, oldColor);
    dfs(grid, r, c + 1, oldColor);
    dfs(grid, r, c - 1, oldColor);
    if (
        r > 0 &&
        c > 0 &&
        r < grid.length - 1 &&
        c < grid[0].length - 1 &&
        oldColor === Math.abs(grid[r + 1][c]) &&
        oldColor === Math.abs(grid[r - 1][c]) &&
        oldColor === Math.abs(grid[r][c + 1]) &&
        oldColor === Math.abs(grid[r][c - 1])
    ) {
        grid[r][c] = oldColor;
    }
};

console.log(
    colorBorder(
        [
            [2, 1, 3, 2, 1, 1, 2],
            [1, 2, 3, 1, 2, 1, 2],
            [1, 2, 1, 2, 2, 2, 2],
            [2, 1, 2, 2, 2, 2, 2],
            [2, 3, 3, 3, 2, 1, 2]
        ],
        4,
        4,
        3
    )
);
