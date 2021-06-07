function Edge(from, to, weight) {
  this.from = from;
  this.to = to;
  this.weight = weight;
}

function bfs(graph, start, end) {
  let prev = Array(graph.length).fill(null);
  let visited = Array(graph.length);
  let queue = [];
  queue.unshift(start);
  visited[start] = true;

  while (queue.length > 0) {
    let node = queue.pop();
    let edges = graph[node];

    for (let edge of edges) {
      if (!visited[edge.to]) {
        visited[edge.to] = true;
        prev[edge.to] = node;
        queue.unshift(edge.to);
      }
    }
  }
  return reconstructPath(start, end, prev);
}

function reconstructPath(start, end, prev) {
  let path = [];
  for (let at = end; at !== null; at = prev[at]) {
    path.push(at);
  }
  path.reverse();
  if (path[0] === start) return path;
  path = [];
  return path;
}

let graph = Array(13);
for (let i = 0; i < 13; i++) graph[i] = [];

function addUnweightedUndirectedEdge(graph, u, v) {
  graph[u].push(new Edge(u, v, 1));
  graph[v].push(new Edge(v, u, 1));
}

addUnweightedUndirectedEdge(graph, 0, 7);
addUnweightedUndirectedEdge(graph, 0, 9);
addUnweightedUndirectedEdge(graph, 0, 11);
addUnweightedUndirectedEdge(graph, 7, 11);
addUnweightedUndirectedEdge(graph, 7, 6);
addUnweightedUndirectedEdge(graph, 7, 3);
addUnweightedUndirectedEdge(graph, 6, 5);
addUnweightedUndirectedEdge(graph, 3, 4);
addUnweightedUndirectedEdge(graph, 2, 3);
addUnweightedUndirectedEdge(graph, 2, 12);
addUnweightedUndirectedEdge(graph, 12, 8);
addUnweightedUndirectedEdge(graph, 8, 1);
addUnweightedUndirectedEdge(graph, 1, 10);
addUnweightedUndirectedEdge(graph, 10, 9);
addUnweightedUndirectedEdge(graph, 9, 8);

console.log(bfs(graph, 10, 5));
