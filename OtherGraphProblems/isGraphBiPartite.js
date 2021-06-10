let isBipartite = function (graph) {
  let color = Array(graph.length).fill(-1);

  let queue = [];

  for (let start = 0; start < graph.length; start++) {
    if (color[start] === -1) {
      queue.unshift(start);
      color[start] = 0;
      while (queue.length > 0) {
        let vertex = queue.pop();
        for (let adj of graph[vertex]) {
          if (color[vertex] === color[adj]) return false;
          if (color[adj] !== -1) continue;
          color[adj] = color[vertex] ^ 1;
          queue.unshift(adj);
        }
      }
    }
  }
  return true;
};

let isBipartiteDFS = function (graph) {
  let color = Array(graph.length).fill(-1);
  for (let start = 0; start < graph.length; start++) {
    if (color[start] !== -1) continue;
    let flag = dfsHelper(start, color, true, graph);
    if (!flag) return false;
  }
  return true;
};

let dfsHelper = function (vertex, color, wasRed, graph) {
  if (wasRed) {
    if (color[vertex] === 0) return false;
    else if (color[vertex] === 1) return true;
    color[vertex] = 1;
  } else {
    if (color[vertex] === 1) return false;
    else if (color[vertex] === 0) return true;
    color[vertex] = 0;
  }

  for (let adj of graph[vertex]) {
    let flag = dfsHelper(adj, color, !wasRed, graph);
    if (!flag) return false;
  }
  return true;
};

console.log(
  isBipartite([
    [1, 2, 3],
    [0, 2],
    [0, 1, 3],
    [0, 2]
  ])
);

console.log(
  isBipartite([
    [1, 3],
    [0, 2],
    [1, 3],
    [0, 2]
  ])
);

console.log(
  isBipartiteDFS([
    [1, 2, 3],
    [0, 2],
    [0, 1, 3],
    [0, 2]
  ])
);

console.log(
  isBipartiteDFS([
    [1, 3],
    [0, 2],
    [1, 3],
    [0, 2]
  ])
);
