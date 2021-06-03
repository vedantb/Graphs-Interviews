/** https://leetcode.com/problems/number-of-provinces/ */

/**
 * There are n cities. Some of them are connected, while some are not.
 * If city a is connected directly with city b, and city b is connected directly with city c,
 * then city a is connected indirectly with city c.
 * A province is a group of directly or indirectly connected cities and no other cities outside of the group.
 *
 * You are given an n x n matrix isConnected where isConnected[i][j] = 1
 * if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.
 *
 * Return the total number of provinces.
 *
 * e.g. Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
 * Output: 2
 */

let UnionFind = require("./union-find.js");

let findNumProvinces = function (isConnected) {
  let uf = new UnionFind(isConnected.length);
  for (let i = 0; i < isConnected.length; i++) {
    for (let j = 0; j < isConnected[0].length; j++) {
      if (isConnected[i][j] === 1 && i !== j) {
        uf.unify(i, j);
      }
    }
  }
  return uf.components();
};

console.log(
  findNumProvinces([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ]),
  "should be 3"
);

console.log(
  findNumProvinces([
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1]
  ]),
  "should be 2"
);
