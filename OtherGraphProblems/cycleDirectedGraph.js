// Detect Cycle in a directed Graph

let hasCycle = function (graph) {
  let n = graph.length;
  let color = Array(n);
  for (let i = 0; i < n; i++) {
    if (dfs(i, color, graph)) {
      return true;
    }
  }
  return false;
};

let dfs = function (node, color, graph) {
  if (color[node] > 0) return !(color[node] === 2);

  color[node] = 1;
  for (let edge of graph[node]) {
    if (color[edge] === 2) continue;
    if (color[edge] === 1 || dfs(edge, color, graph)) return true;
  }
  color[node] = 2;
  return false;
};

function createEmptyGraph(n) {
  let graph = [];
  for (let i = 0; i < n; i++) graph.push([]);
  return graph;
}

function addDirectedEdge(graph, from, to) {
  graph[from].push(to);
}

let graph1 = createEmptyGraph(6);
addDirectedEdge(graph1, 0, 1);
addDirectedEdge(graph1, 1, 2);
addDirectedEdge(graph1, 2, 3);
addDirectedEdge(graph1, 3, 4);
addDirectedEdge(graph1, 4, 5);
addDirectedEdge(graph1, 5, 0);

console.log(hasCycle(graph1));
