// Kruska's Minimum Spanning Tree Algorithm
// Space Complexity: O(V + E)
// Time Complexity: O(ElogE + E)

let UnionFind = require("../Union Find/union-find");

function Edge(from, to, cost) {
  this.from = from;
  this.to = to;
  this.cost = cost;
}

function getKruskalsMST(edges, numNodes) {
  if (!edges) return null;
  edges = edges.sort((a, b) => a.cost - b.cost);
  let uf = new UnionFind(numNodes);
  let sum = 0;
  let resultEdges = [];

  for (let edge of edges) {
    if (uf.connected(edge.from, edge.to)) continue;

    uf.unify(edge.from, edge.to);
    sum += edge.cost;
    resultEdges.push(edge);

    // Optimization to stop early if we found an MST that includes all nodes
    if (uf.components() === 1) break;
  }

  if (uf.components() !== 1) return null;
  return { sum, resultEdges };
}

let N = 6;
let edges = [];
edges.push(new Edge(0, 1, 3));
edges.push(new Edge(0, 3, 1));
edges.push(new Edge(1, 3, 3));
edges.push(new Edge(1, 2, 1));
edges.push(new Edge(2, 3, 1));
edges.push(new Edge(3, 4, 6));
edges.push(new Edge(2, 4, 5));
edges.push(new Edge(2, 5, 4));
edges.push(new Edge(4, 5, 2));
console.log(getKruskalsMST(edges, N));
