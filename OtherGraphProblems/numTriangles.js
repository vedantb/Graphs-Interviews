/**
 * Given an undirected graph, find the number of triangles
 * in this graph.
 * Find cycle of length 3. Pass parent in DFS search.
 * If there is a cycle check if my parent is neighbor of the node
 * which caused it to be a cycle
 */

function countTriangles(graph) {
  let visited = {};
  let count = 0;
  for (let i = 0; i < graph.length; i++) {
    count += dfs(i, visited, null, graph);
  }
  return count;
}

function dfs(vertex, visited, parent, graph) {
  if (vertex in visited) return 0;
  visited[vertex] = true;
  let count = 0;
  for (let child of graph[vertex]) {
    if (child === parent) continue;
    if (child in visited) {
      count += isNeighbor(child, parent, graph) ? 1 : 0;
    } else {
      count += dfs(child, visited, vertex, graph);
    }
  }
  return count;
}

function isNeighbor(vertex, destVertex, graph) {
  for (let child of graph[vertex]) {
    if (child === destVertex) return true;
  }
  return false;
}

let graph = [
  [1, 2, 3],
  [0, 2, 3],
  [0, 1, 4, 5],
  [0, 1, 4],
  [2, 3, 5],
  [2, 4]
];

console.log(countTriangles(graph));
