/** https://leetcode.com/problems/redundant-connection/ */

/**
 * In this problem, a tree is an undirected graph that is connected and has no cycles.
 *
 * You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added.
 * The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed.
 *
 * The graph is represented as an array edges of length n where edges[i] = [ai, bi]
 * indicates that there is an edge between nodes ai and bi in the graph.
 *
 * Return an edge that can be removed so that the resulting graph is a tree of n nodes.
 * If there are multiple answers, return the answer that occurs last in the input.
 *
 * e.g. Input: edges = [[1,2],[1,3],[2,3]]
 * Output: [2,3]
 */

let UnionFind = require("./union-find.js");
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  let uf = new UnionFind(edges.length);
  for (let i = 0; i < edges.length; i++) {
    if (uf.unify(edges[i][0], edges[i][1]) === false) {
      return edges[i];
    }
  }
};

console.log(
  findRedundantConnection([
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 4],
    [1, 5]
  ]),
  "should be [1,4]"
);

console.log(
  findRedundantConnection([
    [1, 2],
    [1, 3],
    [2, 3]
  ]),
  "should be [2, 3]"
);
