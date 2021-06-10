// https://leetcode.com/problems/word-search/

/**
 * Traverse through the entire grid and try to explore from every cell.
 * We also maintain an index (starts at 0) to tell us what index of the word we're comparing with.
 * If the cell we're traversing matches the word[index], we explore more using DFS from that cell.
 *
 * Before we recurse, mark the current cell as visited by replacing it with #
 * After exploring the neighbors, you can get the board back to its original state by replacing
 * the # you added with word[index] again.
 *
 * Getting it back to the original state is important since we want to mark the cell as visited only
 * for the DFS we started from that cell. Once that's done its unvisited again. It can be explored again
 * when we start our search for another cell.
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  let rows = board.length;
  let cols = board[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (exploreFromCell(row, col, word, 0, board)) return true;
    }
  }
  return false;
};

var exploreFromCell = function (row, col, word, index, board) {
  if (index >= word.length) return true;

  let rows = board.length;
  let cols = board[0].length;

  if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] !== word[index]) {
    return false;
  }

  let res = false;
  board[row][col] = "#";

  let dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ];
  for (let [r, c] of dirs) {
    res = exploreFromCell(row + r, col + c, word, index + 1, board);
    if (res) break;
  }

  board[row][col] = word[index];
  return res;
};
