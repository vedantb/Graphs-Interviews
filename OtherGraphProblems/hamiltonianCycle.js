// Resource: https://www.youtube.com/watch?v=jGRRBJlNtwI

function isHamiltonianCycle(graph) {
  let path = [];
  let visited = Array(graph.length).fill(false);
  let start = 0;
  visited[start] = true;
  path.push(start);
  if (checkHamiltonianCycle(path, start, graph, visited)) return path;
  return false;
}

function checkHamiltonianCycle(path, v, graph, visited) {
  for (let adj of graph[v]) {
    if (path.length === graph.length && adj === 0) return true;
    if (!visited[adj]) {
      visited[adj] = true;
      path.push(adj);
      if (checkHamiltonianCycle(path, adj, graph, visited)) return true;
      visited[adj] = false;
      path.pop();
    }
  }
  return false;
}

let N = 7;
let graph = [];
for (let i = 0; i < N; i++) {
  graph[i] = [];
}
function addUndirectedEdge(u, v) {
  graph[u].push(v);
  graph[v].push(u);
}

addUndirectedEdge(0, 5);
addUndirectedEdge(0, 1);
addUndirectedEdge(1, 5);
addUndirectedEdge(0, 4);
addUndirectedEdge(1, 4);
addUndirectedEdge(0, 3);
addUndirectedEdge(1, 2);
addUndirectedEdge(4, 3);
addUndirectedEdge(4, 2);
addUndirectedEdge(3, 2);
addUndirectedEdge(3, 6);
addUndirectedEdge(2, 6);

console.log(isHamiltonianCycle(graph));
