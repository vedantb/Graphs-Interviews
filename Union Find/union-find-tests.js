let UnionFind = require("./union-find");

// TESTS

// Testing uf.components and unify
let uf = new UnionFind(5);
console.log(uf.components(), "should be 5");
uf.unify(0, 1);
console.log(uf.components(), "should be 4");
uf.unify(1, 0);
console.log(uf.components(), "should be 4");
uf.unify(1, 2);
console.log(uf.components(), "should be 3");
uf.unify(0, 2);
console.log(uf.components(), "should be 3");
uf.unify(2, 1);
console.log(uf.components(), "should be 3");
uf.unify(3, 4);
console.log(uf.components(), "should be 2");
uf.unify(1, 3);
console.log(uf.components(), "should be 1");

console.log("--------TEST 2----------");

// Testing component size and unify
let uf2 = new UnionFind(5);
console.log(uf2.componentSize(0), "should be 1");
uf2.unify(0, 1);
console.log(uf2.componentSize(0), "should be 2");
console.log(uf2.componentSize(1), "should be 2");
console.log(uf2.componentSize(4), "should be 1");
uf2.unify(1, 3);
uf2.unify(3, 4);
console.log(uf2.componentSize(0), "should be 4");
console.log(uf2.componentSize(1), "should be 4");
console.log(uf2.componentSize(2), "should be 1");

console.log("--------TEST 3----------");

// Testing connected
let uf3 = new UnionFind(7);
for (let i = 0; i < 7; i++) {
  console.log(uf3.connected(i, i), "should be true");
}

uf3.unify(0, 2);
uf3.unify(3, 1);
uf3.unify(2, 5);

console.log(uf3.connected(0, 2), "should be true");
console.log(uf3.connected(1, 3), "should be true");
console.log(uf3.connected(0, 5), "should be true");
console.log(uf3.connected(5, 2), "should be true");

console.log(uf3.connected(0, 1), "should be false");
console.log(uf3.connected(1, 2), "should be false");
console.log(uf3.connected(2, 3), "should be false");
console.log(uf3.connected(4, 6), "should be false");

console.log(uf3.find(0), "should be 0");
console.log(uf3.find(2), "should be 0");
console.log(uf3.find(5), "should be 0");

console.log(uf3.find(3), "should be 3");
console.log(uf3.find(1), "should be 3");
