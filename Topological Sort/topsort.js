function topSortKahns(g) {
  let n = g.length;
  let inDegree = Array(n).fill(0);

  for (let edges of g) {
    for (let to of edges) {
      inDegree[to]++;
    }
  }

  let q = [];

  // find all start nodes
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      q.unshift(i);
    }
  }

  let index = 0;
  let order = Array(n);
  while (q.length > 0) {
    let at = q.pop();
    order[index++] = at;
    for (let to of g[at]) {
      inDegree[to]--;
      if (inDegree[to] === 0) {
        q.unshift(to);
      }
    }
  }

  if (index !== n) return null;
  return order;
}

function addDirectedEdge(graph, from, to) {
  if (!graph) return console.log("no graph here");
  let n = graph.length;
  if (from < 0 || from >= n) return;
  if (to < 0 || to >= n) return;
  graph[from].push(to);
}

let g = Array(14);
for (let i = 0; i < 14; i++) {
  g[i] = [];
}
addDirectedEdge(g, 0, 2);
addDirectedEdge(g, 0, 3);
addDirectedEdge(g, 0, 6);
addDirectedEdge(g, 1, 4);
addDirectedEdge(g, 2, 6);
addDirectedEdge(g, 3, 1);
addDirectedEdge(g, 3, 4);
addDirectedEdge(g, 4, 5);
addDirectedEdge(g, 4, 8);
addDirectedEdge(g, 6, 7);
addDirectedEdge(g, 6, 11);
addDirectedEdge(g, 7, 4);
addDirectedEdge(g, 7, 12);
addDirectedEdge(g, 9, 2);
addDirectedEdge(g, 9, 10);
addDirectedEdge(g, 10, 6);
addDirectedEdge(g, 11, 12);
addDirectedEdge(g, 12, 8);

console.log(topSortKahns(g));
