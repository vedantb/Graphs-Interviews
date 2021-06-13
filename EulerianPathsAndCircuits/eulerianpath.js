let eulerianPathAdjList = function (graph) {
  if (!graph) return null;
  let n = graph.length;
  let path = [];
  let inDegree = Array(n).fill(0);
  let outDegree = Array(n).fill(0);
  let edgeCount = 0;
  for (let from = 0; from < n; from++) {
    for (let to of graph[from]) {
      inDegree[to]++;
      outDegree[from]++;
      edgeCount++;
    }
  }

  if (!graphHasEulerianPath(edgeCount, n, outDegree, inDegree)) return null;

  let startNode = findStartNode(n, outDegree, inDegree);
  dfs(startNode, outDegree, path);

  if (path.length !== edgeCount + 1) return null;
  return path;
};

let graphHasEulerianPath = function (edgeCount, n, outDegree, inDegree) {
  if (edgeCount === 0) return false;
  let startNodes = 0;
  let endNodes = 0;
  for (let i = 0; i < n; i++) {
    if (outDegree[i] - inDegree[i] > 1 || inDegree[i] - outDegree[i] > 1) return false;
    else if (outDegree[i] - inDegree[i] === 1) startNodes++;
    else if (inDegree[i] - outDegree[i] === 1) endNodes++;
  }
  return (endNodes === 0 && startNodes === 0) || (endNodes === 1 && startNodes === 1);
};

let findStartNode = function (n, outDegree, inDegree) {
  let start = 0;
  for (let i = 0; i < n; i++) {
    if (outDegree[i] - inDegree[i] === 1) return i;
    if (outDegree[i] > 0) start = i;
  }
  return start;
};

let dfs = function (at, outDegree, path) {
  while (outDegree[at] !== 0) {
    let next = graph[at][--outDegree[at]];
    dfs(next, outDegree, path);
  }
  path.unshift(at);
};

// ----- EXAMPLE FROM NOTES ---------

let graph = [];
let N = 7;
for (let i = 0; i < N; i++) {
  graph[i] = [];
}

function addDirectedEdge(graph, from, to) {
  graph[from].push(to);
}

addDirectedEdge(graph, 1, 2);
addDirectedEdge(graph, 1, 3);
addDirectedEdge(graph, 2, 2);
addDirectedEdge(graph, 2, 4);
addDirectedEdge(graph, 2, 4);
addDirectedEdge(graph, 3, 1);
addDirectedEdge(graph, 3, 2);
addDirectedEdge(graph, 3, 5);
addDirectedEdge(graph, 4, 3);
addDirectedEdge(graph, 4, 6);
addDirectedEdge(graph, 5, 6);
addDirectedEdge(graph, 6, 3);

// Outputs path: [1, 3, 5, 6, 3, 2, 4, 3, 1, 2, 2, 4, 6]
console.log(eulerianPathAdjList(graph));
