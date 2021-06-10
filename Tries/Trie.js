function TrieNode(endOfWord = false) {
  this.children = {};
  this.endOfWord = endOfWord;
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Iterative implementation of insert into trie
  insert(word) {
    let current = this.root;
    for (let ch of word) {
      const node = current.children[ch] || new TrieNode();
      current.children[ch] = node;
      current = node;
    }
    current.endOfWord = true;
  }

  // Iterative implementation of search
  search(word) {
    let current = this.root;
    for (let ch of word) {
      current = current.children[ch];
      if (!current) return false;
    }
    return current.endOfWord === true;
  }

  startsWith(prefix) {
    let current = this.root;
    for (let ch of prefix) {
      current = current.children[ch];
      if (!current) return false;
    }
    return true;
  }

  // recursive implementation of insert into trie
  insertRecursive(word) {
    this.insertRecursiveHelper(this.root, word, 0);
  }

  insertRecursiveHelper(current, word, index) {
    if (index === word.length) {
      current.endOfWord = true;
      return;
    }
    let ch = word[index];
    let node = current.children[ch] || new TrieNode();
    current.children[ch] = node;
    this.insertRecursiveHelper(node, word, index + 1);
  }

  searchRecursive(word) {
    return this.searchRecursiveHelper(root, word, 0);
  }

  searchRecursiveHelper(current, word, index) {
    if (index === word.length) {
      return current.endOfWord;
    }
    let ch = word[index];
    let node = current.children[ch];
    if (!node) {
      return false;
    }
    return this.searchRecursiveHelper(node, word, index + 1);
  }

  deleteWord(word) {
    return this.deleteHelper(this.root, word, 0);
  }

  deleteHelper(current, word, index) {
    if (index === word.length) {
      if (!current.endOfWord) return false;
      current.endOfWord = false;
      return Object.keys(current.children).length === 0;
    }
    let ch = word[index];
    let node = current.children[ch];
    if (node === null) return false;
    let shouldDeleteCurrentNode = this.deleteHelper(node, word, index + 1);
    if (shouldDeleteCurrentNode) {
      delete current.children[ch];
      return Object.keys(current.children).length === 0 && !current.endOfWord;
    }
    return false;
  }
}

module.exports = Trie;
