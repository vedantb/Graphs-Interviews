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
  let words = new Set(wordList);
  if (!words.has(endWord)) return 0;
  let beginSet = new Set();
  let endSet = new Set();
  beginSet.add(beginWord);
  endSet.add(endWord);
  let length = 1;
  while (beginSet.size > 0 && endSet.size > 0) {
    if (beginSet.size > endSet.size) {
      let temp = beginSet;
      beginSet = endSet;
      endSet = temp;
    }
    let newBeginSet = new Set();
    for (let word of beginSet) {
      let neighbors = getNeighbors(word);
      for (let neigh of neighbors) {
        if (endSet.has(neigh)) return length + 1;
        if (words.has(neigh)) {
          newBeginSet.add(neigh);
          words.delete(neigh);
        }
      }
    }
    beginSet = newBeginSet;
    length++;
  }
  return 0;
}

// Time Complexity: O(M^2 * N)
// Space Complexity: O(N*M)

console.log(ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log"]));
console.log(ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]));
