let maxFlow = function (capacity, source, sink) {
  let residualCapacity = Array(capacity.length)
    .fill(0)
    .map(() => Array(capacity[0].length).fill(0));

  // Residual capacity initially same as capacity as there is no flow
  for (let i = 0; i < capacity.length; i++) {
    for (let j = 0; j < capacity[0].length; j++) {
      residualCapacity[i][j] = capacity[i][j];
    }
  }

  // a parent map for storing the bfs parent
  let parentMap = {};

  // stores all augmented paths
  let augmentedPaths = [];

  // max flow we can get in this network
  let maxFlow = 0;

  // see if augmented path can be found from source to sink
  while (bfs(residualCapacity, parentMap, source, sink)) {
    let augmentedPath = [];
    let flow = Infinity;

    // find minimum residual capacity in augmented path
    // also add vertices to augmented path list
    let v = sink;
    while (v !== source) {
      augmentedPath.push(v);
      let u = parentMap[v];
      if (flow > residualCapacity[u][v]) {
        flow = residualCapacity[u][v];
      }
      v = u;
    }
    augmentedPath.push(source);
    augmentedPath.reverse();
    augmentedPaths.push(augmentedPath);

    // add min capacity to max flow
    maxFlow += flow;

    // decrease residual capacity by min capacity from u to v in augmented path
    // and increase residual capacity by min capacity from v to u
    v = sink;
    while (v !== source) {
      let u = parentMap[v];
      residualCapacity[u][v] -= flow;
      residualCapacity[v][u] += flow;
      v = u;
    }
  }
  printAugmentedPaths(augmentedPaths);
  return maxFlow;
};

let printAugmentedPaths = function (augmentedPaths) {
  console.log("Augmented Paths:");
  augmentedPaths.forEach((path) => {
    console.log(`${path}`);
  });
};

let bfs = function (residualCapacity, parentMap, source, sink) {
  let visited = new Set();
  let queue = [];
  queue.unshift(source);
  visited.add(source);
  let foundAugmentedPath = false;

  while (queue.length) {
    let u = queue.pop();
    for (let v = 0; v < residualCapacity.length; v++) {
      //explore the vertex only if it is not visited and its residual capacity is > 0
      if (!visited.has(v) && residualCapacity[u][v] > 0) {
        //add in parent map saying v got explored by u
        parentMap[v] = u;
        //add v to visited
        visited.add(v);
        //add v to queue for BFS
        queue.unshift(v);
        //if sink is found then augmented path is found
        if (v === sink) {
          foundAugmentedPath = true;
          break;
        }
      }
    }
  }
  return foundAugmentedPath;
};

let capacity = [
  [0, 3, 0, 3, 0, 0, 0],
  [0, 0, 4, 0, 0, 0, 0],
  [3, 0, 0, 1, 2, 0, 0],
  [0, 0, 0, 0, 2, 6, 0],
  [0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 9],
  [0, 0, 0, 0, 0, 0, 0]
];

console.log(maxFlow(capacity, 0, 6));
