// https://leetcode.com/problems/is-graph-bipartite/

/**
 * We start with a colors array where each node starts with the color -1.
 * We pick the start node, give it color 0 and push it to the stack to start DFS
 * Pop a node from the stack
 * Get all neighbors of the popped node. if its uncolored(-1), push it to the stack and give it a color opposite of the popped node.
 * If the color of the neighbor is same as the color of the popped node return false as graph cannot be bipartite.
 */

/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  let n = graph.length;
  let color = Array(n).fill(-1);

  for (let start = 0; start < n; start++) {
    if (color[start] === -1) {
      let stack = [];
      stack.push(start);
      color[start] = 0;

      while (stack.length > 0) {
        let node = stack.pop();
        for (let neighbor of graph[node]) {
          if (color[neighbor] === -1) {
            stack.push(neighbor);
            color[neighbor] = color[node] ^ 1;
          } else if (color[neighbor] === color[node]) {
            return false;
          }
        }
      }
    }
  }
  return true;
};
