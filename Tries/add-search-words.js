function TrieNode(endOfWord = false) {
  this.children = {};
  this.endOfWord = endOfWord;
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let current = this.root;
    for (let ch of word) {
      const node = current.children[ch] || new TrieNode();
      current.children[ch] = node;
      current = node;
    }
    current.endOfWord = true;
  }

  search(word) {
    return this.searchInNode(word, this.root, 0);
  }

  searchInNode(word, current, index) {
    if (!current || (index === word.length && !current.endOfWord)) return false;
    if (index === word.length && current.endOfWord) return true;
    let ch = word[index];
    if (ch === ".") {
      for (const [, value] of Object.entries(current.children)) {
        if (this.searchInNode(word, value, index + 1)) {
          return true;
        }
      }
      return false;
    }

    return this.searchInNode(word, current.children[ch], index + 1);
  }
}

let test = new WordDictionary();
test.addWord("at");
test.addWord("and");
test.addWord("an");
test.addWord("add");
console.log(test.search("a"));
console.log(test.search(".at"));
test.addWord("bat");
console.log(test.search(".at"));
console.log(test.search("an."));
console.log(test.search("a.d."));
console.log(test.search("b."));
console.log(test.search("a.d"));
console.log(test.search("."));
