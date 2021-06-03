// https://leetcode.com/problems/number-of-operations-to-make-network-connected/
/**
 * There are n computers numbered from 0 to n-1 connected by ethernet cables connections forming a network where
 * connections[i] = [a, b] represents a connection between computers a and b.
 * Any computer can reach any other computer directly or indirectly through the network.
 *
 * Given an initial computer network connections. You can extract certain cables between two directly connected computers,
 * and place them between any pair of disconnected computers to make them directly connected.
 *
 * Return the minimum number of times you need to do this in order to make all the computers connected.
 * If it's not possible, return -1.
 */

let UnionFind = require("./union-find");

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {
  let uf = new UnionFind(n);
  let extraEdges = 0;
  for (let connection of connections) {
    if (uf.unify(connection[0], connection[1]) === false) {
      extraEdges++;
    }
  }
  return extraEdges >= uf.components() - 1 ? uf.components() - 1 : -1;
};

console.log(
  makeConnected(4, [
    [0, 1],
    [0, 2],
    [1, 2]
  ]),
  "should be 1"
);

console.log(
  makeConnected(6, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3]
  ]),
  "should be 2"
);

console.log(
  makeConnected(6, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2]
  ]),
  "should be -1"
);

console.log(
  makeConnected(5, [
    [0, 1],
    [0, 2],
    [3, 4],
    [2, 3]
  ]),
  "should be 0"
);
