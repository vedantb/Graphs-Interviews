function Edge(from, to) {
  this.from = from;
  this.to = to;
}

function dfs(graph, startNode) {
  return dfsHelper(startNode, Array(graph.length).fill(false), graph);
}

// perform a dfs search on the graph counting
// the number of nodes traversed starting at some position
function dfsHelper(at, visited, graph) {
  // already visited this node
  if (visited[at]) return 0;

  visited[at] = true;
  let count = 1;

  let edges = graph[at];
  if (edges) {
    for (let edge of edges) {
      count += dfsHelper(edge.to, visited, graph);
    }
  }
  return count;
}

// Creating a graph
let graph = [];
for (let i = 0; i < 5; i++) graph[i] = [];
graph[0].push(new Edge(0, 1));
graph[0].push(new Edge(0, 2));
graph[1].push(new Edge(1, 2));
graph[1].push(new Edge(1, 3));
graph[2].push(new Edge(2, 3));
graph[2].push(new Edge(2, 2));
console.log(dfs(graph, 0));
console.log(dfs(graph, 4));
