let kosarajuSCC = function (graph, numNodes) {
  let visited = new Array(numNodes).fill(false);

  dfsUtil(0, visited, graph);

  for (let i = 0; i < numNodes; i++) {
    if (!visited[i]) return false;
  }

  let reverseGraph = {};
  for (let i = 0; i < numNodes; i++) reverseGraph[i] = [];
  for (let i = 0; i < numNodes; i++) {
    let edges = graph[i];
    for (let edge of edges) {
      reverseGraph[edge.to].push([edge.to, edge.from]);
    }
  }

  visited = new Array(numNodes).fill(false);

  dfsUtil(0, visited, graph);

  for (let i = 0; i < numNodes; i++) {
    if (!visited[i]) return false;
  }
  return true;
};

let dfsUtil = function (vertex, visited, graph) {
  visited[vertex] = true;
  for (let edge of graph[vertex]) {
    if (!visited[edge.to]) {
      dfsUtil(edge.to, visited, graph);
    }
  }
};

// Creating a graph
function Edge(from, to) {
  this.from = from;
  this.to = to;
}

let N = 5;
let graph1 = {};
for (let i = 0; i < N; i++) graph1[i] = [];
graph1[0].push(new Edge(0, 1));
graph1[1].push(new Edge(1, 2));
graph1[2].push(new Edge(2, 3));
graph1[3].push(new Edge(3, 0));
graph1[2].push(new Edge(2, 4));
graph1[4].push(new Edge(4, 2));

console.log(kosarajuSCC(graph1, N));

N = 3;
let graph2 = {};
for (let i = 0; i < N; i++) graph2[i] = [];
graph1[0].push(new Edge(0, 1));
graph1[1].push(new Edge(1, 2));
graph1[2].push(new Edge(2, 3));

console.log(kosarajuSCC(graph2, N));
