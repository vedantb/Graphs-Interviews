function Index(currentVertex, vertexSet) {
  this.currentVertex = currentVertex;
  this.vertexSet = vertexSet;
  this.id = getHashCode(this.currentVertex, this.vertexSet);
}

function getHashCode(currentVertex, vertexSet) {
  let result = `${currentVertex}`;
  let vertexSetAddition = [];
  if (vertexSet && vertexSet.size) {
    for (let vertex of vertexSet) {
      vertexSetAddition.push(vertex);
    }
  }
  vertexSetAddition.sort();
  return `${result}-${vertexSetAddition.join("-")}`;
}

function minCost(distance) {
  let minCostDP = new Map();
  let parent = new Map();

  let allSets = generateCombinations(distance.length - 1);

  for (let set of allSets) {
    for (let currentVertex = 1; currentVertex < distance.length; currentVertex++) {
      if (set.has(currentVertex)) continue;
      let index = new Index(currentVertex, set);
      let minCost = Infinity;
      let minPrevVertex = 0;
      let copySet = new Set(set);
      for (let prevVertex of set) {
        let cost = distance[prevVertex][currentVertex] + getCost(copySet, prevVertex, minCostDP);
        if (cost < minCost) {
          minCost = cost;
          minPrevVertex = prevVertex;
        }
      }

      if (set.size === 0) {
        minCost = distance[0][currentVertex];
      }
      minCostDP.set(index.id, minCost);
      parent.set(index.id, minPrevVertex);
    }
  }

  let set = new Set();
  for (let i = 1; i < distance.length; i++) {
    set.add(i);
  }
  let min = Infinity;
  let prevVertex = -1;
  let copySet = new Set(set);
  for (let k of set) {
    let cost = distance[k][0] + getCost(copySet, k, minCostDP);
    if (cost < min) {
      min = cost;
      prevVertex = k;
    }
  }
  parent.set(new Index(0, set).id, prevVertex);
  return min;
}

function getCost(set, prevVertex, minCostDP) {
  set.delete(prevVertex);
  let index = new Index(prevVertex, set);
  let cost = minCostDP.get(index.id);
  set.add(prevVertex);
  return cost;
}

function generateCombinations(n) {
  let input = Array(n);
  for (let i = 0; i < input.length; i++) {
    input[i] = i + 1;
  }
  let allSets = [];
  let result = Array(input.length);
  generateCombinationHelper(input, 0, 0, allSets, result);
  allSets.length && allSets.sort((a, b) => a.size - b.size);
  return allSets;
}
function generateCombinationHelper(input, start, pos, allSets, result) {
  if (pos === input.length) return;

  let set = createSet(result, pos);
  allSets.push(set);
  for (let i = start; i < input.length; i++) {
    result[pos] = input[i];
    generateCombinationHelper(input, i + 1, pos + 1, allSets, result);
  }
}

function createSet(input, pos) {
  if (pos === 0) return new Set();
  let set = new Set();
  for (let i = 0; i < pos; i++) {
    set.add(input[i]);
  }
  return set;
}

console.log(
  minCost([
    [0, 1, 15, 6],
    [2, 0, 7, 3],
    [9, 6, 0, 12],
    [10, 4, 8, 0]
  ])
);
