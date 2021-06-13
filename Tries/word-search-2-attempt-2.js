const Trie = require("./Trie.js");

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  let trie = new Trie();
  let result = new Set();

  for (let word of words) {
    trie.insert(word);
  }
  let rows = board.length;
  let cols = board[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dfs(board, "", row, col, trie, result);
    }
  }
  return Array.from(result);
};

var dfs = function (board, str, row, col, trie, result) {
  let rows = board.length;
  let cols = board[0].length;

  if (row < 0 || col < 0 || row >= rows || col >= cols) return;
  let letter = board[row][col];
  if (letter === "#") return;
  str += board[row][col];

  if (!trie.startsWith(str)) return;
  if (trie.search(str)) result.add(str);

  board[row][col] = "#";
  dfs(board, str, row - 1, col, trie, result);
  dfs(board, str, row + 1, col, trie, result);
  dfs(board, str, row, col + 1, trie, result);
  dfs(board, str, row, col - 1, trie, result);
  board[row][col] = letter;
};

console.log(
  findWords(
    [
      ["o", "a", "b", "n"],
      ["o", "t", "a", "e"],
      ["a", "h", "k", "r"],
      ["a", "f", "l", "v"]
    ],
    [("oa", "oaa")]
  )
);
