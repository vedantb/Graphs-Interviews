function Edge(from, to, weight) {
  this.from = from;
  this.to = to;
  this.weight = weight;
}

// Finds a topological ordering of the nodes in a Directed Acyclic Graph (DAG)
// The input to this function is an adjacency list for a graph and the number
// of nodes in the graph.
//
// NOTE: 'numNodes' is not necessarily the number of nodes currently present
// in the adjacency list since you can have singleton nodes with no edges which
// wouldn't be present in the adjacency list but are still part of the graph!
function topologicalSort(graph, numNodes) {
  let ordering = Array(numNodes);
  let visited = Array(numNodes);

  let i = numNodes - 1;
  for (let at = 0; at < numNodes; at++) {
    if (!visited[at]) {
      i = dfs(i, at, visited, ordering, graph);
    }
  }
  return ordering;
}

// Helper method that performs a depth first search on the graph to give
// us the topological ordering we want. Instead of maintaining a stack
// of the nodes we see we simply place them inside the ordering array
// in reverse order for simplicity.
function dfs(i, at, visited, ordering, graph) {
  visited[at] = true;
  let edges = graph[at];
  if (edges) {
    for (let edge of edges) {
      if (!visited[edge.to]) {
        i = dfs(i, edge.to, visited, ordering, graph);
      }
    }
  }
  ordering[i] = at;
  return i - 1;
}

// A useful application of the topological sort is to find the shortest path
// between two nodes in a Directed Acyclic Graph (DAG). Given an adjacency list
// this method finds the shortest path to all nodes starting at 'start'
//
// NOTE: 'numNodes' is not necessarily the number of nodes currently present
// in the adjacency list since you can have singleton nodes with no edges which
// wouldn't be present in the adjacency list but are still part of the graph!

function dagShortestPath(graph, start, numNodes) {
  let topSort = topologicalSort(graph, numNodes);
  let dist = Array(numNodes).fill(null);
  dist[start] = 0;

  for (let i = 0; i < numNodes; i++) {
    let nodeIndex = topSort[i];
    if (dist[nodeIndex] !== null) {
      let adjacentEdges = graph[nodeIndex];
      if (adjacentEdges !== undefined || adjacentEdges !== null) {
        for (let edge of adjacentEdges) {
          let newDist = dist[nodeIndex] + edge.weight;
          if (!dist[edge.to]) dist[edge.to] = newDist;
          else dist[edge.to] = Math.min(dist[edge.to], newDist);
        }
      }
    }
  }
  return dist;
}

module.exports = {
  topsort: topologicalSort
};

// Creating a graph
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

let ordering = topologicalSort(graph, N);

console.log(ordering, "top sort");

let dists = dagShortestPath(graph, 0, N);

console.log(dists, "distances");
