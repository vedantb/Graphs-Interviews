// Prim's Minimum Spanning Tree
// Notes and https://www.youtube.com/watch?v=oP2-8ysT3QQ&t=4s

let MinHeap = require("../Heaps/binaryMinHeap");

function Edge(from, to, cost) {
  this.from = from;
  this.to = to;
  this.cost = cost;
}

function getPrimsMST(graph, numNodes) {
  let minHeap = new MinHeap();
  let vertexToEdge = {};
  let result = [];
  for (let i = 0; i < numNodes; i++) {
    minHeap.add(Infinity, i);
  }
  let startVertex = 0;
  minHeap.decrease(startVertex, 0);

  while (!minHeap.empty()) {
    let current = minHeap.extractMin();

    let spanningTreeEdge = vertexToEdge[current];
    if (spanningTreeEdge) {
      result.push(spanningTreeEdge);
    }

    for (let edge of graph[current]) {
      let adj = edge.to;
      if (minHeap.containsData(adj) && minHeap.getWeight(adj) > edge.cost) {
        minHeap.decrease(adj, edge.cost);
        vertexToEdge[adj] = edge;
      }
    }
  }
  return result;
}

let N = 6;
let graph = {};
for (let i = 0; i < N; i++) {
  graph[i] = [];
}

function addEdge(from, to, cost) {
  from = from - 1;
  to = to - 1;
  graph[from].push(new Edge(from, to, cost));
  graph[to].push(new Edge(to, from, cost));
}

addEdge(1, 2, 3);
addEdge(2, 3, 1);
addEdge(3, 1, 1);
addEdge(1, 4, 1);
addEdge(2, 4, 3);
addEdge(4, 5, 6);
addEdge(5, 6, 2);
addEdge(3, 5, 5);
addEdge(3, 6, 4);

console.log(getPrimsMST(graph, N));
