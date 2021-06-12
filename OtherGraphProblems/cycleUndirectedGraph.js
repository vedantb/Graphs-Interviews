// Detect a cycle in an undirected graph

/**
 * Given an undirected graph, find a cycle in this graph
 *
 * Solution:
 * This can be solved in many ways
 * Below is the code to solve it using disjoint sets and DFS
 *
 * Runtime and space complexity for both techniques is O(v)
 */

let UnionFind = require("../Union Find/union-find");

function hasCycleUnionFind(graph) {
  let unionFind = new UnionFind(graph.length);

  for (let edge of graph) {
    let parent1 = unionFind.find(edge[0]);
    let parent2 = unionFind.find(edge[1]);
    if (parent1 === parent2) return true;
    unionFind.unify(edge[0], edge[1]);
  }
  return false;
}

function hasCycleDFS(graph) {
  let visited = new Set();
  for (let i = 0; i < graph.length; i++) {
    if (visited.has(i)) continue;
    let flag = hasCycleDFSUtil(i, visited, null, graph);
    if (flag) return true;
  }
  return false;
}

function hasCycleDFSUtil(vertex, visited, parent, graph) {
  visited.add(vertex);
  for (let adj of graph[vertex]) {
    if (adj === parent) continue;
    if (visited.has(adj)) return true;
    let hasCycle = hasCycleDFSUtil(adj, visited, vertex, graph);
    if (hasCycle) return true;
  }
  return false;
}

function createEmptyGraph(n) {
  let graph = [];
  for (let i = 0; i < n; i++) graph.push([]);
  return graph;
}

function addUndirectedEdge(graph, from, to) {
  graph[from].push(to);
  graph[to].push(from);
}

let graph1 = createEmptyGraph(6);
addUndirectedEdge(graph1, 0, 1);
addUndirectedEdge(graph1, 1, 2);
addUndirectedEdge(graph1, 2, 3);
addUndirectedEdge(graph1, 3, 4);
addUndirectedEdge(graph1, 4, 5);
addUndirectedEdge(graph1, 0, 5);

console.log(hasCycleUnionFind(graph1));
console.log(hasCycleDFS(graph1));
