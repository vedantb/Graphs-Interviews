// https://leetcode.com/problems/find-eventual-safe-states/

/**
 * This is a classic "white-gray-black" DFS algorithm
 * We mark a node gray on entry, and black on exit. If we see a gray node during our DFS,
 * it must be part of a cycle. In a naive view, we'll clear the colors between each search.
 */

/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function (graph) {
  let n = graph.length;
  let color = Array(n);
  let ans = [];
  for (let i = 0; i < n; i++) {
    if (dfs(i, color, graph)) {
      ans.push(i);
    }
  }
  return ans;
};

var dfs = function (node, color, graph) {
  if (color[node] > 0) return color[node] === 2;

  color[node] = 1;
  for (let edge of graph[node]) {
    if (color[edge] === 2) continue;
    if (color[edge] === 1 || !dfs(edge, color, graph)) return false;
  }
  color[node] = 2;
  return true;
};
