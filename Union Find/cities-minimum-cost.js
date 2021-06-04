// https://leetcode.com/problems/connecting-cities-with-minimum-cost/
/**
 * There are n cities numbered from 1 to n.
 *
 * You are given connections, where each connections[i] = [city1, city2, cost]
 * represents the cost to connect city1 and city2 together.
 * (A connection is bidirectional: connecting city1 and city2 is the same as connecting city2 and city1.)
 *
 * Return the minimum cost so that for every pair of cities, there exists a path of connections (possibly of length 1)
 * that connects those two cities together.  The cost is the sum of the connection costs used. If the task is impossible, return -1.
 */

const UnionFind = require("./union-find");

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minimumCost = function (n, connections) {
  let uf = new UnionFind(n);
  // sorting the connections by their cost
  connections.sort((a, b) => a[2] - b[2]);

  let cost = 0;
  for (connection of connections) {
    let cityA = connection[0];
    let cityB = connection[1];
    if (uf.connected(cityA, cityB)) continue;
    uf.unify(cityA, cityB);
    cost += connection[2];
  }

  if (uf.components() === 1) return cost;
  return -1;
};

// TESTS
console.log(
  minimumCost(4, [
    [1, 2, 3],
    [3, 4, 4]
  ]),
  "should be -1"
);

console.log(
  minimumCost(3, [
    [1, 2, 5],
    [1, 3, 6],
    [2, 3, 1]
  ]),
  "should be 6"
);
