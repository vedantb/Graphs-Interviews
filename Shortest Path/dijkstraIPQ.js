let MinHeap = require("../Heaps/binaryMinHeap");

function Edge(from, to, weight) {
  this.from = from;
  this.to = to;
  this.weight = weight;
}

function dijkstras(graph, numNodes, startNode) {
  let visited = Array(numNodes).fill(false);
  let prev = Array(numNodes).fill(null); // only needed if you want to get the path
  let dist = Array(numNodes).fill(Infinity);
  dist[startNode] = 0;
  let minHeap = new MinHeap();
  minHeap.add(0, startNode);
  while (!minHeap.empty()) {
    let minNode = minHeap.removeMinNode();
    let indexOfMinValue = minNode.data;
    let weightOfMinValue = minNode.weight;
    visited[indexOfMinValue] = true;
    if (dist[indexOfMinValue] < weightOfMinValue) continue; // OPTIMIZATION
    for (let edge of graph[indexOfMinValue]) {
      if (visited[edge.to]) continue;
      let newDist = dist[indexOfMinValue] + edge.weight;
      if (newDist < dist[edge.to]) {
        prev[edge.to] = indexOfMinValue;
        dist[edge.to] = newDist;
        if (minHeap.containsData(edge.to)) {
          minHeap.decrease(edge.to, newDist);
        } else {
          minHeap.add(newDist, edge.to);
        }
      }
    }
  }
  return { dist, prev };
}

function findShortestPath(graph, numNodes, startNode, endNode) {
  let { dist, prev } = dijkstras(graph, numNodes, startNode);
  let path = [];
  if (dist[endNode] === Infinity) return path;
  for (let at = endNode; at !== null; at = prev[at]) {
    path.push(at);
  }
  path.reverse();
  return path;
}

const N = 6;
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

console.log(dijkstras(graph, N, 0));
console.log(findShortestPath(graph, N, 0, 4));
