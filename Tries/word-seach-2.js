function TrieNode() {
    this.children = {};
    this.word = null;
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
    let root = new TrieNode();
    let result = [];
    for (let word of words) {
        let node = root;

        for (let letter of word) {
            node.children[letter] = node.children[letter] || new TrieNode();
            node = node.children[letter];
        }
        node.word = word;
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] in root.children) {
                findWordsHelper(row, col, root, board, result);
            }
        }
    }
    return result;
};

var findWordsHelper = function (row, col, parent, board, result) {
    let letter = board[row][col];
    let currNode = parent.children[letter];
    if (currNode.word !== null) {
        result.push(currNode.word);
        currNode.word = null;
    }

    board[row][col] = "#";

    let dirs = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];
    for (let [r, c] of dirs) {
        let newRow = row + r;
        let newCol = col + c;
        if (newRow < 0 || newRow >= board.length || newCol < 0 || newCol >= board[0].length) continue;
        if (board[newRow][newCol] in currNode.children) {
            findWordsHelper(newRow, newCol, currNode, board, result);
        }
    }

    board[row][col] = letter;

    if (Object.keys(currNode.children).length === 0) {
        delete parent.children[letter];
    }
};

console.log(
    findWords(
        [
            ["o", "a", "a", "n"],
            ["e", "t", "a", "e"],
            ["i", "h", "k", "r"],
            ["i", "f", "l", "v"]
        ],
        ["oath", "pea", "eat", "rain"]
    )
);

console.log(
    findWords(
        [
            ["a", "b"],
            ["c", "d"]
        ],
        ["abcb"]
    )
);
