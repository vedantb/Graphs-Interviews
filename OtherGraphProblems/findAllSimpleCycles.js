let visited = new Set();
let pointStack = [];
let markedStack = [];
let markedSet = new Set();

function findAllSimpleCycles(graph) {
  let result = [];
  for (let i = 0; i < Object.keys(graph).length; i++) {
    findAllSimpleCyclesHelper(i, i, result, graph);
    visited.add(i);
    while (markedStack.length) {
      markedSet.delete(markedStack.pop());
    }
  }
  return result;
}

function findAllSimpleCyclesHelper(start, current, result, graph) {
  let hasCycle = false;
  pointStack.push(current);
  markedSet.add(current);
  markedStack.push(current);

  for (let w of graph[current]) {
    if (visited.has(w)) continue;
    else if (w === start) {
      hasCycle = true;
      pointStack.push(w);
      let cycle = [...pointStack];
      pointStack.pop();
      result.push(cycle);
    } else if (!markedSet.has(w)) {
      hasCycle = findAllSimpleCyclesHelper(start, w, result, graph) || hasCycle;
    }
  }

  if (hasCycle) {
    while (!(markedStack[markedStack.length - 1] === current)) {
      markedSet.delete(markedStack.pop());
    }
    markedSet.delete(markedStack.pop());
  }
  pointStack.pop();
  return hasCycle;
}

let graph = {};
graph[0] = [1];
graph[1] = [4, 6, 7];
graph[2] = [4, 6, 7];
graph[3] = [4, 6, 7];
graph[4] = [2, 3];
graph[5] = [2, 3];
graph[6] = [5, 8];
graph[7] = [5, 8];
graph[8] = [];

console.log(findAllSimpleCycles(graph));
