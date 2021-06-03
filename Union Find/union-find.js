class UnionFind {
  constructor(size) {
    this.size = size;
    this.numComponents = size; // might be useful who tf knows
    this.sz = Array(size); // to track sizes of each component
    this.id = Array(size); // id[i] points to parent[i]

    for (let i = 0; i < size; i++) {
      this.id[i] = i; // link to itself
      this.sz[i] = 1; // each component is size 1
    }
  }

  //find which component/set node belongs to
  find(node) {
    // find root of the component/set
    let root = node;
    while (root !== this.id[root]) {
      root = this.id[root];
    }

    //compress the path leading back to the root
    // Doing this operation is called "path compression"
    // and is what gives us amortized constant time complexity
    while (node !== root) {
      let next = this.id[node];
      this.id[node] = root;
      node = next;
    }

    return root;
  }

  // return whether or not elements 'p' and 'q'
  // are in the same components/sets
  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  // returns size of the component/set 'p' belongs to
  componentSize(p) {
    return this.sz[this.find(p)];
  }

  // returns the number of elements in the Union Find/Disjoint Set
  size() {
    return this.size;
  }

  // returns the number of remaining components
  components() {
    return this.numComponents;
  }

  //unify compnents/sets containing p and q
  unify(p, q) {
    let root1 = this.find(p);
    let root2 = this.find(q);

    // already in same group
    if (root1 === root2) return false;

    // merge two components together
    // merge smaller component into larger one
    if (this.sz[root1] < this.sz[root2]) {
      this.sz[root2] += this.sz[root1];
      this.id[root1] = root2;
    } else {
      this.sz[root1] += this.sz[root2];
      this.id[root2] = root1;
    }

    // Since the roots are different we know that no of components
    // decreased by 1
    this.numComponents--;
  }
}
module.exports = UnionFind;
