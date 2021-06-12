function hasCycle(graph) {
  let whiteSet = new Set();
  let graySet = new Set();
  let blackSet = new Set();

  for (let i = 0; i < graph.length; i++) {
    whiteSet.add(i);
  }

  for (let item of whiteSet.values()) {
    if (dfs(item, whiteSet, graySet, blackSet, graph)) return true;
  }
  return false;
}

function dfs(current, whiteSet, graySet, blackSet, graph) {
  moveVertex(current, whiteSet, graySet);
  for (let neighbor of graph[current]) {
    if (blackSet.has(neighbor)) continue;
    if (graySet.has(neighbor)) return true; // cycle found
    if (dfs(neighbor, whiteSet, graySet, blackSet, graph)) return true;
  }
  moveVertex(current, graySet, blackSet);
  return false;
}

function moveVertex(vertex, sourceSet, destSet) {
  sourceSet.delete(vertex);
  destSet.add(vertex);
}

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
// addDirectedEdge(graph1, 5, 0);

console.log(hasCycle(graph1));
