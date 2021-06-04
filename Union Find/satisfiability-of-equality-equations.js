const UnionFind = require("./union-find");

/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
  let uf = new UnionFind(26);
  for (equation of equations) {
    if (equation[1] === "=") {
      uf.unify(
        equation[0].charCodeAt() - "a".charCodeAt(),
        equation[3].charCodeAt() - "a".charCodeAt()
      );
    }
  }

  for (equation of equations) {
    if (equation[1] === "!") {
      let isConnected = uf.connected(
        equation[0].charCodeAt() - "a".charCodeAt(),
        equation[3].charCodeAt() - "a".charCodeAt()
      );
      if (isConnected) return false;
    }
  }
  return true;
};

// Tests

console.log(equationsPossible(["a==b", "b!=a"]), "should be false");
console.log(equationsPossible(["b==a", "a==b"]), "should be true");
console.log(equationsPossible(["a==b", "b==c", "a==c"]), "should be true");
console.log(equationsPossible(["a==b", "b!=c", "c==a"]), "should be false");
console.log(equationsPossible(["c==c", "b==d", "x!=z"]), "should be true");
