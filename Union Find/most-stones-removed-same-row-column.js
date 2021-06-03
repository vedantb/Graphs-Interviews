/**
 * On a 2D plane, we place n stones at some integer coordinate points.
 * Each coordinate point may have at most one stone.
 *
 * A stone can be removed if it shares either the same row or the same column
 * as another stone that has not been removed.
 *
 * Given an array stones of length n where stones[i] = [xi, yi] represents the location of the ith stone,
 * return the largest possible number of stones that can be removed.
 */

let UnionFind = require("./union-find");

/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
  // First, we map each row and column to a different unique number/id since they are separate
  // for the union find.
  // The map will store a unique number for each row and column for the stones
  let map = {};
  for (stone of stones) {
    let rowString = `r${stone[0]}`;
    let colString = `c${stone[1]}`;
    if (!(rowString in map)) map[rowString] = Object.keys(map).length;
    if (!(colString in map)) map[colString] = Object.keys(map).length;
  }
  let uf = new UnionFind(Object.keys(map).length);
  for (let stone of stones) {
    uf.unify(map[`r${stone[0]}`], map[`c${stone[1]}`]);
  }
  return stones.length - uf.components();
};

console.log(
  removeStones([
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2]
  ])
);

console.log(
  removeStones([
    [0, 1],
    [1, 1]
  ])
);
