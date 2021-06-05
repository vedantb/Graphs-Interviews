const { topsort } = require("../Topological Sort/topsort-dfs");
function dagShortestPath(graph, start, numNodes) {
  let topsortOrder = topsort(graph, numNodes);
  let dist = Array(numNodes).fill(null);
  dist[start] = 0;

  for (let i = 0; i < numNodes; i++) {
    let nodeIndex = topsortOrder[i];
    if (dist[nodeIndex] !== null) {
      let adjacentEdges = graph[nodeIndex];
      if (adjacentEdges !== undefined || adjacentEdges !== null) {
        for (let edge of adjacentEdges) {
          let newDist = dist[nodeIndex] + edge.weight;
          if (dist[edge.to] === null) dist[edge.to] = newDist;
          else dist[edge.to] = Math.min(dist[edge.to], newDist);
        }
      }
    }
  }

  return dist;
}

// Creating a graph
function Edge(from, to, weight) {
  this.from = from;
  this.to = to;
  this.weight = weight;
}

const N = 7;
let graph = {};
for (let i = 0; i < N; i++) graph[i] = [];
graph[0].push(new Edge(0, 1, 3));
graph[0].push(new Edge(0, 2, 2));
graph[0].push(new Edge(0, 5, 3));
graph[1].push(new Edge(1, 3, 1));
graph[1].push(new Edge(1, 2, 6));
graph[2].push(new Edge(2, 3, 1));
graph[2].push(new Edge(2, 4, 10));
graph[3].push(new Edge(3, 4, 5));
graph[3].push(new Edge(3, 4, 7));

let dists = dagShortestPath(graph, 0, N);
