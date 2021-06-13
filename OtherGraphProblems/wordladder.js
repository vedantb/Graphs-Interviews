function getNeighbors(word) {
  let wordArray = word.split("");
  let result = [];
  for (let i = 0; i < wordArray.length; i++) {
    let temp = wordArray[i];
    let alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
    for (let c = 0; c < alphabetArray.length; c++) {
      wordArray[i] = alphabetArray[c];
      let nei = wordArray.join("");
      result.push(nei);
    }
    wordArray[i] = temp;
  }
  return result;
}

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
function ladderLength(beginWord, endWord, wordList) {
  let queue = [];
  let words = new Set(wordList);
  words.delete(beginWord);
  queue.unshift(beginWord);
  let level = 0;
  while (queue.length) {
    let size = queue.length;
    level++;
    for (let i = 0; i < size; i++) {
      let currentWord = queue.pop();
      if (currentWord === endWord) return level;
      let neighbors = getNeighbors(currentWord);
      for (let neigh of neighbors) {
        if (words.has(neigh)) {
          words.delete(neigh);
          queue.unshift(neigh);
        }
      }
    }
  }
  return 0;
}

// Time Complexity: O(M^2 * N)
// Space Complexity: O(N*M)

console.log(ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log"]));
console.log(ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]));
