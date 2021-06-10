/**
 * Do the simple version - isGraphBiPartite first
 * This builds a graph using the dislikes array. We put the first node of the dislikes first edge
 * in the stack coloring it with 0 and then visit all neighbors and do the standard graph coloring.
 *
 * After adding neighbors to the stack. if the stack length is 0 but we still have unprocesed nodes,
 * we start coloring from that node again.
 */

/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function (n, dislikes) {
  if (!dislikes || dislikes.length === 0) return true;
  let graph = {};
  let color = Array(n + 1).fill(-1);
  const stack = [];

  for (let [a, b] of dislikes) {
    graph[a] = (graph[a] || new Set()).add(b);
    graph[b] = (graph[b] || new Set()).add(a);
  }

  color[0] = 0;
  stack.push([dislikes[0][0], 0]);
  while (stack.length) {
    const [node, col] = stack.pop();
    color[node] = col;

    if (node in graph) {
      const neighbors = graph[node];

      for (let neighbor of neighbors) {
        if (color[neighbor] === col) return false;
        if (color[neighbor] === -1) stack.push([neighbor, col ^ 1]);
      }
    }

    // This is to check for disconnected nodes in the graph
    // This will pick up a disconnected component and start coloring that component
    if (stack.length === 0 && color.includes(-1)) {
      for (let i = 1; i < color.length; i++) {
        if (i in graph && color[i] === -1) {
          stack.push([i, 0]);
          break;
        }
      }
    }
  }
  return true;
};

console.log(
  possibleBipartition(5, [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [1, 5]
  ])
);
